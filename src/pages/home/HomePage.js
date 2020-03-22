/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Notification from 'antd/lib/notification';
import Spin from 'antd/lib/spin';
import Pagination from 'antd/lib/pagination';
import Select from 'antd/lib/select';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';

import CharacterCard from './components/characterCard/characterCard';

import './homePage.scss';

const { Option } = Select;
const { Search } = Input;

class HomePage extends React.PureComponent {
    static propTypes = {
        homeData: PropTypes.object.isRequired,
        masterData: PropTypes.object.isRequired,
        home: PropTypes.func.isRequired,
        storeData: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            masterData: props.masterData.data && Object.keys(props.masterData.data).length > 1 ? props.masterData.data : {},
            pageData: props.homeData && props.homeData.data ? props.homeData.data : {},
            pageNo: props.masterData && Object.keys(props.masterData).length > 1 && props.masterData.data && props.masterData.data.currentPage ? props.masterData.data.currentPage : 1,
            operationsApplied: {
                sort: {
                    isSorted: false,
                    sortOrder: 'Default',
                    sortedData: [],
                },
                filter: {
                    isFiltered: false,
                    filterParam: {
                        gender: 'Gender',
                        species: 'Species',
                    },
                    filteredData: [],
                },
                search: {
                    isSearched: false,
                    searchWord: '',
                    searchedData: [],
                },
            },
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    isOperationApplied = () => {
        const { operationsApplied } = this.state;
        if (!operationsApplied.sort.isSorted && !operationsApplied.filter.isFiltered && !operationsApplied.search.isSearched) {
            return false;
        }
        return true;
    }

    resetOperations = () => {
        const operationsApplied = {
            sort: {
                isSorted: false,
                sortOrder: 'Default',
                sortedData: [],
            },
            filter: {
                isFiltered: false,
                filterParam: {
                    gender: 'Gender',
                    species: 'Species',
                },
                filteredData: [],
            },
            search: {
                isSearched: false,
                searchWord: '',
                searchedData: [],
            },
        };
        this.setState({ operationsApplied, pageNo: 1 }, () => {
            const { home } = this.props;
            home(`page=${1}`, this.onDataSuccess, this.onDataError, true);
        });
    }

    handleSearchValue = (event) => {
        const { operationsApplied } = this.state;
        const search = {
            isSearched: false,
            searchWord: event.target.value,
            searchedData: [],
        };
        this.setState({ operationsApplied: { ...operationsApplied, search } });
    }

    searchData = (word) => {
        const { operationsApplied, pageData } = this.state;
        const searchedArray = [];
        pageData.results.map((item) => {
            if (item.name.toLowerCase().includes(word)) {
                searchedArray.push(item);
            }
        });
        const search = {
            isSearched: true,
            searchWord: word,
            searchedData: searchedArray,
        };
        this.setState({ operationsApplied: { ...operationsApplied, search }, pageData: { ...pageData, results: searchedArray } });
    }

    filterGender = (word) => {
        const { operationsApplied, pageData } = this.state;
        const filterArray = [];
        pageData.results.map((item) => {
            if (word === item.gender) {
                filterArray.push(item);
            }
        });
        const filter = {
            isFiltered: true,
            filterParam: {
                gender: word,
                species: operationsApplied.filter.filterParam.species,
            },
            filteredData: filterArray,
        };
        this.setState({ operationsApplied: { ...operationsApplied, filter }, pageData: { ...pageData, results: filterArray } });
    }

    filterSpecies = (word) => {
        const { operationsApplied, pageData } = this.state;
        const filterArray = [];
        pageData.results.map((item) => {
            if (word === item.species) {
                filterArray.push(item);
            }
        });
        const filter = {
            isFiltered: true,
            filterParam: {
                gender: operationsApplied.filter.filterParam.gender,
                species: word,
            },
            filteredData: filterArray,
        };
        this.setState({ operationsApplied: { ...operationsApplied, filter }, pageData: { ...pageData, results: filterArray } });
    }

    sortData = (order) => {
        const { operationsApplied, pageData } = this.state;
        let sortedArray;
        if (order === 'A') {
            sortedArray = pageData.results.sort((a, b) => (b.id < a.id ? 1 : b.id > a.id ? -1 : 0));
        } else if (order === 'D') {
            sortedArray = pageData.results.sort((a, b) => (b.id > a.id ? 1 : b.id < a.id ? -1 : 0));
        }

        const sort = {
            isSorted: true,
            sortOrder: order,
            sortedData: sortedArray,
        };
        this.setState({ operationsApplied: { ...operationsApplied, sort }, pageData: { ...pageData, results: sortedArray } });
    }

    fetchData = () => {
        const { pageNo, masterData } = this.state;
        const { storeData } = this.props;
        if (!(masterData && Object.keys(masterData).length > 1 && masterData.allPageData && masterData.allPageData[pageNo])) {
            const { home } = this.props;
            home(`page=${pageNo}`, this.onDataSuccess, this.onDataError);
        } else {
            masterData.currentPage = pageNo;
            this.setState({ pageData: masterData.allPageData[pageNo] }, () => {
                storeData(masterData);
            });
        }
    }

    onDataSuccess = (response, reset) => {
        const { homeData, storeData } = this.props;
        const { masterData, pageNo } = this.state;
        const species = [];
        homeData.data.results.map((item) => {
            if (species.indexOf(item.species) < 0) {
                species.push(item.species);
            }
        });
        masterData.allPageData = masterData.allPageData && !reset ? masterData.allPageData : {};
        masterData.filter = masterData.filter && !reset ? masterData.filter : {};
        masterData.allPageData[pageNo] = homeData.data;
        masterData.filter[pageNo] = species;
        masterData.currentPage = pageNo;
        this.setState({ pageData: homeData.data, masterData }, () => {
            storeData(masterData);
            this.notify('success', 'Data retrieved successfully');
        });
    }

    onDataError = () => {
        this.notify('error', 'API error');
    }

    onPageChange = (pageNo) => {
        this.setState({ pageNo }, () => {
            this.fetchData();
        });
    }

    notify = (type, message) => {
        Notification[type]({
            message,
        });
    }

    render() {
        const {
            pageData, pageNo, masterData, operationsApplied,
        } = this.state;
        const currentPageDataPresent = masterData && masterData.allPageData && masterData.allPageData[pageNo];
        return (
            <div className="homePageContainer">
                {!currentPageDataPresent && <div className="loaderContainer"><Spin size="large" /></div>}
                {currentPageDataPresent
                && (
                    <div className="operationContainer">
                        <div className="sortOperationContainer">
                            <div>Sort Order</div>
                            <div>
                                <Select defaultValue="Default" value={operationsApplied.sort.sortOrder} style={{ width: 120 }} onChange={this.sortData}>
                                    <Option value="A">Ascending</Option>
                                    <Option value="D">Descending</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="searchOperationContainer">
                            <Search placeholder="Search based on name" value={operationsApplied.search.searchWord} onSearch={this.searchData} onChange={this.handleSearchValue} enterButton />
                        </div>
                        <div className="filterOperationContainer">
                            <div>Filter</div>
                            <div>
                                <Select defaultValue="Gender" value={operationsApplied.filter.filterParam.gender} style={{ width: 120 }} onChange={this.filterGender}>
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                </Select>
                                <Select defaultValue="Species" value={operationsApplied.filter.filterParam.species} style={{ width: 120 }} onChange={this.filterSpecies}>
                                    {masterData.filter[pageNo].map(item => (<Option value={item}>{item}</Option>))}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Button
                                className="formElement"
                                type="primary"
                                block
                                onClick={this.resetOperations}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                )}
                {currentPageDataPresent
                && (
                    <React.Fragment>
                        <div className="contentContainer">
                            {pageData.results.map(item => (<CharacterCard key={item.id} data={item} />))}
                        </div>
                        {!this.isOperationApplied() && (
                            <div className="paginationContainer">
                                <Pagination current={pageNo} defaultCurrent={pageNo} total={masterData.allPageData[Object.keys(masterData.allPageData)[0]].info.pages * 10} onChange={this.onPageChange} />
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default HomePage;
