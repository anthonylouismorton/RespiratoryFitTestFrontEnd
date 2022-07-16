import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MaskForm from './MaskForm'
import {useState} from 'react'

export default function Masks() {
	const [hideMaskForm, setHideMaskForm] = useState(true);
	const handleClick = () => {
		setHideMaskForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideMaskForm === true &&
		<Button variant="contained" onClick={handleClick}>Add New Mask</Button>
		}
	</Stack>
	{hideMaskForm === false &&
		<MaskForm hideMaskForm={hideMaskForm} setHideMaskForm={setHideMaskForm}/>
	}
	</>
);

}