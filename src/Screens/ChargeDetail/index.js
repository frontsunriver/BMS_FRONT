import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import LoadingActionContainer from '../../Components/LoadingActionContainer';
import useAppTheme from '../../Themes/Context';
import { ScrollView } from 'react-native-gesture-handler';
import FooterScreen from '../../Components/FooterScreen';
import NumberFormat from 'react-number-format';
import {Container} from '../../Components';

const ChargeDetail = ({routes, navigation}) => {
  const {theme} = useAppTheme();
  return (
      <LoadingActionContainer fixed>
        <Container
          style={{
            backgroundColor: theme.colors.primary,
            flex: 1,
          }}>
          <ScrollView>
            <View style={{paddingBottom: 100}}>
              <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20}}>
                  <View>
                      <Text>01/01/2022</Text>
                  </View>
                  <View>
                    <Text>207 Crystal Redisinge</Text>
                  </View>
                  <View>
                      <NumberFormat value={200003.38} displayType={'text'} thousandSeparator={true} prefix={'$'} 
                      renderText={(value, props) => {
                          return(
                              <Text>{value}</Text>
                          )
                      }}/>
                  </View>
              </View>
            </View>
          </ScrollView>
          <FooterScreen />
        </Container>
      </LoadingActionContainer>
  );
};

export default ChargeDetail;
