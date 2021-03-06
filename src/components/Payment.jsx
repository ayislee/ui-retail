import React, {useEffect,useState} from 'react'
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import Midtrans from './Midtrans'
import {Api} from '../components/Api'
import {ApiReq} from '../components/ApiServer'
import {ClearCart} from '../components/LocalStorage'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Payment(props) {
	const [scroll, setScroll] = React.useState('paper');
	const [token,set_token] = useState(null)
	const [loadMidtrans,set_loadMidtrans] = useState(false)


	

	

	const handlePay = async () => {
		ClearCart()
		if(props.ms_payment_id != 4){
			window.location.href='/history'
		}
		const items = []

		for (const i of props.item_data) {
			items.push({
				item_id: i.item_id,
				item_name: i.item_name,
				quantity: i.quantity,
				note: i.note
			})
		}

		// console.log('props',props)

		const params = {
			url: Api.TRX.url,
			method: Api.TRX.method,
			reqBody: {
				store_id: props.store_id,
				ms_payment_id: props.ms_payment_id,
				ms_delivery_id: props.ms_delivery_id,
				customer_name: props.customer_name,
				customer_msisdn: props.customer_msisdn,
				voucher_code: props.voucher_code,
				item:items,
				
			}
		}

		const response = await ApiReq(params)
		if(response.success){
			// console.log("response",response)
			if(response.token){
				props.onPayment(response.token)
			}else{
				props.onPayment(null)
			}
			
			
		}



	}

	useEffect(() => {
		if(token !== null){
			set_loadMidtrans(true)
		}
		// console.log('token',token)	
	},[token])

  	return (
		<Dialog
			fullScreen
			open={props.open}
		
			TransitionComponent={Transition}
		>
			<DialogTitle>Pembayaran</DialogTitle>
			<DialogContent>
				{
					props.item_data.map((data,index)=>(
						<div className="i-data-container" key={index}>
							<div className="i-data-image">
								<img src={data?.item_image[0]} alt="" />
							</div>
							<div className="i-data-detail">
								<div className="item-name">{data.transaction_detail_item_name}</div>
								<div className="item-quantity">jumlah: {data.quantity} pcs</div>
								<div className="item-price">{new Intl.NumberFormat('IDR').format(data.current_price)}</div>
								<div className="item-subtotal">
									<div className="item-subtotal-label">Sub Total</div>
									<div className="item-subtotal-value">
									{new Intl.NumberFormat('IDR').format(parseInt(data.current_price)*parseInt(data.quantity))}
									</div>
									
								</div>
							</div>
							
						</div>
					))
				}

				<div className="total-payment">
					<div className="total-payment-label">Jumlah Pembelian</div>
					<div className="total-payment-value">
					{new Intl.NumberFormat('IDR').format(parseInt(props.data?.transaction_amount))}
					</div>
				</div>
				<div className="total-payment">
					<div className="total-payment-label">Diskon</div>
					<div className="total-payment-value">
					{new Intl.NumberFormat('IDR').format(parseInt(props.data?.transaction_discount))}
					</div>
				</div>
				<div className="total-payment">
					<div className="total-payment-label">Total Pembayaran</div>
					<div className="total-payment-value">
					{new Intl.NumberFormat('IDR').format(parseInt(props.data?.transaction_total_amount))}
					</div>
				</div>

				<div className="total-payment">
					<div className="total-payment-label">Metoda Pembayaran</div>
					<div className="total-payment-value">
						{props.ms_payment?.ms_payment_name}
					</div>
				</div>

				<div className="total-payment">
					<div className="total-payment-label">Metoda Pengiriman</div>
					<div className="total-payment-value">
						{props.ms_delivery.ms_delivery_name}
					</div>
				</div>

				<div className="total-payment">
					<div className="total-payment-label">Alamat Pickup</div>
					<div className="total-payment-value">
						{props.pickup}
					</div>
				</div>

				<div className="total-payment">
					<div className="total-payment-label">Rencana Pengambilan</div>
					<div className="total-payment-value">
						{props.date_pickup}
					</div>
				</div>

				{props.ms_payment?.ms_payment_id != 4?(
					<div className="total-payment">
					<div className="total-payment-label">Catatan</div>
					<div className="total-payment-value">
						Selesaikan pembayaran di kasir
					</div>
				</div>
				):(``)}
				<Button 
				onClick={handlePay}
					sx={{marginTop:"1rem"}}
					variant="contained"
				>
					Bayar
				</Button>

				{/* {loadMidtrans?(
					<Midtrans 
						clientKey={process.env.REACT_APP_DATA_CLIENT_KEY} 
						token={token}
						onSuccess={handlePaySuccess}
						onError={handlePayError}
						onPending={handlePayPending}
						onClose={handlePayClose}


					>
						<button>Bayar</button>
					</Midtrans>
				):(``)} */}
				
				
				
				
			</DialogContent>
      	</Dialog>
  	)
}
