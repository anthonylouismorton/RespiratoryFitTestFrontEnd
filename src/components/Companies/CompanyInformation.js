import {
  Grid,
  Paper,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CompanyEmployeeList from './CompanyEmployeeList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function CompanyInformation(props){
  const information = props.selectedCompany

  return(
    <>
    <Typography>Company Details</Typography>
    <Grid container spacing={2}>
        <Grid item xs={4}>
          <Item>Company: {information.companyName}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Address</Item>
          <Item>{information.address1}</Item>
          <Item>{information.address2}</Item>
          <Item>{information.address3}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>City: {information.city}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>State: {information.state}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Zip Code: {information.zip}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Email: {information.email}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Alt Email: {information.altEmail}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Phone Number: {information.phoneNumber}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>Ext: {information.ext}</Item>
        </Grid>
    </Grid>
    <CompanyEmployeeList selectedCompany={props.selectedCompany}/>
    </>
  )
};