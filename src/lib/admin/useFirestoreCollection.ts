"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
  type OrderByDirection,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export function useFirestoreCollection<T extends DocumentData>(
  name: string,
  orderField = "order",
  direction: OrderByDirection = "asc"
) {
  const [items, setItems] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, name), orderBy(orderField, direction));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setItems(snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as T) })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [name, orderField, direction]);

  return { items, loading, error };
}

export function createItem(name: string, data: DocumentData) {
  return addDoc(collection(db, name), data);
}

export function updateItem(name: string, id: string, data: DocumentData) {
  return updateDoc(doc(db, name, id), data);
}

export function removeItem(name: string, id: string) {
  return deleteDoc(doc(db, name, id));
}
