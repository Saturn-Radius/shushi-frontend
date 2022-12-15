import React, { useState } from 'react'
import Image from "next/image";
import CopyIcon from "../assets/img/copy.png";
import OpenIcon from "../assets/img/open.png";
import CheckIcon from "../assets/img/check.png";
import useERC20 from '../hooks/useERC20';

export default function TokenDetails({ tokenAddress, account }) {
    if (tokenAddress == '') {
        return <></>
    }
    const tokenDetails = useERC20(tokenAddress, account);
    return (
        <>
            <p><strong>Name</strong>: {tokenDetails.name}</p>
            <p><strong>Decimls</strong>: {tokenDetails.decimals}</p>
            <p><strong>Symbol</strong>: {tokenDetails.symbol}</p>
            {tokenDetails.balance != -1 &&
                <p><strong>Balance</strong>: {tokenDetails.balance}</p>
            }
        </>
    )
}
