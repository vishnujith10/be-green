import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { WhyMicrogreens } from '@/components/WhyMicrogreens'
import { Products } from '@/components/Products'
import { ComingSoon } from '@/components/ComingSoon'
import { GrowingProcess } from '@/components/GrowingProcess'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <WhyMicrogreens />
      <Products />
      <ComingSoon />
      <GrowingProcess />
      <Contact />
      <Footer />
    </main>
  )
}
