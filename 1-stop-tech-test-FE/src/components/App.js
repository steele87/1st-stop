import React, { Component } from 'react';
import Checkbox from './Checkbox';
import '../App.css';
import addMarketing from '../api';

const items = [
  'sms',
  'email',
  'telephone',
  'post',
];

class App extends Component {

  state = {
    sms: 'no',
    email: 'no',
    telephone: 'no',
    post: 'no',
    id: '',
    updated: false,
    incorrect: false,
    response: 'Sorry the number provided is incorrect. Please ensure a valid ID number is used',
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  changeId = (event) => {
    this.setState({
      id: event.target.value
    })
  }

  handleFormSubmit = (formSubmitEvent) => {
    formSubmitEvent.preventDefault();
    for (const checkbox of this.selectedCheckboxes) {
      for (let key in this.state) {
        if (key === checkbox) {
          this.newMethod()[key] = 'yes';
        }
      }
    }
    addMarketing(this.state.sms, this.state.email, this.state.telephone, this.state.post, this.state.id)
      .then(res => {
        if (res.status === 500 || res.status === 400) {
          return this.setState({
            incorrect: true,
            updated: false,
            response: 'Sorry the number provided is incorrect. Please ensure a valid ID number is used',
          })
        } else return res.json();
      })
      .then(info => {
        if (info) {
          this.setState({
            response: info.info[0],
            updated: true,
            incorrect: false,
          })
        }
      })
      .then(() => {
        return this.setState({
          sms: 'no',
          email: 'no',
          telephone: 'no',
          post: 'no',
        })
      })
  }

  createCheckbox = label => (
    <Checkbox
      label={label}
      handleCheckboxChange={this.toggleCheckbox}
      key={label}
    />
  )

  createCheckboxes = () => (
    items.map(this.createCheckbox)
  )

  newMethod() {
    return this.state;
  }

  render() {
    return (
      <div>
        <header >
          <img src="https://www.1ststop.co.uk/home-images/top-logo.png" alt="1st stop logo" />
        </header>
        <h1>Customer contact preferences  </h1>
        <div className="logos"><i className="logo fas fa-mobile fa-3x"></i> <i className="logo fas fa-at fa-3x"></i> <i className="logo fas fa-phone fa-3x"></i> <i className="logo far fa-envelope fa-3x"></i> </div>
        <h4>On occasion we may want to contact you for marketing purposes. Please select your prefered methods of contact and input your unique ID number</h4>
        <hr />

        <div>
          <form onSubmit={this.handleFormSubmit}>
            {this.createCheckboxes()}
            <hr />
            <label>
              ID: <input className="textBox" type="text" placeholder="ID number" value={this.state.id} onChange={this.changeId} />
            </label>
            <br />
            <hr />
            <button className="btn btn-default" type="submit">Save</button>
          </form>
          <br />          
        </div>

        <div>
          {this.state.updated ?
            <div className="valid">
              <h5>Details successfully updated:</h5>
              <p>sms: {this.state.response.sms}</p>
              <p>email: {this.state.response.email}</p>
              <p>telephone: {this.state.response.telephone}</p>
              <p>post: {this.state.response.post}</p>
            </div> :
            <p></p>
          }
        </div>

        <div>
          {this.state.incorrect ?
            <div className="invalid">
              <h5>{this.state.response}</h5>
            </div> :
            <p></p>
          }
        </div>
      </div>
    );
  }
}

export default App;
