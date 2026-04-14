"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [type, setType] = useState<"menage" | "recycleur">("menage");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const [form, setForm] = useState({
    nom: "", prenom: "", telephone: "", commune: "",
    adresse: "", mot_de_passe: "", confirmer: "",
    mode_paiement: "", piece_identite: ""
  });

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit() {
    if (form.mot_de_passe !== form.confirmer) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    setErreur("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, type }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setErreur(data.error);
    } else {
      localStorage.setItem("mkasa_user", JSON.stringify(data.user));
      if (type === "recycleur") {
        router.push("/dashboard/recycleur");
      } else {
        router.push("/dashboard");
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-gray-100 p-8 w-full max-w-md">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">M</span>
            </div>
            <span className="text-lg font-medium">M<span className="text-green-600">Kasa</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded overflow-hidden w-7 h-4 border border-gray-100">
              <div className="flex-1 bg-orange-500"></div>
              <div className="flex-1 bg-white"></div>
              <div className="flex-1 bg-green-600"></div>
            </div>
            <span className="text-sm text-gray-500">Côte d'Ivoire</span>
          </div>
        </div>

        <div className="flex gap-1 mb-6">
          {[1,2,3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? "bg-green-600" : "bg-gray-100"}`}></div>
          ))}
        </div>

        {erreur && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{erreur}</div>}

        {step === 1 && (
          <>
            <h1 className="text-xl font-medium text-gray-900 mb-1">Créer un compte</h1>
            <p className="text-sm text-gray-500 mb-6">Qui êtes-vous sur MKasa ?</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div onClick={() => setType("menage")} className={`p-4 rounded-xl border-2 cursor-pointer text-center ${type === "menage" ? "border-green-600 bg-green-50" : "border-gray-100"}`}>
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-700 text-sm">🏠</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Ménage</div>
                <div className="text-xs text-gray-400 mt-1">Je cherche un recycleur</div>
              </div>
              <div onClick={() => setType("recycleur")} className={`p-4 rounded-xl border-2 cursor-pointer text-center ${type === "recycleur" ? "border-green-600 bg-green-50" : "border-gray-100"}`}>
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-700 text-sm">♻️</span>
                </div>
                <div className="text-sm font-medium text-gray-900">Recycleur</div>
                <div className="text-xs text-gray-400 mt-1">Je propose mes services</div>
              </div>
            </div>
            <button onClick={() => setStep(2)} className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium">Continuer →</button>
            <p className="text-center text-sm text-gray-400 mt-4">Déjà un compte ? <a href="/login" className="text-green-600 font-medium">Se connecter</a></p>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-xl font-medium text-gray-900 mb-1">Informations personnelles</h1>
            <p className="text-sm text-gray-500 mb-4">{type === "menage" ? "Ménage" : "Recycleur"} · Étape 2 sur 3</p>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm text-gray-500 mb-1">Prénom</label><input type="text" value={form.prenom} onChange={e => update("prenom", e.target.value)} placeholder="Aminata" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
                <div><label className="block text-sm text-gray-500 mb-1">Nom</label><input type="text" value={form.nom} onChange={e => update("nom", e.target.value)} placeholder="Koné" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              </div>
              <div><label className="block text-sm text-gray-500 mb-1">Numéro de téléphone</label><input type="tel" value={form.telephone} onChange={e => update("telephone", e.target.value)} placeholder="+225 07 00 00 00 00" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div><label className="block text-sm text-gray-500 mb-1">Commune</label>
                <select value={form.commune} onChange={e => update("commune", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600">
                  <option value="">Choisir votre commune</option>
                  <option>Cocody</option><option>Yopougon</option><option>Koumassi</option>
                  <option>Abobo</option><option>Adjamé</option><option>Marcory</option>
                  <option>Treichville</option><option>Plateau</option>
                </select>
              </div>
              <div><label className="block text-sm text-gray-500 mb-1">Adresse</label><input type="text" value={form.adresse} onChange={e => update("adresse", e.target.value)} placeholder="Rue 12, Cité les Fleurs" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              {type === "recycleur" && (
                <div><label className="block text-sm text-gray-500 mb-1">Numéro pièce d'identité</label><input type="text" value={form.piece_identite} onChange={e => update("piece_identite", e.target.value)} placeholder="CI-XXXX-XXXX" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-500 py-2.5 rounded-lg text-sm">← Retour</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium">Continuer →</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-xl font-medium text-gray-900 mb-1">Sécurité du compte</h1>
            <p className="text-sm text-gray-500 mb-4">{type === "menage" ? "Ménage" : "Recycleur"} · Étape 3 sur 3</p>
            <div className="flex flex-col gap-3">
              <div><label className="block text-sm text-gray-500 mb-1">Mot de passe</label><input type="password" value={form.mot_de_passe} onChange={e => update("mot_de_passe", e.target.value)} placeholder="Minimum 8 caractères" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div><label className="block text-sm text-gray-500 mb-1">Confirmer le mot de passe</label><input type="password" value={form.confirmer} onChange={e => update("confirmer", e.target.value)} placeholder="Répéter le mot de passe" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div><label className="block text-sm text-gray-500 mb-1">Mode de paiement préféré</label>
                <select value={form.mode_paiement} onChange={e => update("mode_paiement", e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600">
                  <option value="">Choisir</option>
                  <option>Orange Money</option><option>Wave</option>
                  <option>MTN Money</option><option>Carte bancaire</option>
                </select>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-xs text-green-700">Vos informations sont sécurisées. Aucun contact en espèces ne sera nécessaire.</div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 text-gray-500 py-2.5 rounded-lg text-sm">← Retour</button>
              <button onClick={handleSubmit} disabled={loading} className="flex-1 bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50">
                {loading ? "Création..." : "Créer mon compte"}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
