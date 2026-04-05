import { useSelector } from "react-redux";

export function useRole() {
  return useSelector((state) => state.user.role);
}
