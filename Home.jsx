import React from "react";
import ReactDOM from "react-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Row,Container,DatePicker} from 'react-bootstrap';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class Home extends React.Component {
    render(){
        return(
            <div>
         <Header/>
         <header><h2>Welcome to Claim Management system</h2></header>
         <Footer/>
         </div>
        );
    }
}
export default Home;