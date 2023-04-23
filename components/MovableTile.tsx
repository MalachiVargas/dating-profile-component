import React, { ReactNode, useState, useEffect } from 'react'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withTiming,
  useDerivedValue
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import {
  Gesture,
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler'
import { Platform, StyleSheet, Text, View } from 'react-native'
import {
  Positions,
  TILE_POSITIONS,
  TILE_SIZES,
  animationConfig,
  getOrder,
  getPosition
} from '../Config'

interface MovableTileProps {
  children: ReactNode
  id: string
  positions: Animated.SharedValue<Positions>
}

export const styles = StyleSheet.create({
  positionLabel: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    height: 15,
    width: 15,
    borderRadius: 9999,
    backgroundColor: '#D3D3D3',
    padding: 4
  },
  firstPositionLabel: {
    position: 'absolute',
    bottom: 5,
    left: 10,
    borderRadius: 9999,
    backgroundColor: '#D3D3D3',
    padding: 4
  },
  positionLabelText: {
    color: 'white',
    textAlign: 'center',
    margin: 0,

    fontSize: 8
  },
  gridItemStructure: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    position: 'relative',
    height: '100%',
    width: '100%'
  }
})

const MovableTile = (
  { children, positions, id }: MovableTileProps,
  index: number
) => {
  const position = getPosition(positions.value[id])
  const translateX = useSharedValue(position.x)
  const translateY = useSharedValue(position.y)
  const isGestureActive = useSharedValue(false)
  const [order, setOrder] = useState(positions.value[id])
  const derivedOrder = useDerivedValue(() => positions.value[id])

  const style = useAnimatedStyle(() => {
    const zIndex = isGestureActive.value ? 100 : 0
    const shadowOpacity = withSpring(isGestureActive.value ? 0.2 : 0)
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: TILE_SIZES[positions.value[id]].height,
      width: TILE_SIZES[positions.value[id]].width,
      zIndex,
      shadowColor: 'black',

      shadowOpacity,
      shadowRadius: 10,
      shadowOffset: {
        height: 0,
        width: 0
      },
      borderWidth: 1,
      borderRadius: 8,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value }
      ]
    }
  })
  const positionLabelStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: 5,
      left: 10,
      borderRadius: 9999,
      backgroundColor: '#D3D3D3',
      textAlign: 'center',
      textAlignVertical: 'center',
      padding: derivedOrder.value !== 0 ? 2 : 3,
      height: derivedOrder.value !== 0 ? 14 : 16,
      width: derivedOrder.value !== 0 ? 14 : 60
    }
  })

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder)
      translateX.value = withTiming(newPosition.x, animationConfig)
      translateY.value = withTiming(newPosition.y, animationConfig)
      runOnJS(setOrder)(newOrder)
    }
  )

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
    onStart: (_, ctx) => {
      isGestureActive.value = true
      ctx.x = translateX.value
      ctx.y = translateY.value
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = ctx.x + translationX
      translateY.value = ctx.y + translationY
      const oldOrder = positions.value[id]
      const newOrder = getOrder(translateX.value, translateY.value)

      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder
        )

        if (idToSwap) {
          // clones the object. we do dirty way to clone. spread operator is not supported. hermes is not in ios for Object.assign
          const newPositions = JSON.parse(JSON.stringify(positions.value))
          newPositions[id] = newOrder
          newPositions[idToSwap] = oldOrder
          positions.value = newPositions
          if (Platform.OS === 'ios') {
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy)
          }
        }
      }
    },
    onEnd: (_, ctx) => {
      if (Platform.OS === 'ios') {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy)
      }
      const destination = getPosition(positions.value[id])
      translateX.value = withTiming(destination.x, animationConfig)
      translateY.value = withTiming(destination.y, animationConfig, () => {
        isGestureActive.value = false
      })
    }
  })

  const handleActivated = () => {
    if (Platform.OS === 'ios') {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy)
    }
  }
  return (
    <Animated.View style={style}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        activateAfterLongPress={200}
        onActivated={handleActivated}
      >
        <Animated.View style={styles.gridItemStructure}>
          <Animated.View style={positionLabelStyle}>
            <Animated.Text style={styles.positionLabelText}>
              {order === 0 ? 'Main photo' : order + 1}
            </Animated.Text>
          </Animated.View>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  )
}

export default MovableTile
