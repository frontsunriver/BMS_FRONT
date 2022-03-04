import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import NumberFormat from 'react-number-format'
import theme from '../Themes/configs/default'
import NavigationService from '../Navigation'
import Routes from '../Navigation/Routes'

const ChargeBalanceList = () => {
    const goDetail = () => {
        NavigationService.navigate(Routes.CHARGE_DETAIL_SCREEN);
    }

    return (
        <TouchableOpacity onPress={goDetail}>
            <View
            style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
                <View>
                    <Text>207 Crystal Redisinge</Text>
                </View>
                <View>
                    <NumberFormat value={200003.38} displayType={'text'} thousandSeparator={true} prefix={'$'} 
                    renderText={(value, props) => {
                        return(
                            <Text>{value}</Text>
                        )
                    }}/>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChargeBalanceList