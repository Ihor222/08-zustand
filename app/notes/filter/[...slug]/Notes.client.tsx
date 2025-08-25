"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "../../../home.modal.css";

export interface NotesClientProps {
  initialPage: number;
  initialQuery: string;
  initialTag: NoteTag | "All"; // суворіше
}

export default function NotesClient({
  initialPage,
  initialQuery,
  initialTag,
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [inputValue, setInputValue] = useState<string>(initialQuery);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setInputValue(initialQuery);
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const effectiveTag: NoteTag | undefined =
    initialTag === "All" ? undefined : initialTag;

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { page: currentPage, search: searchQuery, tag: initialTag }],
    queryFn: () => fetchNotes(currentPage, searchQuery, effectiveTag),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>
          No notes found
          {initialTag !== "All" ? ` for tag "${initialTag}"` : ""}.
        </p>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
