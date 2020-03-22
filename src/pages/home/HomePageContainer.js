import { connect } from 'react-redux';

import HomePage from './HomePage';
import { homePageData, storeData } from './HomePageActions';

const mapStateToProps = state => ({
    homeData: state.homeReducer.home,
    masterData: state.homeReducer.masterData,
});

const mapDispatchToProps = dispatch => ({
    home: (
        params,
        successCallback,
        errorCallback,
        reset,
    ) => dispatch(homePageData(params, successCallback, errorCallback, reset)),
    storeData: data => dispatch(storeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
