let newItemFlag = false
const createDonationForm = document.getElementById('create-donation-form')
const createDonationFormDetailsElement = document.getElementById('create-form-details-element')

document.addEventListener('DOMContentLoaded', function() {
  // fetch and render existing Donations from db
  fetchDonations()
  // set listener and handler onto createDonationForm
  createDonationForm.addEventListener('submit', (e) => createDonationHandler(e))
})

function fetchDonations() {
  fetch('http://localhost:3000/api/v1/donations')
  .then(response => response.json())
  .then(donations => donations.data.forEach(donation => {
    let newDonationObject = new Donation(donation)
    newDonationObject.render()
    })
  )
}

function createDonationHandler(e) {
  e.preventDefault()
  // grab the values from the form
  const date = createDonationForm.date.value
  const recipient = createDonationForm.recipient.value
  const contact = createDonationForm.contact.value
  const amount = createDonationForm.amount.value
  const fund_id = createDonationForm.fund.value
  const notes = createDonationForm.notes.value
  createDonationFetch(date, recipient, contact, amount, fund_id, notes)
}

function createDonationFetch(date, recipient, contact, amount, fund_id, notes) {
  
  const bodyData = {date, recipient, contact, amount, fund_id, notes}
  
  fetch("http://localhost:3000/api/v1/donations", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(donation => {
    newItemFlag = true
    let newDonationObject = new Donation(donation.data)
    newDonationObject.render()
    })
}

function editButtonClick(btn) {
  // btn.parentElement.style.display='none' (save this for when the edit is complete)
  // btn.id returns the id of the Donation that has been clicked to edit
  // grab the Donation instance with that btn.id and store it in a variable
  const thisDonation = Donation.all.find(d => d.id == btn.id)
  // bring the form into view and open it if necessary
  createDonationFormDetailsElement.scrollIntoView()
  if (!createDonationFormDetailsElement.hasAttribute("open")) {
    createDonationFormDetailsElement.setAttribute("open","")
  }
  // console.log(thisDonation)
  populateEditForm(thisDonation)
}

function populateEditForm(donation) {
  createDonationForm.date.value = donation.date
  createDonationForm.recipient.value = donation.recipient
  createDonationForm.contact.value = donation.contact
  createDonationForm.amount.value = donation.amount
  createDonationForm.fund.value = donation.fundId
  createDonationForm.notes.value = donation.notes
}