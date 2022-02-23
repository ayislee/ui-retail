import React, {useEffect} from 'react';
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




const categories = [
	{
		category_id: "1",
		category: "Europan Bread"
	},
	{
		category_id: "2",
		category: "Sweet Bread"
	},
	{
		category_id: "3",
		category: "Cookies & Cake"
	},{
		category_id: "1",
		category: "Baverages"
	}
]
const products = [
	{
		product_id:1,
		product: 'product satu',
		desc: "Keterangan produk",
		regular_price: 20000,
        discount_price: 10000,
		product_images: [
			{
			  	path: 'https://picsum.photos/id/1018/1000/600/',
			  
			},
			{
				path: 'https://picsum.photos/id/1015/1000/600/',
			},
			{
				path: 'https://picsum.photos/id/1019/1000/600/',
			},
		]
	},
	{
		product_id:2,
		product: 'product dua',
		desc: "Keterangan produk",
		regular_price: 15000,
        discount_price: null,
		product_images: [
			{
			  	path: 'https://picsum.photos/id/1018/1000/600/',
			  
			},
			{
				path: 'https://picsum.photos/id/1015/1000/600/',
			},
			{
				path: 'https://picsum.photos/id/1019/1000/600/',
			},
		]
	},
	{
		product_id:2,
		product: 'product dua',
		desc: "Keterangan produk",
		regular_price: 15000,
        discount_price: null,
		product_images: [
			{
			  	path: 'https://picsum.photos/id/1018/1000/600/',
			  
			},
			{
				path: 'https://picsum.photos/id/1015/1000/600/',
			},
			{
				path: 'https://picsum.photos/id/1019/1000/600/',
			},
		]
	},
	{
		product_id:2,
		product: 'product dua',
		desc: "Keterangan produk",
		regular_price: 15000,
        discount_price: null,
		product_images: [
			{
			  	path: 'https://picsum.photos/id/1018/1000/600/',
			  
			},
			{
				path: 'https://picsum.photos/id/1015/1000/600/',
			},
			{
				path: 'https://picsum.photos/id/1019/1000/600/',
			},
		]
	}
]
export default function Menu() {
	const {companySlack,outletSlack} = useParams()
	const [value, setValue] = React.useState(0);

  	const handleChange = (event, newValue) => {
    	setValue(newValue);
  	};
	const retail_data = RetailData()
	console.log('test',retail_data.outlet)
	
	console.log(products.find(x=>x.product_id===1))
	const handleTab = (text) => {
		console.log('tab click',text)
	}

	useEffect(async ()=>{

		const params = {
			url: Api.STORE.url.replace(":store_slug",retail_data.outlet),
			method: Api.STORE.method,
			reqBody: retail_data
		}
		console.log('retail_data.outlet',retail_data.outlet)
		console.log('params.url',params.url)
		const response = await ApiReq(params)
		console.log(response)
	},[])

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
						<Tab label={category.category} key={index} onClick={()=>handleTab(category.category)}/>
					))
				}
				
			</Tabs>
			<div className="container-2-column">
			
				{
					products.map((product,index)=>(
						<div className="item" key={index}>
							<img src={product.product_images[0].path} alt="" />
							<div className="item-product">{product.product}</div>
							<div className="item-outlet">{retail_data.outlet}</div>
							<div className="item-desc">{product.desc}</div>
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
