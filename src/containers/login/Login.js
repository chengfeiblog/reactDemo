import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      //登录之后，跳转到主页或者想要去的页面
      try {
        const redirect = this.props.location.query.redirect;
        this.context.router.replace(redirect);
      } catch (err) {
        this.context.router.replace('/');
      }
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    this.props.dispatch(login(username.value, password.value));
    username.value = '';
    password.value = '';
  }

  render() {
    const { user, loginError } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="card">
              <div className="card-header">请登录</div>
              <form className="card-block">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"/></span>
                  <input type="text" ref="username" className="form-control" placeholder="请输入用户名" required autoFocus/>
                </div>

                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-lock"/></span>
                  <input type="password" ref="password" className="form-control" placeholder="请输入密码" required/>
                </div>

                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="remember-me"/> 记住我
                  </label>
                </div>

                {
                  !user && loginError &&
                  <div className="alert alert-danger">
                    {loginError.message}. 使用初始化密码登录.
                  </div>
                }

                <button className="btn btn-primary btn-block" onClick={this.handleLogin}><i className="fa fa-sign-in"/>{' '}登录</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

Login.propTypes = {
  user: PropTypes.string,
  loginError: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
