
/*function validateField() {
    var is_valid = true;

    var userName = document.getElementById('txtName');
    var userNameError = document.getElementById('u_error');
    if (userName.value.length < 5) {
        userNameError.style.display = "block";
        is_valid = false;
    } else {
        userNameError.style.display = "none";
    }

    var email = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    var emailPattern =/^[a-z]+[a-z0-9._-]*@[a-z]+\.[a-z]{2,}$/; 
    //var emailPattern = /^[a-z0-9._-]+@[a-z]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        emailError.style.display = "block";
        is_valid = false;
    } else {
        emailError.style.display = "none";
    }

    /*var password = document.getElementById('password');
    var passwordError = document.getElementById('passwordError');
    if (password.value.length < 6) {
        passwordError.style.visibility = "visible";
        is_valid = false;
    } else {
        passwordError.style.visibility = "hidden";
    }

    var confirmPassword = document.getElementById('confirmPassword');
    var confirmPasswordError = document.getElementById('confirmPasswordError');
    if (password.value !== confirmPassword.value) {
        confirmPasswordError.style.visibility = "visible";
        is_valid = false;
    } else {
        confirmPasswordError.style.visibility = "hidden";
    }



    return is_valid;*/
/*
document.getElementById('showPassword').addEventListener('change', function () {
    var password = document.getElementById('password');
    var confirmPassword = document.getElementById('confirmPassword');
    if (this.checked) {
        password.type = "text";
        confirmPassword.type = "text";
    } else {
        password.type = "password";
        confirmPassword.type = "password";
    }
});*/



