import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { fetchTransactions } from "@/features/transactions/transactionsSlice";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);
  const transactionCount = useSelector((state) => state.transactions.items.length);

  useEffect(() => {
    // Avoid overwriting persisted localStorage data on refresh.
    if (transactionCount === 0) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, transactionCount]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}

export default App;
