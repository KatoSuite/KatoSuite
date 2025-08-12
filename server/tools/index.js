const fs = require('fs');
const path = require('path');

async function runLaunchReadiness() {
  const res = await fetch('http://localhost:3000/api/launch-readiness/assess', { method: 'POST' });
  const data = await res.json();
  console.log('Launch readiness score:', data.percentage);
  console.log('Critical issues:', data.criticalBlocking);
}

function listBillingProducts() {
  const file = path.join(__dirname, '..', 'billing', 'products.json');
  const raw = fs.readFileSync(file, 'utf8');
  const json = JSON.parse(raw);
  console.log('Price plans:', Object.keys(json.priceIds));
  console.log('Add-ons:', Object.keys(json.addonIds));
}

if (require.main === module) {
  const cmd = process.argv[2];
  if (cmd === 'readiness') {
    runLaunchReadiness().catch((err) => {
      console.error('Failed to run assessment:', err.message);
    });
  } else if (cmd === 'products') {
    listBillingProducts();
  } else {
    console.log('Usage: node server/tools/index.js [readiness|products]');
  }
}

module.exports = { runLaunchReadiness, listBillingProducts };
