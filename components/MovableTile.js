import React, { useState } from 'react'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { PanGestureHandler } from 'react-native-gesture-handler'
import { Platform } from 'react-native'
const TOP_POSITIONS = [0, 0, 128, 256, 256, 256]
const LEFT_POSITIONS = [0, 234, 234, 0, 117, 234]
const FIRST_HEIGHT = 248
const GRID_HEIGHT = 120

function clamp(value, lowerBound, upperBound) {
  'worklet'
  return Math.max(lowerBound, Math.min(value, upperBound))
}
function objectMove(object, from, to) {
  'worklet'
  const newObject = Object.assign({}, object)

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to
    }

    if (object[id] === to) {
      newObject[id] = from
    }
  }

  return newObject
}

const MovableTile = ({ children, style, positions, id }) => {
  const [moving, setMoving] = useState(false)
  const top = useSharedValue(TOP_POSITIONS[positions.value[id] - 1])

  const left = useSharedValue(LEFT_POSITIONS[positions.value[id] - 1])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
      shadowOffset: {
        height: 0,
        width: 0
      },
      top: top.value,
      left: left.value
    }
  })

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(TOP_POSITIONS[currentPosition + 1])
          left.value = withSpring(LEFT_POSITIONS[currentPosition + 1])
        }
      }
    },
    [moving]
  )
  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true)

      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium)
      }
    },
    onActive(event) {
      const positionY = event.absoluteY
      const positionX = event.absoluteX
      top.value = withTiming(
        positionY - (id === 1 ? FIRST_HEIGHT + 70 : GRID_HEIGHT * 2),
        {
          duration: 16
        }
      )
      left.value = withTiming(
        positionX - (id === 1 ? FIRST_HEIGHT / 2 + 10 : GRID_HEIGHT / 2),
        {
          duration: 16
        }
      )

      console.log(positionX, positionY)
      const newPositionY = clamp(
        Math.floor(positionY / TOP_POSITIONS[id - 1]),
        1,
        6
      )
      const newPositionX = clamp(
        Math.floor(positionX / LEFT_POSITIONS[id - 1]),
        1,
        6
      )

      if (newPositionY !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPositionY
        )
      }

      if (newPositionX !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPositionX
        )
      }
    },
    onFinish() {
      top.value = TOP_POSITIONS[positions.value[id] + 1]
      left.value = LEFT_POSITIONS[positions.value[id] + 1]
      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium)
      }
      runOnJS(setMoving)(false)
    }
  })
  return (
    <Animated.View style={[animatedStyle, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>{children}</Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default MovableTile
