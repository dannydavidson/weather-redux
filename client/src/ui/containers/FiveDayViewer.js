import React from 'react';
import PropTypes from 'prop-types';

import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import ForecastDay from '../components/ForecastDay';

export const Component = ({ forecast, errorMessage }) => {

  if (errorMessage) {
    let errorStyle = {backgroundColor: 'rgb(178,34,34)'};
    return (
      <Snackbar
        className="error-snackbar"
        open={!!errorMessage}
        message={errorMessage}
        style={errorStyle}
      />
    );
  }

  if (!forecast.length) {
    return (
      <div className="loading-pane">
        <CircularProgress size={120} thickness={10} />
      </div>
    );
  }

  const forecastDays = forecast.map((day) => {
    return (
      <ForecastDay key={day.dayName} forecast={day} />
    );
  });

  return (
    <div className='forecast-pane'>
      {forecastDays}
    </div>
  );

}

Component.propTypes = {
  forecast: PropTypes.array.isRequired,
  errorMessage: PropTypes.string
};

export default function({ selectors, connect }) {
  return connect(
    (state) => {
      return {
        forecast: selectors.getSelectedForecast(state),
        errorMessage: selectors.getErrorMessage(state)
      }
    }
  )(Component);

}
