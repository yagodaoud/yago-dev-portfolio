import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
