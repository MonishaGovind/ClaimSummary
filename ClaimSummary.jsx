// Develop the statefull component here 

import React from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { Router, Route, Link, browserHistory, IndexRoute  } from  'react-router';
import Header from './Header.jsx'
import Footer from './Footer.jsx'


class ClaimSummary extends React.Component {
   
    constructor(props){
        super(props);
        this.state = {
            employees: []
    }
}
componentDidMount() {
    axios.get(`http://localhost:7000/employeeData`)
      .then(res => {
        const employees = res.data;
        this.setState({ employees });
      }) }
  render(){
  let update = "updateClaim"; 
    return (
        <div>
        <Header/>
            <header><h1>CLAIM SUMMARY</h1></header>
                <Table striped bordered hover className = 'table'>
                    <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee Name</th>
                        <th>Claim Number</th>
                        <th>Claim Type</th>
                        <th>Claim Program</th>
                        <th>Claim Start Date</th>
                        <th>Claim End Date</th>
                        <th>Update</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.employees.map((employees,index) => {
                         return (
                             <tr key = {index}>
                             <td>{employees.id}</td>
                             <td>{employees.EmployeeName}</td>
                             <td>{employees.ClaimNumber} </td>
                              <td>{employees.ClaimType} </td>
                              <td>{employees.ClaimProgram}</td>
                              <td>{employees.ClaimStartDate} </td>
                              <td>{employees.ClaimEndDate} </td>
                              <td><Link to ={`${update}/${employees.id}`} id="update"> UpdateClaim </Link> </td>
                             </tr>
                             
                         );
                    })
                }
                </tbody>
                </Table>

                <Footer/>
                </div>
                
     );
  }
}
export default ClaimSummary;

