import React, { useEffect, useMemo, useState } from "react";
import { BigNumber, ethers } from "ethers";
import { getERC20Contract, getSigner, getSushiRollContract, getUniswapFactoryContract, getUniswapPairContract } from "../assets/utils/contract";
import { getPosition } from "../assets/utils/normal";
import TokenDetails from "@components/TokenDetails";
import useUniswapfactory from "../hooks/useUniswapfactory";
import useERC20 from "../hooks/useERC20";
import { UserContext } from "../pages/_app";
import { NULLADDRESS, UniswapRouterAddress } from "../assets/data/data";

const Migrate: React.FC = () => {
  const { account } = React.useContext(UserContext);
  const [searchResult, setSearchResult] = useState<boolean>(true);
  const [firstToken, setFirstToken] = useState<string>('0x14DE93fc5E76B790DcbFcBc3b119A2D8FA568949');
  const [secondToken, setSecondToken] = useState<string>('0xE380f84A80b167CB61b4B5573FF7953b7F91797F');
  const [amtLpToken, setAmtLPToken] = useState<number>(0);
  const { pairTokenAddress, getPair, loading} = useUniswapfactory(firstToken, secondToken);
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
  }, [secondToken]);


  useEffect(()=>{
    if(pairTokenAddress === '') return;
    migrate();
  }, [pairTokenAddress])

  const migrate = async () => {
    try {
      const pairContract = getERC20Contract(pairTokenAddress);
      const totalSupply = await pairContract.totalSupply();
      const token0 = getERC20Contract(firstToken);
      const token1 = getERC20Contract(secondToken);
      const balance0 = await token0.balanceOf(pairTokenAddress);
      const balance1 = await token1.balanceOf(pairTokenAddress);
      const liquidity = await pairContract.balanceOf(pairTokenAddress);
      const amountAMin = (liquidity.mul(balance0)).div(totalSupply);
      const amountBMin = (liquidity.mul(balance1)).div(totalSupply);
      const sushiRoll = getSushiRollContract();
      const signer = await getSigner();
      let tx = await pairContract.connect(signer).approve(UniswapRouterAddress, ethers.utils.parseEther(amtLpToken.toString()));
      await tx.wait()
      tx = await sushiRoll.connect(signer).migrate(firstToken, secondToken, ethers.utils.parseEther(amtLpToken.toString()), amountAMin, amountBMin, Math.ceil(Date.now()/1000) + 1000*60*10)
      tx = await tx.wait();
      console.log(tx);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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
      <div className="font-bold text-2xl mt-5">Enter Amount of Lp Token</div>
      <input value={amtLpToken} type='number' onChange={(e) => setAmtLPToken(parseFloat(e.target.value))} className="outline-0 border-2 border-slate-400 mt-2.5 h-10 p-2.5 rounded-xl w-1/2"></input>
      {
        !amtLpToken < 0 && <span style={{ color: 'red' }}>In valid value</span>
      }
      <h1 className="mt-4">Position</h1>
      {
        pairTokenAddress !== NULLADDRESS &&
        <TokenDetails tokenAddress={pairTokenAddress} account={account} />
      }
      <div className="flex">
        <button disabled={amtLpToken <= 0 || loading || secondToken == '' || firstToken == '' || !isValidTokenOne || !isValidTokenTwo} className="flex justify-center items-center w-36 h-10 text-base text-white rounded-2xl bg-slate-500 cursor-pointer mt-10 mr-10 disabled:bg-slate-300" onClick={()=>getPair()}>Migrate</button>
      </div>
    </div >
  )
}

export default Migrate;