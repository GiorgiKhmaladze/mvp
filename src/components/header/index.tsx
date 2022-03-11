import React from 'react';
import { User } from '../../routes';
import Logo from '../../assets/images/logo.svg';
import Menu from '../../assets/images/menu.svg';
import { Link } from 'react-router-dom';

interface Props {
    user: User
}

export const Header: React.FC<Props> = ({ user }) => {
    return (
        <header className='header'>
            <Link to="/" className='header__logo'>
                <img src={Logo} alt="Logo" />
            </Link>
            <div className='header__items'>
                <img src={Menu} alt="Menu" />
                <div className="header__items--user">
                    <div className="header__items--user-avatar">{user.nickName}</div>
                    <div className="header__items--user-info">{user.firstName} {user.lastName}</div>
                </div>
            </div>
        </header>
    )
}