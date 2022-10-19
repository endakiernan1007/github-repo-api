const { validationResult } = require('express-validator')
const config = require('../config')[process.env.APP_ENV]

exports.handleValidationErrors = (req, res) => {
	const validationErrors = validationResult(req).array()
	if (validationErrors.find((err) => err.param === 'authorization')) {
		console.log('handleValidationErrors (error 403) authorization')
		res.status(403).json({
			success: false,
			error_message: 'invalid or missing authorization token',
		})
	}
}

exports.isValidGithubURL = (url) => {
	const valid = /^(https?:\/\/)?((www\.)?github\.com)\/.*\/.*/
	return valid.test(url)
}

exports.isValidApiKey = async (value) => {
	const splitValue = (value || '').split('Bearer ')
	if (splitValue.length < 2 || config.apiKey !== splitValue[1]) {
		throw new Error('invalid parner-api token')
	}
}
