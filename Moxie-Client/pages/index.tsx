import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { authsignOut } from '@/utils/authUtils'
import Container from '@/components/layout/Container'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [value, setValue] = useState();
  return <>
    <Container header='home'>

      <h1>home</h1>

    </Container>
  </>

}
