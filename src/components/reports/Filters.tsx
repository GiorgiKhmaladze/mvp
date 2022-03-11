import React, { useState } from 'react';
import { Option, Select } from '../../utils/select';

type StringOrdate = Date | string;

export interface Filter {
    projectId?: string;
    gatewayId?: string;
    from?: Date;
    to?: Date;
}

interface Props {
    projects: Option[];
    gateways: Option[];
    onFilter: (filters: Filter) => void;
}

export const Filters: React.FC<Props> = ({ projects, gateways, onFilter }) => {
    const [filters, setFilters] = useState<Filter>({});

    const updateFilter = (name: string, value: StringOrdate) => {
        setFilters((filters) => {
            return { ...filters, [name]: value }
        })
    }
    return (
        <div className='filter'>
            <div className='filter__item'>
                <Select
                    options={projects}
                    value="12312312"
                    label="All projects"
                    onSelect={(value) => updateFilter('projectId', value)}
                />
            </div>
        </div>
    )
}