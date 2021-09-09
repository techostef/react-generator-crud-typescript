---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Explorer/<%= pascalPageName %>ExplorerHeader.scss
---
.<%= camelPageName %>-explorer-header {
  .ant-page-header-heading {
    justify-content: unset;
    .ant-page-header-heading-extra {
      margin-left: auto;
      display: flex;
      .ant-input-search {
        width: 500px;
      }
      .anticon-delete {
        cursor: pointer;
        svg {
          width: 30px;
          height: 30px;
        }
        &.disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }
      }
      .anticon-edit {
        cursor: pointer;
        svg {
          width: 30px;
          height: 30px;
        }
      }
      .ant-btn {
        &.ant-btn-primary {
          width: 134px;
        }
      }
    }
  }
}