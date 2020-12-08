
document.addEventListener('DOMContentLoaded', function() {
  fetchTransactions()
})

function fetchTransactions() {
  fetch('http://localhost:3000/api/v1/transactions')
  .then(response => response.json())
  .then(transactions => console.log(transactions.data))
}

