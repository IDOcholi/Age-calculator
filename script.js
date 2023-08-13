const dayIn = document.getElementById('day');

const daylabel = document.getElementById('day-label');

const monthIn = document.getElementById('month');

const monthlabel = document.getElementById('month-label');

const yearIn = document.getElementById('year');

const yearlabel = document.getElementById('year-label');

const dayOut = document.getElementById('days-result');

const monthOut = document.getElementById('months-result');

const yearOut = document.getElementById('years-result');

const submitBtn = document.getElementById('Btn');

const errorStyle = '2px solid var(--Light_red)';


// Calculate Button
submitBtn.addEventListener('click', () => {
  const D = dayIn.value;
  const M = monthIn.value;
  const Y = yearIn.value;
  const birthday = `${Y}-${M}-${D}`;

  if (validateDay() && validateMonth() && validateYear()) {
    console.log('Done');
  } else {
    return;
  }

  // Age Calculation
  let years = new Date().getFullYear() - new Date(birthday).getFullYear();
  let months = new Date().getMonth() - new Date(birthday).getMonth();
  let days = new Date().getDate() - Number(D);
  if (months < 0) {
    years = years - 1;
    months = months + 12;
  }

  if (days < 0) {
    days += getNoOfDays(Y, M - 1);
  }

  // Values display
  dayOut.innerText = days;
  monthOut.innerText = months;
  yearOut.innerText = years;
});

//  Number of Days in a particular months
function getNoOfDays(y, m) {
  return new Date(y, m, 0).getDate();
}


// error day validation
dayIn.addEventListener('blur', () => {
  validateDay();
});

// validation day function
const validateDay = () => {
  const D = dayIn.value;
  const M = monthIn.value;
  const Y = yearIn.value;
  if (D == '') {
    showMessage(dayIn, 'This field is required', errorStyle,);
    daylabel.style.color = 'var(--Light_red)';
    return false;
  } else if (!validDay(Y, M, D)) {
    showMessage(dayIn, 'Must be a valid day', errorStyle);
    daylabel.style.color = 'var(--Light_red)'
    return false;
  } else {
    showMessage(dayIn, '', '');
    return true;
  }
};

// error month validation
monthIn.addEventListener('blur', () => {
  validateMonth();
});

// validation month function
const validateMonth = () => {
  const M = monthIn.value;
  
  if (M == '') {
    showMessage(monthIn, 'This field is required', errorStyle);
    monthlabel.style.color = 'var(--Light_red)';
    return false;
  } else if (!validMonth(M)) {
    showMessage(monthIn, 'Must be a valid month', errorStyle);
    monthlabel.style.color = 'var(--Light_red)';
    return false;
  } else {
    showMessage(monthIn, '', '');
    return true;
  }
};

// error year validate
yearIn.addEventListener('blur', () => {
  validateYear();
});

// validation year function
const validateYear = () => {
  const Y = yearIn.value;
  const M = monthIn.value;
  const D = dayIn.value;
  if (Y == '') {
    showMessage(yearIn, 'This field is required', errorStyle);
    yearlabel.style.color = 'var(--Light_red)';
    return false;
  } else if (!validYear(Y, M, D)) {
    showMessage(yearIn, 'Must be in past', errorStyle);
    yearlabel.style.color = 'var(--Light_red)';
    return false;
  } else {
    showMessage(yearIn, '', '');
    return true;
  }
};

// Validate Day
function validDay(y, m, d) {
  if (d > getNoOfDays(y, m) || d < 1) return false;
  return true;
}

// validate Month
function validMonth(m) {
  if (m > 12 || m < 1) return false;
  return true;
}

// Validate Year
function validYear(y, m, d) {
  const secondDate = new Date();
  const firstDate = new Date(`${y}-${m}-${d}`);
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
}

//  result message
function showMessage(elem, msg, border) {
  elem.style.border = border;
  elem.nextElementSibling.innerText = msg;
}
