"use client";
import { useState } from "react";

export default function Planifier() {
  const [step, setStep] = useState(3);
  const [payMethod, setPayMethod] = useState("Orange Money");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaiement = async () => {
    setLoading(true);
    setError("");

    try {
      const transaction_id = `MKASA-${Date.now()}`;

      const res = await fetch("/api/paiement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          montant: 1500,
          description: "Réservation collecte déchets MKasa",
          client_nom: "Aminata Koné",
          client_email: "client@mkasa.ci",
          transaction_id,
        }),
      });

      const data = await res.json();

      if (data.code === "201") {
        // Redirection vers la page de paiement CinetPay
        window.location.href = data.data.payment_url;
      } else {
        setError("Erreur lors de l'initialisation du paiement. Réessayez.");
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">← Tableau de bord</a>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-900">Planifier une collecte</span>
        </div>

        <div className="flex gap-0 mb-6 bg-white rounded-xl border border-gray-100 overflow-hidden">
          {['Recycleur', 'Créneau', 'Détails', 'Paiement'].map((s, i) => (
            <div key={s} className={`flex-1 flex items-center gap-2 px-4 py-3 text-sm border-b-2 ${i + 1 === step ? "border-green-600 text-green-700 font-medium" : i + 1 < step ? "border-green-200 text-green-400" : "border-transparent text-gray-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i + 1 === step ? "bg-green-600 text-white" : i + 1 < step ? "bg-green-200 text-green-700" : "bg-gray-100 text-gray-400"}`}>{i + 1}</div>
              {s}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Recycleur sélectionné</h2>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium text-sm">KD</div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">Kouamé Diabaté</div>
                  <div className="text-xs text-gray-400">Cocody · 1.2 km · 4.9 ★</div>
                </div>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Disponible</span>
              </div>

              <h2 className="text-sm font-medium text-gray-900 mb-3">Créneau sélectionné</h2>
              <div className="p-3 border-2 border-green-600 bg-green-50 rounded-lg text-center mb-4">
                <div className="font-medium text-green-800">Jeudi 17 avril 2025</div>
                <div className="text-sm text-green-600">08h00 – 09h00</div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Type de déchet</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600">
                    <option>Ordures ménagères générales</option>
                    <option>Plastique</option>
                    <option>Carton / papier</option>
                    <option>Métaux</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Adresse de collecte</label>
                  <input type="text" defaultValue="Rue 12, Cité les Fleurs, Cocody" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Instructions (optionnel)</label>
                  <input type="text" placeholder="Ex : Sonner à l'interphone..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Mode de paiement</h2>

              {/* Badge escrow */}
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4">
                <span className="text-blue-600 text-lg">🔒</span>
                <div>
                  <div className="text-xs font-medium text-blue-800">Paiement sécurisé MKasa</div>
                  <div className="text-xs text-blue-600">Votre argent est bloqué jusqu'à confirmation de la collecte. Remboursement automatique si le recycleur ne vient pas.</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {['Orange Money', 'Wave', 'MTN Money', 'Carte bancaire'].map(m => (
                  <div key={m} onClick={() => setPayMethod(m)} className={`p-3 rounded-lg border-2 cursor-pointer text-center ${payMethod === m ? "border-green-600 bg-green-50" : "border-gray-100"}`}>
                    <div className="text-sm font-medium text-gray-900">{m}</div>
                  </div>
                ))}
              </div>

              {error && (
                <div className="text-red-500 text-xs mb-3 p-2 bg-red-50 rounded-lg">{error}</div>
              )}

              <button
                onClick={handlePaiement}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium disabled:opacity-50"
              >
                {loading ? "Initialisation du paiement..." : "Confirmer et payer · 1 500 FCFA"}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-green-600 rounded-xl p-4 text-white">
              <div className="text-xs text-green-200 mb-3 font-medium">Récapitulatif</div>
              {[
                { label: "Recycleur", value: "Kouamé Diabaté" },
                { label: "Date", value: "Jeu. 17 avril" },
                { label: "Créneau", value: "08h00 – 09h00" },
                { label: "Type", value: "Ordures générales" },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-xs mb-2">
                  <span className="text-green-200">{r.label}</span>
                  <span className="text-white font-medium">{r.value}</span>
                </div>
              ))}
              <div className="border-t border-green-500 pt-2 mt-2">
                <div className="flex justify-between text-xs mb-1"><span className="text-green-200">Tarif collecte</span><span className="text-white">1 765 FCFA</span></div>
                <div className="flex justify-between text-xs mb-2"><span className="text-green-200">Réduction -15%</span><span className="text-green-200">–265 FCFA</span></div>
                <div className="flex justify-between font-medium"><span className="text-white">Total</span><span className="text-white">1 500 FCFA</span></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Notification foyer</h2>
              <p className="text-xs text-gray-400 mb-3">Un SMS sera envoyé à tous les membres avant la visite.</p>
              {['Aminata K. (vous)', 'Moussa K. (époux)'].map(m => (
                <div key={m} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{m}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Notifié</span>
                </div>
              ))}
            </div>

            {/* Statut escrow */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Sécurité du paiement</h2>
              {[
                { label: "Client paie", status: "en attente", color: "yellow" },
                { label: "Argent bloqué", status: "en attente", color: "yellow" },
                { label: "Collecte effectuée", status: "en attente", color: "yellow" },
                { label: "Recycleur payé", status: "en attente", color: "yellow" },
              ].map(s => (
                <div key={s.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-700">{s.label}</span>
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">{s.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <a href="/dashboard" className="text-sm text-gray-400 hover:text-gray-600">← Tableau de bord</a>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-900">Planifier une collecte</span>
        </div>

        {/* Étapes */}
        <div className="flex gap-0 mb-6 bg-white rounded-xl border border-gray-100 overflow-hidden">
          { ["Recycleur", "Créneau", "Détails", "Paiement"].map((s, i) => (
            <div key={s} className={`flex-1 flex items-center gap-2 px-4 py-3 text-sm border-b-2 ${i + 1 === step ? "border-green-600 text-green-700 font-medium" : i + 1 < step ? "border-green-200 text-green-400" : "border-transparent text-gray-400"}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${i + 1 === step ? "bg-green-600 text-white" : i + 1 < step ? "bg-green-200 text-green-700" : "bg-gray-100 text-gray-400"}`}>{i + 1}</div>
              {s}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Recycleur sélectionné</h2>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-medium text-sm">KD</div>
                <div className="flex-1"><div className="font-medium text-sm text-gray-900">Kouamé Diabaté</div><div className="text-xs text-gray-400">Cocody · 1.2 km · 4.9 ★</div></div>
                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Disponible</span>
              </div>

              <h2 className="text-sm font-medium text-gray-900 mb-3">Créneau sélectionné</h2>
              <div className="p-3 border-2 border-green-600 bg-green-50 rounded-lg text-center mb-4">
                <div className="font-medium text-green-800">Jeudi 17 avril 2025</div>
                <div className="text-sm text-green-600">08h00 – 09h00</div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Type de déchet</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600">
                    <option>Ordures ménagères générales</option>
                    <option>Plastique</option>
                    <option>Carton / papier</option>
                    <option>Métaux</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Adresse de collecte</label>
                  <input type="text" defaultValue="Rue 12, Cité les Fleurs, Cocody" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Instructions (optionnel)</label>
                  <input type="text" placeholder="Ex : Sonner à l'interphone..." className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Mode de paiement</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {["Orange Money", "Wave", "MTN Money", "Carte bancaire"].map(m => (
                  <div key={m} onClick={() => setPayMethod(m)} className={`p-3 rounded-lg border-2 cursor-pointer text-center ${payMethod === m ? "border-green-600 bg-green-50" : "border-gray-100"}`}>
                    <div className="text-sm font-medium text-gray-900">{m}</div>
                  </div>
                ))}
              </div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg text-sm font-medium">
                Confirmer et payer · 1 500 FCFA
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-green-600 rounded-xl p-4 text-white">
              <div className="text-xs text-green-200 mb-3 font-medium">Récapitulatif</div>
              {[
                { label: "Recycleur", value: "Kouamé Diabaté" },
                { label: "Date", value: "Jeu. 17 avril" },
                { label: "Créneau", value: "08h00 – 09h00" },
                { label: "Type", value: "Ordures générales" },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-xs mb-2">
                  <span className="text-green-200">{r.label}</span>
                  <span className="text-white font-medium">{r.value}</span>
                </div>
              ))}
              <div className="border-t border-green-500 pt-2 mt-2">
                <div className="flex justify-between text-xs mb-1"><span className="text-green-200">Tarif collecte</span><span className="text-white">1 765 FCFA</span></div>
                <div className="flex justify-between text-xs mb-2"><span className="text-green-200">Réduction -15%</span><span className="text-green-200">–265 FCFA</span></div>
                <div className="flex justify-between font-medium"><span className="text-white">Total</span><span className="text-white">1 500 FCFA</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Notification foyer</h2>
              <p className="text-xs text-gray-400 mb-3">Un SMS sera envoyé à tous les membres avant la visite.</p>
              { ["Aminata K. (vous)", "Moussa K. (époux)"].map(m => (
                <div key={m} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm text-gray-700">{m}</span>
                  <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">Notifié</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
