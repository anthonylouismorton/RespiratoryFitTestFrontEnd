import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
	TextField,
	Button,
	Paper,
	Grid,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Typography,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

export default function AddCompanyForm(props) {
	const filter = createFilterOptions();

	const [formValues, setFormValues] = useState({
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

  const [companyNameList, setCompanyNameList] = useState([])

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
		props.setHideAddCompanyForm(true);
  };

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
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
		props.setHideAddCompanyForm(true);
	};

  const getRespiratorModels = async () =>{
    // let respirators = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorList`)
    // setRespiratorList(respirators.data)
  };

  useEffect(()=> {
    getRespiratorModels();
  }, []);
  console.log(formValues)
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
                    name='companyName'
                    id='outlined-multiline-static'
                    label='Company Name'
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
                    rows={1}
                    onChange={handleChange}
                  />
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