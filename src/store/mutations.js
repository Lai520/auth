let mutations = {
    setAccountNum(state){
        let accountNum  = window.localStorage.getItem('accountNum')
        this.state.accountNum = accountNum
    },
    setDatas(state,datas){
        this.state.datas = datas;
    },
    setWalletAddress(state,address){
        state.walletAddress = address;
    },
    setWeb3(state,web3){
        state.web3 = web3;
    },
    setBalance(state,balance) {
        state.balance = balance
    },
    setBigNumber(state,bigNumber){
        state.bigNumber = bigNumber
    },
    setUsdtBalance(state,usdtBalanceString){
        state.usdtBalanceString = usdtBalanceString
    },
    setConfigInfo(state,configInfo) {
        state.configObj = configInfo
    }
}
export default mutations


// WEBPACK FOOTER //
// ./src/store/mutations.js