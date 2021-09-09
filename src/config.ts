const production = {
  // eslint-disable-next-line no-undef
  SERVICE_URL: `//${window.location.host}`,
};

const development = {
  SERVICE_URL: 'https://localhost:5001',
};

export default process.env.NODE_ENV === 'production' ? production : development;
