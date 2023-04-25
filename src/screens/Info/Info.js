import React, { useState } from 'react';
import { View,TextInput,Button,Text,TouchableHighlight } from 'react-native';

import { styles } from './styles';
import { useEffect } from 'react';
import axiosClient from '../../utils/axiosClient';
import { useSelector } from 'react-redux';
const Info = () => {
    const [info,setInfo] = useState()
    const data = useSelector(state=>state.userReducer)
    useEffect(()=>{
        async function getInfo(){
            try{
                const res = await axiosClient.post("/Users/recognition/",{
                    image_cccd:data.base64face
                })
                setInfo(res.data)
            }
            catch(e){

            }
        }
        getInfo()
    },[])
    return (
       <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Họ tên</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Số CMND *</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Ngày sinh</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Giới tính</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Đặc điểm nhận dạng</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Ngày cấp</Text>
                <TextInput style={styles.input}/>
            </View>
            <TouchableHighlight style={styles.btn}>
                <Text style={{color:"#fff"}}>Xác nhận</Text>
            </TouchableHighlight>
       </View>
    );
};

export default Info;