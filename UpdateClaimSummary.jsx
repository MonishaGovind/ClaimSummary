import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText ,Row,Container,DatePicker} from 'react-bootstrap';
import axios from 'axios';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Success from './Success.jsx';
class UpdateClaimSummary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            employees:{},
            errors: {},
            jsonbody:{}
          }
          this.empid = props.params.id; 
          this.handleInputChange = this.handleInputChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.clr = this.clr.bind(this);
    }
    componentDidMount() {
        axios.get(`http://localhost:7000/employeeData/get/`+this.empid )
          .then(res => {
            const employees = res.data;
            employees.ClaimStartDate = employees.ClaimStartDate.split('/').reverse().join('-')
            employees.ClaimEndDate = employees.ClaimEndDate.split('/').reverse().join('-')
            this.setState({ employees : employees });
          })
      }
        clr()
            {
              this.props.router.push("/claim"); 
            }
        handleInputChange(event) {
          event.preventDefault();
                var name = event.target.name;
                var value = event.target.value;
                const newValue = this.state.employees;
                newValue[name] = value;
                this.setState({employees: newValue} ) 
              }
        handleSubmit(event) {
                event.preventDefault();
                this.state.errors =[]
                var errors = [];
                var Isvalid = "true";
                var regex =/^([0-9a-zA-Z]{3}-){2}[0-9a-zA-Z]{3}$/i;
               
                if (!regex.test(this.state.employees.ClaimNumber)) 
                {
                  errors.ClaimNumber = "*Please enter valid format  XXX-XXX-XXX*";
                  Isvalid = false;
                  
                }
                 var isValidClaimprogram = this.state.employees.ClaimProgram.length >1 && this.state.employees.ClaimProgram.length <=20 

                if(!isValidClaimprogram)
                {
                  errors.ClaimProgram = "*Max length of  Claim Program should be 20*";
                  Isvalid = false;
                }
                if(this.state.employees.ClaimType == '')
                {
                  errors.ClaimType = "*Please select a ClaimType*"
                  Isvalid = false;
                }
                if(this.state.employees.ClaimStartDate=='')
                {
                  errors.ClaimStartDate = "*Please enter a ClaimStartDate*"
                  Isvalid = false;
                }
                if(this.state.employees.ClaimEndDate=='')
                {
                  errors.ClaimEndDate = "*Please enter a ClaimEndDate*"
                  Isvalid = false;
                }
                this.setState({
                  errors: errors,
                  });
                  if(Isvalid){
                  this.updatedate(this.state.employees);
                  this.props.router.push("/Success"); 
                }
                
            }
            updatedate(employees)
            {
              const data = employees;
              data.ClaimStartDate = data.ClaimStartDate.split("-").reverse().join("/");
              data.ClaimEndDate = data.ClaimEndDate.split("-").reverse().join("/");
              axios.put(`http://localhost:7000/employeeData/update/`+ this.empid, data)
                  .then(res => {
                    console.log(res)
                  })   
            }
    render() {
        return(
    <div>
         <Header/>
         <header id = "Updateheader"> <h2>UPDATE CLAIM SUMMARY</h2> </header>
         <Container>
                <Form id ='form'>
                    <Form.Group as={Row}>
                    <Form.Label  className="col-2" >Employee ID:</Form.Label>
                    <Col sm="7">
                    <Form.Control value={this.state.employees.id} type="text" id="EmployeeId" name="EmployeeId" readOnly/>
                     </Col>
                     </Form.Group>
                     <Form.Group as={Row}>
                    <Form.Label className="col-2 ">Employee Name:</Form.Label>
                    <Col sm="7">
                    <Form.Control value={this.state.employees.EmployeeName} type="text" id="EmployeeName" name="EmployeeName" disabled/>
                    </Col>
                   </Form.Group>
                   <Form.Group as={Row}>
                    <Form.Label className="col-2">Claim Number:</Form.Label>
                    <Col sm="7">
                    <Form.Control  id="ClaimNumber" name="ClaimNumber" value={this.state.employees.ClaimNumber}  onChange={this.handleInputChange} required/>
                    <div className="help-block" id ="validations">{this.state.errors.ClaimNumber}</div>
                    </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                    <Form.Label className="col-2">Claim Type:</Form.Label >
                    <Col sm="7">
                    <Form.Control as="select" id="ClaimType" name="ClaimType" value={this.state.employees.ClaimType} onChange={this.handleInputChange} required>
                        <option value="">Select</option>
                        <option value="Submitted">Submitted</option>
                        <option value="Received">Received</option>
                        <option value="Pending">Pending</option>
                        <option value="More Info Required">More Info Required</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Paid">Paid</option>
                        <option value="Active">Active</option>
                       </ Form.Control >
                       <div className="help-block" id ="validations">{this.state.errors.ClaimType}</div>
                      </Col>
                      </Form.Group>
                      <Form.Group as={Row}>
                    <Form.Label className="col-2">Claim Program:</Form.Label>
                    <Col sm="7">
                    <Form.Control  type="text" id="ClaimProgram"  value={this.state.employees.ClaimProgram} name="ClaimProgram" onChange={this.handleInputChange} required/>
                    <div className="help-block" id ="validations">{this.state.errors.ClaimProgram}</div>
                    </Col>
                </Form.Group >
                <Form.Group as={Row}>
                    <Form.Label className="col-2">Claim Start Date:</Form.Label>
                    <Col sm="7">
                      <Form.Control  value= {this.state.employees.ClaimStartDate} type="date" id="ClaimStartDate" name="ClaimStartDate"  min="2018-01-01" max="2020-12-31"  onChange={this.handleInputChange} required/>  
                      <div className="help-block" id ="validations">{this.state.errors.ClaimStartDate}</div>
                </Col>
                </Form.Group >
                <Form.Group as={Row}>
                <Form.Label className="col-2 ">Claim End Date:</Form.Label>
                <Col sm="7">
                <Form.Control  value={this.state.employees.ClaimEndDate}type="date" id="ClaimEndDate" name="ClaimEndDate"  min="2018-01-01" max="2020-12-31" onChange={this.handleInputChange} required/>
                <div className="help-block" id ="validations">{this.state.errors.ClaimEndDate}</div>
                </Col>
                </Form.Group >
                <Button type="button" id="Updatebutton" size="lg" className="btn btn-primary" onClick={this.handleSubmit}>Update</Button>
                <Button type="button" id="Resetbutton" size="lg" className="btn btn-primary " onClick={this.clr}> Cancel </Button>
                </Form>
                </Container>
                <Footer/>
    </div>

        );
    }
}
export default UpdateClaimSummary;