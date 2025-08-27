"use client";

import { useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, type FetchNotesResponse } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";
import css from "./Notes.client.module.css"; 

export interface NotesClientProps {
  initialTag: NoteTag | "All";
  initialPage?: number;      // додано
  initialQuery?: string;     // додано
}

export default function NotesClient({
  initialTag,
  initialPage = 1,
  initialQuery = "",
}: NotesClientProps) {
  const [inputValue, setInputValue] = useState<string>(initialQuery);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    setInputValue("");
    setSearchQuery("");
    setCurrentPage(1);
  }, [initialTag]);

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearchChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };

  const effectiveTag: NoteTag | undefined =
    initialTag === "All" ? undefined : (initialTag as NoteTag);

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", { page: currentPage, search: searchQuery, tag: effectiveTag }],
    queryFn: () => fetchNotes(currentPage, searchQuery, effectiveTag),
    placeholderData: (prevData) => prevData,
  });

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={inputValue} onSearch={handleSearchChange} />

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {totalPages > 1 && (
        <div className={css.paginationTop}>
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      )}

      {isLoading ? (
        <p className={css.loading}>Loading notes...</p>
      ) : notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p className={css.empty}>
          No notes found{initialTag !== "All" ? ` for tag "${initialTag}"` : ""}.
        </p>
      )}

      {totalPages > 1 && (
        <footer className={css.paginationBottom}>
          <Pagination
            totalNumberOfPages={totalPages}
            currentActivePage={currentPage}
            setPage={setCurrentPage}
          />
        </footer>
      )}
    </div>
  );
}
