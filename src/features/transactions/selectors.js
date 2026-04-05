import { createSelector } from "@reduxjs/toolkit";
import { monthKey } from "@/utils/format";
import {
  categories as seedCategories,
  balanceTrend as seedBalanceTrend,
  categoryBreakdown as seedCategoryBreakdown,
  insights as seedInsights
} from "./mockData";

export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionStatus = (state) => state.transactions.status;
export const selectTransactionError = (state) => state.transactions.error;
export const selectFilters = (state) => state.filters;

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectFilters],
  (transactions, filters) => {
    const { search, category, type, sortBy, sortOrder } = filters;
    const filtered = transactions.filter((transaction) => {
      const searchMatch =
        search.trim() === "" ||
        transaction.category.toLowerCase().includes(search.toLowerCase()) ||
        (transaction.note || transaction.description || "").toLowerCase().includes(search.toLowerCase());

      const categoryMatch = category === "all" || transaction.category === category;
      const typeMatch = type === "all" || transaction.type === type;

      return searchMatch && categoryMatch && typeMatch;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "date") {
        const dateDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
        return sortOrder === "asc" ? dateDiff : -dateDiff;
      }
      const amountDiff = a.amount - b.amount;
      return sortOrder === "asc" ? amountDiff : -amountDiff;
    });
  }
);

export const selectSummary = createSelector([selectTransactions], (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    totalIncome,
    totalExpenses,
    totalBalance: totalIncome - totalExpenses
  };
});

export const selectCategories = createSelector([selectTransactions], (transactions) => {
  const categories = new Set([...seedCategories, ...transactions.map((t) => t.category)]);
  return Array.from(categories).sort();
});

export const selectBalanceTrend = createSelector([selectTransactions], (transactions) => {
  if (!transactions.length) return seedBalanceTrend;

  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let runningBalance = 0;

  return sorted.map((transaction) => {
    runningBalance += transaction.type === "income" ? transaction.amount : -transaction.amount;
    return {
      date: transaction.date,
      balance: runningBalance
    };
  });
});

export const selectSpendingByCategory = createSelector([selectTransactions], (transactions) => {
  if (!transactions.length) {
    return seedCategoryBreakdown.map((entry) => ({ name: entry.category, value: entry.amount }));
  }

  const expenseBuckets = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

  return Object.entries(expenseBuckets).map(([name, value]) => ({ name, value }));
});

export const selectMonthlyComparison = createSelector([selectTransactions], (transactions) => {
  const monthly = transactions.reduce((acc, transaction) => {
    const key = monthKey(transaction.date);
    if (!acc[key]) acc[key] = { month: key, income: 0, expense: 0 };
    if (transaction.type === "income") acc[key].income += transaction.amount;
    if (transaction.type === "expense") acc[key].expense += transaction.amount;
    return acc;
  }, {});

  return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month));
});

export const selectInsights = createSelector(
  [selectSpendingByCategory, selectMonthlyComparison],
  (spending, monthlyComparison) => {
    const highestCategory = spending.length
      ? [...spending].sort((a, b) => b.value - a.value)[0]
      : null;

    const latestMonth = monthlyComparison[monthlyComparison.length - 1];
    const previousMonth = monthlyComparison[monthlyComparison.length - 2];

    const trend =
      latestMonth && previousMonth
        ? latestMonth.expense > previousMonth.expense
          ? "Expenses increased from last month"
          : "Expenses decreased from last month"
        : `Top spending category this month is ${seedInsights.highestSpendingCategory}`;

    return {
      highestCategory,
      trend,
      monthlyComparison
    };
  }
);
