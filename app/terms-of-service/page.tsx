import Link from 'next/link'
import { FileText, Phone, ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function TermsOfServicePage() {
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
                                    <FileText className="w-7 h-7" />
                                </div>
                                <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
                                    BE GREEN
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold">
                                Terms of Service
                            </h1>

                            <p className="mt-3 text-primary-foreground/80">
                                Terms for ordering Be Green Microgreens.
                            </p>
                        </div>

                        <div className="p-8 sm:p-12 space-y-8 text-foreground/70 leading-relaxed">
                            <p>
                                By placing an order with <strong className="text-foreground">Be Green Microgreens</strong>, you agree to the following terms:
                            </p>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    1. Orders &amp; Confirmation
                                </h2>
                                <p>
                                    All orders must be confirmed via WhatsApp or direct communication. Orders are processed based on availability. Pre-booking is available to ensure fresh supply.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    2. Delivery
                                </h2>
                                <p>
                                    We aim to deliver fresh microgreens within 24 hours of harvest. Delivery timings may vary based on location.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    3. No Returns Policy
                                </h2>
                                <p>
                                    As microgreens are fresh and perishable products, we do not accept returns or exchanges once delivered.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    4. Quality Assurance
                                </h2>
                                <p>
                                    We ensure hygienic growing and packing conditions. Any issues must be reported immediately upon delivery.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    5. Payments
                                </h2>
                                <p>
                                    Payments must be completed as per the agreed method before or at the time of delivery.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    6. Subscription Plans
                                </h2>
                                <p>
                                    Customers opting for weekly or monthly subscriptions will receive regular deliveries as agreed. Subscription benefits such as free delivery may apply.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-2">
                                    7. Changes to Terms
                                </h2>
                                <p>
                                    Be Green Microgreens reserves the right to update these terms at any time without prior notice.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-muted p-6">
                                <p className="font-semibold text-foreground mb-2">
                                    Questions about these terms?
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