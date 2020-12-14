class Transaction {
  constructor(transaction) {
    this.id = transaction.id
    this.date = transaction.attributes.date
    this.recipient = transaction.attributes.recipient
    this.contact = transaction.attributes.contact
    this.amount = transaction.attributes.amount
    this.notes = transaction.attributes.notes
    this.fundId = transaction.attributes.fund.id
    this.fundName = transaction.attributes.fund.name
    Transaction.all.push(this)
  }
  render() {
    let details = document.createElement('details')
    if (newItemFlag) {
      details.classList.add('new')
    }
    details.innerHTML = `
      <summary><b>
        ${this.date} – ${this.recipient} – $${this.amount}
      </b></summary>
      <p>
        <strong>Fund:</strong> ${this.fundName}<br>
        <strong>Contact:</strong> ${this.contact}<br>
        <strong>Notes:</strong> ${this.notes}
      </p>
      `
    document.getElementById('transaction-cards').prepend(details)
  }
}
Transaction.all = []