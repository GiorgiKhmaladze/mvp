import React from 'react';
import { Filter, Filters } from './Filters';

export const Reports: React.FC = () => {
    const onFilter = (filters: Filter) => {
        console.log(filters)
    }
    return (
        <div className='reports'>
            <div className='reports__header'>
                <div className='reports__header--info'>
                    <h2 className='reports__header--info-label'>Reports</h2>
                    <h2 className='reports__header--info-description'>Easily generate a report of your transactions</h2>
                </div>
                <div className='reports__header--filters'>
                    <Filters
                        projects={[{ value: '123', label: '123' }]}
                        gateways={[{ value: '123', label: '123' }]}
                        onFilter={(filters) => onFilter(filters)}
                    />
                </div>
            </div>
        </div>
    )
}