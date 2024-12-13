"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AreaChartProps {
  expences: { [month: string]: number };
  income: { [month: string]: number };
}

export function AreaChart({ expences, income }: AreaChartProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  const defaultOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      theme: theme === "dark" ? "dark" : "light",
    },
    xaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: theme === "dark" ? "#fff" : "#000",
        },
      },
    },
    legend: {
      labels: {
        colors: theme === "dark" ? "#fff" : "#000",
      },
    },
  };

  const [chartData, setChartData] = useState<{
    series: { name: string; data: { x: string; y: number }[] }[];
    options: ApexCharts.ApexOptions | undefined;
  }>({
    series: [],
    options: defaultOptions,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const newChartDataOptions = {
      ...chartData,
      options: {
        ...chartData.options,
        tooltip: {
          enabled: true,
          theme: theme === "dark" ? "dark" : "light",
        },
        xaxis: {
          labels: {
            style: {
              colors: theme === "dark" ? "#fff" : "#000",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: theme === "dark" ? "#fff" : "#000",
            },
          },
        },
        legend: {
          labels: {
            colors: theme === "dark" ? "#fff" : "#000",
          },
        },
      },
    };
    setChartData(newChartDataOptions);
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const incomeSet = Object.entries(income).map(([month, amount]) => ({
      x: month,
      y: Number(Math.abs(amount / 1000).toFixed(2)),
    }));

    const expencesSet = Object.entries(expences).map(([month, amount]) => ({
      x: month,
      y: Number(Math.abs(amount / 1000).toFixed(2)),
    }));

    setChartData({
      ...chartData,
      options: {
        ...chartData.options,
      },
      series: [
        {
          name: "Income",
          data: incomeSet,
        },
        {
          name: "Expence",
          data: expencesSet,
        },
      ],
    });
  }, [expences, income]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) {
    return null;
  }

  return (
    <Chart
      options={chartData.options}
      height={350}
      series={chartData.series}
      type="area"
    />
  );
}
