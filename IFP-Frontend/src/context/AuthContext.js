import React from "react";
import API from "../utils/api"
import jwt from 'jwt-decode'
import { toast } from 'react-toastify';

let AuthContext;
const { Provider, Consumer } = (AuthContext = React.createContext());

class AuthProvider extends React.PureComponent {

    state = {
        token : null,
        authUser: null,
        errorMsg : null
    };

    isAuthenticated = () => {
      const tken = this.state.token ? this.state.token : localStorage.getItem("token")
      if (!tken) return false

      const decoded = jwt(tken); 

      if (Date.now() / 1000 > decoded.exp - 5) {
        localStorage.clear();
        toast.error('Session has expired, please re-login');
        return false
      }
      return true
    }

    getAuthUser = () => {
      const usr = this.state.authUser ? this.state.authUser : localStorage.getItem("authUser")
      if (!usr) return null

      try {
        const parsed = JSON.parse(usr)
        return parsed
      }
      catch(err) {
        return usr
      }
    }

    setLogin = (data) => { 
      console.log("dattttaaa",data)
      if (data) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('authUser', JSON.stringify(data.user))
        this.setState({
          token : data.token,
          authUser: data.user
        })
        
      }
      else {
        this.setState({
          token : null,
          authUser: null
        })
        localStorage.removeItem("token");
        localStorage.removeItem("authUser");
      }
    }
    
    login = (email, password, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
      this.setLogin(null)

      if (!!email && !!password) {
        API.auth().login({ email, password })
        .then(res => {
            // console.log("res : ", JSON.stringify(res.data))
            
            if (res.status === 200 && res.data) {
              this.setLogin(res.data)
              setIsLoading(false)
              setErrorMessage(null)
              history.push('/dashboard')
              return true
            }
            else {
              setIsLoading(false);
              setErrorMessage( res.data.message)
              return false
            }
        })
        .catch(err => {
            setIsLoading(false);

            console.log(err)
            if (err.response)
              setErrorMessage(err.response.data.message)
            else {
              setErrorMessage(err)
            }
              
            return false
        });
      } else {
        setIsLoading(false);
        setErrorMessage("email and password is empty")
        return false
      }
    }
    
    register = (email, name, password, history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
    
      if (!!email && !!name && !!password) {
        API.auth().register({ email, name, password })
            .then(res => {
              // console.log(res)
              setErrorMessage(null)
              setIsLoading(false);
              history.push('/admin/login')
            })
            .catch(err => {
              console.log(err.response.data)
              setErrorMessage(err.response.data.error)
              setIsLoading(false);
            });
      } else {
        setErrorMessage("All field is required")
        setIsLoading(false);
      }
    }

    logout = (history) => {
      this.setState({ 
        token : null,
        authUser: null
      });
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");

      history.push("/login");
    }
    reset_password = (old_password, new_password,pass1 ,history, setIsLoading, setErrorMessage) => {
      setIsLoading(true);
      if (!!old_password && !!new_password && !!pass1 ){
        API.auth().change_password({ old_password, new_password ,pass1})
            .then(res => {
               alert(res.data.msg);
              setErrorMessage(null)
              setIsLoading(false);
              history.push("/login");
            })
            .catch(err => {
              alert(err.response.data.msg);
              setErrorMessage(err.response.data.error)
              setIsLoading(false);
            });
      } else {
        setErrorMessage("All field is required")
        setIsLoading(false);
      }
    
    }


    change_password = (history) =>{ 
      // alert("Password changed");
      history.push("/change_password");
    }
    render() {
      return (
        <Provider
          value={{
              ...this.state,
              
              login : this.login,
              register : this.register,
              logout : this.logout,
              isAuthenticated : this.isAuthenticated,
              getAuthUser : this.getAuthUser,
              reset_password : this.reset_password,
              change_password : this.change_password,
          }}
        >
          {this.props.children}
        </Provider>
      );
    }
}

export { AuthProvider, Consumer, AuthContext };
