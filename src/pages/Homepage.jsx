import React, {useState,useEffect} from 'react'
import {useParams,Routes,Route} from 'react-router-dom'

import {RetailData,InitCustomer} from '../components/LocalStorage'

export default function Homepage() {

	const [customer, setCustomer] = useState(InitCustomer())
	const retail_data = RetailData()
	console.log("retail_data",retail_data)

	useEffect(()=>{
		console.log("customer",customer)
	},[])
  	return (
	  	<React.Fragment>
		  	<div>Homepage </div>

	  	</React.Fragment>
	
  	)
}
