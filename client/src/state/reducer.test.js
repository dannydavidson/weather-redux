import { instance as reducerInstance } from './reducer';
import { instance as actionsInstance } from './actions';

describe('reducer', () => {

  let { actionTypes } = actionsInstance({});

  describe(actionTypes.CITY_LOADING, () => {
    it('sets isLoading true and resets hasError', () => {
      let reducer = reducerInstance({ actionTypes });
      let reduced = reducer({}, {type: actionTypes.CITY_LOADING});

      expect(reduced).toEqual(expect.objectContaining({isLoading: true, hasError: false}));
    })
  });
});
