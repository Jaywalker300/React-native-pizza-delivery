import { StyleSheet, Text, Pressable, Image } from 'react-native'
import React,{} from 'react'
import products from '@assets/data/products'
import { Product } from '../types'
import { Link } from 'expo-router'

// export const defaultPizzaImage = 
type ProductListItemProps = {
    product: Product
}

const ProductListItem =({product}: ProductListItemProps)=> {

    return (
      <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
      <Image source={{uri: product.image}}
      style={styles.image}
      resizeMode='contain'
      />
      <Text style={styles.title}> {product.name} </Text>
      <Text style={styles.price}> ₦{product.price} </Text>
    </Pressable>
    </Link>
    )
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius:20,
      flex: 1,
      margin: 5,
    },
    
    image: {
      width:'100%' ,
      aspectRatio: 1,
    },
  
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginVertical: 10,
      color: 'white',
    },

    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    price: {
      fontSize: 15,
      fontWeight: '100',
      color: 'white',
    }
  });
  

export default ProductListItem