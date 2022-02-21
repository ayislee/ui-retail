import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "../pages/Homepage"
import Outlet from "../pages/Outlet"
import Menu from "../pages/Menu"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"


export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="outlet" element={<Outlet />} />
			<Route path="menu/:id" element={<Menu />} />
			<Route path="product/:id" element={<Product />} />
			<Route path="cart" element={<Cart />} />
			<Route path="checkout" element={<Checkout />} />
		</Routes>
	)
}
	
