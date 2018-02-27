import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

import ModalSelector from './ModalSelector';

function renderParkItem(park) {
  return {
    id: park.id,
    title: park.name,
    subtitle:
      park._geoDistance &&
      `${(park._geoDistance * 0.000621371).toFixed(1)} miles`,
  };
}

const ParkSelector = ({data, ...props}) => (
  <ModalSelector
    title="Parks"
    items={(data.searchParks || []).map(renderParkItem)}
    {...props}
  />
);

const addParksData = graphql(
  gql`
    query searchParks(
      $activityIds: [String!]
      $latitude: Float
      $longitude: Float
    ) {
      searchParks(
        activitiesIds_contain_some: $activityIds
        latitude: $latitude
        longitude: $longitude
      ) {
        id
        name
        _geoDistance
      }
    }
  `,
  {
    options({activity, location}) {
      const variables = {};
      if (activity) {
        variables.activityIds = [activity.id];
      }
      if (location) {
        variables.latitude = location.coords.latitude;
        variables.longitude = location.coords.longitude;
      }
      return {variables};
    },
  }
);

export default addParksData(ParkSelector);
