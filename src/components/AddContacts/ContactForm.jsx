import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  FormContact,
  FormLable,
  FormInput,
  FormButton,
  Error,
} from './ContactForm.styled';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlise/contactsSlice';

let schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().required(),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmitForm = (values, { resetForm }) => {
    const findName = contacts.find(
      contact =>
        contact.text.name === values.name &&
        contact.text.number === values.number
    );

    if (findName) {
      alert(`${values.name} is already in contacts!`);
      return;
    } else {
      alert(`${values.name} successfully added!`);
    }

    dispatch(addContact(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmitForm}
    >
      <FormContact>
        <FormLable htmlFor="">Name</FormLable>
        <FormInput type="text" name="name" />
        <Error component="p" name="name" />

        <FormLable htmlFor="">Number</FormLable>
        <FormInput type="tel" name="number" />
        <Error component="p" name="number" />

        <FormButton type="submit">Add contact</FormButton>
      </FormContact>
    </Formik>
  );
};

export default ContactForm;
