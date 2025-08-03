import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Panel() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const q = query(collection(db, "zyczenia"), orderBy("created", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => doc.data());
      setEntries(data);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl text-center mb-6 text-pink-700 font-bold">
        💌 Życzenia dla Pary Młodej
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entries.map((entry, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-4">
            <h2 className="text-lg font-semibold text-pink-800">{entry.name}</h2>
            <p className="mt-2 text-gray-700 whitespace-pre-line">{entry.message}</p>
            {entry.imageUrl && (
              <img
                src={entry.imageUrl}
                alt="Selfie"
                className="mt-4 rounded-lg shadow-md max-h-64 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Panel;
