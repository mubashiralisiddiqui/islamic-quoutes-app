import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,ActivityIndicator ,Button} from 'react-native';
import axios from 'axios';
import { api } from '../../config/index';
import { showMessage, hideMessage ,FlashMessage} from "react-native-flash-message";
class MenuCategory extends Component {
    state = {
        categoriesList: []
    }

    componentDidMount() {
        axios.get(api.category_list)
            .then((res => {
                res.data.data.map(q => {
                    this.setState({ categoriesList: res.data.data })
                    // {
                    //     this.state.categoriesList.map((item, i) => {
                    //         return (
                    //             <TouchableOpacity key={item.id} value={item}
                    //                 onPress={() => navigation('LandingPage', { cat_id: item.id })} style={styles.section}>
                    //                 <Text style={styles.drawerItem} >
                    //                     {item.category_name}
                    //                 </Text>
                    //             </TouchableOpacity>
                    //         )
                    //     })
                    // }
    
                    // console.log(this.state.categoriesList)
                })
            }))
    }

    render() {
        const { navigation } = this.props;
        const {categoriesList} = this.state
        console.log(categoriesList)
        return (
            <View style={styles.container}>
                {
                    categoriesList&&categoriesList.length < 1 ?
                    <ActivityIndicator style={{textAlign:'center'}} size="large" color="#040404" />
                    :
                    <ScrollView>
                    <TouchableOpacity
                    onPress={() => navigation('LandingPage', { cat_id: "all" })} style={styles.section}>
                    <Text style={styles.drawerItem} >
                        All
                    </Text>
                    </TouchableOpacity>
                        {
                            this.state.categoriesList.map((item, i) => {
                                return (
                                    <TouchableOpacity key={item.id} value={item}
                                        onPress={() => navigation('LandingPage', { cat_id: item.id })} style={styles.section}>
                                        <Text style={styles.drawerItem} >
                                            {item.category_name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flex:1,
        width: '100%',
        // paddingTop: '10%'
justifyContent:'center',
// alignItems:'center'
        // backgroundColor: 'blue'
    },
    drawerItem: {
        fontSize: 20,
        color: '#153c0b',
        padding: 1,
        alignItems: 'center',
        paddingLeft: 20
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 15,
        borderBottomColor: '#a9b1bc',
        borderBottomWidth: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})

export default MenuCategory