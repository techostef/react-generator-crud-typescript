---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorContent.tsx
---
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Input,
} from 'antd';

import './<%= pascalPageName %>EditorContent.scss';

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

interface I<%= pascalPageName %>EditorContent {
}

const <%= pascalPageName %>EditorContent: React.FC<I<%= pascalPageName %>EditorContent> = () => {
  return (
    <div className="<%= camelPageName %>-editor-content">
      <Form.Item label="Name" name="name">
        <Input placeholder="Name" />
      </Form.Item>
    </div>
  );
};

<%= pascalPageName %>EditorContent.propTypes = {
};

<%= pascalPageName %>EditorContent.defaultProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>EditorContent));
