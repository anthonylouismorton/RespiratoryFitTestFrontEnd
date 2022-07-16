import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react'
import AddCompanyForm from './AddCompanyForm';

export default function Companies() {
	const [hideAddCompanyForm, setHideAddCompanyForm] = useState(true);
	// const [hideCompanyList, setHideCompanyList] = useState(false);
	// const [selectedMask, setSelectedMask] = useState([])
	const handleClick = () => {
    setHideAddCompanyForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideAddCompanyForm === true &&
		<Button variant="contained" onClick={handleClick}>Add New Company</Button>
		}
	</Stack>
	{/* {hideMaskEdit === true && hideMaskForm === true &&
	<RespiratorList selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	} */}
	{hideAddCompanyForm === false &&
		<AddCompanyForm hideAddCompanyForm={hideAddCompanyForm} setHideAddCompanyForm={setHideAddCompanyForm}/>
	}
	{/* {hideMaskEdit === false &&
		<RespiratorEditForm selectedMask={selectedMask} setSelectedMask={setSelectedMask} hideMaskEdit={hideMaskEdit} setHideMaskEdit={setHideMaskEdit}/>
	} */}
	</>
);

}