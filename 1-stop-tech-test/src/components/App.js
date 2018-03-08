import React, { Component } from 'react';
import Checkbox from './Checkbox';
import '../App.css';

const items = [
  'sms',
  'email',
  'telephone',
  'post',
];

class App extends Component {

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

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
    }
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

  render() {
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

                <button className="btn btn-default" type="submit">Save</button>
              </form>

            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
