const execa = require('execa')

module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['GCLOUD_EMAIL', 'GCLOUD_KEY']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    await execa.shell(
      'if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash; fi' +
        ' source /home/travis/google-cloud-sdk/path.bash.inc' +
        ' gcloud version' +
        ' echo $GCLOUD_KEY | base64 --decode > gcloud.p12' +
        ' gcloud auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12' +
        ' ssh-keygen -f ~/.ssh/google_compute_engine -N ""',
      { stdio: 'inherit' }
    )
  } catch (err) {
    console.log(err)
    throw new Error('gcloud login failed with error: ' + err)
  }
}
