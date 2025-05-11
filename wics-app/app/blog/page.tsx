import { redirect } from "next/navigation";

export default function BlogRedirect() {
  redirect("/blog/pg-1");
  return null; // Return null to satisfy the React component requirement
}
