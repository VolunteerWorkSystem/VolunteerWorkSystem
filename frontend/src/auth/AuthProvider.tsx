import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material"
import { useState, useEffect } from "react"
import { parseError } from "../utils"
import authProvider from "./authProvider"
import { AuthState, AuthContext } from "./context"

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    error: undefined,
    user: undefined,
    token: undefined,
  })

  const fetchUserProfile = async () => {
    const { newJwtToken, lineProfile } = await authProvider.loginByLiff()
    const jwtToken = newJwtToken ? newJwtToken : (authState.token as string)

    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        ...lineProfile,
        // ...newHighWallProfile 
      },
      token: jwtToken,
    })
  }

  const updateStateFromToken = () => {
    const token = authProvider.getToken()
    if (token) {
      setAuthState({
        loading: false,
        user: authProvider.getProfile(),
        token: token,
        error: undefined,
      })
    } else {
      console.error('Unknown Error: token not found')
      setAuthState({
        loading: false,
        user: undefined,
        token: undefined,
        error: new Error('請聯絡客服（token not found）'),
      })
    }
  }


  useEffect(() => {
    const init = async () => {
      try {
        await authProvider.init()
        updateStateFromToken()
      } catch (error) {
        console.error('Unknown login error: ', error)
        await authProvider.logout()
        setAuthState({
          loading: false,
          error: error,
          user: undefined,
          token: undefined,
        })
      }
    }

    init()
  }, [])


  return (
    <AuthContext.Provider
      value={{
        authState,
        logout: authProvider.logout,
        fetchUserProfile: fetchUserProfile,
      }}
    >
      {props.children}
      {/* {profile !== undefined && profile.terms_agreed === false && (
        <Terms userId={profile?.id} onSuccess={() => loginAndUpdateState()} />
      )} */}

      <Dialog disableEscapeKeyDown open={authState.error ?? false}>
        <DialogTitle>登入錯誤，請重新登入</DialogTitle>
        <DialogContent>
          <DialogContentText>{parseError(authState.error)}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            style={{ color: 'white' }}
            onClick={async () => {
              await authProvider.logout()
              window.location.href = '/'
            }}
          >
            重新登入
          </Button>
        </DialogActions>
      </Dialog>
    </AuthContext.Provider>
  )
}

export default AuthProvider
