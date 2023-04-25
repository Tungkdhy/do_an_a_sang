import React, { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Pressable,Image } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { useDispatch } from "react-redux";
import { getImageCCCD } from "../../redux/actions/actions";
import * as FileSystem from 'expo-file-system';
const CameraScreen = ({navigation}) => {
  const [camera, setCamera] = useState(null);
  const [cmndBefore, setCmndBefore] = useState();
  const [cmndAfter, setCmndAfter] = useState();
  const [is1, setIs1] = useState(false);
  const [is2, setIs2] = useState(false);
  const dispath = useDispatch()
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
      if(is1){
        setCmndAfter(photo.uri);
        dispath(getImageCCCD(base64))
        setIs1(false);
      }
      else{
        setCmndBefore(photo.uri)
        setIs2(false)
      }
      
    }
  };
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      
      
      if (status !== "granted") {
        alert("Permission to access camera was denied");
      }
    })();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {  is2 && (
        <>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={{ height: 1000 }}
            type={Camera.Constants.Type.back}
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.off}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              // backgroundColor: "",
              // opacity:0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 360, height: 260, borderRadius: 12 }}></View>
          </View>
          <Pressable
            style={{
              position: "absolute",
              bottom: 24,
              left: 150,
              borderRadius: 12,
              backgroundColor: "red",
              padding: 16,
              paddingLeft: 28,
              paddingRight: 28,
            }}
            onPress={takePicture}
          >
            <Text style={{ color: "#fff" }}>Chụp ảnh</Text>
          </Pressable>
        </>
      )}
        { is1  && (
        <>
          <Camera
            ref={(ref) => setCamera(ref)}
            style={{ height: 1000 }}
            type={Camera.Constants.Type.back}
            autoFocus={Camera.Constants.AutoFocus.on}
            flashMode={Camera.Constants.FlashMode.off}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              // backgroundColor: "",
              // opacity:0.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 360, height: 260, borderRadius: 12 }}></View>
          </View>
          <Pressable
            style={{
              position: "absolute",
              bottom: 24,
              left: 150,
              borderRadius: 12,
              backgroundColor: "red",
              padding: 16,
              paddingLeft: 28,
              paddingRight: 28,
            }}
            onPress={takePicture}
          >
            <Text style={{ color: "#fff" }}>Chụp ảnh</Text>
          </Pressable>
        </>
      )}
      {/* <View style={{marginTop: 40,alignItems:"center"}}>
        <Text style={{fontSize:20}}>Giấy tờ xác thức chứng minh nhân dân</Text>
      </View> */}
      <View style={{ padding: 20,  }}>
        <Text style={{ marginTop: 20,fontSize:20 }}>Ảnh mặt trước căn cước công dân</Text>
        <Pressable onPress={() => setIs1(!is1)}>
          <View
            style={{
              width: "80%",
              height:220,
              backgroundColor: "#ccc",
              // padding: 20,
              marginLeft: 40,
              marginRight: 40,
              marginTop: 20,
              borderRadius: 20,
              alignItems:"center"
            }}
          >
            <Image
              source={{
                uri: cmndAfter,
              }}
              style={{ height:220,width:110 }}
            />
          </View>
        </Pressable>
        <Text style={{ marginTop: 20,fontSize:20 }}>Ảnh mặt sau căn cước công dân</Text>
        <Pressable onPress={() => setIs2(!is2)}>
          <View
             style={{
              width: "80%",
              height:220,
              backgroundColor: "#ccc",
              // padding: 20,
              marginLeft: 40,
              marginRight: 40,
              marginTop: 20,
              borderRadius: 20,
              alignItems:"center"
            }}
          >
            <Image
              source={{
                uri: cmndBefore,
              }}
              style={{ height:220,width:110 }}
            />
          </View>
        </Pressable>
      </View>

      <View style={{ alignItems: "center" }}>
        <Pressable
          style={{
            // position: "absolute",
            width: 200,
            borderRadius: 4,
            backgroundColor: "green",
            padding: 16,
            paddingLeft: 32,
            paddingRight: 32,
            alignItems: "center",
            paddingTop:20
          }}
          onPress={()=>navigation.navigate('Face')}
        >
          <Text style={{ color: "#fff" }}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CameraScreen;
