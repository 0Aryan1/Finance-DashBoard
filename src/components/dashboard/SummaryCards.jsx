import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/format";

const cardConfig = [
  { key: "totalBalance", label: "Total Balance", icon: Wallet },
  { key: "totalIncome", label: "Total Income", icon: ArrowUpCircle },
  { key: "totalExpenses", label: "Total Expenses", icon: ArrowDownCircle }
];

export function SummaryCards({ summary }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cardConfig.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            key={item.key}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                  {item.label}
                  <Icon className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold tracking-tight">{formatCurrency(summary[item.key])}</p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
