export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="text-lg font-medium">M<span className="text-green-600">Kasa</span></span>
        </div>
        <div className="flex gap-3">
          <a href="/login" className="px-4 py-2 text-sm border border-green-600 text-green-600 rounded-lg">Se connecter</a>
          <a href="/register" className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg">S'inscrire</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-8 py-20 text-center">
        <div className="inline-block bg-green-50 text-green-700 text-sm px-4 py-1 rounded-full mb-6">
          Disponible à Abidjan et environs
        </div>
        <h1 className="text-4xl font-medium text-gray-900 mb-4">
          Le recyclage <span className="text-green-600">sécurisé</span> et organisé<br />en Côte d'Ivoire
        </h1>
        <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
          Trouvez un recycleur de confiance près de chez vous. Payez en ligne, sans contact physique.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/register" className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium">Trouver un recycleur</a>
          <a href="/register?type=recycleur" className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium">Je suis recycleur</a>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-3 gap-6 text-center">
          <div><div className="text-3xl font-medium text-green-600">1 200+</div><div className="text-sm text-gray-500 mt-1">Recycleurs inscrits</div></div>
          <div><div className="text-3xl font-medium text-green-600">15 000+</div><div className="text-sm text-gray-500 mt-1">Ménages servis</div></div>
          <div><div className="text-3xl font-medium text-green-600">98%</div><div className="text-sm text-gray-500 mt-1">Paiements sécurisés</div></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-100 mt-10">
        © 2025 MKasa · Abidjan, Côte d'Ivoire
      </footer>
    </main>
  );
}