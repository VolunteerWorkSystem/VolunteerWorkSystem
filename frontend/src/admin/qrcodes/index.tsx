import { Box, Grid2, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';


export function Qrcodes() {


  return (
    <Box sx={{
      maxWidth: 1280,
      margin: '0 auto',
      padding: '2rem',
    }}>
      <Typography variant="h2" fontWeight={'bold'} textAlign={'center'} gutterBottom>出勤一般志工</Typography>
      <Grid2 container >
        <Grid2 size={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h4" gutterBottom>簽到</Typography>
          <QRCodeSVG size={280} value="checkin-23h457ge9toutbg4eh9fso" />
        </Grid2>
        <Grid2 size={6} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Typography variant="h4" gutterBottom>簽退</Typography>
          <QRCodeSVG size={280} value="checkout-getipokenjth54kgrkbfr" />
        </Grid2>

      </Grid2>
    </Box>
  )
}

