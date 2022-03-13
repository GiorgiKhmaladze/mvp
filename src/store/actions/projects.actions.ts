import { Dispatch } from '..';
import api from '../../services';
import * as actions from './index';

export const getProjects = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await api.get('/projects');

            dispatch(actions.getProjects(response.data.data));
        } catch (error) {
            throw new Error('Oppps!')
        }
    };
};
