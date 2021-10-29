---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorContent.tsx
---
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Input,
} from 'antd';

import './<%= pascalPageName %>EditorContent.scss';
import I<%= pascalPageName %>StateData from '../../../../interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';
import { IClassHighlight } from '../../<%= path %>helper/HooksHelper';

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

interface I<%= pascalPageName %>EditorContent {
  classHighlight?: IClassHighlight<I<%= pascalPageName %>StateData>,
}

const <%= pascalPageName %>EditorContent: React.FC<I<%= pascalPageName %>EditorContent> = ({
  classHighlight,
}) => {
  return (
    <div className="<%= camelPageName %>-editor-content">
      <Form.Item
        className={classHighlight?.name}
        label="Name"
        name="name"
      >
        <Input placeholder="Name" />
      </Form.Item>
    </div>
  );
};

<%= pascalPageName %>EditorContent.propTypes = {
  classHighlight: PropTypes.any,
};

<%= pascalPageName %>EditorContent.defaultProps = {
  classHighlight: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>EditorContent));
