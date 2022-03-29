import React,{useState,useEffect,useContext} from 'react'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {InitCart, UpdateCart} from '../components/LocalStorage'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { MainContext } from "../App";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from 'react-mobile-datepicker';






export default function CustomCart(props) {
	const { state, dispatch } = useContext(MainContext);

	const dateConfig = {
		// 'year': {
		// 	format: 'YYYY',
		// 	caption: 'Year',
		// 	step: 1,
		// },
		// 'month': {
		// 	format: 'M',
		// 	caption: 'Mon',
		// 	step: 1,
		// },
		// 'date': {
		// 	format: 'D',
		// 	caption: 'Day',
		// 	step: 1,
		// },
		'hour': {
			format: 'hh',
			caption: 'Hour',
			step: 1,
		},
		'minute': {
			format: 'mm',
			caption: 'Min',
			step: 1,
		},
		// 'second': {
		// 	format: 'hh',
		// 	caption: 'Sec',
		// 	step: 1,
		// },
	}
	
	const [sk,setSk] = useState(false)
	
	const [total,setTotal] = useState(0)
	const [delivery_date,set_delivery_date] = useState({
		time: new Date(),
        isOpen: false,
		date_string: ""
	})

	const stepUp = (index) => {
		props.carts[index].quantity++
		const p1 = UpdateCart(props.carts)
		calculate()
		props.onSetCart(InitCart())
		
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const stepDown = (index) => {
		props.carts[index].quantity--
		if(props.carts[index].quantity<0) props.carts[index].quantity = 0
		const p1 = UpdateCart(props.carts)
		calculate()
		props.onSetCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const calculate = () => {
		let stotal = 0
		for (const iterator of props.carts) {
			stotal = stotal + (iterator.discount_price?parseInt(iterator.discount_price):parseInt(iterator.regular_price))*parseInt(iterator.quantity)
		}
		setTotal(stotal)
	}

	const handleQuantity = (index) => (event) =>{

		if(event.target.value < 0) event.target.value=0
		if(event.target.value === "" ) event.target.value=0
		props.carts[index].quantity=event.target.value

		const p1 = UpdateCart(props.carts)
		calculate()
		
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const handleDelete = (index) => (event) =>{
		props.carts.splice(index, 1);
		const p1 = UpdateCart(props.carts)
		calculate()
		props.onSetCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const handleNote = (index) => (event) => {
		props.carts[index].note=event.target.value
		const p1 = UpdateCart(props.carts)
		props.onSetCart(InitCart())
	}

	const handleCustomer = (event) => {
		props.onHandleCustomer(event)
	}

	const handleVoucher = (event) => {
		props.OnHandleVoucher(event)
	}

	const handleMSPayment = (event) => {
		props.OnHandleMSPayment(event)
	}

	const handleMSDelivery = (event) => {
		props.OnHandleMSDelivery(event)
	}

	const handleClickDate = () => {
		set_delivery_date({...delivery_date,isOpen:true})
	}

	

	const handleCancelPicker = (value) => {
		set_delivery_date({
			...delivery_date,
			
			isOpen: false
		})
	}

	const handlePay = () => {
		props.OnHandlePay()
	}

	const handleSK = () => {
		setSk(!sk)
	}

	const handleSelectPicker = (value) => {
		set_delivery_date({
			...delivery_date,
			time: value,
			isOpen: false
		})
		
	} 

	const handleVoucherBtn = () =>{
		props.onVoucherClick()

	}

	useEffect(()=> {
		props.OnHandleDeliveryDate(delivery_date)
	},[delivery_date])

    return (
        
        <React.Fragment>
				<div className="cart-container">
				{
					props.carts.map((cart,index)=>(
						<React.Fragment key={index}>
	
							<div className="cart-image" key={index}>
								<img src={cart.item_image[0]} alt="" />
							</div>
							<div className="cart-detail">
								<div className="c-item">{cart.item_name}</div>
								<div className="c-price">
									 
									Rp {cart.discount_price?
										new Intl.NumberFormat('IDR').format(cart.discount_price):
										new Intl.NumberFormat('IDR').format(cart.regular_price)
									}
								</div>
								<div className="c-quantity">
									<Button variant="outlined"
										className="btn-control"
										onClick={()=>stepDown(index)}
									>
										-
									</Button>
									<Input 
										type="number"
										value={props.carts[index].quantity}
										onChange={handleQuantity(index)}
										name="quantity"
										disableUnderline={true}
										style={{
											width: "50px",
											maxHeight: "36px !important",
											textAlign: "center",
											border: "none",
											paddingLeft: "20px"
										}}
									/>
									
									<Button 
										variant="outlined"
										className="btn-control"
										onClick={()=>stepUp(index)}
									>
										+
									</Button>
									<Button variant="outlined" 
										onClick={handleDelete(index)}
										style={{
											marginLeft: "10px",
										}}

									>
										<DeleteForeverIcon/>
									</Button>
	
								</div>
								<div className="c-note">
									<TextField fullWidth
										label="Catatan"
										type = "string"
										name = "note"
										style={{marginTop: "10px"}}
										multiline = {true}
										rows = {2}
										value={props.carts[index].note}
										onChange={handleNote(index)}
									>

									</TextField>
								</div>
							</div>
							
	
						</React.Fragment>
						
					))
				}
				
				
				
				</div>
				<div className="summary-container">
					<div className="summary">
						<div className="summary-label">Total Harga</div>
						<div className="summary-price">Rp {new Intl.NumberFormat('IDR').format(props.total)}</div>
					</div>
					
					<div className="customer">
						<TextField 
							label="Nama" 
							fullWidth
							style={{marginBottom:"0.5rem",marginTop: "1rem"}}
							value={props.customer.name}
							name="name"
							onChange={handleCustomer}
						/>
						<TextField 
							label="No Handphone" 
							fullWidth 
							style={{marginBottom:"1rem"}}
							value={props.customer.msisdn}
							name="msisdn"
							onChange={handleCustomer}
						/>
						{/* <TextField 
							label="Voucher" 
							fullWidth 
							style={{marginBottom:"1rem"}}
							value={customer.voucher}
							name="voucher"
							onChange={handleCustomer}
						/> */}
						<Button variant="contained" 
							fullWidth 
							onClick={handleVoucherBtn}
							style={{marginTop:"2rem"}}
							disabled={props.vouchers.length===0}
						>
							Voucher
						</Button>

						<TextField 
							label="Voucher" 
							fullWidth 
							style={{marginTop:"1rem",marginBottom:"1rem"}}
							value={props.voucher_selected}
							name="msisdn"
							onChange={handleVoucher}
						/>

						
						
						{/* <FormControl variant="standard" fullWidth style={{marginBottom:"1rem"}}>
							<InputLabel id="demo-simple-select-standard-label">Voucher</InputLabel>
							<Select
								label="Voucher"
								value={props.voucher_selected}
								onChange={handleVoucher}
								style={{fontSize:".8rem"}}
								fullWidth
							>
								<MenuItem 
											value={``}
											style={{fontSize:".8rem"}}
										>{``}</MenuItem>
								{
									props.vouchers.map((data,index)=>(

										<MenuItem 
											key={index} 
											value={data?.voucher_code}
											style={{fontSize:".8rem"}}
										>
											<div className='voucher-title'>{data?.voucher_name}</div>
											
										</MenuItem>
									))
								}

							</Select>
						</FormControl> */}

						<FormControl variant="standard" fullWidth style={{marginBottom:"1rem"}}>
							<InputLabel id="demo-simple-select-standard-label">Metode Pembayaran</InputLabel>
							<Select
								label="Metode pembayaran"
								value={props.ms_payment_selected}
								onChange={handleMSPayment}
								style={{fontSize:".8rem"}}
								fullWidth
							>
								{
									props.ms_payment.map((data,index)=>(
										<MenuItem 
											key={index} 
											value={data?.ms_payment_id}
											style={{fontSize:".8rem"}}
										>{data?.ms_payment_name}</MenuItem>
									))
								}

							</Select>
						</FormControl>

						<FormControl variant="standard" fullWidth style={{marginBottom:"1rem"}}>
							<InputLabel id="demo-simple-select-standard-label">Metode Pengiriman</InputLabel>
							<Select
								label="Metode pengiriman"
								value={props.ms_delivery_selected}
								onChange={handleMSDelivery}
								style={{fontSize:".8rem"}}
								fullWidth
							>
								{
									props.ms_delivery.map((data,index)=>(
										<MenuItem 
											key={index} 
											value={data?.ms_delivery_id}
											style={{fontSize:".8rem"}}
										>{data?.ms_delivery_name}</MenuItem>
									))
								}

							</Select>
						</FormControl>
						
						<FormControl style={{marginBottom:"1rem"}}>
							<Button 
								onClick={handleClickDate}
								variant="contained"
								disabled={delivery_date.isOpen}
							>
								Rencana Pengambilan
							</Button>
							{props.date_pickup}
						</FormControl>
						

						
						<DatePicker
							showCaption={true}
							value={delivery_date.time}
							dateConfig={dateConfig}
							isOpen={delivery_date.isOpen}
							onSelect={handleSelectPicker}
							onCancel={handleCancelPicker} 
							confirmText={'Ok'}
							cancelText = {'Batal'}

						/>

						
					</div>
					
					
					<Button variant="contained" 
						fullWidth 
						onClick={handlePay}
						disabled={!sk}
					>
						CHECKOUT
					</Button>
					
					
					<FormGroup>
						<FormControlLabel control={<Checkbox  checked={sk} onClick={handleSK} disabled={props.delivery_date.isOpen} />} label="Saya setuju" />
					</FormGroup>
				</div>

				
			</React.Fragment>



    )
}
    