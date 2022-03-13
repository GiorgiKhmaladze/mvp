import { Gateway } from "./gateway.interface";
import { Project } from "./project.interface";
import { Report } from "./report.interface";

export interface State {
    projects: {
        data: Project[]
    };
    gateways: {
        data: Gateway[]
    };
    reports: {
        data: Report[]
    }
}