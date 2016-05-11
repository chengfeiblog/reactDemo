import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}from 'material-ui/Table';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; 
import {invalidateMembersPage, selectMembersPage, fetchTopMembersIfNeed } from '../../actions/members';
const tableData = [
  {
    name: '成飞',
    status: '可用',
    selected: true,
  },
  {
    name: '成伟',
    status: '不可用',
  },
  {
    name: '成领',
    status: '可用',
    selected: true,
  },
  {
    name: '成燕',
    status: '可用',
  },
  {
    name: '成二头',
    status: '可用',
  },
  {
    name: '周宏儿',
    status: '可用',
  },
  {
    name: '成姐',
    status: '可用',
  },
];
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});
class MemberPage extends Component{
    constructor(props){
        super(props);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    componentDidMount() {
        const {dispatch, page} = this.props;
        console.log(page);
        dispatch(fetchTopMembersIfNeed(page));
    }
    componentWillReceiveProps(nextProps) {
        const {dispatch, page} = nextProps;
        dispatch(fetchTopMembersIfNeed(page));
    }
    handleNextPage() {
      const {page, members} = this.props;
      if(members.length > 0) {
        this.props.dispatch(selectMembersPage(page + 1));
      }
    }
    handlePreviousPage() {
      const page = this.props.page;
      if(page > 1) {
        this.dispatch(selectMembersPage(page - 1));
      }
    } 
    handleRefresh(e) {
      e.preventDefault();
      const {dispatch, page} = this.props;
      dispatch(invalidateMembersPage(page));
    }
    render() {
        return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <div className="container-fluid">
                <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHeaderColumn>ID</TableHeaderColumn>
                          <TableHeaderColumn>Name</TableHeaderColumn>
                          <TableHeaderColumn>Status</TableHeaderColumn>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {
                          tableData.map((row, index) => (
                              <TableRow key={index} selected={row.selected}>
                                  <TableRowColumn>{index}</TableRowColumn>
                                  <TableRowColumn>{row.name}</TableRowColumn>
                                  <TableRowColumn>{row.status}</TableRowColumn>
                              </TableRow>
                          ))
                      }
                  </TableBody>
                </Table>
            </div> 
          </MuiThemeProvider>
        );
    }
}
MemberPage.propTypes = {
  page: PropTypes.number.isRequired,
  members: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
}
function mapStateToProps(state) {
  const {selectedMemberPage, membersByPage} = state;
  const page = selectedMemberPage || 1;
  if(!membersByPage || !membersByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      members: [],
      error: null,
    };
  }
  return {
    page,
    error: membersByPage[page].error,
    isFetching: membersByPage[page].isFetching,
    didInvalidate: membersByPage[page].didInvalidate,
    totalCount: membersByPage[page].totalCount,
    members: membersByPage[page].members,
  }; 
}
export default connect(mapStateToProps)(MemberPage);