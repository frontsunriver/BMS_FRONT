import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

const MessageItem = (props) => {
    const {data} = props;

    return (
        <View style={{flexDirection: 'column', marginTop: 15, paddingBottom: 10, borderBottomColor: '#e2e2e2', borderBottomWidth: 0.8}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 15}}>{data.first_name} </Text>
                    <Text style={{fontSize: 15}}>{data.last_name}</Text>
                </View>
                <Text style={{fontSize: 12}}>{data.reg_date}</Text>
            </View>
            <View style={{flexDirection: 'column', marginTop: 10}}>
                <Text style={{fontSize: 20}}>{data.messages}</Text>
            </View>
        </View>
    )
}

export default MessageItem