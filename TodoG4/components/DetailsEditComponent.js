import React from 'react';
import { TextInput, View, Text, Button } from 'react-native';
import styles from './detailsStyleSheet';

export default class DetailsEdit extends React.Component {

    constructor(props){
        super(props);
        this.state =  this.props.element;
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.label}>Label</Text>
                <TextInput style={styles.input} 
                    value={this.state.label} 
                    onChangeText={(label) => this.setState({...this.state,label})}
                />
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} 
                    value={this.state.title} 
                    onChangeText={(title) => this.setState({...this.state,title})}
                />
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} 
                    value={this.state.description} 
                    onChangeText={(description) => this.setState({...this.state,description})}
                />
                <View>
                    <Button title="Save" onPress={this.props.edit}></Button>
                </View>
            </View>
        ) 
    }
}