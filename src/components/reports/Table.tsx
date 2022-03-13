import React from 'react';
import { Table as TableComponent } from 'react-bootstrap';
import { MappedReport } from '../../interfaces/report.interface';

interface Props {
    tableHeaders: string[]
    list: MappedReport[]
}

export const Table: React.FC<Props> = ({ tableHeaders, list }) => {
    return (
        <TableComponent striped hover>
            <thead>
                <tr>
                    {tableHeaders.map(header => <td key={header}>{header}</td>)}
                </tr>
            </thead>
            <tbody>
                {list.map((report: MappedReport) => {
                    return (
                        <tr key={report.paymentId}>
                            <td>{report.created.replaceAll('-', '/')}</td>
                            {tableHeaders.length === 4 && <td>{report.gatewayName}</td>}
                            <td>{report.paymentId}</td>
                            <td>{Math.round(report.amount)} USD</td>
                        </tr>
                    )
                })}
            </tbody>
        </TableComponent>
    )
}