import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Search, Trophy, Clock, DollarSign, Eye, Star, Users, TrendingUp, Target, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LEDFooter from "@/components/LEDFooter";
import { DealDetails } from "@/components/DealDetails";
import { BidForm } from "@/components/BidForm";

const BrowseDeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);

  const deals = [
    {
      id: "1",
      tournament: "CS2 Major Championship",
      game: "Counter-Strike 2",
      status: "encrypted",
      value: 5.5,
      sponsor: "████████",
      team: "████████",
      startDate: "2024-03-15",
      category: "FPS",
      platform: "Twitch",
      viewerCount: 125000,
      engagementRate: 0.87,
      duration: 30,
      timeRemaining: 15
    },
    {
      id: "2",
      tournament: "Valorant Champions Tour",
      game: "Valorant",
      status: "encrypted", 
      value: 3.2,
      sponsor: "████████",
      team: "████████",
      startDate: "2024-03-20",
      category: "FPS",
      platform: "YouTube",
      viewerCount: 85000,
      engagementRate: 0.92,
      duration: 45,
      timeRemaining: 8
    },
    {
      id: "3",
      tournament: "League of Legends Worlds",
      game: "League of Legends",
      status: "encrypted",
      value: 8.0,
      sponsor: "████████",
      team: "████████",
      startDate: "2024-04-10",
      category: "MOBA",
      platform: "Twitch",
      viewerCount: 200000,
      engagementRate: 0.89,
      duration: 60,
      timeRemaining: 22
    },
    {
      id: "4",
      tournament: "Fortnite Championship Series",
      game: "Fortnite",
      status: "encrypted",
      value: 2.8,
      sponsor: "████████",
      team: "████████",
      startDate: "2024-02-28",
      category: "Battle Royale",
      platform: "Twitch",
      viewerCount: 65000,
      engagementRate: 0.85,
      duration: 21,
      timeRemaining: 5
    }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.tournament.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (dealId: string) => {
    setSelectedDeal(dealId);
  };

  const handleCloseDetails = () => {
    setSelectedDeal(null);
  };

  const handleBidSuccess = () => {
    setShowBidForm(false);
    setSelectedDeal(null);
  };

  const formatAmount = (amount: number) => {
    return `${amount} ETH`;
  };

  const formatViewerCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const getTimeRemainingColor = (days: number) => {
    if (days < 7) return 'text-red-500';
    if (days < 14) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Browse Sponsorship Deals
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover encrypted sponsorship opportunities across major esports tournaments
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search tournaments or games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Deals</SelectItem>
              <SelectItem value="encrypted">Encrypted</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDeals.map((deal) => (
            <Card key={deal.id} className="p-6 bg-gradient-to-br from-card to-muted border-border hover:border-primary/30 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={deal.status === "encrypted" ? "secondary" : "default"} 
                       className="bg-gradient-to-r from-primary to-secondary">
                  {deal.status === "encrypted" ? "🔒 Encrypted" : "🔓 Active"}
                </Badge>
                <Badge variant="outline">{deal.category}</Badge>
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground">{deal.tournament}</h3>
              <p className="text-muted-foreground mb-4">{deal.game}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Value:
                  </span>
                  <span className="font-bold text-accent">
                    {formatAmount(deal.value)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Reach:
                  </span>
                  <span className="font-semibold">
                    {formatViewerCount(deal.viewerCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Engagement:
                  </span>
                  <span className="font-semibold">
                    {(deal.engagementRate * 100).toFixed(0)}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Platform:
                  </span>
                  <span className="font-semibold">{deal.platform}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Duration:
                  </span>
                  <span className="font-semibold">{deal.duration} days</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Time Remaining:</span>
                  <span className={`font-semibold ${getTimeRemainingColor(deal.timeRemaining)}`}>
                    {deal.timeRemaining} days
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-3 w-3 text-green-500" />
                  <span className="text-green-600 font-medium">FHE Encrypted</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleViewDetails(deal.id)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                {deal.status === "encrypted" && (
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      setSelectedDeal(deal.id);
                      setShowBidForm(true);
                    }}
                  >
                    <Star className="w-4 h-4 mr-1" />
                    Bid
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-muted to-card p-8 rounded-lg border border-border">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4 text-foreground">Want to Launch Your Own Deal?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Create encrypted sponsorship deals and connect with top esports teams
            </p>
            <Link to="/launch-sponsorship">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Launch Sponsorship
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <LEDFooter />

      {/* Deal Details Modal */}
      {selectedDeal && !showBidForm && (
        <DealDetails 
          dealId={selectedDeal} 
          onClose={handleCloseDetails}
        />
      )}

      {/* Bid Form Modal */}
      {selectedDeal && showBidForm && (
        <BidForm 
          dealId={selectedDeal}
          dealTitle={deals.find(d => d.id === selectedDeal)?.tournament || ''}
          onClose={() => setShowBidForm(false)}
          onSuccess={handleBidSuccess}
        />
      )}
    </div>
  );
};

export default BrowseDeals;