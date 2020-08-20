import React from 'react';
import ReactDOM from 'react-dom';
import ClaimSummary from './ClaimSummary.jsx';
import UpdateClaimSummary from './UpdateClaimSummary.jsx'
import Login from './WelcomeClaimSummarry.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router';
import Home from './Home.jsx';
import Success from './Success.jsx'

// ReactDOM.render((
//        <Router history = {browserHistory}>
       
//               <IndexRoute component = {Login} />
//               {/* <Route path="/" component = {AppRouter}></Route> */}
//               <Route path = "/ClaimSummary" component = {ClaimSummary} />
//               <Route path = "/UpdateClaim/:id" component = {UpdateClaim} />
//               <Route  path = "/" component = {Login}>
//        </Route>
//       </Router>
//       ), document.getElementById('router'));
ReactDOM.render((
    <Router history = {browserHistory}>
           <Route path = "/" component = {Login}> </Route>
           {/* <IndexRoute component = {Login} /> */}
           <Route path = "home"  component = {Home}/>
           <Route path = "claim" component = {ClaimSummary} />
           <Route path = "updateClaim/:id" component = {UpdateClaimSummary} />
           <Route path = "LogOut" component = {Login} />
           <Route path = "Success" component = {Success} />
           <Route path = "/" component = {Login}></Route>
    {/* </Route> */}
   </Router>
   ), document.getElementById('login'));

ReactDOM.render(<Footer/>, document.getElementById('footer'));
