import React from 'react';
import { View,TextInput,Button,Text,TouchableHighlight } from 'react-native';
import { styles } from './styles';
const Home = () => {
    return (
       <View style={styles.form}>
            <View style={styles.formControl}>
                <Text style={styles.label}>Tên khách hàng *</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Số CMND *</Text>
                <TextInput style={styles.input}/>
            </View>
            <View style={styles.formControl}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput style={styles.input}/>
            </View>
            <TouchableHighlight style={styles.btn}>
                <Text style={{color:"#fff"}}>Thêm mới</Text>
            </TouchableHighlight>
       </View>
    );
};

export default Home;