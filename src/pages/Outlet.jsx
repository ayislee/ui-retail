import React, {useEffect,useState,useContext} from 'react';
import { MainContext } from "../App";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {RetailData} from '../components/LocalStorage';
import {Api} from '../components/Api';
import {ApiReq} from '../components/ApiServer';
import {Link} from 'react-router-dom'


export default function Outlet() {
	const { state, dispatch } = useContext(MainContext);
	const [stores,setStore] = useState([])
	const [page,setPage] = useState(1)
	const [lastPage,setLastPage] = useState(0)
	

	const retail_data = RetailData()
	const reloadContent = async () => {
		const params = {
			url: Api.COMPANY.url.replace(":company_slug",retail_data.company)+'?page='+page,
			method: Api.COMPANY.method,
			reqBody: retail_data
		}
		const response = await ApiReq(params)
		// console.log('response',response)
		if(response.success){
			setStore(response.data)
			setLastPage(response.data.last_page)
		}
	}

	useEffect(()=>{
		dispatch({
			type: "TITLE",
			payload: {
				title: "OUTLET"
			}
		});

		dispatch({
			type: "PROFILE",
			payload: {
				logo: retail_data.outlet_logo,
				company: retail_data.company_name,
				store: retail_data.outlet_name,
				address: retail_data.outlet_address	
			},
		})
		reloadContent()
	},[])

	useEffect(() => {
		// console.log('store',stores)
	},[stores])

	const handlePaginationChange = (event,value) => {
		setPage(value)
	}
  	return (
		<React.Fragment>
			{/* <div className="page-title">Outlet</div> */}
			<div className="container-2c">
				{
					stores.map((store,index)=>(
						<Link to={`/company/${retail_data.company}/${store.store_slug}`} key={index} style={{textDecoration:"none",color:"black"}}>
							<div className="item-2c">
							<img src={store.store_image[0]} alt="" />
							
							<div className="item-title">{store.store_name}</div>
							<div className="item-desc">{store.store_address}</div>
						</div>
						</Link>
						
					))
				}
			</div>
			<Stack spacing={2}>
				<Pagination 
					count={lastPage} 
					variant="outlined" 
					shape="rounded"
					onChange={handlePaginationChange} 
				/>
			</Stack>
		</React.Fragment>
  	)
}
