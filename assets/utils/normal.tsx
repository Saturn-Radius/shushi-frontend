import axios from "axios";

const UniswapAPI = "https://api.thegraph.com/subgraphs/name/liqwiz/uniswap-v3-goerli"
const Query = `
    {   
        positions(where: {
            owner: "0x33fbe104a34f2901ec8677c52fe231ca626702cd"
        }) {
            id
            owner
        }
    }
`

// ************************* getting position with owner address and pool address with UniswapV3 SubGraphql
export const getPosition = async () => {
    try {
        const result = await axios.post(UniswapAPI, { query: Query });
        const positions = result.data.data.positions;
        console.log(positions);
    } catch (error) {
        console.log(error);
    }
}