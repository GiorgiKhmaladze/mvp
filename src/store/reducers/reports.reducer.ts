import { Report } from '../../interfaces/report.interface';
import { ADD_REPORT } from '../types';

export default function reports(state = { data: [] }, action: { type: string, payload: Report[] }) {
    switch (action.type) {
        case ADD_REPORT:
            return { ...state, data: action.payload };
        default:
            return state;
    }
}
