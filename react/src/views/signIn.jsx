import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { Logo } from '../components/logo';
import { Title } from '../components/title';
import { Field } from '../components/field';
import authentication from '../services/authentication';

const signInSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup
    .string()
    .required('Password is required')
    .matches(/\w{6,}/, 'Password must be at least 6 characters')
});

export function SignIn(props) {
  const [error, setError] = useState('');

  const handleSubmit = ({ email, password }) => {
    authentication.login(email, password).then(
      () => props.history.push('/movies'),
      () => setError('Invalid email and password combination')
    );
  };

  return (
    <div className="container sign-in">
      <div className="row">
        <div className="center">
          <Logo />
        </div>
      </div>
      <div className="row">
        <div className="center">
          <Title title="Sign In" />
        </div>
      </div>
      {error &&
        <div className="row">
          <div className="center red-text">{error}</div>
        </div>
      }
      <Formik validationSchema={signInSchema} component={SignInForm} onSubmit={handleSubmit} />
      <div className="row">
        <div className="center dark-text">
          Don't have account? Sign up <span className="highlight-text pointer" onClick={() => props.history.push('/signup')}>here</span>.
        </div>
      </div>
    </div>
  );
}

function SignInForm({ handleChange, handleBlur, values, touched, errors, isValid }) {
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
          <button
            type="submit"
            className={"waves-effect waves-light btn btn-primary full-width" + (!isValid ? " disabled" : "")} 
          >
            sign in
          </button>
        </div>
      </div>
    </Form>
  )
}

SignIn.propTypes = {
  history: PropTypes.object
};
