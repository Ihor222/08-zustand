import styles from "./NotFound.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description:
    "The page you are looking for does not exist. ",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "The page you are looking for does not exist.",
    url: "https://notehub.vercel.app/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page not found</h1>
      <p className={styles.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
