import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Dimensions, TextInput, Keyboard} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { Button } from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Container} from '../../Components';
import useTranslation from '../../i18n';
import theme from '../../Themes/configs/default';
import ImageView from 'react-native-image-view';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { BASE_URL, DOWNLOAD_URL } from '../../Config';
import { useIsFocused } from '@react-navigation/native';
import LongText from '../../Utils/LongText';
import { useNavigation } from '@react-navigation/native';
import { showErrorToast, showSuccessToast } from '../../Lib/Toast';

const Detail = ({route, navigation}) => {
    const {t} = useTranslation();
    const {theme} = useAppTheme();
    const {data} = route.params;
    const [user, setUser] = useState({});
    const [serverData, setServerData] = useState([]);
    const isFocused = useIsFocused();
    const [comment, setComment] = useState('');
    const [viewMode, setViewMode] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    useEffect( async () => {
        let isMounted = true;     
        if(isMounted) {
        var userInfo = JSON.parse(await AsyncStorage.getItem('USER_INFO'));
        setUser(userInfo);
        }
        await axios.post(`${BASE_URL}/messages/getDetailList`, {message_id: data.id}).then( res => {
            if(isMounted) {
                if(res.data.success) {
                    if(res.data.data.length > 0) {
                        setServerData(res.data.data);
                        setViewMode(true);
                    }
                }
            }
        }).catch(err => {
        });
        return () => { isMounted = false };
    }, [isFocused]);
    
    const renderView = () => {
        if(viewMode) {
            return (
                serverData.map(item => {
                    return <MessageListDetailItem key={item.id} data={item} userInfo={user}/>
                })
            )
        } else {
            return (
                <View
                style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
                    <Text>There is no Response</Text>
                </View>
            )
        }
    }

    const submitHandle = async () => {
        Keyboard.dismiss();
        if(comment == '') {
            showErrorToast("Please write the Text")
            return;
        }

        var formData = new FormData();
        formData.append('content', comment);
        formData.append('user_id', user.id);
        formData.append('message_id', data.id);

        await axios.post(`${BASE_URL}messages/addDetail`, formData,
        { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
            if(res.data.success) {
                setComment('');
                fetchData();
            }else {
                showErrorToast(res.data.message);
            }
        }).catch(err => {
            console.log(err);
            showErrorToast('Something went wrong! Please try again.');
        });
    }

    const fetchData = () => {
        axios.post(`${BASE_URL}/messages/getDetailList`, {message_id: data.id}).then( res => {
            if(res.data.success) {
                if(res.data.data.length > 0) {
                    setServerData(res.data.data);
                    setViewMode(true);
                }else {
                    setViewMode(false);
                }
            }
        }).catch(err => {
        });
    }

    return (
        <LoadingActionContainer fixed>
            <Container
            style={{
                backgroundColor: theme.colors.primary,
                flex: 1,
            }}>
                <ScrollView>
                    <View style={{paddingBottom: 50}}>
                        <View style={{flexDirection: 'column', flex: 1, marginTop: 10, padding: 10}}>
                            <View style={{paddingBottom: 10, borderBottomColor: '#e2e2e2', borderBottomWidth: 1}}>
                                <Text style={{fontSize: 20, }}>{data.messages}</Text>
                            </View>
                            {renderView()}
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            value={comment}
                            placeholder="Write a message..."
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setComment(text)}/>
                    </View>

                    <TouchableOpacity style={styles.btnSend} onPress={submitHandle}>
                    <Image source={{uri:"https://img.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
                    </TouchableOpacity>
                </View>
            </Container>
        </LoadingActionContainer>
    );
};

const MessageListDetailItem = (props) => {
    const renderDate = (date, type) => {
        return(
            <Text style={type == 1 ? styles.timeOut : styles.timeIn}>
            {date}
            </Text>
        );
    }
    
    const {data, userInfo} = props;
    if(data.user_id == userInfo.id) {
        return (
            <View style={[styles.item, styles.itemOut]}>
            {renderDate(data.reg_date, 1)}
            <View style={[styles.balloon]}>
              <Text style={[styles.itemOutText]}>{data.content}</Text>
            </View>
        </View>
        )
    }else {
        return (
            <View style={[styles.item, styles.itemIn]}>
                <View style={[styles.balloon]}>
                  <Text>{data.content}</Text>
                </View>
                {renderDate(data.reg_date, 0)}
            </View>
        )
        
    }
}

const styles = StyleSheet.create({
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
    },
    container:{
        flex:1
      },
      list:{
        paddingHorizontal: 17,
      },
      footer:{
        flexDirection: 'row',
        height:60,
        backgroundColor: '#eeeeee',
        paddingHorizontal:10,
        padding:5,
      },
      btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
      },
      iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
      },
      inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
      },
      balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
      },
      itemIn: {
        alignSelf: 'flex-start'
      },
      itemOut: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.background,
        color: theme.colors.primary
      },
      itemOutText: {
        color: theme.colors.primary
      },
      timeOut: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color: '#ebeced'
      },
      timeIn: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color: '#808080'
      },
      item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#eeeeee",
        borderRadius:300,
        padding:3,
      },
})
export default Detail;
