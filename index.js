
document.addEventListener('DOMContentLoaded', function() {
  // fetch and render existing Transactions from db
  fetchTransactions()
  // set create Transaction form and set listener and handler
  const createTransactionForm = document.getElementById('create-transaction-form')
  createTransactionForm.addEventListener('submit', (e) => createTransactionHandler(e))
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

function createTransactionHandler(e) {
  e.preventDefault()
  // grab the values from the form
  const date = document.querySelector('#create-transaction-date').value
  const recipient = document.querySelector('#create-transaction-recipient').value
  const contact = document.querySelector('#create-transaction-contact').value
  const amount = document.querySelector('#create-transaction-amount').value
  const fund = document.querySelector('#create-transaction-fund').value
  const notes = document.querySelector('#create-transaction-notes').value
  debugger
}