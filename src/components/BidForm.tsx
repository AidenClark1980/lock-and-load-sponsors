import { useState } from 'react';
import { useAccount, useContractWrite } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Star, 
  Lock, 
  Shield, 
  DollarSign, 
  Clock, 
  Target,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Contract ABI for bidding
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "uint256", "name": "dealId", "type": "uint256"},
      {"internalType": "bytes", "name": "bidAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "performanceCommitment", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "submitBid",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual address

interface BidFormProps {
  dealId: string;
  dealTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function BidForm({ dealId, dealTitle, onClose, onSuccess }: BidFormProps) {
  const { address, isConnected } = useAccount();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bidData, setBidData] = useState({
    amount: '',
    performanceCommitment: '',
    duration: '',
    platform: '',
    content: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { write: submitBid, isLoading: isSubmittingBid } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'submitBid',
    onSuccess: (data) => {
      console.log('Bid submitted successfully:', data);
      setIsSubmitting(false);
      onSuccess();
    },
    onError: (error) => {
      console.error('Error submitting bid:', error);
      setIsSubmitting(false);
      setErrors({ submit: 'Failed to submit bid: ' + error.message });
    }
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!bidData.amount || parseFloat(bidData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid bid amount';
    }

    if (!bidData.performanceCommitment) {
      newErrors.performanceCommitment = 'Please specify your performance commitment';
    }

    if (!bidData.duration) {
      newErrors.duration = 'Please select campaign duration';
    }

    if (!bidData.platform) {
      newErrors.platform = 'Please select your primary platform';
    }

    if (!bidData.content) {
      newErrors.content = 'Please describe your content strategy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!isConnected) {
      setErrors({ submit: 'Please connect your wallet first' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // In a real implementation, you would encrypt the bid data using FHE
      const encryptedAmount = await encryptData(bidData.amount);
      const encryptedPerformance = await encryptData(bidData.performanceCommitment);
      const inputProof = await generateProof();

      submitBid({
        args: [
          BigInt(dealId),
          encryptedAmount,
          encryptedPerformance,
          inputProof
        ]
      });
    } catch (error) {
      console.error('Error encrypting bid data:', error);
      setErrors({ submit: 'Error encrypting bid data' });
      setIsSubmitting(false);
    }
  };

  // Mock FHE encryption functions
  const encryptData = async (data: string): Promise<string> => {
    // In a real implementation, this would use FHE encryption
    return `0x${Buffer.from(data).toString('hex')}`;
  };

  const generateProof = async (): Promise<string> => {
    // In a real implementation, this would generate FHE proofs
    return `0x${Buffer.from('proof').toString('hex')}`;
  };

  const performanceOptions = [
    { value: "100k", label: "100K+ viewers per stream" },
    { value: "50k", label: "50K+ viewers per stream" },
    { value: "25k", label: "25K+ viewers per stream" },
    { value: "10k", label: "10K+ viewers per stream" },
    { value: "custom", label: "Custom commitment" }
  ];

  const platformOptions = [
    { value: "twitch", label: "Twitch" },
    { value: "youtube", label: "YouTube Gaming" },
    { value: "facebook", label: "Facebook Gaming" },
    { value: "tiktok", label: "TikTok Gaming" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter/X" }
  ];

  const durationOptions = [
    { value: "7", label: "1 Week" },
    { value: "14", label: "2 Weeks" },
    { value: "30", label: "1 Month" },
    { value: "60", label: "2 Months" },
    { value: "90", label: "3 Months" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5" />
                Submit Bid
              </CardTitle>
              <CardDescription>
                Bid for: <strong>{dealTitle}</strong>
              </CardDescription>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* FHE Security Notice */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong>FHE Encrypted Bid:</strong> Your bid amount and performance commitments 
              will be encrypted using Fully Homomorphic Encryption, ensuring complete 
              confidentiality until the deal is finalized.
            </AlertDescription>
          </Alert>

          {/* Bid Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Your Bid Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              value={bidData.amount}
              onChange={(e) => setBidData(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="Enter your bid amount"
              className={errors.amount ? 'border-red-500' : ''}
            />
            {errors.amount && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.amount}
              </p>
            )}
          </div>

          {/* Performance Commitment */}
          <div className="space-y-2">
            <Label htmlFor="performanceCommitment" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Performance Commitment
            </Label>
            <Select 
              value={bidData.performanceCommitment} 
              onValueChange={(value) => setBidData(prev => ({ ...prev, performanceCommitment: value }))}
            >
              <SelectTrigger className={errors.performanceCommitment ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select your performance commitment" />
              </SelectTrigger>
              <SelectContent>
                {performanceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.performanceCommitment && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.performanceCommitment}
              </p>
            )}
          </div>

          {/* Campaign Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Campaign Duration
            </Label>
            <Select 
              value={bidData.duration} 
              onValueChange={(value) => setBidData(prev => ({ ...prev, duration: value }))}
            >
              <SelectTrigger className={errors.duration ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select campaign duration" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.duration}
              </p>
            )}
          </div>

          {/* Primary Platform */}
          <div className="space-y-2">
            <Label htmlFor="platform" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Primary Platform
            </Label>
            <Select 
              value={bidData.platform} 
              onValueChange={(value) => setBidData(prev => ({ ...prev, platform: value }))}
            >
              <SelectTrigger className={errors.platform ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select your primary platform" />
              </SelectTrigger>
              <SelectContent>
                {platformOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.platform && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.platform}
              </p>
            )}
          </div>

          {/* Content Strategy */}
          <div className="space-y-2">
            <Label htmlFor="content" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Content Strategy
            </Label>
            <Textarea
              id="content"
              value={bidData.content}
              onChange={(e) => setBidData(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Describe your content strategy, streaming schedule, and how you'll promote the sponsor..."
              rows={4}
              className={errors.content ? 'border-red-500' : ''}
            />
            {errors.content && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.content}
              </p>
            )}
          </div>

          {/* Additional Information */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={bidData.additionalInfo}
              onChange={(e) => setBidData(prev => ({ ...prev, additionalInfo: e.target.value }))}
              placeholder="Any additional information, special requirements, or questions..."
              rows={3}
            />
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || isSubmittingBid}
              className="flex-1"
            >
              {isSubmitting || isSubmittingBid ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Encrypting & Submitting Bid...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Submit FHE-Encrypted Bid
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
