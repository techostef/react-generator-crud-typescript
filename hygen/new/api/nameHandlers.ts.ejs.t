---
to: <%= absPath %>/mocks/<%= instrumentName %>/<%= pascalApiName %>Handlers.ts
---
import { rest } from 'msw';

export default [
  rest.get('https://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate' },
        { name: 'Vanilla' },
        { name: 'Vanilla 1' },
        { name: 'Vanilla 2' },
      ]),
    );
  }),
  rest.post('https://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json({ name: 'Chocolate' }),
    );
  }),
  rest.put('https://localhost:5001/api/<%= camelApiName %>/:postId', (req, res, ctx) => {
    return res(
      ctx.json({ name: 'Chocolate' }),
    );
  }),
  rest.delete('https://localhost:5001/api/<%= camelApiName %>', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: 'Chocolate' },
        { name: 'Vanilla' },
        { name: 'Vanilla 1' },
      ]),
    );
  }),
];
