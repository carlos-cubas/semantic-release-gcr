const execa = require('execa')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Pushing version ${pluginConfig.name}:${version} to google container registry`)

  // Push both new version and latest
  execa('docker', ['tag', `${pluginConfig.name}:latest`, `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
  execa.shell('gcloud docker -- push ' + `${pluginConfig.name}:${version}`, { stdio: 'inherit' })
  execa.shell('gcloud docker -- push ' + `${pluginConfig.name}:latest`, { stdio: 'inherit' })
}
