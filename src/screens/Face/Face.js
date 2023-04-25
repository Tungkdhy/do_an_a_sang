import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { getImageFace } from "../../redux/actions/actions";
import * as FaceDetector from "expo-face-detector";
import axiosClient from "../../utils/axiosClient";
import * as FileSystem from 'expo-file-system';

import { useDispatch, useSelector } from "react-redux";

export default function Face({navigation}) {
  const [hasPermission, setHasPermission] = React.useState();
  const [camera, setCamera] = useState(null);
  const [faceData, setFaceData] = React.useState([]);
  const image = useSelector(state=>state.userReducer)
//   console.log(image);
  const [left, setLeft] = useState(false);
  const [count, setCount] = useState(1);
  const [countRight, setCountRight] = useState(1);
  const [pt,setPt] = useState(0)
  const [ptr,setPtr] = useState(0)
  const dispath = useDispatch()
  const takePicture = async () => {
   try{
    if (camera) {
        const photo = await camera.takePictureAsync();
        const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: 'base64' });
        dispath(getImageFace(base64))
        const res = await axiosClient.post('/Users/facemtaching/',{
            image_cccd:image.base64cccd,
            image_selfphy:base64
        })
        if(res.data.match){

            navigation.navigate("Thông tin")
        }
        else{
            Alert.alert("Xác thực không thàng công vui lòng chụp lại khuôn mắt và căn cước công dân")
        }
      }
   }
   catch(e){
    console.log(e);
    navigation.navigate("Thông tin")
   }
  };
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>Vui lòng để mặt sát máy ảnh</Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        return (
          <>
            {count >= 50 ? (
              <View style={styles.faces} key={index}>
                <Text style={styles.faceDesc}>
                  {countRight < 50
                    ? "Thành công vui lòng quay mặt sang trái:" + ptr+"%" 
                    : "Vui lòng chụp ảnh chân dung"}
                </Text>
              </View>
            ) : (
              <View style={styles.faces} key={index}>
                <Text style={styles.faceDesc}>Quay mặt sang trái: {pt}%</Text>
              </View>
            )}
          </>
        );
      });
    }
  }
  useEffect(() => {
    if (faceData.length > 0) {
      if (faceData[0].yawAngle <= -10 && count <= 50) {
        setCount(count + 1);
        setPt((count+1)*100/50)
      } else if (faceData[0].yawAngle >= 10 && count > 50 && countRight <= 50) {
        setCountRight(countRight + 1);
        setPtr((countRight+1)*100/50)
      }
    }
    // if (faceData.length === 0) {
    //   setCount(1);
    //   setCountRight(1);
    // }
  }, [faceData]);

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <Camera
         ref={(ref) => setCamera(ref)}
        type={Camera.Constants.Type.front}
        style={styles.camera}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {getFaceDataView()}
      </Camera>
      {count > 50 && countRight > 50 && (
        <View style={{ alignItems: "center" }}>
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  faces: {
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
  },
  faceDesc: {
    fontSize: 20,
  },
});
