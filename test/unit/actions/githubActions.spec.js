const sinon = require('sinon')
const githubServices = require('../../../lib/services/githubService')
const helpers = require('../../helpers')
const githubActions = require('../../../lib/actions/githubActions')

const sandbox = sinon.createSandbox()

describe('lib/actions/githubActions', () => {
	describe('getGithubRepoInfo()', () => {
		let mockRequest
		let mockResponse
		let statusStub
		let jsonStub

		before(() => {
			mockRequest = {
				params: {
					url: 'https://github.com/user/repo',
				},
			}

			mockResponse = {}
			statusStub = sandbox.stub().returns(mockResponse)
			jsonStub = sandbox.stub().returns(mockResponse)

			mockResponse.status = statusStub
			mockResponse.json = jsonStub

			sandbox
				.stub(githubServices, 'getGithubPRInfo')
				.returns(helpers.getMockGithubPRInfoResponse())
		})

		after(() => {
			sandbox.restore()
		})

		it('returns the correct data structure', async () => {
			await githubActions.getGithubRepoInfo(mockRequest, mockResponse)
			sinon.assert.calledWith(githubServices.getGithubPRInfo, 'https://api.github.com/repos/user/repo/pulls')
			sinon.assert.calledWith(jsonStub, {
				success: true,
				data: [
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
				],
			})
		})
	})
})
