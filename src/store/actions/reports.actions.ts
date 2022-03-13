import { Dispatch } from '..';
import { ReportRequest } from '../../interfaces/report.interface';
import api from '../../services';
import * as actions from './index';

export const addReport = (request: ReportRequest) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await api.post('/report', request);
            dispatch(actions.addReport(response.data.data));
        } catch (error) {
            throw new Error('Oppps!')
        }
    };
};
