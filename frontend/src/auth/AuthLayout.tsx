import { FC } from 'react'
// import Snackbar from './Snackbar'
// import { logout } from 'shared/auth/utils/firebase'
import { Outlet } from "react-router-dom";
import AuthProvider from './AuthProvider';
import { useAuth } from './hooks';

// import LoginLayout from 'shared/auth/components/LoginLayout'

interface Props {
  pageTitle?: string
  requiredLogin?: boolean
}

export const AuthLayout: FC<Props> = ({ requiredLogin }) => {

  const { authState } = useAuth()


  return (
    <AuthProvider>
      {requiredLogin && authState.user === undefined && (
        <div>login required</div>
      )}
      <main> <Outlet /></main>

    </AuthProvider>
  )
}

