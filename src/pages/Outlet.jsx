import React, {useEffect,useState} from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {RetailData} from '../components/LocalStorage';
import {Api} from '../components/Api';
import {ApiReq} from '../components/ApiServer';
import {Link} from 'react-router-dom'


export default function Outlet() {
	const [stores,setStore] = useState([])
	const retail_data = RetailData()
	const reloadContent = async () => {
		const params = {
			url: Api.COMPANY.url.replace(":company_slug",retail_data.company),
			method: Api.COMPANY.method,
			reqBody: retail_data
		}
		const response = await ApiReq(params)
		if(response.success){
			setStore(response.data)
		}
	}

	useEffect(()=>{
		reloadContent()
	},[])

	useEffect(() => {
		console.log('store',stores)
	},[stores])

  	return (
		<React.Fragment>
			{/* <div className="page-title">Outlet</div> */}
			<div className="container-2-column">
				{
					stores.map((store,index)=>(
						<Link to={`/company/${retail_data.company}/${store.store_slug}`} key={index} style={{textDecoration:"none",color:"black"}}>
							<div className="item">
							<img src={store.store_image[0]} alt="" />
							
							<div className="item-title">{store.store_name}</div>
							<div className="item-desc">{store.store_address}</div>
						</div>
						</Link>
						
					))
				}
			</div>
			<Stack spacing={2}>
				<Pagination count={10} variant="outlined" shape="rounded" />
			</Stack>
		</React.Fragment>
  	)
}
