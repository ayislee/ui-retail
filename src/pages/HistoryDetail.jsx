import React, {useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import {Api} from "../components/Api"
import {ApiReq} from "../components/ApiServer"

export default function HistoryDetail() {
	
	
	const {transaction_number} = useParams()
	const [transaction,setTransaction] = useState()

	console.log("param",transaction_number)

	const reloadData = async () => {
		const params = {
			url: Api.HISTORY_DETAIL.url.replace(':transaction_number',transaction_number),
			method: Api.HISTORY_DETAIL.method
		}

		const response = await ApiReq(params)
		if(response.success){
			console.log('response',response.data)
			setTransaction(response.data)
		}
	}

	useEffect(()=>{
		console.log('transaction',transaction)
	},[transaction])

	useEffect(()=>{
		reloadData()
	},[])

	
	
	return (
		<React.Fragment>
			{transaction?(
				<div style={{margin:"1rem"}}>
					<div className="title-page">Transaksi</div>
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
				</div>
			):(
				<div>Tidak ada transaksi</div>
			)}
		</React.Fragment>
		
	)
}
