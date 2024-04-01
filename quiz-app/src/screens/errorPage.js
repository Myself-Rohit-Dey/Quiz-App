// ErrorPage.js

import React from 'react';
import { View, Text } from 'react-native';

const ErrorPage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>404 Not Found</Text>
      <Text style={{ fontSize: 16 }}>Oops! The page you're looking for doesn't exist.</Text>
      {/* You can add additional information or options here */}
    </View>
  );
};

export default ErrorPage;
