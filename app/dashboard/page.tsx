export default function DashboardMenage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">M</span>
          </div>
          <span className="font-medium">M<span className="text-green-600">Kasa</span></span>
        </div>
        {[
          { label: "Tableau de bord", href: "/dashboard", active: true },
          { label: "Trouver un recycleur", href: "/recycleurs" },
          { label: "Mon planning", href: "/planning" },
          { label: "Paiements", href: "/paiements" },
          { label: "Notifications", href: "/notifications" },
          { label: "Mon abonnement", href: "/abonnement" },
          { label: "Paramètres", href: "/parametres" },
        ].map(item => (
          <a key={item.href} href={item.href} className={`px-3 py-2 rounded-lg text-sm ${item.active ? "bg-green-50 text-green-800 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>
            {item.label}
          </a>
        ))}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-medium">AK</div>
            <div>
              <div className="text-sm font-medium text-gray-900">Aminata Koné</div>
              <div className="text-xs text-green-600">Plan Premium · -15%</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Bonjour, Aminata</h1>
            <p className="text-sm text-gray-500">Mardi 15 avril · Cocody, Abidjan</p>
          </div>
          <a href="/planifier" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">+ Nouvelle collecte</a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Collectes ce mois", value: "8", sub: "+2 vs mois dernier" },
            { label: "Dépenses ce mois", value: "12 400 FCFA", sub: "-15% abonnement", green: true },
            { label: "Recycleur actif", value: "Kouamé D.", sub: "4.9 ★ · 1.2 km" },
            { label: "Prochaine collecte", value: "Jeudi 17", sub: "08h00 · Confirmée" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="text-xs text-gray-400 mb-1">{s.label}</div>
              <div className="text-lg font-medium text-gray-900">{s.value}</div>
              <div className={`text-xs mt-1 ${s.green ? "text-green-600" : "text-gray-400"}`}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Recycleurs */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Recycleurs disponibles près de vous</h2>
            <div className="bg-green-50 rounded-lg h-32 mb-3 flex items-center justify-center text-sm text-green-600">Carte Abidjan — recycleurs proches</div>
            {[
              { initials: "KD", name: "Kouamé Diabaté", detail: "1.2 km · Disponible", rating: "4.9", badge: "Votre recycleur", badgeColor: "green" },
              { initials: "AB", name: "Awa Bamba", detail: "2.1 km · Disponible", rating: "4.7" },
              { initials: "SD", name: "Seydou Diallo", detail: "3.4 km · Demain", rating: "4.5", badge: "Nouveau", badgeColor: "blue" },
            ].map(r => (
              <div key={r.name} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-medium">{r.initials}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{r.name} {r.badge && <span className={`text-xs px-2 py-0.5 rounded-full ml-1 ${r.badgeColor === "green" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>{r.badge}</span>}</div>
                  <div className="text-xs text-gray-400">{r.detail}</div>
                </div>
                <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium">{r.rating} ★</span>
              </div>
            ))}
          </div>

          {/* Planning + Abonnement */}
          <div className="flex flex-col gap-4">
            <div className="bg-green-600 rounded-xl p-4 text-white">
              <div className="text-xs text-green-200 mb-1">Mon abonnement</div>
              <div className="text-lg font-medium">Plan Premium</div>
              <div className="text-xs text-green-200 mb-3">-15% sur chaque collecte</div>
              <div className="bg-green-700 rounded-full h-1.5 mb-1"><div className="bg-green-200 rounded-full h-1.5 w-2/3"></div></div>
              <div className="flex justify-between text-xs text-green-200"><span>Avr. 2024</span><span>8 mois restants</span></div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-medium text-gray-900 mb-3">Planning</h2>
              {[
                { day: "17", month: "AVR", title: "Ordures générales", detail: "Kouamé D. · 08h00", badge: "Confirmée", color: "green" },
                { day: "21", month: "AVR", title: "Collecte plastique", detail: "Awa B. · 09h30", badge: "Attente", color: "orange" },
              ].map(p => (
                <div key={p.day} className="flex gap-3 items-start py-2 border-b border-gray-50 last:border-0">
                  <div className="text-center min-w-8"><div className={`text-lg font-medium ${p.color === "green" ? "text-green-600" : "text-orange-500"}`}>{p.day}</div><div className="text-xs text-gray-400">{p.month}</div></div>
                  <div className="flex-1"><div className="text-sm font-medium text-gray-900">{p.title}</div><div className="text-xs text-gray-400">{p.detail}</div></div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${p.color === "green" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"}`}>{p.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
