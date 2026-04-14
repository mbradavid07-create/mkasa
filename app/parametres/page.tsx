export default function Parametres() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center"><span className="text-white text-xs font-bold">M</span></div>
          <span className="font-medium">M<span className="text-green-600">Kasa</span></span>
        </div>
        {[
          { label: "Tableau de bord", href: "/dashboard" },
          { label: "Notifications", href: "/notifications" },
          { label: "Paramètres", href: "/parametres", active: true },
        ].map(item => (
          <a key={item.href} href={item.href} className={`px-3 py-2 rounded-lg text-sm ${item.active ? "bg-green-50 text-green-800 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>{item.label}</a>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-xl font-medium text-gray-900 mb-1">Paramètres & sécurité</h1>
        <p className="text-sm text-gray-400 mb-6">Gérez votre compte et la sécurité de votre espace MKasa</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Informations personnelles</h2>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div><label className="block text-xs text-gray-400 mb-1">Prénom</label><input type="text" defaultValue="Aminata" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Nom</label><input type="text" defaultValue="Koné" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              </div>
              <div className="mb-3"><label className="block text-xs text-gray-400 mb-1">Téléphone</label><input type="tel" defaultValue="+225 07 ••• ••• 42" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div className="mb-4"><label className="block text-xs text-gray-400 mb-1">Commune</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600">
                  <option>Cocody</option><option>Yopougon</option><option>Koumassi</option>
                </select>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Enregistrer</button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Membres du foyer</h2>
              {[
                { initials: "AK", name: "Aminata Koné (vous)", tel: "+225 07 ••• ••• 42", badge: "Admin", color: "green" },
                { initials: "MK", name: "Moussa Koné", tel: "+225 05 ••• ••• 77", badge: "Notifié", color: "blue" },
              ].map(m => (
                <div key={m.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${m.color === "green" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{m.initials}</div>
                  <div className="flex-1"><div className="text-sm font-medium text-gray-900">{m.name}</div><div className="text-xs text-gray-400">{m.tel}</div></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.color === "green" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>{m.badge}</span>
                </div>
              ))}
              <button className="w-full mt-3 border border-green-600 text-green-600 py-2 rounded-lg text-sm font-medium">+ Ajouter un membre</button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Sécurité du compte</h2>
              <div className="mb-3"><label className="block text-xs text-gray-400 mb-1">Mot de passe actuel</label><input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div className="mb-3"><label className="block text-xs text-gray-400 mb-1">Nouveau mot de passe</label><input type="password" placeholder="Minimum 8 caractères" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <div className="mb-4"><label className="block text-xs text-gray-400 mb-1">Confirmer</label><input type="password" placeholder="Répéter" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-600" /></div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium mb-4">Changer le mot de passe</button>
              <div className="border-t border-gray-50 pt-3">
                {[
                  { label: "Authentification 2 étapes", sub: "Code SMS à chaque connexion", on: true },
                  { label: "Alerte nouvelle connexion", sub: "Notification si nouvel appareil", on: true },
                ].map(p => (
                  <div key={p.label} className="flex items-center justify-between py-2">
                    <div><div className="text-sm text-gray-900">{p.label}</div><div className="text-xs text-gray-400">{p.sub}</div></div>
                    <div className={`w-9 h-5 rounded-full relative cursor-pointer ${p.on ? "bg-green-600" : "bg-gray-200"}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 ${p.on ? "left-4" : "left-0.5"}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-red-100 p-5">
              <h2 className="text-sm font-medium text-red-600 mb-3">Zone de danger</h2>
              {[
                { label: "Suspendre mon compte", sub: "Mise en pause temporaire" },
                { label: "Supprimer mon compte", sub: "Action irréversible" },
              ].map(d => (
                <div key={d.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div><div className="text-sm text-gray-900">{d.label}</div><div className="text-xs text-gray-400">{d.sub}</div></div>
                  <button className="text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg">{d.label.split(" ")[0]}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
