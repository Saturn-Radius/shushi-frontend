import React, { useEffect, useMemo, useState } from "react";
import { ethers } from "ethers";
import { getUniswapFactoryContract, getUniswapPairContract } from "../assets/utils/contract";
import { getPosition } from "../assets/utils/normal";
import TokenDetails from "@components/TokenDetails";
import useUniswapfactory from "../hooks/useUniswapfactory";
import useERC20 from "../hooks/useERC20";
import { UserContext } from "../pages/_app";
import { NULLADDRESS } from "../assets/data/data";

const TokenPairInput: React.FC = () => {
    const { account } = React.useContext(UserContext);
    const [searchResult, setSearchResult] = useState<boolean>(true);
    const [firstToken, setFirstToken] = useState<string>('0x14DE93fc5E76B790DcbFcBc3b119A2D8FA568949');
    const [secondToken, setSecondToken] = useState<string>('0xE380f84A80b167CB61b4B5573FF7953b7F91797F');
    const { pairTokenAddress, getPair, loading, createPair } = useUniswapfactory(firstToken, secondToken);
    // ******* chcek the pair with two selected tokens exist in Uniswap
    console.log(pairTokenAddress);
    const isValidAddress = (val: String) => {
        return val == '' || ethers.utils.isAddress(val.toLowerCase())
    }

    const isValidTokenOne = useMemo(() => {
        return isValidAddress(firstToken)
    }, [firstToken])

    const isValidTokenTwo = useMemo(() => {
        return isValidAddress(secondToken)
    }, [secondToken])


    return (
        <div id="position-container" className="p-10">
            <div className="font-bold text-2xl">First Token Address</div>
            <input value={firstToken} type='text' onChange={(e) => setFirstToken(e.target.value)} className="outline-0 border-2 border-slate-400 mt-2.5 h-10 p-2.5 rounded-xl w-1/2"></input>
            {isValidTokenOne &&
                <TokenDetails tokenAddress={firstToken} />
            }
            {
                !isValidTokenOne && <span style={{ color: 'red' }}>In Valid Token address</span>
            }
            <div className="font-bold text-2xl mt-5">Second Token Address</div>
            <input value={secondToken} type='text' onChange={(e) => setSecondToken(e.target.value)} className="outline-0 border-2 border-slate-400 mt-2.5 h-10 p-2.5 rounded-xl w-1/2"></input>
            {isValidTokenTwo &&
                <TokenDetails tokenAddress={secondToken} />
            }
            {
                !isValidTokenTwo && <span style={{ color: 'red' }}>In Valid Token address</span>
            }
            <div className="flex">
                <button disabled={loading || secondToken == '' || firstToken == '' || !isValidTokenOne || !isValidTokenTwo} className="flex justify-center items-center w-36 h-10 text-base text-white rounded-2xl bg-slate-500 cursor-pointer mt-10 mr-10 disabled:bg-slate-300" onClick={() => { getPair() }}>Submit</button>
                {
                    pairTokenAddress == NULLADDRESS &&
                    <button disabled={loading} className="flex justify-center items-center w-36 h-10 text-base text-white rounded-2xl bg-slate-500 cursor-pointer mt-10 disabled:bg-slate-300" onClick={() => createPair()}>
                        Create Pair
                    </button>
                }
            </div>
            <h1 className="mt-4">Position</h1>
            {
                pairTokenAddress !== NULLADDRESS &&
                <TokenDetails tokenAddress={pairTokenAddress} account={account} />
            }
            {
                pairTokenAddress === NULLADDRESS && <div id="description-result" className="text-xl mt-5">There Pairs of two tokens does not exist in Uniswap.<br />You should create a pair via above button</div>
            }
            {
                pairTokenAddress !== NULLADDRESS &&
                <TokenDetails tokenAddress={pairTokenAddress} account={account} />
            }
        </div >
    )
}

export default TokenPairInput;