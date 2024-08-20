import React from 'react'
import { View, Text, Platform,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { useCart } from '@/providers/CartProviders'
import { StyleSheet } from 'react-native'
import CartListItem from '@/components/CartListItem'

const CartScreen = () => {
  const {items} = useCart()

  return (
    <View style={styles.container}>
     <FlatList
     data={items}
     renderItem={({item}) =><CartListItem cartItem={item}/>}
     contentContainerStyle ={{ padding: 10, gap: 10}}
     />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: '100%',

  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },

  size: {
    backgroundColor: 'green',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent:'center',
    fontSize: 20,
  },

  sizeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  price: {
    color: 'white',
    fontSize: 20,
    marginTop: 'auto'
  },
})

export default CartScreen