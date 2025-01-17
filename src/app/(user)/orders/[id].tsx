import { useLocalSearchParams, Stack } from "expo-router"
import { ActivityIndicator, FlatList, Text, View,  } from "react-native"
import orders from "@assets/data/orders"
import OrderListItem from "@/components/OrderListItem"
import OrderItemListItem from "@/components/OrderItemListItem"
import { useOrderDetails } from "@/api/orders"
import { useUpdateOrderSubscription } from "@/api/orders/subscription"

export default function OrderDetailsScreen () {
  const { id:idString } = useLocalSearchParams()
  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
  
  const {data: order, isLoading, error} = useOrderDetails(id)
  useUpdateOrderSubscription(id)

  if (!order){
     return <Text> Not found </Text>
  }
  if (isLoading){
     return <ActivityIndicator/>
  }
  if (error){
     return <Text> Failed to fetch</Text>
  }

  return (
    <View style={{ padding: 10, gap: 20}}>
        <Stack.Screen options={{ title: `Order #${id}`}}/>
        <OrderListItem order={order}/>
        <FlatList data={order.order_items} renderItem={({item}) =><OrderItemListItem item={item}/> }
        contentContainerStyle={{ gap: 10}}/>
        
    </View>
)
  
}