import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addTransaction, deleteTransaction, updateTransaction } from "@/features/transactions/transactionsSlice";
import { selectFilteredTransactions, selectTransactionStatus } from "@/features/transactions/selectors";
import { TransactionsFilters } from "./TransactionsFilters";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionModal } from "./TransactionModal";

export function TransactionsSection({ isAdmin }) {
  const dispatch = useDispatch();
  const transactions = useSelector(selectFilteredTransactions);
  const status = useSelector(selectTransactionStatus);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loading = useMemo(() => status === "loading", [status]);

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (transaction) => {
    setEditing(transaction);
    setModalOpen(true);
  };

  const handleSubmit = (payload) => {
    if (editing) {
      dispatch(updateTransaction({ ...payload, id: editing.id }));
      return;
    }
    dispatch(addTransaction(payload));
  };

  return (
    <Card>
      <CardHeader className="gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Search, filter, sort, and manage your activity</CardDescription>
        </div>

        {isAdmin && (
          <Button onClick={handleAdd} className="sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <TransactionsFilters />

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : (
          <TransactionsTable
            transactions={transactions}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDelete={(id) => dispatch(deleteTransaction(id))}
          />
        )}
      </CardContent>

      {isAdmin && (
        <TransactionModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          initialData={editing}
          onSubmit={handleSubmit}
        />
      )}
    </Card>
  );
}
