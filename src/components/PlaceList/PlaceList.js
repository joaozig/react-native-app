import React from 'react';
import { FlatList, StyleSheet } from 'react-native'
import ListItem from '../ListItem/ListItem'

const PlaceList = (props) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={({item}) => (
        <ListItem
          placeName={item.name}
          placeImage={item.image}
          onItemPressed={() => props.onPlaceSelected(item.key)} />
      )} />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default PlaceList
