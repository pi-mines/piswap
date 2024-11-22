let ethPriceUSD = 65.00;
let ethPriceINR = ethPriceUSD * 85; // 1 USD = Rs. 85
let currentPriceUSD = ethPriceUSD;
let currentPriceINR = ethPriceINR;

let priceInterval;

function fluctuatePrice() {
    let priceChange = (Math.random() * 0.2 - 0.1).toFixed(2); // Random fluctuation between -$0.10 and +$0.10
    currentPriceUSD = (parseFloat(currentPriceUSD) + parseFloat(priceChange)).toFixed(2);
    currentPriceINR = (currentPriceUSD * 85).toFixed(2);
    updatePriceDisplay();
}

function updatePriceDisplay() {
    document.getElementById("eth-price").innerHTML = `
        USD: $${currentPriceUSD}<br>
        INR: ₹${currentPriceINR}
    `;
    calculateReceivedAmount();
}

function calculateReceivedAmount() {
    const currency = document.getElementById("currency").value;
    const coinAmount = parseFloat(document.getElementById("coin-amount").value);

    if (isNaN(coinAmount) || coinAmount <= 0) {
        document.getElementById("received-amount").value = "";
        return;
    }

    let receivedAmount = 0;
    if (currency === "usd") {
        receivedAmount = coinAmount * currentPriceUSD;
    } else if (currency === "inr") {
        receivedAmount = coinAmount * currentPriceINR;
    }

    document.getElementById("received-amount").value = receivedAmount.toFixed(2);
}

// Event listener for currency change
document.getElementById("currency").addEventListener("change", function () {
    const currency = this.value;
    const addressInput = document.getElementById("address");
    
    if (currency === "usd") {
        addressInput.placeholder = "Enter your BEP20 USDT address";
    } else if (currency === "inr") {
        addressInput.placeholder = "Enter your UPI ID";
    }

    calculateReceivedAmount(); // Ensure amount is recalculated
});


// Event listener for coin amount change
document.getElementById("coin-amount").addEventListener("input", calculateReceivedAmount);

// Update price display and start fluctuating price
updatePriceDisplay();
priceInterval = setInterval(fluctuatePrice, 5000); // Update price every 5 seconds

// Add event listener to the "NEXT" button
document.getElementById("next-button").addEventListener("click", function () {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Please connect Pi Wallet first";
    errorMessage.style.display = "block"; // Ensure the message is visible
});
