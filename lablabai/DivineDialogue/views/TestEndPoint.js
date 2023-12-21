import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const YourComponent = () => {
  useEffect(() => {
    console.log(1)
    // The URL of the endpoint
    const endpointURL = 'https://8a7f-197-213-71-210.ngrok-free.app/chat';

    // The data you want to send (if any)
    const requestData = {
      // Your request data goes here
      user_message: 'john 3 vs 16',
    };

    // Make a POST request to the endpoint with the fetch API
    fetch(endpointURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the successful response
        console.log('Response:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error.message);
      });
  }, []); // Empty dependency array means this effect will only run once when the component mounts

  return (
    <SafeAreaView>
      <View>
        <Text>Your React Native Component</Text>
        {/* Your component UI goes here */}
      </View>
    </SafeAreaView>
  );
};

export default YourComponent;
