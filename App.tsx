import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import Logo from './assets/soone-img.svg'
import BackButton from './components/BackButton'
import { useFonts } from 'expo-font'
import Gallery from './components/Gallery'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { MARGIN, SPRING_CONFIG } from './Config'
import Tile from './components/Tile'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated'

export default function App() {
  const tiles = [
    { id: 'first', uri: '' },
    { id: 'second', uri: '' },
    { id: 'third', uri: '' },
    { id: 'fourth', uri: '' },
    { id: 'fifth', uri: '' },
    { id: 'sixth', uri: '' }
  ]

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf')
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  const handlePress = () => {
    top.value = withSpring(dimensions.height / 2, SPRING_CONFIG)
  }

  const dimensions = useWindowDimensions()
  const top = useSharedValue(dimensions.height)
  const style = useAnimatedStyle(() => {
    return {
      top: top.value
    }
  })

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {},
    onActive: ({ translationX, translationY }, ctx) => {},
    onEnd: (_, ctx) => {}
  })

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.TabHeaderView}>
          <View style={styles.BackButton}>
            <BackButton iconName="left" />
          </View>
          <View style={styles.Logo}>
            <Logo width={160} height={32} />
          </View>
        </View>
        <View style={styles.profileContainer}>
          <Text style={styles.titleText}>My photos</Text>
          <Text style={styles.subtitleText}>
            Professional photos only. No selfies.
          </Text>
          <Gallery>
            {tiles.map((tile) => (
              <Tile key={tile.id} id={tile.id} handlePress={handlePress} />
            ))}
          </Gallery>
        </View>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                padding: 20,
                justifyContent: 'center',
                alignItems: 'center'
              },
              style
            ]}
          ></Animated.View>
        </PanGestureHandler>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
const HeaderHeight = '10%'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: MARGIN,
    position: 'relative'
  },
  TabHeaderView: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: HeaderHeight,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: '#D3D3D3'
  },
  Logo: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 42
  },
  BackButton: {
    flex: 0,
    marginBottom: 8,
    marginLeft: 10
  },
  profileContainer: {
    marginTop: '30%',
    paddingHorizontal: '4%'
  },
  titleText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24
  },
  subtitleText: {
    fontFamily: 'Inter-Black',
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 10,
    marginBottom: 16
  },
  first: {
    borderRadius: 8,
    borderTopLeftRadius: 20,
    backgroundColor: '#F3F3F3',
    position: 'absolute'
  },
  second: {
    borderTopRightRadius: 20,
    position: 'absolute'
  },
  third: {
    position: 'absolute'
  },
  fourth: {
    borderBottomLeftRadius: 20,
    position: 'absolute'
  },
  fifth: {
    position: 'absolute'
  },
  sixth: {
    borderBottomRightRadius: 20,
    position: 'absolute'
  },
  secondGroup: {
    height: '100%',
    borderRadius: 8,
    width: 112,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  topRowGallery: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    height: 250
  },
  bottomRowGallery: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8
  },
  gridItem: {
    height: 120,
    width: 110,
    borderRadius: 8,
    backgroundColor: '#F3F3F3'
  }
})
