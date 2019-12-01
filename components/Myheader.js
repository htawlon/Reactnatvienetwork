import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { ThemeProvider, Header}  from 'react-native-elements'


export default class Myheader extends Component{
    render(){
        return(
            <ThemeProvider>
                <Header
                 centerComponent={{text: this.props.my_center, style:{color: "#fff", fontSize: 20}}}
                >
                    
                </Header>
            </ThemeProvider>
        )
    }
}