import { useEffect, useState } from "react";

import BottomNav from "../components/BottomNav";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import API from "../services/api";


export default function GroceryScreen() {

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");

  const [groceries, setGroceries] = useState([]);
  const [search, setSearch] = useState("");


  // FETCH GROCERIES
  const fetchGroceries = async () => {
    try {

      const response = await API.get("/grocery");

      setGroceries(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // ADD GROCERY
  const addGrocery = async () => {

    if (!productName || !quantity) {
      return Alert.alert(
        "Please fill all fields"
      );
    }

    try {

      await API.post("/grocery/add", {
        productName,
        quantity,
      });

      setProductName("");
      setQuantity("");

      fetchGroceries();

    } catch (error) {

      console.log(error);

    }
  };


  // DELETE GROCERY
  const deleteGrocery = async (id) => {
    try {

      await API.delete(`/grocery/${id}`);

      fetchGroceries();

    } catch (error) {

      console.log(error);

    }
  };


  // TOGGLE PURCHASED
  const togglePurchased = async (id) => {
    try {

      await API.put(`/grocery/${id}`);

      fetchGroceries();

    } catch (error) {

      console.log(error);

    }
  };


  // UPDATE QUANTITY
  const updateQuantity = async (
    id,
    currentQuantity,
    type
  ) => {
    try {

      let newQuantity =
        Number(currentQuantity);

      if (type === "increase") {
        newQuantity++;
      } else {

        if (newQuantity <= 1) return;

        newQuantity--;
      }

      await API.put(
        `/grocery/update/${id}`,
        {
          quantity: newQuantity,
        }
      );

      fetchGroceries();

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchGroceries();
  }, []);


  // SEARCH FILTER
  const filteredGroceries =
    groceries.filter((item) =>
      item.productName
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  // STATS
  const purchasedCount =
    groceries.filter(
      (item) => item.purchased
    ).length;

  const pendingCount =
    groceries.filter(
      (item) => !item.purchased
    ).length;


  return (

    <View style={{ flex: 1 }}>

      <FlatList

        data={filteredGroceries}

        keyExtractor={(item) => item._id}

        ListHeaderComponent={

          <>

            {/* HEADING */}
            <Text style={styles.heading}>
              Grocery Manager
            </Text>


            {/* SEARCH */}
            <TextInput
              placeholder="Search Grocery Item"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />


            {/* STATS */}
            <View style={styles.statsRow}>


              <View style={styles.statsCard}>
                <Text style={styles.statsNumber}>
                  {groceries.length}
                </Text>

                <Text style={styles.statsText}>
                  Total
                </Text>
              </View>


              <View style={styles.statsCard}>
                <Text style={styles.statsNumber}>
                  {pendingCount}
                </Text>

                <Text style={styles.statsText}>
                  Pending
                </Text>
              </View>


              <View style={styles.statsCard}>
                <Text style={styles.statsNumber}>
                  {purchasedCount}
                </Text>

                <Text style={styles.statsText}>
                  Done
                </Text>
              </View>

            </View>


            {/* PRODUCT INPUT */}
            <TextInput
              placeholder="Product Name"
              value={productName}
              onChangeText={setProductName}
              style={styles.input}
            />


            {/* QUANTITY INPUT */}
            <TextInput
              placeholder="Quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.input}
            />


            {/* ADD BUTTON */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addGrocery}
            >
              <Text style={styles.addButtonText}>
                Add Grocery
              </Text>
            </TouchableOpacity>

          </>
        }


        renderItem={({ item }) => (

          <View style={styles.card}>


            {/* LEFT SIDE */}
            <View>

              <Text
                style={[
                  styles.productName,

                  item.purchased && {
                    textDecorationLine:
                      "line-through",

                    color: "gray",
                  },
                ]}
              >
                {item.productName}
              </Text>


              <Text style={styles.quantity}>
                Qty: {item.quantity}
              </Text>

            </View>


            {/* RIGHT SIDE */}
            <View style={styles.actions}>


              {/* MINUS */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  updateQuantity(
                    item._id,
                    item.quantity,
                    "decrease"
                  )
                }
              >
                <Text style={styles.buttonText}>
                  -
                </Text>
              </TouchableOpacity>


              {/* PLUS */}
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  updateQuantity(
                    item._id,
                    item.quantity,
                    "increase"
                  )
                }
              >
                <Text style={styles.buttonText}>
                  +
                </Text>
              </TouchableOpacity>


              {/* DONE BUTTON */}
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() =>
                  togglePurchased(item._id)
                }
              >
                <Text style={styles.buttonText}>
                  {item.purchased
                    ? "Undo"
                    : "Done"}
                </Text>
              </TouchableOpacity>


              {/* DELETE BUTTON */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteGrocery(item._id)
                }
              >
                <Text style={styles.buttonText}>
                  Delete
                </Text>
              </TouchableOpacity>

            </View>

          </View>
        )}


        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>
              No Grocery Items Found
            </Text>

          </View>
        }


        contentContainerStyle={{
          padding: 20,
          paddingTop: 60,
          paddingBottom: 120,
        }}
      />


      {/* BOTTOM NAV */}
      <BottomNav />

    </View>
  );
}


const styles = StyleSheet.create({

  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  statsCard: {
    backgroundColor: "white",
    width: "31%",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  statsNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  statsText: {
    marginTop: 5,
    color: "gray",
  },

  addButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 25,
  },

  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  quantity: {
    marginTop: 5,
    color: "gray",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },

  editButton: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  purchaseButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 10,
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "gray",
  },

});