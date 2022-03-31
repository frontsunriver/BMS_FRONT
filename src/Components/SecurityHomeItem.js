import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import useAppTheme from '../Themes/Context';
import NavigatService from '../Navigation';
import Routes from '../Navigation/Routes';

const SecurityHomeItem = () => {
    const {theme} = useAppTheme();
    const moveInIcon = parseIconFromClassName('fas fa-hand-point-right')
    const moveOutIcon = parseIconFromClassName('fas fa-hand-point-left')
    const maintenanceIcon = parseIconFromClassName('fas fa-wrench');
    const reportIcon = parseIconFromClassName('fas fa-pencil-alt');
    const messageIcon = parseIconFromClassName('fas fa-envelope');
    const settingIcon = parseIconFromClassName('fas fa-cogs');
    const accessCard = parseIconFromClassName('fas fa-credit-card');
    const acMaintenance = parseIconFromClassName('fas fa-universal-access');
    return (
        <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.SECURITY_VISIT_ENTRY_HOME)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={moveInIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>VISIT ENTRY</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.SECURITY_ARCHIVE_HOME)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={moveOutIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>ARCHIVED REQUEST</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    touchableStyle: {
        flex: 1, 
        padding: 10,
        justifyContent: 'center', 
        alignContent: 'center', 
        alignItems: 'center', 
        borderWidth: 0.8, 
        borderColor: '#ddd'
    }
})

export default SecurityHomeItem;