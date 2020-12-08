
document.addEventListener('DOMContentLoaded', function() {
  fetchTransactions()
})

function fetchTransactions() {
  fetch('http://localhost:3000/api/v1/transactions')
  .then(response => response.json())
  .then(transactions => transactions.data.forEach(transaction => {
    renderTransactionCard(transaction)
    })
  )
}

// this is HIDEOUS but will refactor later
function renderTransactionCard(transaction) {
  const card = `
    <p>
      <table>
        <tr>
          <td>Date</td><td>${transaction.attributes.date}</td>
        </tr><tr>
          <td>Recipient</td><td>${transaction.attributes.recipient}</td>
        </tr><tr>
          <td>Contact</td><td>${transaction.attributes.contact}</td>
        </tr><tr>
          <td>Amount</td><td>${transaction.attributes.amount}.00</td>
        </tr><tr>
          <td>Fund</td><td>${transaction.attributes.fund.name}</td>
        </tr><tr>
          <td>Notes</td><td>${transaction.attributes.notes}</td>
        </tr>
      </table>
    </p>
  `
  document.getElementById('transaction-cards').innerHTML += card
}