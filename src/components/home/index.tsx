import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div className="home">
            <button
                className='button'
            >
                <Link to="/reports">See reports!</Link>

            </button>
        </div>
    )
}