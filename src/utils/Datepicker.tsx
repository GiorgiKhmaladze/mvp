import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';
import Date from '../assets/images/date.svg';

interface Props {
    from?: Date;
    to?: Date;
    placeholder: string;
    onSelect: (date: Date) => void;
}

export const Datepicker: React.FC<Props> = ({ from, to, placeholder, onSelect }) => {
    return (
        <div className='date-picker'>
            <DatePicker
                selected={from || to}
                onChange={onSelect}
                placeholderText={placeholder}
                wrapperClassName='date-picker'
            />
            <img src={Date} alt="Date" />
        </div>
    )
}