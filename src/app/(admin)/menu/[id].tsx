import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { useCart } from '@/providers/CartProviders'
import { PizzaSize } from '@/types'
import { Link} from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useProduct } from '@/api/products'
import { defaultPizzaImage } from '@/components/ProductListItem'
import RemoteImage from '@/components/RemoteImages'




const ProductDetails = () => {
  const { addItem } = useCart()
  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']  

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('XL')

  const {id: idString} = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string'? idString : idString[0])

  const {data: product, error, isLoading } = useProduct(id)


  const router = useRouter()

  const addToCart =()=>{
  
  if (!product) return

  addItem(product, selectedSize)
  
  router.push('/cart')
  }

  if (isLoading){
    return <ActivityIndicator/>
  }
  if (error){
    return <Text> Failed to fetch product</Text>
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
      <Stack.Screen options={{ title: product?.name}}/>
      <RemoteImage
          path={product?.image} 
          fallback={defaultPizzaImage} 
          style={styles.image}
          resizeMode='contain'
        />

      <Text style={styles.title}> {product?.name} </Text>
      <Text style={styles.price}> ₦{product?.price} </Text>
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