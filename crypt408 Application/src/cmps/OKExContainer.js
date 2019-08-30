import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import BookBlock from './BookBlock';
import Header from './Header';

class OKExContainer extends Component {
  _isMounted = true;
  state = { BTCUSD: [], ETHUSD: [], ETHBTC: [], ETCUSD: [], LTCUSD: [], BTCUSDB: [], ETHUSDB: [], ETHBTCB: [], ETCUSDB: [], LTCUSDB: [] };
  componentDidMount() {
    if (this._isMounted){
      fetch('https://www.okex.com/api/spot/v3/instruments/BTC-USDT/book?size=10&depth=0.2').then((response) => response.json()).then((responseData) => {
        this.setState({
            BTCUSD: responseData.asks,
            BTCUSDB: responseData.bids
        });
        console.log(this.state.CBene);
    }).then(() => {
      fetch('https://www.okex.com/api/spot/v3/instruments/ETH-USDT/book?size=10&depth=0.2').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETHUSD: responseData.asks,
              ETHUSDB: responseData.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('https://www.okex.com/api/spot/v3/instruments/ETH-BTC/book?size=10&depth=0.2').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETHBTC: responseData.asks,
              ETHBTCB: responseData.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('https://www.okex.com/api/spot/v3/instruments/ETC-USDT/book?size=10&depth=0.2').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETCUSD: responseData.asks,
              ETCUSDB: responseData.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('https://www.okex.com/api/spot/v3/instruments/LTC-USDT/book?size=10&depth=0.2').then((response) => response.json()).then((responseData) => {
          this.setState({
              LTCUSD: responseData.asks,
              LTCUSDB: responseData.bids
          });
          console.log(this.state.CBene);
    }).done();
    }).done();
    }).done();
    }).done();
  }).done();
  }
}
  componentWillUnmount() {
    this._isMounted = false;
  }
  renderBTCUSD() {
      return this.state.BTCUSD && this.state.BTCUSD.map(bu =>
        <BookBlock
          type = "Ask"
          pair = "BTCUSD"
          price = {bu[0]}
          quantity = {bu[1]}
        />
      );
  }
  renderBTCUSDB() {
      return this.state.BTCUSDB && this.state.BTCUSDB.map(bub =>
        <BookBlock
          type = "Bid"
          pair = "BTCUSD"
          price = {bub[0]}
          quantity = {bub[1]}
        />
      );
  }
  renderETHUSD() {
      return this.state.ETHUSD && this.state.ETHUSD.map(eu =>
        <BookBlock
          type = "Ask"
          pair = "ETHUSD"
          price = {eu[0]}
          quantity = {eu[1]}
        />
      );
  }
  renderETHUSDB() {
      return this.state.ETHUSDB && this.state.ETHUSDB.map(eub =>
        <BookBlock
          type = "Bid"
          pair = "ETHUSD"
          price = {eub[0]}
          quantity = {eub[1]}
        />
      );
  }
  renderETHBTC() {
      return this.state.ETHBTC && this.state.ETHBTC.map(eb =>
        <BookBlock
          type = "Ask"
          pair = "ETHBTC"
          price = {eb[0]}
          quantity = {eb[1]}
        />
      );
  }
  renderETHBTCB() {
      return this.state.ETHBTCB && this.state.ETHBTCB.map(ebb =>
        <BookBlock
          type = "Bid"
          pair = "ETHBTC"
          price = {ebb[0]}
          quantity = {ebb[1]}
        />
      );
  }
  renderETCUSD() {
      return this.state.ETCUSD && this.state.ETCUSD.map(ecu =>
        <BookBlock
          type = "Ask"
          pair = "ETCUSD"
          price = {ecu[0]}
          quantity = {ecu[1]}
        />
      );
  }
  renderETCUSDB() {
      return this.state.ETCUSDB && this.state.ETCUSDB.map(ecub =>
        <BookBlock
          type = "Bid"
          pair = "ETCUSD"
          price = {ecub[0]}
          quantity = {ecub[1]}
        />
      );
  }
  renderLTCUSD() {
      return this.state.LTCUSD && this.state.LTCUSD.map(lu =>
        <BookBlock
          type = "Ask"
          pair = "LTCUSD"
          price = {lu[0]}
          quantity = {lu[1]}
        />
      );
  }
  renderLTCUSDB() {
      return this.state.LTCUSDB && this.state.LTCUSDB.map(lub =>
        <BookBlock
          type = "Bid"
          pair = "LTCUSD"
          price = {lub[0]}
          quantity = {lub[1]}
        />
      );
  }


  render() {
    return (
      <View style={{ flex:1 }}>
      <View style={{ marginBottom: 8 }}>
      <Text style={{ alignSelf: 'center'}}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Fees:</Text> <Text style={{ fontSize: 15 }}>Maker Fee: 0.1%, </Text>
        <Text style={{ fontSize: 15 }}>Taker Fee: 0.15%</Text>
      </Text>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {this.renderBTCUSD()}
        {this.renderETHUSD()}
        {this.renderETHBTC()}
        {this.renderETCUSD()}
        {this.renderLTCUSD()}
        {this.renderBTCUSDB()}
        {this.renderETHUSDB()}
        {this.renderETHBTCB()}
        {this.renderETCUSDB()}
        {this.renderLTCUSDB()}
      </ScrollView>
      </View>
    );
  }
}

export default OKExContainer
