
interface Config {
  dataProviderUrl: string
}
const config: Config = {
  dataProviderUrl: import.meta.env.VITE_DATA_PROVIDER_URL,
}

function validate() {
  if (!config.dataProviderUrl) {
    throw new Error('liffId is needed')
  }
}
validate()

export default config

