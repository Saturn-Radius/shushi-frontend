import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { NULLADDRESS } from "../assets/data/data";
import { getERC20Contract } from "../assets/utils/contract";
export default function useERC20(tokenAddress: String, account: String) {

    const [tokenDetails, setTokenDetails] = useState({
        name: '',
        symbol: '',
        decimals: 0,
        balance: -1,
        tokenAddress
    });

    useEffect(() => {
        (async function () {
            try {
                if (tokenAddress === '' || tokenAddress === NULLADDRESS) return;
                const erc20 = await getERC20Contract(tokenAddress);
                const symbol = await erc20.symbol();
                const name = await erc20.name();
                const decimals = parseInt((await erc20.decimals()).toString());
                let balance = -1;
                if (account && account != '') {
                    balance = parseInt(ethers.utils.formatUnits(await erc20.balanceOf(account), decimals).toString());
                }
                setTokenDetails({
                    name,
                    symbol,
                    decimals,
                    balance,
                    tokenAddress,
                })

            } catch (error) {
                console.log(error);
            }
        })()
    }, [tokenAddress, account])
    return tokenDetails;
}