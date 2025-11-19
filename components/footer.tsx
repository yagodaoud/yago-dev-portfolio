import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
    return (
        <footer className="py-8 border-t border-border/50 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Yago Andrade Daoud. All rights reserved.
                </p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/yagodaoud" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Github size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/yago-andrade-dev?locale=en_US" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin size={20} />
                    </a>
                    <a href="mailto:yagodaouddev@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        <Mail size={20} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
