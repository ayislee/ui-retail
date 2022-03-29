import React, {useEffect,useState,useContext} from 'react'
import { MainContext } from "../App";
import {RetailData} from '../components/LocalStorage'
import {useParams} from "react-router-dom"
import {Api} from "../components/Api"
import {ApiReq} from "../components/ApiServer"
import Button from '@mui/material/Button';

export default function HistoryDetail() {
	
	
	const {transaction_number} = useParams()
	const [transaction,setTransaction] = useState()
	const { state, dispatch } = useContext(MainContext);
	const [retail_data,set_retail_data] = useState(RetailData())

	// console.log("param",transaction_number)

	const reloadData = async () => {
		const params = {
			url: Api.HISTORY_DETAIL.url.replace(':transaction_number',transaction_number),
			method: Api.HISTORY_DETAIL.method
		}

		const response = await ApiReq(params)
		if(response.success){
			// console.log('response',response.data)
			setTransaction(response.data)
		}
	}

	useEffect(()=>{
		// console.log('transaction',transaction)
	},[transaction])

	useEffect(()=>{
		dispatch({
			type: "TITLE",
			payload: {
				title: "TRANSAKSI"
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
		reloadData()
	},[])

	
	
	return (
		<React.Fragment>
			{transaction?(
				<div style={{margin:"1rem"}}>
					<div className="title-page">Transaksi</div>
					<div className="sub-title-page">{transaction?.transaction_id}</div>
					{
					transaction.transaction_detail.map((data,index)=>(
						<div className="i-data-container" key={index}>
							<div className="i-data-image">
								<img src={data?.transaction_detail_payload?.item_image[0]} alt="" />
							</div>
							<div className="i-data-detail">
								<div className="item-name">{data.transaction_detail_item_name}</div>
								<div className="item-quantity">jumlah: {data.transaction_detail_item_quantity} pcs</div>
								<div className="item-price">{new Intl.NumberFormat('IDR').format(data.transaction_detail_item_price)}</div>
								<div className="item-subtotal">
									<div className="item-subtotal-label">Sub Total</div>
									<div className="item-subtotal-value">
									{new Intl.NumberFormat('IDR').format(parseInt(data.transaction_detail_item_price)*parseInt(data.transaction_detail_item_quantity))}
									</div>
									
								</div>
							</div>
							
						</div>
					))
				}
					<div className="total-payment">
						<div className="total-payment-label">Jumlah Pembelian</div>
						<div className="total-payment-value">
						{new Intl.NumberFormat('IDR').format(parseInt(transaction?.transaction_amount))}
						</div>
					</div>
					<div className="total-payment">
						<div className="total-payment-label">Diskon</div>
						<div className="total-payment-value">
						{new Intl.NumberFormat('IDR').format(parseInt(transaction?.transaction_discount))}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Total Pembayaran</div>
						<div className="total-payment-value">
						{new Intl.NumberFormat('IDR').format(parseInt(transaction?.transaction_total_amount))}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Metoda Pembayaran</div>
						<div className="total-payment-value">
							{transaction?.ms_payment.ms_payment_name}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Status Pembayaran</div>
						<div className={
							transaction.transaction_approve_status===0?`status-pending`:
							transaction.transaction_approve_status===1?`status-processing`:
							transaction.transaction_approve_status===2?`status-verified`:
							transaction.transaction_approve_status===3?`status-approved`:`status-rejected`}>{transaction?.transaction_approve_status_name}
						</div>
					</div>
					

					<div className="total-payment">
						<div className="total-payment-label">Metoda Pengiriman</div>
						<div className="total-payment-value">
							{transaction?.ms_delivery.ms_delivery_name}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Alamat Pengiriman</div>
						<div className="total-payment-value">
							{transaction?.store.store_address}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Rencana Pengambilan</div>
						<div className="total-payment-value">
							{transaction?.transaction_delivery_expected_datetime}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Status Pengiriman/Pengambilan</div>
						<div className="total-payment-value">
							{transaction?.transaction_delivery_fulfilled_datetime?`Diterima`:`Belum diterima`}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">Pembeli</div>
						<div className="total-payment-value">
							{transaction?.customer_name}
						</div>
					</div>

					<div className="total-payment">
						<div className="total-payment-label">No handphone</div>
						<div className="total-payment-value">
							{transaction?.customer_msisdn}
						</div>
					</div>

					{transaction.transaction_approve_status==0?(''
						// <Button fullWidth variant="contained" size="large">Lakukan Pembayaran</Button>
					):('')}
				
				</div>

			):(
				<div className='title-page'>Tidak ada transaksi</div>
			)}
		</React.Fragment>
		
	)
}
