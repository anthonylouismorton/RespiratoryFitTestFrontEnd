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

export default function MaskForm(props) {
	console.log(props)
	const filter = createFilterOptions();

	const [formValues, setFormValues] = useState({
    respiratorManufacturer: '',
		respiratorStyleID: '',
    respiratorModelNumber: ''
	});

  const [respiratorList, setRespiratorList] = useState([])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		await axios.post(
			`${process.env.REACT_APP_DATABASE}/respirator`,
			formValues,
		);

		setFormValues({
			respiratorManufacturer: '',
			respiratorStyleID: '',
			respiratorModelNumber: ''
		});
		props.setHideMaskForm(true)
	};

  const getRespiratorModels = async () =>{
    let respirators = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorList`)
    setRespiratorList(respirators.data)
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
									<Autocomplete
										value={formValues.respiratorManufacturer}
										onChange={(event, newValue) => {
											if(newValue === null){
												setFormValues({
													...formValues,
													respiratorManufacturer: ''
												});
											}
											else if (typeof newValue === 'string') {
												// Create a new value from the user input
												setFormValues({
													...formValues,
													respiratorManufacturer: newValue
												});
											} 
											else if(newValue.inputValue){
												setFormValues({
													...formValues,
													respiratorManufacturer: newValue.inputValue
												});
											}
											else{
												setFormValues({
													...formValues,
													respiratorManufacturer: newValue.respiratorManufacturer
												});
											};
										}}
										filterOptions={(options, params) => {
											const filtered = filter(options, params);
											const { inputValue } = params;
											// Suggest the creation of a new value
											const isExisting = options.some((option) => inputValue === option.title);
											if (inputValue !== '' && !isExisting) {
												filtered.push({
													inputValue,
													respiratorManufacturer: `Add "${inputValue}"`,
												});
											}
											return filtered;
										}}
										selectOnFocus
										clearOnBlur
										handleHomeEndKeys
										id="free-solo-with-text-demo"
										options={respiratorList}
										getOptionLabel={(option) => {
											// Value selected with enter, right from the input
											if (typeof option === 'string') {
												return option;
											}
											// Add "xxx" option created dynamically
											if (option.inputValue) {
												return option.inputValue;
											}
											// Regular option
											return option.respiratorManufacturer;
										}}
										renderOption={(props, option) => <li {...props}>{option.respiratorManufacturer}</li>}
										sx={{ width: 300 }}
										freeSolo
										renderInput={(params) => (
											<TextField {...params} label="Manufacturer" />
										)}
									/>
                </FormControl>
							</Grid>
						</Grid>
						<Grid>
							<Grid item>
								<TextField
									name='respiratorModelNumber'
									id='outlined-multiline-static'
									label='Model'
									rows={1}
									onChange={handleChange}
								/>
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
								Add Mask
							</Button>
						</Grid>
					</form>
				</Grid>
			</Paper>
		</Box>
	);
}