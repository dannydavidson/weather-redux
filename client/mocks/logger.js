
export default function() {
  let mock = {};

  ['debug', 'info', 'error'].forEach((method) => {
    mock[method] = jest.fn();
  });

  return mock;
}
