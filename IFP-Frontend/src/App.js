import React, { useContext } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import AdminLayout from "./components/Layout/AdminLayout";
// pages
import Error from "./pages/error/Error";
import Login from "./pages/login/Login";
// context
import { AuthContext } from "./context/AuthContext";
// redux
import { Provider } from "react-redux";
import { store } from "./store/store";
// toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import change_pass from "./components/change_password/change_pass";
import {CountProvider} from "./context/CountContext";
import {DataFlowProvider} from "./context/DataFlowContext";
import ForgetPassword from "./pages/forgetPassword/forgetPassword";

export default function App() {
  // global
  let { isAuthenticated } = useContext(AuthContext)

  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={false}
        pauseOnHover={false}
      />
      <CountProvider>
      <DataFlowProvider>
      <HashRouter>
          <Switch>
            <Route path="/forget" component={ForgetPassword}/>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            {/* <Route exact path="/" render={() => <Redirect to="/dashboard" />} /> */}
            <Route path="/login" component={Login} />
            <Route path="/change_password" component={change_pass} />
            <ProtectedRoute path="/" component={AdminLayout} />
            <Route component={Error} />
          </Switch>
      </HashRouter>
      </DataFlowProvider>
      </CountProvider>
    </Provider>
  );

  // #######################################################################

  function ProtectedRoute ({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props} /> 
          ) : (
            <Redirect
              to={{
                // pathname: "/forget" || '/login',
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  /* function PublicRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Redirect to={{ pathname: "/" }} />
          ) : (
            <Component {...props} /> 
          )
        }
      />
    );
  } */

}
