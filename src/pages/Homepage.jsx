import React from 'react'
import {useParams,Routes,Route} from 'react-router-dom'

import {RetailData} from '../components/LocalStorage'

export default function Homepage() {
	const retail_data = RetailData()
	console.log("retail_data",retail_data)
  	return (
	  	<React.Fragment>
		  	<div>Homepage </div>

	  	</React.Fragment>
	
  	)
}
