import React from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } 
from 'react-router';
// import{nav}

class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date().toLocaleDateString()
          };
    }
    render() {
        return(
            
            <ul>
            <div id = "nav">
            <li><Link to="#">Home</Link></li>
            <li><Link to ="claim">ClaimSummary</Link></li>
            <li><Link to ="updateClaim">UpdateClaim </Link></li> 
            <li><a href="#submit">ContactUs</a></li>
            <li>< Link to = "LogOut" id ="logout">Log Out</Link></li>
            <div className="datetime"><p>Login Date: {this.state.date} </p></div>
            </div>
            {this.props.children}
            </ul>  
         
        );
    }
};
export default Header;