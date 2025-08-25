import { parse } from "date-fns";

export function parseLocalDate(dateStr: string) {
  return parse(dateStr, "yyyy-MM-dd", new Date());
}