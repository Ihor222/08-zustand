"use client";

import css from "./NoteForm.module.css";
import { useId, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createNote, type NewNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useDraftStore } from "@/lib/store/noteStore";

type TagType = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

interface FormValues {
  title: string;
  content: string;
  tag: TagType;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field"),
  content: Yup.string().max(500, "Too Long!"),
  tag: Yup.mixed<TagType>().oneOf([
    "Todo",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
  ]),
});

interface NoteFormProps {
  onCloseModal?: () => void;
}

export default function NoteForm({ onCloseModal }: NoteFormProps) {
  const id = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  // глобальний драфт
  const draft = useDraftStore((state) => state.draft);
  const updateDraft = useDraftStore((state) => state.updateDraft);
  const resetDraft = useDraftStore((state) => state.resetDraft);

  const { mutate, isPending } = useMutation({
    mutationFn: (note: NewNote) => createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetDraft(); // скидаємо глобальний драфт після успішного створення
      onCloseModal ? onCloseModal() : router.back();
    },
  });

  const onSubmit = (values: FormValues) => {
    mutate(values);
  };

  const handleCancel = () => {
    resetDraft(); // якщо відміна, теж можна скинути
    onCloseModal ? onCloseModal() : router.back();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={draft}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange }) => {
        // синхронізація з глобальним драфтом
        useEffect(() => {
          updateDraft(values);
        }, [values, updateDraft]);

        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor={`${id}-title`}>Title</label>
              <Field
                id={`${id}-title`}
                name="title"
                type="text"
                className={css.input}
                placeholder="Enter note title"
                onChange={handleChange}
              />
              <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${id}-content`}>Content</label>
              <Field
                id={`${id}-content`}
                name="content"
                as="textarea"
                rows={8}
                className={css.textarea}
                placeholder="Enter note content"
                onChange={handleChange}
              />
              <ErrorMessage name="content" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${id}-tag`}>Tag</label>
              <Field
                id={`${id}-tag`}
                name="tag"
                as="select"
                className={css.select}
                onChange={handleChange}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </button>
              <button type="submit" className={css.submitButton} disabled={isPending}>
                {isPending ? "Creating..." : "Create note"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
