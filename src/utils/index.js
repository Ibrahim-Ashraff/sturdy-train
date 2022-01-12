/**
 * Checks the validity of each form input field
 */
const checkValidity = (value, rules) => {
  let valid = true;
  let message = "";
  let response = {};

  if (rules.required) {
    valid = String(value).trim().length > 0 && valid;
    message = "This is a required field";
  }

  if (value.trim().length > 0) {
    if (rules.isEmail) {
      valid = validateEmail(value) && valid;
      message = `Invalid email format`;
    }

    if (rules.isPassword) {
      valid = validatePassword(value) && valid;
      message = `Password must be 8-20 alphanumeric characters (@, _, -) are allowed`;
    }

    if (rules.isInput) {
      valid = validateInput(value) && valid;
      message = `Must be at least three characters`;
    }

    if (rules.isNumber) {
      valid = validateNumber(value) && valid;
      message = `Must be a valid number`
    }
  }

  response = {
    valid,
    message,
  };

  return response;
};

/**
 * Validates email fields
 */
const validateEmail = (email) => {
  let regEx = /^([\w.]+)@([a-z\d-]+)\.([a-z]{2,4})(\.[a-zA-Z]{2,4})?$/;
  return regEx.test(email);
};

const validatePassword = (password) => {
  let regEx = /^[\w@-]{8,20}$/;
  return regEx.test(password);
};

// Add new function for validate input
const validateInput = (input) => {
  let regEx = /(?:[aA-zZ][- ]?){3}/;
  return regEx.test(input);
};

const validateNumber = (input) => {
  let regEx = /^\d*(\.\d+)?$/;

  return regEx.test(input)
}

const truncateStr = (str, len) => {
  if (str.length <= len) return str;
  return str.slice(0, len - 3) + "...";
};



const getRandomColor = () => {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}


// eslint-disable-next-line
export default {
  checkValidity,
  validateEmail,
  validateInput,
  validateNumber,
  truncateStr,
  getRandomColor
};
