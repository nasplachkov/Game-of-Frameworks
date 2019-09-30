import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Logo } from '../components/logo';
import { Title } from '../components/title';
import { Field } from '../components/field';
import authentication from '../services/authentication';

const signUpSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required')
    .matches(/\w{6,}/, 'Password must be at least 6 characters'),
  passwordConfirm: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  fullName: Yup
    .string()
    .matches(/\w+/)
    .required('First and Last names are required'),
  phone: Yup
    .string()
    .matches(/^[0-9-]+$/, 'Phone can contain only digits and dashes')
    .required('Phone is required'),
  address: Yup
    .string()
    .required('Address is required')
    .matches(/\w+/)
});

export function SignUp(props) {
  const [error, setError] = useState('');

  const handleSubmit = ({ email, password }) => {
    authentication.register(email, password).then(
      () => props.history.push('/signin'),
      () => setError('Could not sign up')
    );
  };

  return (
    <div className="container sign-up">
      <div className="row">
        <div className="center">
          <Logo />
        </div>
      </div>
      <div className="row">
        <div className="center">
          <Title title="Sign Up" />
        </div>
      </div>
      {error &&
        <div className="row">
          <div className="center red-text">{error}</div>
        </div>
      }
      <Formik validationSchema={signUpSchema} component={SignUpForm} onSubmit={handleSubmit} />
      <div className="row">
        <div className="center dark-text">
          Already have an account? Sign in <span className="highlight-text pointer" onClick={() => props.history.push('/signin')}>here</span>.
        </div>
      </div>
    </div>
  );
}

function SignUpForm({ handleChange, handleBlur, values, touched, errors, isValid }) {
  return (
    <Form>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="email"
            type="email"
            error={errors.email}
            touched={touched.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="password"
            type="password"
            error={errors.password}
            touched={touched.password}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="passwordConfirm"
            type="password"
            error={errors.passwordConfirm}
            touched={touched.passwordConfirm}
            value={values.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="fullName"
            type="text"
            error={errors.fullName}
            touched={touched.fullName}
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="phone"
            type="text"
            error={errors.phone}
            touched={touched.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <Field
            name="address"
            type="text"
            error={errors.address}
            touched={touched.address}
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>
      <div className="row">
        <div className="col s12 offset-m3 m6 offset-l4 l4">
          <button
            type="submit"
            className={"waves-effect waves-light btn btn-primary full-width" + (!isValid ? " disabled" : "")} 
          >
            sign up
          </button>
        </div>
      </div>
    </Form>
  )
}

SignUp.propTypes = {
  history: PropTypes.object
};
