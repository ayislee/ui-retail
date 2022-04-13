import React, {useState,useEffect,useContext} from 'react'
import {useParams,Link} from 'react-router-dom'
import {Api} from "../components/Api"
import {ApiReq} from '../components/ApiServer'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import {InitMenu,InitCart,UpdateCart,InitRetailData,RetailData} from '../components/LocalStorage'
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { MainContext } from "../App";

export default function Product() {
	const { state, dispatch } = useContext(MainContext);
	const {product_slug} = useParams()
	const [product,set_product] = useState()
	const [product_images,set_product_images] = useState([])
	const [menu,set_menu] = useState(InitMenu())
	const [openAlert,setOpenAlert] = useState(false)
	const [retail_data,set_retail_data] = useState(RetailData())
	
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

				// redifine localstorage
				InitRetailData({
					company_id: response.data.store.company_id,
					company: response.data.store.company.company_slug,
					company_name: response.data.store.company.company_name,
					outlet_id: response.data.store.store_id,
					outlet: response.data.store.store_slug,
					outlet_logo: response.data.store.store_logo,
					outlet_name: response.data.store.store_name,
					outlet_address: response.data.store.store_address,
				})

				set_product_images(img)
				
			}else{
				window.location.href="/menus"
			}
			
			
		}
	}

	useEffect(()=>{
		dispatch({
			type: "TITLE",
			payload: {
				title: "PRODUK"
			}
		});

		dispatch({
			type: "PROFILE",
			payload: {
				logo: retail_data.outlet_logo,
				company: retail_data.company_name,
				store: retail_data.outlet_name,
				address: retail_data.outlet_address	
			},
		})
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

		setOpenAlert(true);
	}

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenAlert(false);
	};

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

					<div className="item-title">
						{product.item_name}
					</div>
					<div className="label-info">
						
					</div>
					<div className="item-full-desc">
						<div dangerouslySetInnerHTML={{__html: product.item_description}} /> 
					</div>
					<div className="store-container">
						<div className="label-title">Toko</div>
						<div className="item-sub-title">{product.store.store_name}</div>
						<div className="item-full-desc-sub">{product.store.store_address}</div>
						<div className="item-link">
							<a href={`https://www.google.com/maps/search/?api=1&query=${product.store.store_coordinate}`}
							className="btn"
							target="_blank"
						>
								 Location 
							</a>
						</div>
					</div>

					<div className="price">
						<div className="item-price">
							Rp. {new Intl.NumberFormat('IDR').format(product.discount_price?product.discount_price:product.regular_price)}
						</div>
						{product.discount_price?(
									<div className="item-price-discount">Rp. {new Intl.NumberFormat('IDR').format(product.regular_price)}</div>
									):""}
					</div>
						
						
					
					<div className="item-full-desc-sub">Jumlah stok: {product.menu_current_quantity}</div>

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

			<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Produk telah dimasukan ke keranjang
				</Alert>
			</Snackbar>
		</React.Fragment>
	)
}
