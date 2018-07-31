import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/index'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

class PlaceDetail extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.place.key)
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image source={this.props.place.image} style={styles.placeImage} />
          <Text style={styles.placeName}>{this.props.place.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.placeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="red" />
            </View>
          </TouchableOpacity>
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...this.props.place.location,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
          }}
        >
          <MapView.Marker coordinate={this.props.place.location} />
        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: '100%',
    height: 200
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: 250
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: (key) => dispatch(deletePlace(key))
  }
}

export default connect(null, mapDispatchToProps)(PlaceDetail)
