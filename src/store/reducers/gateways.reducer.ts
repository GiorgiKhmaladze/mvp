import { Gateway } from '../../interfaces/gateway.interface';
import { GET_GATEWAYS } from '../types';

export default function gateways(state = { data: [] }, action: { type: string, payload: Gateway[] }) {
  switch (action.type) {
    case GET_GATEWAYS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}
