import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NumberFormat from 'react-number-format'
import theme from '../Themes/configs/default'
import Routes from '../Navigation/Routes'
import { useNavigation } from '@react-navigation/native'

const DashboardItem = (props) => {
    const {type, data} = props;
    const [statusColor, setStatusColor] = useState({color: theme.colors.background});
    const [statusText, setStatusText] = useState('Pending');
    const navigation = useNavigation();
    useEffect(() => {
        if(data.status == 2) {
            setStatusText('Approved');
            setStatusColor({color: '#00E01A'});
        }else if(data.status == 3) {
            setStatusText('Rejected');
            setStatusColor({color: '#F11717'});
        }
    }, [])

    const goReplyHandle = () => {
        navigation.navigate(Routes.MOVE_RESPONSE_SCREEN, {data: data});
    }

    return (
        <TouchableOpacity onPress={goReplyHandle}>
            <View
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8}}>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text style={[{fontWeight: 'bold'}, statusColor]}>{statusText}</Text>
                    <Text>Date Created:</Text>
                    <Text>{data.move_date}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text>Building:</Text>
                    <Text>{data.building_name}</Text>
                </View>
                <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                    <Text>Unit:</Text>
                    <Text>{data.unit_name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default DashboardItem