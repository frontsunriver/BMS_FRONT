import React from 'react';
import {Text, View} from 'react-native';
const LongText = (props) => {
    const {maxLength, text} = props;
    return(
        <Text>{ ((text).length > maxLength) ? 
            (((text).substring(0,maxLength-3)) + '...') : 
            text }
        </Text>
    )
}

export default LongText;