import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { authsignOut } from '@/utils/authUtils'
import Container from '@/components/layout/Container'
import { useState } from 'react'
import Button from '@/components/interaction/Button'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return <>
    <Container header='home'>

      <h1>home</h1>
      <Link href="/skills">
        Go to skills
      </Link>
    </Container>
  </>

}
