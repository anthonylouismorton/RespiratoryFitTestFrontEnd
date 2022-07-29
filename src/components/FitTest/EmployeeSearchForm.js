import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	Box,
	Typography,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';


export default function EmployeeSearchForm(props) {
const [companyList, setCompanyList] = useState([]);
const [formValues, setFormValues] = useState({
  firstName: '',
  lastName: '',
  ssn: '',
  companyID: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
    if(name === 'ssn'){
      setFormValues({
        firstName: '',
        lastName: '',
        ssn: value,
        companyID: ''
      });
    }
    else if(name === 'companyID'){
      setFormValues({
        firstName: '',
        lastName: '',
        ssn: '',
        companyID: value
      });
    };
    };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if(formValues.companyID){
      let companyEmployees = await axios.get (`${process.env.REACT_APP_DATABASE}/companyEmployee/${formValues.companyID}`)
      props.setCompanyEmployeeList(companyEmployees.data);
    };
    
    if(formValues.ssn){
      let employee = await axios.get (`${process.env.REACT_APP_DATABASE}/employeeBySSN/${formValues.ssn}`)
      let employeeSSN = Number(String(employee.data.ssn).slice(-4))
      props.setSelectedEmployee(
        {
          address1: employee.data.address1,
          address2: employee.data.address2,
          address3: employee.data.address3,
          city: employee.data.city,
          companyID: employee.data.companyID,
          dob: employee.data.dob.substr(0,10),
          employeeEmail: employee.data.employeeEmail,
          employeeID: employee.data.employeeID,
          employeePhoneNumber: employee.data.employeePhoneNumber,
          firstName: employee.data.firstName,
          lastName: employee.data.lastName,
          middleName: employee.data.middleName,
          ssn: employeeSSN,
          state: employee.data.state,
          zip: employee.data.zip,
        }
      );
      props.setShowFitTests(true)
      props.setShowEmployeeSearch(false)
      props.setShowEmployee(true)
    };
  };

const getAllCompanies = async () =>{
  let companies = await axios.get(`${process.env.REACT_APP_DATABASE}/company`)
  setCompanyList(companies.data)
};

useEffect(()=> {
  getAllCompanies();
}, []);
return(
  <Box>
  <Paper>
    <Typography>Search</Typography>
    <Grid>
      <form onSubmit={onSubmit}>
        <Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                name='firstName'
                id='outlined-multiline-static'
                label='First Name'
                rows={1}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                name='lastName'
                id='outlined-multiline-static'
                label='Last Name'
                rows={1}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid>
          <Grid item>
            <FormControl fullWidth>
              <TextField
                name='ssn'
                id='outlined-multiline-static'
                label='SSN'
                rows={1}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid>
          <Grid item>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>
                Company
              </InputLabel>
              <Select
                name='companyID'
                value={formValues.companyID}
                label='Company'
                onChange={handleChange}
              >
                {companyList.map((company) => (
                  <MenuItem key={company.companyID} value={company.companyID}>{company.companyName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item>
          <Button type='submit' variant='contained'>
            Search
          </Button>
        </Grid>
      </form>
    </Grid>
  </Paper>
  </Box>
)};