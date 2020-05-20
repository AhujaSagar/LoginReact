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

  showRegisterBox() {
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
          .showRegisterBox
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
          <div class="container">
          <div>Name: {name}</div>
          <div>UserName: {username}</div>
          <div>Number: {number}</div>
          <div>Email: {email}</div>
          <div>Password: {password}</div>
          </div>
     );
  }
}

class EditBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name:"",number:"",username:"",email:"",password:""};
  }

  onUsernameChange(e) {
    this.setState({username: e.target.value});
    
  }
  onNameChange(e) {
    this.setState({name: e.target.value});
   
  }
  
  onNumberChange(e) {
    this.setState({number: e.target.value});
  }
  onEmailChange(e) {
    this.setState({email: e.target.value});
  }
  
  onPasswordChange(e) {
    
    this.setState({password: e.target.value});
  }
  submitEdit(e) {
    var count=0;
    if (this.state.name !== "") {
      window.sessionStorage.setItem("name", this.state.name);
      count++;
    }
    if (this.state.number !== "") {
      window.sessionStorage.setItem("number", this.state.number);
      count++;
    }
    if (this.state.username !== "") {
      window.sessionStorage.setItem("username", this.state.username);
      count++;
    }
    if (this.state.email !== "") {
      window.sessionStorage.setItem("email", this.state.email);
      count++;
    }
    if (this.state.password !== "") {
      window.sessionStorage.setItem("password", this.state.password);
      count++;
    }
    if(count!==0){
      window.location.reload(false); 
    }
  }
  render() {
    return(
      //Register Box 
      <div className="inner-container">
        <div className="header">
          Edit
        </div>
        <div className="box">
        <div className="input-group">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" className="login-input" placeholder="Name"
                onChange={this
                .onNameChange
                .bind(this)}/>
          </div>
          
          <div className="input-group">
            <label htmlFor="number">Number</label>
            <input type="text" name="number" className="login-input" placeholder="Number"
              onChange={this
              .onNumberChange
              .bind(this)}/>
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
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" className="login-input" placeholder="Email"
              onChange={this
              .onEmailChange
              .bind(this)}/>
          </div>


          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
                onChange={this
                .onEmailChange
                .bind(this)}/>

          </div>
          <button
            type="button"
            className="login-btn"
            onClick={this
            .submitEdit
            .bind(this)}>Register</button>
        </div>
      </div>
    );
  }
}

reactDOM.render(
  <Home />, document.getElementById("root"));

export default Home;