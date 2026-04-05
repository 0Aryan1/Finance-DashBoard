# Finance Dashboard Web App
<img width="1470" height="839" alt="Screenshot 2026-04-05 at 8 45 59 PM" src="https://github.com/user-attachments/assets/b8080320-5291-420f-a329-9e082ad85c24" />
<img width="1470" height="842" alt="Screenshot 2026-04-05 at 8 46 18 PM" src="https://github.com/user-attachments/assets/168eeec6-0767-4d2b-b0bd-bf8db6b6f654" />



A modern, responsive finance dashboard built with React, Tailwind CSS, shadcn-style UI components, Redux Toolkit, Recharts, and Lucide icons.

## Setup

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Features

- Dashboard overview cards:
  - Total Balance
  - Total Income
  - Total Expenses
- Interactive charts:
  - Balance trend (time-based line chart)
  - Spending breakdown (category-based pie chart)
- Transactions module:
  - Search transactions
  - Filter by category/type
  - Sort by date/amount (asc/desc)
  - Add/Edit/Delete transactions (Admin only)
- Role-based UI simulation:
  - Viewer: read-only
  - Admin: full CRUD
- Insights section:
  - Highest spending category
  - Monthly income vs expense snapshot
  - Expense trend insight
- UX coverage:
  - Loading state (mock async load)
  - Empty/no-results states
  - Responsive layout (mobile + desktop)
- Optional enhancements included:
  - Dark mode toggle
  - Local storage persistence
  - Subtle card animations (Framer Motion)

## Architecture

State is managed with Redux Toolkit slices:

- `transactionsSlice`:
  - transaction records
  - async mock fetch with `createAsyncThunk`
  - CRUD reducers
- `filterSlice`:
  - search/filter/sort controls
- `userSlice`:
  - role management (`viewer` / `admin`)
  - theme (`light` / `dark`)

Derived data is handled using memoized selectors:

- Summary totals
- Filtered and sorted transactions
- Balance trend data
- Spending by category
- Insights and monthly comparisons

## Folder Structure

```text
src/
  components/
    dashboard/
    insights/
    layout/
    transactions/
    ui/
  features/
    filters/
    transactions/
    user/
  hooks/
  pages/
  store/
  utils/
```

## Notes

- Uses static/mock data only (no backend).
- State persists in `localStorage` for a real-app feel.
