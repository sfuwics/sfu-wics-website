import { redirect } from "next/navigation";

export default function PastEventsRedirect() {
  redirect("/events/past-events/pg-1");
  return null; // Return null to satisfy the React component requirement
}
