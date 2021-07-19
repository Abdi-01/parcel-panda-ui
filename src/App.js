import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LandingPage from './pages/landing'
import UserProfile from './pages/profile'
// import FinancialReport from './pages/report'
// import ProductManagement from './pages/product'
// import TransactionManagement from './pages/transaction'
// import SpecialMenu from './pages/specialMenu'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  
  render() { 
    return (
      <div>
        <Switch>
          <Route path="/" component={LandingPage} exact />
          {/* <Route path="/special-menu" component={SpecialMenu} /> */}
          <Route path='/user-profile' component={UserProfile}/>
          {/* <Route path='/sales-report' component={FinancialReport}/>
          <Route path='/product-management' component={ProductManagement}/>
          <Route path='/transaction-management' component={TransactionManagement}/> */}
        </Switch>
      </div>
    )
  }
}

export default App
