import { instance } from './actions';

describe('actions', () => {

  describe('loadCity', () => {

    const getIO = (response) => {
      return {
        weather: {
          get5Day: jest.fn().mockReturnValue(response)
        }
      };
    };

    it('dispatches changeCityId, cityLoading and cityLoaded on successful fetch', () => {
      let data = {};
      let cityId = '12345';
      let { actions } = instance({ io: getIO(Promise.resolve(data)) });
      let dispatch = jest.fn();

      let thunk = actions.loadCity(cityId);
      thunk(dispatch)
        .then(() => {
          let changeCityIdCall = dispatch.mock.calls[0][0];
          let cityLoadingCall = dispatch.mock.calls[1][0];
          let cityLoadedCall = dispatch.mock.calls[2][0];

          expect(changeCityIdCall).toEqual(actions.changeCityId(cityId));
          expect(cityLoadingCall).toEqual(actions.cityLoading());
          expect(cityLoadedCall).toEqual(actions.cityLoaded(data));
        });

    });

    it('dispatches changeCityId, cityLoading and cityLoadFailed on failed fetch', () => {
      let error = new Error('FAIL');
      let cityId = '12345';
      let { actions } = instance({ io: getIO(Promise.reject(error)) });

      let dispatch = jest.fn();
      let thunk = actions.loadCity(cityId);

      thunk(dispatch)
        .then(() => {
          let changeCityIdCall = dispatch.mock.calls[0][0];
          let cityLoadingCall = dispatch.mock.calls[1][0];
          let cityLoadedCall = dispatch.mock.calls[2][0];

          expect(changeCityIdCall).toEqual(actions.changeCityId(cityId));
          expect(cityLoadingCall).toEqual(actions.cityLoading());
          expect(cityLoadedCall).toEqual(actions.cityLoadFailed(error));
        });
    });

  });

});
