export const dynamic = "force-dynamic";
import { loadPublished } from "@/lib/submissions";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const published = await loadPublished().catch(() => []);

  const latestArticles = published.slice(0, 3).map((s) => ({
    id: s.id,
    title: s.title,
    fullName: s.fullName,
    journalName: s.journalName,
    publishedAt: s.publishedAt || s.createdAt,
    articleSlug: s.articleSlug,
  }));

  return <HomeClient latestArticles={latestArticles} />;
}
