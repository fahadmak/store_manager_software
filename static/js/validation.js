function validate(){

    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm_password");
    let signup_button = document.getElementById("submit");

    if (password.value === confirm_password.value){
        confirm_password.innerText = "password does not match";
        confirm_password.style.backgroundColor = '#91f191';
        confirm_password.display = "block";
        signup_button.disabled = false;
    } else {
        confirm_password.style.backgroundColor = '#f1001a';
        confirm_password.display = "block";
        signup_button.disabled = true;
    }

}