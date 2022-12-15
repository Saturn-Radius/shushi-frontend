import { BigNumber } from "ethers";
import { useState, useCallback } from "react";
import { getERC20Contract, getUniswapFactoryContract, getSigner } from "../assets/utils/contract";

export default function useUniswapfactory(token0: string, token1: string) {
    const [pairTokenAddress, setPairTokenAddress] = useState<string>("");
    const [loading, setloading] = useState<Boolean>(false);
    const getPair = useCallback(async () => {
        setloading(true)
        try {
            const uniswapContract = getUniswapFactoryContract();
            setPairTokenAddress(await uniswapContract.getPair(token0, token1));
        } catch (error) {
            console.log(error);
        }
        setloading(false)
    }, [token0, token1])

    const createPair = useCallback(async () => {
        setloading(true)
        try {
            const uniswapContract = getUniswapFactoryContract();
            const signer = await getSigner();
            let tx = await uniswapContract.connect(signer).createPair(token0, token1)
            tx = await tx.wait();
            // 0x000000000000000000000000ddc82b365318a20b2096b36166138f747537005b 
            const pairContractAddress = `0x${tx.logs[0].data.substr(0, 66).substr(-40)}`
            setPairTokenAddress(pairContractAddress);
        } catch (error) {
            console.log(error);
        }
        setloading(false)
    }, [token0, token1])
    return { pairTokenAddress, getPair, loading, createPair };
}