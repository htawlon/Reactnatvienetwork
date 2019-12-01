import React, {Component} from 'react'
import {StyleSheet, View, Text, FlatList, ActivityIndicator, Alert} from 'react-native'
import { ThemeProvider, ListItem}  from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'


import MyHeader from './Myheader'
import Firebase from '../Firebase/Firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

class Students extends Component{
    render(){
        return(
            <View>
                <ListItem
                title={this.props.name}
                subtitle={this.props.email}
                rightSubtitle={this.props.address}
                rightIcon={
                    <TouchableOpacity onPress={()=>this.props.dData()}>
                        <Text>
                            <Icon name="trash" size={16} color="red"></Icon>
                        </Text>
                    </TouchableOpacity>
                }
                bottomDivider
                >

                </ListItem>
            </View>
        )
    }
}

export default class Showdata extends Component{
    constructor(props){
        super(props)
        this.state=({
            students:[],
            showLoading: false
        })
    }
    confirmDelete=(id)=>{
        Firebase.database().ref("students/"+id).remove()
        .then((res)=>{
            this.fetchStudents();
        })
        .catch((err)=>{

        })
    }
    deleteData=(id)=>{
      Alert.alert(
          "Confirm",
          "The seleccted students will deleted permanently.",
          [
              {text:"No", style: "cancel"},
              {text:"Yes", style:"destructive", onPress:()=>this.confirmDelete(id)}
          ]
      )
    }
    componentDidMount=()=>{
        this.fetchStudents();
    }
    fetchStudents=()=>{
         this.setState({showLoading: true})
        Firebase.database().ref("students").once("value")
        .then((res)=>{
            const d=res.val();
            const stus=[];
            
            for(s in d){
                 //console.log(res.val())
                 let stu={
                     id: s,
                     name: d[s].name,
                     email: d[s]. email,
                     address: d[s]. address
                 }
                 stus.unshift(stu)
            
            }
            this.setState({students: stus})
            this.setState({showLoading: false})
            //console.log(stus)
           
        })
        .catch((res)=>{
            console.log(err)
        })
    }
    render(){
        return(
            <ThemeProvider>
            <MyHeader my_center="Show Data"></MyHeader>
            {
                this.state.showLoading && (
                    <ActivityIndicator
                    color="royalblue"
                    size={70}
                    >

                    </ActivityIndicator>
                )
            }
            <View>
                <FlatList
                refreshing={this.state.showLoading}
                onRefresh={()=>this.fetchStudents()}
                keyExtractor={(s)=> s.id.toString()}
                data={this.state.students}
                renderItem={(s)=>{
                    return(
                        <Students
                        dData={()=>this.deleteData(s.item.id)}
                        id={s.item.id}
                        name={s.item.name}
                        email={s.item.email}
                        address={s.item.address}
                        >

                        </Students>
                    )
                   // console.log(s)
                }}
                >

                </FlatList>
            </View>
        </ThemeProvider>
        )
    }
}