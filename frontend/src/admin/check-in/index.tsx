import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';

function createData(
  id: number,
  date: string,
  name: string,
  volunteerId: string,
  checkIn: string,
  checkOut: string,
  hours: number,
) {
  return {
    id,
    name,
    date,
    volunteerId,
    checkIn,
    checkOut,
    hours,
  };
}

const rows = [
  createData(1, '2021-10-01', 'John', '123', '09:00', '18:00', 9),
];

export function CheckIn() {
  return (
    <>
      <h1>出勤一般志工</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>序號</TableCell>
              <TableCell align="right">日期</TableCell>
              <TableCell align="right">姓名</TableCell>
              <TableCell align="right">志工流水號</TableCell>
              <TableCell align="right">簽到</TableCell>
              <TableCell align="right">簽退</TableCell>
              <TableCell align="right">時數</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.name}</TableCell>

                <TableCell align="right">{row.volunteerId}</TableCell>
                <TableCell align="right">{row.checkIn}</TableCell>
                <TableCell align="right">{row.checkOut}</TableCell>
                <TableCell align="right">{row.hours}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

