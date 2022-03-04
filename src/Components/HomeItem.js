import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import useAppTheme from '../Themes/Context';
import NavigatService from '../Navigation';
import Routes from '../Navigation/Routes';

const HomeItem = () => {
    const {theme} = useAppTheme();
    const moveInIcon = parseIconFromClassName('fas fa-hand-point-right')
    const moveOutIcon = parseIconFromClassName('fas fa-hand-point-left')
    const maintenanceIcon = parseIconFromClassName('fas fa-wrench');
    const reportIcon = parseIconFromClassName('fas fa-pencil-alt');
    const messageIcon = parseIconFromClassName('fas fa-envelope');
    const settingIcon = parseIconFromClassName('fas fa-cogs');
    return (
        <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.NOC_MOVE_IN_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={moveInIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>NOC MOVE IN</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.NOC_MOVE_OUT_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={moveOutIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>NOC MOVE OUT</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.NOC_MAINTENANCE_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={maintenanceIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>NOC MAINTENANCE</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.MESSAGES_DASHBOARD)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={messageIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>MESSAGES</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.REPORT_ISSUES_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={reportIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>REPORT ISSUES</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.SETTINGS_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={settingIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>SETTINGS</Text>
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

export default HomeItem;