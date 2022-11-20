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
    }
}
export default mutations


// WEBPACK FOOTER //
// ./src/store/mutations.js