const contractAddress = '0x16fF3e371aFF3Ce584B8aFcb8e648B2B06715AE6';
const infuraID = 'd7b4a0da4d5844c0a767c010a9cbb8c6';
const web3 = new Web3('https://sepolia-rollup.arbitrum.io/rpc');

const contractABI = [
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "taxWallet3",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "address", "name": "newTaxWallet", "type": "address" }
        ],
        "name": "TaxWalletUpdated",
        "type": "event"
    }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);
const initialSupply = 888888888888;

async function fetchTotalSupply() {
    try {
        const totalSupply = await contract.methods.totalSupply().call();
        const decimals = await contract.methods.decimals().call();
        return totalSupply / Math.pow(10, decimals);
    } catch (error) {
        console.error('Error fetching total supply:', error);
    }
}

async function calculateBurnedTokens() {
    try {
        const currentSupply = await fetchTotalSupply();
        const totalBurned = initialSupply - currentSupply;
        const percentageBurned = (totalBurned / initialSupply) * 100;
        return { totalBurned, percentageBurned };
    } catch (error) {
        console.error('Error calculating burned tokens:', error);
    }
}

async function updateBurnedTokensDisplay() {
    const { totalBurned, percentageBurned } = await calculateBurnedTokens() || {};
    document.getElementById('total-burned').innerText = totalBurned.toLocaleString();
    document.getElementById('percentage-burned').innerText = percentageBurned.toFixed(2) + '%';
}

async function fetchTaxWalletAddress() {
    try {
        return await contract.methods.taxWallet3().call();
    } catch (error) {
        console.error('Error fetching tax wallet address:', error);
    }
}

async function fetchLastTaxWalletUpdateTime() {
    try {
        const events = await contract.getPastEvents('TaxWalletUpdated', {
            fromBlock: 0,
            toBlock: 'latest'
        });
        if (!events.length) throw new Error('No TaxWalletUpdated events found.');

        const latestEvent = events[events.length - 1];
        const block = await web3.eth.getBlock(latestEvent.blockNumber);
        return block.timestamp;
    } catch (error) {
        console.error('Error fetching last wallet update time:', error);
        return null;
    }
}

function formatTimeElapsed(timestamp) {
    if (!timestamp) return 'No recent updates';

    const currentTime = Math.floor(Date.now() / 1000);
    const elapsed = currentTime - timestamp;

    const days = Math.floor(elapsed / 86400);
    const hours = Math.floor((elapsed % 86400) / 3600);
    const minutes = Math.floor((elapsed % 3600) / 60);

    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    return `${minutes} minutes ago`;
}

async function updateTaxWalletDisplay() {
    const taxWalletAddress = await fetchTaxWalletAddress();
    const lastUpdateTime = await fetchLastTaxWalletUpdateTime();
    const timeElapsed = formatTimeElapsed(lastUpdateTime);

    document.getElementById('tax-wallet-address').innerText = taxWalletAddress || 'Error';
    document.getElementById('tax-wallet-time').innerText = timeElapsed || 'Error';
}

function startDataRefresh() {
    updateBurnedTokensDisplay();
    updateTaxWalletDisplay();
    setInterval(() => {
        updateBurnedTokensDisplay();
        updateTaxWalletDisplay();
        console.log('Refreshed');
    }, 30000);
    console.log('Initial');
}

window.onload = startDataRefresh;
