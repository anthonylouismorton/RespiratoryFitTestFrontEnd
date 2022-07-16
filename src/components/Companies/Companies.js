import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react'

export default function Companies() {
	// const [hideMaskForm, setHideMaskForm] = useState(true);
	const [hideCompanyList, setHideCompanyList] = useState(false);
	// const [selectedMask, setSelectedMask] = useState([])
	const handleClick = () => {
		setHideCompanyList(true)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideCompanyList === false &&
		<Button variant="contained" onClick={handleClick}>Add New Company</Button>
		}
	</Stack>
	{/* {hideMaskEdit === true && hideMaskForm === true &&
	<RespiratorList selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	}
	{hideMaskForm === false &&
		<RespiratorForm hideMaskForm={hideMaskForm} setHideMaskForm={setHideMaskForm}/>
	}
	{hideMaskEdit === false &&
		<RespiratorEditForm selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	} */}
	</>
);

}