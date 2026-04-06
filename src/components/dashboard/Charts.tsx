import React from 'react';
import ReactECharts from 'echarts-for-react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as echarts from 'echarts';
import 'echarts-gl';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/format';

export function BalanceTrendChart() {
  const { balanceTrend, state } = useApp();
  const isDark = state.darkMode;

  const data = balanceTrend.map((point, index) => {
    return [index, 0, point.balance];
  });

  const dates = balanceTrend.map(point => formatDate(point.date));

  const option = {
    tooltip: {
      formatter: (params: any) => `${dates[params.value[0]]}: ${formatCurrency(params.value[2])}`
    },
    visualMap: {
      show: false,
      min: 0,
      max: Math.max(...balanceTrend.map(p => p.balance)),
      inRange: {
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      }
    },
    xAxis3D: {
      type: 'category',
      data: dates,
      name: '',
      axisLabel: {
        textStyle: {
          color: isDark ? '#fff' : '#333'
        }
      },
      nameTextStyle: {
        color: isDark ? '#fff' : '#333'
      }
    },
    yAxis3D: {
      type: 'category',
      data: ['Balance'],
      name: '',
      axisLabel: {
        textStyle: {
          color: isDark ? '#fff' : '#333'
        }
      },
      nameTextStyle: {
        color: isDark ? '#fff' : '#333'
      }
    },
    zAxis3D: {
      type: 'value',
      name: 'Amount',
      axisLabel: {
        textStyle: {
          color: isDark ? '#fff' : '#333'
        }
      },
      nameTextStyle: {
        color: isDark ? '#fff' : '#333'
      }
    },
    grid3D: {
      boxWidth: 200,
      boxDepth: 20,
      viewControl: {
        autoRotate: true,
        autoRotateSpeed: 10,
        distance: 250,
        alpha: 20,
        beta: 40
      },
      light: {
        main: {
          intensity: 1.2,
          shadow: true
        },
        ambient: {
          intensity: 0.3
        }
      }
    },
    series: [{
      type: 'bar3D',
      data: data.map(function (item) {
        return {
          value: [item[0], item[1], item[2]],
        }
      }),
      shading: 'realistic',
      label: {
        show: false,
        textStyle: {
          fontSize: 16,
          borderWidth: 1
        }
      },
      itemStyle: {
        opacity: 0.8
      },
      emphasis: {
        label: {
          textStyle: {
            fontSize: 20,
            color: '#900'
          }
        },
        itemStyle: {
          color: '#900'
        }
      }
    }]
  };

  return (
    <Card delay={0.2} className="glass-card">
      <CardHeader>
        <CardTitle>Balance Trend (3D)</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
      </CardContent>
    </Card>
  );
}

export function CategorySpendingChart() {
  const { categorySpending, state } = useApp();

  const isDark = state.darkMode;

  const data = categorySpending.map(cat => ({
    name: cat.category,
    value: cat.amount
  }));

  const showLabels = data.length > 1;

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => `${params.name}: ${formatCurrency(params.value)} (${params.percent}%)`
    },
    legend: {
      top: 'bottom',
      textStyle: {
          color: isDark ? '#fff' : '#333'
      }
    },
    series: [
      {
        name: 'Spending',
        type: 'pie',
        radius: ['20%', '80%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        label: {
          show: showLabels,
          position: 'outside',
          formatter: '{b}: {d}%',
          color: isDark ? '#fff' : '#333'
        },
        labelLine: {
          show: showLabels
        },
        data: data.sort((a, b) => a.value - b.value)
      }
    ]
  };

  return (
    <Card delay={0.3} className="glass-card">
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
      </CardContent>
    </Card>
  );
}

export function MonthlyComparisonChart() {
  const { financialSummary, state } = useApp();
  const isDark = state.darkMode;

  // A 3D Bar Chart for Monthly Comparison (Income vs Expenses)
  const option = {
    tooltip: {
        formatter: (params: any) => `${params.value[0]}: ${formatCurrency(params.value[2])}`
    },
    xAxis3D: {
        type: 'category',
        data: ['Income', 'Expenses'],
        name: '',
        axisLabel: {
            textStyle: {
                color: isDark ? '#fff' : '#333'
            }
        },
        nameTextStyle: {
            color: isDark ? '#fff' : '#333'
        }
    },
    yAxis3D: {
        type: 'category',
        data: ['Current Month'],
        name: '',
        axisLabel: {
            textStyle: {
                color: isDark ? '#fff' : '#333'
            }
        },
        nameTextStyle: {
            color: isDark ? '#fff' : '#333'
        }
    },
    zAxis3D: {
        type: 'value',
        name: '',
        axisLabel: {
            textStyle: {
                color: isDark ? '#fff' : '#333'
            }
        },
        nameTextStyle: {
            color: isDark ? '#fff' : '#333'
        }
    },
    grid3D: {
        viewControl: {
            autoRotate: true,
            distance: 200,
            beta: 10,
            alpha: 30
        },
        light: {
            main: { shadow: true, intensity: 1.5 },
            ambient: { intensity: 0.5 }
        }
    },
    series: [{
        type: 'bar3D',
        data: [
            { value: ['Income', 'Current Month', financialSummary.monthlyIncome], itemStyle: { color: '#10b981' } },
            { value: ['Expenses', 'Current Month', financialSummary.monthlyExpenses], itemStyle: { color: '#ef4444' } }
        ],
        shading: 'lambert',
        label: {
            show: false,
        }
    }]
  };

  return (
    <Card delay={0.4} className="glass-card">
      <CardHeader>
        <CardTitle>Monthly Overview (3D)</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />
      </CardContent>
    </Card>
  );
}
