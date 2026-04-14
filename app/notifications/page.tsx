export default function Notifications() {
  const notifs = [
    { title: "Collecte confirmée — Jeudi 17 avril", text: "Kouamé Diabaté viendra collecter vos ordures le jeudi 17 avril à 08h00.", time: "Il y a 10 min", badge: "Collecte", color: "green", unread: true },
    { title: "Rappel collecte — Dans 1 heure", text: "Votre collecte avec Kouamé Diabaté est prévue aujourd'hui à 14h00.", time: "Il y a 30 min", badge: "Rappel", color: "orange", unread: true },
    { title: "Paiement effectué avec succès", text: "Votre paiement de 1 500 FCFA via Orange Money a été reçu.", time: "Il y a 2h", badge: "Paiement", color: "green", unread: true },
    { title: "Connexion depuis un nouvel appareil", text: "Une connexion a été détectée depuis un iPhone · Abidjan.", time: "Il y a 45 min", badge: "Sécurité", color: "red", unread: true },
    { title: "Félicitations — Plan Premium activé !", text: "Votre réduction passe de -10% à -15% sur toutes vos collectes.", time: "Hier · 09h15", badge: "Fidélité", color: "purple", unread: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col p-4 gap-1">
        <div className="flex items-center gap-2 mb-6 px-2">
          <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center"><span className="text-white text-xs font-bold">M</span></div>
          <span className="font-medium">M<span className="text-green-600">Kasa</span></span>
        </div>
        {[
          { label: "Tableau de bord", href: "/dashboard" },
          { label: "Trouver un recycleur", href: "/recycleurs" },
          { label: "Mon planning", href: "/planning" },
          { label: "Paiements", href: "/paiements" },
          { label: "Notifications", href: "/notifications", active: true },
          { label: "Paramètres", href: "/parametres" },
        ].map(item => (
          <a key={item.href} href={item.href} className={`px-3 py-2 rounded-lg text-sm ${item.active ? "bg-green-50 text-green-800 font-medium" : "text-gray-500 hover:bg-gray-50"}`}>{item.label}</a>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Notifications</h1>
            <p className="text-sm text-gray-400">4 non lues</p>
          </div>
          <button className="text-sm text-gray-400 border border-gray-200 px-3 py-1.5 rounded-lg">Tout marquer comme lu</button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex gap-2 mb-4">
              { ["Toutes", "Collectes", "Paiements", "Sécurité", "Fidélité"].map(f => (
                <button key={f} className={`text-xs px-3 py-1.5 rounded-full border ${f === "Toutes" ? "bg-green-600 text-white border-green-600" : "border-gray-200 text-gray-500"}`}>{f}</button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {notifs.map(n => (
                <div key={n.title} className={`flex gap-3 p-3 rounded-xl border ${n.unread ? n.color === "red" ? "bg-red-50 border-red-100" : n.color === "orange" ? "bg-orange-50 border-orange-100" : "bg-green-50 border-green-100" : "border-gray-50"}`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.unread ? n.color === "red" ? "bg-red-500" : n.color === "orange" ? "bg-orange-500" : n.color === "purple" ? "bg-purple-500" : "bg-green-600" : "bg-gray-200"}`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 mb-1">{n.title}</div>
                    <div className="text-xs text-gray-500 mb-1">{n.text}</div>
                    <div className="text-xs text-gray-400">{n.time}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full h-fit ${n.color === "green" ? "bg-green-50 text-green-700" : n.color === "orange" ? "bg-orange-50 text-orange-700" : n.color === "red" ? "bg-red-50 text-red-700" : "bg-purple-50 text-purple-700"}`}>{n.badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h2 className="text-sm font-medium text-gray-900 mb-3">Préférences</h2>
            {[
              { label: "Rappels de collecte", sub: "1h et 24h avant", on: true },
              { label: "Confirmations paiement", sub: "À chaque transaction", on: true },
              { label: "Alertes sécurité", sub: "Nouvelles connexions", on: true },
              { label: "SMS foyer", sub: "Tous les membres", on: true },
              { label: "Offres & fidélité", sub: "Promotions, paliers", on: true },
              { label: "Nouveaux recycleurs", sub: "Dans votre commune", on: false },
            ].map(p => (
              <div key={p.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div><div className="text-sm text-gray-900">{p.label}</div><div className="text-xs text-gray-400">{p.sub}</div></div>
                <div className={`w-9 h-5 rounded-full relative cursor-pointer ${p.on ? "bg-green-600" : "bg-gray-200"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${p.on ? "left-4" : "left-0.5"}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
