import React from 'react';
import reactDOM from 'react-dom'
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true,
      isRegisterOpen: false
    };
  }
  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isRegisterOpen: true, isLoginOpen: false});
  }
  render() {
    return(
      <div className="root-container">
     
      <div className="box-controller">
        <div className={"controller " + (this.state.isLoginOpen
          ? "selected-controller"
          : "")}
          onClick={this
          .showLoginBox
          .bind(this)}>
            Login
        </div>
        <div
          className={"controller " + (this.state.isRegisterOpen
          ? "selected-controller"
          : "")}
          onClick={this
          .showRegisterBox
          .bind(this)}>
          Register
        </div>
      </div>
      <div className="box-container">
        {this.state.isLoginOpen && <LoginBox/>}
        {this.state.isRegisterOpen && <RegisterBox/>}
      </div>
    </div>
    );
  }
}

class LoginBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {user:"",pass:"",errorLogin:[]};
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errorLogin: [
        ...prevState.errorLogin, {
          elm,
          msg
        }
      ]
    }));
  }

  //Remove a specific element from the array 
  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errorLogin) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errorLogin: newArr};
    });
  }
  onUsernameChange(e) {
    this.setState({user: e.target.value});
    //We want to clear the error when ever the user type something new 
    this.clearValidationErr("user");
  }
  
  onPasswordChange(e) {
    
    this.setState({pass: e.target.value});
    this.clearValidationErr("pass");
  }
  submitLogin(e) {
    var count=0;
    var validateUser,validatePass;
    var pass=this.state.pass;
    if (this.state.user === "") {
      this.showValidationErr("user", "Username Cannot be empty!");
      count++;
    }else if(this.state.user.length<3) {
      this.showValidationErr("user", "Username should be atleast 3 characters long!");
      count++;
    }
    if (pass === "") {
      this.showValidationErr("pass", "Password Cannot be empty!");
      count++;
    }else if(!pass.match(/[a-z]/g) || !pass.match( 
      /[A-Z]/g) || !pass.match( 
      /[0-9]/g) || !pass.match( 
      /[^a-zA-Z\d]/g) || !pass.length >= 8) {
      this.showValidationErr("pass", "Password Must contain atleast 1 lower case character, 1 upper case character, 1 digit, 1 special character and should be 8 characters long!!");
      count++;
    }
    if(count===0){
      validateUser=window.sessionStorage.getItem('username');
      validatePass=window.sessionStorage.getItem('password');

      if(this.state.user===validateUser){
        if(pass===validatePass){
          window.sessionStorage.setItem("user", this.state.user)
          window.sessionStorage.setItem("pass", pass)
          window.location.href = "/home";

        }else{
          this.showValidationErr("pass", "Password Not Matched!");
        }
      }else{
        this.showValidationErr("user", "User Doesnt Exist! Please Register First!");
      }
    }
  }

  

  render() {
    
    let userErr = null,
    passErr = null;
  
    //Loop and find which ones has the error
    for (let err of this.state.errorLogin) {
      //Assign the validation error message 
      if (err.elm === "user") {
        userErr = err.msg;
      }
      if (err.elm === "pass") {
        passErr = err.msg;
      }
    }
  
    return (
      <div className="inner-container">
        <div className="header text-white bg-secondary">
          Login
        </div>
        <div className="container">

          <div className="input-group">
            <label htmlFor="user">Username</label>
            <input
              type="text"
              name="user"
              className="login-input"
              placeholder="Username"
              onChange={this
                .onUsernameChange
                .bind(this)}/>
            <small className="danger-error">{userErr
            ? userErr
            : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              name="pass"
              className="login-input"
              placeholder="Password"
              onChange={this
                .onPasswordChange
                .bind(this)}/>

            <small className="danger-error">{passErr
            ? passErr
            : ""}
            </small>
          </div>

          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitLogin
            .bind(this)}>Login</button>
        </div>
      </div>
    );
  }

}

