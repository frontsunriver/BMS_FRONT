import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Keyboard } from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import { Button } from 'react-native-paper';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import useTranslation from '../../i18n';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import FooterScreen from '../../Components/FooterScreen';
import {Container} from '../../Components';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {convertDateFormat} from '../../Utils/DateHelper';
import axios from 'axios';
import { BASE_URL } from '../../Config';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {showInfoToast, showErrorToast, showSuccessToast} from '../../Lib/Toast';
import Toast from 'react-native-tiny-toast';
import NavigationService from '../../Navigation';
import Routes from '../../Navigation/Routes';

const NocMoveIn = ({routes, navigation}) => {
  const {t} = useTranslation();
  const {theme} = useAppTheme();
  const [user, setUser] = useState({});
  const [dropdown, setDropdown] = useState(null);
  const [unitDropDown, setUnitDropDown] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateString, setDateString] = useState(new Date())
  const [buildingData, setBuildingData] = useState([]);
  const [unitData, setUnitData] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [deedFile, setDeedFile] = useState(null);
  const [contract, setContract] = useState(null);
  const [passport, setPassport] = useState(null);
  const [visa, setVisa] = useState(null);
  const [emirate, setEmirate] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  useEffect( async () => {
    let isMounted = true;   
    // await axios.post(`${BASE_URL}/building/getList`).then( res => {
    //   if(isMounted) {
    //     if(res.data.success) {
    //       setBuildingData(res.data.data);
    //     }
    //   }
    // }).catch(err => {
    // });
    if(isMounted) {
      setUser(JSON.parse(await AsyncStorage.getItem('USER_INFO')));
    }
    return () => { isMounted = false };    
  }, []);

  useEffect(() => {
    return setBuildingData(user.building_list);
  }, [user])

  const _renderItem = item => {
    return (
    <View>
        <Text>{item.name}</Text>
    </View>
    );
  };

  const _renderItem1 = item => {
    return (
    <View>
        <Text>{item.unit_name}</Text>
    </View>
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateString(date);
    hideDatePicker();
  };

  useEffect( () => {
    axios.post(`${BASE_URL}/userowner/getList`, {building_id: dropdown, user_id: user.id}).then( res => {
      if(res.data.success) {
        setUnitData(res.data.data);
      }
    }).catch(err => {
    });
  }, [dropdown])

  const selectFile = async () => {
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
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectDeed = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setDeedFile(res[0]);
    } catch (err) {
      setDeedFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectContract = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setContract(res[0]);
    } catch (err) {
      setContract(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectPassport = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setPassport(res[0]);
    } catch (err) {
      setPassport(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectVisa = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setVisa(res[0]);
    } catch (err) {
      setVisa(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const selectEmirates = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setEmirate(res[0]);
    } catch (err) {
      setEmirate(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const objCast = (obj) => {
    return obj.name;
  }

  const submitHandle = async (e) => {
    Keyboard.dismiss();
    if(!formValidation().success){
      showErrorToast(formValidation().message);
      return;
    }
    
    var formData = new FormData();
    formData.append('tenants_name', name);
    formData.append('tenants_email', email);
    formData.append('tenants_mobile', mobile);
    const fileToUpload = singleFile;
    formData.append('owner_passport', fileToUpload);
    formData.append('title_deed', deedFile);
    formData.append('contract', contract);
    formData.append('tenants_passport', passport);
    formData.append('tenants_visa', visa);
    formData.append('tenants_emirates_id', emirate);
    formData.append('move_type', 1);
    formData.append('building_id', dropdown);
    formData.append('unit_id', unitDropDown);
    formData.append('move_date', convertDateFormat(dateString));
    formData.append('user_id', user.id);

    await axios.post(`${BASE_URL}move/add`, formData,
    { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
      showSuccessToast('Your request is sent successfully. Please wait for the reply.');
      NavigationService.navigate(Routes.NOC_MOVE_IN_DASHBOARD_SCREEN);
    }).catch(err => {
      console.log(err);
      showErrorToast('Something went wrong! Please try again.');
    });
  }

  const formValidation = () => {
    var result = true;
    var message = "";
    var res = {};
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!name || name == ''){
      message = "Please insert the tenant Name";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }
    if(!mobile || mobile == ''){
      message = "Please insert the tenant mobile";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!email || email == ''){
      message = "Please insert the tenant email";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!reg.test(email)) {
      message = "Please insert correct email";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!dropdown) {
      message = "Please select the building";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!unitDropDown) {
      message = "Please select the unit";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!dateString) {
      message = "Please check the move date";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!singleFile) {
      message = "Please select the owner passport";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!deedFile) {
      message = "Please select the Deed";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!contract) {
      message = "Please select the contract";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!passport) {
      message = "Please select the Tenant passport";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!visa) {
      message = "Please select the tenant visa";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    if(!emirate) {
      message = "Please select the Tenant Emirates ID";
      result = false;
      res['success'] = result;
      res['message'] = message;
      return res;
    }

    res['success'] = result;
    res['message'] = message;
    return res;
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
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Select Building')}</Text>
                  <Dropdown
                    data={buildingData}
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    search
                    searchPlaceholder="Search Building"
                    labelField="name"
                    valueField="id"
                    label="Building"
                    placeholder="Select Building"
                    value={dropdown}
                    onChange={item => {
                      setDropdown(item.id);
                    }}
                    // renderLeftIcon={() => (
                    //     <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem(item)}
                    textError="Error"
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Select Unit')}</Text>
                  <Dropdown
                    data={unitData}
                    style={styles.dropdown}
                    containerStyle={styles.shadow}
                    search
                    searchPlaceholder="Search Unit"
                    labelField="unit_name"
                    valueField="unit_id"
                    label="Unit"
                    placeholder="Select Unit"
                    value={unitDropDown}
                    onChange={item => {
                      setUnitDropDown(item.unit_id);
                    }}
                    // renderLeftIcon={() => (
                    //     <Image style={styles.icon} source={require('./assets/account.png')} />
                    // )}
                    renderItem={item => _renderItem1(item)}
                    textError="Error"
                  />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Move in Date')}</Text>
                  <TouchableOpacity onPress={showDatePicker}>
                    <View style={styles.dateTouchable}>
                      <Text>{convertDateFormat(dateString)}</Text>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Name')}</Text>
                  <TextInput value={name} style={styles.textfield} name="name" onChangeText={text => setName(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Email')}</Text>
                  <TextInput value={email} style={styles.textfield} name="email" onChangeText={text => setEmail(text)}/>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Mobile')}</Text>
                  <TextInput value={mobile} style={styles.textfield} name="mobile" onChangeText={text => setMobile(text)}/>
                </View>
                <View style={{borderBottomWidth: 1, borderBottomColor: '#e2e2e2', marginTop: 15}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={{color: theme.colors.background, fontSize: 20, marginTop: 15}}>Attach bellow Documents to proceed</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Ownner passport')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectFile}>
                    <View style={styles.dateTouchable}>
                      <Text>{singleFile != null ? ( singleFile.type ? objCast(singleFile) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Title Deed/Oquood')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectDeed}>
                    <View style={styles.dateTouchable}>
                      <Text>{deedFile != null ? ( deedFile.name ? objCast(deedFile) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenancy Contract')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectContract}>
                    <View style={styles.dateTouchable}>
                      <Text>{contract != null ? ( contract.name ? objCast(contract) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Passport')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectPassport}>
                    <View style={styles.dateTouchable}>
                      <Text>{passport != null ? ( passport.name ? objCast(passport) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Visa')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectVisa}>
                    <View style={styles.dateTouchable}>
                      <Text>{visa != null ? ( visa.name ? objCast(visa) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                  <Text style={{width: '50%', marginTop: 15}}>{t('Tenant Emirates ID')}</Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={selectEmirates}>
                    <View style={styles.dateTouchable}>
                      <Text>{emirate != null ? ( emirate.name ? objCast(emirate) : '' ) : 'Select File'}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                  <Button
                    mode="contained"
                    style={{borderRadius: 30, marginLeft: 30, marginRight: 30, padding: 5}}
                    color={theme.colors.background}
                    onPress={submitHandle}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        textAlign: 'center',
                        color: theme.colors.primary
                      }}>
                      {t('submit')}
                    </Text>
                  </Button>
                </View>
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
    width: '50%'
  }

});

export default NocMoveIn;
