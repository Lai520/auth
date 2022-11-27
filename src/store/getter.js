
export default {
    getWalletAddress(state){
        return state.walletAddress
    },
    getConfigInfo(state){
        return (key)=>state.configObj.find(item => item.key == key).value
    }
}
