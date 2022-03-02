import React,{useEffect,useState} from 'react'
import {useParams,Navigate} from 'react-router-dom'
import SecureLS from 'secure-ls'
import {Api} from './Api'
import {ApiReq} from './ApiServer'
import {InitMenu} from './LocalStorage'


export default function Company() {
	const {company_slug,store_slug} = useParams()
	const [redirect,setRedirect] = useState(false)
	var ls = new SecureLS({ encodingType: 'aes' })

	useEffect(()=>{
		reloadData()
	},[])

	const reloadData = async () => {
		const params = {
			url: Api.STORE.url.replace(":store_slug",store_slug),
			method: Api.STORE.method,
		}

		// console.log('retail_data.outlet',retail_data.outlet)
		// console.log('params.url',params.url)
		const response = await ApiReq(params)
		if(response.success){
			const retail_data = {
				company: response.data.store.company.company_slug,
				outlet: response.data.store.store_slug
			}
			ls.set("retail_data", JSON.stringify(retail_data));
			const s = InitMenu(response.data)	
			console.log('s',s)

			const data = ls.get("retail_data")
			setRedirect(true)
			console.log('data',data)
			window.location.href="/menus"
			
			
		
		}else{
			setRedirect(false)
			window.location.href="/"
			
			
		}
	}
	
	return (
		
		<>
			
		</>
		
		
	)	

}
