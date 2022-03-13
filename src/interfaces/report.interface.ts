export interface ReportRequest {
    projectId?: string;
    gatewayId?: string;
    from: string;
    to: string;
}

export interface Report {
    paymentId: string;
    amount: number;
    projectId: string;
    gatewayId: string;
    userIds: string[];
    modified: string;
    created: string;
}

export enum PageType {
    Default,
    WithCharts
};

export interface MappedReport extends Report {
    gatewayName: string;
    projectName: string;
}

export interface ReportsPerFilter {
    name: string;
    sum: number;
    list: MappedReport[];
    color: string;
}