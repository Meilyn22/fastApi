function calculateMortgage() {
    // Get the input values
    const price = document.getElementById('price').value;
    const downPayment = document.getElementById('down-payment').value;
    const interestRate = document.getElementById('interest-rate').value;
    const term = document.getElementById('term').value;
    const insurance = document.getElementById('insurance').value;
    const propertyTax = document.getElementById('property-tax').value;
    const hoa = document.getElementById('hoa').value;
    const pmi = document.getElementById('pmi').value;
    
    
    // Calculate the loan total payment
    const loanAmount = price - downPayment;
    const interest = loanAmount * (interestRate / 100);
    let loanTotalPayment = loanAmount + interest;
    if (pmi) {
    loanTotalPayment += pmi;
    }
    
    // Calculate the yearly total payments
    let yearlyTotalPayments = loanTotalPayment;
    if (insurance) {
    yearlyTotalPayments += insurance;
    }
    if (propertyTax) {
    yearlyTotalPayments += propertyTax;
    }
    if (hoa) {
    yearlyTotalPayments += hoa;
    }
    
    // Calculate the payments for the duration of the loan
    let payments;
    if (term === '30-yr fixed') {
    payments = 30 * 12;
    } else if (term === '15-yr fixed') {
    payments = 15 * 12;
    } else {
    payments = 0;
    }
    const totalPayments = payments * yearlyTotalPayments;// Display the results formatted with commas
    document.getElementById('loan-total-payment').innerHTML = loanTotalPayment.toLocaleString();
    document.getElementById('yearly-total-payments').innerHTML = yearlyTotalPayments.toLocaleString();
    document.getElementById('total-payments').innerHTML = totalPayments.toLocaleString();
    
    // Calculate the insurance and fees
    const insuranceAndFees = insurance + propertyTax + hoa;
    document.getElementById('insurance-and-fees').innerHTML = insuranceAndFees.toLocaleString();
    
    // Calculate the loan total monthly payment
    const loanTotalMonthlyPayment = loanTotalPayment / payments;
    document.getElementById('loan-total-monthly-payment').innerHTML = loanTotalMonthlyPayment.toLocaleString();
    
    // Calculate the yearly total monthly payment
    const yearlyTotalMonthlyPayment = yearlyTotalPayments / 12;
    document.getElementById('yearly-total-monthly-payment').innerHTML = yearlyTotalMonthlyPayment.toLocaleString();
    
    // Calculate the total monthly payment
    const totalMonthlyPayment = totalPayments / payments;
    document.getElementById('total-monthly-payment').innerHTML = totalMonthlyPayment.toLocaleString();
    
    }
    
    // Add an event listener to the form to calculate the mortgage when the form is submitted
    const form = document.getElementById('mortgage-calculator-form');
    form.addEventListener('submit', calculateMortgage);
    // display result
    const displayResults = document.getElementById('result');
    displayResults.style.display = 'block';
