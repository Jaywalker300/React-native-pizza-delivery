import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@assets/data/products'
import { useState } from 'react'
import Button from '@/components/Buttons'



const sizes = ['S', 'M', 'L', 'XL']

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState('XL')
  const {id} = useLocalSearchParams()
  const product = products.find((p) => p.id.toString() === id)

  const addToCart =()=>{
  // console.warn('Adding to cart')
  }

  if (!product) {
    return <Text> Product Not Found</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name}}/>
      <Image source={{ uri: product.image }} style = {styles.image}/>
      
      <Text style={styles.title}> Select Size</Text>

      <View style={styles.sizes} >
      {sizes.map((size)=> ( 
        <Pressable onPress={()=>{setSelectedSize(size)}}
         style={[
          styles.size,
          {
            backgroundColor: selectedSize === size ? 'red' : 'green' 
          }
          ]} key={size}>
            <Text style={styles.sizeText} >{size} </Text>
        </Pressable>
       ))
      }
      </View>

      <Text style={styles.price}> ₦{product.price} </Text>
      <Button onPress={addToCart} text='Add to Cart'/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
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

export default ProductDetails