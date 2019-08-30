import React, { Component } from 'react';
import { View, Text, TouchableNativeFeedback, Alert, Picker, Button } from 'react-native';
// FEES, WHICH MARKET
class AssistantContainer extends Component{
  state = { coinpair: 'btcusd', CBene: [], OKEx: [], BitMax: [], HitBTC: [] }
  updatePair = (coinpair) => {
      this.setState({ coinpair: coinpair })
  }
  handleClick = () => {
    var cbfee = parseFloat(0.001);
    var oxfee = parseFloat(0.001);
    var hbfee = parseFloat(0.001);
    var bmfee = parseFloat(0.0004);
    if(this.state.coinpair === "btcusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=BTCUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/BTC-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/BTCUSD').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=BTC-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "ethusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=ETHUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/ETH-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/ETHUSD').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=ETH-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "ethbtc")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=ETHBTC').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/ETH-BTC/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/ETHBTC').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=ETH-BTC').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "etcusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=ETCUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/ETC-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/ETCUSD').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=ETC-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });

         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();

    }
    else if(this.state.coinpair === "etcbtc")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=ETCBTC').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/ETC-BTC/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/ETCBTC').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=ETC-BTC').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "ltcusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=LTCUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/LTC-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/LTCUSD').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=LTC-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "ltcbtc")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=LTCBTC').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/LTC-BTC/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/LTCBTC').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=LTC-BTC').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "xrpusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=XRPUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/XRP-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/XRPUSDT').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=XRP-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "xrpbtc")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=XRPBTC').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/XRP-BTC/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/XRPBTC').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=XRP-BTC').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "xlmusd")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=XLMUSDT').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/XLM-USDT/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/XLMUSD').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=XLM-USDT').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else if(this.state.coinpair === "xlmbtc")
    {
      var bidArr = [];
      var askArr = [];
      fetch('http://api.coinbene.com/v1/market/ticker?symbol=XLMBTC').then((response) => response.json()).then((responseData) => {
          this.setState({
              CBene: responseData.ticker
          });
          console.log(this.state.CBene["0"]["bid"]);
          bidArr.push(parseFloat(this.state.CBene["0"]["bid"]));
          askArr.push(parseFloat(this.state.CBene["0"]["ask"]));
      }).then(()=>{
          fetch('https://www.okex.com/api/spot/v3/instruments/XLM-BTC/ticker').then((response) => response.json()).then((responseData) => {
          this.setState({
              OKEx: responseData
          });
          console.log(this.state.OKEx.bid);
          bidArr.push(parseFloat(this.state.OKEx.bid));
          askArr.push(parseFloat(this.state.OKEx.ask));
          console.log(bidArr);
       }).then(()=>{
           fetch('https://api.hitbtc.com/api/2/public/ticker/XLMBTC').then((response) => response.json()).then((responseData) => {
           this.setState({
               HitBTC: responseData
           });
           console.log(this.state.HitBTC.bid);
           bidArr.push(parseFloat(this.state.HitBTC.bid));
           askArr.push(parseFloat(this.state.HitBTC.ask));
           console.log(bidArr);
     }).then(()=>{
         fetch('https://bitmax.io/api/v1/quote?symbol=XLM-BTC').then((response) => response.json()).then((responseData) => {
         this.setState({
             BitMax: responseData
         });
         console.log(this.state.BitMax.bidPrice);
         bidArr.push(parseFloat(this.state.BitMax.bidPrice));
         askArr.push(parseFloat(this.state.BitMax.askPrice));
         var as = Math.min(...askArr);
         var bi = Math.max(...bidArr);
         if(askArr.indexOf(as) === 0){
           if(bidArr.indexOf(bi) === 0){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))
          }
           else if(bidArr.indexOf(bi) === 1){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))
          }
           else if(bidArr.indexOf(bi) === 2){
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))
          }
           else{
             Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * cbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))
          }
         }
         else if(askArr.indexOf(as) === 1){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from OKEx with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from Coinbene with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * oxfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else if(askArr.indexOf(as) === 2){
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from HitBTC with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * hbfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
         else{
           if(bidArr.indexOf(bi) === 0){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from Coinbene with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * cbfee))}
           else if(bidArr.indexOf(bi) === 1){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from OKEx with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * oxfee))}
           else if(bidArr.indexOf(bi) === 2){Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from HitBTC with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * hbfee))}
           else{Alert.alert('Trade Path', 'You can buy one lot of selected pair from BitMax with the price: '
            + as + ', You can sell one lot of selected pair from BitMax with the price: '
            + bi + ', Buy fee: ' + parseFloat(as * bmfee) + ', Sell fee: ' + parseFloat(bi * bmfee))}
         }
      }).done();
      }).done();
      }).done();
    }).done();
    }
    else Alert.alert("Unhandled");
  }
render() {
  return (

      <View style={{ flex: 1, alignSelf: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Select the pair you want to operate:</Text>
        <Picker style={{ height: 50, width: 150 }} mode = 'dropdown' selectedValue = {this.state.coinpair} onValueChange = {this.updatePair}>
             <Picker.Item label = "BTC/USD" value = "btcusd" />
             <Picker.Item label = "ETH/USD" value = "ethusd" />
             <Picker.Item label = "ETH/BTC" value = "ethbtc" />
             <Picker.Item label = "ETC/USD" value = "etcusd" />
             <Picker.Item label = "ETC/BTC" value = "etcbtc" />
             <Picker.Item label = "LTC/USD" value = "ltcusd" />
             <Picker.Item label = "LTC/BTC" value = "ltcbtc" />
             <Picker.Item label = "XRP/USD" value = "xrpusd" />
             <Picker.Item label = "XRP/BTC" value = "xrpbtc" />
             <Picker.Item label = "XLM/USD" value = "xlmusd" />
             <Picker.Item label = "XLM/BTC" value = "xlmbtc" />
        </Picker>
        <TouchableNativeFeedback
          onPress={this.handleClick}
        >
          <View style={{width: 100, height: 30, backgroundColor: 'grey', alignSelf: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Find chains</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}


export default AssistantContainer
