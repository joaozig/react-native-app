import React, { Component } from 'react'
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { addPlace } from '../../store/actions/index'
import MainText from '../../components/UI/MainText/MainText'
import HeadingText from '../../components/UI/HeadingText/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'

class SharePlaceScreen extends Component {
  state = {
    placeName: ''
  }

  placeNameChangedhandler = value => {
    this.setState({
      placeName: value
    })
  }

  placeAddedHandler = () => {
    if(this.state.placeName.trim() !== '') {
      this.props.onAddPlace(this.state.placeName)
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a Place with us!</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            value={this.state.placeName}
            onChangeText={this.placeNameChangedhandler}
          />
          <View style={styles.button}>
            <Button title='Share the Place!' onPress={this.placeAddedHandler} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (placeName) => dispatch(addPlace(placeName))
  }
}

export default connect(null, mapDispatchToProps)(SharePlaceScreen)