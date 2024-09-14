
import { Typography, Avatar, Button, Divider, Link, Dialog } from '@mui/material'
import { useAuth } from '../auth/hooks'
import { parseError, vibrate } from '../utils'
import Grid from '@mui/material/Grid2';
import scanIcon from './scan.png'
import liff from '@line/liff';
import { useState, useEffect, Suspense } from 'react';
import Scanner from '../scanner/Scanner';
import { useSnackbar } from '../snackbar/context';
import { dataProvider } from '../dataProvider';


export function VolunteerPage() {
  const { authState } = useAuth()
  const { user } = authState
  const { handleNotification, handleError } = useSnackbar()


  const [scannerOpen, setScannerOpen] = useState(false)
  const isLineScanOk = liff && liff.scanCode !== undefined && liff.isInClient()

  // debug tool: call onQrcodeDetected when ?action=checkin is in url
  useEffect(() => {
    if (window.location.search.includes('action=checkin')) {
      onQrcodeDetected('debug')
    }
  }, [])

  const reset = () => {
    setScannerOpen(false)
  }

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

    const {
      data: checkInData,
      error: checkInError,
    } = dataProvider.POST('/check-ins')

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
    <>
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

    </>
  )
}

