import React from 'react';
import { shallow } from 'enzyme';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import Connected, { Component as CitySelector, formatCity } from './CitySelector';

describe('connect', () => {

  const cities = [];
  const selectedCityId = '12345';
  const actions = {
    loadCity: jest.fn().mockReturnValue({})
  };
  const selectors = {
    getCityList: jest.fn().mockReturnValue(cities),
    getSelectedCity: jest.fn().mockReturnValue(selectedCityId)
  };

  const wrapped = jest.fn();
  const connect = jest.fn().mockReturnValue(wrapped);

  Connected({ actions, selectors, connect });

  const mapStateToProps = connect.mock.calls[0][0];
  const mapDispatchToProps = connect.mock.calls[0][1];

  it('passes Component', () => {
    expect(wrapped).toHaveBeenCalledWith(CitySelector);
  });

  it('connects cities and selectedCityId state to props', () => {
    const state = {};
    const props = mapStateToProps(state);

    expect(props).toEqual(expect.objectContaining({cities, selectedCityId}))
    expect(selectors.getCityList).toHaveBeenCalledWith(state);
    expect(selectors.getSelectedCity).toHaveBeenCalledWith(state);
  });

  it('connects onCitySelect prop to actions.loadCity dispatch', () => {
    const dispatch = jest.fn();
    const eventMap = mapDispatchToProps(dispatch);

    eventMap.onCitySelect('1234');
    expect(actions.loadCity).toHaveBeenCalledWith('1234');
    expect(dispatch).toHaveBeenCalledWith(actions.loadCity());
  });

});

describe('Component', () => {

  const cities = [{
    "id": 12345,
    "name": "Nowhere",
    "country": "US"
  }, {
    "id": 54321,
    "name": "Somewhere",
    "country": "US"
  }];
  const selectedCityId = cities[0].id;

  it('renders dropdown with cities list and correct selectedCityId selected', () => {

    const wrapper = shallow(<CitySelector selectedCityId={selectedCityId} cities={cities} onCitySelect={() => { }} />);
    const menu = wrapper.find(DropDownMenu);
    const menuItems = wrapper.find(MenuItem);

    expect(menu.length).toEqual(1);
    expect(menu.prop('value')).toEqual(selectedCityId);

    menuItems.forEach((menuItem, i) => {
      let city = cities[i];

      expect(menuItem.prop('primaryText')).toEqual(formatCity(city.name, city.country));
      expect(menuItem.prop('value')).toEqual(city.id);
    });

  });

  it('calls onCitySelect with new cityId on DropDownMenu change', () => {
    const onCitySelect = jest.fn();
    const wrapper = shallow(<CitySelector selectedCityId={selectedCityId} cities={cities} onCitySelect={onCitySelect} />);

    wrapper.find(DropDownMenu).prop('onChange')({}, '', '12345');

    expect(onCitySelect).toHaveBeenCalledWith('12345');
  });

});
