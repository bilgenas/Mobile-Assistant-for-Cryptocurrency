import React from 'react';
import { Alert, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { images } from '../Utility/MarketImages.js';


const BookBlock = (props) => {

  return (
    <View style={container}>

        <View style={upperRow}>
            <Text style={coinName}>{props.type}</Text>
            <Text style={coinName}>{props.pair}</Text>
            <Text style={coinName}>Price: {props.price}</Text>
            <Text style={coinName}>Quantity: {props.quantity}</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
container: {
    display: "flex",
},
upperRow: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    backgroundColor: '#424242'
},
coinSymbol: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 5,
    fontWeight: "bold",
},
coinName: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20,
    fontWeight: "bold",
    color: "white"
},
seperator: {
    marginTop: 10,
},
coinPrice: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: 10,
    fontWeight: "bold",
},
image: {
    width: 35,
    height: 35,
},
moneySymbol: {
    fontWeight: "bold",
},
statisticsContainer: {
    display: "flex",
    borderTopColor: "#FAFAFA",
    borderTopWidth: 2,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around"
},
percentChangePlus: {
    color: "#00BFA5",
    fontWeight: "bold",
    marginLeft: 5
},
percentChangeMinus: {
    color: "#DD2C00",
    fontWeight: "bold",
    marginLeft: 5
}
})

const {
container,
image,
moneySymbol,
upperRow,
coinSymbol,
coinName,
coinPrice,
statisticsContainer,
seperator,
percentChangePlus,
percentChangeMinus
} = styles;

export default BookBlock;
