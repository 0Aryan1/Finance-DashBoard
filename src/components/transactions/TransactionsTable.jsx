import { ArrowDownUp, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/utils/format";

export function TransactionsTable({ transactions, isAdmin, onEdit, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center">
        <ArrowDownUp className="mx-auto h-7 w-7 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">No transactions match the active filters.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Note</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {isAdmin && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>
              <Badge variant={transaction.type === "income" ? "success" : "danger"}>
                {transaction.type}
              </Badge>
            </TableCell>
            <TableCell>{transaction.note || transaction.description}</TableCell>
            <TableCell className="text-right font-medium">{formatCurrency(transaction.amount)}</TableCell>
            {isAdmin && (
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => onEdit(transaction)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => onDelete(transaction.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
