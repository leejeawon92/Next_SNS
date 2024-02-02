import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const App = ({Component}) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <link rel="shortcut icon" href="/sns_favicon.ico" />
        <title>SNS</title>
      </Head>
      <Component />
    </>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);