import { images } from '../constants/images';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import "../global.css";

// 1. Define an interface for your TabIcon's props
interface TabIconProps {
  focused: boolean; // Assuming 'focused' is a boolean
  icon: any;        // Assuming 'icon' can be any image source (number for require(), or object for URI)
  title: string;
  iconSize?: number; // Make 'iconSize' optional with '?' and give it a default value
}

// 2. Use the interface for your component's props
const TabIcon = ({ focused, icon, title, iconSize = 20 }: TabIconProps) => { // Use TabIconProps here
  const iconStyle = {
    width: iconSize,
    height: iconSize,
  };

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={styles.highlight}
      >
        <Image source={icon} tintColor="white" style={iconStyle} />
        <Text className='text-white font-bold ml-2'>{title}</Text>
      </ImageBackground>
    );
  }
  return(
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      <Image source={icon} tintColor="white" style={iconStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  highlight: {
    display:"flex",
    flex:1,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    overflow:"hidden",
    marginTop:10,
    width:90,
    minHeight:40,
    borderRadius:100,
  },
});

export default TabIcon;