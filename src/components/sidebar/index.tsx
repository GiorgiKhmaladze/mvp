import React from 'react';
import ChartsIcon from '../../assets/images/dashboard-charts.svg';
import ComputerIcon from '../../assets/images/dashboard-computer.svg';
import CubesIcon from '../../assets/images/dashboard-cubes.svg';
import Logout from '../../assets/images/dashboard-logout.svg';
import StatisticsIcon from '../../assets/images/dashboard-statistics.svg';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItem {
    icon: string,
    alt: string,
    linkTo: string
}

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const sidebarItems: SidebarItem[] = [
        {
            icon: StatisticsIcon,
            alt: 'sidebar statistics',
            linkTo: '/'
        },
        {
            icon: CubesIcon,
            alt: 'sidebar cubes',
            linkTo: '/'
        },
        {
            icon: ComputerIcon,
            alt: 'sidebar computer',
            linkTo: '/'
        },
        {
            icon: ChartsIcon,
            alt: 'sidebar charts',
            linkTo: '/reports'
        },
        {
            icon: Logout,
            alt: 'sidebar logout',
            linkTo: '/'
        }
    ];

    const generateSidenavItems = () =>
        sidebarItems.map((sidebar, i) => {
            return <div className='sidebar__item'>
                <Link to={sidebar.linkTo} key={`${sidebar.alt}${i}`}>
                    <img
                        className={sidebar.linkTo === location.pathname ? 'active' : ''}
                        src={sidebar.icon}
                        alt={sidebar.alt}
                    />
                </Link>
            </div>

        });

    return (
        <div className='sidebar'>
            {generateSidenavItems()}
        </div>
    )
}