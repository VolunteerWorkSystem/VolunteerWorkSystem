import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { dataProvider } from '../../dataProvider';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { format, isValid } from 'date-fns';

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
    <Box sx={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '2rem',
    }}>
      <Typography variant="h2" fontWeight={'bold'} textAlign={'center'} gutterBottom>出勤一般志工</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>序號</TableCell>
              {/* <TableCell align="right">日期</TableCell> */}
              <TableCell align="right">照片</TableCell>
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
                <TableCell align="right">
                  <img src={row.user.pictureUrl} alt="照片" style={{ width: 24 }} />
                </TableCell>
                <TableCell align="right">{row.user.name}</TableCell>
                <TableCell align="right">{row.user.id}</TableCell>
                <TableCell align="right">{format(row.checkInTime,
                  'MM/dd HH:mm:ss'
                )}</TableCell>
                <TableCell align="right">{row.checkOutTime ? format(row.checkOutTime,
                  'MM/dd HH:mm:ss'
                ) : ''}</TableCell>
                <TableCell align="right">{
                  row.checkOutTime && row.checkInTime ?
                    ((new Date(row.checkOutTime).getTime() - new Date(row.checkInTime).getTime()) / 1000 / 60 / 60).toFixed(1)
                    : ''
                }</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

