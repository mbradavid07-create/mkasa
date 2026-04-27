"use client";
import { useState } from "react";

const criteres = ["Ponctualité", "Propreté", "Amabilité"];

export default function Notation() {
  const [notes, setNotes] = useState({ Ponctualité: 0, Propreté: 0, Amabilité: 0 });
  const [commentaire, setCommentaire] = useState("");
  const [envoye, setEnvoye] = useState(false);

  const moyenne = Object.values(notes).reduce((a, b) => a + b, 0) / 3;

  const handleNote = (critere: string, note: number) => {
    setNotes(prev => ({ ...prev, [critere]: note }));
  };

  const handleEnvoyer = () => {
    if (Object.values(notes).some(n => n === 0)) {
      alert("Veuillez noter tous les critères !");
      return;
    }
    setEnvoye(true);
  };

  if (envoye) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Merci pour votre avis !</h2>
          <p className="text-sm text-gray-500 mb-6">Votre note aide la communauté MKasa à s'améliorer.</p>
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="text-3xl font-medium text-green-600 mb-1">{moyenne.toFixed(1)} ★</div>
            <div className="text-xs text-green-700">Note donnée à Kouamé Diabaté</div>
          </div>
          <a href="/dashboard" className="block w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium text-center">
            Retour au tableau de bord
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium text-xl mx-auto mb-3">KD</div>
          <h2 className="text-lg font-medium text-gray-900">Noter Kouamé Diabaté</h2>
          <p className="text-sm text-gray-500">Collecte du Jeudi 17 avril · 08h00</p>
        </div>

        {/* Critères */}
        <div className="flex flex-col gap-4 mb-6">
          {criteres.map(critere => (
            <div key={critere}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{critere}</span>
                <span className="text-xs text-gray-400">{notes[critere as keyof typeof notes] > 0 ? `${notes[critere as keyof typeof notes]}/5` : "Non noté"}</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => handleNote(critere, n)}
                    className={`flex-1 py-2 rounded-lg text-lg transition-all ${notes[critere as keyof typeof notes] >= n ? "bg-orange-400 text-white" : "bg-gray-100 text-gray-400"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Moyenne */}
        {Object.values(notes).every(n => n > 0) && (
          <div className="bg-green-50 rounded-xl p-3 text-center mb-4">
            <div className="text-2xl font-medium text-green-600">{moyenne.toFixed(1)} ★</div>
            <div className="text-xs text-green-700">Note moyenne</div>
          </div>
        )}

        {/* Commentaire */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Commentaire (optionnel)</label>
          <textarea
            value={commentaire}
            onChange={e => setCommentaire(e.target.value)}
            placeholder="Ex : Très ponctuel, travail soigné..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600 resize-none"
            rows={3}
          />
        </div>

        {/* Boutons */}
        <div className="flex gap-3">
          <a href="/dashboard" className="flex-1 py-3 rounded-lg text-sm font-medium text-center border border-gray-200 text-gray-500">
            Passer
          </a>
          <button
            onClick={handleEnvoyer}
            className="flex-1 bg-green-600 text-white py-3 rounded-lg text-sm font-medium"
          >
            Envoyer la note
          </button>
        </div>
      </div>
    </div>
  );
}