import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Search, Trophy, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LEDFooter from "@/components/LEDFooter";

const BrowseDeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const deals = [
    {
      id: 1,
      tournament: "World Championship 2024",
      game: "League of Legends",
      status: "encrypted",
      value: "████████",
      sponsor: "████████",
      team: "████████",
      startDate: "2024-03-15",
      category: "MOBA"
    },
    {
      id: 2,
      tournament: "Global Masters",
      game: "CS2",
      status: "encrypted", 
      value: "████████",
      sponsor: "████████",
      team: "████████",
      startDate: "2024-03-20",
      category: "FPS"
    },
    {
      id: 3,
      tournament: "Spring Split Finals",
      game: "Valorant",
      status: "active",
      value: "$50,000",
      sponsor: "TechCorp",
      team: "Phoenix Squad",
      startDate: "2024-02-28",
      category: "FPS"
    },
    {
      id: 4,
      tournament: "International Cup",
      game: "Dota 2",
      status: "encrypted",
      value: "████████", 
      sponsor: "████████",
      team: "████████",
      startDate: "2024-04-10",
      category: "MOBA"
    }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.tournament.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.game.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                  <span className={`font-mono ${deal.status === "encrypted" ? "text-muted-foreground" : "text-accent font-bold"}`}>
                    {deal.value}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sponsor:</span>
                  <span className={`font-mono ${deal.status === "encrypted" ? "text-muted-foreground" : "text-foreground"}`}>
                    {deal.sponsor}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Team:</span>
                  <span className={`font-mono ${deal.status === "encrypted" ? "text-muted-foreground" : "text-foreground"}`}>
                    {deal.team}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Start Date:
                  </span>
                  <span className="text-accent">{deal.startDate}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                {deal.status === "encrypted" && (
                  <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                    <Lock className="w-4 h-4 mr-1" />
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
    </div>
  );
};

export default BrowseDeals;