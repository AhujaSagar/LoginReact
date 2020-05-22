import React from 'react';
import reactDOM from 'react-dom'
import './App.css';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHomeOpen: true,
      isEditOpen: false
    };
  }
  showLoginBox() {
    this.setState({isHomeOpen: true, isEditOpen: false});
  }

  showEditBox() {
    this.setState({isEditOpen: true, isHomeOpen: false});
  }
  render() {
    return(
      <div className="root-container">
     
      <div className="box-controller">
        <div className={"controller " + (this.state.isHomeOpen
          ? "selected-controller"
          : "")}
          onClick={this
          .showLoginBox
          .bind(this)}>
            Home
        </div>
        <div
          className={"controller " + (this.state.isEditOpen
          ? "selected-controller"
          : "")}
          onClick={this
          .showEditBox
          .bind(this)}>
          Edit
        </div>
      </div>
      <div className="box-container">
        {this.state.isHomeOpen && <HomeBox/>}
        {this.state.isEditOpen && <EditBox/>}
      </div>
    </div>
    );
  }
}
class HomeBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name:window.sessionStorage.getItem("name"),number:window.sessionStorage.getItem("number"),username:window.sessionStorage.getItem("username"),email:window.sessionStorage.getItem("email"),password:window.sessionStorage.getItem("password"),errors:[]};
  }
  render() {
    var name=this.state.name;
    var email=this.state.email;
    var number=this.state.number;
    var password=this.state.password;
    var username=this.state.username;

    return(
      <div>
        <div className="header text-white bg-secondary">
          User Info
        </div>
        <div className="container">
          <div className="table table-striped">
            <table>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{name}</td>
                </tr>
                <tr>
                  <th>UserName</th>
                  <td>{username}</td>
                </tr>
                <tr>
                  <th>Mobile</th>
                  <td>{number}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{email}</td>
                </tr>
                <tr>
                  <th>Password</th>
                  <td>{password}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
     );
  }
}

class EditBox extends React.Component {

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

  submitEdit(e) {
    var count=0;
    var flag=true;
    var password=this.state.password;

    if (this.state.name !== "") {
      if(this.state.name.length<2){
        flag=false;
        this.showValidationErr("name", "Name should be atleast two characters!");
      }else{
        count++;
      }
    }
    if (this.state.number !== "") {
      if((!/^[0]?[789]\d{9}$/.test(this.state.number))){
        flag=false;
        this.showValidationErr("number", "Please enter valid Mobile!");
      }else{
        count++;
      }
    }
    if (this.state.username !== "") {
      if(this.state.username.length<3) {
        flag=false;
        this.showValidationErr("username", "UserName should be atleast 3 characters long!");
      }else{
        count++;
      }
    }
    if (this.state.email !== "") {
      if((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email))){
        flag=false;
        this.showValidationErr("email", "Please enter valid email id!");
      }else{
        count++;
      }
    }
    if (password !== "") {
        if(!password.match(/[a-z]/g) || !password.match( 
          /[A-Z]/g) || !password.match( 
          /[0-9]/g) || !password.match( 
          /[^a-zA-Z\d]/g) || !password.length >= 8) {
          flag=false;
          this.showValidationErr("password", "Password Must contain atleast 1 lower case character, 1 upper case character, 1 digit, 1 special character and should be 8 characters long!!");
        }else{
              count++;
        }
    }
       
    if(count!==0 && flag){
      if (this.state.name !== "") {
        window.sessionStorage.setItem("name", this.state.name)
      }
      if (this.state.number !== "") {
        window.sessionStorage.setItem("number", this.state.number);
      }
      if (this.state.username !== "") {
        window.sessionStorage.setItem("username", this.state.username);
      }
      if (this.state.email !== "") {
        window.sessionStorage.setItem("email", this.state.email);
      }
      if(password !== ""){
        window.sessionStorage.setItem("password", password)
      };
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
    return(
      //Edit Box 
      <div className="inner-container">
        <div className="header text-white bg-secondary">
          Edit
        </div>
        <div className="container">
          <div className="box">
          <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="login-input" placeholder="Name"
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
              <input type="text" name="number" className="login-input" placeholder="Number"
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
              <input type="email" name="email" className="login-input" placeholder="Email"
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
              .submitEdit
              .bind(this)}>Edit</button>
          </div>
        </div>
      </div>
    );
  }
}

reactDOM.render(
  <Home />, document.getElementById("root"));

export default Home;