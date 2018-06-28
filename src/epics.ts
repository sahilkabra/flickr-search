import { ActionsObservable } from 'redux-observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { ActionType } from './actions';
import { fetchPhotos } from './service';

export const searchEpic = (action$: ActionsObservable<any>, store: any) =>
    action$
        .ofType(ActionType.SEARCH)
        .mergeMap(action => {
            return fetchPhotos(
                action.payload.searchText,
                action.payload.pageSize
            );
        })
        .map((results: any) => {
            return {
                payload: results,
                type: ActionType.SEARCH_SUCCESS,
            };
        });
