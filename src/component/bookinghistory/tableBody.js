import * as React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import seating from '../../utils/seatings';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
debugger
 const seatSelection=(nowSelected)=>{debugger
   var seleted = " ";
    
    nowSelected.map((e, index) => {
        let prevSeatCount = e.seatNo + 1;
        if (e.columnNo > 0) {
            for (let i = 0; i < e.columnNo; i++) {
                prevSeatCount += seating.seatSize[i];
            }
        }

        seleted += index === 0 ? seating.alphabet[e.rowNo] + prevSeatCount : "," + seating.alphabet[e.rowNo] + prevSeatCount;
    });

    return seleted;
 }


export default function TableBody(props) {
    
    return (
      <>
                    {props.tableResponse.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.movies[0].movieName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.movieDate.split('T')[0].split("-").reverse().join("-")}</StyledTableCell>
                            <StyledTableCell align="right">{row.movieTiming}</StyledTableCell>
                            <StyledTableCell align="right">{seatSelection(row.seatSeletion)}</StyledTableCell>
                            <StyledTableCell align="right"><i class="fa fa-print" aria-hidden="true"></i></StyledTableCell>
                        </StyledTableRow>
                    ))}
             </> 
    );
}
