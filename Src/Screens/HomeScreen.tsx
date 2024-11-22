import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageSourcePropType
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  Search: undefined;
  Friends: undefined;
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
};

type Navigation = NavigationProp<RootStackParamList>;

interface Profile {
  name: string;
  image: ImageSourcePropType;
}

interface Icon {
  source: ImageSourcePropType;
  screen: keyof RootStackParamList;
  key: string;
}

// For Profile Avatars
const profiles: Profile[] = [
  { name: 'Barbie', image: require('../Images/Profile/barbie.png') },
  { name: 'Donald', image: require('../Images/Profile/donald_duck.png') },
  { name: 'Emily', image: require('../Images/Profile/emily.png') },
  { name: 'Lily', image: require('../Images/Profile/lily.png') },
  { name: 'More', image: require('../Images/Profile/more.png') },
];

// For Bottom Action Menus
const actionImages: ImageSourcePropType[] = [
  require('../Images/Action-menu/microphone.png'),
  require('../Images/Action-menu/chat.png'),
  require('../Images/Action-menu/sketch.png'),
  require('../Images/Action-menu/dancing.png'),
];

// For Footer menu 
const icons: Icon[] = [
  { source: require('../Images/Footer/search-icon.png'), screen: 'Search', key: 'Search' },
  { source: require('../Images/Footer/friends-icon.png'), screen: 'Friends', key: 'Friends' },
  { source: require('../Images/Footer/home-icon.png'), screen: 'Home', key: 'Home' },
  { source: require('../Images/Footer/chat-icon.png'), screen: 'Chat', key: 'Chat' },
  { source: require('../Images/Footer/profile-icon.png'), screen: 'Profile', key: 'Profile' },
];

export default function HomeScreen() {

  const navigation = useNavigation<Navigation>();

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={{ paddingHorizontal: 5 }}>
          <Image
            source={require('../Images/Header/heart.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginStart: 5 }}>
          <Image
            source={require('../Images/Header/notification.png')}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>

      {/* Horizontal Scrollable Profiles */}
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profile}>

            <View>
              <Image source={profile.image} style={styles.avatar} />
              {profile.name === 'More' && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>15+</Text>
                </View>
              )}

            </View>
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Green Line and dots */}
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.greenLineContainer}>
          <View style={styles.greenDot} />
          <View style={styles.greenLine} />
          <View style={styles.greenDot} />
        </View>
      </View>

      {/* Main Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../Images/mickey_mouse.png')}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      {/* Action Menu  */}
      <View style={styles.imageActions}>
        {actionImages.map((image, index) => (
          <TouchableOpacity key={index} style={styles.actionButton}>
            <Image source={image} style={styles.actionImage} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {icons.map((icon) => (
          <TouchableOpacity
            key={icon.key}
            onPress={() => {
              handleNavigation(icon.screen)
            }}
            
            style={[
              styles.iconContainer,
              icon.screen === 'Home' && styles.activeIconContainer
            ]}
          >
            <Image source={icon.source} style={styles.icon} />
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
  },
  headerImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  scrollContent: {
    alignItems: "center",
    paddingRight: 10,
  },
  profile: {
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  avatar: {
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.125,
    borderWidth: 2,
  },
  profileName: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "800",
    textAlign: 'center',
    color: '#333',
  },
  greenLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  greenLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#35E446',
  },
  greenDot: {
    width: 6,
    height: 6,
    backgroundColor: '#35E446',
    borderRadius: 4,
  },
  imageContainer: {
    width: '100%',
    height: "60%",
    backgroundColor: "#e72c38"
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  actionButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
  },
  actionImage: {
    width: 50,
    height: 50
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E1E1E1A1',
    paddingVertical: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  activeIconContainer: {
    backgroundColor: '#2DD7028A',
  },
  icon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    transform: [{ translateX: -15 }, { translateY: -10 }],
    backgroundColor: 'transparent',
    borderRadius: 10,
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
