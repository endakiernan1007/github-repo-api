const axios = require('axios')

exports.get = async (url, params = {}, headers = {}) => {
	try {
		const res = await axios.get(url, {
			params,
			headers,
		})
		return res
	} catch (error) {
		console.error('request error: ', error.message)
		throw (error)
	}
}
