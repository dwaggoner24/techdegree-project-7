//*Adding focus to the name field in order to highlight the specified area*/
const nameField = document.getElementById('name');
nameField.focus();

//*Job Role Section. */
const jobRole = document.getElementById('title'); 
const otherJobs = document.getElementById('other-job-role');

otherJobs.style.display = 'none'; //*element does not show when page loads*/

jobRole.addEventListener('change', (e) => {    //*Eventlistener that shows "other jobs" when "other" is clicked and hides when not clicked*/
    if(e.target.value === 'other'){
        otherJobs.style.display = 'block';
    } else {
        otherJobs.style.display = 'none'
    }
});

//*T-shirt info section*/
const design = document.getElementById('design');
const color = document.getElementById('color');
const colorOptions = document.getElementById('color').children; //*variable accessing color selection under color element*/

color.setAttribute('disabled', true);


design.addEventListener('change', (e) => {     //*enabling and disabling the drop down color menu when specific steps are met, such as choosing the design and then the color menu enables*/
    color.disabled = false;

    for(let i = 1; i < colorOptions.length; i++){
        let colorValue = e.target.value;
        let dataTheme = colorOptions[i].getAttribute('data-theme');
        
        if(colorValue === dataTheme){
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute('selected', true);
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute('selected');
        }
    }
});

//*Register for Activities section*/
const activities = document.getElementById('activities');
const activityCost = document.getElementById('activities-cost');
let totalCost = 0;


activities.addEventListener('change', (e) => {
    let cost = e.target.getAttribute('data-cost');
    cost = parseInt(cost);
    if(e.target.checked) {
        totalCost += cost;
    } else {
        totalCost -= cost;
    }
    activityCost.innerHTML = `Total: $${totalCost}`
});

//*Payment information*/ 
const paymentType = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');

payPal.style.display = 'none'; //*will not show unless dropdown menu is initiated*/
bitCoin.style.display = 'none';

paymentType[1].setAttribute('selected', true); //*will make creditcard the default*/

paymentType.addEventListener('change', (e) => { //*shows appropriate field to fill in once payment type is selected*/
    if(e.target.value === 'credit-card'){
        creditCard.style.display = 'block';
        payPal.style.display = 'none'; 
        bitCoin.style.display = 'none';
    } 
    if (e.target.value === 'paypal') {
        payPal.style.display = 'block'; 
        bitCoin.style.display = 'none';
        creditCard.style.display = 'none';
    } 
    if (e.target.value === 'bitcoin'){
        bitCoin.style.display = 'block';
        creditCard.style.display = 'none';
        payPal.style.display = 'none'; 
    }
}); 

//*Form Validation*/
const email = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
//const nameField = document.getElementById('name');
//const activities = document.getElementById('activities');

function validName() { //*validates name relative to regex and added valid or not valid class accordingly./
    let nameVal = nameField.value;
    let nameData = /^[a-z]/i.test(nameVal);
    if(!nameData){
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.lastElementChild.style.display = 'block';
    } else {
        nameField.parentElement.classList.add('valid');
        return true;
    }
};

function validEmail(){//*validates email relative to regex and added valid or not valid class accordingly./
    let emailVal = email.value;
    let emailData = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailVal);
    if(!emailData){
        email.parentElement.classList.add('not-valid');
        email.parentElement.lastElementChild.style.display = 'block';
    } else {
        email.parentElement.classList.add('valid');
        return true;
    }
};

function validActivity(){//*validates activities relative to regex and added valid or not valid class accordingly./
    if(totalCost === 0){
        activities.classList.add('not-valid');
        activities.parentElement.lastElementChild.style.display = 'block';
    } else {
        activities.classList.add('valid');
        return true;
    }
};

function validCard(){ //*validates card number relative to regex and added valid or not valid class accordingly./
    let cardVal = cardNum.value;
    let cardData = /^\d{13,16}$/.test(cardVal);
    if(!cardData){
        cardNum.parentElement.classList.add('not-valid');
        cardNum.parentElement.lastElementChild.style.display = 'block';
    } else {
        cardNum.parentElement.classList.add('valid');
        return true;
    }
};

function validCvv(){ //*validates cvv number relative to regex and added valid or not valid class accordingly./
    let cvvVal = cvv.value;
    let cvvData = /^\d{3}$/.test(cvvVal);
    if(!cvvData){
        cvv.parentElement.classList.add('not-valid');
        cvv.parentElement.lastElementChild.style.display = 'block';
    } else {
        cvv.parentElement.classList.add('valid');
        return true;
    }
};

function validZip(){ //*validates zipcode relative to regex and added valid or not valid class accordingly./
    let zipVal = zipCode.value;
    let zipData = /^\d{5}$/.test(zipVal);
    if(!zipData){
        zip.parentElement.classList.add('not-valid');
        zip.parentElement.lastElementChild.style.display = 'block';
    } else {
        zip.parentElement.classList.add('valid');
        return true;
    }
};

form.addEventListener('submit', (e) => { //*eventlistener that is activiated and provides warning that something is not right in one or more fields info is added*/
    if(!validName()){
        e.preventDefault();
    }
    if(!validEmail()){
        e.preventDefault();
    }
    if(!validActivity()){
        e.preventDefault();
    }
    if(paymentType.value === 'credit-card'){
        if(!validCard()){
            e.preventDefault();
        }
        if(!validCvv()){
            e.preventDefault();
        }
        if(!validZip()){
            e.preventDefault();
        }
    }
});

//*Accessability*/
const checkbox = document.querySelectorAll('.activities-box input');

for(let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('focus', (e) => {
        checkbox[i].parentNode.classList.add('focus');
    });
    checkbox[i].addEventListener('blur', (e) => {
        checkbox[i].parentNode.classList.add('blur');
    });
};