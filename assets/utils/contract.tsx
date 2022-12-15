import { ethers } from 'ethers';
import UniswapFactoryAbi from '../abis/uniswapfactory.json'
import ERC20Abi from '../abis/erc20Abi.json'
import UniswapPairAbi from '../abis/uniswappair.json'
import UniswapRouterAbi from '../abis/uniswaprouter.json'
import SushiRollAbi from '../abis/sushiroll.json'

import { UniswapFactoryAddress, SushiRollAddress, UniswapRouterAddress } from '../data/data';


export const getBalance = async (address: string | null): Promise<number> => {
    if (!address) return 0;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance_wei = await provider.getBalance(address);
    const balance_eth = ethers.utils.formatEther(balance_wei);
    return Number(balance_eth);
};

export const getShortBalance = async (address: string | null): Promise<number> => {
    const balance = await getBalance(address);
    const short_balance = Number(balance).toFixed(2);
    return Number(short_balance);
};

export const getAddress = async (): Promise<any> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
        const signer = provider.getSigner();
        if (!signer) return "";
        const address = await signer.getAddress();
        return String(address);
    } catch (error) {
        console.log(error);
    }
}

export const getShortAddress = (address: string | null): string => {
    if (!address) return "";

    return `${address.slice(0, 4)}...${address.slice(-2)}`;
};

export const connectWallet = async () => {
    const address: string = await getAddress();

    try {
        if (window.ethereum && address === "") {
            const result = await window.ethereum.request({ method: 'eth_requestAccounts' });
        }
        else console.log("Please Install Metamask");
    } catch (error) {
        console.log(error);
    }
}

export const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return await provider.getSigner();
}
export const getUniswapFactoryContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(UniswapFactoryAddress, UniswapFactoryAbi, provider);
    return contract;
};

export const getERC20Contract = (tokenAddress: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(tokenAddress, ERC20Abi, provider);
    return contract;
};

export const getUniswapRouterContract = async (): Promise<any> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(UniswapRouterAddress, UniswapRouterAbi, provider);
    return contract;

}
export const getUniswapPairContract = async (LPtoken): Promise<any> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(LPtoken, UniswapPairAbi, signer);
    return contract;
};

export const getSushiRollContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum); 
    const contract = new ethers.Contract(SushiRollAddress, SushiRollAbi, provider);
    return contract;
}

export const signTransaction = async () => {
    const domain = [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
        { name: "salt", type: "bytes32" },
    ];
    const bid = [
        { name: "amount", type: "uint256" },
        { name: "bidder", type: "Identity" },
    ];
    const identity = [
        { name: "userId", type: "uint256" },
        { name: "wallet", type: "address" },
    ];

    const domainData = {
        name: "My amazing dApp",
        version: "2",
        chainId: 5,
        verifyingContract: "0x82Ed1A46E653406Ae79B192d0b96c302baCedfBd", 
    };
    var message = {
        amount: 100,
        bidder: {
            userId: 323,
            wallet: "0x3333333333333333333333333333333333333333"
        }
    };
    const data = JSON.stringify({
        types: {
            EIP712Domain: domain,
            Bid: bid,
            Identity: identity,
        },
        domain: domainData,
        primaryType: "Bid",
        message: message
    });
}