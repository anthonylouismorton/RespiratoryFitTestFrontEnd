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
    qualitativeTasteThreshold: 10,
    qualitativeTestPass: '',
    qualitativeTestDate: '',
    qualitativeTestTime: '',
		qualitativeTestExpiration: '',
    employeeID: props.selectedEmployee.employeeID,
    respiratorID: '',
	});
  const [respiratorManufacturers, setRespiratorManufacturers] = useState([]);
  const [respiratorModels, setRespiratorModels] = useState([]);

  const handleChange = (e) => {
		const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
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

  const handleManufacturer = async (manufacturer) => {
    let models = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorModels`)
    setRespiratorModels(models);
  }

	const onSubmit = async (e) => {
    
  };

  console.log(props.respiratorManufacturers)

  return(
  <Box>
    <Paper>
      <Typography>Add New Employee</Typography>
      <Grid>
        <form onSubmit={onSubmit}>
          <Grid>
            <Grid item>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Test Date"
                    inputFormat="MM/dd/yyyy"
                    value={formValues.qualitativeTestDate}
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
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Expiration Date"
                    inputFormat="MM/dd/yyyy"
                    value={formValues.qualitativeTestExpiration}
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
									<InputLabel id='demo-simple-select-label'>
										Manufacturer
									</InputLabel>
									<Select
                    value={formValues.respiratorManufacturer}
										label='Manufacturer'
										onChange={handleManufacturer}
									>
                    {/* {props.respiratorManufacturers.map((respirator) => {
                      <MenuItem key={respirator.respiratorManufacturer} value={respirator.respiratorManufacturer}>{respirator.respiratorManufacturer}</MenuItem>
                    })}; */}
									</Select>
								</FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Model
									</InputLabel>
									<Select
										// value={formValues.qualitativeTestType}
										label='Model'
										// onChange={handleManufacturer}
									>
                    {/* {respiratorModels.map((respirator) => {
                      <MenuItem value={501}>{respirator.respiratorManufacturer}</MenuItem>
                    })} */}
									</Select>
								</FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Pass
									</InputLabel>
									<Select
										name='qualitativeTestPass'
										value={formValues.qualitativeTestPass}
										label='Pass'
										onChange={handleChange}
									>
										<MenuItem value={true}>Yes</MenuItem>
										<MenuItem value={false}>No</MenuItem>
									</Select>
								</FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Protocol
									</InputLabel>
									<Select
										name='qualitativeTestType'
										value={formValues.qualitativeTestType}
										label='Protocol'
										onChange={handleChange}
									>
										<MenuItem value={'Isiamyl Acetate Protocol'}>Isiamyl Acetate Protocol</MenuItem>
										<MenuItem value={'Saccharin Solution Aerosol Protocol'}>Saccharin Solution Aerosol Protocol</MenuItem>
										<MenuItem value={'Bitrex (Denatonium Benzoate) Solution Aerosol Protocol'}>Bitrex (Denatonium Benzoate) Solution Aerosol Protocol</MenuItem>
										<MenuItem value={'Irritant (Smoke Stannic Chloride) Protocol'}>Irritant (Smoke Stannic Chloride) Protocol</MenuItem>
									</Select>
								</FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Threshold
									</InputLabel>
									<Select
										name='qualitativeTasteThreshold'
										value={formValues.qualitativeTasteThreshold}
										label='Threshold'
										onChange={handleChange}
									>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={20}>20</MenuItem>
										<MenuItem value={30}>30</MenuItem>
									</Select>
								</FormControl>
							</Grid>
					</Grid>
          <Grid>
            <Grid item>
              <Button type='submit' color='success' variant='contained'>
                Submit
              </Button>
              <Button onClick={handleCancel} color='error' variant='contained'>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  </Box>
  );
};