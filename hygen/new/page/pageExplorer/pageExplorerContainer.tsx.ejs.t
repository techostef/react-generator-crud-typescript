---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerContainer.tsx
---
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import <%= pascalPageName %>ExplorerHeader from './<%= pascalPageName %>ExplorerHeader';
import <%= pascalPageName %>ExplorerContent from './<%= pascalPageName %>ExplorerContent';

import './<%= pascalPageName %>ExplorerContainer.scss';

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

interface I<%= pascalPageName %>ExplorerContainer {
}

const <%= pascalPageName %>ExplorerContainer: React.FC<I<%= pascalPageName %>ExplorerContainer> = () => {
  return (
    <div className="<%= camelPageName %>-explorer-container">
      <<%= pascalPageName %>ExplorerHeader />
      <<%= pascalPageName %>ExplorerContent />
    </div>
  );
};

<%= pascalPageName %>ExplorerContainer.propTypes = {
};

<%= pascalPageName %>ExplorerContainer.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>ExplorerContainer));
