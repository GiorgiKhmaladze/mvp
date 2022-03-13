
import { Gateway } from "../../interfaces/gateway.interface";
import { Project } from "../../interfaces/project.interface";
import { Report } from "../../interfaces/report.interface";
import { ADD_REPORT, GET_PROJECTS } from "../types";
import { GET_GATEWAYS } from "../types";


/// projects
export const getProjects = (projects: Project[]) => ({
    type: GET_PROJECTS,
    payload: projects
})

/// gateways
export const getGateways = (gateways: Gateway[]) => ({
    type: GET_GATEWAYS,
    payload: gateways
})

/// reports

export const addReport = (reports: Report[]) => ({
    type: ADD_REPORT,
    payload: reports
})