import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/WalletButton";
import { Link } from "react-router-dom";
import esportsLogo from "@/assets/esports-logo.png";

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-background to-muted border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={esportsLogo} 
              alt="Lock and Load Sponsors"
              className="w-12 h-12 animate-pulse-glow"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Lock and Load Sponsors
              </h1>
              <p className="text-sm text-muted-foreground">
                Secure esports sponsorship platform with FHE encryption
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/browse-deals">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Browse Deals
              </Button>
            </Link>
            <WalletButton />
          </div>
        </div>
      </div>
      
      {/* Stage lighting effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>
    </header>
  );
};

export default Header;