
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Typography, Slide } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { keyframes } from '@emotion/react';

type Props = {
  open: boolean
  severity: 'success' | 'info' | 'warning' | 'error'
  children: any
  onClose: () => void
  ignoreClickaway?: boolean
  timeout?: number
}

const MySnackbar = ({
  open = false,
  severity = 'success',
  children,
  onClose,
  ignoreClickaway = true,
  timeout = 5000,
}: Props): JSX.Element => {
  const handleClose = (_, reason) => {
    if (ignoreClickaway && reason === 'clickaway') {
      return
    }
    onClose()
  }

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
      autoHideDuration={timeout}
    >
      <Alert
        severity={severity}
        elevation={2}
        variant="filled"
        onClose={onClose}
      >
        {children}
      </Alert>
    </Snackbar>
  )
}



export function NotificationDialog({ open, message, isError, onClose }: {
  open: boolean
  message: string
  isError: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ minWidth: 240, minHeight: 150, textAlign: 'center', padding: '24px' }}>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          {isError ? (
            <ErrorOutlineIcon
              color="error"
              style={{
                fontSize: 72,
                marginBottom: 16,
              }}
            />
          ) : (
            <CheckCircleOutlineIcon
              color="success"
              style={{
                fontSize: 72,
                marginBottom: 16,
              }}
            />
          )}
          <Typography variant="h5" style={{ fontSize: 24 }}>
            {message}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '16px',
        }}
      >
        <Button
          sx={{
            width: 128,
          }}
          onClick={onClose}
          color="primary"
          variant="contained"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MySnackbar
