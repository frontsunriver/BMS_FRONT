import React from 'react';
import { View, Text, style } from 'react-native';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';

const DropDown = (props) => {
    const { data, label, placeholder, searchPlaceholder } = props;
    const data = [
        {label: 'Item 1', value: '1'},
        {label: 'Item 2', value: '2'},
        {label: 'Item 3', value: '3'},
        {label: 'Item 4', value: '4'},
        {label: 'Item 5', value: '5'},
        {label: 'Item 6', value: '6'},
        {label: 'Item 7', value: '7'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
        {label: 'Item 8', value: '8'},
    ];
    const _renderItem = item => {
        return (
        <View>
            <Text>{item.label}</Text>
        </View>
        );
    };
    return (
        <Dropdown
            data={data}
            style={styles.dropdown}
            containerStyle={styles.shadow}
            search
            searchPlaceholder={searchPlaceholder}
            labelField="label"
            valueField="value"
            label="Building"
            placeholder={placeholder}
            value={dropdown}
            onChange={item => {
            setDropdown(item.value);
                console.log('selected', item);
            }}
            // renderLeftIcon={() => (
            //     <Image style={styles.icon} source={require('./assets/account.png')} />
            // )}
            renderItem={item => _renderItem(item)}
            textError="Error"
        />
    )
}