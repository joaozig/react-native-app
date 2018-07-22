import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlaceScreen extends Component {
  placeSelectedHandler = key => {
    const selectedPlace = this.props.places.find(place => place.key === key)

    this.props.navigator.push({
      screen: 'awesome-places.PlaceDetailScreen',
      title: selectedPlace.name,
      passProps: {
        place: selectedPlace
      }
    })
  }

  render() {
    return (
      <View>
        <PlaceList places={this.props.places} onPlaceSelected={this.placeSelectedHandler} />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps)(FindPlaceScreen)