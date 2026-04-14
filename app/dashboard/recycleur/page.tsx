export default function DashboardRecycleur() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-medium">M<span className="text-green-600">Kasa</span></span>
        </div>
        {[
          { label: "Tableau de bord", href: "/dashboard/recycleur", active: true },
          { label: "Mes clients", href: "/clients" },
          { label: "Mon planning", href: "/planning" },
          { label: "Mes paiements", href: "/paiements" },
          { label: "Ma zone", href: "/zone" },
          { label: "Mon score", href: "/score" },
          { label: "Paramètres", href: "/parametres" },
        ].map(item => (
          <a key={item.href} href={item.href} className={`px-3 py-2 rounded-lg text-sm ${item.active ? "bg-orange-50 text-orange-800 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>
            {item.label}
          </a>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">KD</div>
            <div>
              <div className="text-sm font-medium text-gray-900">Kouamé Diabaté</div>
              <div className="text-xs text-orange-500">4.9 ★ · Recycleur Premium</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Bonjour, Kouamé</h1>
            <p className="text-sm text-gray-500">Mardi 15 avril · Cocody — Koumassi</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200">Disponible</button>
            <button className="px-4 py-2 bg-gray-50 text-gray-500 rounded-lg text-sm border border-gray-200">Indisponible</button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Clients actifs", value: "24", sub: "+3 ce mois" },
            { label: "Collectes ce mois", value: "61", sub: "+8 vs mois dernier", green: true },
            { label: "Revenus ce mois", value: "91 500 FCFA", sub: "Versé · Wave", orange: true },
            { label: "Prochaine collecte", value: "Aujourd'hui", sub: "14h00 · Aminata K." },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-400 mb-1">{s.label}</div>
              <div className="text-lg font-medium text-gray-900">{s.value}</div>
              <div className={`text-xs mt-1 ${s.green ? "text-green-600" : s.orange ? "text-orange-500" : "text-gray-400"}`}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-gray-900">Planning du jour</h2>
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">4 collectes</span>
              </div>
              {[
                { time: "08h", name: "Aminata Koné", addr: "Rue 12, Cité les Fleurs, Cocody", amount: "1 500", badge: "Confirmée", color: "green" },
                { time: "10h", name: "Brice Kouassi", addr: "Résidence Palm, Koumassi", amount: "1 500", badge: "Confirmée", color: "green" },
                { time: "14h", name: "Marie-Claire Diallo", addr: "Angré 8ème, Cocody", amount: "1 500", badge: "Attente", color: "orange" },
                { time: "16h", name: "Yao Ekissi", addr: "Cité Bonoumin, Cocody", amount: "1 200", badge: "Planifiée", color: "blue" },
              ].map(p => (
                <div key={p.name} className="flex gap-3 items-start py-2 border-b border-gray-50 last:border-0">
                  <div className="text-lg font-medium text-orange-500 min-w-10">{p.time}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-green-600">{p.addr}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full block mb-1 ${p.color === "green" ? "bg-green-50 text-green-700" : p.color === "orange" ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700"}`}>{p.badge}</span>
                    <span className="text-xs font-medium text-green-600">+{p.amount} FCFA</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-orange-500 rounded-xl p-4 text-white">
              <div className="text-xs text-orange-200 mb-1">Revenus du mois</div>
              <div className="text-2xl font-medium">91 500 FCFA</div>
              <div className="text-xs text-orange-200 mt-1">61 collectes · +12% vs mars</div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="bg-orange-600 rounded-lg p-2 text-center"><div className="text-lg font-medium">24</div><div className="text-xs text-orange-200">Clients</div></div>
                <div className="bg-orange-600 rounded-lg p-2 text-center"><div className="text-lg font-medium">4.9★</div><div className="text-xs text-orange-200">Note</div></div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Ma performance</h2>
              {[
                { label: "Note moyenne", value: "4.9/5", pct: 98 },
                { label: "Confirmation", value: "96%", pct: 96 },
                { label: "Ponctualité", value: "93%", pct: 93 },
              ].map(p => (
                <div key={p.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-500">{p.label}</span><span className="font-medium text-gray-900">{p.value}</span></div>
                  <div className="bg-gray-100 rounded-full h-1.5"><div className="bg-green-600 rounded-full h-1.5" style={{width: `${p.pct}%`}}></div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
