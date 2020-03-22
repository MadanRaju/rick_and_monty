import promiseState from 'shared/utils/reduxReducerHelper';

import { homeActionType } from './HomePageActions';

const initialState = {
    home: {
        ...promiseState(false, false, false, null),
    },
    masterData: {
        ...promiseState(false, false, false, null),
    },
};

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
    case homeActionType.pending:
        return Object.assign({}, state, {
            home: {
                ...promiseState(true, false, false, null),
            },
        });
    case homeActionType.fulfilled:
        return Object.assign({}, state, {
            home: {
                ...promiseState(false, true, false, action.payload),
            },
        });
    case homeActionType.rejected:
        return Object.assign({}, state, {
            home: {
                ...promiseState(false, false, true, null),
            },
        });
    case 'STORE_DATA':
        return Object.assign({}, state, {
            masterData: {
                ...promiseState(false, false, true, action.payload),
            },
        });
    default:
        return state;
    }
};

export default homeReducer;
