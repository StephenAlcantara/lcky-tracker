const contractAddress = '0xE7f28C53AC90fE9A196327BC6AD1C1a687701089';
const provider = new ethers.providers.InfuraProvider('mainnet', 'd7b4a0da4d5844c0a767c010a9cbb8c6');  // Replace with your Infura Project ID
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
        "inputs": [{ "indexed": true, "internalType": "address", "name": "newTaxWallet", "type": "address" }],
        "name": "TaxWalletUpdated",
        "type": "event"
    }
];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const initialSupply = 888888888888;  // Initial supply
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

// Fetch total supply
async function fetchTotalSupply() {
    try {
        const totalSupply = await contract.totalSupply();
        const decimals = await contract.decimals();
        return totalSupply / Math.pow(10, decimals);
    } catch (error) {
        console.error('Error fetching total supply:', error);
    }
}

// Calculate burned tokens and percentage
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

// Update displayed burned tokens
async function updateBurnedTokensDisplay() {
    const { totalBurned, percentageBurned } = await calculateBurnedTokens() || {};
    document.getElementById('total-burned').innerText = totalBurned.toLocaleString();
    document.getElementById('percentage-burned').innerText = percentageBurned.toFixed(2) + '%';
}

// Fetch tax wallet address with error handling
async function fetchTaxWalletAddress() {
    try {
        return await contract.taxWallet3();
    } catch (error) {
        console.error('Error fetching tax wallet address:', error);
        return 'Unavailable';
    }
}

// Start a countdown for the next wallet update
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

// Polling-based wallet assignment due to potential lack of event
async function assignNewTaxWallet() {
    const taxWalletAddress = await fetchTaxWalletAddress();
    document.getElementById('tax-wallet-address').innerText = taxWalletAddress;

    clearInterval(countdownInterval);
    startCountdown();
}

// Refresh data at a set interval, using polling for tax wallet address
function startDataRefresh() {
    updateBurnedTokensDisplay();
    assignNewTaxWallet();
    setInterval(() => {
        updateBurnedTokensDisplay();
        assignNewTaxWallet();
        console.log('Data refreshed');
    }, 30000);
}
