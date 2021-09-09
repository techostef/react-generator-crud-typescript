---
to: <%= absPath %>/mocks/<%= instrumentName %>/<%= pascalApiName %>Handlers.ts
---
import { rest } from 'msw';

export default [
  rest.get('http://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate' },
        { name: 'Vanilla' },
        { name: 'Vanilla 1' },
        { name: 'Vanilla 2' },
      ]),
    );
  }),
];

export default [
  rest.post('http://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json({ name: 'Chocolate' }),
    );
  }),
];

export default [
  rest.put('http://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json({ name: 'Chocolate' }),
    );
  }),
];

export default [
  rest.delete('http://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate' },
        { name: 'Vanilla' },
        { name: 'Vanilla 1' },
      ]),
    );
  }),
];
