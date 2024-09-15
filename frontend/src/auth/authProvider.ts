import { jwtDecode } from 'jwt-decode'
import { isJwtExpired } from './utils'
import { Profile } from './services'
import config from './config'
import liff from "@line/liff"
import { dataProvider } from '../dataProvider'

const apiUrl = `${config.authProviderUrl}`

const commonHeaders = {
  'Content-Type': 'application/json',
}

const USE_LIFF = true

const authProvider = {
  liffLogin: async () => {
    // const decodedIDToken = liff.getDecodedIDToken()
    // if (isJwtExpired(decodedIDToken?.exp)) {
    //   console.log('isJwtExpired')
    //   await liff.logout()
    // }
    if (!liff.isLoggedIn()) {
      // set `redirectUri` to redirect the user to a URL other than the endpoint URL of your LIFF app.
      await liff.login({
        redirectUri: `${window.location.href}`,
      })
      return { redirect: true }
    }

    const newIDToken = liff.getIDToken()
    console.log({ newIDToken })
    if (!newIDToken) {
      console.error('newIDToken not found')
      throw new Error('newIDToken not found')
    }

    await authProvider.socialLogin('Line', newIDToken)
    return { redirect: false }
  },

  init: async () => {
    try {
      await liff.init({
        liffId: config.liffId,
      })
    } catch (error) {
      console.error('initializeLiff Error: ', error)
      throw error
    }
    if (!authProvider.getToken()) {
      console.log('liffLogin')
      return await authProvider.liffLogin()
    }
  },

  loginByLiff: async () => {
    let newJwtToken = ''
    try {
      if (!liff.isLoggedIn()) {
        await liff.login({
          redirectUri: `${window.location.href}`,
        })
      }

      const newIDToken = liff.getIDToken()
      console.log({ newIDToken })
      newJwtToken = await authProvider.socialLogin('Line', newIDToken)
    } catch (error) {
      console.log('Liff Error', error)
    }

    // const jwtToken = newJwtToken ? newJwtToken : (authState.token as string)
    // const newHighWallProfile = (jwt_decode(jwtToken) as any)?.identity
    const lineProfile = await liff.getProfile()
    return { newJwtToken, lineProfile }

  },


  // called when the user attempts to log in
  socialLogin: async (provider: 'Line', socialIdToken: string) => {

    const {
      data, // only present if 2XX response
      error, // only present if 4XX or 5XX response
    } = await dataProvider.GET("/auth/login/line", {
      headers: {
        Authorization: `Bearer ${socialIdToken}`,
      },
    });
    if (error) {
      throw new Error(error)
    }
  
    const { access_token } = data
    localStorage.setItem('token', access_token)
    console.log({ access_token })
    return Promise.resolve(access_token)
  },

  getToken: () => {
    let token = localStorage.getItem('token')

    if (token) {
      let decodedToken: Profile | undefined = undefined
      try {
        decodedToken = jwtDecode(token)
      } catch {
        decodedToken = undefined
      }

      if (decodedToken?.exp && isJwtExpired(decodedToken.exp)) {
        token = null
        localStorage.removeItem('token')
        console.log('token expire', decodedToken?.exp)
      }

      // if (decodedToken?.picture_url === undefined) {
      //   token = null
      //   localStorage.removeItem('token')
      //   console.log('token expire (no picture url)')
      // }
    }

    return token
  },

  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('token')
    liff.logout()
    return Promise.resolve()
  },
  // called when the API returns an error
  /**
   * Fortunately, each time the dataProvider returns an error,
   * react-admin calls the authProvider.checkError() method.
   * If it returns a rejected promise,
   * react-admin calls the authProvider.logout() method immediately,
   * and asks the user to log in again.
   */
  checkError: (error) => {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('token')
      return Promise.reject('401 or 403')
    }
    return Promise.resolve()
  },

  getProfile: () => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      throw Error('no token. please login')
    }
    const profile: Profile = jwtDecode(storedToken)
    return profile
  },
}

export default authProvider
