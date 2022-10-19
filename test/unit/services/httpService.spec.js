const sinon = require('sinon')
const axios = require('axios')
const http = require('../../../lib/services/httpService')

describe('httpService', () => {
	describe('get()', () => {
		let axiosGetStub

		beforeEach(() => {
			axiosGetStub = sinon.stub(axios, 'get').resolves()
			sinon.stub(console, 'error').resolves()
		})

		afterEach(() => {
			sinon.restore()
		})

		it('calls axios.get with url param', async () => {
			await http.get('https://api.github.com/repos/user/repo/pulls')
			sinon.assert.calledWith(
				axios.get,
				'https://api.github.com/repos/user/repo/pulls',
				{
					params: {},
					headers: {},
				},
			)
		})

		it('rejects if axios call fails', async () => {
			try {
				axiosGetStub.rejects(new Error('Some axios error'))
				await http.get('https://api.github.com/repos/user/repo/pulls')
			} catch (error) {
				if (error.message !== 'Some axios error') throw error
			}

			sinon.assert.calledWith(console.error, 'request error: ', 'Some axios error')
		})
	})
})