//Register Box 
class RegisterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name:"",number:"",username:"",email:"",password:"",errors:[]};
  }

  showValidationErr(elm, msg) {
    this.setState((prevState) => ({
      errors: [
        ...prevState.errors, {
          elm,
          msg
        }
      ]
    }));
  }
  //Remove a specific element from the array 
  clearValidationErr(elm) {
    this.setState((prevState) => {
      let newArr = [];
      //Add all elements from the prev array to the new one that has a different element
      for (let err of prevState.errors) {
        if (elm !== err.elm) {
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
    //We want to clear the error when ever the user type something new 
    this.clearValidationErr("username");
  }
  onNameChange(e) {
    this.setState({name: e.target.value});
    //We want to clear the error when ever the user type something new 
    this.clearValidationErr("name");
  }
  
  onNumberChange(e) {
    this.setState({number: e.target.value});
    this.clearValidationErr("number");
  }
  onEmailChange(e) {
    this.setState({email: e.target.value});
    this.clearValidationErr("email");
  }
  
  onPasswordChange(e) {
    
    this.setState({password: e.target.value});
    this.clearValidationErr("password");
  }
  submitRegister(e) {
    var count=0;
    var password=this.state.password;
    if (this.state.name === "") {
      this.showValidationErr("name", "Name Cannot be empty!");
      count++;
    }else if(this.state.name.length<2){
      this.showValidationErr("name", "Name should be atleast two characters!");
      count++;
    }
    if (this.state.number === "") {
      this.showValidationErr("number", "Number Cannot be empty!");
      count++;
    }else if((!/^[0]?[789]\d{9}$/.test(this.state.number))){
      this.showValidationErr("number", "Please enter valid Mobile!");
      count++;
    }
    if (this.state.username === "") {
      this.showValidationErr("username", "Username Cannot be empty!");
      count++;
    }else if(this.state.username.length<3) {
      this.showValidationErr("username", "UserName should be atleast 3 characters long!");
      count++;
    }
    
    if (this.state.email === "") {
      this.showValidationErr("email", "Email Cannot be empty!");
      count++;
    }else if((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email))){
      this.showValidationErr("email", "Please enter valid email id!");
      count++;
    }
    if (password === "") {
      this.showValidationErr("password", "Password Cannot be empty!");
      count++;
    }else if(!password.match(/[a-z]/g) || !password.match( 
      /[A-Z]/g) || !password.match( 
      /[0-9]/g) || !password.match( 
      /[^a-zA-Z\d]/g) || !password.length >= 8) {
      this.showValidationErr("password", "Password Must contain atleast 1 lower case character, 1 upper case character, 1 digit, 1 special character and should be 8 characters long!");
      count++;
    }
    if(count===0){
      window.sessionStorage.setItem("name", this.state.name);
      window.sessionStorage.setItem("number", this.state.number);
      window.sessionStorage.setItem("email", this.state.email);
      window.sessionStorage.setItem("password", password);
      window.sessionStorage.setItem("username", this.state.username);
      window.location.reload(false); 
    }
    
  }

  render() {
    let usernameErr = null,
      passwordErr = null,
      emailErr = null,
      nameErr = null,
      numberErr = null;

    
    //Loop and find which ones has the error
    for (let err of this.state.errors) {
      //Assign the validation error message 
      if (err.elm === "username") {
        usernameErr = err.msg;
      }
      if (err.elm === "password") {
        passwordErr = err.msg;
      }
      if (err.elm === "email") {
        emailErr = err.msg;
      }
      if (err.elm === "name") {
        nameErr = err.msg;
      }
      if (err.elm === "number") {
        numberErr = err.msg;
      }
    }
    
    
    return (
      
      <div className="inner-container">
        <div className="header text-white bg-secondary">
          Register
        </div>
        <div className="container">
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="login-input"
              placeholder="Name"
              onChange={this
                .onNameChange
                .bind(this)}/>
            <small className="danger-error">{nameErr
            ? nameErr
            : ""}
            </small>
          </div>
          <div className="input-group">
            <label htmlFor="number">Mobile</label>
            <input
              type="text"
              name="number"
              className="login-input"
              placeholder="Number"
              onChange={this
                .onNumberChange
                .bind(this)}/>
            <small className="danger-error">{numberErr
            ? numberErr
            : ""}
            </small>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              className="login-input"
              placeholder="Username"
              onChange={this
                .onUsernameChange
                .bind(this)}/>
            <small className="danger-error">{usernameErr
            ? usernameErr
            : ""}
            </small>
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"
             onChange={this
              .onEmailChange
              .bind(this)}/>
            <small className="danger-error">{emailErr
            ? emailErr
            : ""}
            </small>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={this
                .onPasswordChange
                .bind(this)}/>
            <small className="danger-error">{passwordErr
            ? passwordErr
            : ""}
            </small>
          </div>
          
          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitRegister
            .bind(this)}>Register
          </button>
        </div>
      </div>
    );
  }
}

reactDOM.render(
  <App />, document.getElementById("root"));

export default App;