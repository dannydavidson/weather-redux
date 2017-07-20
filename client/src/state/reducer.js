import _ from 'lodash';

export function instance({ actionTypes }) {
  return (state, action) => {
    switch (action.type) {

      case actionTypes.CITY_LOADING:
        return Object.assign({}, state, {
          isLoading: true,
          hasError: false
        });

      case actionTypes.CITY_LOADED:
        return _.merge({}, state, {
          isLoading: false,
          forecasts: {
            [state.selectedCityId]: action.data
          }
        });

      case actionTypes.CITY_CHANGED:
        return Object.assign({}, state, {
          selectedCityId: action.data
        });

      case actionTypes.CITY_LOAD_FAILED:
        return Object.assign({}, state, {
          hasError: true,
          isLoading: false,
          error: action.error
        })

      default:
        return state;
    }
  }
}
