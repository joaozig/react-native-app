import { Navigation } from 'react-native-navigation'
import { Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
  Promise.all([
    Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
    Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30)
  ]).then(sources => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'awesome-places.FindPlaceScreen',
          label: 'Find Place',
          title: 'Find Place',
          icon: sources[0]
        },
        {
          screen: 'awesome-places.SharePlaceScreen',
          label: 'Share Place',
          title: 'Share Place',
          icon: sources[1]
        }
      ],
      tabsStyle: {
        tabBarSelectedButtonColor: 'orange'
      },
      appStyle: {
        tabBarSelectedButtonColor: 'orange'
      }
    })
  })
}

export default startTabs