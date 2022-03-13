import { Project } from '../../interfaces/project.interface';
import { GET_PROJECTS } from '../types';

export default function projects(state = { data: [] }, action: { type: string, payload: Project[] }) {
  switch (action.type) {
    case GET_PROJECTS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
