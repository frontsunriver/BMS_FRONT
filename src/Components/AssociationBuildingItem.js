import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../Themes/configs/default'
import Routes from '../Navigation/Routes'
import { useNavigation } from '@react-navigation/native'


const AssociationBuildingItem = (props) => {
    const {type, data} = props;
    const navigation = useNavigation();
    const [statusColor, setStatusColor] = useState({color: theme.colors.background});

    const showDetail = () => {
        navigation.navigate(Routes.ASSOCIATION_ANNOUNCE_DETAIL_SCREEN, {data: data})
    }

    return (
        <TouchableOpacity onPress={showDetail}>
        <View
        style={{borderRadius: 3, backgroundColor: '#ddd', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8, marginTop: 5}}>
            <View style={{flexDirection: 'column', justifyContent: "space-between", alignItems: 'flex-start', alignContent: 'center'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'space-between'}}>
                    <Text>{data.name}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>
    )
}

export default AssociationBuildingItem