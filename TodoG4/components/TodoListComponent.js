import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SectionList,
  Alert,
  Modal,
  TextInput
} from "react-native";
import { connect } from "react-redux";
import { getTodosByLabelName } from "../reducers/todo";
import { getLabelById, getLabels } from '../reducers/label';
import { ToDoListItem } from "./TodoListItemComponent";
import { AddLabelForm } from './AddLabelFormComponent';
import { DELETE_TODO, MARK_AS_DONE_TODO, CREATE_LABEL } from "../actions/types";
import ActionButton from 'react-native-action-button';
import DetailsEdit from './DetailsEditComponent';

const ToDoListSection = ({ section }) => (
  <View style={styles.listSection}>
    <Text style={styles.listSectionTitle}>{section.title}</Text>
  </View>
);

class TodoListComponent extends Component {
  _onItemClick = id => {
    this.props.navigation.navigate("Details", { id });
  };

  constructor() {
    super();
    this.state = {
      labelModalVisible: false,
      todoModalVisible: false,
      modalToggle: false
    }
  }

  _onItemClick = (id) => {
    this.props.navigation.navigate('Details', { id });
  }

  _onDeleteItem = (id) => {
    Alert.alert('Confirm deletion', '', [
      { text: 'cancel', onPress: () => {}, style: 'cancel' },
      { text: 'delete', onPress: () => this.props.onDeleteItem(id) }
    ]);
  };

  _onMarkDone = (id, done = true) => {
    this.props.markDone(id, done);
  };

  _toggleModal(modal, opened) {
    switch(modal){
      case 'label': 
        this.setState({ ...this.state, labelModalVisible: opened}); 
        break;
      case 'todo': 
        this.setState({ ...this.state, todoModalVisible: opened}); 
        break;
    }
    if(opened){
      this.setState({ modalToggle: true});
    }
    if(!opened){
      this.setState({ modalToggle: false});
    }
  }

  _onAddLabel(label) {
    this.props.onAddLabel(label);
    this._toggleModal('label', false);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Todo list"
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={this.props.data}
          renderItem={({ item }) => (
            <ToDoListItem
              todo={item}
              markDone={this._onMarkDone}
              itemClick={this._onItemClick}
              deleteItem={this._onDeleteItem}
            />
          )}
          renderSectionHeader={ToDoListSection}
          keyExtractor={(item, index) => item.id}
        />
        <ActionButton buttonColor="#16A085">
          <ActionButton.Item buttonColor='#26B095' title="New Label" onPress={() => this._toggleModal('label', true)}>
            <Text style={styles.actionButtonLabel}>label</Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#26B095' title="New to do" onPress={() => this._toggleModal('todo', true)}>
            <Text style={styles.actionButtonLabel}>to do</Text>
          </ActionButton.Item>
        </ActionButton>

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalToggle}>
        {this.state.labelModalVisible 
          ? <AddLabelForm addLabel={(label) => this._onAddLabel(label)} cancel={() => this._toggleModal('label', false)} />
          : <DetailsEdit element={({})} labels={this.props.labels} cancel={() => this._toggleModal('label', false)}/>
        }
      </Modal>

      {/* <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.todoModalVisible}>
        <AddLabelForm addLabel={() => this._onAddLabel()} cancel={() => this._toggleModal('todo', false)} />
        <DetailsEdit element={({})} 
        // edit={(todo) => {
        //   this.setState({ edit: false });
        //   this.props.update(todo);
        /> 
      </Modal> */}

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
    data,
    labels: getLabels(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteItem: id => {
      dispatch({
        type: DELETE_TODO,
        payload: id
      });
    },
    onAddLabel: (label) => {
      dispatch({
        type: CREATE_LABEL,
        payload: label
      });
    },
    markDone: (id, done) => {
      dispatch({
        type: MARK_AS_DONE_TODO,
        payload: { id, done }
      });
    }
  };
};

const TodoListComponentContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListComponent
);
export { TodoListComponentContainer as TodoListComponent };
