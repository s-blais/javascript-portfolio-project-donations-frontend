class Transaction {
  constructor(transactionData) {
    this.id = transactionData.id
    this.date = transactionData.attributes.date
    this.recipient = transactionData.attributes.recipient
    this.contact = transactionData.attributes.contact
    this.amount = transactionData.attributes.amount
    this.notes = transactionData.attributes.notes
    this.fund_id = transactionData.attributes.fund.id // camelCase?
    this.fund_name = transactionData.attributes.fund.name // camelCase?
    Transaction.all.push(this)
  }
  render() {
    let details = document.createElement('details')
    if (newItemFlag) {
      details.classList.add('new')
    }
    const detailsContent = `
      <summary><b>
        ${this.date} – ${this.recipient} – $${this.amount}
      </b></summary>
      <p>
        <strong>Fund:</strong> ${this.fund_name}<br>
        <strong>Contact:</strong> ${this.contact}<br>
        <strong>Notes:</strong> ${this.notes}
      </p>
      `
    details.innerHTML = detailsContent
    document.getElementById('transaction-cards').prepend(details)
  }
}
Transaction.all = []