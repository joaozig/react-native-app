import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import ListItem from '../ListItem/ListItem'

const PlaceListOld = (props) => {
  const listItems = props.items.map((place, i) => (
    <ListItem key={i} placeName={place} onItemPressed={() => props.onItemDeleted(i)} />
  ))

  return (
    <ScrollView style={styles.listContainer}>
      {listItems}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})

export default PlaceListOld
