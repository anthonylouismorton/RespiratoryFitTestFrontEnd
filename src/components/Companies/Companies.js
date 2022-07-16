import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {useState} from 'react'
import AddCompanyForm from './AddCompanyForm';
import CompanyList from './CompanyList';
import CompanyEditForm from './CompanyEditForm';

export default function Companies() {
	const [hideAddCompanyForm, setHideAddCompanyForm] = useState(true);
	const [hideCompanyEdit, setHideCompanyEdit] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState([]);
	const handleClick = () => {
    setHideAddCompanyForm(false)
	};

return (
	<>
	<Stack spacing={2} direction="row">
		{hideAddCompanyForm === true && hideCompanyEdit === true &&
		<Button variant="contained" onClick={handleClick}>Add New Company</Button>
		}
	</Stack>
	{hideCompanyEdit === true &&
	  <CompanyList selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} hideCompanyEdit={hideCompanyEdit} setHideCompanyEdit={setHideCompanyEdit}/>
	}
	{hideAddCompanyForm === false &&
		<AddCompanyForm hideAddCompanyForm={hideAddCompanyForm} setHideAddCompanyForm={setHideAddCompanyForm}/>
	}
	{hideCompanyEdit === false &&
		<CompanyEditForm selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} hideCompanyEdit={hideCompanyEdit} setHideCompanyEdit={setHideCompanyEdit}/>
	}
	</>
);

}