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

export default function ExpenseScreen() {

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");


  // FETCH EXPENSES
  const fetchExpenses = async () => {
    try {

      const response = await API.get("/expense");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }
  };


  // ADD EXPENSE
  const addExpense = async () => {

    if (!amount || !category) {
      return Alert.alert(
        "Please fill required fields"
      );
    }

    try {

      await API.post("/expense/add", {
        amount,
        category,
        note,
      });

      setAmount("");
      setCategory("");
      setNote("");

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }
  };


  // DELETE EXPENSE
  const deleteExpense = async (id) => {
    try {

      await API.delete(`/expense/${id}`);

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchExpenses();
  }, []);


  // SEARCH FILTER
  const filteredExpenses =
    expenses.filter((item) =>
      item.category
        .toLowerCase()
        .includes(search.toLowerCase())
    );


  // TOTAL EXPENSE
  const totalExpense =
    expenses.reduce(
      (acc, item) =>
        acc + Number(item.amount),
      0
    );


  // HIGHEST EXPENSE
  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((item) =>
            Number(item.amount)
          )
        )
      : 0;


  return (

    <View style={{ flex: 1 }}>

      <FlatList

        data={filteredExpenses}

        keyExtractor={(item) => item._id}

        showsVerticalScrollIndicator={false}

        ListHeaderComponent={

          <>

            {/* HEADING */}
            <Text style={styles.heading}>
              Expense Manager
            </Text>


            {/* SEARCH */}
            <TextInput
              placeholder="Search Category"
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />


            {/* ANALYTICS */}
            <View style={styles.analyticsRow}>


              {/* TOTAL */}
              <View style={styles.analyticsCard}>

                <Text style={styles.analyticsNumber}>
                  ₹ {totalExpense}
                </Text>

                <Text style={styles.analyticsText}>
                  Total Expense
                </Text>

              </View>


              {/* HIGHEST */}
              <View style={styles.analyticsCard}>

                <Text style={styles.analyticsNumber}>
                  ₹ {highestExpense}
                </Text>

                <Text style={styles.analyticsText}>
                  Highest Expense
                </Text>

              </View>

            </View>


            {/* AMOUNT */}
            <TextInput
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              style={styles.input}
            />


            {/* CATEGORY */}
            <TextInput
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
              style={styles.input}
            />


            {/* NOTE */}
            <TextInput
              placeholder="Note"
              value={note}
              onChangeText={setNote}
              style={styles.input}
            />


            {/* ADD BUTTON */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={addExpense}
            >
              <Text style={styles.addButtonText}>
                Add Expense
              </Text>
            </TouchableOpacity>


            {/* RECENT */}
            <Text style={styles.sectionTitle}>
              Recent Expenses
            </Text>

          </>
        }


        renderItem={({ item }) => (

          <View style={styles.card}>


            {/* LEFT */}
            <View>

              <Text style={styles.amount}>
                ₹ {item.amount}
              </Text>

              <Text style={styles.category}>
                {item.category}
              </Text>

              {item.note ? (
                <Text style={styles.note}>
                  {item.note}
                </Text>
              ) : null}

            </View>


            {/* DELETE */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() =>
                deleteExpense(item._id)
              }
            >
              <Text style={styles.buttonText}>
                Delete
              </Text>
            </TouchableOpacity>

          </View>
        )}


        ListEmptyComponent={

          <View style={styles.emptyContainer}>

            <Text style={styles.emptyText}>
              No Expenses Found
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
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#111",
  },

  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  analyticsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  analyticsCard: {
    backgroundColor: "#4A90E2",
    width: "48%",
    padding: 22,
    borderRadius: 22,
    elevation: 5,
  },

  analyticsNumber: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  analyticsText: {
    color: "white",
    marginTop: 8,
    opacity: 0.9,
  },

  addButton: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 30,
    elevation: 5,
  },

  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#111",
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 22,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  amount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },

  category: {
    marginTop: 6,
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "600",
  },

  note: {
    marginTop: 6,
    color: "#666",
    width: 170,
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    color: "gray",
  },

});