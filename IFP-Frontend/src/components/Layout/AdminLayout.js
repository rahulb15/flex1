import React from "react";
import {
  Route,
  Switch,
  withRouter,
  
} from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Dashboard from "../../pages/dashboard/Dashboard";
import TestDashboard from "../../pages/dashboard/TestDashboard";


// map with redux
import Map from "../../pages/map";
import AddForm from "../../pages/map/form/AddForm";
import EditForm from "../../pages/map/form/EditForm";

// user
import User from "../../pages/sitemembers";

// permission

import Permission from "../../pages/permissions";
import managePermissions from "../../pages/permissions/manageUser/managePermissions";

// industry
import Industry from "../../pages/industry"
// technology
import Technology from "../../pages/technology";
//features
import Features from "../../pages/features";
//portfolio
import Portfolio from "../../pages/portfolio";
// context
import { useLayoutState } from "../../context/LayoutContext";


function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classnames(classes.content, {
              [classes.contentShift]: layoutState.isSidebarOpened,
            })}
          >
            <div className={classes.fakeToolbar} />
              <Switch>

                <Route path="/dashboard" component={Dashboard} />
                {/* <Route path="/dashboard" component={TestDashboard} /> */}
                
                <Route exact path="/map" component={Map} />
                <Route path="/map/add" component={AddForm} />
                <Route path="/map/edit/:id" component={EditForm} />
                
                <Route exact path="/user" component={User} />
                {/* <Route exact path="/permission/" component={Permission} /> */}
                <Route exact path="/permission/" component={managePermissions} />
                <Route exact path="/industry/" component={Industry} />
               
                <Route exact path="/technology/" component={Technology} />
                
                <Route exact path="/features/" component={Features} />
              
                <Route exact path="/portfolio/" component={Portfolio} />
                

              </Switch>
          </div>
        </>
    </div>
  );
}

export default withRouter(AdminLayout);
