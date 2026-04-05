import { useSelector } from "react-redux";
import {
  selectBalanceTrend,
  selectSpendingByCategory,
  selectSummary
} from "@/features/transactions/selectors";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceTrendChart } from "@/components/dashboard/BalanceTrendChart";
import { SpendingBreakdownChart } from "@/components/dashboard/SpendingBreakdownChart";
import { TransactionsSection } from "@/components/transactions/TransactionsSection";
import { InsightsSection } from "@/components/insights/InsightsSection";

export function DashboardPage() {
  const summary = useSelector(selectSummary);
  const trendData = useSelector(selectBalanceTrend);
  const categoryData = useSelector(selectSpendingByCategory);
  const isAdmin = useSelector((state) => state.user.role === "admin");

  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <div className="grid gap-4 lg:grid-cols-2">
        <BalanceTrendChart data={trendData} />
        <SpendingBreakdownChart data={categoryData} />
      </div>

      <TransactionsSection isAdmin={isAdmin} />
      <InsightsSection />
    </div>
  );
}
