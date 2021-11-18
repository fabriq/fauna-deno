const { version, repository, name } = require('../package.json')

async function printReleaseNotes() {
  const releaseInfo = await fetch(
    `https://api.github.com/repos/${repository}/releases/tags/${version}`
  ).then(resp => resp.json())

  if (releaseInfo === undefined || releaseInfo.body === undefined) return

  const releaseNotes = releaseInfo.body
    .replace(/-/g, ' - ')
    .replace(/\r\n/g, '\n')

  console.info(`${name}@${version} release notes: \n\n` + releaseNotes)
}

printReleaseNotes()
