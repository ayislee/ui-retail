import React from 'react'
import {useParams,Navigate} from 'react-router-dom'
import SecureLS from 'secure-ls'


export default function Company() {
	const {company_slack,outlet_slack} = useParams()
	var ls = new SecureLS({ encodingType: 'aes' })
	const retail_data = {
		company: company_slack,
		outlet: outlet_slack
	}

	ls.set("retail_data", JSON.stringify(retail_data));
	const data = ls.get("retail_data")
	// console.log("data",data)
	return (
		<Navigate to="/menus" replace={true} />
		)
	}
