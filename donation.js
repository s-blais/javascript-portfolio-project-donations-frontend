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
    details.setAttribute("data-id", this.id)
    if (newItemFlag) {
      details.classList.add('new')
    }
    details.innerHTML = `
      <summary><b>
        ${this.date} – ${this.recipient} – $${this.amount}
      </b></summary>
      <span class="delete-btn" id=${this.id} onclick="editButtonClick(this);">&#128465;&#65039;</span>
      <span class="edit-btn" id=${this.id} title="delete" onclick="editButtonClick(this);">&#9999;&#65039;</span>
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