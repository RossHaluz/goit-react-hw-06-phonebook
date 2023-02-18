import { useState, useEffect } from 'react';
import { Container, ContactsListTitle, PhonebookTitle } from './App.styled';
import ContactForm from 'components/AddContacts';
import ContactsList from 'components/ContactsList';
import FilterContacts from 'components/FilterContacts';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('saveContacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('saveContacts', JSON.stringify(contacts));
  }, [contacts]);

  const getNewContact = ({ name, number, id }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const findContact = contacts.find(
      user => user.name === contact.name && user.number === contact.number
    );

    if (findContact) {
      toast.error(`${contact.name} is already in contacts!`);
      return;
    } else {
      toast.success(`${contact.name} successfully added!`);
    }

    setContacts(prevState => [contact, ...prevState]);
  };

  const onChancheInputFilter = e => {
    const { value } = e.currentTarget;

    setFilter(value);
  };

  const getFilterContacts = () => {
    const normilize = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normilize)
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm setContact={getNewContact} />
      <ContactsListTitle>Contacts</ContactsListTitle>
      <h3>Find contacts by name</h3>
      <FilterContacts
        inputValue={filter}
        changeFilterValue={onChancheInputFilter}
      />
      <ContactsList
        contacts={getFilterContacts()}
        onDeleteContact={deleteContact}
      />
      <Toaster position="top-right" />
    </Container>
  );
};

export default App;
