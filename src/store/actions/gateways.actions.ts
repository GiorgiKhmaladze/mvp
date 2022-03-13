import { Dispatch } from '..';
import api from '../../services';
import * as actions from './index';

export const getGateways = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await api.get('/gateways');

            dispatch(actions.getGateways(response.data.data));
        } catch (error) {
            throw new Error('Oppps!')
        }
    };
};
