import { simpleGit } from 'simple-git'
let git = simpleGit()

// most recent tag
let release = (await git.tags()).latest

let release_commit = await git.revparse(['--short', release])
let current_commit = await git.revparse(['--short', 'HEAD'])
// are we currently on the latest tag?
let isRelease = release_commit === current_commit

// current state of the working tree
let isClean = (await git.status()).isClean()

console.log(
	`export default "${release}${isRelease ? '' : '+' + current_commit}${isClean ? '' : '-dirty'}"`
)
