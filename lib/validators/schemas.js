const { header, param } = require('express-validator')
const validators = require('.')

exports.getRepoInfoSchema = () => [
	header('authorization')
		.notEmpty({ ignore_whitespace: true })
		.bail()
		.custom(validators.isValidApiKey),
	param('url').notEmpty({ ignore_whitespace: true }),
]
