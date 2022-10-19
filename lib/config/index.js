exports.development = {
	githubApiToken: process.env.GITHUB_TOKEN,
	apiKey: process.env.API_KEY,
}

exports.test = {
	githubApiToken: 'test_token',
	apiKey: 'test_key',
}
