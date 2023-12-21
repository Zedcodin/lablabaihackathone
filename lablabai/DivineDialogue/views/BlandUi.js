// YourComponent.js

import React, { useState } from 'react';
import { View, Text ,TouchableOpacity,Image} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

const YourComponent = ({navigation}) => {
    const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <SafeAreaView
    style={{backgroundColor:colors.colorPrimary,flex:1,justifyContent:'center',alignItems:'center',gap:30}}
    
    >
    <StatusBar style='light' />
    <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:25,color:colors.colorWhite,fontWeight:'bold'}}>Divine</Text>
        <Text style={{fontSize:25,color:colors.colorSecondary,fontWeight:"bold"}}>Dialogue</Text>
    </View>

    <View  style={{width:100,height:100,borderRadius:50, justifyContent:'center',alignItems:'center',backgroundColor:colors.colorSecondary}}>
        <Image resizeMode="center" style={{height:"100%",width:"100%"}} source={require('../assets/mic.png')}/>
    </View>
    <Text style={{color:colors.colorWhite,fontStyle:'italic',fontWeight:'bold'}}>Ask me something..!</Text>

    <TouchableOpacity style={{backgroundColor:colors.colorSecondary,height:45,width:150,justifyContent:"center",alignItems:'center',borderRadius:8,elevation:20,marginTop:40}} onPress={()=>navigation.navigate("Home")} >
          <Text style={{color:colors.colorWhite,fontStyle:'italic',fontWeight:'bold'}}>Chat with the BiBle</Text>
        </TouchableOpacity>
    
    </SafeAreaView>
  );
};

export default YourComponent;
