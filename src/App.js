import React from 'react';
import NavbarComp from './components/navbar/index';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/register';
import ResetPassPage from './pages/resetPass';
import VerificationPage from './pages/verification';
import { keepLogin } from "./actions"
import { connect } from 'react-redux';
import axios from 'axios';
import { URL_API } from './helper';
import LandingPage from './pages/landing';
import AdminPage from './pages/admin';
import UserProfile from './pages/profile';
// import FinancialReport from './pages/report'
// import ProductManagement from './pages/product'
// import TransactionManagement from './pages/transaction'
// import SpecialMenu from './pages/specialMenu'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
  }

  reLogin = () => {
    let token = localStorage.getItem("tkn_id");
    if (token) {
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios.post(URL_API + `/auth/keep`, {}, headers)
        .then((res) => {
          this.props.keepLogin(res.data)
        })
        .catch((err) => {
          console.log("Keeplogin error :", err)
        })
    }
  }

  render() {
    return (
      <div>
        <NavbarComp />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/regis" component={RegisterPage} />
          <Route path="/forget-pass" component={ResetPassPage} />
          <Route path="/verification" component={VerificationPage} />
          {
            this.props.role === "admin" ?
              <>
                <Route path="/" component={AdminPage} exact />
                <Route path='/user-profile' component={UserProfile} />
              </> : this.props.role === "user" ?
                <>
                  <Route path="/" component={LandingPage} exact />
                  <Route path='/user-profile' component={UserProfile} />
                </> :
                <Route path="*" component={LandingPage} exact />
          }
        </Switch>
      </div>
    );
  }
}

const mapsStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapsStateToProps, { keepLogin })(App);
