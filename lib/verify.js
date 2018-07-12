const execa = require('execa')

module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['GCLOUD_EMAIL', 'GCLOUD_KEY']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    await execa.shell('sh gcloudlogin.sh', { stdio: 'inherit' })
  } catch (err) {
    console.log(err)
    throw new Error('gcloud login failed with error: ' + err)
  }
}
