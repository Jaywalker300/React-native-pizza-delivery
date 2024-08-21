import { View,FlatList } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import products from '@assets/data/products';


export default function menuScreen() {
  return (
    <View>
     <FlatList
     data = {products}
     renderItem={({item}) => <ProductListItem product ={item}/> }
     numColumns={2}
     contentContainerStyle ={{ gap: 10}}
     columnWrapperStyle = {{ gap: 10}}
     />
    </View>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

