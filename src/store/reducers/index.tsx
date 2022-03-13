import { combineReducers } from 'redux';
import projects from './projects.reducer';
import gateways from './gateways.reducer';
import reports from './reports.reducer';

const appReducers = combineReducers({
    projects,
    gateways,
    reports
});

export default appReducers;
