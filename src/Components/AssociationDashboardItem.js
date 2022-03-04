import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../Themes/configs/default'
import Routes from '../Navigation/Routes'
import { useNavigation } from '@react-navigation/native'


const AssociationDashboardItem = (props) => {
    const {type, data} = props;
    const navigation = useNavigation();
    const [statusColor, setStatusColor] = useState({color: theme.colors.background});
    const [statusText, setStatusText] = useState('Pending');
    useEffect(() => {
        if(data.status == 2) {
            setStatusText('Approved');
            setStatusColor({color: '#00E01A'});
        }
    }, [])

    const showDetail = () => {
        navigation.navigate(Routes.ASSOCIATION_REQUEST_DETAIL, {data: data})
    }

    return (
        <TouchableOpacity onPress={showDetail}>
        <View
        style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8}}>
            <View style={{flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center'}}>
                <Text style={[{fontWeight: 'bold'}, statusColor]}>{statusText}</Text>
                <Text>Date Created:</Text>
                <Text>{type == 3 ? data.carried_date : data.move_date}</Text>
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

export default AssociationDashboardItem