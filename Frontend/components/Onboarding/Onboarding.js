import React, { useState, useRef } from "react";
import { 
  Text, 
  StyleSheet, 
  View, 
  FlatList, 
  Animated, 
  TouchableOpacity, 
  Dimensions 
} from "react-native";
import OnboardingItem from "./OnboardingItem";
import Paginator from "./Paginator";
import slides from "./slides";
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get('window');
const COLORS = { primary: '#282534', purple: '#4B0082' };

export default Onboarding = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSlideIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex < slides.length) {
      const offset = nextSlideIndex * width;
      slidesRef?.current?.scrollToOffset({ offset, animated: true });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    slidesRef?.current?.scrollToOffset({ offset, animated: true });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View style={styles.footer}>
        <View style={{ marginBottom: 20 }}>
          {currentSlideIndex === slides.length - 1 ? (
            <View style={{ height: 50 }}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.replace('Login')}
              >
                <Text style={styles.btnText}>GET STARTED</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.footerButtons}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.btn, styles.skipBtn]}
                onPress={skip}
              >
                <Text style={[styles.btnText, { color: COLORS.purple }]}>
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 15 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={goToNextSlide}
                style={styles.btn}
              >
                <Text style={styles.btnText}>NEXT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { flex: 3 }]}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event) => {
              const contentOffsetX = event.nativeEvent.contentOffset.x;
              const currentIndex = Math.round(contentOffsetX / width);
              setCurrentSlideIndex(currentIndex);
            },
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <Paginator data={slides} scrollX={scrollX} />

      <Footer />
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
  footer: {
    height: height * 0.2,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footerButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    height: 50,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#4B0082',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipBtn: {
    borderColor: COLORS.purple,
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff',
  },
});