import { useLocalSearchParams, Stack } from "expo-router"
import { FlatList, Text, View,  } from "react-native"
import orders from "@assets/data/orders"
import OrderListItem from "@/components/OrderListItem"
import OrderItemListItem from "@/components/OrderItemListItem"

export default function OrderDetailsScreen () {
  const { id } = useLocalSearchParams()

  const order = orders.find((order) => order.id.toString() === id)

  if (!order){
     return <Text> Not found </Text>
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