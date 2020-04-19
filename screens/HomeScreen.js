import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Starting...",
      Type :'',
      definition : ''
    };
  }
  getWord=(text)=>{
    var text = text.toLowerCase()
    try{
      var word = dictionary[text]["word"]
      var type = dictionary[text]["type"]
      var meaning = dictionary[text]["meaning"]
      this.setState({
        "word" : word,
        "type" : type,
        "meaning" : meaning
      })
    }
    catch(err){
      alert("Sorry This Word Doesn't Exist In The Dictionary")
      this.setState({
        'text':'',
        'isSearchPressed':false
      })
    }
  }


  render(){
    return(
      <View style={{flex:1, borderWidth:2}}>
        <Header
          backgroundColor={'purple'}
          centerComponent={{
            text: 'ONLINE DICTIONARY',
            style: { color: 'blue', fontSize: 30 },
          }}
        />
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word  : "Starting...",
                type :'',
                examples : [],
                meaning : ""
              });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.findButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text)
            }}>
            <Text style={styles.searchText}>FIND</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={{fontSize:1}}>
            {
              this.state.isSearchPressed && this.state.word === "Starting..."
              ? this.state.word
              : ""
            }
          </Text>
            {
              this.state.word !== "Starting..." ?
              (
                <View style={{justifyContent:'center', marginLeft:15 }}>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                      Word :{" "}
                    </Text>
                    <Text style={{fontSize:18 }}>
                      {this.state.word}
                    </Text>
                  </View>

                  <View style={styles.detailsBox}>
                    <Text style={styles.detailsTitle}>
                      Type :{" "}
                    </Text>

                    <Text style={{fontSize:22}}>
                      {this.state.type}
                    </Text>
                  </View>

                  <View style={{flexDirection:'row'}}>

                    <Text style={styles.detailsTitle}>
                      Definition :{" "}
                    </Text>

                    <Text style={{ fontSize:18}}>
                      {this.state.meaning}
                    </Text>
                  </View>
                </View>
              )
              :null
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
  },
  findButton: {
    width: '20%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderWidth: 5,
    borderRadius: 15,
  },
  searchText:{
    fontSize: 12,
    fontWeight: 'italic'
  },
  outputContainer:{
    flex:5,
    alignItems:'center'
  },
  detailsBox:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'purple',
    fontSize:30,
    fontWeight:'bold'
  }
});
