import { useEffect, useState } from "react";

import BottomNav from "../components/BottomNav";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import API from "../services/api";

export default function DashboardScreen() {

  const [expenses, setExpenses] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [totalExpense, setTotalExpense] =
    useState(0);

  const monthlyBudget = 10;


  // FETCH DATA
  const fetchData = async () => {
    try {

      const expenseResponse =
        await API.get("/expense");

      const groceryResponse =
        await API.get("/grocery");

      setExpenses(expenseResponse.data);
      setGroceries(groceryResponse.data);


      // TOTAL EXPENSE
      const total =
        expenseResponse.data.reduce(
          (acc, item) =>
            acc + Number(item.amount),
          0
        );

      setTotalExpense(total);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // STATS
  const pendingItems =
    groceries.filter(
      (item) => !item.purchased
    ).length;

  const purchasedItems =
    groceries.filter(
      (item) => item.purchased
    ).length;

  const budgetPercent =
    Math.min(
      (totalExpense / monthlyBudget) * 100,
      100
    );


  return (

    <View style={{ flex: 1 }}>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* HEADER */}
        <View style={styles.header}>

          <Text style={styles.smallHeading}>
            Welcome Back 👋
          </Text>

          <Text style={styles.mainHeading}>
            Smart Grocery Tracker
          </Text>

        </View>


        {/* MAIN CARD */}
        <View style={styles.mainCard}>

          <Text style={styles.cardLabel}>
            Total Monthly Expense
          </Text>

          <Text style={styles.mainAmount}>
            ₹ {totalExpense}
          </Text>

          <Text style={styles.remainingText}>
            Remaining Budget:
            ₹ {monthlyBudget - totalExpense}
          </Text>


          {/* PROGRESS BAR */}
          <View style={styles.progressBackground}>

            <View
              style={[
                styles.progressFill,
                {
                  width: `${budgetPercent}%`,
                },
              ]}
            />

          </View>

        </View>


        {/* ANALYTICS */}
        <View style={styles.row}>


          <View style={styles.analyticsCard}>

            <Text style={styles.analyticsNumber}>
              {groceries.length}
            </Text>

            <Text style={styles.analyticsText}>
              Grocery Items
            </Text>

          </View>


          <View style={styles.analyticsCard}>

            <Text style={styles.analyticsNumber}>
              {pendingItems}
            </Text>

            <Text style={styles.analyticsText}>
              Pending
            </Text>

          </View>

        </View>


        {/* SECOND ROW */}
        <View style={styles.row}>


          <View style={styles.analyticsCard}>

            <Text style={styles.analyticsNumber}>
              {purchasedItems}
            </Text>

            <Text style={styles.analyticsText}>
              Purchased
            </Text>

          </View>


          <View style={styles.analyticsCard}>

            <Text style={styles.analyticsNumber}>
              {expenses.length}
            </Text>

            <Text style={styles.analyticsText}>
              Expenses
            </Text>

          </View>

        </View>


        {/* INSIGHT CARD */}
        <View style={styles.insightCard}>

          <Text style={styles.insightTitle}>
            Smart Insight 🧠
          </Text>

          <Text style={styles.insightText}>

            {totalExpense > monthlyBudget
              ? "You crossed your monthly budget limit."
              : "Your spending is under control this month."}

          </Text>

        </View>


        {/* RECENT EXPENSES */}
        <Text style={styles.sectionTitle}>
          Recent Expenses
        </Text>


        {expenses.length === 0 ? (

          <View style={styles.emptyCard}>

            <Text style={styles.emptyText}>
              No Expenses Added Yet
            </Text>

          </View>

        ) : (

          expenses.slice(0, 5).map((item) => (

            <View
              key={item._id}
              style={styles.activityCard}
            >

              <View>

                <Text style={styles.activityTitle}>
                  ₹ {item.amount}
                </Text>

                <Text style={styles.activityCategory}>
                  {item.category}
                </Text>

              </View>


              {item.note ? (

                <Text style={styles.note}>
                  {item.note}
                </Text>

              ) : null}

            </View>
          ))
        )}


        {/* SPACE */}
        <View style={{ height: 120 }} />

      </ScrollView>


      {/* BOTTOM NAV */}
      <BottomNav />

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 65,
    marginBottom: 10,
  },

  smallHeading: {
    fontSize: 18,
    color: "#666",
  },

  mainHeading: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 5,
    color: "#111",
  },

  mainCard: {
    backgroundColor: "#4A90E2",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 28,
    padding: 28,
    elevation: 8,
  },

  cardLabel: {
    color: "white",
    fontSize: 18,
  },

  mainAmount: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 12,
  },

  remainingText: {
    color: "white",
    marginTop: 10,
    fontSize: 15,
  },

  progressBackground: {
    height: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 20,
    marginTop: 22,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 18,
  },

  analyticsCard: {
    backgroundColor: "white",
    width: "48%",
    paddingVertical: 28,
    borderRadius: 24,
    alignItems: "center",
    elevation: 5,
  },

  analyticsNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4A90E2",
  },

  analyticsText: {
    marginTop: 8,
    color: "#666",
    fontSize: 15,
  },

  insightCard: {
    backgroundColor: "#111827",
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 24,
    padding: 24,
  },

  insightTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  insightText: {
    color: "#d1d5db",
    marginTop: 10,
    lineHeight: 22,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 18,
    color: "#111",
  },

  activityCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginBottom: 14,
    padding: 20,
    borderRadius: 20,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activityTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  activityCategory: {
    marginTop: 5,
    color: "#4A90E2",
    fontWeight: "600",
  },

  note: {
    color: "#666",
    width: 120,
    textAlign: "right",
  },

  emptyCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
  },

  emptyText: {
    color: "#666",
    fontSize: 16,
  },

});