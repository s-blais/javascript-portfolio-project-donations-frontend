class Donation {
  constructor(donation) {
    this.id = donation.id
    this.date = donation.attributes.date
    this.recipient = donation.attributes.recipient
    this.contact = donation.attributes.contact
    this.amount = donation.attributes.amount
    this.notes = donation.attributes.notes
    this.fundId = donation.attributes.fund.id
    this.fundName = donation.attributes.fund.name
    Donation.all.push(this)
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
    document.getElementById('donation-cards').prepend(details)
  }
}
Donation.all = []