
interface Config {
  liffId: string
  authProviderUrl: string
}
const config: Config = {
  liffId: import.meta.env.VITE_LIFF_ID,
  authProviderUrl: import.meta.env.VITE_DATA_PROVIDER_URL,
}

function validate() {

  if (!config.liffId) {
    throw new Error('liffId is needed')
  }
  if (!config.authProviderUrl) {
    throw new Error('authProviderUrl is needed')
  }
}
validate()

export default config

