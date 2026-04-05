import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  setSearch,
  setCategory,
  setType,
  setSortBy,
  setSortOrder,
  resetFilters
} from "@/features/filters/filterSlice";
import { selectCategories } from "@/features/transactions/selectors";

export function TransactionsFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);
  const categories = useSelector(selectCategories);
  const [searchInput, setSearchInput] = useState(filters.search);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== filters.search) {
        dispatch(setSearch(searchInput));
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchInput, filters.search, dispatch]);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
      <div className="relative lg:col-span-2">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search category or note"
        />
      </div>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={filters.category}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={filters.type}
        onChange={(e) => dispatch(setType(e.target.value))}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={filters.sortBy}
        onChange={(e) => dispatch(setSortBy(e.target.value))}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      <div className="flex gap-2">
        <select
          className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
          value={filters.sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value))}
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
        <Button variant="outline" size="icon" onClick={() => dispatch(resetFilters())}>
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
