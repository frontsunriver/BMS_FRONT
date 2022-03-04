import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import useTranslation from '../../i18n';
import {Container} from '../../Components';
import DocumentPicker from 'react-native-document-picker';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import Routes from '../../Navigation/Routes';

const Settings = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const { t } = useTranslation();
  const [singleFile, setSingleFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const importHandle = async () => {
    setLoading(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      setSingleFile(res[0]);
      var formData = new FormData();
      formData.append('importexcel', res[0]);

      await axios.post(`${BASE_URL}import/excel`, formData,
      { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
        if(res.data.success) {
          setLoading(false);
          showSuccessToast('Your request is sent successfully. Please wait for the reply.');
          setSingleFile(null);
        }else {
          setLoading(false);
          showErrorToast(res.data.message);
        }
      }).catch(err => {
        setLoading(false);
        showErrorToast('Something went wrong! Please try again.');
      });
    } catch (err) {
      setLoading(false);
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        
      } else {
        
      }
    }
  }

  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 100, flexDirection: 'column', justifyContent: 'center'}}>
              <View
              style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Button
                      mode="contained"
                      style={{borderRadius: 5, marginLeft: 30, marginRight: 30, padding: 5}}
                      color={theme.colors.background}
                      onPress={() => {navigation.navigate(Routes.ASSOCIATION_GET_ALL_BUILDINGS)}}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: theme.colors.primary
                        }}>
                        Manage Building
                      </Text>
                    </Button>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <Button
                      mode="contained"
                      style={{borderRadius: 5, marginLeft: 30, marginRight: 30, padding: 5}}
                      color={theme.colors.background}
                      onPress={() => {navigation.navigate(Routes.ASSOCIATION_MANAGE_OWNERS)}}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: theme.colors.primary
                        }}>
                        Manage Owners
                      </Text>
                    </Button>
                  </View>
                  <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <Button
                      loading={loading}
                      mode="contained"
                      style={{borderRadius: 5, marginLeft: 30, marginRight: 30, padding: 5}}
                      color={loading ? theme.colors.accent : theme.colors.background}
                      onPress={importHandle}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: theme.colors.primary
                        }}>
                        Import Document File
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <Toast />
          </ScrollView>
          <AssociationFooterScreen tabIndex={6}/>
        </Container>
      </LoadingActionContainer>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 40,
  },
  dropdown: {
      backgroundColor: 'white',
      borderColor: '#505252',
      borderWidth: 0.8,
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      width: '50%',
      borderRadius: 5
  },
  icon: {
      marginRight: 5,
      width: 18,
      height: 18,
  },
  item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  textItem: {
      flex: 1,
      fontSize: 16,
  },
  shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      marginTop: -25
  },
  dateTouchable: {
    backgroundColor: 'white',
    borderColor: '#505252',
    borderWidth: 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 10,
    borderRadius: 5,
  },
  textfield: {
    backgroundColor: 'white',
    borderColor: '#505252',
    borderWidth: 0.8,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 10,
    borderRadius: 5,
    width: '50%'
  }

});

export default Settings;
