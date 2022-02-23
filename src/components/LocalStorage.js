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
	const data = ls.get("cart_data")
	if(!data){
		const cart = []
	}

}