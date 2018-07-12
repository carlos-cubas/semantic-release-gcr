const execa = require('execa')

module.exports = async (pluginConfig, { nextRelease: { version }, logger }) => {
  logger.log(`Pushing version ${pluginConfig.name}:${version} to google container registry`)

  try {
    // Push both new version and latest
    await execa('docker', ['tag', `${pluginConfig.name}:latest`, `${pluginConfig.name}:${version}`], {
      stdio: 'inherit',
    })
    await execa('docker', ['push', `${pluginConfig.name}:${version}`], { stdio: 'inherit' })
    await execa('docker', ['push', `${pluginConfig.name}:latest`], { stdio: 'inherit' })
  } catch (err) {
    throw new Error('push failed with error: ' + err)
  }
}
