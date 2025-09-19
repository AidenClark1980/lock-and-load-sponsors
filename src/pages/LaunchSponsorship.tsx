import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Lock, Shield, Calendar, DollarSign, Users, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import LEDFooter from "@/components/LEDFooter";

const LaunchSponsorship = () => {
  const [formData, setFormData] = useState({
    tournament: "",
    game: "",
    sponsorshipValue: "",
    targetTeam: "",
    startDate: "",
    endDate: "",
    description: "",
    category: "",
    autoReveal: true,
    requiresApproval: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Launch Sponsorship Deal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create encrypted sponsorship deals that remain confidential until tournament day
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                    <Trophy className="w-6 h-6 text-primary" />
                    Tournament Details
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tournament">Tournament Name</Label>
                      <Input
                        id="tournament"
                        placeholder="e.g., World Championship 2024"
                        value={formData.tournament}
                        onChange={(e) => updateFormData("tournament", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="game">Game</Label>
                      <Select value={formData.game} onValueChange={(value) => updateFormData("game", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lol">League of Legends</SelectItem>
                          <SelectItem value="cs2">Counter-Strike 2</SelectItem>
                          <SelectItem value="valorant">Valorant</SelectItem>
                          <SelectItem value="dota2">Dota 2</SelectItem>
                          <SelectItem value="overwatch">Overwatch 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => updateFormData("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moba">MOBA</SelectItem>
                          <SelectItem value="fps">FPS</SelectItem>
                          <SelectItem value="rts">RTS</SelectItem>
                          <SelectItem value="fighting">Fighting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetTeam">Target Team (Optional)</Label>
                      <Input
                        id="targetTeam"
                        placeholder="e.g., Phoenix Squad"
                        value={formData.targetTeam}
                        onChange={(e) => updateFormData("targetTeam", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                    <DollarSign className="w-6 h-6 text-accent" />
                    Sponsorship Value
                  </h2>
                  
                  <div>
                    <Label htmlFor="sponsorshipValue">Amount (USD)</Label>
                    <Input
                      id="sponsorshipValue"
                      type="number"
                      placeholder="50000"
                      value={formData.sponsorshipValue}
                      onChange={(e) => updateFormData("sponsorshipValue", e.target.value)}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                    <Calendar className="w-6 h-6 text-secondary" />
                    Timeline
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Tournament Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData("startDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Tournament End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => updateFormData("endDate", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-foreground">Description</h2>
                  <Textarea
                    placeholder="Describe the sponsorship deal, requirements, and expectations..."
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Settings */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 text-foreground">
                    <Shield className="w-6 h-6 text-primary" />
                    Encryption Settings
                  </h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoReveal"
                        checked={formData.autoReveal}
                        onCheckedChange={(checked) => updateFormData("autoReveal", checked as boolean)}
                      />
                      <Label htmlFor="autoReveal" className="text-sm">
                        Auto-reveal deal when tournament starts
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="requiresApproval"
                        checked={formData.requiresApproval}
                        onCheckedChange={(checked) => updateFormData("requiresApproval", checked as boolean)}
                      />
                      <Label htmlFor="requiresApproval" className="text-sm">
                        Require team approval before encryption
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary text-lg py-6">
                    <Lock className="w-5 h-5 mr-2" />
                    Launch Encrypted Deal
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Encryption Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                FHE Encryption
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-accent mt-0.5" />
                  <span className="text-muted-foreground">
                    Deal details encrypted until tournament start
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-secondary mt-0.5" />
                  <span className="text-muted-foreground">
                    No competitor access to sensitive information
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-accent mt-0.5" />
                  <span className="text-muted-foreground">
                    Automatic reveal via smart contracts
                  </span>
                </div>
              </div>
            </Card>

            {/* Process Steps */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Process Steps</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-primary to-secondary">1</Badge>
                  <span className="text-sm text-muted-foreground">Submit sponsorship details</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">2</Badge>
                  <span className="text-sm text-muted-foreground">FHE encryption applied</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">3</Badge>
                  <span className="text-sm text-muted-foreground">Deal goes live for bidding</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">4</Badge>
                  <span className="text-sm text-muted-foreground">Auto-reveal on tournament day</span>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/browse-deals">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Existing Deals
                  </Button>
                </Link>
                <Link to="/tournament-start">
                  <Button variant="outline" className="w-full justify-start">
                    Tournament Dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <LEDFooter />
    </div>
  );
};

export default LaunchSponsorship;