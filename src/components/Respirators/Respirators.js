import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RespiratorForm from './RespiratorForm'
import RespiratorList from './RespiratorList'
import {useState} from 'react'
import RespiratorEditForm from './RespiratorEditForm'

export default function Respirators() {
	const [hideMaskForm, setHideMaskForm] = useState(true);
	const [hideMaskEdit, setHideMaskEdit] = useState(true);
	const [selectedMask, setSelectedMask] = useState([])
	const handleClick = () => {
		setHideMaskForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideMaskForm === true && hideMaskEdit === true &&
		<Button variant="contained" onClick={handleClick}>Add New Mask</Button>
		}
	</Stack>
	{hideMaskEdit === true && hideMaskForm === true &&
		<RespiratorList selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	}
	{hideMaskForm === false &&
		<RespiratorForm hideMaskForm={hideMaskForm} setHideMaskForm={setHideMaskForm}/>
	}
	{hideMaskEdit === false &&
		<RespiratorEditForm selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	}
	</>
);

}