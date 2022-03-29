import React from 'react'
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import Homepage from "../pages/Homepage"
import Outlet from "../pages/Outlet"
import Menu from "../pages/Menu"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import History from "../pages/History"
import Company from "../components/Company"
import HistoryDetail from "../pages/HistoryDetail"
import TestPage from "../pages/TestPage"


export default function Router() {
	const {id} = useParams()
	
	
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="outlet" element={<Outlet />} />
			<Route path="menus" element={<Menu />} />
			<Route path="product/:product_slug" element={<Product />} />
			<Route path="cart" element={<Cart />} />
			<Route path="history" element={<History />} />
			<Route path="/company/:company_slug/:store_slug" element={<Company />} />
			<Route path="/history-detail/:transaction_number" element={<HistoryDetail />} />
			<Route path="/test-page" element={<TestPage />} />
		</Routes>
	)
}
	
