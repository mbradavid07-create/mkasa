import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const { telephone, mot_de_passe } = await req.json()

  // Trouver l'utilisateur
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('telephone', telephone)
    .single()

  if (error || !user) {
    return NextResponse.json({ error: 'Numéro introuvable' }, { status: 404 })
  }

  // Vérifier le mot de passe
  const valid = await bcrypt.compare(mot_de_passe, user.mot_de_passe)
  if (!valid) {
    return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
  }

  return NextResponse.json({ success: true, user })
}
