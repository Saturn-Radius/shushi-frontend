const addresses = {
    "mainnet": {
        TokenAddresses: [
            "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
            "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            "0xdac17f958d2ee523a2206206994597c13d831ec7",
            "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2",
            "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e",
            "0x6b175474e89094c44da98b954eedeac495271d0f",
            "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
            "0xd533a949740bb3306d119cc777fa900ba034cd52",
            "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
            "0x0f5d2fb29fb7d3cfee444a200298f468908cc942",
        ],
        SushiSwapAddress: "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F",
        UniswapFactoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
        UniswapRouterAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        SushiRollAddress: "0x16E58463eb9792Bc236d8860F5BC69A81E26E32B",
    },
    "goerli": {
        TokenAddresses: [
            "0x14DE93fc5E76B790DcbFcBc3b119A2D8FA568949",
            "0xE380f84A80b167CB61b4B5573FF7953b7F91797F",
        ],
        SushiSwapAddress: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506",
        UniswapFactoryAddress: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
        UniswapRouterAddress: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
        SushiRollAddress: "0x17FfF90999b831Cbb193273E7CF4f60f001cdDBe",
    }
}

const network = "goerli";
export const { TokenAddresses, SushiSwapAddress, UniswapFactoryAddress, UniswapRouterAddress, SushiRollAddress} = addresses[network]

export const NULLADDRESS = "0x0000000000000000000000000000000000000000";