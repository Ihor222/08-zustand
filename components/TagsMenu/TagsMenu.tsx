"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./TagsMenu.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {tags.map((tag) => {
            const href = tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;

            return (
              <li key={tag} className={css.menuItem}>
                <Link href={href} className={css.menuLink} onClick={closeMenu}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
