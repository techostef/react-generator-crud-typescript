---
to: <%= absPath %>/Page<%= pascalPageName %>Container/<%= pascalPageName %>Editor/<%= pascalPageName %>EditorHeader.scss
---
.<%= camelPageName %>-editor-header {
  display: flex;
  flex-direction: column;

  .anticon-left, .anticon-right {
    cursor: pointer;
    &.disabled {
      cursor: not-allowed;
      opacity: 0.3;
    }
  }
}