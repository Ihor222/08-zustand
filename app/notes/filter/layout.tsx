import css from "./LayoutNotes.module.css";

interface NotesLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: NotesLayoutProps) => {
  return (
    <div className={css.layout}>
      <header className={css.header}>
        <h2 className={css.title}>Notes</h2>
      </header>
      <main className={css.main}>
        <div className={css.content}>{children}</div>
        <nav className={css.sidebar}>{sidebar}</nav>
      </main>
    </div>
  );
};

export default NotesLayout;
