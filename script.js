//5409124449:AAFM3uS-CUUYFeb47fPXBZTJ3-wAq5MClM8 TOKEN
//-690817184 CHAT_ID 

const TOKEN = "5409124449:AAFM3uS-CUUYFeb47fPXBZTJ3-wAq5MClM8";
//const chat_id = "918664325"; /// BOT
const chat_id = "-690817184"; /// GROUP
const regaxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regaxPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{2}[-\s\.]?[0-9]{7}$/g;
const form = document.querySelector(".form");
const firstNameInput = form.querySelector(".firstName");
const emailInput = form.querySelector(".email");
const mobileInput = form.querySelector(".mobile");

const checkInfo = function () {
  let firstName = "";
  let email = "";
  let phone = null;
  let message = "";

  if (firstNameInput.value.length > 0) {
    firstName = firstNameInput.value;
  } else {
    firstNameInput.classList.add("border-danger");
  }

  if (emailInput.value.match(regaxEmail)) {
    email = emailInput.value;
  } else {
    emailInput.classList.add("border-danger");
  }

  if (mobileInput.value.match(regaxPhone)) {
    phone = mobileInput.value;
  } else {
    mobileInput.classList.add("border-danger");
  }

  if (firstName && email && phone) {
    return (message = `User Info: %0A <strong>Firstname:</strong> ${firstName} %0A <strong>Email:</strong> ${email} %0A <strong>Phone:</strong> ${phone}`);
  }
  return false;
};

const postInfo = async function (e) {
  e.preventDefault();
  const message = checkInfo();
  if (message) {
    await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`
    );

    firstNameInput.value = emailInput.value = mobileInput.value = "";

    firstNameInput.classList.remove("border-danger");
    emailInput.classList.remove("border-danger");
    mobileInput.classList.remove("border-danger");
  }
};

form.addEventListener("submit", postInfo);
