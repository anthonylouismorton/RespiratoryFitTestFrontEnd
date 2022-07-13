import React, { useState, useContext } from 'react';
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

export default function MaskForm() {
	const defaultValues = {
    manufactuer: '',
		maskStyle: ''
	};

	const [formValues, setFormValues] = useState(defaultValues);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		// await axios.post(
		// 	`${process.env.REACT_APP_API}/incident`,
		// 	formValues,
		// );

		// setFormValues({
		// 	...defaultValues,
		// });
	};

	return (
		<Box>
			<Paper>
				<Typography>Add New Mask</Typography>
				<Grid>
					<form onSubmit={onSubmit}>
						<Grid>
							<Grid item>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>
										Manufacturer
									</InputLabel>
									<Select
										name='manufactuer'
										value={formValues.manufactuer}
										label='Manufacturer'
										onChange={handleChange}
									>
										<MenuItem value={'Place Holder'}>Place Holder</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Grid>
							<Grid item>
								<TextField
									name='Model'
									value={formValues.model}
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
										name='maskstyle'
										value={formValues.maskStyle}
										label='Mask Style'
										onChange={handleChange}
									>
										<MenuItem value={'Half Mask'}>Half Mask</MenuItem>
										<MenuItem value={'Quarter Mask'}>Quarter Mask</MenuItem>
										<MenuItem value={'Full Face Mask'}>Full Face Mask</MenuItem>
										<MenuItem value={'Gas Mask'}>Gas Mask</MenuItem>
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