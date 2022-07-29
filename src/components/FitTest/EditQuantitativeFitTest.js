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

export default function QuantitativeFitTest(props) {
  const [formValues, setFormValues] = useState({
    quantitativeTestID: props.selectedFitTest.quantitativeTestID,
    maskType: props.selectedFitTest.maskType,
    quantitativeOverallTestPass: props.selectedFitTest.quantitativeOverallTestPass,
    quantitativeTestDate: props.selectedFitTest.quantitativeTestDate,
    quantitativeTestTime: props.selectedFitTest.quantitativeTestTime,
		quantitativeTestExpiration: props.selectedFitTest.quantitativeTestExpiration,
    quantitativeTest1FitFactor: props.selectedFitTest.quantitativeTest1FitFactor,
    quantitativeTest2FitFactor: props.selectedFitTest.quantitativeTest2FitFactor,
    quantitativeTest3FitFactor: props.selectedFitTest.quantitativeTest3FitFactor,
    quantitativeTest4FitFactor: props.selectedFitTest.quantitativeTest4FitFactor,
    quantitativeTest5FitFactor: props.selectedFitTest.quantitativeTest5FitFactor,
    quantitativeTest6FitFactor: props.selectedFitTest.quantitativeTest6FitFactor,
    quantitativeTest7FitFactor: props.selectedFitTest.quantitativeTest7FitFactor,
    quantitativeTest8FitFactor: props.selectedFitTest.quantitativeTest8FitFactor,
    quantitativeOverallFitFactor: props.selectedFitTest.quantitativeOverallFitFactor,
    employeeID: props.selectedFitTest.employeeID,
    respiratorID: props.selectedFitTest.respiratorID,
    respiratorManufacturer: props.selectedFitTest.respiratorManufacturer,
    respiratorModelNumber: props.selectedFitTest.respiratorModelNumber,
    respiratorSize: props.selectedFitTest.respiratorSize
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
  
  const handleFitFactor = async (e) => {
    let { name, value } = e.target;
    let total = 0;
    let values = [formValues.quantitativeTest1FitFactor, formValues.quantitativeTest2FitFactor, formValues.quantitativeTest3FitFactor, formValues.quantitativeTest4FitFactor, formValues.quantitativeTest5FitFactor, formValues.quantitativeTest6FitFactor, formValues.quantitativeTest7FitFactor, formValues.quantitativeTest8FitFactor]

    console.log(name)
    if(!parseInt(value)){
      values[name.replace(/\D/g,'')-1] = 0
      value = 0
    }
    if(parseInt(value)){
      values[name.replace(/\D/g,'')-1] = parseInt(value)
    }

    let sum = values.reduce(function(pv, cv) { return pv + cv; }, 0)
    total = Math.round(sum / 8)

    
      if((formValues.maskType = 'Quarter Mask' || formValues.maskType === 'Half Mask') && total >= 100){
        setFormValues({
          ...formValues,
          quantitativeOverallFitFactor: total,
          [name]: parseInt(value),
          quantitativeOverallTestPass: 1
        });
      }
      else if(formValues.maskType === 'Gas Mask' && total >= 2000){
        console.log('in here')
        setFormValues({
          ...formValues,
          quantitativeOverallFitFactor: total,
          [name]: parseInt(value),
          quantitativeOverallTestPass: 1
        });
      }
      else if(formValues.maskType === 'Full Face Mask' >= 500){
        setFormValues({
          ...formValues,
          quantitativeOverallFitFactor: total,
          [name]: parseInt(value),
          quantitativeOverallTestPass: 1
        });
      }
      else{
        if(parseInt){
          setFormValues({
            ...formValues,
            quantitativeOverallFitFactor: total,
            [name]: parseInt(value),
            quantitativeOverallTestPass: 0
          });
        }
      };
  };

	const handleModel = (e) => {
    let respirator = e.target.value.respiratorStyleID
    let maskType = '';
			setSelectedModel(e.target.value)
      if(respirator === 501){
        maskType = 'Half Mask'
      }
      else if(respirator === 502){
        maskType = 'Full Face Mask'
      }
      else if(respirator === 503){
        maskType = 'Quarter Mask'
      }
      else if(respirator === 500){
        maskType = 'Gas Mask'
      }
			setFormValues({
        ...formValues,
        respiratorID: e.target.value.respiratorID,
        maskType: maskType
      });
	}

  const handleTestDate = (date) => {
		setFormValues({
			...formValues,
			quantitativeTestDate: date,
		});
	};

	const handleExpirationDate = (date) => {
		setFormValues({
			...formValues,
			quantitativeTestExpiration: date,
		});
	};

  const handleCancel = () => {
		setFormValues([]);
		props.setShowQuantitativeFitTestEdit(false);
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
		await axios.put(
			`${process.env.REACT_APP_DATABASE}/quantitativeFitTest`,
			formValues,
		);

		setFormValues([]);
		props.setShowQuantitativeFitTestEdit(false);
    props.setShowEmployee(true);
    props.setShowFitTests(true);
  };

  useEffect(()=> {
    getRespiratorManufacturers();
    
  },[]);

  return(
  <Box>
    <Paper>
      <Typography>Edit Quantitative Fit Test</Typography>
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
                    value={formValues.quantitativeTestDate}
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
                    value={formValues.quantitativeTestExpiration}
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
                    name='quantitativeTestTime'
                    id='outlined-multiline-static'
										value={formValues.quantitativeTestTime}
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
                      <MenuItem key={model.respiratorID} value={model}>{model.respiratorModelNumber}</MenuItem>
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
                  <TextField
                    name='quantitativeTest1FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest1FitFactor}
                    label='Exercise 1'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest2FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest2FitFactor}
                    label='Exercise 2'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest3FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest3FitFactor}
                    label='Exercise 3'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest4FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest4FitFactor}
                    label='Exercise 4'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest5FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest5FitFactor}
                    label='Exercise 5'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest6FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest6FitFactor}
                    label='Exercise 6'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest7FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest7FitFactor}
                    label='Exercise 7'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeTest8FitFactor'
                    id='outlined-multiline-static'
                    type='number'
										value={formValues.quantitativeTest8FitFactor}
                    label='Exercise 8'
                    rows={1}
                    onChange={handleFitFactor}
                  />
                </FormControl>
							</Grid>
					</Grid>
          <Grid>
							<Grid item>
                <FormControl fullWidth>
                  <TextField
                    name='quantitativeOverallFitFactor'
                    id='outlined-multiline-static'
										value={formValues.quantitativeOverallFitFactor}
                    label='Overall Fit Factor'
                  />
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