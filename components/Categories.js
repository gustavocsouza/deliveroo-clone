import { ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import client from '../sanity';
import { urlFor } from '../sanity';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client.fetch(`
      *[ _type == "category" ]
    `).then((data) => {
      setCategories(data);
    })
  }, []);

  return (
    <ScrollView 
        contentContainerStyle={{
            paddingHorizontal:15,
            paddingTop: 10
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
    >
      {categories?.map((category) => {
        return (
          <CategoryCard 
            key={category._id}
            imgUrl={urlFor(category.image).width(200).url()} 
            title={category.name}
          />
        );
      })}
    </ScrollView>
  )
}