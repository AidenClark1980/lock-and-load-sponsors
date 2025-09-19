import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock, Unlock, Trophy, Clock, DollarSign, Users, Eye, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LEDFooter from "@/components/LEDFooter";

interface Deal {
  id: number;
  sponsor: string;
  team: string;
  value: number | string;
  type: string;
  revealed: boolean;
}

interface Tournament {
  id: number;
  name: string;
  game: string;
  status: string;
  startTime: Date;
  deals: Deal[];
}

const TournamentStart = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("live");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tournaments: Tournament[] = [
    {
      id: 1,
      name: "World Championship 2024",
      game: "League of Legends",
      status: "starting",
      startTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      deals: [
        {
          id: 1,
          sponsor: "TechCorp Global",
          team: "Phoenix Squad",
          value: 75000,
          type: "Team Sponsorship",
          revealed: false
        },
        {
          id: 2,
          sponsor: "Gaming Gear Pro",
          team: "Dragon Force",
          value: 45000,
          type: "Equipment Sponsor",
          revealed: false
        }
      ]
    },
    {
      id: 2,
      name: "Spring Split Finals",
      game: "Valorant",
      status: "live",
      startTime: new Date(Date.now() - 30 * 60 * 1000), // Started 30 minutes ago
      deals: [
        {
          id: 3,
          sponsor: "Energy Drink Co",
          team: "Storm Riders",
          value: 60000,
          type: "Beverage Partner",
          revealed: true
        },
        {
          id: 4,
          sponsor: "Crypto Exchange",
          team: "Thunder Bolts",
          value: 90000,
          type: "Main Sponsor",
          revealed: true
        }
      ]
    },
    {
      id: 3,
      name: "International Cup",
      game: "Dota 2",
      status: "upcoming",
      startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      deals: [
        {
          id: 5,
          sponsor: "████████",
          team: "████████",
          value: "████████",
          type: "████████",
          revealed: false
        }
      ]
    }
  ];

  const getTimeUntilStart = (startTime: Date) => {
    const diff = startTime.getTime() - currentTime.getTime();
    if (diff <= 0) return "Started";
    
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "starting": return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "upcoming": return "bg-gradient-to-r from-blue-500 to-cyan-500";
      default: return "bg-gradient-to-r from-gray-500 to-slate-500";
    }
  };

  const liveTournaments = tournaments.filter(t => t.status === "live");
  const startingTournaments = tournaments.filter(t => t.status === "starting");
  const upcomingTournaments = tournaments.filter(t => t.status === "upcoming");

  const totalRevealedValue = tournaments
    .flatMap(t => t.deals)
    .filter(d => d.revealed && typeof d.value === 'number')
    .reduce((sum, d) => sum + (d.value as number), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Tournament Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Monitor tournament starts and sponsorship deal revelations in real-time
          </p>
          <div className="text-lg font-mono text-accent">
            Current Time: {currentTime.toLocaleTimeString()}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-card to-muted border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Live Tournaments</p>
                <p className="text-2xl font-bold text-green-500">{liveTournaments.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card to-muted border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Starting Soon</p>
                <p className="text-2xl font-bold text-yellow-500">{startingTournaments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card to-muted border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deals Revealed</p>
                <p className="text-2xl font-bold text-accent">
                  {tournaments.flatMap(t => t.deals).filter(d => d.revealed).length}
                </p>
              </div>
              <Unlock className="w-8 h-8 text-accent" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-card to-muted border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold text-primary">${totalRevealedValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Tournament Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </TabsTrigger>
            <TabsTrigger value="starting" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              Starting Soon
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Upcoming
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            {liveTournaments.map((tournament) => (
              <Card key={tournament.id} className="p-6 bg-gradient-to-r from-card to-muted border-green-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{tournament.name}</h3>
                    <p className="text-muted-foreground">{tournament.game}</p>
                  </div>
                  <Badge className={getStatusColor(tournament.status)}>
                    🔴 LIVE
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {tournament.deals.map((deal) => (
                    <Card key={deal.id} className="p-4 bg-gradient-to-br from-muted to-card border-accent/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Unlock className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-500">REVEALED</span>
                        </div>
                        <Badge variant="outline">{deal.type}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sponsor:</span>
                          <span className="font-semibold text-foreground">{deal.sponsor}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Team:</span>
                          <span className="font-semibold text-foreground">{deal.team}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value:</span>
                          <span className="font-bold text-accent">
                            {typeof deal.value === 'number' ? `$${deal.value.toLocaleString()}` : deal.value}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="starting" className="space-y-6">
            {startingTournaments.map((tournament) => (
              <Card key={tournament.id} className="p-6 bg-gradient-to-r from-card to-muted border-yellow-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{tournament.name}</h3>
                    <p className="text-muted-foreground">{tournament.game}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(tournament.status)}>
                      ⚡ STARTING
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Time: {getTimeUntilStart(tournament.startTime)}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-yellow-500">Preparing to reveal deals...</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {tournament.deals.map((deal) => (
                    <Card key={deal.id} className="p-4 bg-gradient-to-br from-muted to-card border-yellow-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-yellow-500 animate-pulse" />
                          <span className="text-sm font-medium text-yellow-500">ENCRYPTING...</span>
                        </div>
                        <Badge variant="outline">{deal.type}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sponsor:</span>
                          <span className="font-mono text-muted-foreground">Ready to reveal...</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Team:</span>
                          <span className="font-mono text-muted-foreground">Ready to reveal...</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value:</span>
                          <span className="font-mono text-muted-foreground">Ready to reveal...</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingTournaments.map((tournament) => (
              <Card key={tournament.id} className="p-6 bg-gradient-to-r from-card to-muted border-blue-500/30">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{tournament.name}</h3>
                    <p className="text-muted-foreground">{tournament.game}</p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(tournament.status)}>
                      ⏰ UPCOMING
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      Starts: {tournament.startTime.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {tournament.deals.map((deal) => (
                    <Card key={deal.id} className="p-4 bg-gradient-to-br from-muted to-card border-border">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">ENCRYPTED</span>
                        </div>
                        <Badge variant="outline">████████</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sponsor:</span>
                          <span className="font-mono text-muted-foreground">████████</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Team:</span>
                          <span className="font-mono text-muted-foreground">████████</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Value:</span>
                          <span className="font-mono text-muted-foreground">████████</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-muted to-card p-8 rounded-lg border border-border">
            <Eye className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4 text-foreground">Monitor Your Deals</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Stay updated on tournament schedules and deal revelations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse-deals">
                <Button size="lg" variant="outline">
                  Browse All Deals
                </Button>
              </Link>
              <Link to="/launch-sponsorship">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                  Create New Deal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <LEDFooter />
    </div>
  );
};

export default TournamentStart;