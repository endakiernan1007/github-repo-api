const assert = require('assert').strict
const { isValidGithubURL } = require('../../../lib/validators')

describe('validators', () => {
	describe('isValidGithubURL()', () => {
		it('Accepts valid https:// url', () => {
			assert.deepEqual(
				isValidGithubURL('https://github.com/actionsdemos/calculator'),
				true,
			)
		})
		it('Accepts valid http:// url', () => {
			assert.deepEqual(
				isValidGithubURL('http://github.com/actionsdemos/calculator'),
				true,
			)
		})
		it('Accepts valid https://www. url', () => {
			assert.deepEqual(
				isValidGithubURL('https://www.github.com/actionsdemos/calculator'),
				true,
			)
		})
		it('Accepts valid www. url', () => {
			assert.deepEqual(
				isValidGithubURL('www.github.com/actionsdemos/calculator'),
				true,
			)
		})
		it('Rejects non github url', () => {
			assert.deepEqual(
				isValidGithubURL('http://hubgit.com/actionsdemos/calculator'),
				false,
			)
		})
		it('Rejects valid github user url', () => {
			assert.deepEqual(
				isValidGithubURL('http://github.com/actionsdemos'),
				false,
			)
		})
		it('Rejects valid route github url', () => {
			assert.deepEqual(
				isValidGithubURL('http://github.com/'),
				false,
			)
		})
	})
})
