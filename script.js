const contractAddress = '0x16fF3e371aFF3Ce584B8aFcb8e648B2B06715AE6';
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
        "inputs": [{ "indexed": false, "internalType": "address", "name": "newTaxWallet", "type": "address" }],
        "name": "TaxWalletUpdated",
        "type": "event"
    }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);
const initialSupply = 888888888888;
let countdownInterval;

// Ensure the DOM is fully loaded before running the script
window.onload = () => {
    initApp();
};

// Initialize the app
async function initApp() {
    try {
        await assignNewTaxWallet();
        startDataRefresh();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

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

function startCountdown() {
    const countdownDisplay = document.getElementById('countdown-timer');
    let timeLeft = 60 * 60;

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            countdownDisplay.innerText = '00:00';
            return;
        }

        timeLeft--;

        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        countdownDisplay.innerText = `${minutes}:${seconds}`;
    }, 1000);
}

async function assignNewTaxWallet() {
    const taxWalletAddress = await fetchTaxWalletAddress();
    document.getElementById('tax-wallet-address').innerText = taxWalletAddress || 'Error';

    clearInterval(countdownInterval);
    startCountdown();
}

function startDataRefresh() {
    updateBurnedTokensDisplay();
    updateTaxWalletDisplay();
    setInterval(() => {
        updateBurnedTokensDisplay();
        updateTaxWalletDisplay();
        console.log('Data refreshed');
    }, 30000);
}
