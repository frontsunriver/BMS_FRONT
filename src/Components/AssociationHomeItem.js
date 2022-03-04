import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import useAppTheme from '../Themes/Context';
import NavigatService from '../Navigation';
import Routes from '../Navigation/Routes';

const HomeItem = () => {
    const {theme} = useAppTheme();
    const requestIcon = parseIconFromClassName('fas fa-user-edit')
    const archievedIcon = parseIconFromClassName('fas fa-check-double')
    const reportedIcon = parseIconFromClassName('fas fa-file-import');
    const reportIcon = parseIconFromClassName('fas fa-pencil-alt');
    const settingIcon = parseIconFromClassName('fas fa-cogs');
    const messageIcon = parseIconFromClassName('fas fa-envelope');
    return (
        <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_REQUEST_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={requestIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>PENDING REQUESTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_ARCHIEVED_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={archievedIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>ARCHIEVED REQUESTS</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_REPORT_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={reportIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>REPORTS</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_MESSAGES_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={messageIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>MESSAGES</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', margin: 10, justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_ISSUES_REPORTED_DASHBOARD_SCREEN)
                }}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome icon={reportedIcon} style={{color: theme.colors.background, fontSize: 50}} />
                        <Text style={{fontSize: 15, marginTop: 5}}>ISSUES REPORTED</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableStyle} onPress={() => {
                    NavigatService.navigate(Routes.ASSOCIATION_SETTINGS_SCREEN)
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