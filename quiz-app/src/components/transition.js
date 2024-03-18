import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Transitioning } from 'react-native-reanimated';

const Transition = ({ children }) => {
  const transitionRef = React.useRef();

  const transition = (
    <Transition.Together>
      <Transition.In type="fade" durationMs={400} />
      <Transition.Out type="fade" durationMs={400} />
    </Transition.Together>
  );

  return (
    <View style={styles.container}>
      <Transitioning.View
        ref={transitionRef}
        transition={transition}
        style={styles.container}
      >
        {children}
      </Transitioning.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Transition;
