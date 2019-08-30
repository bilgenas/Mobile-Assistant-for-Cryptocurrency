import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import BookBlock from './BookBlock';
import Header from './Header';

class CoinbeneContainer extends Component {
  _isMounted = true;
  state = { BTCUSD: [], ETHUSD: [], ETHBTC: [], ETCUSD: [], LTCUSD: [], BTCUSDB: [], ETHUSDB: [], ETHBTCB: [], ETCUSDB: [], LTCUSDB: [] };
  componentDidMount() {
    if(this._isMounted){
      fetch('http://api.coinbene.com/v1/market/orderbook?symbol=btcusdt&depth=10').then((response) => response.json()).then((responseData) => {
        this.setState({
            BTCUSD: responseData.orderbook.asks,
            BTCUSDB: responseData.orderbook.bids
        });
        console.log(this.state.CBene);
    }).then(() => {
      fetch('http://api.coinbene.com/v1/market/orderbook?symbol=ethusdt&depth=10').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETHUSD: responseData.orderbook.asks,
              ETHUSDB: responseData.orderbook.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('http://api.coinbene.com/v1/market/orderbook?symbol=ethbtc&depth=10').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETHBTC: responseData.orderbook.asks,
              ETHBTCB: responseData.orderbook.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('http://api.coinbene.com/v1/market/orderbook?symbol=etcusdt&depth=10').then((response) => response.json()).then((responseData) => {
          this.setState({
              ETCUSD: responseData.orderbook.asks,
              ETCUSDB: responseData.orderbook.bids
          });
          console.log(this.state.CBene);
    }).then(() => {
      fetch('http://api.coinbene.com/v1/market/orderbook?symbol=ltcusdt&depth=10').then((response) => response.json()).then((responseData) => {
          this.setState({
              LTCUSD: responseData.orderbook.asks,
              LTCUSDB: responseData.orderbook.bids
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
      return this.state.BTCUSD.map(bu =>
        <BookBlock
          type = "Ask"
          pair = "BTCUSD"
          price = {bu.price}
          quantity = {bu.quantity}
        />
      );
  }
  renderBTCUSDB() {
      return this.state.BTCUSDB.map(bub =>
        <BookBlock
          type = "Bid"
          pair = "BTCUSD"
          price = {bub.price}
          quantity = {bub.quantity}
        />
      );
  }
  renderETHUSD() {
      return this.state.ETHUSD.map(eu =>
        <BookBlock
          type = "Ask"
          pair = "ETHUSD"
          price = {eu.price}
          quantity = {eu.quantity}
        />
      );
  }
  renderETHUSDB() {
      return this.state.ETHUSDB.map(eub =>
        <BookBlock
          type = "Bid"
          pair = "ETHUSD"
          price = {eub.price}
          quantity = {eub.quantity}
        />
      );
  }
  renderETHBTC() {
      return this.state.ETHBTC.map(eb =>
        <BookBlock
          type = "Ask"
          pair = "ETHBTC"
          price = {eb.price}
          quantity = {eb.quantity}
        />
      );
  }
  renderETHBTCB() {
      return this.state.ETHBTCB.map(ebb =>
        <BookBlock
          type = "Bid"
          pair = "ETHBTC"
          price = {ebb.price}
          quantity = {ebb.quantity}
        />
      );
  }
  renderETCUSD() {
      return this.state.ETCUSD.map(ecu =>
        <BookBlock
          type = "Ask"
          pair = "ETCUSD"
          price = {ecu.price}
          quantity = {ecu.quantity}
        />
      );
  }
  renderETCUSDB() {
      return this.state.ETCUSDB.map(ecub =>
        <BookBlock
          type = "Bid"
          pair = "ETCUSD"
          price = {ecub.price}
          quantity = {ecub.quantity}
        />
      );
  }
  renderLTCUSD() {
      return this.state.LTCUSD.map(lu =>
        <BookBlock
          type = "Ask"
          pair = "LTCUSD"
          price = {lu.price}
          quantity = {lu.quantity}
        />
      );
  }
  renderLTCUSDB() {
      return this.state.LTCUSDB.map(lub =>
        <BookBlock
          type = "Bid"
          pair = "LTCUSD"
          price = {lub.price}
          quantity = {lub.quantity}
        />
      );
  }


  render() {
    return (
      <View style={{ flex:1 }}>
      <View style={{ marginBottom: 8 }}>
      <Text style={{ alignSelf: 'center'}}>
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Fees:</Text> <Text style={{ fontSize: 15 }}>Maker Fee: 0.1%, </Text>
        <Text style={{ fontSize: 15 }}>Taker Fee: 0.1%</Text>
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

export default CoinbeneContainer
