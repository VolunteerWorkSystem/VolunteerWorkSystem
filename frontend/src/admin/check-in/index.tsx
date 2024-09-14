import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { dataProvider } from '../../dataProvider';
import { useQuery } from '@tanstack/react-query';


const GET_CHECK_INS = '/check-ins';

export function CheckIn() {
  const { isPending, error, data } = useQuery({
    queryKey: [GET_CHECK_INS],
    queryFn: async ({ signal }) => {
      const { data } = await dataProvider.GET(GET_CHECK_INS, {
        // body - isn’t used for GET, but needed for other request types
        signal, // allows React Query to cancel request
      });
      return data;
      // Note: Error throwing handled automatically via middleware
    },
  })

  const rows = data ?? []

  return (
    <>
      <h1>出勤一般志工</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>序號</TableCell>
              {/* <TableCell align="right">日期</TableCell> */}
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
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                {/* <TableCell align="right">{row.date}</TableCell> */}
                <TableCell align="right">{row.user.name}</TableCell>
                <TableCell align="right">{row.user.id}</TableCell>
                <TableCell align="right">{row.checkInTime}</TableCell>
                <TableCell align="right">{row.checkOutTime}</TableCell>
                <TableCell align="right">{
                  row.checkOutTime && row.checkInTime ?
                    (new Date(row.checkOutTime).getTime() - new Date(row.checkInTime).getTime()) / 1000 / 60 / 60
                    : ''
                }</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

