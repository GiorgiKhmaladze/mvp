import React from 'react';
import NoReports from '../../assets/images/no-reports.svg';

export const EmptyReports: React.FC = () => {
    return (
        <div className='empty-reports'>
            <h2 className='empty-reports__label'>No reports</h2>
            <h2 className='empty-reports__description'>Currently you have no data for the reports to be generated.
                Once you start generating traffic through the Balance application
                the reports will be shown.
            </h2>
            <img src={NoReports} alt="No Reports"/>

        </div>
    )
}