import moment from 'moment'
import { Chart } from '../interfaces/chart.interface';
import { Gateway } from '../interfaces/gateway.interface';
import { Project } from '../interfaces/project.interface';
import { MappedReport, Report, ReportsPerFilter } from '../interfaces/report.interface';

export enum FormatType {
    String = "getString",
    Date = "getDate"
};

export const modifyDate = (date: Date | string, type: FormatType) => {
    if (type === FormatType.String) {
        return moment(date).format('YYYY-MM-DD');
    } else {
        return new Date(date);
    }
};

export const generateReportsAndFillMaps = (
    reports: Report[],
    gateways: Gateway[],
    projects: Project[],
    gatewayMemoizedMap: Map<string, ReportsPerFilter>,
    projectsMemoizedMap: Map<string, ReportsPerFilter>
): MappedReport[] => {
    const mappedReports: MappedReport[] = [];
    reports.forEach((report: Report) => {
        const mappedReport: MappedReport = { ...report, gatewayName: '', projectName: '' };
        const gatewayEntry = gatewayMemoizedMap.get(report.gatewayId);
        if (!gatewayEntry?.name) {
            const gateway = gateways.find(e => e.gatewayId === report.gatewayId);
            if (gateway && gatewayEntry) {
                gatewayMemoizedMap.set(report.gatewayId, {
                    ...gatewayEntry,
                    name: gateway.name,
                    sum: gatewayEntry?.sum + report.amount,
                });

                mappedReport.gatewayName = gateway.name;
            }
        } else {
            mappedReport.gatewayName = gatewayEntry.name;
            gatewayMemoizedMap.set(report.gatewayId, { ...gatewayEntry, sum: gatewayEntry.sum + report.amount });
        }
        const projectEntry = projectsMemoizedMap.get(report.projectId);
        if (!projectEntry?.name) {
            const project = projects.find(e => e.projectId === report.projectId);
            if (project && projectEntry) {
                projectsMemoizedMap.set(report.projectId, {
                    ...projectEntry,
                    name: project.name,
                    sum: projectEntry.sum + report.amount,
                });

                mappedReport.projectName = project.name;
            }
        } else {
            mappedReport.projectName = projectEntry.name;
            projectsMemoizedMap.set(report.projectId, { ...projectEntry, sum: projectEntry.sum + report.amount });
        }
        mappedReports.push(mappedReport);
    })
    return mappedReports;
}

export const formatAmount = (amount: number) => {
    const newAmount = amount.toFixed(3).split(".");
    newAmount[0] = newAmount[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return newAmount.join('.');
}


export const generateChartData = (data: Map<string, ReportsPerFilter>): Chart => {
    const keys = Array.from(data.keys());
    const chartData: Chart = {
        backgroundColor: [],
        data: [],
        labels: [],
    }
    keys.forEach(key => {
        const item = data.get(key);
        if (item) {
            chartData.backgroundColor.push(item.color);
            chartData.labels.push(item.name);
            chartData.data.push(item.sum);
        }
    });
    return chartData;
}

export const getTotalSum = (reports: Map<string, ReportsPerFilter>): string => {
    const keys = Array.from(reports.keys());
    let sum = 0;
    keys.forEach((key) => {
        const item = reports.get(key);
        if (item) {
            sum += item.sum;
        }
    });
    return formatAmount(sum);
}