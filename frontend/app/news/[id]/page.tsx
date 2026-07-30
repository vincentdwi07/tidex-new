import { use } from "react";
import NewsDetail from "@/features/User/news/news-detail";

export default function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return <NewsDetail id={Number(id)} />;
}
