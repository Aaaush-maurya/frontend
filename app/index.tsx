import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://backend-90l2.onrender.com/api/data")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.error("Error fetching data", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // Every 10 sec

    return () => clearInterval(interval);
  }, []);
  

  if (!data) return <Text style={{ margin: 20 }}>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Current Value</Text>
        <Text style={styles.currentValue}>
          ₹ {data.currentValue.toLocaleString()}
        </Text>
        <Text style={styles.returns}>
          Total Returns{" "}
          <Text style={styles.green}>
            ↑ ₹ {data.totalReturns.toLocaleString()} (+{data.returnPercentage}%)
          </Text>
        </Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Invested</Text>
          <Text style={styles.summaryValue}>
            ₹ {data.invested.toLocaleString()}
          </Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>XIRR</Text>
          <Text style={styles.summaryValue}>{data.xirr}%</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>1 Day Return</Text>
          <Text style={styles.summaryValue}>
            ₹ {data.oneDayReturn.toLocaleString()} ({data.oneDayChange}%)
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.investButton}>
        <Text style={styles.investText}>+ Invest more</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loanButton}>
        <Text style={styles.loanText}>Get loan against your investments</Text>
      </TouchableOpacity>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionBox}>
          <Text style={styles.actionLabel}>📊 Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBox}>
          <Text style={styles.actionLabel}>🔄 Redeem</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBox}>
          <Text style={styles.actionLabel}>📁 Transactions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#7B1FA2",
    paddingVertical: 24,
    borderRadius: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
  },
  currentValue: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 8,
  },
  returns: {
    color: "white",
    fontSize: 14,
  },
  green: {
    color: "#00E676",
    fontWeight: "bold",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: "#E1BEE7",
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#555",
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  investButton: {
    backgroundColor: "#00C853",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  investText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loanButton: {
    backgroundColor: "#7C4DFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  loanText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionBox: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D1C4E9",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
