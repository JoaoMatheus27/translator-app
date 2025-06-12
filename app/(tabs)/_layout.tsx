import { Tabs } from "expo-router";
import React from "react";
import { icons } from "../constants/icons";
import TabIcon from "../components/TabIcon";
import "../global.css";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          borderRadius: 50,
          marginBottom: 20,
          marginHorizontal: 10,
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Record",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon={icons.play} focused={focused} title="Record" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
