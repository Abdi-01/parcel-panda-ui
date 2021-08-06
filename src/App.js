import React from 'react';
import NavbarComp from './components/navbar/index';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/register';
import ResetPassPage from './pages/resetPass';
import VerificationPage from './pages/verification';
import { keepLogin, getProductActions, getParcelActions, getCart } from "./actions"
import { connect } from 'react-redux';
import axios from 'axios';
import { URL_API } from './helper';
import LandingPage from './pages/landing';
import UserProfile from './pages/profile';
import FooterComp from './components/footer';
import ProductManagement from './pages/adminProduct';
import AdminAppBar from './components/adminAppBar';
import TransactionManagement from './pages/adminTransaction';
import SalesReport from './pages/adminSales';
import ParcelPage from './pages/parcel';
import ProductsPage from './pages/product';
import ProductDetailPage from './pages/productDetail';
import CartPages from './pages/cart';
import CheckoutPage from './pages/checkout';
import UserTransactionPage from './pages/userTransaction';
import PageNotFound from './pages/pageNotFound';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.reLogin()
    this.props.getProductActions()
    this.props.getParcelActions()
    this.props.getCart()
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
      <div style={{position: 'relative', minHeight:"100vh"}}>
        {
          this.props.role === "admin" ? <AdminAppBar /> : <NavbarComp />
        }
        {
          this.props.role === "admin" ?
            <Switch>
              <Route path="/" component={ProductManagement} exact/>
              <Route path='/product-management' component={ProductManagement} exact />
              <Route path='/transaction-management' component={TransactionManagement} />
              <Route path='/sales-report' component={SalesReport} />
              <Route path='*' component={PageNotFound} />
            </Switch> :
          this.props.role === "user" ?
            <Switch>
              <Route path="/" component={LandingPage} exact/>
              <Route path='/user-profile' component={UserProfile} />
              <Route path="/parcel" component={ParcelPage} />
              <Route path="/product" component={ProductsPage} />
              <Route path="/product-detail" component={ProductDetailPage} />
              <Route path="/cart/:id" component={CartPages} />
              <Route path="/checkout/:id" component={CheckoutPage} />
              <Route path="/user-transaction/:id" component={UserTransactionPage} />
              <Route path="*" component={PageNotFound} />
            </Switch> :
            <Switch>
              <Route path="/" component={LandingPage} exact/>
              <Route path="/regis" component={RegisterPage} />
              <Route path="/forget-pass" component={ResetPassPage} />
              <Route path="/verification" component={VerificationPage} />
              <Route path="/parcel" component={ParcelPage} />
              <Route path="/product" component={ProductsPage} />
              <Route path="/product-detail" component={ProductDetailPage} />
              <Route path="*" component={PageNotFound} />
          </Switch>
        }
        <FooterComp />
      </div>
    );
  }
}

const mapsStateToProps = ({ authReducer }) => {
  return {
    role: authReducer.role
  }
}

export default connect(mapsStateToProps, { keepLogin, getProductActions, getParcelActions, getCart })(App);
