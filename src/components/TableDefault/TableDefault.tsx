import React, { useEffect, useState, useMemo } from 'react';
import { batch } from 'react-redux';
import { Table, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import { SettingFilled, InfoCircleFilled } from '@ant-design/icons';
import IStateActions from '../../interfaces/IStateAction';
import TableBusiness from '../../business/TableBusiness';
import './TableDefault.scss';
import DetailItem from '../DetailItem/DetailItem';
import IApiCommon from '../../interfaces/IApiCommon';
import DateHelper from '../../helper/DateHelper';
import { useDeepEffect } from '../../helper/HooksHelper';

export interface IDetailItem {
  title: string,
  dataIndex: string,
}
type ITableHTMLAttributes = {
  'data-testid'?: string;
};
type ITableDefault = ITableHTMLAttributes & {
  apiContent: IApiCommon,
  classTable?: string,
  columns: any[],
  disabledRowId?: number[],
  filters: { [name: string]: any },
  height?: string | number,
  BusinessAction: any,
  StateAction: IStateActions<any, any, any>,
  dataSource: any[],
  isLoadingTable: boolean | undefined,
  isUsingConfigColumn?: boolean,
  getData: () => void,
  pageSize: number | undefined,
  rowSelectionType?: 'radio' | 'checkbox',
  totalItems: number | undefined,
  useHighlightRow?: boolean,
  useDoubleClick?: boolean,
  customDetailItem?: (item) => React.ReactNode,
  detailItems?: IDetailItem[],
  showSizeChanger?: boolean,
  showQuickJumper?: boolean,
  defaultShowDetail?: boolean,
}

const listTypeDate = ['createdDate', 'updatedDate', 'expirationDate'];
const configKeyName = 'config';

const TableDefault: React.FC<ITableDefault> = ({
  classTable,
  columns,
  disabledRowId,
  filters,
  height,
  BusinessAction,
  StateAction,
  dataSource,
  isLoadingTable,
  isUsingConfigColumn,
  getData,
  pageSize,
  rowSelectionType,
  totalItems,
  useDoubleClick,
  useHighlightRow,
  customDetailItem,
  detailItems,
  showSizeChanger,
  showQuickJumper,
  defaultShowDetail,
  ...tableHTMLAttributes
}) => {
  const [selectedHighLight, setSelectedHighLight] = useState<number>(-1);
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>();
  const [dataDetailItem, setDataDetailItem] = useState<any>({});
  const [isShowDetail, setIsShowDetail] = useState<boolean>(defaultShowDetail ?? false);
  const [columnsLocal, setColumnsLocal] = useState<any[]>(columns);

  useEffect(() => {
    const init = async () => {
      await getData();
    };

    init();
  }, []);

  const isColumnHadConfig = (): boolean => {
    const lastIndex = columnsLocal.length - 1;
    return columnsLocal && columnsLocal[lastIndex]?.dataIndex === configKeyName;
  };

  useDeepEffect(() => {
    if (isUsingConfigColumn && !isColumnHadConfig()) {
      const newColumnsLocal = [...columns];
      newColumnsLocal.push({
        title: <div className="w-full d-flex justify-center"><SettingFilled /></div>,
        dataIndex: configKeyName,
        width: 80,
        key: '',
        render: (text: string, item: any) => (
          <div
            data-testid="info-button"
            className="w-full d-flex justify-center pointer"
            onClick={() => openDetailItem(item)}
          >
            <InfoCircleFilled className="info-fmlx" />
          </div>
        ),
      });
      setColumnsLocal(newColumnsLocal);
    }
  }, [isUsingConfigColumn, columns]);

  const onChangeTable = async (pagination: any, filtersTable: any, sorter: any) => {
    const orderBy = TableBusiness.getOrderBy(sorter);
    setSelectedRowKeys([]);
    await batch(() => {
      StateAction.editPropertyStateByKey('filters', {
        ...filters,
        ...filtersTable,
      });
      StateAction.editPropertyStateByKey('orderBy', `${orderBy}`);
      StateAction.editPropertyStateByKey('pageNumber', pagination.current);
      StateAction.editPropertyStateByKey('pageSize', pagination.pageSize);
    });
    await getData();
  };

  const openDetailItem = (item) => {
    setDataDetailItem(item);
    setIsShowDetail(true);
  };

  const scrollHeight = useMemo(() => {
    if (height) {
      return height;
    }
    return TableBusiness.getScrollHeightTable();
  }, [height]);

  const handlehighLight = (selectedRows: any[]) => {
    if (selectedRows.length === 1 && rowSelectionType === 'radio') {
      const selectedItem = selectedRows?.[0];
      const idx = dataSource.findIndex((item) => item?.id === selectedItem?.id);
      setSelectedHighLight(idx);
    }
  };

  const handleSelectionItem = (selectedKeys: any, selectedRows: any[]) => {
    setSelectedRowKeys(selectedKeys);
    handlehighLight(selectedRows);
    batch(() => {
      StateAction.restoreSelectedItems(selectedRows);
      StateAction.editPropertyStateByKey('isSelectionOption', selectedRows.length !== 0);
    });
  };

  const handleSearchItem = async (value: string, keyName: string | number, confirm) => {
    confirm();
    StateAction.editFilters(keyName as keyof any, value);
    await getData();
  };

  const renderValueDetailItem = (item: any) => {
    if (listTypeDate.includes(item?.dataIndex ?? '')) {
      return DateHelper.formatDateToString(dataDetailItem[item?.dataIndex], 'YYYY_MM_DD');
    }
    return dataDetailItem[item?.dataIndex];
  };

  const getClassRow = (item: any, rowIndex?: number) => {
    if (typeof rowIndex === 'number') {
      if (selectedHighLight === rowIndex) return 'highlight';
      return '';
    }
    return '';
  };

  const renderDetailItem = () => {
    if (customDetailItem) {
      return customDetailItem(dataDetailItem);
    }

    let result = columns;
    if (detailItems) {
      result = detailItems;
    }

    return result.map((item) => {
      return (
        <Row
          style={{
            marginBottom: '5px',
          }}
        >
          <Col
            span={10}
          >
            {item?.title}
          </Col>
          <Col
            span={14}
          >
            <span
              style={{
                marginRight: '5px',
              }}
            >
          :
            </span>
            {renderValueDetailItem(item)}
          </Col>
        </Row>
      );
    });
  };

  const checkDisabled = (idRows: number) => {
    const idxFound = disabledRowId?.findIndex((id: any) => {
      return id === idRows;
    });

    return idxFound !== -1;
  };

  return (
    <div className={`explorer-content ${classTable}`}>
      <Table
        data-testid={tableHTMLAttributes['data-testid']}
        rowSelection={{
          type: rowSelectionType,
          onChange: handleSelectionItem,
          getCheckboxProps: (row: any) => ({
            disabled: checkDisabled(row?.id),
          }),
          selectedRowKeys,
        }}
        onRow={(item: any, rowIndex) => {
          return {
            className: getClassRow(item, rowIndex),
            onClick: () => {
              if (checkDisabled(item?.id)) return;
              if (typeof rowIndex === 'number' && rowIndex >= 0 && useHighlightRow) {
                setSelectedHighLight(rowIndex);
              }
              setDataDetailItem(item);
              if (rowSelectionType === 'radio') {
                handleSelectionItem([item?.id], [item]);
              }
            },
            onDoubleClick: () => {
              if (checkDisabled(item?.id)) return;
              if (typeof rowIndex === 'number' && useDoubleClick) {
                BusinessAction.setIndexSelectedItemAndEdit(rowIndex);
              }
            },
          };
        }}
        rowKey="id"
        loading={isLoadingTable}
        columns={columnsLocal}
        dataSource={dataSource}
        onSearch={handleSearchItem}
        scroll={{ y: scrollHeight }}
        pagination={{
          showQuickJumper,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger,
          pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
          total: totalItems,
          pageSize,
        }}
        onChange={onChangeTable}
      />
      {isShowDetail && (
        <div
          className="detail-item"
          data-testid="detail-item"
        >
          <DetailItem
            header="Detail"
            onClose={() => setIsShowDetail(false)}
            content={(
              <DetailItem.Content>
                {renderDetailItem()}
              </DetailItem.Content>
            )}
          />
        </div>
      )}
    </div>
  );
};

TableDefault.propTypes = {
  BusinessAction: PropTypes.any,
  StateAction: PropTypes.any,
  classTable: PropTypes.any,
  columns: PropTypes.any,
  disabledRowId: PropTypes.any,
  height: PropTypes.any,
  filters: PropTypes.any,
  dataSource: PropTypes.any,
  getData: PropTypes.any,
  useHighlightRow: PropTypes.bool,
  useDoubleClick: PropTypes.bool,
  isLoadingTable: PropTypes.bool,
  isUsingConfigColumn: PropTypes.bool,
  pageSize: PropTypes.number,
  rowSelectionType: PropTypes.any,
  totalItems: PropTypes.number,
  customDetailItem: PropTypes.any,
  detailItems: PropTypes.any,
  showSizeChanger: PropTypes.bool,
  showQuickJumper: PropTypes.bool,
  defaultShowDetail: PropTypes.bool,
};

TableDefault.defaultProps = {
  BusinessAction: undefined,
  StateAction: undefined,
  classTable: '',
  columns: [],
  disabledRowId: [],
  height: undefined,
  filters: undefined,
  dataSource: [],
  useHighlightRow: true,
  useDoubleClick: true,
  getData: () => {},
  isLoadingTable: false,
  isUsingConfigColumn: false,
  pageSize: 15,
  rowSelectionType: 'checkbox',
  totalItems: 0,
  customDetailItem: undefined,
  detailItems: undefined,
  showSizeChanger: true,
  showQuickJumper: true,
  defaultShowDetail: false,
};

export default TableDefault;
