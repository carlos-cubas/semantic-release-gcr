const execa = require('execa')

module.exports = async (pluginConfig, { logger }) => {
  for (const envVar of ['GCLOUD_EMAIL', 'GCLOUD_KEY']) {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is not set`)
    }
  }
  try {
    await execa(
      'if',
      [
        ' [ ! -d "$HOME/google-cloud-sdk/bin" ]; then rm -rf $HOME/google-cloud-sdk; curl https://sdk.cloud.google.com | bash; fi',
      ],
      { stdio: 'inherit' }
    )
    // Add gcloud to $PATH
    await execa('source', ['/home/travis/google-cloud-sdk/path.bash.inc'], { stdio: 'inherit' })
    await execa('gcloud', ['version'], { stdio: 'inherit' })
    // Auth flow
    await execa('echo', ['$GCLOUD_KEY | base64 --decode > gcloud.p12'], { stdio: 'inherit' })
    await execa('gcloud', ['auth activate-service-account $GCLOUD_EMAIL --key-file gcloud.p12'], { stdio: 'inherit' })
    await execa('ssh-keygen', ['-f ~/.ssh/google_compute_engine -N ""'], { stdio: 'inherit' })
  } catch (err) {
    console.log(err)
    throw new Error('gcloud login failed with error: ' + err)
  }
}
