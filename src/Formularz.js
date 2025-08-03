import React, { useState } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Formularz() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
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

      setSubmitted(true);
      setName("");
      setMessage("");
      setImageFile(null);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Coś poszło nie tak. Spróbuj ponownie.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center font-[Quicksand]">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md text-center animate-fade-in">
          <h1 className="text-3xl font-bold text-pink-700 mb-4">Dziękujemy! 💖</h1>
          <p className="text-gray-700 text-lg">
            Twoje życzenia zostały zapisane i na pewno sprawią radość Parze Młodej.
          </p>
          <p className="mt-6 text-sm text-gray-500">Możesz zamknąć tę stronę.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center font-[Quicksand]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-[1px] border-pink-200">
        <h1 className="text-2xl font-bold text-center mb-6 text-pink-700">
          💍 Dodaj życzenia dla Pary Młodej
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Twoje imię:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="np. Asia i Michał"
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
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Szczęścia, zdrowia i morza miłości!"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zrób selfie (opcjonalnie):
            </label>

            <div className="flex items-center gap-2">
              <label
                htmlFor="upload"
                className="cursor-pointer inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md transition active:scale-95"
              >
                📸 Zrób zdjęcie
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="hidden"
              />
              {imageFile && (
                <span className="text-sm text-green-600 animate-pulse">
                  ✅ Dodano
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md transition active:scale-95"
          >
            Wyślij ✨
          </button>
        </form>

        {status && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700 animate-fade-in">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}

export default Formularz;
