import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MaskForm from './MaskForm'
import MaskList from './MaskList'
import {useState} from 'react'
import MaskEditForm from './MaskEditForm'

export default function Masks() {
	const [hideMaskForm, setHideMaskForm] = useState(true);
	const [hideMaskEdit, setHideMaskEdit] = useState(true);
	const [selectedMask, setSelectedMask] = useState([])
	const handleClick = () => {
		setHideMaskForm(false)
	};
console.log(selectedMask)
console.log(hideMaskEdit)
return (
	<>
	<Stack spacing={2} direction="row">
		{hideMaskForm === true && hideMaskEdit === true &&
		<Button variant="contained" onClick={handleClick}>Add New Mask</Button>
		}
	</Stack>
	{hideMaskEdit === true &&
	<MaskList selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	}
	{hideMaskForm === false &&
		<MaskForm hideMaskForm={hideMaskForm} setHideMaskForm={setHideMaskForm}/>
	}
	{hideMaskEdit === false &&
		<MaskEditForm selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	}
	</>
);

}