import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, PermissionsAndroid} from 'react-native';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import AssociationFooterScreen from '../../Components/AssociationFooterScreen';
import useTranslation from '../../i18n';
import {Container} from '../../Components';
import { showErrorToast, showInfoToast, showSuccessToast } from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import { BASE_URL, DOWNLOAD_URL } from '../../Config';
import Routes from '../../Navigation/Routes';
import RNFetchBlob from 'rn-fetch-blob';
import * as Progress from 'react-native-progress';
import * as ReactNativeFS from 'react-native-fs';

const Settings = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progresStatus, setProgressStatus] = useState(0);
  const { config, fs } = RNFetchBlob;
  let DownloadDir = fs.dirs.DownloadDir;

  const importHandle = async () => {
    setLoading(true);
    await axios.get(`${BASE_URL}generate/excel`).then( async (res) => { 
      if(res.data.success) {
        var extension = res.data.data.split('.').pop();
        var fileName = new Date().getTime() + "." + extension;
        let options = {
            fileCache: true,
            addAndroidDownloads : {
              useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
              notification : false,
              path:  DownloadDir + "/" + fileName, // this is the path where your downloaded file will live in
              description : 'Downloading image.'
            }
          }
          config(options).fetch('GET', `${DOWNLOAD_URL}/uploads/` + res.data.data).then((res1) => {
            showSuccessToast("Download successfully. filename: " + fileName);
            setLoading(false);
          }).catch(err => {
            console.log(err);
            setLoading(false);
          }) 
      }else {
        setShowProgress(false);
        setLoading(false);
        showErrorToast(res.data.message);
      }
    }).catch(err => {
      console.log(err);
      setShowProgress(false);
      setLoading(false);
      showErrorToast('Something went wrong! Please try again.');
    });
  }

  downloadFile = async () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          importHandle();
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
    } catch (err) {
        console.log(err);
    } 
  }

  if(showProgress) {
    return (
      <View style={{backgroundColor: theme.colors.primary,flex:1, justifyContent: 'center', alignItems:'center'}}>
        <Progress.Bar progress={progresStatus} width={300} borderColor={theme.colors.background} color={theme.colors.background}/>
        <Text>Downloading...</Text>
      </View>
    )  
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
                      loading = {loading}
                      mode="contained"
                      style={{borderRadius: 30, marginLeft: 30, marginRight: 30, padding: 5}}
                      color={theme.colors.background}
                      onPress={downloadFile}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: 'center',
                          color: theme.colors.primary
                        }}>
                        Generate Report
                      </Text>
                    </Button>
                  </View>
                </View>
              </View>
            </View>
            <Toast />
          </ScrollView>
          <AssociationFooterScreen tabIndex={3}/>
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
