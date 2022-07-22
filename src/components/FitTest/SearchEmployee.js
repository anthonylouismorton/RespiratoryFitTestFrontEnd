import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyEmployeeList from './CompanyEmployeeList';
import QualitativeFitTest from './QualitativeFitTest';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

export default function SearchEmployee() {
	const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    companyID: ''
	});

  const [companyList, setCompanyList] = useState([]);
  const [companyEmployeeList, setCompanyEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [hideCompanyEmployeeList, setHideCompanyEmployeeList] = useState(true);
  const [showEmployeeInformation, setShowEmployeeInformation] = useState(true);

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
      console.log('in here')
      setFormValues({
        firstName: '',
        lastName: '',
        ssn: '',
        companyID: value
      });
    }
	};

	const onSubmit = async (e) => {
    e.preventDefault();
    if(formValues.companyID){
      let companyEmployees = await axios.get (`${process.env.REACT_APP_DATABASE}/companyEmployee/${formValues.companyID}`)
      setCompanyEmployeeList(companyEmployees.data);
    };
    if(formValues.ssn){
      let employee = await axios.get (`${process.env.REACT_APP_DATABASE}/employeeBySSN/${formValues.ssn}`)
      let employeeSSN = Number(String(employee.data.ssn).slice(-4))
      setSelectedEmployee(
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
    }

    setHideCompanyEmployeeList(false)
	};

  const getAllCompanies = async () =>{
    let companies = await axios.get(`${process.env.REACT_APP_DATABASE}/company`)
    setCompanyList(companies.data)
  };

  useEffect(()=> {
    getAllCompanies();
  }, []);
  console.log(selectedEmployee)
	return (
    <Box>
    {hideCompanyEmployeeList === true &&
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
    }
    {formValues.companyID !== '' && hideCompanyEmployeeList === false &&
    <CompanyEmployeeList companyEmployeeList={companyEmployeeList} setCompanyEmployeeList={setCompanyEmployeeList} selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee} setHideCompanyEmployeeList={setHideCompanyEmployeeList}/>
    }
    {formValues.ssn !== '' && hideCompanyEmployeeList === false && showEmployeeInformation === true &&
    <>
    <Button variant='contained' onClick={()=> setHideCompanyEmployeeList(true)}>Back</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Middle Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">SSN</TableCell>
            <TableCell align="center"> New Fit Test</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              hover
              key={selectedEmployee.employeeID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{selectedEmployee.firstName}</TableCell>
              <TableCell align="center">{selectedEmployee.middleName}</TableCell>
              <TableCell align="center">{selectedEmployee.lastName}</TableCell>
              <TableCell align="center">{selectedEmployee.dob}</TableCell>
              <TableCell align="center">{selectedEmployee.ssn}</TableCell>
              <TableCell align="center">
                <Button variant='contained' onClick={()=> setShowEmployeeInformation(false)}>Quantitative</Button>
                <Button variant='contained' onClick={()=> setShowEmployeeInformation(false)}>Qualitative</Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
    }
    <>
    {showEmployeeInformation === false &&
    <QualitativeFitTest selectedEmployee={selectedEmployee} setSelectedEmployee={setSelectedEmployee}/>
    }
    </>
  </Box>
	);
}