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
        await axios.post(`${BASE_URL}/notify/getDetailList`, {notify_id: data.id}).then( res => {
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
                    return <NotifyDetailListItem key={item.id} data={item} userInfo={user}/>
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

    const openGallery = () => {
        setShowGallery(true);
    }

    const closeGallery = () => {
        setShowGallery(false);
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
        formData.append('notify_id', data.id);

        await axios.post(`${BASE_URL}notify/addDetail`, formData,
        { headers: { 'Content-Type': 'multipart/form-data', 'X-Requested-With': 'XMLHttpRequest', }}).then(res => { 
            if(res.data.success) {
                setComment('');
                showSuccessToast('Your request is sent successfully. Please wait for the reply.');
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
        axios.post(`${BASE_URL}/notify/getDetailList`, {notify_id: data.id}).then( res => {
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

    const images = [
        {
            source: {
                uri: DOWNLOAD_URL + data.photofile,
            },
            width: width - 50,
            height: height - 100,
        },
    ];

    // if(showGallery) {
    //     return(
            
    //     )
    // }
    
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
                                <Text style={{fontSize: 20, }}>{data.content}</Text>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <TouchableOpacity onPress={openGallery} >
                                        <Text>View Image</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        {/* <Image source={{uri: DOWNLOAD_URL + data.photofile}} style={{width: (width / 3), height: (height / 3)}}></Image> */}
                            {renderView()}
                            <View>
                                <TextInput
                                    style={styles.textfield}
                                    placeholder="Please write the comment"
                                    numberOfLines={5}
                                    value={comment}
                                    multiline={true}
                                    onChangeText={text => setComment(text)}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
                                <Button
                                    mode="contained"
                                    style={{borderRadius: 5}}
                                    color={theme.colors.background}
                                    onPress={submitHandle}
                                >
                                    <Text
                                    style={{
                                        fontSize: 15,
                                        textAlign: 'center',
                                        color: theme.colors.primary
                                    }}>
                                    REPLY
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ImageView
                    images={images}
                    imageIndex={0}
                    isVisible={showGallery}
                    onClose={closeGallery}
                />
            </Container>
        </LoadingActionContainer>
    );
};

const NotifyDetailListItem = (props) => {
    const {data, userInfo} = props;
    if(data.user_id == userInfo.id) {
        return (
            <View style={{width:'80%', flex: 1}}>
                <View style={{flexDirection: 'row', padding: 10, marginTop: 5, backgroundColor: theme.colors.background, borderRadius: 5}}>
                    <View style={{flexDirection: 'column', flex: 1, marginLeft: 5}}>
                        <Text style={{color: '#c9c6c5'}}>ME</Text>
                        <Text style={{marginTop: 10, paddingBottom: 5, fontSize: 13, color: theme.colors.primary}}>{data.content}</Text>
                        <Text style={{color: '#c9c6c5', fontSize: 11, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>{data.submit_date}</Text>
                    </View>
                </View>
            </View> 
        )
    }else {
        return (
            <View style={{width:'80%', flex: 1, alignSelf: 'flex-end'}}>
                <View style={{flexDirection: 'row', padding: 10, marginTop: 5, backgroundColor: '#07a83f',borderRadius: 5}}>
                    <View style={{flexDirection: 'column', flex: 1, marginLeft: 5}}>
                    <Text style={{color: '#c9c6c5'}}>{data.first_name} {data.last_name}</Text>
                        <Text style={{marginTop: 10, paddingBottom: 5, fontSize: 13, color: theme.colors.primary}}>{data.content}</Text>
                        <Text style={{color: '#c9c6c5', fontSize: 11, justifyContent: 'flex-end', alignSelf: 'flex-end'}}>{data.submit_date}</Text>
                    </View>
                </View>
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
    }
})
export default Detail;
