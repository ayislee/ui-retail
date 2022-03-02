import SecureLS from 'secure-ls'
var ls = new SecureLS({ encodingType: 'aes' })

export function RetailData() {
	// const saved = localStorage.getItem("authUser");
	const saved = ls.get("retail_data")
	
	if(saved){
		
	}else{
		const retail_data = {
			company: '',
			outlet: ''
		}
		ls.set("retail_data", JSON.stringify(retail_data));
		saved = ls.get("retail_data")
	}
	const storage = JSON.parse(saved);



	return storage
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

