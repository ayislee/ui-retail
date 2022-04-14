import React, { useState,useEffect, useReducer, createContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Router from './components/Router'
import {Menus as listItems} from './components/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LiquorIcon from '@mui/icons-material/Liquor';
import Badge from '@mui/material/Badge';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import {storeOpen} from './components/Libraries'
import {RetailData,InitAds} from './components/LocalStorage';
import {Api} from './components/Api';
import {ApiReq} from './components/ApiServer'

import Banner from './components/Banner'


import { 
	Button, 
	AppBar,
	Toolbar,
	Avatar,
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	CssBaseline,
	Drawer,
	Typography 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
	Apps,
	Menu,
	ContactMail,
	AssignmentInd,
	Home 
} from "@mui/icons-material";

import {InitCart,GetBadge} from './components/LocalStorage'

import "./App.css";


export const MainContext = createContext();

const initialState = {
	badge: GetBadge(),
	outlet_slack: '',
	banner: []
};  



const reducer = (state, action) => {
	switch (action.type) {
		case "COMPANY":
			return {
				...state,
				company: action.company_slack,
				outlet: action.outlet_slack
			};

		case "LOGOUT":
			return {
				...state,
				isAuth: false,
				authUser: null,
			};
		case "BADGE":
			var cbadge = 0
			for (const iterator of action.payload) {
				cbadge = parseInt(cbadge) + parseInt(iterator.quantity)
			}
			return {
				...state,
				badge: cbadge,
			};
		case "PROFILE":
			// console.log(action)
			
			return {
				...state,
				profile: {
					logo: action.payload.logo,
					company: action.payload.company,
					store: action.payload.store,
					address: action.payload.address,
					store_operation_time_information: action.payload.store_operation_time_information
				}
								
			}
		case "TITLE":
			return {
				...state,
				title: action.payload.title
			}
		case "BANNER":
			return {
				...state,
				banner: action.payload.banner
				
			}
		case "SHOW BANNER": 
			return {
				...state,
				show_banner: action.payload.show_banner
			}
		default:
			return state;
	}
};


const useStyles = makeStyles((theme) => ({
	toolbarContainer: {
		background: "#702323",
	},
	menuSliderContainer: {
		width: 250,
		background: "#702323",
		height: "100%"
	},
	avatar: {
		margin: "0.5rem auto",
		padding: "1rem",
		width: "15% !important",
		height: "15% !important",
	},
	listItem: {
		color: "black"
	}
}));



export default function App() {
	// const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [title,setTitle] = useState('HOME')
	const [cart,setCart] = useState(InitCart())
	const [badge,setBudge] = useState(0)
	const [hideOnScroll, setHideOnScroll] = useState(true)
	const [profile,setProfile] = useState({
		logo: "",
		company: "",
		store: "",
		address: ""
	})

	const [retail_data,set_retail_data] = useState(RetailData())
	

   
	
	const [state, dispatch] = useReducer(reducer, initialState);



	const toggleSlider = () => {
		setOpen(!open);
	}

	useScrollPosition(
		({ prevPos, currPos }) => {
			// console.log('currPos.y',currPos.y)
		  const isShow = currPos.y < -66
		  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
		},
		[hideOnScroll],
		false,
		false,
		500
	)

	useEffect(()=>{
		// console.log('hideScroll',hideOnScroll)
		
	},[hideOnScroll])
	
	const reloadAds = async () => {
		const params2 = {
			url: Api.ADS.url.replace(":store_slug",retail_data.outlet),
			method: Api.ADS.method,
			reqBody: retail_data
		}

		const response2 = await ApiReq(params2)
		if(response2.success){
			dispatch({
				type: "BANNER",
				payload : {
					banner: response2.data
				}
			})
		}
	}

	useEffect(() => {
		// console.log('cart',cart)
		// console.log('state.badge',state.badge)
		// console.log('reatail_data9999', retail_data)
		dispatch({
			type: "PROFILE",
			payload: {
				logo: retail_data.outlet_logo,
				company: retail_data.company_name,
				store: retail_data.outlet_name,
				address: retail_data.outlet_address,	
				store_operation_time_information: retail_data?.store_operation_time_information
			},
		});

		dispatch({
			type: "TITLE",
			payload: {
				title: "BERANDA"
			}
		});

		

		reloadAds()

	}, [])

	useEffect(() => {
		// console.log('state',state)	
	}, [state])

	
	const handleSideItem = (title) => {
		setOpen(false)
		setTitle(title)
	}
	const sideList = () => (
		<Box component="div">
			<Avatar
				className={classes.avatar}
				src="https://i.ibb.co/rx5DFbs/avatar.png"
				alt="Juaneme8"
			/>
			<Divider />
			<List>
				{
					listItems.map((listItem, index) => (
						<Link key={index} to={listItem.link}  onClick={()=>handleSideItem(listItem.listText)} style={{ textDecoration: 'none',color:"grey" }}>
							<ListItem className={classes.listItem} button key={index}>
								<ListItemIcon className={classes.listItem}>
									{listItem.listIcon}
								</ListItemIcon>
								<ListItemText primary={listItem.listText} />
							</ListItem>
						</Link>
					))
				}
			</List>

		</Box>
	)

	const classes = useStyles();

	return (
		<div>
			<MainContext.Provider
				value={{
					state,
					dispatch,
				}}
			>
				<CssBaseline />
				<Box component="nav" style={{position: "relative !important"}}>
					<AppBar position='static'>
						<Toolbar className={classes.toolbarContainer}>
							<IconButton onClick={toggleSlider}>
								<Menu />
							</IconButton>
							<Typography component="div" sx={{ flexGrow: 1 }}>{state?.title?.toUpperCase()}  </Typography>

							<div>
								{
								state.badge>0?(
										<Link to={"/cart"} style={{ textDecoration: 'none',color:"white" }}>
										<IconButton
											size="large"
											aria-label="account of current user"
											aria-controls="menu-appbar"
											aria-haspopup="true"
											color="inherit"
											sx={{ mr: 2 }}
										>
											<Badge badgeContent={state.badge} color="primary">
												<ShoppingCartIcon />
											</Badge>
											
										</IconButton>
										</Link>
									
								):(
									<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										color="inherit"
										sx={{ mr: 2 }}
									>
								
										<ShoppingCartIcon />
									</IconButton>
									)
								}
								
							</div>
						</Toolbar>
					</AppBar>
					
					<div className="store-profile-container">
						<div className="profile-logo">
							<img src={state?.profile?.logo} alt={state?.profile?.logo}/>
						</div>
						<div className="profile-name-container">
							<div className="profile-company">{state?.profile?.store}</div>
							<div className="profile-address">{state?.profile?.address}</div>
							<div className="profile-address">buka: {storeOpen(state?.profile?.store_operation_time_information)?.start_time} - {storeOpen(state?.profile?.store_operation_time_information)?.end_time}</div>
						</div>
					
					</div>
					
					{state?.show_banner?(
						<Banner
							dots={false}
							infinite={true}
							speed={500}
							slidesToShow ={1}
							slidesToScroll={1}
							data={state?.banner}
						/>
					):(``)}
					
					<Drawer open={open} anchor="right" variant="persistent" onClose={toggleSlider} >
						{sideList()}
					</Drawer>
				</Box>
				<Box>
					<Router/>
				</Box>


			</MainContext.Provider>
			
				
		</div>
	);
}
			
