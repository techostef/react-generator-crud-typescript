This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this
guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)
.

## How to use

Setup environment:

* `npm i` is install packages.

Step generator crud:

* `npm run new:api` is generate api.
* `npm run new:state` is generate state management.
* `npm run new:page` is generate pages crud.
* add created state in root state (src/stores/index.ts)
```
src/
  stores/
    index.ts
```

```ts
import { combineReducers } from 'redux';
import appState from './app/appState';
import confirmDialogState from './confirmDialog/confirmDialogState';
import routeState from './route/routeState';

// createdState from command `npm run new:state` and name is created
import createdState from './folder/createdState/createdState.ts'

const rootState = {
  appState,
  confirmDialogState,
  routeState,

  createdState, 
};

export default combineReducers(rootState as any);
```

* add enums for route page (src\enums\RouteEnum.ts)
```
src/
  enums/
    RouteEnum.ts
```

```ts
const RouteEnum = Object.freeze({
  // created from command `npm run new:page` and name is created
  createdManagement: 'createdManagement',
  createdEditor: 'createdEditor',
  home: 'home',
});

export default RouteEnum;
```

* add route enums management on sidebar (src\content\Main\SidebarMain\SidebarMain.tsx)
```
src/
  content/
    Main/
      SidebarMain/
        SidebarMain.tsx
```

```ts
const onClick = (e: any) => {
  const key = e?.key ?? '';
  switch (key) {
    case '2':
      routeStateAction.setCurrent('createdManagement');
      break;
    default:
      routeStateAction.setCurrent('home');
      break;
  }
};
```

* add render page management and page editor(src\content\Main\RouteMain\RouteMain.tsx)
```
src/
  content/
    Main/
      RouteMain/
        RouteMain.tsx
```

```ts
const render = () => {
    switch (current) {
      case RouteEnum.createdManagement:
        return <CreatedExplorerContainer />;
      case RouteEnum.createdEditor:
        return <CreatedEditorContainer />;
      case RouteEnum.home:
      default:
        return <div />;
    }
  };
```