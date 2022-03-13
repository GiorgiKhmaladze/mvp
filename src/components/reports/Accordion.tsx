import React, { useEffect, useState } from 'react';
import { Accordion as AccordionComponent } from 'react-bootstrap';
import { ReportsPerFilter } from '../../interfaces/report.interface';
import { formatAmount } from '../../utils';
import { Table } from './Table';

interface Props {
    tableHeaders: string[];
    reportsByFilter: Map<string, ReportsPerFilter>;
}

export const Accordion: React.FC<Props> = ({ reportsByFilter, tableHeaders }) => {
    const [names, setNames] = useState<string[]>([])
    useEffect(() => {
        setNames(Array.from(reportsByFilter.keys()));
    }, [reportsByFilter]);

    const renderAccordionItems = () => (
        names.map((key, i) => {
            const item = reportsByFilter.get(key)
            if (item) {
                return <div key={`${key}${i}`}>
                    <AccordionComponent.Item eventKey={`${key}${i}`} className='accordion__item'>
                        <AccordionComponent.Header>
                            <div className="accordion__item--title">
                                <span className="accordion__item--title-label">{item.name}</span>
                                <span className="accordion__item--title-amount"> {formatAmount(item.sum)} USD</span>
                            </div>
                        </AccordionComponent.Header>
                        <AccordionComponent.Body>
                            <Table tableHeaders={tableHeaders} list={item.list} />
                        </AccordionComponent.Body>
                    </AccordionComponent.Item></div>
            }
            return null
        })
    );

    return (
        <div className='accordion'>
            <AccordionComponent>
                {renderAccordionItems()}
            </AccordionComponent>
        </div>
    )
}