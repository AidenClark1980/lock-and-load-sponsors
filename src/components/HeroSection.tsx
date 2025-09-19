import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-background to-muted overflow-hidden">
      {/* Background stage effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-secondary to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-accent to-transparent rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Encrypted Esports
            <br />
            Sponsorship Deals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Revolutionary sponsorship platform using Fully Homomorphic Encryption to keep deals 
            confidential until tournament day, preventing competitor leaks and market manipulation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/launch-sponsorship">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6">
                Launch Sponsorship
              </Button>
            </Link>
            <Link to="/browse-deals">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-lg px-8 py-6">
                Browse Deals
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-gradient-to-br from-card to-muted border-primary/20 hover:border-primary/40 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary">FHE Encryption</h3>
              <p className="text-muted-foreground">
                Deals remain encrypted and confidential until the exact tournament moment, ensuring zero leaks.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-muted border-secondary/20 hover:border-secondary/40 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Shield className="w-8 h-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-secondary">Market Protection</h3>
              <p className="text-muted-foreground">
                Prevent competitors from accessing sensitive sponsorship information before official announcements.
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-card to-muted border-accent/20 hover:border-accent/40 transition-all duration-300 group">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-glow">
                <Zap className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-accent">Instant Reveal</h3>
              <p className="text-muted-foreground">
                Automated smart contracts reveal sponsorship details precisely when tournaments begin.
              </p>
            </div>
          </Card>
        </div>

        {/* Encrypted deal preview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Live Encrypted Deals</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((deal) => (
              <Card key={deal} className="p-6 bg-gradient-to-r from-muted to-card border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Tournament #{deal}</h4>
                      <p className="text-sm text-muted-foreground">Encrypted until start</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-accent">████████</div>
                    <div className="text-sm text-muted-foreground">Value hidden</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sponsor:</span>
                    <span className="font-mono">████████</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Team:</span>
                    <span className="font-mono">████████</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unlock:</span>
                    <span className="text-accent">Tournament Start</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;