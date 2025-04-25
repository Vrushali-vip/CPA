'use client'

import { useSession } from 'next-auth/react'
import HamburgerMenu from './HamburgerMenu'

export default function AuthenticatedMenu() {
  const { data: session, status } = useSession()

  if (status === 'loading' || !session?.user) return null

  return (
    <div className="fixed top-[72px] left-2 z-40 h-[calc(100vh-64px)] w-[250px]">
      <HamburgerMenu />
    </div>
  )
}
