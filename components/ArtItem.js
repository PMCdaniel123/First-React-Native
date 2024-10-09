import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ArtItem = ({ item, onPress, onToggleFavorite, isFavorite }) => {
  const limitedDeal = item.limitedTimeDeal
    ? Math.floor(item.limitedTimeDeal * 100)
    : 0;

  const limitedPrice = item.limitedTimeDeal
    ? ((1 - item.limitedTimeDeal) * item.price).toFixed(2)
    : 0;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.artToolCard}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.image} />
          {item.limitedTimeDeal ? (
            <View style={styles.dealBadge}>
              <Text style={styles.dealText}>{limitedDeal}% OFF</Text>
            </View>
          ) : null}
        </View>
        <View style={styles.info}>
          <Text style={styles.artName}>{item.artName}</Text>
          <View style={styles.priceContainer}>
            {item.limitedTimeDeal ? (
              <Text style={styles.price}>${limitedPrice}</Text>
            ) : null}
            <Text
              style={item.limitedTimeDeal ? styles.limitedPrice : styles.price}
            >
              ${item.price}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onToggleFavorite}
          style={styles.favoriteButton}
        >
          <MaterialCommunityIcons
            name={isFavorite ? "heart" : "heart-outline"}
            size={30}
            color={isFavorite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  artToolCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  dealBadge: {
    position: "absolute",
    backgroundColor: "#FF3B30",
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomEndRadius: 10,
  },
  dealText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  limitedPrice: {
    textDecorationLine: "line-through",
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  artName: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },
  favoriteButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 15,
  },
});

export default ArtItem;
