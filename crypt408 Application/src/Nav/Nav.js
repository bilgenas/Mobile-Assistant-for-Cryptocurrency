import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MainContainer from '../cmps/MainContainer';
import MarketContainer from '../cmps/MarketContainer';
import OKExContainer from '../cmps/OKExContainer';
import HitBTCContainer from '../cmps/HitBTCContainer';
import CoinbeneContainer from '../cmps/CoinbeneContainer';
import BitMaxContainer from '../cmps/BitMaxContainer';

const AppNavigator = createStackNavigator(
  {
    Main: MainContainer,
    Markets: MarketContainer,
    OKEx: OKExContainer,
    HitBTC: HitBTCContainer,
    Coinbene: CoinbeneContainer,
    BitMax: BitMaxContainer,
  },
);

const Nav = createAppContainer(AppNavigator);
export default Nav
