import IAppState from './IAppState';

interface IEditItemByKeyApp {
  key: keyof IAppState,
  value: any,
  Id?: any,
}

export default IEditItemByKeyApp;
