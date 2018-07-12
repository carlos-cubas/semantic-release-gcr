# semantic-release-gcr
[![build](https://img.shields.io/travis/carlos-cubas/semantic-release-gcr.svg)](https://travis-ci.org/carlos-cubas/semantic-release-gcr)
[![dependencies Status](https://david-dm.org/carlos-cubas/semantic-release-gcr/status.svg)](https://david-dm.org/carlos-cubas/semantic-release-gcr)
[![devDependencies Status](https://david-dm.org/carlos-cubas/semantic-release-gcr/dev-status.svg)](https://david-dm.org/carlos-cubas/semantic-release-gcr?type=dev)
[![peerDependencies Status](https://david-dm.org/carlos-cubas/semantic-release-gcr/peer-status.svg)](https://david-dm.org/carlos-cubas/semantic-release-gcr?type=peer)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/npm/l/semantic-release-docker.svg)](https://github.com/carlos-cubas/semantic-release-gcr/blob/master/LICENSE)

Set of [semantic-release](https://github.com/semantic-release/semantic-release) plugins for publishing a docker image to
[google container registry](https://cloud.google.com/container-registry/).

```json
{
  "release": {
    "verifyConditions": "semantic-release-gcr",
    "publish": {
      "path": "semantic-release-gcr",
      "name": "[registry-id]/[project-id]/[image-name]"
    }
  }
}
```

## Configuration

Your credentials have to be configured with the environment variables `GCLOUD_EMAIL` and `GCLOUD_KEY`.

You will need to first set up a service account on google cloud. You will need the email address and downloaded json key file project_name-xxxxx.json.

| name | value |
| ---- | ----- |
| GCLOUD_EMAIL | {string_of_characters}@developer.gserviceaccount.com |
| GCLOUD_KEY | base64-encoded version of project_name-xxxxx.json |

On OSX and Linux, you can get the base64 encoded version like this:

`cat project_name-xxxxx.json | base64`


In addition, you need to specify the name of the image as the `name` setting.

## Plugins

### `verifyConditions`

Verify that all needed configuration is present and login to the google container registry.

### `publish`

Tag the image specified by `name` with the new version, push it to google container registry and update the `latest` tag.

## Example .travis.yml

```yml
jobs:
  include:
    - stage: release
      language: node_js
      node_js: '8'
      services:
        - docker
      script:
        - docker build -t username/imagename .
        - npm run semantic-release

stages:
  - test
  - name: release
    if: branch = master AND type = push AND fork = false

branches:
  except:
    - /^v\d+\.\d+\.\d+$/
```
