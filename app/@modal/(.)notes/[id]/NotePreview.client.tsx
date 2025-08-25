"use client";

import styles from "./NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";

type NotePreviewClientProps = {
  id: string;
};

const NotePreviewClient = ({ id }: NotePreviewClientProps) => {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const closeModal = () => router.back();

  if (isLoading) return <p>Loading note...</p>;
  if (isError) return <p>Failed to load note.</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <Modal onClose={closeModal}>
      <div className={styles.wrapper}>
        <button className={styles.backBtn} onClick={closeModal}>
          ← Back
        </button>
        <header className={styles.header}>
          <h2>{note.title}</h2>
        </header>
        <div className={styles.body}>
          <p className={styles.tag}>{note.tag}</p>
          <p className={styles.content}>{note.content}</p>
          <p className={styles.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
