let state ={
    accountNum:'',
	isAlert:0, // 是否弹出公告 0 未弹出过 1 弹出 2 弹出过
	configObj:[], // 配置列表
    datas:{

    },
	walletAddress:"", // 钱包地址
	balance:"", // 钱包余额
	bigNumber:'', // 大数字
	usdtBalanceString:"", // ustd余额
	web3:null,
	// symbol:'EOS/USDT',
	// renew:'0',
	// pair:'',
	// id:'1',
	// priceScale:100000000,


}
export default state



// WEBPACK FOOTER //
// ./src/store/state.js