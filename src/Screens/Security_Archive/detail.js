import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Image, Keyboard, PermissionsAndroid } from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import axios from 'axios';
import { BASE_URL, DOWNLOAD_URL } from '../../Config';
import Toast from 'react-native-tiny-toast';
import { Button } from 'react-native-paper'
import { showErrorToast, showSuccessToast } from '../../Lib/Toast';
import RNFetchBlob from 'rn-fetch-blob'
import FontAwesome, { parseIconFromClassName, Icons } from 'react-native-fontawesome'

const SecurityArchiveDetail = ({route, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const {data} = route.params;
  const [reply, setReply] = useState('');
  const [showIssues, setShowIssues] = useState(false);
  const [rejectButton, setRejectButton] = useState('reject');
  const { config, fs } = RNFetchBlob;
  const downloadIcon = parseIconFromClassName('fas fa-download')
  let DownloadDir = fs.dirs.DownloadDir;

  const approvedHandle = (e) => {
    axios.post(`${BASE_URL}move/update`, {id: data.id, status: 2}).then( res => {
        if(res.data.success) {
          showSuccessToast('This movement is approved');
          navigation.goBack();
        }else {
          showErrorToast(res.data.message);
        }
      }).catch( err => {
        showErrorToast('Server Error. Please try again.');
    });
  }

  const cancelHandle = (e) => {
    if(reply == '') {
        showErrorToast('Please insert the issues');
        return;
    }
    var formData = new FormData();
    formData.append('id', data.id);
    formData.append('status', 3);
    formData.append('reply', reply);
    axios.post(`${BASE_URL}move/reject`, formData, 
    { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then( res => {
        if(res.data.success) {
          showSuccessToast('This movement is rejected');
          navigation.goBack();
        }else {
          showErrorToast(res.data.message);
        }
      }).catch( err => {
          console.log(err);
        showErrorToast('Server Error. Please try again.');
    });
  }

  const fileDonwload = (url) => {
    var extension = url.split('.').pop();
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
      config(options).fetch('GET', `${DOWNLOAD_URL}` + url).then((res) => {
        showSuccessToast("Download successfully. filename: " + fileName);
      })
  }

  downloadFile = async (url) => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            fileDonwload(url);
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
    } catch (err) {
        console.log(err);
    } 
  }



  const renderData = () => {
    if(data.move_type == 1) {
        return (
            <View style={{flexDirection: 'column', marginTop: 5}}>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Request User: </Text>
                    <View style={{flexDirection: 'row', flex: 3}}>
                        <Text>{data.first_name} </Text>
                        <Text>{data.last_name}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Building Name :</Text>
                    <Text style={{flex: 3}}>{data.building_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Unit :</Text>
                    <Text style={{flex: 3}}>{data.unit_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenant Name :</Text>
                    <Text style={{flex: 3}}>{data.tenants_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenant Email :</Text>
                    <Text style={{flex: 3}}>{data.tenants_email}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenant mobile :</Text>
                    <Text style={{flex: 3}}>{data.tenants_mobile}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Onwer Passport :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.owner_passport)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Title Deed :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.title_deed)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenancy Contract :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.contract)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenants Passport :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.tenants_passport)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenants Visa :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.tenants_visa)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Tenants Emirates ID :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.tenants_emirates_id)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                {showRnderIssuesPanel()}
            </View>
        )
    }else if (data.move_type == 2){
        return (
            <View style={{flexDirection: 'column', marginTop: 5}}>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Request User: </Text>
                    <View style={{flexDirection: 'row', flex: 3}}>
                        <Text>{data.first_name} </Text>
                        <Text>{data.last_name}</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Building Name :</Text>
                    <Text style={{flex: 3}}>{data.building_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Unit :</Text>
                    <Text style={{flex: 3}}>{data.unit_name}</Text>
                </View>
                {showRnderIssuesPanel()}
            </View>
        )
    } else {
        return (
            <View style={{flexDirection: 'column', marginTop: 5}}>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Request User: </Text>
                    <View style={{flexDirection: 'row', flex: 3}}>
                        <Text>{data.first_name} </Text>
                        <Text>{data.last_name}</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Building Name :</Text>
                    <Text style={{flex: 3}}>{data.building_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Unit :</Text>
                    <Text style={{flex: 3}}>{data.unit_name}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Content :</Text>
                    <Text style={{flex: 3}}>{data.carried_content}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingTop: 5}}>
                    <Text style={{flex: 2}}>Trade Licence :</Text>
                    <View style={{flex: 3}}>
                        <TouchableOpacity style={{flex: 3, justifyContent: 'flex-start'}} onPress={() => {
                        downloadFile(data.trade_licence)}}><FontAwesome icon={downloadIcon} style={{color: theme.colors.background, fontSize: 20}} /></TouchableOpacity>
                    </View>
                </View>
                {showRnderIssuesPanel()}
            </View>
        )
    }
  }

  const issuesPanelIssues = () => {
      setShowIssues(!showIssues);
  }

  useEffect(() => {
      if(showIssues) {
          setRejectButton('HIDE');
      }else {
          setRejectButton('REJECT');
      }
      showRnderIssuesPanel();
  }, [showIssues])

  const showRnderIssuesPanel = () => {
      if(showIssues) {
          return (
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <View style={{flexDirection: 'row', borderTopColor: theme.colors.backgroundColor, borderTopWidth: 0.8, paddingBottom: 5, justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10}}>
                    <TextInput
                        style={styles.textfield}
                        placeholder="Please write issues"
                        numberOfLines={5}
                        value={reply}
                        multiline={true}
                        onChangeText={text => setReply(text)}
                    />
                </View>
                <Button
                    onPress={cancelHandle}
                    mode="contained"
                    style={{borderRadius: 5, backgroundColor: '#39b148'}}
                >
                    <Text
                    style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: theme.colors.primary
                    }}>
                    submit
                    </Text>
                </Button>
            </View>
          )
      }else {
          return(
            <></>
          )
      }
  }

  const renderTitle = () => {
    if (data.move_type == 1) { 
        return 'Move In' 
    } else if(data.move_type == 2) {
        return 'Move out'
    } else {
        return 'Maintenance Carried out'
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
            <View style={{paddingBottom: 100}}>
                <View style={{flexDirection: 'column', justifyContent: 'center', padding: 20}}>
                    <View style={{flexDirection: 'row', borderBottomColor: theme.colors.backgroundColor, borderBottomWidth: 0.8, paddingBottom: 5, justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text>{ renderTitle() }</Text>
                        </View>
                        <View>
                            <Text>{data.move_date}</Text>
                        </View>
                    </View>
                    {renderData()}
                </View>
            </View>
            <Toast />
          </ScrollView>
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
    width: '100%'
  }

});

export default SecurityArchiveDetail;
