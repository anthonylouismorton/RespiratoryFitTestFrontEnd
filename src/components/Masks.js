import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MaskForm from './MaskForm'
import {useState} from 'react'

export default function Masks() {
	const [hideButton, setHideButton] = useState(false);
	const handleClick = () => {
		setHideButton(true)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		<Button variant="contained">Add New Mask</Button>
	</Stack>
	<MaskForm/>
	</>
);

}