import { StyleSheet, Text, Pressable, Image } from 'react-native'
import React, { } from 'react'
import { Tables } from '../types'
import { Link, useSegments } from 'expo-router'
import RemoteImage from './RemoteImages'

export const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png';

// export const defaultPizzaImage = 
type ProductListItemProps = {
  product: Tables<'products'>
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments()

  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image} 
          fallback={defaultPizzaImage} 
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
    borderRadius: 20,
    flex: 1,
    margin: 5,
  },

  image: {
    width: '100%',
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