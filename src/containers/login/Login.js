import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom'
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import './login.css';
const initState = {
  errorMessage:  null,
  isUsernameError : false,
  isPasswordError : false 
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, initState);
    this.handleLogin = this.handleLogin.bind(this);
  }
  /**
   * 组件渲染之后
   */
  componentDidMount() {
    findDOMNode(this.refs.username).focus();
  }
  /**
   * 
   */
  componentDidUpdate() {
    if(this.props.loginError === "账户/密码不正确") {
      if(!this.state.isUsernameError) {
        let newState = Object.assign({},this.state);
        newState.isUsernameError = true;
        this.setState(newState);
      }
      findDOMNode(this.refs.username).focus();
    }
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

  
  /**
   * 校验
   */
  checkLoginFrom(username, password) {
    let newState = Object.assign({},initState);
    if(username === "") {
      newState.errorMessage = "账号必须填写";
      newState.isUsernameError = true;
      findDOMNode(this.refs.username).focus();
    }else if(password === "") {
      newState.errorMessage = "密码必须填写";
      newState.isPasswordError = true;
      findDOMNode(this.refs.password).focus();
    }
    return newState;
  }
  /**
   * 登录
   */
  handleLogin(event) {
    event.preventDefault();
    const username = this.refs.username;
    const password = this.refs.password;
    const rememberMe = this.refs.rememberMe;
    console.log(rememberMe.value);
    let newState = this.checkLoginFrom(username.value, password.value);
    this.setState(newState);
    if(!newState.errorMessage) {
      this.props.dispatch(login(username.value, password.value));
    }
  }
  /**
   * 根据错误返回相对的CSS样式
   */
  getInputClass(value) {
    return ("form-group" + (value ? "has-error" : ""));
  }
  /**
   * 记住密码
   */
  rememberMe() {
    
  }
  render() {
    const { user, loginError} = this.props;
    let errorLable;
    if(this.state.errorMessage) {
      errorLable = (      
          <div className="alert alert-danger">
                    {this.state.errorMessage}  
          </div>
      );
    } else if(loginError) {
      errorLable = (
          <div className="alert alert-danger">
                    {loginError.message}  
          </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="card">
              <div className="card-header">请登录</div>
              <form className="card-block">
                <div className={this.getInputClass(this.state.isUsernameError)}>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"/></span>
                    <input type="text" ref="username" className="form-control" placeholder="请输入用户名"/>
                  </div>
                </div>
                <div className={this.getInputClass(this.state.isPasswordError)}>     
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"/></span>
                    <input type="password" ref="password" className="form-control" placeholder="请输入密码"/>
                  </div>
                </div>      
                <div className="checkbox">
                  <label>
                    <input type="checkbox" value="rememberMe" ref="rememberMe" onClick = {this.rememberMe()}  /> 记住我
                  </label>
                </div>
                {errorLable}
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
