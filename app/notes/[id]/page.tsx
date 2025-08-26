import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}
interface MetadataProps {
    params: Promise<{ id: string }>,
}

export const generateMetadata = async ({ params }: MetadataProps): Promise<Metadata> => {
    const { id } = await params;
    const data = await fetchNoteById(id);

    return {
        title: `Note: ${data.title}`,
        description: data.content.slice(0, 30),
        openGraph: {
            title: `Note: ${data.title}`,
            description: data.content.slice(0, 30),
            url: `https://07-routing-nextjs-blond.vercel.app/notes/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: data.title,
                }
            ] 

        }
    }
}

type Props = {
  params: Promise<{ id: string }>;
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  console.log('note id:', id);
  const queryClient = new QueryClient();

  if (!queryClient.getQueryData(["note", id])) {
    try {
      await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
      });
    } catch (error) {
      console.error("Помилка завантаження нотатки:", error);
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}

export default NoteDetails;
