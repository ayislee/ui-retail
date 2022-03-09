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
				console.log("get")
				response =  await axios.get(params.url,config)
				return response.data
				break;

			case 'post':
				console.log("post")
				response =  await axios.post(params.url,params.reqBody,config)
				return response.data
				break;	
			
			default:
				return response
				break;
		}
		

	} catch (error) {
		let message
		switch (error.response.status) {
			case 401:
				message = "tidak ada data"
				break;
		
			default:
				message = error.response.message
				break;
		}
		return {
			error: error.response.status
		}
	}

	
	
}