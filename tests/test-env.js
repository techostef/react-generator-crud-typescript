import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;
window.$.ui = {
    ...window.$.ui,
};

window.SVGPathElement = {
    prototype: {},
};
window.define = () => {};

window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
}));

// Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: jest.fn().mockImplementation(query => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // deprecated
//       removeListener: jest.fn(), // deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     })),
//   });
// // import 'jquery-ui';
// // import 'jquery-ui/ui/core';

// // window.define = () => null;
// // require('jquery-ui/themes/base/core.css');
// require('jquery-ui/ui/core');
// // require('jquery-ui/themes/base/theme.css');

window.console = {
    log: console.log, // console.log are ignored in tests
    error: () => null,
    warn: () => null,
    info: console.info,
    debug: console.debug,
};
