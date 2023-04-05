import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Logo from './assets/soone-img.svg'
import BackButton from './components/BackButton'
import { useFonts } from 'expo-font'
import Gallery from './components/Gallery'

export default function App() {
  const tileInfo = [
    { id: 1, style: [styles.first], slot: 'main photo' },
    { id: 2, style: [styles.second, styles.gridItem], slot: '2' },
    { id: 3, style: [styles.third, styles.gridItem], slot: '3' },
    { id: 4, style: [styles.fourth, styles.gridItem], slot: '4' },
    { id: 5, style: [styles.fifth, styles.gridItem], slot: '5' },
    { id: 6, style: [styles.sixth, styles.gridItem], slot: '6' }
  ]

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
    'Inter-Black': require('./assets/fonts/Inter-Black.ttf')
  })
  if (!fontsLoaded) {
    return <Text>Loading...</Text>
  }

  return (
    <View style={styles.container}>
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
        <Gallery tileInfo={tileInfo} />
      </View>
      <StatusBar style="auto" />
    </View>
  )
}
const HeaderHeight = '10%'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
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
    height: 248,
    width: 227,
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
