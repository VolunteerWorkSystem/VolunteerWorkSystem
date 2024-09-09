
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

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

export default MySnackbar
