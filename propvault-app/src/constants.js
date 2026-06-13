
export const PROPERTY_TYPES = [
  { value: 'flat', label: 'Flat / Apartment', icon: '🏢' },
  { value: 'house', label: 'Independent House / Bungalow', icon: '🏡' },
  { value: 'land', label: 'Land / Plot', icon: '🌿' },
  { value: 'agri', label: 'Agricultural Land', icon: '🌾' },
  { value: 'shop', label: 'Commercial Shop', icon: '🏪' },
  { value: 'office', label: 'Commercial Office', icon: '🏢' },
  { value: 'warehouse', label: 'Warehouse / Industrial', icon: '🏭' },
  { value: 'villa', label: 'Villa / Farmhouse', icon: '🏘️' },
];

export const PROPERTY_STATUSES = [
  'Available', 'Reserved', 'Under Negotiation', 'Token Received',
  'Agreement in Process', 'Sold', 'Rented', 'Withdrawn'
];

export const AMENITIES = [
  'Lift / Elevator', '24hr Security', 'CCTV Surveillance', 'Swimming Pool',
  'Gymnasium', 'Clubhouse', 'Children Play Area', 'Garden / Park',
  'Power Backup', 'Bore Well / Water Tank', 'Covered Parking', 'Visitor Parking',
  'Piped Gas', 'Intercom System', 'Fire Safety', 'Rainwater Harvesting',
  'Solar Panels', 'Jogging Track', 'Indoor Games', 'Senior Citizen Area'
];

export const FACING_OPTIONS = ['North', 'South', 'East', 'West', 'North-East', 'North-West', 'South-East', 'South-West'];

export const typeLabel = (t) => PROPERTY_TYPES.find(p => p.value === t)?.label || t;
export const typeIcon = (t) => PROPERTY_TYPES.find(p => p.value === t)?.icon || '🏠';

export const formatPrice = (p, unit) => {
  if (!p) return '₹0';
  if (unit === 'per_sqft') return '₹' + p.toLocaleString('en-IN') + '/sq.ft';
  if (p >= 10000000) return '₹' + (p / 10000000).toFixed(2) + ' Cr';
  if (p >= 100000) return '₹' + (p / 100000).toFixed(2) + ' L';
  return '₹' + p.toLocaleString('en-IN');
};

export const DEFAULT_PROPERTIES = [
  {
    id: 'p1',
    title: 'Luxury 3 BHK — Skyline Residency, Baner',
    type: 'flat',
    status: 'Available',
    price: 8500000, priceType: 'negotiable', priceUnit: 'total',
    address: 'Plot 12, Baner Road', locality: 'Baner', city: 'Pune', state: 'Maharashtra',
    country: 'India', pincode: '411045', facing: 'East',
    mapLink: 'https://maps.google.com', lat: '18.5590', lng: '73.7868',
    area: 1450, buildup: 1280, carpet: 1100, plot: '',
    beds: 3, baths: 2, balc: 2, floor: 7, tfloors: 15,
    furnish: 'semi', parking: 'car', ownership: 'freehold', age: '1-5',
    projectName: 'Skyline Residency', tower: 'A', flatNo: '701',
    amenities: ['Lift / Elevator', '24hr Security', 'Swimming Pool', 'Gymnasium', 'Covered Parking', 'Power Backup'],
    highlights: ['Corner unit', 'City view from balcony', 'Vastu compliant'],
    desc: 'Spacious 3 BHK in a premium gated community with world-class amenities.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
    ],
    docs: [],
    ownerName: 'Rajesh Sharma', ownerContact: '9876543210', altContact: '',
    hasAgent: false, agentName: '', agentCount: 1,
    sourceOfLead: 'Direct',
    createdAt: Date.now() - 864e5 * 5
  },
  {
    id: 'p2',
    title: 'Prime Corner NA Plot — Hinjewadi Phase 2',
    type: 'land',
    status: 'Available',
    price: 3200000, priceType: 'fixed', priceUnit: 'total',
    address: 'Survey No. 44, Hinjewadi', locality: 'Hinjewadi Phase 2', city: 'Pune',
    state: 'Maharashtra', country: 'India', pincode: '411057', facing: 'North',
    mapLink: '', lat: '', lng: '',
    area: 2400, buildup: 0, carpet: 0, plot: '30×80 ft',
    beds: 0, baths: 0, balc: 0, floor: 0, tfloors: 0,
    surveyNo: '44', gatNo: '', ctsNo: '', propertyCardNo: '',
    areaUnit: 'Sq Ft', frontage: '30', depth: '80',
    landClassification: 'Non-Agricultural (NA)',
    roadTouch: true, roadWidth: '30', electricityAvailable: true,
    waterAvailable: true, drainageAvailable: false,
    ownership: 'freehold', age: 'new',
    amenities: [],
    highlights: ['Clear NA title', 'Corner plot', 'Road facing', 'Ideal for duplex'],
    desc: 'Clear title non-agricultural plot in Pune\'s fastest growing corridor.',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop'],
    docs: [],
    ownerName: 'Suresh Patil', ownerContact: '9123456789', altContact: '',
    hasAgent: false, agentName: '', agentCount: 1,
    sourceOfLead: 'Reference',
    createdAt: Date.now() - 864e5 * 10
  },
];
