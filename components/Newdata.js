import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, Button, ActivityIndicator} from 'react-native'
import { ThemeProvider, Header}  from 'react-native-elements'

import MyHeader from './Myheader'
import Firebase from '../Firebase/Firebase'
export default class Newdata extends Component{
    constructor(props){
        super(props)
        this.state=({
            name: '',
            email:'',
            address:'',
        error: '',
        showError: false,
        massage: '',
        showMessage: false,
        showLoading: false
        
        })
        this.emailRef=React.createRef();
        this.addressRef=React.createRef();
        
    }
    clearError=()=>{
        setTimeout(()=>{
            this.setState({error:"", showError: false})
        },2000)
    }
    saveData=()=>{
       if(this.state.name.length <=0){
           this.setState({showError: true, error:"The name failed is required."})
           this.clearError();
           return;
       }
       if(this.state.email.length <=0){
        this.setState({showError: true, error:"The email failed is required."})
        this.clearError();
        return;
    } 
    if(this.state.address.length <=0){
        this.setState({showError: true, error:"The address failed is required."})
        this.clearError();
        return;
    } 
    const stu={
        name: this.state.name,
        email: this.state.email,
        address: this.state.address
    }
    this.setState({showLoading: true})
    Firebase.database().ref("students").push(stu)
    .then((res)=>{
        this.setState({showLoading: false})
        this.setState({showLoading: false})
        this.setState({
            name:"",
            email: "",
            address:"",
            showMessage: true,
            message: "The user have been created."
        })
        //console.log(res)
    })
    .catch((res)=>{
        console.log(err)
    })
    }

    render(){
        return(
            <ThemeProvider>
                <MyHeader my_center="Add New Heaer"></MyHeader>
                {
                    this.state.showError && (
                        <View style={styles.errorBody}> 
                            <Text style={styles.errorText}>{this.state.error}</Text>
                        </View>
                    )
                }
                {
                    this.state.showLoading && (
                        <ActivityIndicator
                        color="royalblue"
                        size={50}
                        >

                        </ActivityIndicator>
                    )
                }
                <View style={styles.formContainer}>
                    <View style={styles.formGroup}>
                        <Text>Name</Text>
                        <TextInput
                         style={styles.formControl}
                        onChangeText={(t)=>this.setState({name : t})}
                        value={this.state.name}
                        onSubmitEditing={()=>this.emailRef.current.focus()}
                        >

                        </TextInput>
                    </View>
                    <View style={styles.formGroup}>
                        <Text>Email</Text>
                        <TextInput
                       
                        ref={this.emailRef}
                        style={styles.formControl}
                        keyboardType="email-address"
                        onChangeText={(t)=>this.setState({email : t})}
                        value={this.state.email}
                        returnKeyType="next"
                        onSubmitEditing={()=>this.addressRef.current.focus()}

                        >

                        </TextInput>
                    </View>
                    <View
                    style={styles.formGroup}>
                        <Text>Address</Text>
                        <TextInput
                    
                        ref={this.addressRef}
                         style={styles.formControl}
                        onChangeText={(t)=>this.setState({address : t})}
                        value={this.state.address}
                        returnKeyType="done"
                        onSubmitEditing={()=>this.saveData()}

                        >
                        </TextInput>
                    </View>
                    
                    <View style={styles.formGroup}> 
                        <Button
                        title="Save" onPress={()=>this.saveData()}
                        ></Button>
                    </View>
                </View>
            </ThemeProvider>
        )
    }
}
const styles=StyleSheet.create({
    formContainer:{
        padding: 40
    },
    formGroup:{
        marginBottom: 20
    },
    formControl:{
        borderBottomColor: "#000",
        borderBottomWidth: 1
    },
    errorBody:{
        borderColor: "red",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#fff",
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20
    },
    errorText:{
        color: "green"
    }
})