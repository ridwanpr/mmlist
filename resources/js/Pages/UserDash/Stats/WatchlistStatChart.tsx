import { BarChart, Bar, Rectangle, XAxis, YAxis, Tooltip } from "recharts";
import type { ComponentProps } from "react";
import { RechartsDevtools } from "@recharts/devtools";

type WatchlistStatChartProps = {
  watchlistStat: App.DTOs.WatchlistStatData;
};

interface CustomBarProps extends ComponentProps<typeof Rectangle> {
  index: number;
}

const WatchlistStatChart = ({ watchlistStat }: WatchlistStatChartProps) => {
  const data = [
    {
      name: "Planned",
      count: watchlistStat.planned,
      fill: "var(--color-accent-gold)",
    },
    {
      name: "Watching",
      count: watchlistStat.watching,
      fill: "var(--color-primary)",
    },
    {
      name: "Completed",
      count: watchlistStat.completed,
      fill: "var(--color-success)",
    },
    {
      name: "On Hold",
      count: watchlistStat.on_hold,
      fill: "var(--color-severity-mild)",
    },
    {
      name: "Dropped",
      count: watchlistStat.dropped,
      fill: "var(--color-accent-red)",
    },
  ];

  return (
    <div className="bg-surface border-border hover:border-text-muted/30 w-full max-w-112.5 rounded-lg border p-3 shadow-sm transition-all">
      <BarChart
        responsive
        data={data}
        style={{ width: "100%", height: "180px" }}
        margin={{ top: 10, right: 5, left: -25, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          stroke="var(--color-text-muted)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          dy={8}
        />
        <YAxis
          stroke="var(--color-text-muted)"
          fontSize={11}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          cursor={{ fill: "var(--color-surface-alt)", opacity: 0.3 }}
          contentStyle={{
            backgroundColor: "var(--color-surface)",
            borderColor: "var(--color-border)",
            borderRadius: "0.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
          }}
          labelStyle={{ color: "var(--color-text)" }}
          itemStyle={{ color: "var(--color-text)" }}
        />
        <Bar
          dataKey="count"
          shape={(props: CustomBarProps) => {
            const itemColor = data[props.index]?.fill || "var(--color-primary)";
            return (
              <Rectangle {...props} fill={itemColor} radius={[4, 4, 0, 0]} />
            );
          }}
        />
        <RechartsDevtools />
      </BarChart>
    </div>
  );
};

export default WatchlistStatChart;
