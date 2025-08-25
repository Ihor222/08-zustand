import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesFilterPage({ params }: PageProps) {
  const { slug } = await params;

  const rawTag: "All" | NoteTag = slug?.[0] ? (slug[0] as NoteTag) : "All";

  const effectiveTag: NoteTag | undefined =
    rawTag === "All" ? undefined : rawTag;

  const pageStart = 1;
  const searchTerm = "";

  const qc = new QueryClient();

  await qc.prefetchQuery({
    queryKey: ["notes", { page: pageStart, search: searchTerm, tag: rawTag }],
    queryFn: () => fetchNotes(pageStart, searchTerm, effectiveTag),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient
        initialPage={pageStart}
        initialQuery={searchTerm}
        initialTag={rawTag}
      />
    </HydrationBoundary>
  );
}
