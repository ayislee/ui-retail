import React, {useEffect,useState,useContext} from 'react';
import {useParams,Link} from 'react-router-dom'
import ImageGallery from 'react-image-gallery';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import AppsIcon from '@mui/icons-material/Apps';

import {RetailData,InitCart,UpdateCart,ClearCart,InitMenu} from '../components/LocalStorage'
import axios from 'axios'
import {Api} from '../components/Api'
import {ApiReq} from '../components/ApiServer'
import { MainContext } from "../App";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';




const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function Menu() {
	const { state, dispatch } = useContext(MainContext);
	const {companySlack,outletSlack} = useParams()
	const [value, setValue] = React.useState(0);

	const [menu,setMenu] = useState([])
	const [store,setStore] = useState(null)
	const [categories,setCategory] = useState([])
	const [products,setProduct] = useState([])
	const [dataMenu,setDataMenu] = useState()
	const [openAlert,setOpenAlert] = useState(false)
	const [openCategories, setOpenCategories] = useState(false);

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
		const response = await ApiReq(params)
		if(response.success){
			setMenu(response.data.menu)
			setDataMenu(InitMenu(response.data))
			// console.log('response',response.data)
			dispatch({
				type: "PROFILE",
				payload: {
					logo: response.data.store.store_logo,
					company: response.data.store.company.company_name,
					store: response.data.store.store_name,
					address: response.data.store.store_address	
				},
			});

			dispatch({
				type: "TITLE",
				payload: {
					title: "Daftar Menu"
				}
			});
			
		}
		
	}

	useEffect(()=>{
		reloadContent()
	},[])

	useEffect(()=>{
		// console.log('dataMenu',dataMenu)
	},[dataMenu])

	useEffect(()=>{
		// console.log('menu',menu)
		setCategory(Object.keys(menu))
	},[menu])

	useEffect(() => {
		console.log('categories',categories)
		if(categories.length > 0 ){
			setProduct(menu[categories[value]])
		}
		
	},[categories])

	useEffect(() => {
		// console.log('value',value)
		// setProduct(menu[categories[value]])
		if(categories.length > 0 ){
			setProduct(menu[categories[value]])
		}
		
	},[value])

	useEffect(() => {
		// console.log('product',products)
	},[products])

	const handleAddCart = (p) => {
		var lastCart = InitCart()
		// console.log('lastCart1',lastCart)
		const indexItem = lastCart.findIndex(x => x.item_id == p.item_id)
		if(indexItem>=0){
			lastCart[indexItem].quantity++
		}else{
			p.quantity = 1
			p.note = ""
			lastCart.push(p)
		}

		lastCart = UpdateCart(lastCart)

		// console.log('lastCart2',lastCart)

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

	const handleOpenCategories = () => {
		setOpenCategories(true)
	}

	const handleCloseCategories = () => {
		setOpenCategories(false)
	}

	const handleSelectCategory = (value) => {
		console.log('category',value)
		setValue(value);
		setOpenCategories(false)
	}
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
							<div className="item-product">
								<div className="product-name">{product.item_name}</div>
								<div className="price">
									<div className="item-price">Rp. {new Intl.NumberFormat('IDR').format(product.discount_price?product.discount_price:product.regular_price)}</div>
									{product.discount_price?(
									<div className="item-price-discount">Rp. {new Intl.NumberFormat('IDR').format(product.regular_price)}</div>
									):""}
								</div>
								{/* <div className="item-stock">Jumlah stok: {product.menu_current_quantity}</div> */}
								<Button 
									variant="contained" 
									size="small" 
									startIcon={<AddShoppingCartIcon />}
									// fullWidth
									sx={{marginBottom:"10px !important"}}
									onClick={() =>handleAddCart(product)}
									disabled={product.menu_current_quantity==0}
								>
									Masuk Keranjang
								</Button>
								
							</div>
							<Link to={`/product/${product.menu_slug}`}>
								<img src={product.item_image[0]} alt="" />
							</Link>
								
								
								
								
								{/* <Button 
									variant="outlined" 
									size="small" 
									startIcon={<ShoppingCartCheckoutIcon />}
									fullWidth
								>
									Beli langsung
								</Button> */}
							
						</div>
					))
				}
			</div>

			<Button 
				variant="contained"
				style={{
					position: "fixed",
					bottom: 20,
  					right: 20,
					borderRadius: "50%",
					paddingTop: "20px",
					paddingBottom: "20px",
					backgroundColor: "red"

				}}
				onClick={handleOpenCategories}
			>
				<AppsIcon/>
			</Button>
			

			<Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					Produk telah dimasukan ke keranjang
				</Alert>
			</Snackbar>

			<Dialog
				// fullScreen
				open={openCategories}
				onClose={handleCloseCategories}
				TransitionComponent={Transition}
				fullWidth
      		>
				<AppBar sx={{ position: 'relative' }}>
          			<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleCloseCategories}
							aria-label="close"
						>
              				<CloseIcon />
            			</IconButton>
            			<Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              				Kategori 
            			</Typography>
            			
          			</Toolbar>
        		</AppBar>

				<List>
					{categories.map((category,index)=>(
						<React.Fragment key={index}>

						
							<ListItem button>
								<ListItemText primary={category} onClick={()=>handleSelectCategory(index)}/>
							</ListItem>
							<Divider />
						  </React.Fragment>
					))}
          			
          			
          			
        		</List>
				  
			</Dialog>

		</Box>
	)
}
