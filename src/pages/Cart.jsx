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
import DatePicker from 'react-mobile-datepicker';
import CustomCart from '../components/CustomCart'


// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';




export default function Cart() {
	
	const [carts,setCart] = useState(InitCart())
	const [total,setTotal] = useState(0)
	
	
	const [customer, setCustomer] = useState({
		name: "",
		msisdn: "",
		voucher: ""
	})
	const [payment,setPayment] = useState(false)

	const [menu,SetMenu] = useState(InitMenu())
	const [sk,setSk] = useState(false)
	const [token,setToken] = useState(null)
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
	const [delivery_date,set_delivery_date] = useState({
		time: new Date(),
        isOpen: false,
		date_string: ""
	})

	const [date_pickup,set_date_pickup] = useState("")

	const [afterPay,setAfterPay] = useState(false)

	
	useEffect(()=>{
		let m
		let d
		let h
		let mi
		let s
		m = delivery_date.time.getMonth()<10? `0`+ delivery_date.time.getMonth():delivery_date.time.getMonth() 
		d = delivery_date.time.getDate()<10? `0`+ delivery_date.time.getDate():delivery_date.time.getDate()
		h = delivery_date.time.getHours()<10? `0`+ delivery_date.time.getHours():delivery_date.time.getHours()
		mi = delivery_date.time.getMinutes()<10? `0`+ delivery_date.time.getMinutes():delivery_date.time.getMinutes()
		s = delivery_date.time.getSeconds()<10? `0`+ delivery_date.time.getSeconds():delivery_date.time.getSeconds()


		set_date_pickup(`${delivery_date.time.getFullYear()}-${m}-${d} ${h}:${mi}:${s}`)
	},[delivery_date])


	

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
		console.log("date",delivery_date.time)
		// setCart(InitCart())
		if(carts.length == 0){
			window.location.href="/menus"
		}
		reloadData()
		
	},[])

	useEffect(()=>{
		console.log("total",total)
	},[total])

	useEffect(()=>{
		console.log('ms_payment',ms_payment)
	},[ms_payment])
	
	useEffect(()=>{
		calculate()
		
	},[carts])

	useEffect(()=>{
		console.log("menu",menu)
	},[menu])
	
	

	

	

	

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
				delivery_expected_datetime: date_pickup,
				preview_fee: true
			}
		}
		const response = await ApiReq(params)
		console.log('response',response)
		if(response.success){
			console.log('env',process.env.REACT_APP_PAYMENT)
			
			setTrxData(response.data)
			setItemdata(response.data.current_order)
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

	const handleSelectPicker = (value) => {
		set_delivery_date({
			...delivery_date,
			time: value,
			isOpen: false
		})
		console.log('time')
	} 
	
	const handleCancelPicker = () => {
		set_delivery_date({
			...delivery_date,
			
			isOpen: false
		})
	}

	const handleClickDate = () => {
		set_delivery_date({...delivery_date,isOpen:true})
	}

	const handleOnPayment = (token) => {
		console.log(token)
		setToken(token)
		setPayment(false)
		setAfterPay(true)
	}

	const handleSetCart = (value) =>{
		setCart(value)
	}

	const handeSetTotal = (value) => {
		
	}

	const calculate = () => {
		let stotal = 0
		for (const iterator of carts) {
			stotal = stotal + (iterator.discount_price?parseInt(iterator.discount_price):parseInt(iterator.regular_price))*parseInt(iterator.quantity)
		}
		setTotal(stotal)
	}

	const handleGoHistory = () => {
		window.location.href='/history'
	}

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
		
		<React.Fragment>
			{afterPay?(
				<div style={{padding:"1rem"}}>
					<Button 
						fullWidth 
						onClick={handleGoHistory}
						size="large"
						variant="contained"

					>
						Riwayat Pembayaran
					</Button>

					{token && (
						<Midtrans 
							clientKey={process.env.REACT_APP_DATA_CLIENT_KEY} 
							token={token}
							onSuccess={handlePaySuccess}
							onError={handlePayError}
							onPending={handlePayPending}
							onClose={handlePayClose}


						/>
						
					)}
					
				</div>
			):(
				<CustomCart
					carts={carts}
					onSetCart={(value)=>handleSetCart(value)}
					customer={customer}
					onHandleCustomer={(e)=>handleCustomer(e)}
					voucher_selected={voucher_selected}
					vouchers={vouchers}
					OnHandleVoucher={(e)=>handleVoucher(e)}
					ms_payment_selected={ms_payment_selected}
					OnHandleMSPayment={(e)=>handleMSPayment(e)}
					ms_payment={ms_payment}
					ms_delivery_selected = {ms_delivery_selected}
					OnHandleMSDelivery={(e)=>handleMSDelivery(e)}
					ms_delivery = {ms_delivery}
					delivery_date={delivery_date}
					date_pickup={date_pickup}
					OnHandlePay={handlePay}
					total={total}
					OnHandleDeliveryDate={(value)=>set_delivery_date(value)}
					
				/>
			)}

			

			<Payment 
				open={payment}
				data={trxData}
				item_data={itemData}
				store_id={menu.store.store_id}
				ms_payment_id= {ms_payment_selected}
				ms_delivery_id={ms_delivery_selected}
				customer_name={customer.name}
				customer_msisdn={customer.msisdn}
				voucher_code={ voucher_selected}
				ms_payment = {ms_payment.filter(x=>x.ms_payment_id==ms_payment_selected)[0]}
				ms_delivery = {ms_delivery.filter(x=>x.ms_delivery_id==ms_delivery_selected)[0]}
				pickup={menu.store.store_address}
				date_pickup={date_pickup}
				onPayment={(token)=>handleOnPayment(token)}
				
			/>
			
		</React.Fragment>
	)
}
