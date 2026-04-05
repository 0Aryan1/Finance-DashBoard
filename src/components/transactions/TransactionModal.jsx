import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialForm = {
  date: "",
  amount: "",
  category: "",
  type: "expense",
  note: ""
};

export function TransactionModal({ open, onOpenChange, onSubmit, initialData }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        note: initialData.note || initialData.description || "",
        amount: String(initialData.amount)
      });
    } else {
      setForm(initialForm);
    }
  }, [initialData, open]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount)
    };

    onSubmit(payload);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            required
          />

          <Input
            type="number"
            min="1"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm((prev) => ({ ...prev, amount: e.target.value }))}
            required
          />

          <Input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
            required
          />

          <select
            className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            value={form.type}
            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <Input
            placeholder="Note"
            value={form.note}
            onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            required
          />

          <Button className="w-full" type="submit">
            {initialData ? "Save Changes" : "Add Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
