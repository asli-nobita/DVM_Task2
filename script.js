// TODO: send HTTP post request to foo.com

let form = document.getElementById('registration-form');

var formData = {};

function validateForm() {
  formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    number: document.getElementById('number').value,
    bitsId: document.getElementById('bits-id').value,
    hostel: document.getElementById('hostel').value,
    size: getSelectedSize()
  };
  var isValid = true;

  if (formData.name.trim() === '') {
    document.getElementById('name-error').style.display = 'flex';
    isValid = false;
  }

  if (!isValidEmail(formData.email)) {
    document.getElementById('email-error').style.display = 'flex';
    isValid = false;
  }

  if (!isValidNumber(formData.number)) {
    document.getElementById('number-error').style.display = 'flex';
    isValid = false;
  }

  if (!isValidBitsID(formData.bitsId)) {
    document.getElementById('bits-id-error').style.display = 'flex';
    isValid = false;
  }

  if (formData.hostel === '') {
    document.getElementById('hostel-error').style.display = 'flex';
    isValid = false;
  }

  if (formData.size === '') {
    document.getElementById('size-error').style.display = 'flex';
    isValid = false;
  }

  var checkbox = document.getElementById('checkbox');
  if (!checkbox.checked) {
    document.getElementById('terms-error').style.display = 'flex';
    checkbox.style.borderColor = 'red';
    isValid = false;
  }

  return isValid;

}

function getSelectedSize() {
  var sizeOptions = document.getElementsByName('size');
  var selectedSize;
  for (let i = 0; i < sizeOptions.length; i++) {
    if (sizeOptions[i].checked) {
      selectedSize = sizeOptions[i].value;
      break;
    }
  }
  return selectedSize;
}

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidNumber(number) {
  var numberRegex = /^\d{10}$/;
  return numberRegex.test(number);
}

function isValidBitsID(bitsId) {
  var bitsIdRegex = /^\d{4}[a-dA-D]\d+PS\d{4}P$/;
  return bitsIdRegex.test(bitsId);
}

function saveFormData() {
  localStorage.setItem('formData', JSON.stringify(formData));
}

function fillForm() {
  var storedData = localStorage.getItem('formData');
  if (storedData) {
    var newData = JSON.parse(storedData);
    formData.name = newData.name;
    formData.email = newData.email;
    formData.number = newData.number;
    formData.bitsId = newData.bitsId;
    formData.hostel = newData.hostel;
    formData.size = newData.size;
  }
}

form.addEventListener('submit', function(event) {
  console.log(JSON.stringify(formData));

  if (!validateForm()) {
    event.preventDefault();
    // alert('Invalid details, form not submitted');
  }
  else {
    saveFormData();
    alert('Form submitted successfully');
  }
})

window.onload = fillForm;
