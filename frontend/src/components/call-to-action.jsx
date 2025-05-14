import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      {/* Sección de inicio de viaje NFT */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your NFT Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of creators and collectors on Buterin today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/explore">Explore Marketplace</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/create">Create Your First NFT</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de suscripción al boletín */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest drops and marketplace updates.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
