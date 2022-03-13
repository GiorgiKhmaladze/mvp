import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ReportsPerFilter } from '../../interfaces/report.interface';
import { generateChartData } from '../../utils';

interface Props {
    data: Map<string, ReportsPerFilter>;
}

export const Chart: React.FC<Props> = ({ data }) => {
    const chartData = generateChartData(data);
    return (
        <div className="chart">
            <div className='chart__header background'>
                {
                    chartData.backgroundColor.map((bgColor, i) => (
                        <div key={bgColor} className='chart__header--item'>
                            <div className='chart__header--item-box' style={{ backgroundColor: bgColor }}></div>
                            <div className='chart__header--item-title'>{chartData.labels[i]}</div>
                        </div>
                    ))
                }
            </div>
            <div>
                <Doughnut
                    data={
                        {
                            labels: chartData.labels,
                            datasets: [{
                                data: chartData.data,
                                backgroundColor: chartData.backgroundColor
                            }],
                        }
                    }
                />
            </div>
        </div>
    )
}