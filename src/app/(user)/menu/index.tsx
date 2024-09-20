import { View,FlatList, ActivityIndicatorBase, ActivityIndicator, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/api/products';

export default function menuScreen() {
  const {data:product, error, isLoading } = useProductList()

  if (isLoading){
    return <ActivityIndicator size={75}/>
  }

  if (error){
    return <Text> Failed to fetch product </Text>
  }
  

  return (
    <View>
     <FlatList
     data = {product}
     renderItem={({item}) => <ProductListItem product ={item}/> }
     numColumns={2}
     contentContainerStyle ={{ gap: 10}}
     columnWrapperStyle = {{ gap: 10}}
     />
    </View>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
}

