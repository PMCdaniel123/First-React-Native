import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ArtContext } from "../contexts/ArtContext";
import { FontAwesome } from "@expo/vector-icons";

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const { favorites, toggleFavorite } = useContext(ArtContext);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const limitedDeal = item.limitedTimeDeal
    ? Math.floor(item.limitedTimeDeal * 100)
    : 0;

  const limitedPrice = item.limitedTimeDeal
    ? ((1 - item.limitedTimeDeal) * item.price).toFixed(2)
    : 0;

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentUser}>{item.user}</Text>
        <View style={styles.ratingContainer}>
          {Array.from({ length: item.rating }).map((_, index) => (
            <MaterialIcons key={index} name="star" size={16} color="#FFD700" />
          ))}
        </View>
      </View>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentDate}>{item.date}</Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.headerContainer}>
        <Text style={styles.artName}>{item.artName}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(item)}
        >
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-outline"}
            size={30}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.brand}>Brand: {item.brand}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.priceContainer}>
        {item.limitedTimeDeal ? (
          <Text style={styles.price}>${limitedPrice}</Text>
        ) : null}
        <Text style={item.limitedTimeDeal ? styles.limitedPrice : styles.price}>
          ${item.price}
        </Text>
      </View>

      {item.limitedTimeDeal ? (
        <Text style={styles.limitedTimeDeal}>{limitedDeal}% OFF</Text>
      ) : null}

      {item.glassSurface && <FontAwesome name="glass" size={30} color="gray" />}

      <View style={styles.commentSection}>
        <Text style={styles.sectionHeader}>
          Comments{" "}
          <Text style={styles.ratingCount}>
            ({item.comments.length} ratings)
          </Text>
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={item.comments}
      renderItem={renderComment}
      keyExtractor={(comment) => comment.date}
      ListHeaderComponent={renderContent}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
    position: "relative",
  },
  contentContainer: {
    marginBottom: 10,
  },
  favoriteButton: {
    padding: 5,
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 8,
    marginBottom: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  artName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  limitedPrice: {
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  price: {
    fontSize: 20,
    color: "red",
    fontWeight: "600",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  limitedTimeDeal: {
    position: "absolute",
    backgroundColor: "#FF3B30",
    zIndex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ratingCount: {
    fontSize: 16,
    fontWeight: "400",
    fontStyle: "italic",
    color: "#ccc",
  },
  commentSection: {
    marginTop: 15,
  },
  commentContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 16,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  commentText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#ccc",
    fontStyle: "italic",
  },
});

export default DetailScreen;
