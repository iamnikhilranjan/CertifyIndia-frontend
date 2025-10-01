import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Verify Certificate", path: "/verify" },
    { name: "My Certificates", path: "/certificates" },
    { name: "Issue Certificate", path: "/issue" },
    { name: "Manage Roles", path: "/roles" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setWalletConnected(true);
    setWalletAddress("0x742d...5e2f");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="h-8 w-8 text-accent transition-all group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              CertifyIndia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-all duration-200 relative group",
                  isActive(item.path)
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full shadow-neon" />
                )}
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent rounded-full opacity-0 group-hover:opacity-50 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Wallet Button */}
          <div className="hidden md:block">
            {walletConnected ? (
              <Button variant="wallet" className="gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                {walletAddress}
              </Button>
            ) : (
              <Button variant="neon" onClick={handleConnectWallet}>
                Connect Wallet
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-2 px-4 rounded-lg transition-all",
                  isActive(item.path)
                    ? "bg-accent/10 text-accent border-l-4 border-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-card"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border">
              {walletConnected ? (
                <Button variant="wallet" className="w-full gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow" />
                  {walletAddress}
                </Button>
              ) : (
                <Button variant="neon" className="w-full" onClick={handleConnectWallet}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
