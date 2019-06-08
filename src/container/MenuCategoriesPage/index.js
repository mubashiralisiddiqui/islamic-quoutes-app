import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,ImageBackground,ActivityIndicator} from 'react-native';
import MenuCategory from '../../components/MenuCategory'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';


class MenuCategoriesPage extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'INSPIRED BY QURAN ',
        headerStyle: {
            backgroundColor: '#153c0b',
            textAlign: 'center',
            display: 'flex',
            flex: 1,
            alignItems: 'center'
        },
        titleStyle: {
            textAlign: 'center',
            alignSelf: 'center',
            fontSize: 30
        },
        headerTintColor: '#e37d0f',
        headerTitleStyle: {
            fontWeight: '700',
            fontSize: 16,
            textAlign: 'center',
            flex: 1,
        },
        headerLeft:<TouchableOpacity>
         <Icon
            style={{ paddingLeft: 20 }}
            raised
            name='align-justify'
            type='font-awesome'
            size={25}
            color='white'

            onPress={() => navigation.openDrawer()}
        /></TouchableOpacity>,
        headerRight: <View />


    });
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
                 <ImageBackground source={require('../../assets/INSQ/background_2.png')} style={{  width: '100%', height: '100%' }}  > 
                    <MenuCategory navigation={navigate} />
                 </ImageBackground> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display:'flex',
alignItems:'center',
        justifyContent:'center',
        width: '100%',
        // marginTop: 20
        backgroundColor: 'black'
    }
})

export default MenuCategoriesPage