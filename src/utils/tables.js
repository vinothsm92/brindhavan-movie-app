import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));



 function CustomizedTables(props) {
    const [page, setPage] = React.useState(1);
const handleChange = (e, value) => {
    e.preventDefault();
  setPage(value);
  props.paginationPage(value)
};
    return (<>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {props.tableHeader.map((tableHeader, index) => {
                            return <StyledTableCell align={tableHeader.align}>{tableHeader.title}</StyledTableCell>

                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                   {props.children}
                </TableBody>
            </Table>
        </TableContainer>
        <Stack spacing={2}>
      <Pagination count={props.tableCount} page={page} onChange={(event, pageNumber) => handleChange(event,pageNumber)} color="primary" />
    </Stack>
        </>
    );
}


export default React.memo(CustomizedTables)