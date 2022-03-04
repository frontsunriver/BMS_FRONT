import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import useAppTheme from '../Themes/Context';
import useTranslation from '../i18n';
import NavigationService from '../Navigation';
import Routes from '../Navigation/Routes';

const ActionButton = (props) => {
    const {t} = useTranslation();
    const {theme} = useAppTheme();
    const {url} = props;
    const plusIcon = parseIconFromClassName('fas fa-plus')

    const showIconRender = () => {
        return (
          <TouchableOpacity onPress={() => {
            NavigationService.navigate(url)
          }}>
            <FontAwesome icon={plusIcon} style={{color: theme.colors.primary, fontSize: 25}} />
          </TouchableOpacity>
        )
    }
    
    return (
        <View
            style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute', //Here is the trick
                bottom: 130, //Here is the trick
                right: 30,
                backgroundColor: theme.colors.background,
                borderRadius: 50
        }}>
            {showIconRender()}
        </View>
    )
}

export default ActionButton;