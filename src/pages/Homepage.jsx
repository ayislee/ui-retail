import React, {useState,useEffect} from 'react'
import {useParams,Routes,Route,useSearchParams } from 'react-router-dom'

import {RetailData,InitCustomer} from '../components/LocalStorage'

export default function Homepage() {
	const [searchParams] = useSearchParams();
	const [customer, setCustomer] = useState(InitCustomer())
	const retail_data = RetailData()
	console.log("retail_data",retail_data)

	useEffect(()=>{
		console.log("customer",customer)
		if(searchParams.get('transaction_number')){
			window.location.href='/history-detail/'+searchParams.get('transaction_number')
		}
		
	},[])
  	return (
	  	<React.Fragment>
		  	<div> </div>

	  	</React.Fragment>
	
  	)
}
