---
to: <%= absPath %>/<%= componentName %>.jsx
---
import React from 'react';
import PropTypes from 'prop-types';
import './<%= componentName %>.scss';

const <%= componentName %> = (props) => {
    return (
        <div className="<%= className %>" />
    );
};

<%= componentName %>.defaultProps = {

};

<%= componentName %>.propTypes = {

};

export default React.memo(<%= componentName %>);
