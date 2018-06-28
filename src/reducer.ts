import { AnyAction } from 'redux';

import { ActionType } from './actions';

export type State = {
    isLoading: boolean;
    pageSize: number;
    searchResults: any[];
};

const defaultState: State = {
    isLoading: false,
    pageSize: 2,
    searchResults: [],
};

const handler = new Map<string, (state: State, payload: any) => State>();

handler.set(ActionType.SEARCH, (state: State, payload: any) => ({
    ...state,
    isLoading: true,
}));

handler.set(ActionType.SEARCH_SUCCESS, (state: State, payload: any) => ({
    ...state,
    isLoading: false,
    searchResults: payload,
}));
handler.set(ActionType.PAGE_SIZE, (state: State, payload: number) => ({
    ...state,
    pageSize: payload,
}));

export const reducer = (state: State = defaultState, action: AnyAction) => {
    const r = handler.get(action.type);
    if (r) {
        return r(state, action.payload);
    } else {
        return state;
    }
};
