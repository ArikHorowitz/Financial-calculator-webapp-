document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('fc100-display');
    // Initialize 4-line display
    display.innerHTML = '0.\n\n\n';  // Three empty lines plus one with "0."

    const calcType = document.getElementById('calc-type');
    const loanFields = document.getElementById('loan-fields');
    const savingsFields = document.getElementById('savings-fields');
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');

    // Show/hide fields based on calculation type
    calcType.addEventListener('change', function() {
        if (calcType.value === 'loan') {
            loanFields.style.display = '';
            savingsFields.style.display = 'none';
        } else if (calcType.value === 'savings') {
            loanFields.style.display = 'none';
            savingsFields.style.display = '';
        } else {
            loanFields.style.display = 'none';
            savingsFields.style.display = 'none';
        }
        resultDiv.textContent = '';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const principal = parseFloat(document.getElementById('principal').value);
        const rate = parseFloat(document.getElementById('rate').value) / 100;
        const years = parseFloat(document.getElementById('years').value);
        let output = '';

        if (calcType.value === 'loan') {
            const paymentsPerYear = parseInt(document.getElementById('payments-per-year').value);
            const n = years * paymentsPerYear;
            const r = rate / paymentsPerYear;
            const payment = (principal * r) / (1 - Math.pow(1 + r, -n));
            output = `Monthly Payment: $${payment.toFixed(2)}`;
        } else if (calcType.value === 'compound') {
            const n = 1; // compounded yearly
            const amount = principal * Math.pow(1 + rate / n, n * years);
            output = `Future Value: $${amount.toFixed(2)}`;
        } else if (calcType.value === 'savings') {
            const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
            const months = years * 12;
            const monthlyRate = rate / 12;
            let futureValue = principal * Math.pow(1 + monthlyRate, months);
            if (monthlyContribution > 0) {
                futureValue += monthlyContribution * ( (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate );
            }
            output = `Future Value: $${futureValue.toFixed(2)}`;
        }
        resultDiv.textContent = output;
    });
});
