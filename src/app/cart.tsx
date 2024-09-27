import React from 'react'
import { View, Text, Platform,FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useContext } from 'react'
import { useCart } from '@/providers/CartProviders'
import { StyleSheet } from 'react-native'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Buttons'

const CartScreen = () => {
  const {items, total, checkout} = useCart()

  return (
    <View style={styles.container}>
     <FlatList
     data={items}
     renderItem={({item}) =><CartListItem cartItem={item}/>}
     contentContainerStyle ={{ gap: 10}}
     />
     
     <Text style={{marginTop: 20, fontSize: 20, color: '#ffff', fontWeight: '500' }}> Total: ₦{total}</Text>
     <Button onPress={checkout}text='Checkout'/>

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