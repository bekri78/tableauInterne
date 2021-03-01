import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import firebase from "./ConnexionFirebase"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [infoList, setInfolist] = useState([])
    useEffect( ()=>{
        const infoDB = firebase.database().ref('quotesDB')
        
        infoDB.on('value', (snapshot) =>{
            let previousList = snapshot.val();
            let list =[];
            for(let id in previousList){
                list.push({id, ...previousList[id]})
            }
            setInfolist(list);
        })
    },[])
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>NOM  </StyledTableCell>
            <StyledTableCell  >Prenom</StyledTableCell>
            <StyledTableCell  >telephone</StyledTableCell>
            <StyledTableCell  >email</StyledTableCell>
            <StyledTableCell  >Adresse</StyledTableCell>
            <StyledTableCell >Ville</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
 
          {infoList.map((item, index) =>(
            <StyledTableRow  key={index} item={item}>
              <StyledTableCell component="th" scope="row">
                {item.nom}
              </StyledTableCell>
              <StyledTableCell  >{item.prenom}</StyledTableCell>
              <StyledTableCell  >{item.telephone}</StyledTableCell>
              <StyledTableCell  >{item.email}</StyledTableCell>
              <StyledTableCell  >{item.adresse}</StyledTableCell>
              <StyledTableCell  >{item.ville}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
