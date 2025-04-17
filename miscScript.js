const contactName = document.getElementById("contact-name-id");
const contactEmail = document.getElementById("contact-email-id");
const contactMessage = document.getElementById("contact-message-id");

function clearMessage() {
  contactName.value = "";
  contactEmail.value = "";
  contactMessage.value = "";
  alert("Thank you for sending us a message.");
}
