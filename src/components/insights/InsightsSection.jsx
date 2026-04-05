import { useSelector } from "react-redux";
import { TrendingUp, CircleAlert, WalletCards } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { selectInsights } from "@/features/transactions/selectors";
import { formatCurrency } from "@/utils/format";

export function InsightsSection() {
  const { highestCategory, trend, monthlyComparison } = useSelector(selectInsights);
  const latest = monthlyComparison[monthlyComparison.length - 1];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <WalletCards className="h-4 w-4" /> Highest Spending Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          {highestCategory ? (
            <p className="text-sm">
              {highestCategory.name}: <span className="font-semibold">{formatCurrency(highestCategory.value)}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No expense transactions yet.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4" /> Monthly Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          {latest ? (
            <p className="text-sm">
              Income: <span className="font-semibold">{formatCurrency(latest.income)}</span>
              <br />
              Expense: <span className="font-semibold">{formatCurrency(latest.expense)}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">No monthly data available.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CircleAlert className="h-4 w-4" /> Insight
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{trend}</p>
        </CardContent>
      </Card>
    </div>
  );
}
