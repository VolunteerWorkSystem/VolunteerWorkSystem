
import { Typography, Avatar, Button, Divider, Link, Dialog, Box } from '@mui/material'
import { useAuth } from '../auth/hooks'
import { parseError, vibrate } from '../utils'
import Grid from '@mui/material/Grid2';
import scanIcon from './scan.png'
import liff from '@line/liff';
import { useState, useEffect, Suspense } from 'react';
import Scanner from '../scanner/Scanner';
import { useSnackbar } from '../snackbar/context';
import { dataProvider } from '../dataProvider';
import { useMutation } from '@tanstack/react-query';


export function VolunteerPage() {
  const { authState } = useAuth()
  const { user } = authState
  const { handleNotification, handleError } = useSnackbar()


  const [scannerOpen, setScannerOpen] = useState(false)
  const isLineScanOk = liff && liff.scanCode !== undefined && liff.isInClient()

  // debug tool: call onQrcodeDetected when ?action=checkin is in url
  useEffect(() => {
    if (window.location.search.includes('checkin')) {
      onQrcodeDetected('checkin')
    }
    if (window.location.search.includes('checkout')) {
      onQrcodeDetected('checkout')
    }
  }, [])

  const reset = () => {
    setScannerOpen(false)
  }

  const { mutate: checkIn } = useMutation({
    mutationFn: async () => {
      const { data } = await dataProvider.POST('/check-ins/checkin')
      return data
    },
    onError: (error) => {
      handleError(error)
    },
    onSuccess: (data) => {
      handleNotification('簽到成功')
    }
  })
  const { mutate: checkOut } = useMutation({
    mutationFn: async () => {
      const { data } = await dataProvider.POST('/check-ins/checkout')
      return data
    },
    onError: (error) => {
      handleError(error)
    },
    onSuccess: (data) => {
      handleNotification('簽退成功')
    }
  })


  const onQrcodeDetected = (newDetectResult: string) => {
    setScannerOpen(false)
    try {
      vibrate()
    } catch {
      console.log('no vibrate')
    }

    // if (step === MutationByUserStep.ScanningCups) {
    //   if (mutationType === undefined) {
    //     throw Error('未知錯誤：請選擇租借或歸還')
    //   }
    //   setCupId(newDetectResult)
    //   setStep(MutationByUserStep.Confirming)
    // } else {
    //   onUrlDetected(newDetectResult)
    // }
    if (newDetectResult.includes('checkin')) {
      checkIn()
    }
    if (newDetectResult.includes('checkout')) {
      checkOut()
    }

  }
  useEffect(() => {
    async function lineScan() {
      if (scannerOpen && isLineScanOk && liff.scanCode) {
        liff
          .scanCode()
          .then((result) => {
            const r = result?.value ?? ''
            if (r === 'null') {
              reset()
              return
            }
            onQrcodeDetected(r)
          })
          .catch((error) => {
            handleError(error)
            // setLocalError(parseError(error))
          })
      }
    }
    lineScan()
  }, [scannerOpen, isLineScanOk])

  return (
    <Box sx={{
      maxWidth: 800,
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <Typography variant='h4'>
        志工打卡系統
      </Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Avatar
          style={{
            width: 64,
            height: 64,
          }}
          alt="Avatar"
          src={user?.pictureUrl}
        />
        <Typography>
          {user?.name}
        </Typography>
      </div>

      <Grid
        container
        spacing={0}
        sx={{ backgroundColor: 'white', borderRadius: 1 }}
      >


        <Grid size={4} >
          <Button
            color="inherit"
            size="large"
            startIcon={
              <img
                src={scanIcon}
                alt="scanIcon"
                width={35}
                height={35}
                style={{ marginRight: -8, marginLeft: 4 }}
              />
            }
            style={{ lineHeight: 'inherit' }}
            onClick={() => {
              setScannerOpen(true)
            }}
          ></Button>
          <Typography sx={{ fontSize: '0.9rem' }}>掃描QR碼</Typography>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />

      </Grid >

      <Dialog
        PaperProps={{ style: { background: 'black' } }}
        fullScreen
        open={scannerOpen && !isLineScanOk}
        onClose={reset}
      >
        <Suspense fallback={<></>}>
          <Scanner
            facingMode="environment"
            onDetected={onQrcodeDetected}
            onClose={reset}
          />
        </Suspense>
      </Dialog>

    </Box>
  )
}

