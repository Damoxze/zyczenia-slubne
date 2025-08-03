import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !message) {
      setStatus("⚠️ Uzupełnij imię i życzenia.");
      return;
    }

    setStatus("⏳ Wysyłanie...");

    try {
      let imageUrl = null;

      if (imageFile) {
        const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "zyczenia"), {
        name,
        message,
        imageUrl,
        created: Timestamp.now(),
      });

      setStatus("✅ Dziękujemy za Twoje życzenia!");
      setName("");
      setMessage("");
      setImageFile(null);
    } catch (error) {
      console.error(error);
      setStatus("❌ Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  return (
    
    <div className="min-h-screen bg-pink-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-pink-700">
          💍 Dodaj życzenia dla Pary Młodej
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twoje imię:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twoje życzenia:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zrób selfie (opcjonalnie):
            </label>
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Otworzy się aparat na telefonie.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
          >
            Wyślij ✨
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
        )}
      </div>
    </div>
  );
}

export default App;
