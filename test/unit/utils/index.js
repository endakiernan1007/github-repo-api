const assert = require('assert').strict
const { formatGithubPRApiUrl } = require('../../../lib/utils')

describe('utils', () => {
	describe('formatGithubPRApiUrl()', () => {
		it('returns correctly formatted github api link', () => {
			const formattedUrl = formatGithubPRApiUrl(
				'https://github.com/actionsdemos/calculator',
			)
			const expectedResult = 'https://api.github.com/repos/actionsdemos/calculator/pulls'
			assert.equal(formattedUrl, expectedResult)
		})
	})
})
