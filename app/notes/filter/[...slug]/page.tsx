import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";
import type { Metadata } from "next";

type PageProps = {
  params: { slug?: string[] };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const slug = params?.slug?.[0];
  const filter = slug ? slug : "All";

  const title = `Notes filtered by "${filter}" | NoteHub`;
  const description = `Browse notes filtered by "${filter}". Discover only the content that matches your chosen filter.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.vercel.app/notes/filter/${filter}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes filtered by ${filter}`,
        },
      ],
    },
  };
}

export default async function NotesFilterPage({ params }: PageProps) {
  const { slug } = params;

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
