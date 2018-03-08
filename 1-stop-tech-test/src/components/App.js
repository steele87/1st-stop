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
    response: 'Please ensure a valid ID number is used',
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
            incorrect: true
          })
        } else return res.json();
      })
      .then(info => {
        if (info) {
          return this.setState({
            response: info.info[0],
            updated: true,
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
    console.log(this.state)
    return (
      <div>
        <header >
          <img src="https://www.1ststop.co.uk/home-images/top-logo.png" alt="1st stop logo" />
        </header>
        <h1>Customer contact preferences</h1>
        <h4>On occasion we may want to contact you for marketing purposes. Please select your prefered methods of contact and input your unique ID number</h4>

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}
                <label>
                  ID: <input type="text" placeholder="ID number" value={this.state.id} onChange={this.changeId} />
                </label>
                <br />
                <button className="btn btn-default" type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>

      <div>

      </div>



      </div>
    );
  }
}

export default App;
