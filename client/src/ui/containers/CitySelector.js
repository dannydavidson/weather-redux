import React from 'react';
import PropTypes from 'prop-types';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export const formatCity = (city, country) => {
  return `${city}, ${country}`;
}

export const Component = ({onCitySelect, selectedCityId, cities}) => {
  const options = cities.map((city) => {
    return <MenuItem value={city.id} key={city.id} primaryText={formatCity(city.name, city.country)} />
  });

  const onChange = (evt, key, val) => {
    onCitySelect(val);
  }

  return (
    <DropDownMenu maxHeight={300} value={selectedCityId} onChange={onChange}>
      {options}
    </DropDownMenu>
  );
}

Component.propTypes = {
  onCitySelect: PropTypes.func.isRequired,
  cities: PropTypes.array.isRequired
};

export default function({ actions, selectors, connect }) {
  return connect(
    (state) => {
      return {
        cities: selectors.getCityList(state),
        selectedCityId: selectors.getSelectedCity(state)
      }
    },
    (dispatch) => {
      return {
        onCitySelect: (cityId) => {
          dispatch(actions.loadCity(cityId));
        }
      };
    }
  )(Component);

}
