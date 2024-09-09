import { createContext } from 'react'

import { Profile } from './services'

export interface AuthContextProps {
  authState: AuthState
  logout: () => Promise<void>
  fetchUserProfile: () => void
}

export interface AuthState {
  loading: boolean
  error: any
  user: Profile | undefined
  token: string | undefined
}

export const AuthContext = createContext<AuthContextProps>({
  authState: {
    loading: false,
    error: undefined,
    user: undefined,
    token: undefined,
  },
  logout: () => Promise.resolve(),
  fetchUserProfile: () => undefined,
})

