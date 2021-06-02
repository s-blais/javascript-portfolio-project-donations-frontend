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
      <summary>
        <b>
          ${this.date} – ${this.recipient} – $${this.amount}
        </b>
      </summary>
      <div>
        <div class="edit-delete-buttons">
          <span class="edit-btn" title="edit" onclick="editButtonClick(this);">&#9999;&#65039;</span>
          <span class="delete-btn" title="delete" onclick="deleteButtonClick(this);">&#128465;&#65039;</span>
        </div>
      </div>
      <p>
        <strong>Fund:</strong> ${this.fundName}<br>
        <strong>Contact:</strong> ${this.contact}<br>
        <strong>Notes:</strong> ${this.notes}
      </p>
      `
    document.getElementById('donation-rows').prepend(details)
  }
}
Donation.all = []