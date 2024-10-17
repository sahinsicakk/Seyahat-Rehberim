import {ScrollView, StyleSheet,Text,TouchableOpacity,View}  from 'react-native'
import React, { useRef, useState } from 'react'
import destinationCategories from '@/data/categories'
import { MaterialCommunityIcons } from '@expo/vector-icons'


type Props = {
    onCategoryChanged:(category:string) => void;
}

const CategoryButtons = ({onCategoryChanged}:Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex,setActiveIndex]= useState(0);

    const handleSelectCategory = (index:number) =>{
        const selected=itemRef.current[index];
          setActiveIndex(index);

          selected?.measure((x) =>{
             scrollRef.current?.scrollTo({x:x, y: 0, animated:true});
          });

          onCategoryChanged(destinationCategories[index].title);
          
    };
    return(
    <View>
        <Text  style={styles.title}>KATEGORİLER</Text>
        <ScrollView
        ref={scrollRef}
         horizontal showsHorizontalScrollIndicator={false} 
         contentContainerStyle={{
            gap:20,
            paddingVertical:10,
            marginBottom:10
        }}>
           {destinationCategories.map((item,index) => (
            <TouchableOpacity key={index}
             ref={(el) => (itemRef.current[index] ==el)} 
            onPress={() => handleSelectCategory(index)}  
            style={activeIndex === index 
            ? styles.CategoryBtnActive
            : styles.categoryBtn
            }
            >
           <MaterialCommunityIcons
            name={item.iconmame as any}
            size={20} 
            color={activeIndex==index ? 'white':'#20B2AA'}
            />
           <Text style={activeIndex== index ?styles.categoryBtnTxtActive:styles.categoryBtnTxt}>{item.title}</Text>
           </TouchableOpacity>
       ) )} 
        </ScrollView>
    </View>
    )
}
    
export default CategoryButtons

const styles = StyleSheet.create({
    title:{
        fontSize:22,
        fontWeight:'700',
        color:'#20B2AA',
    },
    CategoryBtnActive:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#20B2AA',
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:20,
        elevation:9,
        borderWidth:0.7,
        borderColor:'#20B2AA'
    },
    categoryBtn:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
        paddingHorizontal:16,
        paddingVertical:10,
        borderRadius:20,
        elevation:9,
        borderWidth:0.7,
        borderColor:'#20B2AA'

    },
    categoryBtnTxt:{
        marginLeft:5,
        color:'black'
    },
    categoryBtnTxtActive:{
      marginLeft:5,
      color:'White',
    }
    
})