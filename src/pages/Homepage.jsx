import React, {useState,useEffect,useContext} from 'react';
import { MainContext } from "../App";
import {useParams,Routes,Route,useSearchParams } from 'react-router-dom';
import {Api} from '../components/Api'
import {ApiReq} from '../components/ApiServer'


import {RetailData,InitCustomer} from '../components/LocalStorage'

export default function Homepage() {
	const { state, dispatch } = useContext(MainContext);
	const [searchParams] = useSearchParams();
	const [customer, setCustomer] = useState(InitCustomer())
	const retail_data = RetailData()
	
	const reloadContent = async () => {
		const params2 = {
			url: Api.ADS.url.replace(":store_slug",retail_data.outlet),
			method: Api.ADS.method,
			reqBody: retail_data
		}

		const response2 = await ApiReq(params2)
		if(response2.success){
			
			dispatch({
				type: "BANNER",
				payload : {
					banner: response2.data
				}
			})

			dispatch({
				type: "SHOW BANNER",
				payload : {
					show_banner: true
				}
			})
		
		}
	}
	useEffect(()=>{
		console.log("customer",customer)
		if(searchParams.get('transaction_number')){
			window.location.href='/history-detail/'+searchParams.get('transaction_number')
		}

		reloadContent()
		
	},[])
  	return (
	  	<React.Fragment>
		  	<div> </div>

	  	</React.Fragment>
	
  	)
}
