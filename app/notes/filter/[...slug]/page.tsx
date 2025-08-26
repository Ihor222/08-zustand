import NotesClient from "./Notes.client";
import type { Metadata } from "next";
import type { NoteTag } from "@/types/note";

interface NotesProps {
  params: Promise<{ slug?: string[] }>;
}

export const generateMetadata = async ({ params }: NotesProps): Promise<Metadata> => {
  const { slug } = await params;
  const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : "All";

  const title = tag !== "All" ? `Notes filtered by ${tag}` : "All notes";
  const description =
    tag !== "All"
      ? `Browse notes filtered by the ${tag} tag.`
      : "Browse all available notes without filters.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag,
        },
      ],
    },
  };
};

export default async function NotesFilterPage({ params }: NotesProps) {
  const { slug } = await params;

  const tag = slug?.[0] && slug[0].toLowerCase() !== "all" ? slug[0] : "All";
  const tagValue: NoteTag | "All" = tag as NoteTag | "All";

  const initialPage = 1;
  const initialQuery = "";

  return (
    <NotesClient
      initialPage={initialPage}
      initialQuery={initialQuery}
      initialTag={tagValue}
    />
  );
}
