const express = require('express')
const repoAction = require('../actions/githubActions')

const app = express()
const router = express.Router()
const schemas = require('../validators/schemas')

app.use(router)
app.use(express.json())
if (process.env.APP_ENV !== 'test') {
	app.listen(3000)
	console.log('API server running at http://localhost:3000')
}

router.get('/repo/:url', schemas.getRepoInfoSchema(), repoAction.getGithubRepoInfo)

exports.app = app
