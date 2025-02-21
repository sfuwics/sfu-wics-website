import { redirect } from "next/navigation";

export default function NewsroomRedirect() {
  redirect("/newsroom/pg-1");
  return null; // Return null to satisfy the React component requirement
}
