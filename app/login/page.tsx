"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [telephone, setTelephone] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setErreur("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telephone, mot_de_passe }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.error) {
      setErreur(data.error);
    } else {
      localStorage.setItem("mkasa_user", JSON.stringify(data.user));
      if (data.user.type === "recycleur") {
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

        <h1 className="text-xl font-medium text-gray-900 mb-1">Bon retour sur MKasa</h1>
        <p className="text-sm text-gray-500 mb-6">Connectez-vous à votre compte</p>

        {erreur && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{erreur}</div>}

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Numéro de téléphone</label>
            <input type="tel" placeholder="+225 07 00 00 00 00" value={telephone} onChange={e => setTelephone(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Mot de passe</label>
            <input type="password" placeholder="••••••••" value={mot_de_passe} onChange={e => setMotDePasse(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" />
          </div>
          <div className="text-right">
            <a href="#" className="text-xs text-green-600">Mot de passe oublié ?</a>
          </div>
          <button onClick={handleLogin} disabled={loading} className="w-full bg-green-600 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>
          <a href="/register" className="w-full border border-green-600 text-green-600 py-2.5 rounded-lg text-sm font-medium text-center block">
            Créer un compte
          </a>
        </div>
        <p className="text-center text-xs text-gray-400 mt-6">Paiement sécurisé · Orange Money · Wave</p>
      </div>
    </main>
  );
}
