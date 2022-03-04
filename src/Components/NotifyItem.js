import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NumberFormat from 'react-number-format'
import theme from '../Themes/configs/default'
import NavigationService from '../Navigation'
import Routes from '../Navigation/Routes'
import { DOWNLOAD_URL } from '../Config'
import { useNavigation } from '@react-navigation/native'

const NotifyItem = (props) => {
    const {data} = props;
    const navigation = useNavigation();
    // useEffect(() => {
    //     console.log(data);
    //     if(data.status == 2) {
    //         setStatusText('Approved');
    //         setStatusColor({color: '#00E01A'});
    //     }
    // }, [])
    const sendDetail = () => {
        navigation.navigate(Routes.MESSAGES_DETAIL_SCREEN, {data: data})
    }
    return (
        <TouchableOpacity onPress={sendDetail}>
            <View
            style={{flexDirection: 'row', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <Image source={{uri:(DOWNLOAD_URL + data.photofile)}} style={{width: 50, height: 50}}></Image>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{paddingLeft: 5, paddingRight: 5}}>{data.content}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                    <Text style={{fontSize: 11}}>{data.submit_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NotifyItem