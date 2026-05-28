import React from "react";

type TopTriggerVoteChartProps = {
  triggerVoteActivity: App.DTOs.TriggerVoteActivityData;
};

const TopTriggerVoteChart = ({
  triggerVoteActivity,
}: TopTriggerVoteChartProps) => {
  // Structural padding alignment (Row 0 must always be Sunday)
  const firstRealDate = triggerVoteActivity.days[0]
    ? new Date(triggerVoteActivity.days[0].date)
    : new Date();

  const frontPaddingLength = firstRealDate.getDay();
  const paddedFrontDays = Array.from({ length: frontPaddingLength }, () => ({
    date: "",
    count: -1,
  }));

  const allGridNodes = [...paddedFrontDays, ...triggerVoteActivity.days];
  const totalColumns = Math.ceil(allGridNodes.length / 7);

  const monthLabels: (string | null)[] = [];
  let trackingMonth = "";
  let lastLabelColIndex = -4; // Enforces a buffer gap at the start of the grid

  for (let col = 0; col < totalColumns; col++) {
    const startOfColumnIndex = col * 7;
    const activeDay = allGridNodes
      .slice(startOfColumnIndex, startOfColumnIndex + 7)
      .find((node) => node.count !== -1);

    if (activeDay) {
      const currentMonthName = new Date(activeDay.date).toLocaleString(
        "en-US",
        {
          month: "short",
        },
      );

      // Only print a label if the month changes AND at least 3 empty columns exist for spacing
      if (currentMonthName !== trackingMonth && col - lastLabelColIndex >= 3) {
        monthLabels.push(currentMonthName);
        trackingMonth = currentMonthName;
        lastLabelColIndex = col;
      } else {
        if (currentMonthName !== trackingMonth) {
          trackingMonth = currentMonthName; // Keep internal tracker up to date
        }
        monthLabels.push(null);
      }
    } else {
      monthLabels.push(null);
    }
  }

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-border/30 dark:bg-border/15";
    if (count === 1) return "bg-primary/20";
    if (count === 2) return "bg-primary/45";
    if (count === 3) return "bg-primary/75";
    return "bg-primary";
  };

  return (
    <div className="bg-surface border-border hover:border-text-muted/30 w-full rounded-lg border p-4 shadow-sm transition-all">
      <div className="flex flex-col gap-3">
        {/* Card Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-text font-sans text-sm font-bold">
              Contribution Activity
            </h3>
            <p className="text-text-muted font-sans text-xs">
              Trigger tracking and voting history
            </p>
          </div>
          <span className="text-text-muted bg-surface-alt rounded px-2 py-1 font-sans text-xs font-medium">
            Past 12 Months
          </span>
        </div>

        {/* Scroll Containment System */}
        <div className="scrollbar-thin scrollbar-thumb-border/50 w-full overflow-x-auto pb-2">
          <div className="text-text flex min-w-195 p-1 select-none">
            <div className="text-text-muted/70 flex flex-col pr-2 font-sans text-[9px] font-semibold tracking-wider uppercase select-none">
              {/* Month row alignment spacer */}
              <div className="mb-1 h-4" />

              <div className="grid grid-rows-7 gap-1 text-right">
                <span className="flex h-2.5 items-center justify-end">Sun</span>
                <span className="flex h-2.5 items-center justify-end">Mon</span>
                <span className="flex h-2.5 items-center justify-end">Tue</span>
                <span className="flex h-2.5 items-center justify-end">Wed</span>
                <span className="flex h-2.5 items-center justify-end">Thu</span>
                <span className="flex h-2.5 items-center justify-end">Fri</span>
                <span className="flex h-2.5 items-center justify-end">Sat</span>
              </div>
            </div>

            {/* Right Side: Main Calendar Interface */}
            <div className="flex-1">
              {/* Month Track */}
              <div className="text-text-muted mb-1 grid h-4 grid-flow-col gap-1 font-sans text-[10px]">
                {monthLabels.map((month, colIndex) => (
                  <div key={colIndex} className="relative w-2.5 text-left">
                    {month && (
                      <span className="absolute bottom-0 left-0 font-medium whitespace-nowrap">
                        {month}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Heatmap Matrix */}
              <div className="grid grid-flow-col grid-rows-7 gap-1">
                {allGridNodes.map((day, index) => {
                  if (day.count === -1) {
                    return (
                      <div
                        key={`pad-${index}`}
                        className="pointer-events-none h-2.5 w-2.5 opacity-0"
                      />
                    );
                  }

                  return (
                    <div
                      key={day.date + index}
                      className={`h-2.5 w-2.5 rounded-xs transition-colors duration-200 ${getColorClass(
                        day.count,
                      )}`}
                      title={`${day.date}: ${day.count} contributions`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend Map */}
        <div className="text-text-muted mt-1 flex items-center justify-end gap-1.5 font-sans text-[11px]">
          <span>Less</span>
          <div className="bg-border/30 dark:bg-border/15 h-2.5 w-2.5 rounded-xs"></div>
          <div className="bg-primary/20 h-2.5 w-2.5 rounded-xs"></div>
          <div className="bg-primary/45 h-2.5 w-2.5 rounded-xs"></div>
          <div className="bg-primary/75 h-2.5 w-2.5 rounded-xs"></div>
          <div className="bg-primary h-2.5 w-2.5 rounded-xs"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default TopTriggerVoteChart;
