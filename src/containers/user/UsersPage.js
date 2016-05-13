import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import User from '../../components/user/User';

import { invalidateUsersPage, selectUsersPage, fetchTopUsersIfNeeded } from '../../actions/users';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }
  /**
   * 组件实例即将挂接（初次渲染）时被调用,只会被调用一次
   */
  componentWillMount() {
    
  }
  /**
   * 组件实例挂接（初次渲染）后被调用,只会被调用一次
   */
  componentDidMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchTopUsersIfNeeded(page));
  }
  /**
   * 组件实例即将设置新属性时被调用(在此方法内调用setState()不会引起重新渲染。)
   * 
   */
  componentWillReceiveProps(nextProps) {
    const { dispatch, page } = nextProps;
    dispatch(fetchTopUsersIfNeeded(page));
  }
  /**
   * 组件实例即将重新渲染时被调用（默认返回值是 true, 返回false表示，不渲染）
   * 这个方法在初次渲染时或通过forceUpdate()方法进行渲染时不会被调用
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.page !== this.props.page;
  }
  /**
   * 组件实例即将重新渲染时被调用（不能在此方法内调用setState()）
   */
  componentWillUpdate(nextProps, nextState) {
    
  }
  /**
   * 组件实例重新渲染后被调用
   */
  componentDidUpdate(prevProps, prevState) {
    
  }
  /**
   * 组件实例即将从DOM树移除时被调用
   */
  componentWillUnmount() {
    
  }
  handleNextPageClick() {
    const { page, users } = this.props;
    if (users.length > 0) {
      // go to next page only if more users may be available
      this.props.dispatch(selectUsersPage(page + 1));
    }
  }

  handlePreviousPageClick() {
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectUsersPage(page - 1));
    }
  }

  handleRefreshClick(event) {
    event.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateUsersPage(page));
  }

  render() {
    const { page, error, users, isFetching } = this.props;
    return (
      <div className="container-fluid">
        <nav>
          <ul className="pager">
            <li className={'pager-prev' + (page > 1 ? '' : ' disabled')}><a href="#" onClick={this.handlePreviousPageClick}>上一页</a></li>
            {!isFetching &&
              <li><a href="#" onClick={this.handleRefreshClick}>刷新 {page}</a></li>
            }
            {isFetching &&
              <span><i className="fa fa-refresh fa-spin"></i> 刷新中 {page}</span>
            }
            <li className={'pager-next' + (users.length > 0 ? '' : ' disabled')}><a href="#" onClick={this.handleNextPageClick}>下一页</a></li>
          </ul>
        </nav>

        {
          error &&
          <div className="alert alert-danger">
            {error.message || 'Unknown errors.'}
          </div>
        }

        {!isFetching && users.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>
        }

        {users.length > 0 &&
          <div className="row" style={{ opacity: isFetching ? 0.5 : 1 }}>
              {users.map(user =>
                <div key={user.login} className="col-md-4">
                  <User key={user.login} user={user} />
                </div>
              )}
          </div>
        }
      </div>
    );
  }
}

UsersPage.propTypes = {
  page: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.object,
};

function mapStateToProps(state) {
  const { selectedUsersPage, usersByPage } = state;
  const page = selectedUsersPage || 1;

  if (!usersByPage || !usersByPage[page]) {
    return {
      page,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      users: [],
      error: null,
    };
  }

  return {
    page,
    error: usersByPage[page].error,
    isFetching: usersByPage[page].isFetching,
    didInvalidate: usersByPage[page].didInvalidate,
    totalCount: usersByPage[page].totalCount,
    users: usersByPage[page].users,
  };
}

export default connect(mapStateToProps)(UsersPage);
