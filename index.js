let newItemFlag = false
const createTransactionForm = document.getElementById('create-transaction-form')

document.addEventListener('DOMContentLoaded', function() {
  // fetch and render existing Transactions from db
  fetchTransactions()
  // set listener and handler onto createTransactionForm
  // const createTransactionForm = document.getElementById('create-transaction-form')
  createTransactionForm.addEventListener('submit', (e) => createTransactionHandler(e))
})

function fetchTransactions() {
  fetch('http://localhost:3000/api/v1/transactions')
  .then(response => response.json())
  .then(transactions => transactions.data.forEach(transaction => {
    let newTransactionObject = new Transaction(transaction)
    newTransactionObject.render()
    })
  )
}

function createTransactionHandler(e) {
  e.preventDefault()
  // grab the values from the form
  const date = createTransactionForm.date.value
  const recipient = createTransactionForm.recipient.value
  const contact = createTransactionForm.contact.value
  const amount = createTransactionForm.amount.value
  const fund_id = createTransactionForm.fund.value
  const notes = createTransactionForm.notes.value
  createTransactionFetch(date, recipient, contact, amount, fund_id, notes)
}

function createTransactionFetch(date, recipient, contact, amount, fund_id, notes) {
  
  const bodyData = {date, recipient, contact, amount, fund_id, notes}
  
  fetch("http://localhost:3000/api/v1/transactions", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(transaction => {
    newItemFlag = true
    let newTransactionObject = new Transaction(transaction.data)
    newTransactionObject.render()
    })
}