const form = document.getElementById('form'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  password2 = document.getElementById('password2');

// Show error message
function showError(input, msg) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const errorSmallTag = formGroup.querySelector('small');
  errorSmallTag.innerText = msg;
}

// Show success message
function showSuccess(inputField) {
  const formGroup = inputField.parentElement;
  formGroup.className = 'form-group success';
}

// Check required fields
function checkFields(inputArray) {
  inputArray.forEach(function(inputField) {
    if (inputField.value.trim() === '') {
      showError(inputField, `${getInputFieldName(inputField)} is required`);
    } else {
      showSuccess(inputField);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// Check password match
function checkPasswordMatch(pass1, pass2) {
  if (pass1.value !== pass2.value) {
    showError(pass2, 'Password are note matched');
  }
}

// Get field name
function getInputFieldName(inputFieldName) {
  return inputFieldName.id.charAt(0).toUpperCase() + inputFieldName.id.slice(1);
}

// Event Listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkFields([username, email, password, password2]);
  checkLength(username, 3, 10);
  checkLength(password2, 5, 21);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
