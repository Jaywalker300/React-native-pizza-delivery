import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@assets/data/products'
import { useState } from 'react'
import { useCart } from '@/providers/CartProviders'
import { PizzaSize } from '@/types'
import { Link} from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";




const ProductDetails = () => {
  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('XL')

  const {id} = useLocalSearchParams()

  const product = products.find((p) => p.id.toString() === id)

  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

  const router = useRouter()

  const addToCart =()=>{
  console.log(product)
  if (!product) return

  addItem(product, selectedSize)
  
  router.push('/cart')
  }

  if (!product) {
    return <Text> Product Not Found</Text>
  }

  return (
    <View style={styles.container}>
       <Stack.Screen 
          options={{title:"Menu",headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),}} />
      <Stack.Screen options={{ title: product.name}}/>
      <Image source={{ uri: product.image }} style = {styles.image}/>

      <Text style={styles.title}> {product.name} </Text>
      <Text style={styles.price}> ₦{product.price} </Text>
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
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'center',  
  },

  sizeText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },

  price: {
    color: 'white',
    fontSize: 20,
  },
})

export default ProductDetails