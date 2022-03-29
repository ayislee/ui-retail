import React, {useEffect, useState,useContext} from 'react'
import { MainContext } from "../App";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {ApiReq} from '../components/ApiServer'
import {Api} from '../components/Api'
import {InitCustomer,RetailData} from '../components/LocalStorage'
import Pagination from '@mui/material/Pagination';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import {Link} from 'react-router-dom'
export default function History() {
	const { state, dispatch } = useContext(MainContext);
    const [history,setHistory] = useState([])
	const [page,setPage] = useState(1)
	const [lastPage,setLastPage] = useState(0)
	const [customer,setCustomer] = useState(InitCustomer())
	const [retail_data,set_retail_data] = useState(RetailData())
    
	const reloadData = async () => {
		const params = {
			url: Api.HISTORY.url.replace(':customer_msisdn',customer.customer_msisdn)+'?page='+page,
			method: Api.HISTORY.method
		}

		const response = await ApiReq(params)
        console.log("response",response)
		if(response.success){
			setHistory(response.data)
			setLastPage(response.data.last_page)
		}else{

            window.location.href="/"
        }
	}
    useEffect(()=>{

		dispatch({
			type: "TITLE",
			payload: {
				title: "RIWAYAT PEMBELANJAAN"
			}
		});

		console.log("retail_data",retail_data)
		dispatch({
			type: "PROFILE",
			payload: {
				logo: retail_data.outlet_logo,
				company: retail_data.company_name,
				store: retail_data.outlet_name,
				address: retail_data.outlet_address	
			},
		})
		reloadData()
		

    },[])

    useEffect(()=> {
        // console.log('history',history)
    },[history])

	const handlePaginationChange = (event,value) => {
		setPage(value)
	}
    return (
       <React.Fragment>
           <div className="page-title">Riwayat pembelanjaan</div>
           
            {
                   history.map((data,index)=>(
                        <div className="history-item" key={index} >
							<Link to={`/history-detail/${data.transaction_number}`} style={{textDecoration:"none",color:"black"}}>
                            <div className="history-title-container">
                                <div className="history-icon"><ShoppingBasketIcon/></div>
                                <div className="history-shoping">
                                    <div className="history-shoping-label">Belanja</div>
                                    <div className="history-date">{data.transaction_created_datetime}</div>
                                </div>
                                <div className={
                                    data.transaction_approve_status===0?`status-pending`:
                                    data.transaction_approve_status===1?`status-processing`:
                                    data.transaction_approve_status===2?`status-verified`:
                                    data.transaction_approve_status===3?`status-approved`:`status-rejected`}>{data.transaction_approve_status_name}
                                </div>
                            </div>
                            <div className="history-detail">
                                <div className="history-shoping-label">Kode Transaksi</div>
                                <div className="history-date">{data.transaction_id}</div>
                            </div>
                            <div className="history-detail">
                                <div className="history-shoping-label">Total Belanja</div>
                                <div className="history-price">Rp. {new Intl.NumberFormat('IDR').format(data.transaction_total_amount)}</div>
                            </div>
							</Link>
                            
                        </div>
                   ))
            }

			<Pagination 
				count={lastPage} 
				variant="outlined" 
				shape="rounded" 
				onChange={handlePaginationChange}
				style= {{marginLeft:"1rem"}}
			/>
            
       </React.Fragment>
    )
}
    