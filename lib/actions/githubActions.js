const { handleValidationErrors } = require('../validators')
const githubServices = require('../services/githubService')
const utils = require('../utils')

exports.getGithubRepoInfo = async (req, res) => {
	if (handleValidationErrors(req, res)) return

	try {
		const githubUrl = req.params.url
		const githubRepoApiUrl = utils.formatGithubPRApiUrl(githubUrl)
		const githubResponse = await githubServices.getGithubPRInfo(githubRepoApiUrl)

		res.json({ success: true, data: githubResponse })
	} catch (error) {
		const status = error.response?.status || 500
		res.status(status).json({
			success: false,
			error_message: error.message,
		})
	}
}
