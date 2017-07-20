export default function (response) {
  return jest.fn().mockReturnValue(
    Promise.resolve()
      .then(() => {
        return {
          json: () => {
            return response;
          }
        }
      })
  );
}
