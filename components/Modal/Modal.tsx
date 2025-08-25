import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ onClose, children }: ModalProps) => {
  // Закриття модалки при кліку на бекдроп
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const onEscPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onEscPress);
    // Блокуємо прокрутку сторінки, поки модалка відкрита
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onEscPress);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onBackdropClick}
    >
      <section className={css.modal}>{children}</section>
    </div>,
    document.body
  );
};

export default Modal;
