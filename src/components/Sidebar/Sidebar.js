/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim
* Upgrade by bluesven869
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { useEffect, useCallback, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "logo-white.svg";

var ps;

function Sidebar(props) {
  const sidebar = useRef(null);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, []);

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback((routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }, [props.location.pathname]);

  return (
    <div className="sidebar" data-color={props.backgroundColor}>
      <div className="logo">
        <a
          href="https://www.creative-tim.com?ref=nudr-sidebar"
          className="simple-text logo-mini"
          target="_blank"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a
          href="https://www.creative-tim.com?ref=nudr-sidebar"
          className="simple-text logo-normal"
          target="_blank"
        >
          Creative Tim <br />bluesven869
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li
                className={
                  activeRoute(prop.layout + prop.path) +
                  (prop.pro ? " active active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={"now-ui-icons " + prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
