exports.formatGithubPRApiUrl = (githubUrl) => {
	const githubIndex = githubUrl.indexOf('github')
	const comIndex = githubUrl.indexOf('.com/')
	const str1 = githubUrl.substring(0, githubIndex)
	const str2 = githubUrl.substring(githubIndex, comIndex + 5)
	const str3 = githubUrl.substring(comIndex + 5)
	const newUrl = `${str1}api.${str2}repos/${str3}/pulls`
	return newUrl
}
