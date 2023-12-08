import React from 'react';
import PropTypes from 'prop-types';

function AppLayout({ children }) {

  return (
    <div>
      <div>
        aaaaa
        {children}
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
