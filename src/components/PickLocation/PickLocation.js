import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate
    this.map.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: this.state.focusedLocation.latitudeDelta,
      longitudeDelta: this.state.focusedLocation.longitudeDelta
    })
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      }
    })
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude
    })
  }

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      }
      console.log(coordsEvent)
      this.pickLocationHandler(coordsEvent)
    }, err => {
      console.log(err)
      alert('Fetching de Position failed, please pick one manually!')
    })
  }

  render() {
    let marker = null

    if(this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />
    }
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          onPress={this.pickLocationHandler}
          ref={ref => this.map = ref}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          {/* <Button title='Locate Me' onPress={() => alert('Locate Me!')} /> */}
          <Button title='Locate Me' onPress={this.getLocationHandler} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  },
  button: {
    margin: 8
  }
})

export default PickLocation