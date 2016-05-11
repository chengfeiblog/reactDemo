import React, { Component } from 'react';

import './home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">I want to be a full Stack developer</h1>
            <p className="lead">
            
            </p>
          </div>
        </div>

        <div className="container">
          <h3>使用的技术</h3>

          <ul>
            <li><a href="https://github.com/facebook/react" target="_blank">React</a></li>
            <li><a href="https://github.com/rackt/redux" target="_blank">Redux</a></li>
            <li><a href="https://github.com/rackt/react-router" target="_blank">React Router</a></li>
            <li><a href="https:// https://jwt.io" target="_blank">JSON Web Token</a></li>
            <li><a href="https://github.com/facebook/fixed-data-table" target="_blank"> Fixed-Data-Table</a></li>
            <li><a href="https://github.com/webpack/style-loader" target="_blank">style-loader</a></li>
            <li><a href="https://github.com/twbs/bootstrap " target="_blank"> Bootstrap</a></li>
            <li><a href="http://expressjs.com" target="_blank">Express</a></li>
            <li><a href="http://babeljs.io" target="_blank">Babel</a></li>
            <li><a href="http://webpack.github.io" target="_blank">Webpack</a></li>
          </ul>
        </div>
      </div>
    );
  }
}
