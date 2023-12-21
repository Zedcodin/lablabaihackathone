import React, { useState, useRef } from 'react';
import { View, FlatList, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-view';
import { colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  console.log(inputText)

  const flatListRef = useRef();

  const handleSend = async () => {
    if (inputText.trim() === '') {
      return;
    }

    const newUserMessage = {
      id: messages.length + 1,
      text: inputText,
      timestamp: new Date().toISOString(),
      role: 'user',
    };

    // Update the chat with the user's message
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText('');

    // Scroll to the end of the list when a new message is sent
    flatListRef.current.scrollToEnd({ animated: true });

    // Send the user's message to the server
    try {
      const response = await fetch('https://4efa-102-145-115-230.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: inputText }),
      });

      if (response.ok) {
        const responseData = await response.json();

        // Update the chat with the bot's response
        const newBotMessage = {
          id: messages.length + 2,
          text: responseData.response,
          timestamp: new Date().toISOString(),
          role: 'bot',
        };

        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
        // Scroll to the end of the list after receiving the bot's response
        flatListRef.current.scrollToEnd({ animated: true });
      } else {
        console.error('Failed to get a response from the server');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.role === 'user' ? styles.messageContainer1 : styles.messageContainer2}>
      <View style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
        <Text style={{fontSize:20,color:colors.colorWhite}}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
    style={{flex:1}}
    >
      <StatusBar style='light' backgroundColor={colors.colorPrimary}  />
    <View style={{height:40,justifyContent:'center',alignItems:'center',backgroundColor:colors.colorPrimary}}>
      <Text style={{color:colors.colorWhite,fontSize:20,fontWeight:'bold'}}>DivineDialogue Chat with the BiBle</Text>
    </View>
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={colors.colorWhite}
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={{backgroundColor:colors.colorSecondary,height:45,width:60,justifyContent:"center",alignItems:'center',borderRadius:8}} onPress={handleSend} >
          <Text style={{color:colors.colorWhite,fontStyle:'italic',fontWeight:'bold'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:colors.colorPrimary
  },
  messageContainer1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 8,
    
    
    
  },
  messageContainer2: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    margin: 8,
    
    
    
  },
  userMessage: {
    backgroundColor: colors.colorBlob,
    padding: 8,
    borderRadius: 8,
    maxWidth: '90%',
  },
  botMessage: {
    backgroundColor: colors.colorGray,
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    height:55
  },
  input: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    color:"white"
  },
});

export default ChatView;
