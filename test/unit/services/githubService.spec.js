const sinon = require('sinon')
const assert = require('assert').strict
const githubService = require('../../../lib/services/githubService')
const httpService = require('../../../lib/services/httpService')
const helpers = require('../../helpers')

describe('githubService', () => {
	describe('getGithubPRInfo()', () => {
		let getRequestStub

		before(() => {
			getRequestStub = sinon.stub(httpService, 'get')
			getRequestStub.onCall(0).returns(helpers.getMockPullRequestHttpResponse())
			getRequestStub.onCall(1).returns(helpers.getMockCommitsHttpResponse(0))
			getRequestStub.onCall(2).returns(helpers.getMockCommitsHttpResponse(2))
			getRequestStub.onCall(3).returns(helpers.getMockCommitsHttpResponse(4))
		})

		after(() => {
			sinon.restore()
		})

		it('it returns the correct data structure', async () => {
			const res = await githubService.getGithubPRInfo('https://api.github.com/repos/user/repo/pulls')
			assert.deepEqual(res, [
				{
					id: 1,
					number: 123,
					title: 'Pr title 1',
					author: 'Test user 1',
					commit_count: 2,
				},
				{
					id: 2,
					number: 321,
					title: 'Pr title 2',
					author: 'Test user 2',
					commit_count: 4,
				},
			])
		})
	})
})
