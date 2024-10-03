import RemoteImage from '@/components/RemoteImages'
import Colors from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { Link, Stack } from 'expo-router'
import { View, Text, Button, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import { defaultPizzaImage } from '@/components/ProductListItem'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as FileSystem from 'expo-file-system'




const ProfileScreen = () => {

  return (
    <View>
      <Text>Profile</Text>
      <View style={styles.container}>
        <Image
          source={{ uri: defaultPizzaImage }}
          resizeMode='contain'
          style={styles.image} />
      </View>
      <View style={styles.button} >

        <TouchableOpacity onPress={async () => await supabase.auth.signOut()}>
          <Icon name='sign-out' size={30} color="#fff" />
        </TouchableOpacity>
      </View>
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
    aspectRatio: 2.5,
  },

  title: {
    textAlign: 'center',
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

  button: {
    top: -30,
    right: -300,
    borderRadius: 40,
    width: 100,
  }
})

export default ProfileScreen 