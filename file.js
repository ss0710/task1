
function redirect(){
    window.location.href="login.html";
}

function redirectToSignup(){
    window.location.href="index.html"
}

//login

function login(loginEmail, loginPassword) {
    var user_data = new Array();
    user_data = JSON.parse(localStorage.getItem("users"))? JSON.parse(localStorage.getItem("users")) : [];

    if(user_data.some(function(data){
        return data.email==loginEmail && data.password==loginPassword;
    })){
        alert("login successful");
        var current_user = user_data.filter(function(data){
            return data.email==loginEmail && data.password==loginPassword;
        })[0];
        localStorage.setItem("currentUserEmail", current_user.email);
        localStorage.setItem("currentUserName", current_user.name);
        window.location.href="homePage.html"
    } else {
        alert("Wrong email or password");
    }
}

function logInVallidation(){
    var loginEmail = document.getElementById("login_email").value;
    var loginPassword = document.getElementById("login_password").value;

    if(loginEmail && loginPassword){
        if(EmailValidate(loginEmail) === "valid"){

            login(loginEmail, loginPassword);

        } else {

            document.getElementById("signup-error-message").innerHTML = EmailValidate(loginEmail);
            
        }
    } else {
        if(!loginPassword){
            document.getElementById("signup-error-message").innerHTML = "Enter password";
        }
        if(!loginEmail){
            document.getElementById("signup-error-message").innerHTML = "Enter Email";
        }  
    }
}

//Signup

function signUp(Email, Name, PhoneNumber, Password){
    var users_data = new Array();
    if(JSON.parse(localStorage.getItem("users"))){
        users_data = JSON.parse(localStorage.getItem("users"));
    }
    
    if(users_data.some(function(data){
        return data.email == Email; 
    })){
        alert("Email already exit, Register with different email");
    } else {
    users_data.push({
        "email": Email,
        "name": Name,
        "phoneNumber": PhoneNumber,
        "password": Password
    })
        localStorage.setItem("users", JSON.stringify(users_data));
        alert("Successfully registered");
        window.location.href="login.html";
    }
}

function EmailValidate(email){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)) {
        return "valid";
    } else {
        return "Invalid email address";
    }
}

function PhoneNumberValidate(phoneNumber){
    if(phoneNumber.length == 10) {
        return "valid";
    } else {
        return "Invalid Phone Number"
    }
}

function passwordValidate(password){
    console.log(password);  
    var a = /([a-z])/;
    if(password.match(a)){
        var b = /([A-Z])/;
        if(password.match(b)){
            var c = /([0-9])/;
            if(password.match(c)){
                if(password.length >= 7){
                    return "valid";
                } else {
                    return "password must contain atleast 7 characters"
                }
            } else {
                return "password must conatin atleast one number"
            }
        } else {
            return "password must include uppercase letter (A-Z)";
        }
    } else {
        return "password must include lowercase letter (a-z)";
    }
}

function signUpVallidation(){
    var Email = document.getElementById("email").value;
    var Name = document.getElementById("name").value;
    var PhoneNumber = document.getElementById("phoneNumber").value;
    var Password = document.getElementById("password").value;

    var EmailValidator = false, NameValidator=false, PhoneNumberValidator = false, PasswordVallidator = false;

    //vallidation logic
    if(Email) EmailValidator=true;
    if(Name) NameValidator=true;
    if(PhoneNumber) PhoneNumberValidator=true;
    if(Password) PasswordVallidator=true;

    if(EmailValidator && NameValidator && PhoneNumberValidator && PasswordVallidator) {
        if(EmailValidate(Email) === "valid" && PhoneNumberValidate(PhoneNumber) === "valid" && passwordValidate(Password) === "valid"){
            signUp(Email, Name, PhoneNumber, Password);
        } else {
            if(EmailValidate(Email) != "valid") {
                document.getElementById("signup-error-message").innerHTML = EmailValidate(Email);
            }
            if(PhoneNumberValidate(PhoneNumber) != "valid") {
                document.getElementById("signup-error-message").innerHTML = PhoneNumberValidate(PhoneNumber);
            }
            if(passwordValidate(Password) != "valid") {
                document.getElementById("signup-error-message").innerHTML = passwordValidate(Password);
            }
        }
    } else {
        if(!PasswordVallidator){
            document.getElementById("signup-error-message").innerHTML = "Password required";
        }
        if(!PhoneNumberValidator){
            document.getElementById("signup-error-message").innerHTML = "Phone Number required";
        }
        if(!NameValidator){
            document.getElementById("signup-error-message").innerHTML = "Name required";
        }
        if(!EmailValidator){
            document.getElementById("signup-error-message").innerHTML = "Email required";
        }
    } 
}