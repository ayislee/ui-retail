import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Router from './components/Router'
import {Menus as listItems} from './components/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LiquorIcon from '@mui/icons-material/Liquor';
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

import "./App.css";


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
	
	const toggleSlider = () => {
		setOpen(!open);
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
						<Link to={listItem.link}  onClick={()=>{setOpen(false)}} style={{ textDecoration: 'none',color:"grey" }}>
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
			<CssBaseline />
			<Box component="nav" style={{position: "relative !important"}}>
				<AppBar position="static">
					<Toolbar className={classes.toolbarContainer}>
						<IconButton onClick={toggleSlider}>
							<Menu />
						</IconButton>
						<Typography component="div" sx={{ flexGrow: 1 }}>Menu</Typography>
						<div>
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
						</div>
					</Toolbar>
				</AppBar>
				
				<Drawer open={open} anchor="right" variant="persistent" onClose={toggleSlider} >
					{sideList()}
				</Drawer>
			</Box>
			<Box>
				<Router/>
			</Box>
				
		</div>
	);
}
			
