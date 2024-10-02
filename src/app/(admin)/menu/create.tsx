import Button from '@/components/Buttons'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet,TextInput,Image,Alert, ActivityIndicator } from 'react-native'
import { defaultPizzaImage } from '@/components/ProductListItem'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useDeleteProduct, useInsertProduct, useProduct, useProductList, useUpdateProduct } from '@/api/products'
import { Product } from '@/types'
import * as FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/lib/supabase'
import { decode } from 'base64-arraybuffer'

const CreateProductScreen = () => {
    const router = useRouter()
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState<string|null >(null)
    const [errors, setErrors] = useState('')

    const { id: idString } = useLocalSearchParams()
    const id = parseFloat(typeof idString === 'string'? idString : idString?.[0]) 
    const isUpdating = !!id
    const {mutate:insertProduct } = useInsertProduct()
    const {mutate:updateProduct } = useUpdateProduct()
    const {data:updatingProduct } = useProduct(id)
    const {mutate: deleteProduct} = useDeleteProduct()
    const {data:product, isLoading } = useProductList()



    useEffect(()=>{

     if (updatingProduct){
        setName(updateProduct.name)
        setImage(updatingProduct.image)
        setPrice(updatingProduct.price)
     }
    },[updatingProduct])
    
    const onSubmit =()=>{
        if(isUpdating){
            onUpdate()//update
        } else {
            onCreate()
        }
    }

    const onCreate = async ()=>{
        if (!validateInputs()){
            return
        }
       const imagePath = await uploadImage() 
        insertProduct({ name, price: parseFloat(price), image: imagePath},
    
        {
            onSuccess: ()=>{
                resetFields()
                router.back()
            }
        }
         )
    }

    const onUpdate = async()=>{
    if (!validateInputs){
        return
    }

        const imagePath = await uploadImage()
        updateProduct({id, name, price:parseFloat(price), image: imagePath},
    
        {
            onSuccess: ()=>{
                resetFields()
                router.back()
            }
        }
    )
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
    
    const uploadImage = async () => {
       
        if (!image?.startsWith('file://')) {
          return;
        }
       
        
      
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, decode(base64), { contentType });
      
        if (data) {
          return data.path;
        }
      };

    const onDelete =()=>{
        
        deleteProduct(id, {
            onSuccess: ()=>{
                resetFields()
                router.replace('/(admin)')
            }
        })


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
        {isLoading? (<ActivityIndicator size={75} />) : <Button text={ isUpdating? 'Update' : 'Create'} onPress={onSubmit}/>}
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
