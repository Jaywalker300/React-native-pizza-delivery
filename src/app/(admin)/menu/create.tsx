import Button from '@/components/Buttons'
import { useState } from 'react'
import { View, Text, StyleSheet,TextInput,Image,Alert } from 'react-native'
import { defaultPizzaImage } from '@/components/ProductListItem'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'



const CreateProductScreen = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string|null >(null)
    const [errors, setErrors] = useState('')

    const { id } = useLocalSearchParams()
    const isUpdating = !!id
    
    const onSubmit =()=>{
        if(isUpdating){
            onUpdateCreate()//update
        } else {
            onCreate()
        }
    }

    const onCreate = ()=>{
        console.log(`name is: ${name} and price is: ${price}`)
        // save in the database

        if (!validateInputs()){
            return
        }
        resetFields()
    }

    const onUpdateCreate = ()=>{
        console.log(`name is: ${name} and price is: ${price}`)
        // save in the database

        if (!validateInputs()){
            return
        }
        resetFields()
    }

    

    const validateInputs = ()=>{
        setErrors('')
        if (!name){
            setErrors('Name is required')
            return false
        }

        if (!price){
            setErrors('Price is required')
            return false
        }

        if(isNaN(parseFloat(price))) {
            setErrors('Price is not a number')
            return false
        }

        return true
    }

    const resetFields =()=>{
        setName('')
        setPrice('')
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        })

        if(!result.canceled){
            setImage(result.assets[0].uri)
        }
    }
    
    const onDelete =()=>{
        console.warn('Deleting')
    }

    const confirmDelete =()=>{
        Alert.alert('Confirm', 'Are you sure you want to delete this product?',[
            {
                text: 'Cancel',
            },

            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    }

  return (
    <View style={styles.container}>
        <Stack.Screen options={{ title: isUpdating ?  "Update Product" : "Create Product"}}/>
        <Image source={{uri: image || defaultPizzaImage}} style={styles.image}/>
        <Text onPress={pickImage} style={styles.textButton}> Select Image</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
        value={name}
        onChangeText={setName} 
        placeholder='Name' 
        style={styles.input}/>

        <Text style={styles.label}>Price</Text>
        <TextInput
        value={price}
        onChangeText={setPrice} 
        placeholder='Enter a price' 
        style={styles.input} 
        keyboardType='numeric'/>

        <Text style={{color:'red'}}>{errors}</Text>
        <Button text={ isUpdating? 'Update' : 'Create'} onPress={onSubmit}/>
        {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>}
    </View>

    
  )
}

const styles = StyleSheet.create({
    container :{
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    },

    label:{
        color:"white",
        fontSize: 16,
        marginRight: 15
    },

    input:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        
    },

    textButton:{
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 10
    },

    image:{
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center'
    }


})

export default CreateProductScreen