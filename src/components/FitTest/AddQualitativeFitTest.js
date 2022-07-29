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
    qualitativeTasteThreshold: '10',
    qualitativeTestPass: '',
    qualitativeTestDate: new Date(),
    qualitativeTestTime: `${new Date().getHours()}${new Date().getMinutes()}`,
		qualitativeTestExpiration: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    employeeID: props.selectedEmployee.employeeID,
    respiratorID: '',
		respiratorSize: ''
	});
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
	const [selectedModel, setSelectedModel] = useState('');
	const [respiratorManufacturers, setRespiratorManufacturers] = useState([]);
  const [respiratorModels, setRespiratorModels] = useState([]);

  const handleChange = (e) => {
		const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
	};

	const handleModel = (e) => {
			setSelectedModel(e.target.value)
			setFormValues({
        ...formValues,
        respiratorID: e.target.value,
      });
	};

  const handleTestDate = (date) => {
		setFormValues({
			...formValues,
			qualitativeTestDate: date,
		});
	};


	const handleExpirationDate = (date) => {
		setFormValues({
			...formValues,
			qualitativeTestExpiration: date,
		});
	};

  const handleCancel = () => {
		setFormValues([]);
		props.setShowQualitativeFitTest(false);
		props.setShowEmployee(true);
    props.setShowFitTests(true);
  };

  const handleManufacturer = async (manufacturer) => {
		setSelectedManufacturer(manufacturer.target.value)
		setSelectedModel('')
    let models = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorModels/${manufacturer.target.value}`)
    setRespiratorModels(models.data);
  };

	const getRespiratorManufacturers = async () =>{
    let respirators = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorList`)
    setRespiratorManufacturers(respirators.data)
  };

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/qualitativeFitTest`,
			formValues,
		);

		setFormValues([]);
		props.setShowQualitativeFitTest(false);
		props.setShowEmployee(true);
    props.setShowFitTests(true);
  };

  useEffect(()=> {
    getRespiratorManufacturers();
  },[]);

  return(
  <Box>
    <Paper>
      <Typography>Qualitative Fit Test</Typography>
      <Grid>
        <form onSubmit={onSubmit}>
          <Grid>
            <Grid item>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
										name='testDate'
                    label="Test Date"
                    inputFormat="MM/dd/yyyy"
                    value={formValues.qualitativeTestDate}
                    onChange={handleTestDate}
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
                    onChange={handleExpirationDate}
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
                    name='qualitativeTestTime'
                    id='outlined-multiline-static'
										value={formValues.qualitativeTestTime}
                    label='Time'
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
										Manufacturer
									</InputLabel>
									<Select
                    value={selectedManufacturer}
										// defaultValue={respiratorManufacturers[0].respiratorManufacturer}
										label='Manufacturer'
										onChange={handleManufacturer}
									>
                    {respiratorManufacturers.map((respirator) => (
                      <MenuItem key={respirator.respiratorManufacturer} value={respirator.respiratorManufacturer}>{respirator.respiratorManufacturer}</MenuItem>
                    ))};
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
										value={selectedModel}
										label='Model'
										onChange={handleModel}
									>
                    {respiratorModels.map((model) => (
                      <MenuItem key={model.respiratorID} value={model.respiratorID}>{model.respiratorModelNumber}</MenuItem>
                    ))}
									</Select>
								</FormControl>
							</Grid>
					</Grid>
					<Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Size
                    </InputLabel>
                    <Select
                      name='respiratorSize'
                      value={formValues.respiratorSize}
                      label='Size'
                      onChange={handleChange}
                    >
                      <MenuItem value={'Small'}>Small</MenuItem>
                      <MenuItem value={'Medium'}>Medium</MenuItem>
                      <MenuItem value={'Large'}>Large</MenuItem>
                      <MenuItem value={'Regular'}>Regular</MenuItem>
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
										<MenuItem value={1}>Yes</MenuItem>
										<MenuItem value={0}>No</MenuItem>
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
										<MenuItem value={'10'}>10</MenuItem>
										<MenuItem value={'20'}>20</MenuItem>
										<MenuItem value={'30'}>30</MenuItem>
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