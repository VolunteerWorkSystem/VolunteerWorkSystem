import { createContext } from 'react'

import type { components } from "../openapi/types.ts"; // generated by openapi-typescript


export interface AuthContextProps {
  authState: AuthState
  logout: () => Promise<void>
  // fetchUserProfile: () => void
}

export interface AuthState {
  loading: boolean
  error: any
  user: components['schemas']['UserPayload'] | undefined
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
  // fetchUserProfile: () => undefined,
})

