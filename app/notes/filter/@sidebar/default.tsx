import Link from "next/link";
import css from "./SideBarNotes.module.css";
import type { NoteTag } from "@/types/note";

type SidebarTag = NoteTag | "all";

const tags: SidebarTag[] = ["all", "Todo", "Work", "Personal", "Meeting", "Shopping"];

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag === "all" ? "All notes" : tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
