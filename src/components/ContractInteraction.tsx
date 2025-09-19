import { useState } from 'react';
import { useAccount, useContractWrite, useContractRead } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, Shield, Eye } from 'lucide-react';

// Contract ABI - This would be generated from your deployed contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"},
      {"internalType": "uint256", "name": "_duration", "type": "uint256"},
      {"internalType": "address", "name": "_streamer", "type": "address"}
    ],
    "name": "createSponsorshipDeal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "dealId", "type": "uint256"},
      {"internalType": "bytes", "name": "viewerCount", "type": "bytes"},
      {"internalType": "bytes", "name": "engagementRate", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "acceptDeal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "dealId", "type": "uint256"},
      {"internalType": "bytes", "name": "totalViews", "type": "bytes"},
      {"internalType": "bytes", "name": "totalEngagement", "type": "bytes"},
      {"internalType": "bytes", "name": "conversionRate", "type": "bytes"},
      {"internalType": "bytes", "name": "revenue", "type": "bytes"}
    ],
    "name": "reportPerformance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Contract address - Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual address

export function ContractInteraction() {
  const { address, isConnected } = useAccount();
  const [dealTitle, setDealTitle] = useState('');
  const [dealDescription, setDealDescription] = useState('');
  const [dealAmount, setDealAmount] = useState('');
  const [dealDuration, setDealDuration] = useState('');
  const [streamerAddress, setStreamerAddress] = useState('');
  const [dealId, setDealId] = useState('');
  const [performanceData, setPerformanceData] = useState({
    totalViews: '',
    totalEngagement: '',
    conversionRate: '',
    revenue: ''
  });

  // Contract write functions
  const { write: createDeal, isLoading: isCreatingDeal } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'createSponsorshipDeal',
    onSuccess: (data) => {
      console.log('Deal created successfully:', data);
      alert('Deal created successfully!');
    },
    onError: (error) => {
      console.error('Error creating deal:', error);
      alert('Error creating deal: ' + error.message);
    }
  });

  const { write: acceptDeal, isLoading: isAcceptingDeal } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'acceptDeal',
    onSuccess: () => {
      alert('Deal accepted successfully!');
    },
    onError: (error) => {
      console.error('Error accepting deal:', error);
      alert('Error accepting deal: ' + error.message);
    }
  });

  const { write: reportPerformance, isLoading: isReportingPerformance } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'reportPerformance',
    onSuccess: () => {
      alert('Performance reported successfully!');
    },
    onError: (error) => {
      console.error('Error reporting performance:', error);
      alert('Error reporting performance: ' + error.message);
    }
  });

  const handleCreateDeal = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!dealTitle || !dealDescription || !dealAmount || !dealDuration || !streamerAddress) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // In a real implementation, you would encrypt the amount using FHE
      // For now, we'll use the plain amount
      const encryptedAmount = await encryptData(dealAmount);
      const encryptedDuration = await encryptData(dealDuration);

      createDeal({
        args: [
          dealTitle,
          dealDescription,
          encryptedAmount,
          encryptedDuration,
          streamerAddress as `0x${string}`
        ]
      });
    } catch (error) {
      console.error('Error encrypting data:', error);
      alert('Error encrypting data');
    }
  };

  const handleAcceptDeal = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!dealId) {
      alert('Please enter a deal ID');
      return;
    }

    try {
      // In a real implementation, you would encrypt the performance data using FHE
      const encryptedViewerCount = await encryptData('1000'); // Example data
      const encryptedEngagementRate = await encryptData('0.85'); // Example data
      const inputProof = await generateProof(); // Generate FHE proof

      acceptDeal({
        args: [
          BigInt(dealId),
          encryptedViewerCount,
          encryptedEngagementRate,
          inputProof
        ]
      });
    } catch (error) {
      console.error('Error accepting deal:', error);
      alert('Error accepting deal');
    }
  };

  const handleReportPerformance = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!dealId || !performanceData.totalViews || !performanceData.totalEngagement) {
      alert('Please fill in all performance data');
      return;
    }

    try {
      // Encrypt performance data using FHE
      const encryptedTotalViews = await encryptData(performanceData.totalViews);
      const encryptedTotalEngagement = await encryptData(performanceData.totalEngagement);
      const encryptedConversionRate = await encryptData(performanceData.conversionRate);
      const encryptedRevenue = await encryptData(performanceData.revenue);

      reportPerformance({
        args: [
          BigInt(dealId),
          encryptedTotalViews,
          encryptedTotalEngagement,
          encryptedConversionRate,
          encryptedRevenue
        ]
      });
    } catch (error) {
      console.error('Error reporting performance:', error);
      alert('Error reporting performance');
    }
  };

  // Mock FHE encryption functions
  const encryptData = async (data: string): Promise<string> => {
    // In a real implementation, this would use FHE encryption
    // For now, we'll return a mock encrypted value
    return `0x${Buffer.from(data).toString('hex')}`;
  };

  const generateProof = async (): Promise<string> => {
    // In a real implementation, this would generate FHE proofs
    return `0x${Buffer.from('proof').toString('hex')}`;
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Contract Interaction
          </CardTitle>
          <CardDescription>
            Connect your wallet to interact with the FHE-encrypted smart contracts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              Please connect your wallet to access contract functions
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            FHE-Encrypted Contract Interaction
          </CardTitle>
          <CardDescription>
            Create and manage sponsorship deals with encrypted data using FHE
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dealTitle">Deal Title</Label>
              <Input
                id="dealTitle"
                value={dealTitle}
                onChange={(e) => setDealTitle(e.target.value)}
                placeholder="Enter deal title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dealAmount">Amount (ETH)</Label>
              <Input
                id="dealAmount"
                type="number"
                value={dealAmount}
                onChange={(e) => setDealAmount(e.target.value)}
                placeholder="0.1"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dealDescription">Description</Label>
            <Textarea
              id="dealDescription"
              value={dealDescription}
              onChange={(e) => setDealDescription(e.target.value)}
              placeholder="Enter deal description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dealDuration">Duration (days)</Label>
              <Input
                id="dealDuration"
                type="number"
                value={dealDuration}
                onChange={(e) => setDealDuration(e.target.value)}
                placeholder="30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streamerAddress">Streamer Address</Label>
              <Input
                id="streamerAddress"
                value={streamerAddress}
                onChange={(e) => setStreamerAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
          </div>

          <Button 
            onClick={handleCreateDeal} 
            disabled={isCreatingDeal}
            className="w-full"
          >
            {isCreatingDeal ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Encrypted Deal...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Create FHE-Encrypted Deal
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accept Deal & Report Performance
          </CardTitle>
          <CardDescription>
            Accept deals and report performance with encrypted metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dealId">Deal ID</Label>
            <Input
              id="dealId"
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
              placeholder="Enter deal ID"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalViews">Total Views</Label>
              <Input
                id="totalViews"
                type="number"
                value={performanceData.totalViews}
                onChange={(e) => setPerformanceData(prev => ({...prev, totalViews: e.target.value}))}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalEngagement">Total Engagement</Label>
              <Input
                id="totalEngagement"
                type="number"
                value={performanceData.totalEngagement}
                onChange={(e) => setPerformanceData(prev => ({...prev, totalEngagement: e.target.value}))}
                placeholder="8500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="conversionRate">Conversion Rate</Label>
              <Input
                id="conversionRate"
                type="number"
                step="0.01"
                value={performanceData.conversionRate}
                onChange={(e) => setPerformanceData(prev => ({...prev, conversionRate: e.target.value}))}
                placeholder="0.15"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue">Revenue (ETH)</Label>
              <Input
                id="revenue"
                type="number"
                step="0.001"
                value={performanceData.revenue}
                onChange={(e) => setPerformanceData(prev => ({...prev, revenue: e.target.value}))}
                placeholder="0.5"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleAcceptDeal} 
              disabled={isAcceptingDeal}
              variant="outline"
              className="flex-1"
            >
              {isAcceptingDeal ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accepting...
                </>
              ) : (
                'Accept Deal'
              )}
            </Button>
            <Button 
              onClick={handleReportPerformance} 
              disabled={isReportingPerformance}
              className="flex-1"
            >
              {isReportingPerformance ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Reporting...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Report Performance
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
