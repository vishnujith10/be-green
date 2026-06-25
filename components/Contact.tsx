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
              href="https://mail.google.com/mail/?view=cm&fs=1&to=begreen0406@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              begreen0406@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="rounded-2xl bg-background p-8 border border-border text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-muted mb-4">
              <Phone className="h-7 w-7 text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">Phone</h3>

            <p className="text-foreground/60 text-sm mt-2">
              Call or WhatsApp us for orders and assistance
            </p>

            <a
              href="tel:+919656207196"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              +91 96562 07196
            </a>
          </div>

          {/* Address */}
          <div className="rounded-2xl bg-background p-8 border border-border text-center hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-muted mb-4">
              <MapPin className="h-7 w-7 text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">Visit Us</h3>

            <p className="text-foreground/60 text-sm mt-2">
              Find our farm location on Google Maps
            </p>

            <a
              href="https://maps.app.goo.gl/pER6PcmRNU2cKt3w6?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              View Location on Map
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
