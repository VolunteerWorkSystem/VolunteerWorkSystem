import { createContext, useContext, useState } from 'react'
// import { ApiError } from 'src/client'
// import authProvider from '../auth/authProvider'
import { parseError } from '../utils'

export type Severity = 'error' | 'warning' | 'info' | 'success'

interface ISnackbar {
  open: boolean
  severity: Severity
  message: string
  timeout?: number
}

export type SnackbarContext = {
  snackbar: ISnackbar
  setSnackbar: (state: ISnackbar) => void
  handleUnknownError: (error: unknown) => void
  handleError: (error?: unknown) => void
  handleNotification: (message: string, severity?: Severity) => void
}

export const snackbarContext = createContext<SnackbarContext>({
  snackbar: {
    open: false,
    severity: 'success',
    message: '',
    timeout: 5000,
  },
  setSnackbar: (state) => state,
  handleUnknownError: (error) => {
    console.error(error)
  },
  handleError: (error) => {
    console.error(error)
  },
  handleNotification: (message, severity) => {
    console.log(message)
  },
})

export const useSnackbar = () => useContext(snackbarContext)

export const SnackbarProvider = (props) => {
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    open: false,
    severity: 'success',
    message: '',
    timeout: 5000,
  })

  const setter = (state: ISnackbar): void => {
    setSnackbar({
      ...state,
      message:
        state?.severity === 'error' && !state?.message
          ? '發生未知錯誤'
          : state.message,
    })
  }

  const handleUnknownError = (error?: unknown) => {
    console.error('handleUnknownError', error)
    setSnackbar({
      ...snackbar,
      open: true,
      severity: 'error',
      message: parseError(error) ?? '發生未知錯誤',
    })
  }

  const handleError = async (error?: unknown) => {
    // if (error instanceof ApiError) {
    //   setSnackbar({
    //     ...snackbar,
    //     open: true,
    //     severity: 'error',
    //     message: error.body?.result ?? error.body,
    //   })
    //   authProvider.checkError(error).catch(() => {
    //     console.error(error)
    //   })
    //   return
    // }
    handleUnknownError(error)
  }

  const handleNotification = (
    message: string,
    severity: Severity = 'success'
  ) => {
    setSnackbar({
      ...snackbar,
      open: true,
      severity: severity,
      message: message,
    })
  }

  return (
    <snackbarContext.Provider
      value={{
        snackbar,
        setSnackbar: setter,
        handleUnknownError: handleUnknownError,
        handleError: handleError,
        handleNotification: handleNotification,
      }}
    >
      {props.children}
    </snackbarContext.Provider>
  )
}
