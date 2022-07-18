import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

export default function SearchEmployee(props) {
	const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    ssn: '',
    companyID: ''
	});

  const [companyList, setCompanyList] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleCancel = () => {
		setFormValues({
      firstName: '',
      lastName: '',
      ssn: '',
      companyID: ''
		});
		props.setHideAddEmployeeForm(true);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/employee`,
			formValues,
		);

		setFormValues({
      firstName: '',
      lastName: '',
      ssn: '',
      companyID: ''
		});
		props.setHideAddEmployeeForm(true);
	};

  const getAllCompanies = async () =>{
    let companies = await axios.get(`${process.env.REACT_APP_DATABASE}/company`)
    setCompanyList(companies.data)
  };

  useEffect(()=> {
    getAllCompanies();
  }, []);
  console.log(formValues)
	return (
		<Box>
			<Paper>
				<Typography>Add New Employee</Typography>
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
							<Button type='submit' color='success' variant='contained'>
								Add Company
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