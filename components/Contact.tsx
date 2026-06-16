import { Mail, Phone, MapPin } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <span className="text-primary text-sm font-semibold">Get In Touch</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mt-2 text-balance">
            Have questions? We&apos;d love to hear from you
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="rounded-2xl bg-background p-8 border border-border text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-muted mb-4">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Email</h3>
            <p className="text-foreground/60 text-sm mt-2">
              Get in touch with our support team
            </p>
            <a
              href="mailto:hello@begreen.farm"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              hello@begreen.farm
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl bg-background p-8 border border-border text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-muted mb-4">
              <Phone className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Phone</h3>
            <p className="text-foreground/60 text-sm mt-2">
              Call us for immediate assistance
            </p>
            <a
              href="tel:+15551234567"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              +1 (555) 123-4567
            </a>
          </div>

          {/* Address */}
          <div className="rounded-2xl bg-background p-8 border border-border text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-muted mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>
            <p className="text-foreground/60 text-sm mt-2">
              Come see our farm
            </p>
            <p className="mt-4 text-primary font-semibold text-sm">
              123 Green Lane<br />
              Farm Valley, CA 95123
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
