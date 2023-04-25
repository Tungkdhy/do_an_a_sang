import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home/Home";
import Info from "./src/screens/Info/Info";
import Face from "./src/screens/Face/Face";
import CameraScreen from "./src/screens/Camera/Camera";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login/Login";
import { Store } from './src/redux/store';
import { Provider } from 'react-redux';
// import { Camera } from 'expo-camera';
const Stack = createStackNavigator();
export default function App() {
  return (
   <Provider store={Store}>
     <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Đăng nhập"
          screenOptions={{ headerShown: true }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Face" component={Face} />
          <Stack.Screen name="Thông tin" component={Info} />
          <Stack.Screen name="Chụp xác thực căn cước công dân" component={CameraScreen} />
          <Stack.Screen name="Đăng nhập" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
