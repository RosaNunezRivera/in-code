'use strict';

//Import utilities functions  
import {
    onEvent,
    select,
    selectById,
    selectAll,
    print,
    randomNumber,
    create,
} from "./utils.js";


/*--------------------------------------------------------------------------------*/
/* Function: Storage the username $ password in local storea                      */
/*--------------------------------------------------------------------------------*/
storeLoginInformation();

/*--------------------------------------------------------------------------------* /
/* Validating the User's login                                                       */
/*--------------------------------------------------------------------------------*/
//Creating HTML elements 
const userInput = selectById('user');
const passwordInput = selectById('password');

//Creating HTML elements error message 
const errorMessage = select('.error-message');

/*--------------------------------------------------------------------------------*/
/* Function: validUser()                                               */
/*--------------------------------------------------------------------------------*/
function validUser() {
    // Regular expression for email validation
    let user = userInput.value.trim().toLowerCase();;
    const minLength = 6;
    const maxLength = 12;

    const userPattern = /^[a-zA-Z0-9]{6,12}$/;

    if (user.length < minLength || user.length > maxLength || !userPattern.test(user)) {

        return false;
    }
    errorMessage.textContent = "";
    return true;
}

/*--------------------------------------------------------------------------------*/
/* Function: validatePassword()
/*--------------------------------------------------------------------------------*/
function validatePassword() {
    let password = passwordInput.value.trim();
    const minLength = 5;
    const maxLength = 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

    if (password.length < minLength || password.length > maxLength || !hasUppercase || !hasLowercase || !hasSpecialChar) {
        return false;
    }
    // Password is valid
    errorMessage.textContent = "";
    return true;
}

/*--------------------------------------------------------------------------------*/
/* Function: To Submit the form with valid information                            */
/*--------------------------------------------------------------------------------*/
const loginBtn = select('.login-btn');

loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let isUserValid = validUser();
    let isPasswordValid = validatePassword();

    if (!isUserValid || !isPasswordValid) {
        errorMessage.textContent = "Invalid user or password";
        errorMessage.style.display = "block";
    } else {
        valideteLogIn();
    }
});


function valideteLogIn() {
    if (localStorage.length > 0 && localStorage.isLoggedIn) {
        if (localStorage.userName === userInput.value.trim() && localStorage.password === passwordInput.value.trim()) {
            window.location.href = 'home.html';
        } else {
            errorMessage.textContent = "Invalid user or password";
            errorMessage.style.display = "block";
        }
    } else {
        errorMessage.textContent = "Invalid user or password";
        errorMessage.style.display = "block";
    }
}

/*--------------------------------------------------------------------------------*/
/* Function: Save user name & password on Local Store                             */
/*--------------------------------------------------------------------------------*/
function storeLoginInformation() {
    //Validate it local store exist 
    let isLoggedIn = true;
    let user = 'RosaN7';
    let password = 'Rosa1@';

    if (localStorage.length > 0 && localStorage.isLoggedIn) {
    } else {
        localStorage.setItem('userName', user);
        localStorage.setItem('password', password);
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }
}




