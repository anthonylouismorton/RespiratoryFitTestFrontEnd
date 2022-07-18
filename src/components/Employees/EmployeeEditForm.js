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
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function EmployeeEditForm(props) {

	const [formValues, setFormValues] = useState({
    employeeID: props.selectedEmployee.employeeID,
    firstName: props.selectedEmployee.firstName,
    middleName: props.selectedEmployee.middleName,
    lastName: props.selectedEmployee.lastName,
    address1: props.selectedEmployee.address1,
		address2: props.selectedEmployee.address2,
    address3: props.selectedEmployee.address3,
    city: props.selectedEmployee.city,
    state: props.selectedEmployee.state,
    zip: props.selectedEmployee.zip,
    email: props.selectedEmployee.employeeEmail,
    phoneNumber: props.selectedEmployee.employePhoneNumber,
    dob: props.selectedEmployee.dob,
    ssn: props.selectedEmployee.ssn,
    companyName: props.selectedEmployee.companyName,
    companyID: props.selectedEmployee.companyID
	});

  const [companyList, setCompanyList] = useState([])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

  const handleDob = (date) => {
		setFormValues({
			...formValues,
			dob: date,
		});
	};

	const handleCancel = () => {
		setFormValues({
      employeeID: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phoneNumber: '',
      dob: '',
      ssn: '',
      companyName: '',
      companyID: ''
		});
		props.setHideEmployeeEdit(true);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/employee`,
			formValues,
		);

		setFormValues({
      employeeID: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      phoneNumber: '',
      dob: '',
      ssn: '',
      companyName: '',
      companyID: ''
		});
		props.setHideEmployeeEdit(true);
	};

  const getAllCompanies = async () =>{
    let companies = await axios.get(`${process.env.REACT_APP_DATABASE}/company`)
    setCompanyList(companies.data)
  };

  useEffect(()=> {
    getAllCompanies();
  }, []);
  console.log(props.selectedEmployee)
	return (
		<Box>
			<Paper>
				<Typography>Add New Mask</Typography>
				<Grid>
					<form onSubmit={onSubmit}>
						<Grid>
							<Grid item>
                <FormControl fullWidth>
									
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='firstName'
                    id='outlined-multiline-static'
                    label='First Name'
                    defaultValue={props.selectedEmployee.firstName}
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
                    name='middleName'
                    id='outlined-multiline-static'
                    label='Middle Name'
                    defaultValue={props.selectedEmployee.middleName}
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
                    name='lastName'
                    id='outlined-multiline-static'
                    label='Last Name'
                    defaultValue={props.selectedEmployee.lastName}
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
                    name='address1'
                    id='outlined-multiline-static'
                    label='Address 1'
                    defaultValue={props.selectedEmployee.address1}
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
                    name='address2'
                    id='outlined-multiline-static'
                    label='Address 2'
                    defaultValue={props.selectedEmployee.address2}
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
                    name='address3'
                    id='outlined-multiline-static'
                    label='Address 3'
                    defaultValue={props.selectedEmployee.address3}
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
                    name='city'
                    id='outlined-multiline-static'
                    label='city'
                    defaultValue={props.selectedEmployee.city}
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
                    name='state'
                    id='outlined-multiline-static'
                    label='State'
                    defaultValue={props.selectedEmployee.state}
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
                    name='zip'
                    id='outlined-multiline-static'
                    label='Zip Code'
                    defaultValue={props.selectedEmployee.zip}
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
                    name='employeeEmail'
                    id='outlined-multiline-static'
                    label='Email'
                    defaultValue={props.selectedEmployee.employeeEmail}
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
                    name='employeePhoneNumber'
                    id='outlined-multiline-static'
                    label='Phone Number'
                    defaultValue={props.selectedEmployee.employeePhoneNumber}
                    rows={1}
                    onChange={handleChange}
                  />
                </FormControl>
							</Grid>
						</Grid>
            <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="DOB"
                      inputFormat="MM/dd/yyyy"
                      value={formValues.dob}
                      onChange={handleDob}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
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
                    defaultValue={props.selectedEmployee.ssn}
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
							<Button type='submit' color='success' variant='contained'>
								Submit
							</Button>
							<Button onClick={handleCancel} color='error' variant='contained'>
								Cancel
							</Button>
						</Grid>
					</form>
				</Grid>
			</Paper>
		</Box>
	);
}