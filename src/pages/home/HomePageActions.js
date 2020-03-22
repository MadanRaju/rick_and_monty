import { asyncActionTypeCreator, asyncActionCreator, payloadActionCreator } from 'shared/utils/reduxActionHelper';
import apiPaths from 'shared/apiPaths';

const homeActionType = asyncActionTypeCreator('HOME');
const homeAction = asyncActionCreator(homeActionType);

const homePageData = (params, successCallback, errorCallback, reset) => {
    const axiosConfig = {
        url: `${apiPaths.CHARACTERS}?${params}`,
        method: 'get',
    };
    return homeAction.action(axiosConfig, successCallback, errorCallback, reset);
};

const storeData = data => payloadActionCreator('STORE_DATA', data);

export {
    homeActionType,
    homePageData,
    storeData,
};
