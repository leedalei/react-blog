import React, { Component } from "react";
import logoDark from "../img/logo.png";
import "../styles/CommonHeader.scss";
import { NavLink } from "react-router-dom";
export default class CommonHeader extends Component {
  
  render() {
    return (
      <div className="header-wrapper">
        <header className="header">
          <div className="header-img">
            <img src={logoDark} alt="logo" />
          </div>
          <ul className="nav">
            <li>
              <NavLink
                to={{pathname: '/home'}}
                className="nav-item"
                activeClassName="nav-item--active"
              >
                主页
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{pathname: '/booklist'}}
                className="nav-item"
                activeClassName="nav-item--active"
              >
                书籍
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{pathname: '/lineblog'}}
                className="nav-item"
                activeClassName="nav-item--active"
              >
                行博
              </NavLink>
            </li>
            <li>
              <NavLink
                to={{pathname: '/about'}}
                className="nav-item"
                activeClassName="nav-item--active"
              >
                简介
              </NavLink>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
