import React, { Component } from "react";
import { StyleSheet, Text, View, Button, SectionList, Alert } from "react-native";
import { connect } from "react-redux";
import { getTodosByLabelName } from "../reducers/todo";
import { ToDoListItem } from './TodoListItemComponent';
import { DELETE_TODO } from '../actions/types';
import ActionButton from 'react-native-action-button';


const ToDoListSection = ({ section }) => (
  <View style={styles.listSection}>
    <Text style={styles.listSectionTitle}>{section.title}</Text>
  </View>
);

class TodoListComponent extends Component {

  constructor() {
    super();
  }

  _onItemClick = (id) => {
    this.props.navigation.navigate('Details', { id });
  }

  _onDeleteItem = (id) => {
    Alert.alert('Confirm deletion', '', [
      { text: 'cancel', onPress: () => {}, style: 'cancel' },
      { text: 'delete', onPress: () => this.props.onDeleteItem(id) }
    ]);
  }

  _navigateToLabelsScreen() {
    this.props.navigation.navigate('Labels');
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Todo list'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.props.data}
          renderItem={({item}) => <ToDoListItem todo={item} markDone={this._onMarkDone} itemClick={this._onItemClick} deleteItem={this._onDeleteItem} />}
          renderSectionHeader={ToDoListSection}
          keyExtractor={(item, index) => item.id}
        />
        <ActionButton buttonColor="#16A085">
          <ActionButton.Item buttonColor='#26B095' title="New Label" onPress={() => this._navigateToLabelsScreen()}>
            <Text style={styles.actionButtonLabel}>label</Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#26B095' title="New to do" onPress={() => alert('PREMIUM CONTENT! unlock for $4.99')}>
            <Text style={styles.actionButtonLabel}>to do</Text>
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  sectionList: {
    backgroundColor: "red"
  },
  listSection: {
    padding: 15,
    backgroundColor: "#16A085"
  },
  listSectionTitle: {
    color: "#FFFFFF"
  },
  actionButtonLabel: {
    color: '#FFF'
  }
});

const mapStateToProps = (state, props) => {
  const todos = getTodosByLabelName(state);
  const data = Object.keys(todos).map(key => ({
    data: todos[key],
    title: key
  }));
  return {
    data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItem: (id) => {
      dispatch({
        type: DELETE_TODO,
        payload: id
      });
    }
  }
}

const TodoListComponentContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListComponent
);
export { TodoListComponentContainer as TodoListComponent };
