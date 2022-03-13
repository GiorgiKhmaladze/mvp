import React, { useState } from 'react';
import { Select } from '../../utils/Select';
import { Datepicker } from '../../utils/Datepicker';
import { Filter } from '../../interfaces/filter.interface';
import { Option } from '../../interfaces/form.interface';

type StringOrDate = Date | string;

interface Props {
    projects?: Option[];
    gateways?: Option[];
    onFilter: (filters: Filter) => void;
}

export const Filters: React.FC<Props> = ({ projects, gateways, onFilter }) => {
    const [filters, setFilters] = useState<Filter>({});

    const updateFilter = (name: string, value: StringOrDate) => {
        setFilters((filters) => {
            return { ...filters, [name]: value }
        })
    }
    return (
        <div className='filter'>
            <div className='filter__item'>
                <Select
                    options={projects}
                    value={filters.projectId}
                    label="All projects"
                    onSelect={(value) => updateFilter('projectId', value)}
                />
            </div>
            <div className='filter__item'>
                <Select
                    options={gateways}
                    value={filters.gatewayId}
                    label="All gateways"
                    onSelect={(value) => updateFilter('gatewayId', value)}
                />
            </div>
            <div className='filter__item'>
                <Datepicker
                    from={filters.from}
                    placeholder="From date"
                    onSelect={(value) => updateFilter('from', value)}
                />
            </div>
            <div className='filter__item'>
                <Datepicker
                    to={filters.to}
                    placeholder="To date"
                    onSelect={(value) => updateFilter('to', value)}
                />
            </div>
            <button
                onClick={() => onFilter(filters)}
                className='button'
            >
                Generate report
            </button>
        </div>
    )
}