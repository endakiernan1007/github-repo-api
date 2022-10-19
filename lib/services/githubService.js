const config = require('../config')[process.env.APP_ENV]
const http = require('./httpService')

const headers = {
	Authorization: `Bearer ${config.githubApiToken}`,
}

exports.getGithubPRInfo = async (url) => {
	const pullRequests = await getAllPRRequests(url)
	const mappedData = mapPullRequests(pullRequests)
	return mappedData
}

async function getAllPRRequests(url) {
	const params = {
		page: 0,
		per_page: 100,
	}
	let pullRequests = []
	let nextPagePRs
	let nextPage = true
	while (nextPage) {
		params.page += 1
		nextPagePRs = await http.get(url, params, headers)
		pullRequests = [...pullRequests, ...nextPagePRs.data]
		if (nextPagePRs.data.length <= 0) {
			nextPage = false
		}
	}
	return pullRequests
}

function mapPullRequests(pullRequests) {
	return Promise.all(pullRequests.map(async (pr) => {
		const commits = await http.get(pr.commits_url, {}, headers)
		return {
			id: pr.id,
			number: pr.number,
			title: pr.title,
			author: pr.user.login,
			commit_count: commits.data?.length,
		}
	}))
}
