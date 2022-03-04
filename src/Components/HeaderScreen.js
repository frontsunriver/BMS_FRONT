import React, {useEffect, useState} from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Alert, Image } from 'react-native';
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'
import useAppTheme from '../Themes/Context';
import useTranslation from '../i18n';
import NavigationService from '../Navigation';
import Routes from '../Navigation/Routes';
import { useNavigation } from '@react-navigation/native';

const HeaderScreen = (props) => {
    const navigation = useNavigation();
    const {t} = useTranslation();
    const {theme} = useAppTheme();
    const {title1, title2, type, association} = props;
    const [height, setHeight] = useState(0);
    const [double, setDouble] = useState(false);
    const [iconType, setIconType] = useState('back');
    const drawIcon = parseIconFromClassName('fas fa-bars')
    const leftIcon = parseIconFromClassName('fas fa-chevron-left')
    const homeIcon = parseIconFromClassName('fas fa-home');
    
    useEffect(() => {
      let isMounted = true;    
      if (isMounted) {
        if(title2) {
            setHeight(80);
            setDouble(true);
        }else {
            setHeight(80);
            setDouble(false);
        }
        if(type == 'home'){
          setIconType('home');
        }else {
          setIconType('back');
        }
      }
      return () => { isMounted = false };
    }, []);

    useEffect(() => {
      if(title2) {
          setHeight(80);
          setDouble(true);
      }else {
          setHeight(80);
          setDouble(false);
      }
    }, [title2])

    useEffect( () => {
      if(type == 'home'){
        setIconType('home');
      }else {
        setIconType('back');
      }
    }, [type] )

    const handleBack = () => {
      if(type == 'home') {
        NavigationService.navigate(association ? Routes.ASSOCIATION_HOME_SCREEN : Routes.HOME_SCREEN)
      }else {
        navigation.goBack();
      }
    }

    const renderHeaderString = () => {
        if(double) {
          return (
            <View style={{flexDirection: "column", justifyContent: 'space-between', textAlign:'center', alignItems: 'center'}}>
                <Text
                  style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: theme.colors.defaultText,
                  }}>
                  {title1}
                </Text>
                {/* <Text
                  style={{
                      fontSize: 25,
                      textAlign: 'center',
                      marginTop: 10,
                      color: theme.colors.defaultText,
                  }}>
                  {title2}
                </Text> */}
            </View>
          )
        } else {
          return (
            <View style={{flexDirection: "column", justifyContent: 'center', textAlign:'center', alignItems: 'center'}}>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        color: theme.colors.defaultText,
                    }}>
                    {title1}
                </Text>
            </View>
          )
        }
    }

    const showIconRender = () => {
      if (iconType == 'home') {
        return (
          <TouchableOpacity onPress={() => {
            NavigationService.toggleDrawer();
          }}>
            <FontAwesome icon={drawIcon} style={{color: theme.colors.primary, fontSize: 20}} />
          </TouchableOpacity>
        )
      }else {

        return (
          <TouchableOpacity onPress={handleBack}>
            <FontAwesome icon={leftIcon} style={{color: theme.colors.primary, fontSize: 20}} />
          </TouchableOpacity>
        )
      }
    }

    const goHome = () => {
      NavigationService.navigate(association ? Routes.ASSOCIATION_HOME_SCREEN : Routes.HOME_SCREEN)
    }
    
    return (
        <View
            style={{
              backgroundColor: theme.colors.primary,
              height: height,
            }}>
            <View style={{
                backgroundColor: theme.colors.background,
                height: height,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15
            }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 40,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
              >
                {showIconRender()}
                {renderHeaderString()}
                <TouchableOpacity onPress={goHome}>
                  <FontAwesome icon={homeIcon} style={{color: theme.colors.primary, fontSize: 20}} />
                </TouchableOpacity>
              </View>
              <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20
              }}>
                
              </View>
            </View>
        </View>
    )
}

export default HeaderScreen