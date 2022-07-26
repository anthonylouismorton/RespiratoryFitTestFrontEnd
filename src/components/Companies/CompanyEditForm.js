import React, { useState } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	Box,
	Typography,
} from '@mui/material';

export default function CompanyEditForm(props) {

	const [formValues, setFormValues] = useState({
    companyID: props.selectedCompany.companyID,
    address1: props.selectedCompany.address1,
		address2: props.selectedCompany.address2,
    address3: props.selectedCompany.address3,
    city: props.selectedCompany.city,
    state: props.selectedCompany.state,
    zip: props.selectedCompany.zip,
    email: props.selectedCompany.email,
    altEmail: props.selectedCompany.altEmail,
    phoneNumber: props.selectedCompany.phoneNumber,
    ext: props.selectedCompany.ext,
    companyName: props.selectedCompany.companyName
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const handleCancel = () => {
		setFormValues({
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      altEmail: '',
      phoneNumber: '',
      ext: '',
      companyName: ''
		});
		props.setHideCompanyEdit(true);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/company`,
			formValues,
		);

		setFormValues({
      address1: '',
      address2: '',
      address3: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      altEmail: '',
      phoneNumber: '',
      ext: '',
      companyName: ''
		});
		props.setHideCompanyEdit(true);
	};

	return (
		<Box>
			<Paper>
				<Typography>Edit {props.selectedCompany.companyName}</Typography>
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
                    name='companyName'
                    id='outlined-multiline-static'
                    label='Company Name'
                    defaultValue={props.selectedCompany.companyName}
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
                    defaultValue={props.selectedCompany.address1}
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
                    defaultValue={props.selectedCompany.address2}
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
                    defaultValue={props.selectedCompany.address3}
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
                    defaultValue={props.selectedCompany.city}
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
                    defaultValue={props.selectedCompany.state}
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
                    defaultValue={props.selectedCompany.zip}
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
                    name='email'
                    id='outlined-multiline-static'
                    label='email'
                    defaultValue={props.selectedCompany.email}
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
                    name='altEmail'
                    id='outlined-multiline-static'
                    label='Alt Email'
                    defaultValue={props.selectedCompany.altEmail}
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
                    name='phoneNumber'
                    id='outlined-multiline-static'
                    label='Phone Number'
                    defaultValue={props.selectedCompany.phoneNumber}
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
                    name='ext'
                    id='outlined-multiline-static'
                    label='Phone Ext'
                    defaultValue={props.selectedCompany.ext}
                    rows={1}
                    onChange={handleChange}
                  />
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