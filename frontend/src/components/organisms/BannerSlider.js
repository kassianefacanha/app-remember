import React from 'react';
import { FlatList, Image, View, Dimensions, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

const { width: viewportWidth } = Dimensions.get('window');
const cardWidth = viewportWidth * 0.8;  
const cardHeight = 250;  

const bannersData = [
  {
    id: 1,
    text: 'There was a problem processing a transaction on your credit card.',
    imageUri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4',
  },
  {
    id: 2,
    text: 'Your subscription is about to expire.',
    imageUri: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    text: 'We noticed suspicious activity in your account.',
    imageUri: 'https://via.placeholder.com/200',
  },
];

const BannerSlider = () => {
  const renderItem = ({ item }) => (
    <View style={styles.cardWrapper}>
      <View style={styles.shadow}>
        <Card style={styles.card}>
          <Image source={{ uri: item.imageUri }} style={styles.image} />
          <Card.Content style={styles.content}>
            <Paragraph>{item.text}</Paragraph>
          </Card.Content>
        </Card>
      </View>
    </View>
  );

  return (
    <FlatList
      data={bannersData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardWrapper: {
    width: cardWidth,
    height: cardHeight,
    marginHorizontal: 10,
  },
  shadow: {
    flex: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden', 
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
    height: '30%',
  },
});

export default BannerSlider;
