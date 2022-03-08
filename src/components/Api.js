export const Api = {
	STORE: {
		url : 'store/slug/:store_slug/menu',
		method: 'get'
	},
	COMPANY: {
		url: '/company/slug/:company_slug/store',
		method: 'get'
	},
	TRX: {
		url: '/transaction/retail',
		method: 'post'
	},
	HISTORY: {
		url: '/transaction/msisdn/:customer_msisdn',
		method: 'get'
	},
	HISTORY_DETAIL: {
		url: "/transaction/number/:transaction_number",
		method: 'get'
	},
	MS_PAYMENT: {
		url: '/list/ms_payment?eligible_for_topup_balance=true&order_by=ms_payment_id&sort_by=asc',
		method: "get"
	},
	MS_DELIVERY: {
		url: "/list/ms_delivery",
		method: "get"
	},
	VOUCHER: {
		url: "/company/:company_id/voucher/eligible",
		method: "get"
	}

	


}