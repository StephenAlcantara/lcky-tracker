const contractAddress = '0xE7f28C53AC90fE9A196327BC6AD1C1a687701089';
const provider = new ethers.providers.InfuraProvider('mainnet', '24e81a397e5147db8bbf200a66c0e1c3');
const contractABI = [
      {
          "inputs": [
              {
                  "internalType": "string",
                  "name": "tokenName",
                  "type": "string"
              },
              {
                  "internalType": "string",
                  "name": "tokenSymbol",
                  "type": "string"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "allowance",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "needed",
                  "type": "uint256"
              }
          ],
          "name": "ERC20InsufficientAllowance",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "balance",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "needed",
                  "type": "uint256"
              }
          ],
          "name": "ERC20InsufficientBalance",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "approver",
                  "type": "address"
              }
          ],
          "name": "ERC20InvalidApprover",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "receiver",
                  "type": "address"
              }
          ],
          "name": "ERC20InvalidReceiver",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              }
          ],
          "name": "ERC20InvalidSender",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              }
          ],
          "name": "ERC20InvalidSpender",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "have",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "want",
                  "type": "address"
              }
          ],
          "name": "OnlyCoordinatorCanFulfill",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "OwnableInvalidOwner",
          "type": "error"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              }
          ],
          "name": "OwnableUnauthorizedAccount",
          "type": "error"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newWallet1",
                  "type": "address"
              }
          ],
          "name": "Wallet1Updated",
          "type": "event"
      },
      {
          "inputs": [],
          "name": "LINK_UNLOCK_AMOUNT",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "MAX_TRANSFER_LIMIT",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "THRESHOLD",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "VRF_REQUEST_COST",
          "outputs": [
              {
                  "internalType": "uint96",
                  "name": "",
                  "type": "uint96"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              }
          ],
          "name": "allowance",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "spender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "account",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "decimals",
          "outputs": [
              {
                  "internalType": "uint8",
                  "name": "",
                  "type": "uint8"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "deployer",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "initializeSubscription",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "isBlacklistExempted",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "isBlacklisted",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "isTransactionExempted",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "name": "isTransferLimitExempted",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "lastRandomnessRequestTime",
          "outputs": [
              {
                  "internalType": "uint64",
                  "name": "",
                  "type": "uint64"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "name",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "",
                  "type": "bytes"
              }
          ],
          "name": "onTokenTransfer",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "pair",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "randomnessInterval",
          "outputs": [
              {
                  "internalType": "uint32",
                  "name": "",
                  "type": "uint32"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "requestId",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256[]",
                  "name": "randomWords",
                  "type": "uint256[]"
              }
          ],
          "name": "rawFulfillRandomWords",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "isExempt",
                  "type": "bool"
              }
          ],
          "name": "setBlacklistExemptedAddress",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint32",
                  "name": "delay",
                  "type": "uint32"
              }
          ],
          "name": "setTransactionDelay",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "isExempt",
                  "type": "bool"
              }
          ],
          "name": "setTransactionExemption",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "wallet",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "isExempt",
                  "type": "bool"
              }
          ],
          "name": "setTransferLimitExemption",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "symbol",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "transactionDelay",
          "outputs": [
              {
                  "internalType": "uint32",
                  "name": "",
                  "type": "uint32"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "transfer",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "sender",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "recipient",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "wallet1",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "wallet2",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      }
  ];

const contract = new ethers.Contract(contractAddress, contractABI, provider);
const initialSupply = 888888888888; // Replace with actual initial supply if different
let countdownInterval;

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

// Fetch tax wallet address
async function fetchTaxWalletAddress() {
    try {
        return await contract.wallet1();
    } catch (error) {
        console.error('Error fetching tax wallet address:', error);
        return 'Unavailable';
    }
}

// Start a countdown for the next wallet update
function startCountdown() {
    const countdownDisplay = document.getElementById('countdown-timer');
    let timeLeft = 60 * 60; // 60 minutes in seconds

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

// Assign and display the new tax wallet address
async function assignNewTaxWallet() {
    const taxWalletAddress = await fetchTaxWalletAddress();
    document.getElementById('tax-wallet-address').innerText = taxWalletAddress;

    clearInterval(countdownInterval);
    startCountdown();
}

// Refresh data at a set interval
function startDataRefresh() {
    updateBurnedTokensDisplay();
    assignNewTaxWallet();
    setInterval(() => {
        updateBurnedTokensDisplay();
        assignNewTaxWallet();
        console.log('Data refreshed');
    }, 30000); // Refresh every 30 seconds
}
