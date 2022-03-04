import React, {useEffect} from 'react'
import { Dialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';
import Midtrans from './Midtrans'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });

export default function Payment(props) {
	const [scroll, setScroll] = React.useState('paper');


	const handlePaySuccess = () =>{
		alert("Success")
	}
	const handlePayError = () =>{
		alert("Success")
	}
	const handlePayPending = () =>{
		alert("Pending")
	}
	const handlePayClose = () =>{
		alert("Close")
	}
  	return (
		<Dialog
			fullScreen
			open={props.open}
		
			TransitionComponent={Transition}
		>
			<DialogTitle>Pembayaran</DialogTitle>
			<DialogContent>
				{
					props.item_data?.current_order.map((data,index)=>(
						<div className="i-data-container" key={index}>
							<div className="i-data-image">
								<img src={data.item_image[0]} alt="" />
							</div>
							<div className="i-data-detail">
								<div className="item-name">{data.category_display_name}</div>
								<div className="item-quantity">jumlah: {data.quantity} pcs</div>
								<div className="item-price">{new Intl.NumberFormat('IDR').format(data.discount_price?data.discount_price:data.regular_price)}</div>
								<div className="item-subtotal">
									<div className="item-subtotal-label">Sub Total</div>
									<div className="item-subtotal-value">
									{new Intl.NumberFormat('IDR').format(parseInt(data.discount_price?data.discount_price:data.regular_price)*parseInt(data.quantity))}
									</div>
									
								</div>
							</div>
							
						</div>
					))
				}

				<div className="total-payment">
					<div className="total-payment-label">Total Pembayaran</div>
					<div className="total-payment-value">
					{new Intl.NumberFormat('IDR').format(parseInt(props.data?.transaction_amount))}
					</div>
				</div>
				<Midtrans 
					clientKey={process.env.REACT_APP_DATA_CLIENT_KEY} 
					token={props.token}
					onSuccess={handlePaySuccess}
					onError={handlePayError}
					onPending={handlePayPending}
					onClose={handlePayClose}


				>
					<Button 
						sx={{marginTop:"1rem"}}
						variant="contained"
					>
						Bayar
					</Button>
				</Midtrans>
				
			</DialogContent>
      	</Dialog>
  	)
}
