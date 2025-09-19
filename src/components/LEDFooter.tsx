const LEDFooter = () => {
  return (
    <footer className="relative bg-gradient-to-r from-background via-muted to-background border-t border-border overflow-hidden">
      {/* LED scrolling lights */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary">
        <div className="absolute inset-0 animate-led-scroll bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Encrypted Deals</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Tournament Hub</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">API Access</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-secondary">For Sponsors</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Create Campaigns</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Team Matching</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Performance Metrics</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">ROI Tracking</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-accent">For Teams</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Browse Opportunities</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Profile Builder</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Revenue Share</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contract Management</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Technology</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">FHE Encryption</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Smart Contracts</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blockchain Security</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Developer Docs</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-400"></div>
            <span className="text-muted-foreground ml-2">Secured by FHE Technology</span>
          </div>
          
          <div className="text-muted-foreground text-sm">
            © 2024 Confidential Esports Sponsorships. All rights reserved.
          </div>
        </div>
      </div>
      
      {/* Bottom LED strip */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-accent">
        <div className="absolute inset-0 animate-led-scroll bg-gradient-to-r from-transparent via-white to-transparent opacity-30 delay-1000"></div>
      </div>
    </footer>
  );
};

export default LEDFooter;