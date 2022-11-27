import { ethers,BigNumber } from "ethers";
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { abi } from "../lib/abi"
export default {
    // 链接钱包
    onConnectWallert({ commit }) {
        if (typeof ethereum === 'undefined') {
            console.log('MetaMask is uninstall!');
            return
        }
        ethereum.request({ method: 'eth_requestAccounts' })
            .then((res) => {
                console.log('res==', res);
                commit("setWalletAddress", res[0])
            }).catch((err) => {
                console.log('err==', err);
            })
    },
    // 获取钱包余额
    async getBalance({ commit, state }) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const balance = await provider.getBalance(state.walletAddress)
        const balanceString = formatUnits(balance)
        const balanceBigNumber = parseUnits(balanceString)
        console.log(balance, balanceString, balanceBigNumber);
        commit('setBalance', balanceString)
        commit('setBalance', balanceBigNumber)
    },
    // 添加代币
    onAddCoin({state}) {
        ethereum
            .request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: state.walletAddress,
                        symbol: 'USDT',
                        decimals: 18,
                        image: 'https://assets-cdn.trustwallet.com/blockchains/smartchain/assets/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/logo.png',
                    },
                },
            })
            .then((success) => {
                if (success) {
                    console.log('CAKE successfully added to wallet!');
                } else {
                    throw new Error('Something went wrong.');
                }
            })
            .catch(console.error);
    },
    // 获取钱包内的余额(USDT)
    async getABIContract({ commit, state }) {
        // 合约地址   合约  provider or signer
        // 如果是视图(View)方法，只是进行数据的读取，传入Provider就可以
        // 如果需要更改合约状态，需要用户签名，则需要传入Signer。

        // usdt bsc的地址    ERC20_ABI
        const provider = new ethers.providers.Web3Provider(ethereum)
        const usdtContract = new ethers.Contract(state.walletAddress, abi, provider);
        const usdtBalance = await usdtContract.balanceOf(state.walletAddress)
        const usdtBalanceString = formatUnits(usdtBalance)
        console.log('usdtBalanceString==', usdtBalanceString);
        commit("setUsdtBalance", usdtBalanceString)
    },
    // 授权，合约可对币操作数量
    async onApprove({ state }) {
        // 币对合约进行授权，设置合约可以操作币的数量
        const provider = new ethers.providers.Web3Provider(ethereum)
        console.log(provider);
        const usdtContract = new ethers.Contract("0x55d398326f99059ff775485246999027b3197955", abi, provider.getSigner());
        console.log(usdtContract);
        const usdtBalance = await usdtContract.balanceOf(state.walletAddress)
        console.log(usdtBalance);
        // 合约地址  币的数量（BigNumber）
        usdtContract.approve(
            '0x365244D535Eb6CE3d845b242160B688BfD97590e',
            usdtBalance.from(1).then((res) => {
                console.log('res==', res);
            })
        )
    },
    // 调用合约方法
    async contract() {
        const heroBoxContract = new ethers.Contract('0x532A51643A057A307983aA90282F30c1490f14cC', HeroBox_ABI, provider);
        await heroBoxContract.abc()
    }
}
