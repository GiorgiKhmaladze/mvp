import React from 'react';
import { Sidebar } from '../sidebar';

interface Props {
    children: React.ReactNode
}

export const DashboardLayout: React.FC<Props> = ({ children }) => {

    return (
        <div className='dashboard'>
            <div className='dashboard__navigation'>
                <Sidebar />
            </div>
            <div className='dashboard__content'>
                {children}
            </div>
        </div>
    )
}