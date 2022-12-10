
export default {
    getWalletAddress(state){
        return state.walletAddress
    },
    getConfigInfo(state){
        return (key)=>state.configObj.find(item => item.key == key).value || 0
    },
    openAlert(state) {
        if(state.isAlert == 1){
            return true
        }else{
            return false
        }
    }
}
