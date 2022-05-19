let loginFormDisplay;
let logout = false;
$(document).ready(() => {
    loginFormDisplay = true;
    var token = localStorage.getItem('photo-token');
    let browseButton = document.getElementById('browse-button');
    if (token != null && token != undefined) {
        let opener = document.getElementById('log-sign-opener');
        opener.innerText = 'Logout';
        logout = true;
        browseButton.innerText = "My Photo";
    } else browseButton.innerText = "Browse";
});


let loginOpener = () => {
    if (logout) {
        localStorage.removeItem('photo-token');
        location.reload();
        return;
    }

    var box = document.getElementById('login-form');
    if (box.style.visibility === 'hidden' || box.style.visibility === '')
        box.style.visibility = 'visible';
    else box.style.visibility = 'hidden';
    if (box.classList.contains('animate__backInDown')) {
        box.classList.remove('animate__backInDown');
        box.classList.add('animate__backOutUp');
    } else {
        if (box.classList.contains('animate__backOutUp'))
            box.classList.remove('animate__backOutUp');
        box.classList.add('animate__backInDown');
    }
}
let login = () => {
    let emailField;
    let passwordField;
    let phoneField;
    let route;
    if (loginFormDisplay) {
        emailField = document.getElementById('email');
        passwordField = document.getElementById('password');
        phoneField = '';
        route = 'login.php';
    } else {
        emailField = document.getElementById('email-signup');
        passwordField = document.getElementById('password-signup');
        phoneField = document.getElementById('phone-signup').value;
        route = "signup.php";
    }
    $.ajax({
        type: "post",
        url: `/photograph/php/${route}`,
        data: {
            email: emailField.value,
            password: passwordField.value,
            phone: phoneField
        },
        // dataType: "application/json",
        success: (response, status) => {
            const json = JSON.parse(JSON.stringify(response));
            console.log(json);
            if (json.code == 200)
                saveTokenIntoCookie(json.token);
            else alert(json.msg);
        },
        error: (xhr, status, error) => {
            console.log(status);
            console.log(xhr.responseText);
        }
    });
}

let signUpButton = () => {
    let loginForm = document.getElementById('form');
    let signUpForm = document.getElementById('form-sign-up');
    let boxTitle = document.getElementById('box-title');
    let button = document.getElementById('button');
    let show_no_account = document.getElementById('show_no_account');
    let opener = document.getElementById('log-sign-opener');
    let create_btn = document.getElementById('create_btn');
    if (loginFormDisplay) {
        loginForm.style.display = 'none';
        signUpForm.style.display = 'block';
        boxTitle.innerText = 'Sign Up';
        button.value = 'SignUp';
        show_no_account.style.display = 'none';
        create_btn.innerText = 'Back to login';
        opener.innerText = 'Sign Up';
    } else {
        loginForm.style.display = 'block';
        signUpForm.style.display = 'none';
        boxTitle.innerText = 'Log In';
        button.value = 'Login';
        show_no_account.style.display = 'inline-block';
        create_btn.innerText = 'Create';
        opener.innerText = 'Login';
    }
    loginFormDisplay = !loginFormDisplay;
}

let saveTokenIntoCookie = token => {
    console.log(token);
    localStorage.setItem('photo-token', token);
    location.reload();
}
let moveToBrowse = () => {
    if (logout) {
        location.href = `my_photo.html`;
    } else
        location.href = 'browse.html';
}