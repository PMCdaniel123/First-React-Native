import { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
} from "react-native";
import { ArtContext } from "../contexts/ArtContext";
import axios from "axios";
import ArtItem from "../components/ArtItem";
import Icon from "react-native-vector-icons/FontAwesome";

const brands = ["All Brands", "Arteza", "Color Splash", "Edding", "KingArt"];

const HomeScreen = ({ navigation }) => {
  const [artTools, setArtTools] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [filteredArtTools, setFilteredArtTools] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { favorites, toggleFavorite } = useContext(ArtContext);

  const getArtTools = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://66fa3dd9afc569e13a9adcb4.mockapi.io/products"
      );
      setLoading(false);
      setArtTools(response.data);
      setFilteredArtTools(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArtTools();
  }, []);

  useEffect(() => {
    setFilteredArtTools(
      artTools.filter((tool) => {
        const matchesBrand = selectedBrand
          ? tool.brand === selectedBrand
          : true;
        const matchesSearch = tool.artName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesBrand && matchesSearch;
      })
    );
  }, [artTools, selectedBrand, searchTerm]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Art Tools..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Icon name="filter" size={30} color="gray" />
          </TouchableOpacity>
        </View>

        {isVisible && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.button,
                  selectedBrand === (brand === "All Brands" ? "" : brand) &&
                    styles.selectedButton,
                ]}
                onPress={() =>
                  setSelectedBrand(brand === "All Brands" ? "" : brand)
                }
              >
                <Text
                  style={
                    selectedBrand === (brand === "All Brands" ? "" : brand)
                      ? styles.selectedButtonText
                      : styles.buttonText
                  }
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      {filteredArtTools.length === 0 ? (
        <View style={styles.containerNothing}>
          <Text>No art tools found.</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredArtTools}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ArtItem
              item={item}
              onPress={() => navigation.navigate("Detail", { item })}
              onToggleFavorite={() => toggleFavorite(item)}
              isFavorite={favorites.some((fav) => fav.id === item.id)}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  containerNothing: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  filterButton: {
    padding: 10,
  },
  scrollContainer: {
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#e4e4e4",
    borderRadius: 10,
  },
  selectedButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "#000",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HomeScreen;
