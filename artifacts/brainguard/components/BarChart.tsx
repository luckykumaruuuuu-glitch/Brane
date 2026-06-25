import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BarChartProps {
  data: number[];
  labels?: string[];
  height?: number;
}

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function BarChart({ data, labels = DAY_LABELS, height = 120 }: BarChartProps) {
  const max = Math.max(...data, 1);

  return (
    <View style={styles.container}>
      <View style={[styles.bars, { height }]}>
        {data.map((val, i) => {
          const barHeight = Math.max(4, (val / max) * height);
          const isMax = val === max;
          return (
            <View key={i} style={styles.barWrapper}>
              <View style={[styles.bar, { height: barHeight, backgroundColor: isMax ? "#D4AF37" : "#2A2A2A" }]} />
            </View>
          );
        })}
      </View>
      <View style={styles.labels}>
        {labels.map((l, i) => (
          <View key={i} style={styles.labelWrapper}>
            <Text style={styles.label}>{l}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  bars: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 6,
    paddingHorizontal: 4,
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  bar: {
    width: "100%",
    borderRadius: 6,
  },
  labels: {
    flexDirection: "row",
    marginTop: 8,
    paddingHorizontal: 4,
  },
  labelWrapper: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    color: "#555555",
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
});
