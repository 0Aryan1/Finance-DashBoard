import { useDispatch, useSelector } from "react-redux";
import { Moon, Sun, UserCog } from "lucide-react";
import { setRole, toggleTheme } from "@/features/user/userSlice";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function AppShell({ children }) {
  const dispatch = useDispatch();
  const { role, theme, name } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Finance Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Track, analyze, and optimize financial activity for {name}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="min-w-[140px]">
              <Select value={role} onValueChange={(value) => dispatch(setRole(value))}>
                <SelectTrigger>
                  <div className="flex items-center gap-2">
                    <UserCog className="h-4 w-4" />
                    <SelectValue placeholder="Role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="icon" onClick={() => dispatch(toggleTheme())}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
