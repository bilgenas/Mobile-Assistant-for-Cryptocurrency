import React, { Component } from 'react';
import { View, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, withNavigation, TabBarBottom } from 'react-navigation';
import { Ionicons } from 'react-native-vector-icons';
import Store from './src/Store';
import MainContainer from './src/cmps/MainContainer';
import MarketContainer from './src/cmps/MarketContainer';
import AssistantContainer from './src/cmps/AssistantContainer'
import OKExContainer from './src/cmps/OKExContainer';
import HitBTCContainer from './src/cmps/HitBTCContainer';
import CoinbeneContainer from './src/cmps/CoinbeneContainer';
import BitMaxContainer from './src/cmps/BitMaxContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <View style={{ flex: 1 }}>
          <NavItem />
        </View>
      </Provider>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MainContainer />
      </View>
    );
  }
}

class MarketScreen extends React.Component {
  static navigationOptions = {
    title: 'Markets',
    headerTitleStyle: {
      textAlign: 'center'
    }
  };
  render() {
    const { navigation } = this.props
    return (
      <View style={{ flex: 1, backgroundColor: '#424242' }}>
        <MarketContainer navigation={navigation} />
      </View>
    );
  }
}

class AssistantScreen extends React.Component{
  render(){
    return(
      <View>
        <AssistantContainer />
      </View>
    )
  }
}

class BitMaxScreen extends React.Component {
  static navigationOptions = {
    title: 'BitMax',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BitMaxContainer />
      </View>
    );
  }
}

class CoinbeneScreen extends React.Component {
  static navigationOptions = {
    title: 'Coinbene',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <CoinbeneContainer />
      </View>
    );
  }
}

class HitBTCScreen extends React.Component {
  static navigationOptions = {
    title: 'HitBTC',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <HitBTCContainer />
      </View>
    );
  }
}

class OKExScreen extends React.Component {
  static navigationOptions = {
    title: 'OKEx',
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <OKExContainer />
      </View>
    );
  }
}


const MarketStack = createStackNavigator(
  {
    Markets: MarketScreen,
    BitMax: BitMaxScreen,
    Coinbene: CoinbeneScreen,
    HitBTC: HitBTCScreen,
    OKEx: OKExScreen
  },
  {
    initialRouteName: 'Markets',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#424242',
        marginBottom: 10
      },
      headerTintColor: "white"
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Markets: MarketStack,
    Assistant: AssistantScreen
  },
  {
    initialRouteName: "Home"
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `desktop`;
        } else if (routeName === 'Markets') {
          iconName = `wallet`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    animationEnabled: true,
    swipeEnabled: true,
  }
);

const NavItem = createAppContainer(TabNavigator);
