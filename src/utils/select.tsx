import React from 'react';
import Form from 'react-bootstrap/Form';
import { Option } from '../interfaces/form.interface';

interface Props {
    options?: Option[];
    label: string;
    value?: string;
    onSelect: (value: string) => void;
}

export const Select: React.FC<Props> = ({ options, label, value, onSelect }) => {
    const generateOptions = () =>
        options?.map((option, i) => {
            return <option key={`${option.value}${i}`} value={option.value}>{option.label}</option>

        });
    return (
        <Form.Select
            value={value}
            onChange={(event) => onSelect(event.target.value)}
        >
            <option value="">{label}</option>
            {generateOptions()}
        </Form.Select>
    )
}