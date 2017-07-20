
export const actionTypes = {
  CITY_CHANGED: 'CITY_CHANGED',
  CITY_LOADING: 'CITY_LOADING',
  CITY_LOADED: 'CITY_LOADED',
  CITY_LOAD_FAILED: 'CITY_LOAD_FAILED'
};

export function instance({ io }) {
  const actions = {

    changeCityId(cityId) {
      return {
        type: actionTypes.CITY_CHANGED,
        data: cityId
      }
    },

    loadCity(cityId) {
      return (dispatch) => {
        dispatch(this.changeCityId(cityId));
        dispatch(this.cityLoading());

        return io.weather.get5Day(cityId)
          .then((data) => {
            dispatch(this.cityLoaded(data));
          })
          .catch((err) => {
            dispatch(this.cityLoadFailed(err));
          });
      }
    },

    cityLoading() {
      return {
        type: actionTypes.CITY_LOADING
      };
    },

    cityLoaded(data) {
      return {
        type: actionTypes.CITY_LOADED,
        data
      };
    },

    cityLoadFailed(error) {
      return {
        type: actionTypes.CITY_LOAD_FAILED,
        error
      }
    }
  };

  return {
    actions,
    actionTypes
  };
}
