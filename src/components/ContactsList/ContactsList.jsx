import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contactsSlise/contactsSlice';
import {
  Contacts,
  ContactsItem,
  ContactsItemName,
  ContactsItemNumber,
  ContactBtnDelete,
} from './ContactsList.styled';

const ContactsList = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return (
    <Contacts>
      {contacts &&
        contacts
          .filter(({ text }) =>
            text.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map(({ id, text }) => {
            return (
              <ContactsItem key={id}>
                <ContactsItemName>{text.name}:</ContactsItemName>
                <ContactsItemNumber> {text.number}</ContactsItemNumber>
                <ContactBtnDelete
                  type="button"
                  onClick={() => dispatch(deleteContact(id))}
                >
                  Delete
                </ContactBtnDelete>
              </ContactsItem>
            );
          })}
    </Contacts>
  );
};

export default ContactsList;
