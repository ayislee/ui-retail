import axios from 'axios';

// const qs = require("querystring");
// const queryString = require('query-string');

var qs = require('qs');
// var assert = require('assert');

// params is
// access = 'auth/public'
// url = url
// method = 'get/post/put/delete'
// reqBody = paramater object



export const ApiReq = async (params,pub=true) => {
	// console.log(pub)
	const config = {
		baseURL: (pub)?(process.env.REACT_APP_API_PUBLIC_URL):(process.env.REACT_APP_API_BASE_URL),
		timeout: process.env.REACT_APP_REQUEST_TIMEOUT,
	}

	console.log('config.baseURL',config.baseURL)
	let response 
	


	try {
		switch (params.method) {

			case 'get':
				response =  await axios.get(params.url,config)
				console.log(response)
				return response
				break;

			
			default:
				return response
				break;
		}
		

	} catch (error) {
		return error
	}

	
	
}