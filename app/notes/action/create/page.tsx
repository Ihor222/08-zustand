import { Metadata } from "next";
import NoteForm from "@/components/NoteForm/NoteForm";
import styles from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create a New Note",
  description: "Use this page to add a new note to your collection",
  openGraph: {
    title: "Create a New Note",
    description: "Use this page to add a new note to your collection",
    url: "https://07-routing-nextjs-blond.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note Illustration",
      },
    ],
  },
};

function CreateNotePage() {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1 className={styles.title}>Add a new note</h1>
        <NoteForm onCloseModal={() => {}} />
      </section>
    </main>
  );
}

export default CreateNotePage;
