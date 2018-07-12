// const execa = require('execa')
const exec = require('child_process').exec

module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['GCLOUD_EMAIL', 'GCLOUD_KEY']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    exec('./gcloudlogin.sh', (error, stdout, stderr) => {
      console.log(`${stdout}`)
      console.log(`${stderr}`)
      if (error !== null) {
        throw new Error(error)
      }
    })
  } catch (err) {
    console.log(err)
    throw new Error('gcloud login failed with error: ' + err)
  }
}
