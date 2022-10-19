const assert = require('assert').strict
const axios = require('axios')
const request = require('supertest')
const sinon = require('sinon')

const sandbox = sinon.createSandbox()
const routes = require('../../lib/api/routes')
const helpers = require('../helpers')

describe('routes', () => {
	describe('GET /repo', () => {
		let getRequestStub
		const testUrl = encodeURIComponent('https://github.com/user/repo')

		before(() => {
			getRequestStub = sandbox.stub(axios, 'get')
			getRequestStub.onCall(0).returns(helpers.getMockPullRequestHttpResponse())
			getRequestStub.onCall(1).returns(helpers.getMockCommitsHttpResponse(0))
			getRequestStub.onCall(2).returns(helpers.getMockCommitsHttpResponse(2))
			getRequestStub.onCall(3).returns(helpers.getMockCommitsHttpResponse(4))
		})

		after(() => {
			sandbox.restore()
		})

		it('processes the request successfully', async () => {
			const res = await request(routes.app)
				.get(`/repo/${testUrl}`)
				.send()
				.set('Authorization', 'Bearer test_key')
				.expect('Content-Type', /json/)
				.expect(200)

			assert.deepEqual(res.body, {
				success: true,
				data: [
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
				],
			})
		})

		it('fails if there is no authorization token', async () => {
			const res = await request(routes.app)
				.get(`/repo/${testUrl}`)
				.send()
				.set('Authorization', 'Bearer wrong_test_key')
				.expect('Content-Type', /json/)
				.expect(403)

			assert.deepEqual(res.body, {
				success: false,
				error_message: 'invalid or missing authorization token',
			})
		})

		it('fails if authorization token is wrong', async () => {
			const res = await request(routes.app)
				.get(`/repo/${testUrl}`)
				.send()
				.expect('Content-Type', /json/)
				.expect(403)

			assert.deepEqual(res.body, {
				success: false,
				error_message: 'invalid or missing authorization token',
			})
		})
	})
})
