import React, {useState,useEffect,useContext} from 'react'
import {useParams} from 'react-router-dom'
import {Api} from "../components/Api"
import {ApiReq} from '../components/ApiServer'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {InitMenu,InitCart,UpdateCart} from '../components/LocalStorage'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { MainContext } from "../App";

export default function Product() {
	const { state, dispatch } = useContext(MainContext);
	const {product_slug} = useParams()
	const [product,set_product] = useState()
	const [product_images,set_product_images] = useState([])
	const [menu,set_menu] = useState(InitMenu())
	
	const reloadData = async () => {
		const params = {
			url: Api.PRODUCT.url.replace(':menu_slug',product_slug),
			method: Api.PRODUCT.method,
		}

		const response = await ApiReq(params)
		if(response.success){
			
			if(response.success){
				console.log('response.data',response.data)
				set_product(response.data)
				let img = []
				for (const i of response.data.item_image) {
					img.push({
						original: i,
						thumbnail: i,
					})
				}

				set_product_images(img)
				
			}else{
				window.location.href="/menus"
			}
			
			
		}
	}

	useEffect(()=>{
		console.log('product_slug',product_slug)
		reloadData()
	},[])

	const handleAddCart = (p) => {
		var lastCart = InitCart()
		console.log('lastCart1',lastCart)
		const indexItem = lastCart.findIndex(x => x.item_id == p.item_id)
		if(indexItem>=0){
			lastCart[indexItem].quantity++
		}else{
			p.quantity = 1
			p.note = ""
			lastCart.push(p)
		}

		lastCart = UpdateCart(lastCart)

		console.log('lastCart2',lastCart)

		dispatch({
			type: "BADGE",
			payload: lastCart,
		});
		
		
		
	}
	return (
		<React.Fragment>
			{product?(
				<div className="product-container">
					<div className="product-image">
						<ImageGallery 
						items={product_images} 
						showThumbnails={false}
						
					/>
					</div>

					<div className="product-title">
						{product.item_name}
					</div>
					<div className="peoduct-sku">
						{product.item_sku}
					</div>
					<div className="product-desc">
						{product.item_description}
					</div>
					<div className="store-container">
						<div className="store-label">Toko</div>
						<div className="store-name">{menu.store.store_name}</div>
						<div className="store-address">{menu.store.store_address}</div>
						
					</div>

					<div className="price">
						<div className="item-price">
							Rp. {new Intl.NumberFormat('IDR').format(product.discount_price?product.discount_price:product.regular_price)}
						</div>
						{product.discount_price?(
									<div className="item-price-discount">Rp. {new Intl.NumberFormat('IDR').format(product.regular_price)}</div>
									):""}
					</div>
						
						
					
					<div className="item-stock">Jumlah stok: {product.menu_current_quantity}</div>

					<Button 
						variant="contained" 
						size="small" 
						startIcon={<AddShoppingCartIcon />}
						fullWidth
						sx={{marginBottom:"10px !important"}}
						onClick={() =>handleAddCart(product)}
						disabled={product.menu_current_quantity==0}
					>
						Masuk Keranjang
					</Button>
				</div>


			):(``)}
		</React.Fragment>
	)
}
