export default function (err) {
  return jest.fn().mockReturnValue(
    Promise.reject(err)
  );
}
