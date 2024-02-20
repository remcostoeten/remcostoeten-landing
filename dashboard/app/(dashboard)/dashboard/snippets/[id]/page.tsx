"use client";

import { usePathname } from "next/navigation";
import { useFirestoreCollection } from "@/hooks/useGetFirestoreData";
import Wrapper from "@c/layout/Wrapper";
import Tiptap from "@c/tiptap";

type Category = {
  name: string;
  description: string;
};
import { Coda } from "next/font/google";
const coda = Coda({
  subsets: ['latin'],
  weight: '400',
});

export default function SnippetPage() {
  // Use the usePathname hook to get the current pathname
  const pathname = usePathname();
  // Extract the id from the pathname
  const id = pathname?.split("/").pop();


  // Fetch the snippets data using the useFirestoreCollection hook
  const {
    data: snippets,
    loading,
    error,
  } = useFirestoreCollection<Category>("snippets");

  // If the data is still loading, show a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(snippets);

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Find the snippet with the matching name
  const snippet = snippets?.find(
    (snippet) => snippet.name === id?.replace(/-/g, " "),
  );
  // If the snippet is not found, you can show a  404 page or a message
  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  // Render the snippet details
  return (
    <Wrapper horizontalPadding="0" padding="small" pageTitle={snippet.name}>
      <Tiptap />
      <p>{snippet.description}</p>
      <Tiptap />
    </Wrapper>
  );
}
