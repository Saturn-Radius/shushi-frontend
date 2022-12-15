import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from 'ethers';
import { getAddress, getShortAddress, getShortBalance } from "../assets/utils/contract";
import { connectWallet } from "../assets/utils/contract";
import { useDispatch } from "react-redux/es/exports";
import { setAddress } from "../store/userSlice";


const Header: React.FC = () => {

    const router = useRouter();
    const normalClassName = "text-base text-slate-300 ml-10 cursor-pointer";
    const selectClassName = "text-xl text-white ml-10 cursor-pointer font-bold"; 

    const [butttonText, setButtonText] = useState<string>("Connect Wallet");

    const getInfo = async () => {
        try {
            const address = await getAddress(); 
            console.log(address);
            const short_address = getShortAddress(address);
            const short_balance = await getShortBalance(address);
            const content = short_address + "&nbsp;".repeat(5) + short_balance;
            setButtonText(content);
            setButtonText(`${short_address} *** ${short_balance}`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <div className="flex justify-between items-center h-20 px-10 bg-slate-900">
            <div className="flex items-center">
                <div className="italic text-3xl text-white font-bold mr-10">Sushi Swap</div>
                <div className={router.pathname === "/" ? selectClassName : normalClassName} onClick={() => router.push("/")}>Token List</div>
                <div className={router.pathname === "/position" ? selectClassName : normalClassName} onClick={() => router.push("/position")}>LP Position</div>
                <div className={router.pathname === "/migrate" ? selectClassName : normalClassName} onClick={() => router.push("/migrate")}>Migrate</div>
            </div>
            <div className="flex justify-center items-center w-44 h-10 text-base text-white rounded-2xl bg-slate-500 cursor-pointer" onClick={async () => await connectWallet()}>{butttonText}</div>
        </div>
    )
}

export default Header;