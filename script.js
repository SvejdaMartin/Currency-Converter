const amountOne = document.getElementById('amount-one');
const currencyOne = document.getElementById('curr-one');
const amountTwo = document.getElementById('amount-two');
const currencyTwo = document.getElementById('curr-two');
const swapButton = document.getElementById('btn-swap');
const convertButton = document.getElementById('btn-con');
const rateInfo = document.getElementById('rate');
const resultInfo = document.getElementById('result-info');
const onlyCur = document.getElementById('only-cur');

// API klíč a URL pro Fixer.io
const API_KEY = '981f0cb9495ebd46f45a3948c3460871';
const API_URL = `http://data.fixer.io/api/latest?access_key=${API_KEY}`;

let exchangeRates = {};

// Načíst směnné kurzy z Fixer.io API
async function fetchExchangeRates() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.success) throw new Error(`API Error: ${data.error.type}`);
    exchangeRates = data.rates;
    resultInfo.textContent = 'Exchange rates loaded successfully.';
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    resultInfo.textContent = 'Failed to load exchange rates.';
  }
}

// Vypočítat směnný kurz a aktualizovat DOM
// Vypočítat směnný kurz a aktualizovat DOM
function calculateExchange() {
  const amount = parseFloat(amountOne.value);
  const currOne = currencyOne.value;
  const currTwo = currencyTwo.value;

  if (!exchangeRates[currOne] || !exchangeRates[currTwo]) {
    resultInfo.textContent = "Currency data unavailable.";
    return;
  }

  const rate = (exchangeRates[currTwo] / exchangeRates[currOne]).toFixed(4);
  const convertedAmount = (amount * rate).toFixed(2);

  rateInfo.textContent = `1 ${currOne} = ${rate} ${currTwo}`;
  amountTwo.value = convertedAmount;

  // Zobrazit přepočtený kurz ve formátu "XXXX.XX CZK"
  onlyCur.textContent = `${Number(convertedAmount).toLocaleString()} ${currTwo}`;

  // Zobrazení hodnoty zadané uživatelem
  resultInfo.textContent = `You entered: ${amount} ${currOne}`;
}


// Prohodit měny
function swapCurrencies() {
  const tempCurrency = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempCurrency;
  calculateExchange();
}

// Event listeners
convertButton.addEventListener('click', calculateExchange);
swapButton.addEventListener('click', swapCurrencies);

// Načíst kurzy při načtení stránky
fetchExchangeRates();
