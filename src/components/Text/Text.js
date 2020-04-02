import React from 'react';
import PropTypes from 'prop-types';

const Text = props => {
  return (
      <div>
        {props.children ? props.children : 'No data'}
      </div>
  );
};

Text.propTypes = {
  children: PropTypes.string,
};
Text.defaultProps = {
  children: null,
}

export default Text;
