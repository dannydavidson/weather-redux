import getDay from 'date-fns/get_day';

export function instance() {
  return {
    getCityList(state) {
      return state.cities;
    },
    getDays(state) {
      return state.days;
    },
    getSelectedCity(state) {
      return state.selectedCityId;
    },
    getSelectedForecast(state) {
      if (state.selectedCityId) {
        let numDaysCounter = 0;
        let today = getDay(new Date().getTime());
        let dayCounter = today;
        let forecast = state.forecasts[state.selectedCityId];
        let normalized = [];

        if (forecast) {

          while (!(numDaysCounter === 5)) {
            if (forecast[dayCounter]) {
              normalized.push({
                dayName: forecast[dayCounter][0].dayFormatted,
                forecast: forecast[dayCounter]
              });
            }

            if (dayCounter === 6) {
              dayCounter = 0;
            } else {
              dayCounter++;
            }
            numDaysCounter++;

          }

          return normalized;
        }
      }
      return [];
    },
    getErrorMessage(state) {
      if (state.hasError) {
        return state.error && state.error.message;
      }
    }
  };
}
