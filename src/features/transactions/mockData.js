export const users = {
  currentUser: {
    id: "u1",
    name: "Aryan Agrawal",
    role: "admin"
  }
};

export const transactions = [
  {
    id: "t1",
    date: "2026-04-01",
    amount: 50000,
    category: "Salary",
    type: "income",
    note: "Monthly salary"
  },
  {
    id: "t2",
    date: "2026-04-02",
    amount: 2000,
    category: "Food",
    type: "expense",
    note: "Dining out"
  },
  {
    id: "t3",
    date: "2026-04-03",
    amount: 1500,
    category: "Transport",
    type: "expense",
    note: "Cab fares"
  },
  {
    id: "t4",
    date: "2026-04-04",
    amount: 8000,
    category: "Freelance",
    type: "income",
    note: "Client project"
  },
  {
    id: "t5",
    date: "2026-04-05",
    amount: 3000,
    category: "Shopping",
    type: "expense",
    note: "Clothes"
  },
  {
    id: "t6",
    date: "2026-04-06",
    amount: 1200,
    category: "Food",
    type: "expense",
    note: "Groceries"
  },
  {
    id: "t7",
    date: "2026-04-07",
    amount: 2500,
    category: "Entertainment",
    type: "expense",
    note: "Movies"
  },
  {
    id: "t8",
    date: "2026-04-08",
    amount: 10000,
    category: "Investment",
    type: "expense",
    note: "Stocks"
  },
  {
    id: "t9",
    date: "2026-04-09",
    amount: 6000,
    category: "Freelance",
    type: "income",
    note: "Side project"
  },
  {
    id: "t10",
    date: "2026-04-10",
    amount: 1800,
    category: "Bills",
    type: "expense",
    note: "Electricity"
  }
];

export const categories = [
  "Salary",
  "Freelance",
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Investment",
  "Bills"
];

export const filters = {
  search: "",
  category: "all",
  type: "all",
  sortBy: "date",
  sortOrder: "desc"
};

export const summary = {
  totalIncome: 64000,
  totalExpense: 21500,
  balance: 42500
};

export const balanceTrend = [
  { date: "2026-04-01", balance: 50000 },
  { date: "2026-04-02", balance: 48000 },
  { date: "2026-04-03", balance: 46500 },
  { date: "2026-04-04", balance: 54500 },
  { date: "2026-04-05", balance: 51500 },
  { date: "2026-04-06", balance: 50300 },
  { date: "2026-04-07", balance: 47800 },
  { date: "2026-04-08", balance: 37800 },
  { date: "2026-04-09", balance: 43800 },
  { date: "2026-04-10", balance: 42000 }
];

export const categoryBreakdown = [
  { category: "Food", amount: 3200 },
  { category: "Transport", amount: 1500 },
  { category: "Shopping", amount: 3000 },
  { category: "Entertainment", amount: 2500 },
  { category: "Investment", amount: 10000 },
  { category: "Bills", amount: 1800 }
];

export const insights = {
  highestSpendingCategory: "Investment",
  monthlyComparison: {
    income: 64000,
    expense: 21500
  }
};

export function fetchTransactionsMock() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(transactions), 700);
  });
}
