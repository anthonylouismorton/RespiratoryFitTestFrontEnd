import React, {useEffect, useState} from 'react'
import axios from 'axios'
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

export default function QualitativeFitTest(props) {
  const [formValues, setFormValues] = useState({
    qualitativeTestID: '',
    qualitativeTestType: '',
    qualitativeTasteThreshold: '',
    qualitativeTestPass: '',
    qualitativeTestDate: '',
    qualitativeTestTime: '',
		qualitativeTestExpiration: '',
    employeeID: props.selectedEmployee.employeeID,
    respiratorID: '',
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
      console.log('in here')
      setFormValues({
        firstName: '',
        lastName: '',
        ssn: '',
        companyID: value
      });
    }
	};
  const handleDate = (date) => {
		setFormValues({
			...formValues,
			dob: date,
		});
	};
  const handleCancel = () => {
		setFormValues({
      qualitativeTestID: '',
      qualitativeTestType: '',
      qualitativeTasteThreshold: '',
      qualitativeTestPass: '',
      qualitativeTestDate: '',
      qualitativeTestTime: '',
      qualitativeTestExpiration: '',
      employeeID: '',
      respiratorID: '',
		});
		props.setHideAddEmployeeForm(true);
  };

	const onSubmit = async (e) => {
    
  };

  useEffect(()=> {

  }, []);
  return(
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
                  name='middleName'
                  id='outlined-multiline-static'
                  label='Middle Name'
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
                  name='email'
                  id='outlined-multiline-static'
                  label='Email'
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
                    onChange={handleDate}
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
										Style
									</InputLabel>
									<Select
										name='respiratorStyleID'
										value={formValues.respiratorStyleID}
										label='Mask Style'
										onChange={handleChange}
									>
										<MenuItem value={501}>Half Mask</MenuItem>
										<MenuItem value={503}>Quarter Mask</MenuItem>
										<MenuItem value={502}>Full Face Mask</MenuItem>
										<MenuItem value={500}>Gas Mask</MenuItem>
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
};