import SecureLS from 'secure-ls'
var ls = new SecureLS({ encodingType: 'aes' })

export function RetailData() {
	// const saved = localStorage.getItem("authUser");
	const saved = ls.get("retail_data")
	
	if(saved){
		
	}else{
		const retail_data = {
			company_id: '',
			company: '',
			company_name: '',
			outlet_id: "",
			outlet: '',
			outlet_logo: '',
			outlet_name: '',
			outlet_address: '',
			store_operation_time_information: []
		}
		ls.set("retail_data", JSON.stringify(retail_data));
		saved = ls.get("retail_data") 
	}
	const storage = JSON.parse(saved);



	return storage
}

export function InitRetailData(data=null) {
	let saved
	if(data !== null){
		ls.set("retail_data", JSON.stringify(data))
		saved = ls.get("retail_data")
		return JSON.parse(saved);
	
	}else{
		const d  = ls.get("retail_data")
		if(d){
			const retail_data = {
				company_id: '',
				company: '',
				company_name: '',
				outlet_id: "",
				outlet: '',
				outlet_logo: '',
				outlet_name: '',
				outlet_address: '',
				store_operation_time_information: []
				
				
			}
			ls.set('retail_data',JSON.stringify(retail_data))
		}
		const saved  = ls.get("retail_data")
		return JSON.parse(saved);
	}
}

export function InitCart() {
	let data = ls.get("cart_data")
	if(!data){
		const cart = []
		ls.set("cart_data", JSON.stringify(cart))
		data = ls.get("cart_data")
	}
	const storage = JSON.parse(data);	

	return storage

}

export function UpdateCart(updateCart) {
	ls.set("cart_data", JSON.stringify(updateCart))
	const data = ls.get("cart_data")
	const storage = JSON.parse(data);	
	return storage
}

export function ClearCart(){
	ls.remove('cart_data')
	
}

export function GetBadge(){
	let data =ls.get("cart_data")
	if(!data){
		const cart = []
		ls.set("cart_data", JSON.stringify(cart))
		data = ls.get("cart_data")
	}else{
		data = JSON.parse(data);
	}
	var cbadge = 0
	for (const iterator of data) {
		cbadge = parseInt(cbadge) + parseInt(iterator.quantity)
	}
	return cbadge
}

export function InitMenu(data=null) {
	let saved
	if(data !== null){
		ls.set("menu_data", JSON.stringify(data))
		saved = ls.get("menu_data")
		return JSON.parse(saved);
	
	}else{
		saved = ls.get("menu_data")
		return JSON.parse(saved);
	}
}

export function InitHistory(data=null) {
	let saved 
	let dt
	let old_data
	// console.log("data",data)
	if(data !== null){
		dt = ls.get("history_data")
		if(!dt){
			// console.log("tidak ada data")
			ls.set("history_data",JSON.stringify([]))
			dt = ls.get("history_data")
		}
		
		old_data = JSON.parse(dt)
		// console.log("old_data",old_data)
		old_data.unshift(data)
		saved = old_data

		
	}else{
		dt = ls.get("history_data")
		if(!dt){
			ls.set("history_data",JSON.stringify([]))
			dt = ls.get("history_data")
		}

		saved = JSON.parse(dt)
	}
	ls.set("history_data",JSON.stringify(saved))
	
	
	return JSON.parse(ls.get("history_data"))

}

export function InitCustomer(data=null) {
	let dt
	if(data !== null){
		ls.set("customer_data",JSON.stringify(data))
		dt = ls.get("customer_data")
	}else{
		const d = ls.get("customer_data")
		if(d){
			dt = d
		}else{
			ls.set("customer_data",JSON.stringify({customer_name:"",customer_msisdn:""}))
			dt = ls.get("customer_data")
		}
	}

	return JSON.parse(dt) 
}

export function InitAds(data=null) {
	let dt
	if(data !== null){
		ls.set("ads",JSON.stringify(data))
		dt = ls.get("ads")
	}else{
		const d = ls.get("ads")
		if(d){
			dt = d
		}else{
			ls.set("ads",[])
			dt = ls.get("ads")
		}
	}
	return JSON.parse(dt)
}

