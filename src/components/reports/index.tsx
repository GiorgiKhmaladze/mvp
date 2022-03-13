import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter } from '../../interfaces/filter.interface';
import { State } from '../../interfaces/state.interface';
import { getGateways } from '../../store/actions/gateways.actions';
import { getProjects } from '../../store/actions/projects.actions';
import { Filters } from './Filters';
import { Option } from '../../interfaces/form.interface'
import { Gateway } from '../../interfaces/gateway.interface';
import { Project } from '../../interfaces/project.interface';
import { FormatType, modifyDate } from '../../utils';
import { PageType, ReportRequest } from '../../interfaces/report.interface';
import { addReport } from '../../store/actions/reports.actions';
import { Content } from './Content';

export const Reports: React.FC = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('All projects | All gateways');
    const [contentType, setContentType] = useState<PageType>(0);
    const [tableHeaders, setTableHeaders] = useState<string[]>([]);
    const [filteredBy, setFilteredBy] = useState<{ [key: string]: string }>({});

    // for dropdown select options
    const [mappedProjects, setMappedProjects] = useState<Option[]>();
    const [mappedGateways, setMappedGateways] = useState<Option[]>();

    const projects = useSelector((state: State) => state.projects.data);
    const gateways = useSelector((state: State) => state.gateways.data);
    const reports = useSelector((state: State) => state.reports.data);

    const updateTitle = (gatewayId?: string, projectId?: string) => {
        const gateway = gateways.find(e => e.gatewayId === gatewayId);
        const project = projects.find(e => e.projectId === projectId);
        const newTitle = `${project?.name || 'All projects'} | ${gateway?.name || 'All gateways'}`;
        setTitle(newTitle);
    }

    const updatePageType = (gatewayId?: string, projectId?: string) => {
        if ((gatewayId && projectId) || (!gatewayId && !projectId)) {
            setContentType(PageType.Default);
        } else {
            setContentType(PageType.WithCharts);
        }
    }

    // dynamically pass headers to the children
    const updateTableHeaders = (gatewayId?: string, projectId?: string) => {
        let newHeaders: string[] = [];
        let defaultHeaders = 'Date,Gateway,Transaction ID,Amount';

        if (projectId || gatewayId) {
            defaultHeaders = 'Date,Gateway,Transaction ID,Amount'.replace('Gateway,', '');
        }
        newHeaders = defaultHeaders.split(',');
        setTableHeaders(newHeaders)

    }

    // handle on filter 
    const onFilter = (filters: Filter) => {
        const request: ReportRequest = {
            from: '',
            to: '',
            gatewayId: filters.gatewayId,
            projectId: filters.projectId
        }
        if (filters.from) {
            request.from = modifyDate(filters.from, FormatType.String) as string
        }
        if (filters.to) {
            request.to = modifyDate(filters.to, FormatType.String) as string
        }

        // we want to know which filter was applied gateway or project
        setFilteredBy(filter => {
            const newFilter = { ...filter };
            if (request.gatewayId) {
                newFilter['gatewayId'] = request.gatewayId;
            } else {
                delete newFilter.gatewayId;

            }
            if (request.projectId) {
                newFilter['projectId'] = request.projectId;
            } else {
                delete newFilter.projectId;
            }
            return newFilter;
        })


        updatePageType(request.gatewayId, request.projectId);

        updateTitle(request.gatewayId, request.projectId);

        updateTableHeaders(request.gatewayId, request.projectId);

        dispatch(addReport(request));

    }


    useEffect(() => {
        const mapped = gateways.map((gateway: Gateway) => ({ value: gateway.gatewayId, label: gateway.name } as Option))
        setMappedGateways(mapped);
    }, [gateways]);

    useEffect(() => {
        const mapped = projects.map((project: Project) => ({ value: project.projectId, label: project.name } as Option))
        setMappedProjects(mapped);
    }, [projects]);

    useEffect(() => {
        dispatch(getProjects());
        dispatch(getGateways());
    }, [dispatch]);

    return (
        <div className='reports'>
            <div className='reports__header'>
                <div className='reports__header--info'>
                    <h2 className='reports__header--info-label'>Reports</h2>
                    <h2 className='reports__header--info-description'>Easily generate a report of your transactions</h2>
                </div>
                <div className='reports__header--filters'>
                    <Filters
                        projects={mappedProjects}
                        gateways={mappedGateways}
                        onFilter={(filters) => onFilter(filters)}
                    />
                </div>
            </div>
            <div className='reports__content'>
                <Content projects={projects} gateways={gateways} reports={reports} type={contentType} title={title} tableHeaders={tableHeaders} filteredBy={filteredBy} />
            </div>
        </div>
    )
}