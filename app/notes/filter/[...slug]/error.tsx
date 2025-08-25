'use client'

type Props = {
  error: Error
  reset: () => void
}

export default function NotesError({ error, reset }: Props) {
  return (
    <div>
      <p>Could not fetch note details. {error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  )
}
