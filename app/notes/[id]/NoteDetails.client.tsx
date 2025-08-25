"use client";

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import styles from "./NoteDetails.module.css";

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const noteQuery = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false, 
  });

  if (noteQuery.isLoading) {
    return <div className={styles.status}>Завантаження...</div>;
  }

  if (noteQuery.isError) {
    return <div className={styles.status}>Сталася помилка при отриманні нотатки.</div>;
  }

  const note = noteQuery.data;

  if (!note) {
    return <div className={styles.status}>Нотатку не знайдено.</div>;
  }

  return (
    <section className={styles.wrapper}>
      <header className={styles.header}>
        <h1>{note.title}</h1>
      </header>
      <article className={styles.body}>
        <p>{note.content}</p>
      </article>
      <footer className={styles.footer}>
        <time>{note.createdAt}</time>
      </footer>
    </section>
  );
}
