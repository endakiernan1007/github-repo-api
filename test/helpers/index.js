exports.getMockGithubPRInfoResponse = () => [
	{
		id: 1,
		number: 100,
		title: 'Title of Pull Request 1',
		author: 'Author of Pull Request 1',
		commit_count: 8,
	},
	{
		id: 2,
		number: 101,
		title: 'Title of Pull Request 2',
		author: 'Author of Pull Request 2',
		commit_count: 4,
	},
]

exports.getMockPullRequestHttpResponse = () => ({
	data: [
		{
			id: 1,
			number: 123,
			title: 'Pr title 1',
			user: {
				login: 'Test user 1',
			},
			commits_url: 'https://github.com/user1/repo1',
		},
		{
			id: 2,
			number: 321,
			title: 'Pr title 2',
			user: {
				login: 'Test user 2',
			},
			commits_url: 'https://github.com/user2/repo2',
		},
	],
})

exports.getMockCommitsHttpResponse = (num) => ({
	data: Array(num),
})
