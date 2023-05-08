import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { PhoneBook } from 'components/PhoneBook/PhoneBook';

class Form extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    name: '',
    number: '',
  };

  SubmitForm = evt => {
    evt.preventDefault();
    this.props.onSubmit({ ...this.state, id: nanoid() });
    this.setState({ name: '', number: '' });
  };

  ChangeInput = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <PhoneBook
        SubmitForm={this.SubmitForm}
        ChangeInput={this.ChangeInput}
        options={this.state}
      />
    );
  }
}

export { Form };
