import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Button } from 'react-native-paper';
import useAppTheme from '../Themes/Context';
import useTranslation from '../i18n';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NavigationService from '../Navigation';
import Routes from '../Navigation/Routes';
import theme from '../Themes/configs/default';

const AssociationFooterScreen = (props) => {
    const {theme} = useAppTheme();
    const {tabIndex} = props
    const {t} = useTranslation();

    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-around',
            position: 'absolute', //Here is the trick
            bottom: 0, //Here is the trick
          }}>
            <View style={{flexDirection: 'column', flex: 1,}}>
                <View style={{flexDirection: 'row', flex:1, justifyContent: 'center', backgroundColor: theme.colors.background}}>
                    <TouchableOpacity style={tabIndex == 1 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_REQUEST_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 1 ? styles.activeTextColor : styles.normalTextColor}>OPEN REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tabIndex == 2 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_ARCHIEVED_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 2 ? styles.activeTextColor : styles.normalTextColor}>ARCHIEVED REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tabIndex == 3 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_REPORT_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 3 ? styles.activeTextColor : styles.normalTextColor}>REPORTS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', flex:1, justifyContent: 'center', backgroundColor: theme.colors.background}}>
                    <TouchableOpacity style={tabIndex == 4 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_MESSAGES_DASHBOARD_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 4 ? styles.activeTextColor : styles.normalTextColor}>MESSAGES</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tabIndex == 5 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_ISSUES_REPORTED_DASHBOARD_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 5 ? styles.activeTextColor : styles.normalTextColor}>ISSUE REPORTED</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={tabIndex == 6 ? styles.touchableActiveStyle : styles.touchableStyle} onPress={() => {
                        NavigationService.navigate(Routes.ASSOCIATION_SETTINGS_SCREEN)
                    }}>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <Text style={tabIndex == 6 ? styles.activeTextColor : styles.normalTextColor}>SETTINGS</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    touchableStyle: {
        padding: 8,
        justifyContent: 'space-between', 
        alignContent: 'center', 
        alignItems: 'center', 
        width: (Dimensions.get('window').width / 3)
    },
    touchableActiveStyle: {
        padding: 8,
        justifyContent: 'space-between', 
        alignContent: 'center', 
        alignItems: 'center', 
        borderBottomColor: '#fff',
        borderBottomWidth: 0.9,
        width: (Dimensions.get('window').width / 3)
    },
    normalTextColor: {
        fontSize: 12, 
        color: '#b9bdbc'
    },
    activeTextColor: {
        fontSize: 12, 
        color: theme.colors.primary
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 10,
    },
})

export default AssociationFooterScreen;