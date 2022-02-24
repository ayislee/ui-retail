import React, {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'
import ImageGallery from 'react-image-gallery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';

import {RetailData} from '../components/LocalStorage'
import axios from 'axios'
import {Api} from '../components/Api'
import {ApiReq} from '../components/ApiServer'






export default function Menu() {
	const {companySlack,outletSlack} = useParams()
	const [value, setValue] = React.useState(0);

	const [menu,setMenu] = useState([])
	const [store,setStore] = useState(null)
	const [categories,setCategory] = useState([])
	const [products,setProduct] = useState([])

  	const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};
	const retail_data = RetailData()
	
	const handleTab = (text) => {

	}


	const reloadContent = async () => {
		const params = {
			url: Api.STORE.url.replace(":store_slug",retail_data.outlet),
			method: Api.STORE.method,
			reqBody: retail_data
		}
		// console.log('retail_data.outlet',retail_data.outlet)
		// console.log('params.url',params.url)
		const response = await ApiReq(params)
		if(response.success){
			setMenu(response.data.menu)
			
		}
	}

	useEffect(()=>{
		reloadContent()
		
	},[])

	useEffect(()=>{
		console.log('menu',menu)
		setCategory(Object.keys(menu))
	},[menu])

	useEffect(() => {
		console.log('categories',categories)
		if(categories.length > 0 ){
			setProduct(menu[categories[value]])
		}
		
	},[categories])

	useEffect(() => {
		console.log('value',value)
		// setProduct(menu[categories[value]])
		if(categories.length > 0 ){
			setProduct(menu[categories[value]])
		}
		
	},[value])

	useEffect(() => {
		console.log('product',products)
	},[products])

	return (

		<Box sx={{ bgcolor: 'background.paper' }}>
			
			<div>{outletSlack}</div>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
				{
					categories.map((category,index)=>(
						<Tab label={category} key={index} onClick={()=>handleTab(category)}/>
					))
				}
				
			</Tabs>
			<div className="container-2-column">
			
				{
					products.map((product,index)=>(
						<div className="item" key={index}>
							<img src={product.item_image[0]} alt="" />
							<div className="item-product">{product.item_name}</div>
							<div className="item-outlet">{retail_data.outlet}</div>
							<div className="item-desc">{product.item_description}</div>
							<div className="price">
								<div className="item-price">Rp. {product.discount_price?product.discount_price:product.regular_price}</div>
								{product.discount_price?(
								<div className="item-price-discount">Rp. {product.regular_price}</div>
								):""}
							</div>
							<Button 
								variant="contained" 
								size="small" 
								startIcon={<AddShoppingCartIcon />}
								fullWidth
								sx={{marginBottom:"10px !important"}}
							>
								Masuk Keranjang
							</Button>
							<Button 
								variant="outlined" 
								size="small" 
								startIcon={<ShoppingCartCheckoutIcon />}
								fullWidth
							>
								Beli langsung
							</Button>

							
						</div>
					))
				}
			</div>

		</Box>
	)
}
