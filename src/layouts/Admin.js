/*!

=========================================================
* New UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim
* Upgraded by bluesven869
=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useRef, useCallback, useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

var ps;

function Dashboard(props) {
  const [backgroundColor, setBackgroundColor] = useState("blue");

  const mainPanel = useRef(null);

  const psInit = useCallback(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }, []);

  const psDestroy = useCallback(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }, []);

  useEffect(() => {
    psInit();
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;

    return function cleanup() {
      psDestroy();
    };
  }, [psDestroy, psInit]);

  const handleColorClick = useCallback((color) => {
    setBackgroundColor(color);
  }, []);

  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routes} backgroundColor={backgroundColor} />
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Switch>
          {routes.map((prop, key) => {
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          })}
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
        <Footer fluid />
      </div>
      <FixedPlugin
        bgColor={backgroundColor}
        handleColorClick={handleColorClick}
      />
    </div>
  );
}

export default Dashboard;
