let loginUserName = document.querySelector("#loginUserName");
let loginPassWord = document.querySelector("#loginPassWord");
let loginHome = document.querySelector("#login");

let registerUserName = document.querySelector("#registerUserName");
let registerName = document.querySelector("#registerName");
let registerEmail = document.querySelector("#registerEmail");
let registerPhone = document.querySelector("#registerPhone");
let registerPassword = document.querySelector("#registerPassword");
let registerConfirmPassword = document.querySelector("#registerConfirmPassword");
const key_data = "users_data";

class User {
    constructor(userName, passWord, name, email, phoneNumber) {
        this.userName = userName;
        this.passWord = passWord;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
};

var users = [];

function init() {
    if (getData(key_data) == null) {
        users = [
            new User("admin", "admin", "Ly Thanh Tung", "lythanhtung.work@gmail.com", "0987654321"),
            new User("user1", "1234", "Le Ngoc Anh", "lengocanh.work@gmail.com", "0987654321"),
            new User("user2", "1234", "Tran Thanh Toan", "tranthanhtoan.work@gmail.com", "0987654321"),
            new User("user3", "1234", "Nguyen Ngoc Quynh Nhu", "nguyenngocquynhnhu.work@gmail.com", "0987654321")
        ];
        setData(key_data, users);
    }
    else {
        users = getData(key_data);
    }
}

function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function submitLogin() {
    let count = 0;
    for (let i = 0; i < users.length; i++) {

        if (loginUserName.value == users[i].userName && loginPassWord.value == users[i].passWord) {
            count++;
        }
    }
    if (count > 0) {
        alert("Logged in successfully");
        loginHome.href = "home.html";
    }
    else {
        if (loginUserName.value.trim() == "") {
            alert("Please enter your username!");
        }
        if (loginPassWord.value.trim() == "") {
            alert("Please enter your password!");
        }
        if (loginPassWord.value.trim() != "" && loginPassWord.value.trim() != "") {
            alert("Wrong username or password");
        }
    }
}

function signUp(){
    document.querySelector(".login-box").classList.add('d-none');
    document.querySelector(".register-box").classList.remove('d-none');
}

function cancelRegister(){
    document.querySelector(".login-box").classList.remove('d-none');
    document.querySelector(".register-box").classList.add('d-none');
    clear();
}

function clear(){
    registerUserName.value = "";
    registerName.value = "";
    registerEmail.value = "";
    registerPhone.value = "";
    registerPassword.value = "";
    registerConfirmPassword.value = "";
}

function submitRegister(){
    if (registerUserName.value.trim() == ""){
        alert("Please enter your username");
    }
    if (registerName.value.trim() == ""){
        alert("Please enter your name");
    }
    if (registerEmail.value.trim() == ""){
        alert("Please enter your email");
    }
    if (registerPhone.value.trim() == ""){
        alert("Please enter your phone number");
    }
    if (registerPassword.value .trim()== ""){
        alert("Please enter your password");
    }
    if (registerConfirmPassword.value.trim() == ""){
        alert("Please enter your confirm password");
    }

    if (registerUserName.value != "" && registerName.value != ""
        && registerEmail.value != "" && registerPhone.value != ""
        && registerPassword.value != "" && registerConfirmPassword.value != ""){
            if (registerPassword.value == registerConfirmPassword.value){
                alert("Register is successfully");
                users.push(new User(registerUserName.value, registerPassword.value, 
                    registerName.value, registerEmail.value, registerPhone.value));
                setData(key_data, users);
                cancelRegister();
                loginUserName.value ="";
                loginPassWord.value = "";
            } else{
                alert("Password and confirm password not match!");
                registerPassword.value = "";
                registerConfirmPassword.value = "";
            }
    }
}

function ready() {
    init();
}
ready();