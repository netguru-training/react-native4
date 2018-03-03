import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getTodos } from "../reducers/todo";
import { connect } from "react-redux";

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text>{JSON.stringify(this.props.todos)} </Text>
        <Button
          title="task"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = (state, props) => ({
  todos: getTodos(state)
});

const TodoComponentContainer = connect(mapStateToProps, null)(App);
export { TodoComponentContainer as TodoComponent };
