import React, { useState , useRef } from "react";
import { Text, StyleSheet, View, FlatList , Animated } from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator  from "./Paginator";
import NextButton from "./NextButton";
import slides from "../slides";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Onboarding = () => {
    const [currentIndex , setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null)

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;


    const scrollTo=()=>{
      if(currentIndex < slides.length - 1){
        slidesRef.current.scrollToIndex({
          index:currentIndex + 1
        })
      }else{
        try {
          AsyncStorage.setItem('@viewedOnboarding' , 'true')
        }catch(e){
          console.log(e)
        }
      }
    }

    const viewConfig = useRef({viewAreaCoveragePercentThreshold:50}).current 
  return (
    <View style={[styles.container , {flex:3}]}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{
            nativeEvent: {
                contentOffset: {
                    x : scrollX
                }
            }
        }],{useNativeDriver:false })}

        scrollEventThrottle={32}

        onViewableItemsChanged={viewableItemsChanged}

        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <Paginator data={slides} scrollX={scrollX}/>

      <NextButton scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
