import Link from 'next/link'
import { ShieldCheck, Phone, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <div className="rounded-3xl bg-white border border-border shadow-sm overflow-hidden">
                        <div className="bg-primary px-8 sm:px-12 py-10 text-primary-foreground">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                                    <ShieldCheck className="w-7 h-7" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                                    BE GREEN
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Privacy Policy
                            </h1>

                            <p className="mt-3 text-primary-foreground/80">
                                How we collect and use your information.
                            </p>
                        </div>

                        <div className="p-8 sm:p-12 space-y-6 text-foreground/70 leading-relaxed">
                            <p>
                                At <strong className="text-foreground">Be Green Microgreens</strong>, we value your privacy and are committed to protecting your personal information.
                            </p>

                            <p>
                                We collect basic details such as your name, phone number, and delivery address only for the purpose of processing and delivering your orders. This information is used solely to provide our services efficiently and to communicate with you regarding your orders.
                            </p>

                            <p>
                                We do not sell, share, or disclose your personal information to any third parties, except when required for delivery purposes.
                            </p>

                            <p>
                                All customer data is handled securely and responsibly. By placing an order with us, you agree to the collection and use of your information as described in this policy.
                            </p>

                            <div className="mt-10 rounded-2xl bg-muted p-6">
                                <p className="font-semibold text-foreground mb-2">
                                    Questions about your data?
                                </p>

                                <a
                                    href="tel:+919656207196"
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    +91 96562 07196
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}