import { View, Text, SafeAreaView, Image, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import GlobalStyles from '../GlobalStyles';
import { ChevronDownIcon, UserIcon, AdjustmentsVerticalIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';

import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';

import sanityClient from '../sanity';

const HomeScreen = () => {
    const navigation = useNavigation();
    
    const [ featuredCategories, setFeaturedCategories ] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        // Buscar info da api ao carregar o componente
        sanityClient.fetch(`
            *[ _type == "featured"] {
                ...,
                restaurants[]-> {
                    ...,
                    dishes[]->,
                    type-> {
                    
                    ...
                    }        
                }
            }
        `).then((data) => {
            setFeaturedCategories(data)
        })
    }, []);

    return (
        <SafeAreaView style={GlobalStyles.droidSafeArea} className="bg-white pt-5">
            <View className="flex-row pb-3 items-center mx-4 space-x-2">
                <Image 
                    source={{
                        uri: 'https://links.papareact.com/wru'
                    }}
                    className="w-7 h-7 bg-gray-300 p-4 rounded-full"
                />
                <View className="flex-1"> 
                    <Text className="font-bold text-gray-400 text-xs">
                        Deliver now!
                    </Text>
                    <Text className="font-bold text-xl">
                        Current Location
                        <ChevronDownIcon size={20} color={'#00CCBB'}/>
                    </Text>
                </View>

                <UserIcon size={35} color={'#00CCBB'} />
            </View>

            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon color='gray' size={20}/>
                    <TextInput 
                        placeholder="Restaurant and cuisines" 
                        keyboardType="default"
                    />
                </View>
                <AdjustmentsVerticalIcon color={'#00CCBB'} />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100">
                {/* Categories */}
                <Categories />

                {featuredCategories?.map((category) => {
                    return (
                        <FeaturedRow 
                            key={category._id}
                            id={category._id}
                            title={category.name}
                            description={category.short_description}
                        />

                    )
                })}
               
            </ScrollView>
        </SafeAreaView>
    )
}   

export default HomeScreen;