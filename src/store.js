import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
let storeEnhancers = applyMiddleware(thunk);

if (CONFIG.env === 'DEV') { // eslint-disable-line
    storeEnhancers = composeWithDevTools(applyMiddleware(thunk));
}

const store = createStore(persistedReducer, storeEnhancers);
const persistor = persistStore(store);

export {
    store,
    persistor,
};
