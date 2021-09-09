---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorContainer.tsx
---
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { bindActionCreators } from 'redux';
import <%= pascalPageName %>EditorHeader from './<%= pascalPageName %>EditorHeader';
import <%= pascalPageName %>EditorContent from './<%= pascalPageName %>EditorContent';
import IState from '../../<%= path %>interfaces/IState';
import <%= pascalPageName %>Api from '../../<%= path %>api/<%= instrumentName %><%= camelPageName %>/<%= pascalPageName %>Api';
import RestHelper from '../../<%= path %>helper/RestHelper';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';
import routeStateActionImp from '../../<%= path %>stores/route/routeStateAction';

import './<%= pascalPageName %>EditorContainer.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    isAdd: <%= camelPageName %>State.indexSelectedItem === undefined,
    indexSelectedItem: <%= camelPageName %>State.indexSelectedItem,
    selectedItems: <%= camelPageName %>State.selectedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    routeStateAction: bindActionCreators(routeStateActionImp, dispatch),
  };
};

interface I<%= pascalPageName %>EditorContainer {
  isAdd: boolean,
  indexSelectedItem: string | number,
  routeStateAction: typeof routeStateActionImp,
  selectedItems: I<%= pascalPageName %>StateData[],
}

const <%= pascalPageName %>EditorContainer: React.FC<I<%= pascalPageName %>EditorContainer> = ({
  isAdd,
  indexSelectedItem,
  routeStateAction,
  selectedItems,
}) => {
  const refForm = useRef<any>();
  const [form] = Form.useForm();

  const gotoManagement = () => {
    routeStateAction.setCurrent('home');
  };

  useEffect(() => {
    if (selectedItems.length === 0) return;
    if (typeof indexSelectedItem !== 'number') return;
    const item = selectedItems[indexSelectedItem];
    if (!item) return;

    <%= pascalPageName %>Api.getItem({ id: item?.id }).then((response) => {
      RestHelper.handleResultRequest(response).then((data: any) => {
        refForm.current!.setFieldsValue({
          name: data?.name ?? '',
        });
      });
    });
  }, [indexSelectedItem]);

  const onFinish = (data) => {
    if (isAdd) {
      console.log('isAdd', data);
    } else {
      console.log('isEdit', data);
      if (selectedItems.length === 1) {
        gotoManagement();
      }
    }
  };

  return (
    <div className="<%= camelPageName %>-editor-container">
      <Form
        ref={refForm}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <<%= pascalPageName %>EditorHeader />
        <<%= pascalPageName %>EditorContent />
      </Form>
    </div>
  );
};

<%= pascalPageName %>EditorContainer.propTypes = {
  isAdd: PropTypes.any,
  indexSelectedItem: PropTypes.any,
  routeStateAction: PropTypes.any,
  selectedItems: PropTypes.any,
};

<%= pascalPageName %>EditorContainer.defaultProps = {
  isAdd: true,
  indexSelectedItem: undefined,
  routeStateAction: undefined,
  selectedItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(<%= pascalPageName %>EditorContainer));
