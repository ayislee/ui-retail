import {
	Apps,
	Menu,
	ContactMail,
	AssignmentInd,
	Home 
} from "@mui/icons-material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LiquorIcon from '@mui/icons-material/Liquor';

export const Menus = [
	{
		listIcon: <Home />,
		listText: "Home",
		link: '/'
		
	},
	{
		listIcon: <StorefrontIcon />,
		listText: "Outlet",
		link: '/outlet'
		
	},
	{
		listIcon: <LiquorIcon />,
		listText: "Daftar Menu",
		link: '/menus'
	},
	{
		listIcon: <ShoppingCartIcon />,
		listText: "Keranjang",
		link: '/cart'
	},
	{
		listIcon: <ShoppingCartCheckoutIcon />,
		listText: "Bayar",
		link: '/checkout'
	}
];