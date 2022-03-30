export function storeOpen(store_operation_time_information){
	console.log('store_operation_time_information',store_operation_time_information)
	if(!store_operation_time_information){
		return {
			status : "open",
			start_time: "00:00",
			end_time: "24:00"

		}
	}
	const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	const d = new Date();
	let day = weekday[d.getDay()];
	let today = store_operation_time_information.find(e => e.weekday == day)
	console.log('today',today)
	return today

}