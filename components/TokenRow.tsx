import React, { useState } from 'react'
import Image from "next/image";
import CopyIcon from "../assets/img/copy.png";
import OpenIcon from "../assets/img/open.png";
import CheckIcon from "../assets/img/check.png";
import useERC20 from '../hooks/useERC20';

export default function TokenRow({tokenAddress, index}) {
    if(tokenAddress == '') {
        return <></>
    }

    const [changeIcon, setChangeIcon] = useState<boolean>(false);
    const [selectIndex, setSelectIndex] = useState<number>();
    const tokenDetails = useERC20(tokenAddress, "");
    return (
        <div className="flex tokenDetailss-center bg-slate-200 p-4" key={index}>
            <div className="w-1/12">{index + 1}</div>
            <div className="w-1/6">{tokenDetails.name}</div>
            <div className="w-1/12">{tokenDetails.decimals}</div>
            <div className="w-1/6">{tokenDetails.symbol}</div>
            <div className="flex tokenDetailss-center w-1/2 cursor-pointer">
                <div>{tokenAddress}</div>
                {(!changeIcon || selectIndex != index) && <Image src={CopyIcon} alt="" className="ml-5 w-5" onClick={() => { 
                    navigator.clipboard.writeText(tokenAddress);
                     setSelectIndex(index);
                     setChangeIcon(true);
                     setTimeout(()=>{
                        setChangeIcon(false);
                     }, 500)
                    }} />}
                {changeIcon && selectIndex == index && <Image src={CheckIcon} alt="" className="ml-5 w-5" />}
                <Image src={OpenIcon} alt="" className="ml-5 w-5" onClick={() => window.open(`https://goerli.etherscan.io/address/${tokenAddress}`, "_blank")} />
            </div>
        </div>
    )
}
