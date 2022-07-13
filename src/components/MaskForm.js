import React, { useState, useContext, useEffect } from 'react';
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
  ListItemText
} from '@mui/material';

export default function MaskForm() {
	const defaultValues = {
    manufactuer: '',
		maskStyle: '',
    model: ''
	};

	const [formValues, setFormValues] = useState(defaultValues);
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
		// await axios.post(
		// 	`${process.env.REACT_APP_API}/incident`,
		// 	formValues,
		// );

		// setFormValues({
		// 	...defaultValues,
		// });
	};
  const getRespiratorModels = async () =>{
    let respirators = await axios.get(`${process.env.REACT_APP_DATABASE}/respiratorList`)    
    setRespiratorList(respirators.data)
  }
  useEffect(()=> {
    getRespiratorModels();
  }, []);
  console.log(respiratorList)
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
                    {respiratorList.map((text, index) => (
                    <MenuItem key={index}>
                      <ListItemText primary={text.respiratorManufacturer}></ListItemText>
                    </MenuItem>
                    ))}
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