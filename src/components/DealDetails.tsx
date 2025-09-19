import { useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, 
  Clock, 
  Users, 
  TrendingUp, 
  Shield, 
  Lock, 
  Star,
  DollarSign,
  Calendar,
  Target,
  Activity
} from 'lucide-react';

// Mock contract ABI for reading deal details
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "dealId", "type": "uint256"}],
    "name": "getDealInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint8", "name": "amount", "type": "uint8"},
      {"internalType": "uint8", "name": "duration", "type": "uint8"},
      {"internalType": "uint8", "name": "viewerCount", "type": "uint8"},
      {"internalType": "uint8", "name": "engagementRate", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "sponsor", "type": "address"},
      {"internalType": "address", "name": "streamer", "type": "address"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual address

interface DealDetailsProps {
  dealId: string;
  onClose: () => void;
}

export function DealDetails({ dealId, onClose }: DealDetailsProps) {
  const { address, isConnected } = useAccount();
  const [showBidForm, setShowBidForm] = useState(false);

  // Mock deal data - in real implementation, this would come from contract
  const dealData = {
    title: "CS2 Major Championship Sponsorship",
    description: "Exclusive sponsorship opportunity for the upcoming CS2 Major Championship. Perfect for gaming brands looking to reach competitive esports audience.",
    amount: 5.5, // ETH
    duration: 30, // days
    viewerCount: 125000,
    engagementRate: 0.87,
    isActive: true,
    isVerified: true,
    sponsor: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    streamer: "0x8ba1f109551bD432803012645Hac136c",
    startTime: Date.now() - 86400000, // 1 day ago
    endTime: Date.now() + 2592000000, // 30 days from now
    category: "FPS",
    platform: "Twitch",
    language: "English",
    region: "Global",
    requirements: [
      "Minimum 100K followers",
      "Active streaming schedule",
      "Gaming content focus",
      "Professional setup"
    ],
    benefits: [
      "Brand logo placement",
      "Product mentions",
      "Social media promotion",
      "Revenue sharing"
    ]
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (days: number) => {
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} weeks`;
    return `${Math.floor(days / 30)} months`;
  };

  const isExpired = Date.now() > dealData.endTime;
  const timeRemaining = Math.max(0, dealData.endTime - Date.now());
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6" />
                {dealData.title}
              </CardTitle>
              <CardDescription className="text-base">
                {dealData.description}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              FHE Encrypted
            </Badge>
            <Badge variant={dealData.isVerified ? "default" : "destructive"}>
              {dealData.isVerified ? "Verified" : "Unverified"}
            </Badge>
            <Badge variant={isExpired ? "destructive" : "outline"}>
              {isExpired ? "Expired" : "Active"}
            </Badge>
            <Badge variant="outline">{dealData.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Deal Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                Sponsorship Amount
              </div>
              <div className="text-2xl font-bold">
                {dealData.amount} ETH
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  (~${(dealData.amount * 2500).toLocaleString()})
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="h-4 w-4" />
                Duration
              </div>
              <div className="text-2xl font-bold">
                {formatDuration(dealData.duration)}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Expected Reach
              </div>
              <div className="text-2xl font-bold">
                {dealData.viewerCount.toLocaleString()}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  viewers
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  Engagement Rate
                </div>
                <div className="text-xl font-bold">
                  {(dealData.engagementRate * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Platform
                </div>
                <div className="text-xl font-bold">
                  {dealData.platform}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Campaign Start</span>
                <span className="text-sm font-medium">
                  {formatTime(dealData.startTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Campaign End</span>
                <span className="text-sm font-medium">
                  {formatTime(dealData.endTime)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Time Remaining</span>
                <span className={`text-sm font-medium ${daysRemaining < 7 ? 'text-red-500' : 'text-green-500'}`}>
                  {daysRemaining} days
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Requirements & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Requirements</h3>
              <ul className="space-y-2">
                {dealData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Benefits</h3>
              <ul className="space-y-2">
                {dealData.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FHE Security Notice */}
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              <strong>FHE Encrypted:</strong> All financial data and performance metrics are encrypted using 
              Fully Homomorphic Encryption. Your sensitive information remains confidential until 
              campaign completion.
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {!isExpired && (
              <Button 
                onClick={() => setShowBidForm(true)}
                className="flex-1"
                disabled={!isConnected}
              >
                <Star className="mr-2 h-4 w-4" />
                Submit Bid
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
