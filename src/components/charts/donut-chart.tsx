"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface DonutChartProps {
  expences: { category: string; amount: number }[];
}

export function DonutChart({ expences }: DonutChartProps) {
  const [mounted, setMounted] = useState(false);
  const defaultOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "22px",
              fontWeight: 600,
            },
            total: {
              show: true,
              showAlways: true,
              label: "Total",
              fontSize: "22px",
              fontWeight: 600,
              formatter: function (w: any) {
                const sum = w?.globals?.seriesTotals?.reduce(
                  (a: number, b: number) => {
                    return a + b;
                  },
                  0
                );
                return new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(sum);
              },
            },
          },
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number, {}) {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value);
        },
      },
    },
  };
  const [chartData, setChartData] = useState<{
    series: number[];
    options: {};
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
      // Only positive values and obly two decimal places
      series: expences
        .map((expence) => expence.amount)
        .map((amount) => Math.abs(amount))
        .map((amount) => Number(amount.toFixed(2))),
      options: {
        ...chartData.options,
        labels: [...expences.map((expence) => expence.category)],
      },
    };
    setChartData(newChartDataOptions);
  }, [expences]);

  if (!mounted) {
    return null;
  }

  return (
    <Chart options={chartData.options} series={chartData.series} type="donut" />
  );
}
