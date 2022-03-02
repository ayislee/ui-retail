import React from 'react'
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import Homepage from "../pages/Homepage"
import Outlet from "../pages/Outlet"
import Menu from "../pages/Menu"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Company from "../components/Company"


export default function Router() {
	const {id} = useParams()
	
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="outlet" element={<Outlet />} />
			<Route path="menus" element={<Menu />} />
			<Route path="product/:product_slack" element={<Product />} />
			<Route path="cart" element={<Cart />} />
			<Route path="checkout" element={<Checkout />} />
			<Route path="/company/:company_slug/:store_slug" element={<Company />} />
		</Routes>
	)
}
	
