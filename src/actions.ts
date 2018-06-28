export const ActionType = {
    PAGE_SIZE: 'page_size',
    SEARCH: 'search',
    SEARCH_SUCCESS: 'search.success',
};
export type ActionType = typeof ActionType;

export const Actions = {
    search: (searchText: string, pageSize: number) => ({
        payload: { searchText, pageSize },
        type: ActionType.SEARCH,
    }),
    setPageSize: (size: number) => ({
        payload: size,
        type: ActionType.PAGE_SIZE,
    }),
};
export type Actions = typeof Actions;
