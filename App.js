import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  BackHandler,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.WEBVIEW_REF.current.goBack();
    return true;
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: "https://mbfx.co" }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          style={{ marginTop: 40 }}
          setSupportMultipleWindows={false}
          ref={this.WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
