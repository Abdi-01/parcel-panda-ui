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
import UserProfile from './pages/profile';
import ProductManagement from './pages/adminProduct';
import AdminAppBar from './components/adminAppBar';
import TransactionManagement from './pages/adminTransaction';
import SalesReport from './pages/adminSales';
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
        {
          this.props.role === "admin" ? <AdminAppBar /> : <NavbarComp />
        }
        <Switch>
          <Route 
            path="/" 
            component={ this.props.role !== "admin" ? LandingPage : ProductManagement } exact />
          <Route path="/regis" component={RegisterPage} />
          <Route path="/forget-pass" component={ResetPassPage} />
          <Route path="/verification" component={VerificationPage} />
          {
            this.props.role === "admin" ?
              <>
                {/* <Route path="/" component={AdminPage} exact /> */}
                <Route path='/user-profile' component={UserProfile} />
                <Route path='/product-management' component={ProductManagement} exact />
                <Route path='/transaction-management' component={TransactionManagement} />
                <Route path='/sales-report' component={SalesReport} />
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
