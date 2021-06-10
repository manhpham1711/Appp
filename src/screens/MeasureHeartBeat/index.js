import React, { Component, useRef,useEffect } from 'react';
import { View, Text, StyleSheet,Animated  } from 'react-native';
import { Circle } from 'react-native-progress';
import { SvgIcon } from '../../themes/Svg';

const MeasureHeartBeat = () => {
   const anim = useRef(new Animated.Value(1));

  useEffect(() => {

    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 1.2, 
          duration: 200,
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1, 
          duration: 200,
        }),
      ])
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: anim.current }] }}>
         <SvgIcon.Heart size={32}/>
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default MeasureHeartBeat;
