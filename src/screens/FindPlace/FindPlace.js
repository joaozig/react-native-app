import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import PlaceList from '../../components/PlaceList/PlaceList'

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange'
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    fadeAnim: new Animated.Value(0)
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        ...this.state,
        placesLoaded: true
      })
      this.placesLoadedHandler()
    })
  }

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
    let content = (
      <Animated.View style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1]
              })
            }
          ]
        }}
      >
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Find Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    )

    if(this.state.placesLoaded) {
      content = (
        <Animated.View style={{
            opacity: this.state.fadeAnim
          }}
        >
          <PlaceList places={this.props.places} onPlaceSelected={this.placeSelectedHandler} />
        </Animated.View>
      )
    }

    return <View style={this.state.placesLoaded ? null : styles.buttonContainer}>{content}</View>
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
})

const mapStateToProps = state => {
  return {
    places: state.places.places
  }
}

export default connect(mapStateToProps)(FindPlaceScreen)