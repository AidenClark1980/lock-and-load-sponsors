// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract LockAndLoadSponsors is SepoliaConfig {
    using FHE for *;
    
    struct SponsorshipDeal {
        euint32 dealId;
        euint32 amount;
        euint32 duration;
        euint32 viewerCount;
        euint32 engagementRate;
        bool isActive;
        bool isVerified;
        string title;
        string description;
        address sponsor;
        address streamer;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct PerformanceMetrics {
        euint32 totalViews;
        euint32 totalEngagement;
        euint32 conversionRate;
        euint32 revenue;
        bool isVerified;
        address verifier;
        uint256 timestamp;
    }
    
    struct StreamerProfile {
        euint32 reputation;
        euint32 totalEarnings;
        euint32 completedDeals;
        euint32 averageRating;
        bool isVerified;
        string name;
        string category;
        address wallet;
    }
    
    mapping(uint256 => SponsorshipDeal) public deals;
    mapping(uint256 => PerformanceMetrics) public metrics;
    mapping(address => StreamerProfile) public streamers;
    mapping(address => euint32) public sponsorReputation;
    
    uint256 public dealCounter;
    uint256 public metricCounter;
    
    address public owner;
    address public verifier;
    
    event DealCreated(uint256 indexed dealId, address indexed sponsor, address indexed streamer, string title);
    event DealAccepted(uint256 indexed dealId, address indexed streamer);
    event PerformanceReported(uint256 indexed metricId, uint256 indexed dealId, address indexed streamer);
    event PaymentProcessed(uint256 indexed dealId, address indexed streamer, uint32 amount);
    event StreamerRegistered(address indexed streamer, string name, string category);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createSponsorshipDeal(
        string memory _title,
        string memory _description,
        uint256 _amount,
        uint256 _duration,
        address _streamer
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        require(_streamer != address(0), "Invalid streamer address");
        
        uint256 dealId = dealCounter++;
        
        deals[dealId] = SponsorshipDeal({
            dealId: FHE.asEuint32(0), // Will be set properly later
            amount: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            duration: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            viewerCount: FHE.asEuint32(0),
            engagementRate: FHE.asEuint32(0),
            isActive: false,
            isVerified: false,
            title: _title,
            description: _description,
            sponsor: msg.sender,
            streamer: _streamer,
            startTime: 0,
            endTime: 0
        });
        
        emit DealCreated(dealId, msg.sender, _streamer, _title);
        return dealId;
    }
    
    function acceptDeal(
        uint256 dealId,
        externalEuint32 viewerCount,
        externalEuint32 engagementRate,
        bytes calldata inputProof
    ) public {
        require(deals[dealId].streamer == msg.sender, "Only designated streamer can accept");
        require(!deals[dealId].isActive, "Deal already active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalViewerCount = FHE.fromExternal(viewerCount, inputProof);
        euint32 internalEngagementRate = FHE.fromExternal(engagementRate, inputProof);
        
        deals[dealId].viewerCount = internalViewerCount;
        deals[dealId].engagementRate = internalEngagementRate;
        deals[dealId].isActive = true;
        deals[dealId].startTime = block.timestamp;
        deals[dealId].endTime = block.timestamp + 30 days; // Default duration
        
        emit DealAccepted(dealId, msg.sender);
    }
    
    function reportPerformance(
        uint256 dealId,
        euint32 totalViews,
        euint32 totalEngagement,
        euint32 conversionRate,
        euint32 revenue
    ) public returns (uint256) {
        require(deals[dealId].streamer == msg.sender, "Only streamer can report performance");
        require(deals[dealId].isActive, "Deal must be active");
        
        uint256 metricId = metricCounter++;
        
        metrics[metricId] = PerformanceMetrics({
            totalViews: totalViews,
            totalEngagement: totalEngagement,
            conversionRate: conversionRate,
            revenue: revenue,
            isVerified: false,
            verifier: address(0),
            timestamp: block.timestamp
        });
        
        emit PerformanceReported(metricId, dealId, msg.sender);
        return metricId;
    }
    
    function verifyPerformance(uint256 metricId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify performance");
        require(metrics[metricId].timestamp > 0, "Metric does not exist");
        
        metrics[metricId].isVerified = isVerified;
        metrics[metricId].verifier = msg.sender;
    }
    
    function processPayment(
        uint256 dealId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(deals[dealId].sponsor == msg.sender, "Only sponsor can process payment");
        require(deals[dealId].isActive, "Deal must be active");
        require(block.timestamp >= deals[dealId].endTime, "Deal period not ended");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update streamer earnings
        streamers[deals[dealId].streamer].totalEarnings = FHE.add(
            streamers[deals[dealId].streamer].totalEarnings, 
            internalAmount
        );
        
        // Update completed deals count
        streamers[deals[dealId].streamer].completedDeals = FHE.add(
            streamers[deals[dealId].streamer].completedDeals, 
            FHE.asEuint32(1)
        );
        
        deals[dealId].isActive = false;
        
        emit PaymentProcessed(dealId, deals[dealId].streamer, 0); // Amount will be decrypted off-chain
    }
    
    function registerStreamer(
        string memory _name,
        string memory _category
    ) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_category).length > 0, "Category cannot be empty");
        require(streamers[msg.sender].wallet == address(0), "Streamer already registered");
        
        streamers[msg.sender] = StreamerProfile({
            reputation: FHE.asEuint32(0),
            totalEarnings: FHE.asEuint32(0),
            completedDeals: FHE.asEuint32(0),
            averageRating: FHE.asEuint32(0),
            isVerified: false,
            name: _name,
            category: _category,
            wallet: msg.sender
        });
        
        emit StreamerRegistered(msg.sender, _name, _category);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        if (streamers[user].wallet != address(0)) {
            streamers[user].reputation = reputation;
        } else {
            sponsorReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getDealInfo(uint256 dealId) public view returns (
        string memory title,
        string memory description,
        uint8 amount,
        uint8 duration,
        uint8 viewerCount,
        uint8 engagementRate,
        bool isActive,
        bool isVerified,
        address sponsor,
        address streamer,
        uint256 startTime,
        uint256 endTime
    ) {
        SponsorshipDeal storage deal = deals[dealId];
        return (
            deal.title,
            deal.description,
            0, // FHE.decrypt(deal.amount) - will be decrypted off-chain
            0, // FHE.decrypt(deal.duration) - will be decrypted off-chain
            0, // FHE.decrypt(deal.viewerCount) - will be decrypted off-chain
            0, // FHE.decrypt(deal.engagementRate) - will be decrypted off-chain
            deal.isActive,
            deal.isVerified,
            deal.sponsor,
            deal.streamer,
            deal.startTime,
            deal.endTime
        );
    }
    
    function getStreamerInfo(address streamer) public view returns (
        string memory name,
        string memory category,
        uint8 reputation,
        uint8 totalEarnings,
        uint8 completedDeals,
        uint8 averageRating,
        bool isVerified
    ) {
        StreamerProfile storage profile = streamers[streamer];
        return (
            profile.name,
            profile.category,
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            0, // FHE.decrypt(profile.totalEarnings) - will be decrypted off-chain
            0, // FHE.decrypt(profile.completedDeals) - will be decrypted off-chain
            0, // FHE.decrypt(profile.averageRating) - will be decrypted off-chain
            profile.isVerified
        );
    }
    
    function getPerformanceMetrics(uint256 metricId) public view returns (
        uint8 totalViews,
        uint8 totalEngagement,
        uint8 conversionRate,
        uint8 revenue,
        bool isVerified,
        address verifier,
        uint256 timestamp
    ) {
        PerformanceMetrics storage metric = metrics[metricId];
        return (
            0, // FHE.decrypt(metric.totalViews) - will be decrypted off-chain
            0, // FHE.decrypt(metric.totalEngagement) - will be decrypted off-chain
            0, // FHE.decrypt(metric.conversionRate) - will be decrypted off-chain
            0, // FHE.decrypt(metric.revenue) - will be decrypted off-chain
            metric.isVerified,
            metric.verifier,
            metric.timestamp
        );
    }
    
    function getSponsorReputation(address sponsor) public view returns (uint8) {
        return 0; // FHE.decrypt(sponsorReputation[sponsor]) - will be decrypted off-chain
    }
}
