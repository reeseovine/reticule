import { writeFileSync } from 'fs'

import pkg from './package.json' assert { type: 'json' }

import { simpleGit } from 'simple-git'
let git = simpleGit()

// most recent tag
let release = (await git.tags()).latest || 'v'+pkg.version

let release_commit = await git.revparse(['--short', release])
let current_commit = await git.revparse(['--short', 'HEAD'])

// are we currently on the latest tag?
let isRelease = release_commit === current_commit

// current state of the working tree
let isClean = (await git.status()).isClean()

// all together now
let version_str = `${release}${isRelease ? '' : '+' + current_commit}${isClean ? '' : '-dirty'}`
console.log(version_str)
writeFileSync('./src/version.ts', `export default "${version_str}"\n`)
