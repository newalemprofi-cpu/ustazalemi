import type { Metadata } from "next";
import ContactsClient from "./ContactsClient";

export const metadata: Metadata = {
  title: "Байланыс — USTAZALEMI",
  description: "USTAZALEMI платформасымен байланыс",
};

export default function ContactsPage() {
  return <ContactsClient />;
}
