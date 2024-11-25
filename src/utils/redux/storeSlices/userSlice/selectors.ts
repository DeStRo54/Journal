import { StoreState } from '../../store';

export const getUser = (state: StoreState) => state.user.data;
