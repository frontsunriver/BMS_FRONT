import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native'
import Pdf from 'react-native-pdf';

const ViewPdf = ({route, navigation}) => {
    const {data} = route.params;
    console.log(data);
    return (
        <View style={styles.container}>
            <Pdf
                source={{uri:data}}
                onLoadComplete={(numberOfPages,filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page,numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed:`);
                }}
                style={styles.pdf}/>
        </View>
    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});

export default ViewPdf;