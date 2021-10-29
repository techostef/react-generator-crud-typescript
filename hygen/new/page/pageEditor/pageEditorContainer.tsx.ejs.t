---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorContainer.tsx
---
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Col, Form, Row, Spin } from 'antd';
import { bindActionCreators } from 'redux';
import <%= pascalPageName %>EditorHeader from './<%= pascalPageName %>EditorHeader';
import <%= pascalPageName %>EditorContent from './<%= pascalPageName %>EditorContent';
import IState from '../../<%= path %>interfaces/IState';
import I<%= pascalPageName %>StateData from '../../<%= path %>interfaces/<%= instrumentName %><%= camelPageName %>/I<%= pascalPageName %>StateData';
import confirmDialogBusinessActionImp from '../../<%= path %>stores/confirmDialog/confirmDialogBusinessAction';
import <%= pascalPageName %>Business from '../../<%= path %>business/<%= instrumentName %><%= pascalPageName %>Business';
import <%= camelPageName %>BusinessActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>BusinessAction';
import <%= camelPageName %>StateActionImp from '../../<%= path %>stores/<%= instrumentName %><%= camelPageName %>/<%= camelPageName %>StateAction';
import routeBusinessActionImp from '../../<%= path %>stores/route/routeBusinessAction';
import { useChangeHighlight } from '../../<%= path %>helper/hooksHelper';
import FormBusiness from '../../<%= path %>business/FormBusiness';
import IForm from '../../<%= path %>interfaces/IForm';

import './<%= pascalPageName %>EditorContainer.scss';

const mapStateToProps = (state: IState) => {
  const <%= camelPageName %>State = state.<%= camelPageName %>State.toJS();
  return {
    indexSelectedItem: <%= camelPageName %>State.indexSelectedItem,
    isAdd: <%= camelPageName %>State.indexSelectedItem === undefined,
    isLoadingForm: <%= camelPageName %>State.isLoadingForm,
    selectedItems: <%= camelPageName %>State.selectedItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDialogBusinessAction: bindActionCreators(confirmDialogBusinessActionImp, dispatch),
    <%= camelPageName %>BusinessAction: bindActionCreators(<%= camelPageName %>BusinessActionImp as any, dispatch),
    <%= camelPageName %>StateAction: bindActionCreators(<%= camelPageName %>StateActionImp as any, dispatch),
    routeBusinessAction: bindActionCreators(routeBusinessActionImp, dispatch),
  };
};

interface I<%= pascalPageName %>EditorContainer {
  confirmDialogBusinessAction: typeof confirmDialogBusinessActionImp,
  indexSelectedItem?: string | number,
  isAdd: boolean,
  isLoadingForm: boolean,
  <%= camelPageName %>BusinessAction: typeof <%= camelPageName %>BusinessActionImp,
  <%= camelPageName %>StateAction: typeof <%= camelPageName %>StateActionImp,
  routeBusinessAction: typeof routeBusinessActionImp,
  selectedItems: I<%= pascalPageName %>StateData[],
}

const <%= pascalPageName %>EditorContainer: React.FC<I<%= pascalPageName %>EditorContainer> = ({
  confirmDialogBusinessAction,
  indexSelectedItem,
  isAdd,
  isLoadingForm,
  <%= camelPageName %>BusinessAction,
  <%= camelPageName %>StateAction,
  routeBusinessAction,
  selectedItems,
}) => {
  const [form] = Form.useForm() as [IForm<I<%= pascalPageName %>StateData>];
  const [isTouched, setIsTouched] = useState(false);

  const {
    classHighlight,
    isEdit,
    setValue: setValueChangeHighlight,
    restoreData: restoreDataChangeHighlight,
  } = useChangeHighlight(undefined, isAdd);

  useEffect(() => {
    (async () => {
      if (selectedItems.length === 0) return;
      if (typeof indexSelectedItem !== 'number') return;
      const item = selectedItems[indexSelectedItem];
      if (!item) return;

      <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingForm', true);
      const newData = await <%= pascalPageName %>Business.getItemById(item?.id)
        .finally(() => <%= camelPageName %>StateAction.editPropertyStateByKey('isLoadingForm', false));
      setIsTouched(false);
      if (form) {
        restoreDataChangeHighlight(newData);
        form.setFieldsValue({
          name: newData?.name ?? '',
        });
      }
    })();
  }, [indexSelectedItem]);

  const gotoManagement = () => {
    routeBusinessAction.goto<%= pascalPageName %>Management();
  };

  const handleBack = () => {
    if (isTouched) {
      confirmDialogBusinessAction.showDialog({
        title: 'Back to <%= pascalPageName %> Management Overview',
        content: (
          <Row>
            <Col>The unsaved changes will be discarded.</Col>
            <Col>Are you sure you wants to go back to <%= pascalPageName %> Management overview?</Col>
          </Row>
        ),
        handleOk: () => {
          gotoManagement();
          confirmDialogBusinessAction.hideDialog();
        },
      });
    } else {
      gotoManagement();
    }
  };

  const doSave = async (data) => {
    confirmDialogBusinessAction.hideDialog();
    const onSuccess = () => setIsTouched(false);
    if (isAdd) {
      await <%= camelPageName %>BusinessAction.createItem(data, onSuccess);
    } else if (typeof indexSelectedItem !== 'undefined') {
      const item = selectedItems[indexSelectedItem];
      if (item) {
        await <%= camelPageName %>BusinessAction.updateItem(item.id, data, onSuccess);
      }
    }
  };

  const onFinish = (data) => {
    confirmDialogBusinessAction.showDialog({
      title: 'Save Confirm',
      content: 'Do you want save the changes?',
      handleOk: async () => {
        await doSave(data);
      },
    });
  };

  return (
    <div className="<%= camelPageName %>-editor-container">
      <Form
        form={form as any}
        name="basic"
        onValuesChange={(itemChange) => {
          setValueChangeHighlight(itemChange);
          setIsTouched(true);
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="max-height container-flex"
      >
        <<%= pascalPageName %>EditorHeader
          handleBack={handleBack}
          isTouched={isTouched}
          isSubmitDisabled={
            FormBusiness.disabledSubmitGeneral(isAdd, isEdit, isLoadingForm, isTouched)
          }
        />
        <Spin tip="Loading..." spinning={isLoadingForm}>
          <<%= pascalPageName %>EditorContent
            classHighlight={classHighlight}
            isAdd={isAdd}
          />
        </Spin>
      </Form>
    </div>
  );
};

<%= pascalPageName %>EditorContainer.propTypes = {
  confirmDialogBusinessAction: PropTypes.any,
  indexSelectedItem: PropTypes.any,
  isAdd: PropTypes.any,
  isLoadingForm: PropTypes.any,
  <%= camelPageName %>BusinessAction: PropTypes.any,
  <%= camelPageName %>StateAction: PropTypes.any,
  routeBusinessAction: PropTypes.any,
  selectedItems: PropTypes.any,
};

<%= pascalPageName %>EditorContainer.defaultProps = {
  confirmDialogBusinessAction: undefined,
  indexSelectedItem: undefined,
  isAdd: true,
  isLoadingForm: false,
  <%= camelPageName %>BusinessAction: undefined,
  <%= camelPageName %>StateAction: undefined,
  routeBusinessAction: undefined,
  selectedItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(
  React.memo(<%= pascalPageName %>EditorContainer),
);
