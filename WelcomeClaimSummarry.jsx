import React from "react";
import ReactDOM from "react-dom";
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Row,Container,DatePicker} from 'react-bootstrap';
import axios from 'axios';
import Footer from './Footer.jsx'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Navigate=this.Navigate.bind(this);
    this.state = {errors: [],
                  employees: {} }
  }
  Navigate(event){
    event.preventDefault();
    var isValidate = true;
     const formData = {};
    var UserName = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errors =[];
    var isSuccess = false;
    if(UserName=='')
    {
      isValidate = false;
      errors.UserName = "Please enter userName"
    }
    if(password.length < 8)
    {
      isValidate = false
      errors.password ="Please enter password with length greater than 8"
    }
   
    if(isValidate)
    {
      for (const fields in this.refs) {
        formData[fields] = this.refs[fields].value;   
      }
      axios.get(`http://localhost:3000/authusers/`+ formData["userName"])
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
        });
        console.log(this.state.employees)
        if (this.state.employees.username == formData["userName"] && this.state.employees.password == formData["password"]) {                  
            isSuccess = true;
            this.props.router.push("/home"); 
        }
        console.log(isSuccess);
        if(!isSuccess)
        {
           errors.invalidcredentials = "Invalid Credentials.Enter a valid username and password"
         }      
      
      }       
   
    this.setState({
      errors: errors
    });
    }
  render() {
    return (
      <div>
        <div id="LoginPage"><h1>Claim Management System</h1></div>
      <header id ="LoginHeder"><h1>Login</h1></header>
      <Form id = "loginform">
      <Form.Group as={Row} controlId="formHorizontalEmail">
        <Form.Label column sm={2} id ="formLabel">
          UserName
        </Form.Label>
        <Col sm={5}>
          <Form.Control type="text" placeholder="UserName" ref="userName" id="username" name="username" required/>
          <div className="input-feedback" id="validations">{this.state.errors.UserName}</div>
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2} id ="formLabel">
          Password
        </Form.Label>
        <Col sm={5}>
          <Form.Control type="password" placeholder="Password"  ref="password" id="password" name="username" required/>
          <div className="input-feedback" id="validations">{this.state.errors.password}</div>
        </Col>
      </Form.Group>
      <div className="input-feedback" id="credential">{this.state.errors.invalidcredentials}</div>
      <Button type="button"  size="md" id="loginButton" className="btn btn-primary" onClick={this.Navigate}>Sign In</Button>   
      </Form>
      <Footer/>
      </div>
    );
  }
}
export default Login;