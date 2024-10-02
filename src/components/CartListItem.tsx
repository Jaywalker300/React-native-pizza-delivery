import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';

import { CartItem } from '../types';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '@/providers/CartProviders';
import { defaultPizzaImage } from './ProductListItem';
import RemoteImage from './RemoteImages';


type CartListItemProps = {
  cartItem: CartItem;
};
  

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity} = useCart();


  return (
    <View style={styles.container}>
        <RemoteImage
        path={cartItem.product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode='contain'/>
        
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>₦{cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>

      </View>
        <View style={styles.quantitySelector}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="red"
          style={{ padding: 5 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="blue"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 75,
    aspectRatio: 1,
    alignSelf: 'center',
    marginRight: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
     color: 'white'
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
    color: 'yellow'
  },
  price: {
    color:'white',
    fontWeight: 'bold',
  
  },
});

export default CartListItem;