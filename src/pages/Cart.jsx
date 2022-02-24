import React,{useState,useEffect,useContext} from 'react'
import TextField from '@mui/material/TextField';
import {RetailData,InitCart, UpdateCart, ClearCart} from '../components/LocalStorage'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import { MainContext } from "../App";

export default function Cart() {
	const { state, dispatch } = useContext(MainContext);
	const [carts,setCart] = useState([])
	const [total,setTotal] = useState(0)
	useEffect(()=>{
		// ClearCart()
		
		setCart(InitCart())

		
	},[])

	useEffect(()=>{
		console.log('cart**',carts)
		calculate()
	},[carts])

	const handleQuantity = (index) => (event) =>{
		console.log(event.target)
		console.log('index',index)
		console.log('c',carts[index])
		
		if(event.target.value < 0) event.target.value=0
		carts[index].quantity=event.target.value
		console.log('data index',carts)

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
								<div className="c-price">{cart.discount_price?cart.discount_price:cart.regular_price}</div>
								<div className="c-quantity">
									
									<TextField 
										key={index}
										type="number" 
										name="quantity"
										value={carts[index].quantity}
										onChange={handleQuantity(index)}
									/>
									<Button variant="outlined" startIcon={<DeleteForeverIcon onClick={handleDelete(index)}/>}/>
	
								</div>
							</div>
	
						</React.Fragment>
						
					))
				}
				
				
				
			</div>
			<div className="summary">
				<div className="summary-label">Total Harga</div>
				<div className="summary-price">Rp. {total}</div>
			</div>
			<Button variant="contained" fullWidth>LAKUKAN PEMBAYARAN</Button>
		</React.Fragment>
	)
}
