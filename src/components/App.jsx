import React from 'react';
import { Form } from './Form/Form';
import { Wrapper, Title } from './App.styled';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/ContactList';
export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = data =>
    this.setState(prevState => {
      const contacts = prevState.contacts;
      if (contacts.find(({ name }) => name === data.name)) {
        return alert(`${data.name} is already in contacts`);
      }
      return { contacts: [data, ...contacts] };
    });

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      return contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    } else {
      return contacts.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  removeContact = e => {
    const { contacts } = this.state;
    const idx = contacts.findIndex(
      contact => contact.id === e.target.dataset.id
    );
    contacts.splice(idx, 1);
    this.setState({ contacts: contacts });
  };
  render() {
    const { filter } = this.state;
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <Form onSubmit={this.onSubmit} />

        <Title>Contacts</Title>
        <Filter filter={filter} onChange={this.handleChangeFilter} />
        <ContactList
          contacts={this.filteredContacts()}
          onRemove={this.removeContact}
        />
      </Wrapper>
    );
  }
}
