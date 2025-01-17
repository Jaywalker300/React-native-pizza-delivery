import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { defaultPizzaImage } from '@/components/ProductListItem'
import { useState } from 'react'
import Button from '@/components/Buttons'
import { useCart } from '@/providers/CartProviders'
import { PizzaSize } from '@/types'
import { useProduct } from '@/api/products'
import RemoteImage from '@/components/RemoteImages'





const ProductDetails = () => {
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('XL')

  const { id: idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)


  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

  const router = useRouter()

  const addToCart = () => {
    if (!product) return

    addItem(product, selectedSize)

    router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator size={75} />
  }
  if (error) {
    return <Text> Failed to load product </Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.title}> Select Size</Text>

      <View style={styles.sizes} >
        {sizes.map((size) => (
          <Pressable onPress={() => { setSelectedSize(size) }}
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
      <Button onPress={addToCart} text='Add to Cart' />
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
    justifyContent: 'center',
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