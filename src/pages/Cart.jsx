import React,{useState,useEffect,useContext} from 'react'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {RetailData,InitCart, UpdateCart, ClearCart, InitMenu,InitHistory,InitCustomer} from '../components/LocalStorage'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { MainContext } from "../App";
import {Api} from "../components/Api";
import {ApiReq} from "../components/ApiServer"
import axios from 'axios'
import Payment from '../components/Payment';
import Midtrans from '../components/Midtrans' 
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';



export default function Cart() {
	const { state, dispatch } = useContext(MainContext);
	const [carts,setCart] = useState([])
	const [total,setTotal] = useState(4)
	const [customer, setCustomer] = useState({
		name: "Ayi",
		msisdn: "6287870842543",
		voucher: ""
	})
	const [payment,setPayment] = useState(false)

	const [menu,SetMenu] = useState(InitMenu())
	const [sk,setSk] = useState(false)
	const [token,setToken] = useState('')
	const [trxData,setTrxData] = useState()
	const [itemData,setItemdata] = useState([])

	const [ms_payment,set_ms_payment] = useState([{
		ms_payment_id: 4,
		ms_payment_name: "Virtual Payment / Transfer / Credit Card (Automatic)",
	}])
	const [ms_payment_selected, set_ms_payment_selected] = useState(4)

	const [ms_delivery, set_ms_delivery] = useState([{
		ms_delivery_id: 1,
        ms_delivery_name: "Pickup",
        ms_delivery_identifier: "PICKUP"
	}])

	const [ms_delivery_selected, set_ms_delivery_selected] = useState(1)

	const [vouchers,setVoucher] = useState([])
	const [voucher_selected,set_voucher_selected] = useState('')

	const [checkout,setCheckout] = useState(false)

	const [retail_data,set_retail_data] = useState(RetailData())

	const reloadData = async () => {
		const params = {
			url: Api.MS_PAYMENT.url,
			method: Api.MS_PAYMENT.method,
		}

		const response = await ApiReq(params)
		if(response.success){
			// console.log("ms_payment",response.data)
			const p = ['MIDTRANS','MERCHANT_PAYMENT']
			set_ms_payment(response.data.filter(x=> p?.includes(x.ms_payment_identifier)))
		}

		const dparams = {
			url: Api.MS_DELIVERY.url,
			method: Api.MS_DELIVERY.method,
		}

		const dresponse = await ApiReq(dparams)

		if(dresponse.success){
			const d = ["PICKUP"]
			set_ms_delivery(dresponse.data.filter(x=> d?.includes(x.ms_delivery_identifier)))
		}

		const vparams = {
			url: Api.VOUCHER.url.replace(":company_id",retail_data?.company_id),
			method: Api.VOUCHER.method,
		}

		const vresponse = await ApiReq(vparams)
		if(vresponse.success){
			console.log("voucher",vresponse.data)
			setVoucher(vresponse.data.filter(x=>x.voucher_stock_quantity>0))
		}
			
		
	}

	useEffect(()=>{
		setCart(InitCart())
		reloadData()
	},[])

	useEffect(()=>{
		console.log('ms_payment',ms_payment)
	},[ms_payment])
	useEffect(()=>{
		
		calculate()
	},[carts])

	const handleQuantity = (index) => (event) =>{

		if(event.target.value < 0) event.target.value=0
		if(event.target.value === "" ) event.target.value=0
		carts[index].quantity=event.target.value

		const p1 = UpdateCart(carts)
		calculate()
		setCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const handleDelete = (index) => (event) =>{
		carts.splice(index, 1);
		const p1 = UpdateCart(carts)
		calculate()
		setCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const calculate = () => {
		let stotal = 0
		for (const iterator of carts) {
			stotal = stotal + (iterator.discount_price?parseInt(iterator.discount_price):parseInt(iterator.regular_price))*parseInt(iterator.quantity)
		}
		setTotal(stotal)
	}

	const stepUp = (index) => {
		carts[index].quantity++
		const p1 = UpdateCart(carts)
		calculate()
		setCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const stepDown = (index) => {
		carts[index].quantity--
		if(carts[index].quantity<0) carts[index].quantity = 0
		const p1 = UpdateCart(carts)
		calculate()
		setCart(InitCart())
		dispatch({
			type: "BADGE",
			payload: InitCart(),
		});
	}

	const handlePay = async () => {
		console.log('carts',carts)
		const items = []
		for (const i of carts) {
			items.push({
				item_id: i.item_id,
				item_name: i.item_name,
				quantity: i.quantity,
				note: i.note
			})
		}
		console.log('items',items)

		const params = {
			url: Api.TRX.url,
			method: Api.TRX.method,
			reqBody: {
				store_id: menu.store.store_id,
				ms_payment_id: ms_payment_selected,
				ms_delivery_id: ms_delivery_selected,
				customer_name: customer.name,
				customer_msisdn: customer.msisdn,
				voucher_code: voucher_selected,
				item:items,
				preview_fee: true
			}
		}
		const response = await ApiReq(params)
		console.log('response',response)
		if(response.success){
			console.log('env',process.env.REACT_APP_PAYMENT)
			setToken(response.token)
			setTrxData(response.data)
			setItemdata(response.data.transaction_detail)
			setPayment(true)
			// ClearCart()
			InitCustomer({
				customer_name: customer.name,
				customer_msisdn: customer.msisdn
			})



			
		}

	} 

	useEffect(()=>{
		console.log('itemData',itemData)
	},[itemData])

	useEffect(()=>{
		console.log("customer",customer)
	},[customer])
	const handleNote = (index) => (event) => {
		carts[index].note=event.target.value
		const p1 = UpdateCart(carts)
		setCart(InitCart())
	}

	const handleSK = () => {
		setSk(!sk)
	}

	const handleCustomer = (event) => {
		setCustomer({
			...customer,
			[event.target.name]:event.target.value
		})
	}

	const handleMSPayment = (event) => {
		console.log(event.target.value)
		set_ms_payment_selected(event.target.value)

	}

	const handleMSDelivery = (event) => {
		set_ms_delivery_selected(event.target.value)
	}

	const handleVoucher = (event) => {
		set_voucher_selected(event.target.value)
	}
	return (
		<React.Fragment>
			<div className="cart-container">
				{
					carts.map((cart,index)=>(
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
										value={carts[index].quantity}
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
										value={carts[index].note}
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
					<div className="summary-price">Rp {new Intl.NumberFormat('IDR').format(total)}</div>
				</div>
				
				<div className="customer">
					<TextField 
						label="Nama" 
						fullWidth
						style={{marginBottom:"0.5rem",marginTop: "1rem"}}
						value={customer.name}
						name="name"
						onChange={handleCustomer}
					/>
					<TextField 
						label="No Handphone" 
						fullWidth 
						style={{marginBottom:"1rem"}}
						value={customer.msisdn}
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

					<FormControl variant="standard" fullWidth style={{marginBottom:"1rem"}}>
						<InputLabel id="demo-simple-select-standard-label">Voucher</InputLabel>
						<Select
							label="Voucher"
							value={voucher_selected}
							onChange={handleVoucher}
							style={{fontSize:".8rem"}}
							fullWidth
						>
							<MenuItem 
										value={``}
										style={{fontSize:".8rem"}}
									>{``}</MenuItem>
							{
								vouchers.map((data,index)=>(

									<MenuItem 
										key={index} 
										value={data?.voucher_code}
										style={{fontSize:".8rem"}}
									>{data?.voucher_name}</MenuItem>
								))
							}

						</Select>
					</FormControl>

					<FormControl variant="standard" fullWidth style={{marginBottom:"1rem"}}>
						<InputLabel id="demo-simple-select-standard-label">Metode Pembayaran</InputLabel>
						<Select
							label="Metode pembayaran"
							value={ms_payment_selected}
							onChange={handleMSPayment}
							style={{fontSize:".8rem"}}
							fullWidth
						>
							{
								ms_payment.map((data,index)=>(
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
							value={ms_delivery_selected}
							onChange={handleMSDelivery}
							style={{fontSize:".8rem"}}
							fullWidth
						>
							{
								ms_delivery.map((data,index)=>(
									<MenuItem 
										key={index} 
										value={data?.ms_delivery_id}
										style={{fontSize:".8rem"}}
									>{data?.ms_delivery_name}</MenuItem>
								))
							}

						</Select>
					</FormControl>
					
				</div>
				
				
				<Button variant="contained" 
					fullWidth 
					onClick={handlePay}
					disabled={!sk}
				>
					CHECKOUT
				</Button>
				
				
				<FormGroup>
					<FormControlLabel control={<Checkbox  checked={sk} onClick={handleSK}/>} label="Saya setuju" />
				</FormGroup>
			</div>

			<Payment 
				open={payment}
				token={token}
				data={trxData}
				item_data={itemData}
				store_id={menu.store.store_id}
				ms_payment_id= {ms_payment_selected}
				ms_delivery_id={ms_delivery_selected}
				customer_name={customer.name}
				customer_msisdn={customer.msisdn}
				voucher_code={ voucher_selected}
			/>
			
		</React.Fragment>
	)
}
