import React, { useEffect, useState } from 'react';
import { Chart as ChartComponent, ArcElement } from 'chart.js'
import { Gateway } from '../../interfaces/gateway.interface';
import { Project } from '../../interfaces/project.interface';
import { MappedReport, PageType, Report, ReportsPerFilter } from '../../interfaces/report.interface';
import { generateReportsAndFillMaps, getTotalSum } from '../../utils';
import { Accordion } from './Accordion';
import { Chart } from './Chart';
import { EmptyReports } from './NoReports';
import { Table } from './Table';
ChartComponent.register(ArcElement);

interface Props {
    type: PageType;
    title: string;
    projects: Project[];
    gateways: Gateway[];
    reports: Report[];
    tableHeaders: string[];
    filteredBy: { [key: string]: string }
}

export const Content: React.FC<Props> = ({ type, projects, gateways, reports, title, tableHeaders, filteredBy }) => {
    const [reportsForAccordion, setReportsForAccordion] = useState(new Map<string, ReportsPerFilter>());
    const [totalSum, setTotalSum] = useState<string>();

    useEffect(() => {
        let tmpMappedReports: MappedReport[] = [];

        const projectsMemoizedMap = new Map<string, ReportsPerFilter>();
        projects.forEach(project => {
            projectsMemoizedMap.set(project.projectId, { name: '', sum: 0, list: [], color: '#' + Math.floor(Math.random() * 16777215).toString(16) })
        });

        const gatewayMemoizedMap = new Map<string, ReportsPerFilter>();
        gateways.forEach(project => {
            gatewayMemoizedMap.set(project.gatewayId, { name: '', sum: 0, list: [], color: '#' + Math.floor(Math.random() * 16777215).toString(16) })
        });


        tmpMappedReports = generateReportsAndFillMaps(reports, gateways, projects, gatewayMemoizedMap, projectsMemoizedMap);

        tmpMappedReports.forEach(report => {
            const gatewayValue = gatewayMemoizedMap.get(report.gatewayId);
            if (gatewayValue) {
                gatewayValue.list.push(report);
                gatewayMemoizedMap.set(report.gatewayId, { ...gatewayValue });
            }

            const projectValue = projectsMemoizedMap.get(report.projectId);
            if (projectValue) {
                projectValue.list.push(report);
                projectsMemoizedMap.set(report.projectId, { ...projectValue });
            }
        });

        let sum;
        if (Object.keys(filteredBy).length === 2 || filteredBy.projectId) {
            setReportsForAccordion(gatewayMemoizedMap);
            sum = getTotalSum(projectsMemoizedMap);
        } else {
            setReportsForAccordion(projectsMemoizedMap);
            sum = getTotalSum(projectsMemoizedMap);
        }
        setTotalSum(sum);
    }, [reports, projects, gateways, filteredBy])

    const dataForSingleTable = () => {
        const data = reportsForAccordion.get(filteredBy.projectId);
        let list: MappedReport[] = [];
        if (data) {
            list = ([...data.list].filter(e => e.gatewayId === filteredBy.gatewayId));
        }
        return list;
    }

    return (
        <>
            {
                reports.length ?
                    <div className='content'>
                        <div className='content__left'>
                            <div className='content__left--list background'>
                                <h2>{title}</h2>
                                {
                                    Object.keys(filteredBy).length === 2
                                        ?
                                        <Table tableHeaders={tableHeaders} list={dataForSingleTable()} />
                                        : <Accordion tableHeaders={tableHeaders} reportsByFilter={reportsForAccordion} />
                                }
                            </div>
                            {
                                type === PageType.Default ?
                                    <div className='background sum'>TOTAL | {totalSum} USD</div> : null
                            }
                        </div>
                        {
                            type === PageType.WithCharts ?
                                <div className='content__right'>
                                    <Chart data={reportsForAccordion} />
                                    <div className='background sum'>{filteredBy.projectId ? 'PROJECT TOTAL |' : 'GATEWAY TOTAL |'} {totalSum} USD</div>
                                </div> : null
                        }
                    </div> : <EmptyReports />
            }
        </>


    )
}