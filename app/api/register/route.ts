import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { nom, prenom, telephone, commune, adresse, type, mot_de_passe, mode_paiement, piece_identite } = await req.json()

  // Vérifier si le numéro existe déjà
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('telephone', telephone)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Ce numéro est déjà utilisé' }, { status: 400 })
  }

  // Hasher le mot de passe
  const hash = await bcrypt.hash(mot_de_passe, 10)

  // Créer l'utilisateur
  const { data: user, error } = await supabase
    .from('users')
    .insert({ nom, prenom, telephone, commune, adresse, type, mot_de_passe: hash, mode_paiement })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Si recycleur, créer le profil recycleur
  if (type === 'recycleur' && user) {
    await supabase.from('recycleurs').insert({
      user_id: user.id,
      piece_identite,
      statut: 'en_attente'
    })
  }

  return NextResponse.json({ success: true, user })
}
