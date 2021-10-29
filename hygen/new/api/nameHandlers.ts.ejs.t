---
to: <%= absPath %>/mocks/<%= instrumentName %><%= pascalApiName %>Handlers.ts
---
import { rest } from 'msw';
import config from '../../config';
import I<%= pascalApiName %>StateData from '<%= path %>interfaces/<%= instrumentName %><%= camelApiName %>/I<%= pascalApiName %>StateData';

const BASE_URL = `${config.SERVICE_URL}`;
const newItem: I<%= pascalApiName %>StateData = {
  id: 1,
  name: 'new Name',
};

const xPagination = {
  CurrentPage: 1,
  TotalPages: 1,
  PageSize: 15,
  TotalCount: 4,
  HasPrevious: false,
  HasNext: false,
};

export default [
  rest.get(`${BASE_URL}/api/<%= camelApiName %>`, (req, res, ctx) => {
    return res(
      ctx.set('x-pagination', JSON.stringify(xPagination)),
      ctx.json([
        { ...newItem, name: 'name 1' },
        { ...newItem, name: 'name 2' },
        { ...newItem, name: 'name 3' },
        { ...newItem, name: 'name 4' },
      ]),
    );
  }),
  rest.get(`${BASE_URL}/api/<%= camelApiName %>/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        ...newItem,
        id,
      }),
    );
  }),
  rest.post(`${BASE_URL}/api/<%= camelApiName %>`, (req, res, ctx) => {
    return res(
      ctx.json(newItem),
    );
  }),
  rest.put(`${BASE_URL}/api/<%= camelApiName %>/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({
        ...newItem,
        id,
      }),
    );
  }),
  rest.delete(`${BASE_URL}/api/<%= camelApiName %>`, (req, res, ctx) => {
    return res(
      ctx.json([
        { ...newItem, name: 'name 1' },
        { ...newItem, name: 'name 2' },
        { ...newItem, name: 'name 3' },
      ]),
    );
  }),
];
