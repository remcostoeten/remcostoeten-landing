// pages/dashboard/snippets/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/core/database/firebase";

function SnippetPage() {
  const router = useRouter();
  const { id } = router.query;
  const [snippet, setSnippet] = useState(null);

  const fetchSnippet = async () => {
    const docRef = doc(db, "collectionName", "docId");
    const docSnap = await getDoc(docRef);
    const snippet = { id: docSnap.id, ...docSnap.data() };
    setSnippet(snippet);
  };

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{snippet.name}</h1>
      <p>{snippet.description}</p>
    </div>
  );
}

export default SnippetPage;
