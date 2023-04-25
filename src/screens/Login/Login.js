import React from 'react';
import { View,TextInput,Button,Text,TouchableHighlight, Alert } from 'react-native';
import { styles } from './styles';
const Login = ({navigation}) => {
    const [userName,setUserName] = React.useState()
    const [pass,setPass] = React.useState()
    const handleLogin = ()=>{
        if(pass === "admin" && userName ==="admin"){
            navigation.navigate("Chụp xác thực căn cước công dân");
        }
        else{
            Alert.alert("Đăng nhập không thành công")
        }
    }
    return (
       <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Tên tài khoản</Text>
                <TextInput onChangeText={(data)=>setUserName(data)} value={userName} style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text  style={styles.label}>Mật khẩu</Text>
                <TextInput value={pass} onChangeText={(data)=>setPass(data)} secureTextEntry={true} style={styles.input}/>
            </View>
            <TouchableHighlight onPress={handleLogin} style={styles.btn}>
                <Text style={{color:"#fff"}}>Đăng nhập</Text>
            </TouchableHighlight>
       </View>
    );
};

export default Login;