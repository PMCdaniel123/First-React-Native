import { useContext, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { ArtContext } from "../contexts/ArtContext";
import ArtItem from "../components/ArtItem";
import { FontAwesome } from "@expo/vector-icons";

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, clearFavorites } = useContext(ArtContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleClearFavorites = () => {
    clearFavorites();
    setModalVisible(false);
    Alert.alert(
      "Favorites cleared!",
      "All items have been removed from your favorites."
    );
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.clearButton} onPress={clearFavorites}>
        <Text style={styles.clearButtonText}>Remove All Favorites</Text>
      </TouchableOpacity> */}

      {favorites.length === 0 ? (
        <View style={styles.containerNothing}>
          <Text>No art tools in favorites.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
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

      {favorites.length > 1 && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.overlay}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Are you sure you want to clear all favorites?
                  </Text>
                  <Pressable
                    style={[styles.buttonOK, styles.modalButton]}
                    onPress={handleClearFavorites}
                  >
                    <Text style={styles.textStyle}>Yes, Clear All</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.buttonCancel, styles.modalButton]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <Pressable
            style={styles.buttonDelete}
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="trash-o" size={30} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    marginTop: 10,
  },
  containerNothing: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonDelete: {
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "red",
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 5,
    zIndex: 10,
  },
  buttonOK: {
    backgroundColor: "red",
  },
  buttonCancel: {
    backgroundColor: "gray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default FavoritesScreen;
