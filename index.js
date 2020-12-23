let newItemFlag = false
const donationForm = document.getElementById('donation-form')
const donationFormDetailsElement = document.getElementById('donation-form-details-element')
const donationFormClearButton = document.getElementById('donation-form-clear')
const donationFormClearCloseButton = document.getElementById('donation-form-clear-close')

document.addEventListener('DOMContentLoaded', function() {
  // fetch and render existing Donations from db
  fetchDonations()
  // set listener and handler onto donationForm
  donationForm.addEventListener('submit', (e) => donationFormSubmitHandler(e))
  donationFormClearButton.addEventListener('click', (e) => donationFormClear(e))
  donationFormClearCloseButton.addEventListener('click', (e) => donationFormClearClose(e))
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

function donationFormSubmitHandler(e) {
  e.preventDefault()
  // grab the values from the form
  const id = donationForm.id.value
  const date = donationForm.date.value
  const recipient = donationForm.recipient.value
  const contact = donationForm.contact.value
  const amount = donationForm.amount.value
  const fund_id = donationForm.fund.value
  const notes = donationForm.notes.value
  // now, if hidden field is anything other than "", call updateDonationFetch
  if (!!id) {
    updateDonationFetch(id, date, recipient, contact, amount, fund_id, notes)
  } else {
    createDonationFetch(date, recipient, contact, amount, fund_id, notes)
  }
}

function donationFormClear(e) {
  e.preventDefault()
  donationForm.reset()
  donationForm.submit.value = "Save Donation"
}

function donationFormClearClose(e) {
  donationFormClear(e)
  donationFormDetailsElement.removeAttribute("open")
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
    donationForm.reset()
    })
}

function editButtonClick(btn) {
  const thisDonation = Donation.all.find(d => d.id == btn.parentElement.dataset.id)
  donationFormDetailsElement.scrollIntoView()
  if (!donationFormDetailsElement.hasAttribute("open")) {
    donationFormDetailsElement.setAttribute("open","")
  }
  populateEditForm(thisDonation)
  donationForm.submit.value = "Update Donation"
}

function populateEditForm(donation) {
  donationForm.id.value = donation.id
  donationForm.date.value = donation.date
  donationForm.recipient.value = donation.recipient
  donationForm.contact.value = donation.contact
  donationForm.amount.value = donation.amount
  donationForm.fund.value = donation.fundId
  donationForm.notes.value = donation.notes
}

function updateDonationFetch(id, date, recipient, contact, amount, fund_id, notes) {
  const bodyData = {date, recipient, contact, amount, fund_id, notes}
  
  fetch(`http://localhost:3000/api/v1/donations/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(donation => {
    newItemFlag = true
    // there's gotta be a better way to do these next two lines? This is removing the now-outdated Donation object from Donation.all
    const oldDonationObjectIndex = Donation.all.findIndex(d => d.id == donation.data.id)
    Donation.all.splice(oldDonationObjectIndex, 1)
    // slide the updated Donation back into Donation.all so it can be rendered
    let updatedDonationObject = new Donation(donation.data)
    // before rendering the updated object, remove the original from the DOM..
    document.querySelector(`[data-id="${donation.data.id}"]`).remove()
    // now render the updated object at the top
    updatedDonationObject.render()
    donationForm.submit.value = "Save Donation"
    donationForm.reset()
    })
}

function deleteButtonClick(btn) {
  if (window.confirm("Delete this donation record? This cannot be undone")) {
    deleteDonationFetch(btn.parentElement.dataset.id)
  }
}

function deleteDonationFetch(id) {
  fetch(`http://localhost:3000/api/v1/donations/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  })
  // remove the deleted donation from the JS object array
  // there's gotta be a better way to do these next two lines? This is removing the now-deleted Donation object from Donation.all
  const oldDonationObjectIndex = Donation.all.findIndex(d => d.id == id)
  Donation.all.splice(oldDonationObjectIndex, 1)
  deletingDetailsElement = document.querySelector(`[data-id="${id}"]`);
  deletingDetailsElement.classList.add("delete-details-fade");
  setTimeout(() => {deletingDetailsElement.remove()}, 1000)
}