import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils/format";

export function BalanceTrendChart({ data }) {
  const chartData = data.map((point) => ({
    ...point,
    label: new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balance Trend</CardTitle>
        <CardDescription>Running account balance over time</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">No trend data available yet.</p>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Balance"]}
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.date ? formatDate(payload[0].payload.date) : ""
                  }
                />
                <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
