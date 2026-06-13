import React, { useState, useEffect } from 'react';

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const AMENITIES = [
  'Lift / Elevator', '24hr Security', 'CCTV Surveillance', 'Swimming Pool',
  'Gymnasium', 'Clubhouse', 'Children Play Area', 'Garden / Park',
  'Power Backup', 'Bore Well / Water Tank', 'Covered Parking', 'Visitor Parking',
  'Piped Gas', 'Intercom System', 'Fire Safety', 'Rainwater Harvesting',
  'Solar Panels', 'Jogging Track', 'Indoor Games', 'Senior Citizen Area'
];

const DEFAULT_PROPERTIES = [
  {
    id: 'p1',
    title: 'Luxury 3 BHK — Skyline Residency, Baner',
    type: 'flat',
    status: 'available',
    price: 8500000,
    priceType: 'negotiable',
    priceUnit: 'total',
    address: 'Plot 12, Baner Road',
    locality: 'Baner',
    city: 'Pune',
    pincode: '411045',
    facing: 'East',
    mapLink: 'https://maps.google.com',
    area: 1450,
    buildup: 1280,
    carpet: 1100,
    plot: '',
    beds: 3,
    baths: 2,
    balc: 2,
    floor: 7,
    tfloors: 15,
    furnish: 'semi',
    parking: 'car',
    ownership: 'freehold',
    age: '1-5',
    possession: '2025-03-01',
    amenities: ['Lift / Elevator', '24hr Security', 'Swimming Pool', 'Gymnasium', 'Covered Parking', 'Power Backup', 'CCTV Surveillance'],
    highlights: ['Corner unit', 'City view from balcony', 'Vastu compliant', 'Premium Italian marble'],
    desc: 'Spacious 3 BHK in a premium gated community with world-class amenities. Just 5 min from Balewadi High Street and 10 min from Hinjewadi IT Park. The apartment features Italian marble flooring, modular kitchen, and a stunning east-facing balcony with city views.',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop'
    ],
    docs: [{ name: 'Title Deed', type: 'title_deed', url: 'https://example.com/doc', adminOnly: false }],
    createdAt: Date.now() - 864e5 * 5
  },
  {
    id: 'p2',
    title: 'Prime Corner NA Plot — Hinjewadi Phase 2',
    type: 'land',
    status: 'available',
    price: 3200000,
    priceType: 'fixed',
    priceUnit: 'total',
    address: 'Survey No. 44, Hinjewadi',
    locality: 'Hinjewadi Phase 2',
    city: 'Pune',
    pincode: '411057',
    facing: 'North',
    mapLink: '',
    area: 2400,
    buildup: 0,
    carpet: 0,
    plot: '30×80 ft',
    beds: 0,
    baths: 0,
    balc: 0,
    floor: 0,
    tfloors: 0,
    furnish: '',
    parking: '',
    ownership: 'freehold',
    age: 'new',
    possession: '',
    amenities: [],
    highlights: ['Clear NA title', 'Corner plot', 'Road facing', 'Ideal for duplex bungalow', 'Ready for construction'],
    desc: "Clear title non-agricultural plot in Pune's fastest growing corridor. Strategically located near Infosys and Wipro campuses. 30×80 ft plot ideal for a duplex bungalow. All utilities available — electricity, water, drainage.",
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop'
    ],
    docs: [],
    createdAt: Date.now() - 864e5 * 10
  },
  {
    id: 'p3',
    title: 'Heritage Bungalow — North Main Road, Koregaon Park',
    type: 'bungalow',
    status: 'reserved',
    price: 45000000,
    priceType: 'negotiable',
    priceUnit: 'total',
    address: 'Lane 5, North Main Road',
    locality: 'Koregaon Park',
    city: 'Pune',
    pincode: '411001',
    facing: 'North-East',
    mapLink: '',
    area: 4800,
    buildup: 3200,
    carpet: 2800,
    plot: '80×60 ft',
    beds: 5,
    baths: 5,
    balc: 3,
    floor: 0,
    tfloors: 2,
    furnish: 'fully',
    parking: 'both',
    ownership: 'freehold',
    age: '10+',
    possession: '2024-06-01',
    amenities: ['24hr Security', 'Garden / Park', 'Covered Parking', 'Intercom System', 'Swimming Pool', 'CCTV Surveillance'],
    highlights: ['Heritage property', '5000 sq.ft landscaped lawn', 'Original teak woodwork', 'Classic Pune bungalow', 'Rare Koregaon Park find'],
    desc: 'Rare opportunity to own a classic pre-independence Pune bungalow in the heart of Koregaon Park. Sprawling lawn, original teak floors, and period-correct architecture fully restored to modern standards. One of the last grand bungalows in the area.',
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop'
    ],
    docs: [],
    createdAt: Date.now() - 864e5 * 2
  }
];

// ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────
function formatPrice(p, unit) {
  if (!p) return '₹0';
  if (unit === 'per_sqft') return '₹' + p.toLocaleString('en-IN') + '/sq.ft';
  if (p >= 10000000) return '₹' + (p / 10000000).toFixed(2) + ' Cr';
  if (p >= 100000) return '₹' + (p / 100000).toFixed(2) + ' L';
  return '₹' + p.toLocaleString('en-IN');
}

function typeLabel(t) {
  return { flat: 'Flat', bungalow: 'Bungalow', land: 'Land', commercial: 'Commercial' }[t] || t;
}

function typeIcon(t) {
  return { flat: '🏢', bungalow: '🏡', land: '🌿', commercial: '🏪' }[t] || '🏠';
}

export default function App() {
  // ─── GLOBAL STATE ──────────────────────────────────────────────────────────
  const [props, setProps] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_props');
      return saved ? JSON.parse(saved) : DEFAULT_PROPERTIES;
    } catch (e) {
      return DEFAULT_PROPERTIES;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('pv_inq');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState('public'); // public, admin-login, admin
  const [publicSection, setPublicSection] = useState('home'); // home, listings
  const [adminSection, setAdminSection] = useState('dashboard'); // dashboard, properties, add-property, inquiries

  // ─── FILTER & SORT STATE ───────────────────────────────────────────────────
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentSort, setCurrentSort] = useState('newest');

  // ─── SEARCH STATE ──────────────────────────────────────────────────────────
  const [heroSearch, setHeroSearch] = useState('');
  const [heroType, setHeroType] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  // ─── DETAIL MODAL STATE ────────────────────────────────────────────────────
  const [detailPropId, setDetailPropId] = useState(null);
  const [currentGalleryIdx, setCurrentGalleryIdx] = useState(0);

  // ─── TOAST STATE ───────────────────────────────────────────────────────────
  const [toast, setToast] = useState({ message: '', visible: false });

  // ─── LOGIN FORM STATE ──────────────────────────────────────────────────────
  const [loginUser, setLoginUser] = useState('admin');
  const [loginPass, setLoginPass] = useState('admin123');
  const [loginErr, setLoginErr] = useState(false);

  // ─── INQUIRY FORM STATE ────────────────────────────────────────────────────
  const [inqName, setInqName] = useState('');
  const [inqPhone, setInqPhone] = useState('');
  const [inqEmail, setInqEmail] = useState('');
  const [inqDate, setInqDate] = useState('');
  const [inqMsg, setInqMsg] = useState('Interested in this property. Please contact me.');

  // ─── ADMIN EDIT / ADD FORM STATE ───────────────────────────────────────────
  const [formEditId, setFormEditId] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState('');
  const [formStatus, setFormStatus] = useState('available');
  const [formPrice, setFormPrice] = useState('');
  const [formPriceType, setFormPriceType] = useState('fixed');
  const [formPriceUnit, setFormPriceUnit] = useState('total');
  const [formAddress, setFormAddress] = useState('');
  const [formLocality, setFormLocality] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formPin, setFormPin] = useState('');
  const [formFacing, setFormFacing] = useState('');
  const [formMaplink, setFormMaplink] = useState('');
  const [formArea, setFormArea] = useState('');
  const [formBuildup, setFormBuildup] = useState('');
  const [formCarpet, setFormCarpet] = useState('');
  const [formPlot, setFormPlot] = useState('');
  const [formBeds, setFormBeds] = useState('');
  const [formBaths, setFormBaths] = useState('');
  const [formBalc, setFormBalc] = useState('');
  const [formFloor, setFormFloor] = useState('');
  const [formTfloors, setFormTfloors] = useState('');
  const [formFurnish, setFormFurnish] = useState('');
  const [formParking, setFormParking] = useState('');
  const [formOwnership, setFormOwnership] = useState('freehold');
  const [formAge, setFormAge] = useState('');
  const [formPossession, setFormPossession] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formHighlights, setFormHighlights] = useState('');
  const [formAmenities, setFormAmenities] = useState([]);
  const [formImages, setFormImages] = useState([]);
  const [formDocs, setFormDocs] = useState([]);

  // ─── PERSISTENCE ───────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('pv_props', JSON.stringify(props));
  }, [props]);

  useEffect(() => {
    localStorage.setItem('pv_inq', JSON.stringify(inquiries));
  }, [inquiries]);

  // ─── TOAST TRIGGER ─────────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 3000);
  };

  // ─── PUBLIC LISTINGS FILTERS & SORTS ───────────────────────────────────────
  const getFilteredProperties = () => {
    let list = props;

    // Search query override if active
    if (searchResults !== null) {
      list = searchResults;
    }

    // Category filter
    if (currentFilter !== 'all') {
      if (currentFilter === 'available') {
        list = list.filter((p) => p.status === 'available');
      } else {
        list = list.filter((p) => p.type === currentFilter);
      }
    }

    // Sorting
    let sorted = [...list];
    if (currentSort === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'area-desc') {
      sorted.sort((a, b) => b.area - a.area);
    } else {
      sorted.sort((a, b) => b.createdAt - a.createdAt);
    }

    return sorted;
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const q = heroSearch.toLowerCase().trim();
    const t = heroType;

    const filtered = props.filter((p) => {
      const matchQ = !q || (p.title + p.city + p.locality + p.address + p.desc).toLowerCase().includes(q);
      const matchT = !t || p.type === t;
      return matchQ && matchT;
    });

    setSearchResults(filtered);
    setPublicSection('listings');
    setCurrentFilter('all');
    window.scrollTo(0, 0);
  };

  // ─── DETAIL MODAL CONTROL ──────────────────────────────────────────────────
  const openDetail = (id) => {
    setDetailPropId(id);
    setCurrentGalleryIdx(0);
    setInqName('');
    setInqPhone('');
    setInqEmail('');
    setInqDate('');
    setInqMsg('Interested in this property. Please contact me.');
    document.body.style.overflow = 'hidden';
  };

  const closeDetail = () => {
    setDetailPropId(null);
    document.body.style.overflow = '';
  };

  const currentDetailProp = props.find((p) => p.id === detailPropId);

  // ─── INQUIRY SUBMIT ────────────────────────────────────────────────────────
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inqName.trim() || !inqPhone.trim()) {
      showToast('⚠ Please enter your name and phone number');
      return;
    }

    const newInq = {
      id: 'i' + Date.now(),
      propId: currentDetailProp.id,
      propTitle: currentDetailProp.title,
      name: inqName.trim(),
      phone: inqPhone.trim(),
      email: inqEmail.trim(),
      date: inqDate,
      msg: inqMsg.trim(),
      createdAt: Date.now(),
      read: false
    };

    setInquiries([newInq, ...inquiries]);
    showToast('✓ Inquiry sent! We will contact you shortly.');
    closeDetail();
  };

  // ─── ADMIN LOGIN / LOGOUT ──────────────────────────────────────────────────
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (loginUser === 'vedant' && loginPass === 'Srushti@07') {
      setIsLoggedIn(true);
      setLoginErr(false);
      setActivePage('admin');
      setAdminSection('dashboard');
    } else {
      setLoginErr(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('public');
    setPublicSection('home');
  };

  // ─── ADMIN INQUIRY ACTIONS ─────────────────────────────────────────────────
  const deleteInquiry = (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    setInquiries(inquiries.filter((inq) => inq.id !== id));
    showToast('Inquiry deleted.');
  };

  const markInquiriesRead = () => {
    setInquiries(inquiries.map((inq) => ({ ...inq, read: true })));
  };

  useEffect(() => {
    if (adminSection === 'inquiries') {
      markInquiriesRead();
    }
  }, [adminSection]);

  const unreadInqCount = inquiries.filter((inq) => !inq.read).length;

  // ─── ADMIN PROP ACTIONS ────────────────────────────────────────────────────
  const deleteProperty = (id) => {
    if (!window.confirm('Delete this property? This cannot be undone.')) return;
    setProps(props.filter((p) => p.id !== id));
    showToast('Property deleted.');
  };

  // ─── FORM RESET & SETUP ────────────────────────────────────────────────────
  const resetForm = () => {
    setFormEditId('');
    setFormTitle('');
    setFormType('');
    setFormStatus('available');
    setFormPrice('');
    setFormPriceType('fixed');
    setFormPriceUnit('total');
    setFormAddress('');
    setFormLocality('');
    setFormCity('');
    setFormPin('');
    setFormFacing('');
    setFormMaplink('');
    setFormArea('');
    setFormBuildup('');
    setFormCarpet('');
    setFormPlot('');
    setFormBeds('');
    setFormBaths('');
    setFormBalc('');
    setFormFloor('');
    setFormTfloors('');
    setFormFurnish('');
    setFormParking('');
    setFormOwnership('freehold');
    setFormAge('');
    setFormPossession('');
    setFormDesc('');
    setFormHighlights('');
    setFormAmenities([]);
    setFormImages([]);
    setFormDocs([]);
  };

  const editProp = (p) => {
    setFormEditId(p.id);
    setFormTitle(p.title || '');
    setFormType(p.type || '');
    setFormStatus(p.status || 'available');
    setFormPrice(p.price || '');
    setFormPriceType(p.priceType || 'fixed');
    setFormPriceUnit(p.priceUnit || 'total');
    setFormAddress(p.address || '');
    setFormLocality(p.locality || '');
    setFormCity(p.city || '');
    setFormPin(p.pincode || '');
    setFormFacing(p.facing || '');
    setFormMaplink(p.mapLink || '');
    setFormArea(p.area || '');
    setFormBuildup(p.buildup || '');
    setFormCarpet(p.carpet || '');
    setFormPlot(p.plot || '');
    setFormBeds(p.beds || '');
    setFormBaths(p.baths || '');
    setFormBalc(p.balc || '');
    setFormFloor(p.floor || '');
    setFormTfloors(p.tfloors || '');
    setFormFurnish(p.furnish || '');
    setFormParking(p.parking || '');
    setFormOwnership(p.ownership || 'freehold');
    setFormAge(p.age || '');
    setFormPossession(p.possession || '');
    setFormDesc(p.desc || '');
    setFormHighlights((p.highlights || []).join(', '));
    setFormAmenities(p.amenities || []);
    setFormImages(p.images || []);
    setFormDocs(p.docs || []);

    setAdminSection('add-property');
  };

  // ─── FORM PHOTO UPLOAD ─────────────────────────────────────────────────────
  const handleImageUpload = (e) => {
    const files = [...e.target.files];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormImages((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const removeFormImage = (index) => {
    setFormImages(formImages.filter((_, i) => i !== index));
  };

  // ─── FORM DOCUMENT ACTIONS ─────────────────────────────────────────────────
  const addDocRow = () => {
    setFormDocs([...formDocs, { name: '', type: 'title_deed', url: '', adminOnly: false }]);
  };

  const updateDocField = (index, field, value) => {
    setFormDocs(
      formDocs.map((doc, idx) => (idx === index ? { ...doc, [field]: value } : doc))
    );
  };

  const removeDocRow = (index) => {
    setFormDocs(formDocs.filter((_, idx) => idx !== index));
  };

  // ─── SAVE PROPERTY ─────────────────────────────────────────────────────────
  const handleSaveProperty = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('⚠ Please enter a property title');
      return;
    }
    if (!formType) {
      showToast('⚠ Please select a property type');
      return;
    }
    if (!formPrice || isNaN(parseFloat(formPrice))) {
      showToast('⚠ Please enter a valid price');
      return;
    }
    if (!formCity.trim()) {
      showToast('⚠ Please enter the city');
      return;
    }

    const savedProp = {
      id: formEditId || 'p' + Date.now(),
      title: formTitle.trim(),
      type: formType,
      status: formStatus,
      price: parseFloat(formPrice),
      priceType: formPriceType,
      priceUnit: formPriceUnit,
      address: formAddress.trim(),
      locality: formLocality.trim(),
      city: formCity.trim(),
      pincode: formPin.trim(),
      facing: formFacing,
      mapLink: formMaplink.trim(),
      area: parseFloat(formArea) || 0,
      buildup: parseFloat(formBuildup) || 0,
      carpet: parseFloat(formCarpet) || 0,
      plot: formPlot.trim(),
      beds: parseInt(formBeds) || 0,
      baths: parseInt(formBaths) || 0,
      balc: parseInt(formBalc) || 0,
      floor: parseInt(formFloor) || 0,
      tfloors: parseInt(formTfloors) || 0,
      furnish: formFurnish,
      parking: formParking,
      ownership: formOwnership,
      age: formAge,
      possession: formPossession,
      desc: formDesc.trim(),
      highlights: formHighlights
        ? formHighlights.split(',').map((h) => h.trim()).filter(Boolean)
        : [],
      amenities: formAmenities,
      images: formImages,
      docs: formDocs,
      createdAt: formEditId ? (props.find((p) => p.id === formEditId)?.createdAt || Date.now()) : Date.now()
    };

    if (formEditId) {
      setProps(props.map((p) => (p.id === formEditId ? savedProp : p)));
      showToast('✓ Property updated!');
    } else {
      setProps([savedProp, ...props]);
      showToast('✓ Property added!');
    }

    setAdminSection('properties');
  };

  const handleAmenityCheck = (a, checked) => {
    if (checked) {
      setFormAmenities([...formAmenities, a]);
    } else {
      setFormAmenities(formAmenities.filter((item) => item !== a));
    }
  };

  // ─── NAV CLICK WRAPPERS ────────────────────────────────────────────────────
  const navigatePublic = (section) => {
    setActivePage('public');
    setPublicSection(section);
    if (section === 'listings') {
      setSearchResults(null); // Clear search overrides when clicking Listings
      setHeroSearch('');
      setHeroType('');
    }
    window.scrollTo(0, 0);
  };

  const navigateAdmin = () => {
    if (isLoggedIn) {
      setActivePage('admin');
      setAdminSection('dashboard');
    } else {
      setActivePage('admin-login');
      setLoginErr(false);
    }
    window.scrollTo(0, 0);
  };

  // ─── COMPUTED DASHBOARD VALUES ─────────────────────────────────────────────
  const totalCount = props.length;
  const availCount = props.filter((p) => p.status === 'available').length;
  const reservedCount = props.filter((p) => p.status === 'reserved').length;
  const soldCount = props.filter((p) => p.status === 'sold').length;

  return (
    <div>
      {/* TOAST NOTIFICATION */}
      <div className={`toast ${toast.visible ? 'show' : ''}`} id="toast">
        {toast.message}
      </div>

      {/* NAV BAR */}
      <nav id="main-nav">
        <div className="logo" onClick={() => navigatePublic('home')} style={{ cursor: 'pointer' }}>
          Prop<span>Vault</span>
        </div>
        <div className="nav-links">
          <a onClick={() => navigatePublic('home')}>Home</a>
          <a onClick={() => navigatePublic('listings')}>Listings</a>
          <a
            onClick={navigateAdmin}
            id="admin-nav-link"
            style={{ opacity: isLoggedIn ? 1 : 0.55, fontSize: '12px', letterSpacing: '.1em', fontWeight: isLoggedIn ? 500 : 300 }}
          >
            {isLoggedIn ? 'Admin Panel' : 'ADMIN'}
          </a>
        </div>
      </nav>

      {/* PUBLIC PAGES */}
      {activePage === 'public' && (
        <div id="page-public">
          {/* HOME SECTION */}
          {publicSection === 'home' && (
            <div id="pub-home">
              <div className="hero">
                <h1>
                  Find Your Perfect
                  <br />
                  <em style={{ color: 'var(--sand)' }}>Property</em>
                </h1>
                <p>Browse our curated selection of premium flats, bungalows, and land across prime locations.</p>
                <form className="search-bar" onSubmit={handleHeroSearch}>
                  <svg width="18" height="18" fill="none" stroke="#999" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by city, locality, or property name…"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                  />
                  <select value={heroType} onChange={(e) => setHeroType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="flat">Flat / Apartment</option>
                    <option value="bungalow">Bungalow / Villa</option>
                    <option value="land">Plot / Land</option>
                    <option value="commercial">Commercial</option>
                  </select>
                  <button type="submit" className="btn btn-accent btn-sm">
                    Search
                  </button>
                </form>

                <div className="stats-row">
                  <div className="stat-item">
                    <div className="num">{totalCount}</div>
                    <div className="lbl">Properties</div>
                  </div>
                  <div className="stat-item">
                    <div className="num">{availCount}</div>
                    <div className="lbl">Available</div>
                  </div>
                  <div className="stat-item">
                    <div className="num">4</div>
                    <div className="lbl">Property Types</div>
                  </div>
                </div>
              </div>

              <div className="listings-section">
                <div className="section-header">
                  <h2>Featured Properties</h2>
                  <span className="count">{Math.min(props.filter((p) => p.status !== 'sold').length, 6)} properties</span>
                  <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => navigatePublic('listings')}>
                    View All →
                  </button>
                </div>

                <div className="property-grid">
                  {props.filter((p) => p.status !== 'sold').slice(0, 6).map((p) => (
                    <div className="prop-card" key={p.id} onClick={() => openDetail(p.id)}>
                      <div className="card-img">
                        {p.images && p.images.length > 0 ? (
                          <img src={p.images[0]} alt={p.title} loading="lazy" />
                        ) : (
                          <div className="card-img-placeholder">
                            <span style={{ fontSize: '3rem' }}>{typeIcon(p.type)}</span>
                            <span>{typeLabel(p.type)}</span>
                          </div>
                        )}
                        <div className="card-type-badge">{typeLabel(p.type)}</div>
                        <div className="card-status">
                          <span className={`badge badge-${p.status}`}>{p.status}</span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price">
                          {formatPrice(p.price, p.priceUnit)}{' '}
                          {p.priceType === 'negotiable' && (
                            <small style={{ fontSize: '.85rem', color: '#aaa', fontWeight: 400 }}>(Neg.)</small>
                          )}
                        </div>
                        <div className="card-title">{p.title}</div>
                        <div className="card-loc">📍 {p.locality ? `${p.locality}, ` : ''}{p.city}</div>
                        {(p.beds > 0 || p.baths > 0 || p.area > 0) && (
                          <div className="card-specs">
                            {p.beds > 0 && <span className="spec-item">🛏 {p.beds} BHK</span>}
                            {p.baths > 0 && <span className="spec-item">🚿 {p.baths}</span>}
                            {p.area > 0 && <span className="spec-item">📐 {p.area.toLocaleString()} sq.ft</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {props.filter((p) => p.status !== 'sold').length === 0 && (
                  <div className="empty-state">
                    <h3>No properties listed yet</h3>
                    <p>Check back soon.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* LISTINGS SECTION */}
          {publicSection === 'listings' && (
            <div id="pub-listings">
              <div className="filters-bar">
                <span style={{ fontSize: '13px', color: '#888', fontWeight: 500 }}>Filter:</span>
                <button className={`filter-chip ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>
                  All
                </button>
                <button className={`filter-chip ${currentFilter === 'flat' ? 'active' : ''}`} onClick={() => setCurrentFilter('flat')}>
                  Flats
                </button>
                <button className={`filter-chip ${currentFilter === 'bungalow' ? 'active' : ''}`} onClick={() => setCurrentFilter('bungalow')}>
                  Bungalows
                </button>
                <button className={`filter-chip ${currentFilter === 'land' ? 'active' : ''}`} onClick={() => setCurrentFilter('land')}>
                  Land
                </button>
                <button className={`filter-chip ${currentFilter === 'commercial' ? 'active' : ''}`} onClick={() => setCurrentFilter('commercial')}>
                  Commercial
                </button>
                <button
                  className={`filter-chip ${currentFilter === 'available' ? 'active' : ''}`}
                  onClick={() => setCurrentFilter('available')}
                  style={{ borderColor: '#2A5C2A', color: 'var(--green)' }}
                >
                  ✓ Available
                </button>

                <select className="sort-select" value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="area-desc">Area: Largest First</option>
                </select>
              </div>

              <div className="listings-section">
                <div className="section-header">
                  <h2>{searchResults !== null ? 'Search Results' : 'All Properties'}</h2>
                  <span className="count">
                    {getFilteredProperties().length} {getFilteredProperties().length === 1 ? 'property' : 'properties'}
                  </span>
                  {searchResults !== null && (
                    <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={() => setSearchResults(null)}>
                      Clear Search
                    </button>
                  )}
                </div>

                <div className="property-grid">
                  {getFilteredProperties().map((p) => (
                    <div className="prop-card" key={p.id} onClick={() => openDetail(p.id)}>
                      <div className="card-img">
                        {p.images && p.images.length > 0 ? (
                          <img src={p.images[0]} alt={p.title} loading="lazy" />
                        ) : (
                          <div className="card-img-placeholder">
                            <span style={{ fontSize: '3rem' }}>{typeIcon(p.type)}</span>
                            <span>{typeLabel(p.type)}</span>
                          </div>
                        )}
                        <div className="card-type-badge">{typeLabel(p.type)}</div>
                        <div className="card-status">
                          <span className={`badge badge-${p.status}`}>{p.status}</span>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="card-price">
                          {formatPrice(p.price, p.priceUnit)}{' '}
                          {p.priceType === 'negotiable' && (
                            <small style={{ fontSize: '.85rem', color: '#aaa', fontWeight: 400 }}>(Neg.)</small>
                          )}
                        </div>
                        <div className="card-title">{p.title}</div>
                        <div className="card-loc">📍 {p.locality ? `${p.locality}, ` : ''}{p.city}</div>
                        {(p.beds > 0 || p.baths > 0 || p.area > 0) && (
                          <div className="card-specs">
                            {p.beds > 0 && <span className="spec-item">🛏 {p.beds} BHK</span>}
                            {p.baths > 0 && <span className="spec-item">🚿 {p.baths}</span>}
                            {p.area > 0 && <span className="spec-item">📐 {p.area.toLocaleString()} sq.ft</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {getFilteredProperties().length === 0 && (
                  <div className="empty-state">
                    <h3>No properties found</h3>
                    <p>Try adjusting your filters or searches.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ADMIN LOGIN PAGE */}
      {activePage === 'admin-login' && (
        <div id="page-admin-login">
          <form
            onSubmit={handleLogin}
            style={{
              background: 'var(--white)',
              borderRadius: '16px',
              padding: '3rem',
              width: '100%',
              maxWidth: '420px',
              border: '1px solid var(--sand)',
              boxShadow: '0 8px 40px rgba(0,0,0,.1)'
            }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '.5rem', color: 'var(--bark)' }}>Admin Login</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '2rem' }}>Access the property management panel</p>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="admin"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                required
              />
            </div>
            <div className="form-group" style={{ marginTop: '.75rem' }}>
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </div>
            <p style={{ fontSize: '12px', color: '#bbb', margin: '.5rem 0 1.5rem' }}>Default credentials: admin / admin123</p>
            <button type="submit" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              Login →
            </button>
            {loginErr && (
              <p id="login-err" style={{ color: 'var(--red)', fontSize: '13px', marginTop: '.75rem' }}>
                ⚠ Invalid credentials. Try admin / admin123
              </p>
            )}
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setActivePage('public');
                setPublicSection('home');
              }}
            >
              ← Back to Site
            </button>
          </form>
        </div>
      )}

      {/* ADMIN CONTROL PANEL */}
      {activePage === 'admin' && isLoggedIn && (
        <div id="page-admin">
          <div className="admin-layout">
            {/* SIDEBAR */}
            <div className="admin-sidebar">
              <div
                className={`sidebar-item ${adminSection === 'dashboard' ? 'active' : ''}`}
                onClick={() => setAdminSection('dashboard')}
              >
                <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                Dashboard
              </div>
              <div
                className={`sidebar-item ${adminSection === 'properties' ? 'active' : ''}`}
                onClick={() => setAdminSection('properties')}
              >
                <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Properties
              </div>
              <div
                className={`sidebar-item ${adminSection === 'add-property' ? 'active' : ''}`}
                onClick={() => {
                  resetForm();
                  setAdminSection('add-property');
                }}
              >
                <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Property
              </div>
              <div
                className={`sidebar-item ${adminSection === 'inquiries' ? 'active' : ''}`}
                onClick={() => setAdminSection('inquiries')}
              >
                <svg className="sidebar-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
                Inquiries
                {unreadInqCount > 0 && (
                  <span
                    id="inq-badge"
                    style={{
                      background: 'var(--red)',
                      color: '#fff',
                      borderRadius: '50px',
                      padding: '1px 8px',
                      fontSize: '11px',
                      marginLeft: 'auto'
                    }}
                  >
                    {unreadInqCount}
                  </span>
                )}
              </div>
              <div style={{ marginTop: 'auto', padding: '1.5rem 1.5rem 1rem' }}>
                <button className="btn btn-outline btn-sm" onClick={handleLogout} style={{ width: '100%', justifyContent: 'center' }}>
                  ← Logout
                </button>
              </div>
            </div>

            {/* ADMIN CONTENT AREA */}
            <div className="admin-main">
              {/* DASHBOARD PAGE */}
              {adminSection === 'dashboard' && (
                <div id="admin-dashboard">
                  <div className="admin-title">Dashboard</div>
                  <div className="admin-subtitle">Your property portfolio at a glance</div>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="sc-icon">🏠</div>
                      <div className="sc-val">{totalCount}</div>
                      <div className="sc-lbl">Total Properties</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-icon">✅</div>
                      <div className="sc-val">{availCount}</div>
                      <div className="sc-lbl">Available</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-icon">🔒</div>
                      <div className="sc-val">{reservedCount}</div>
                      <div className="sc-lbl">Reserved</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-icon">💰</div>
                      <div className="sc-val">{soldCount}</div>
                      <div className="sc-lbl">Sold</div>
                    </div>
                    <div className="stat-card">
                      <div className="sc-icon">📩</div>
                      <div className="sc-val">{inquiries.length}</div>
                      <div className="sc-lbl">Total Inquiries</div>
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: 'var(--bark)', marginBottom: '1rem' }}>
                    Recent Listings
                  </h3>
                  <div className="table-container">
                    {props.length > 0 ? (
                      <table>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...props].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5).map((p) => (
                            <tr key={p.id}>
                              <td style={{ fontWeight: 500 }}>{p.title}</td>
                              <td>{typeLabel(p.type)}</td>
                              <td>{formatPrice(p.price, p.priceUnit)}</td>
                              <td>
                                <span className={`badge badge-${p.status}`}>{p.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p style={{ padding: '1.5rem', color: '#bbb', fontSize: '14px' }}>No properties yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* PROPERTIES PAGE */}
              {adminSection === 'properties' && (
                <div id="admin-properties">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                      flexWrap: 'wrap',
                      gap: '1rem'
                    }}
                  >
                    <div>
                      <div className="admin-title" style={{ marginBottom: 0 }}>
                        All Properties
                      </div>
                      <div className="admin-subtitle" style={{ marginBottom: 0 }}>
                        Manage your listings
                      </div>
                    </div>
                    <button
                      className="btn btn-accent"
                      onClick={() => {
                        resetForm();
                        setAdminSection('add-property');
                      }}
                    >
                      + Add New Property
                    </button>
                  </div>

                  {props.length > 0 ? (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Area</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {props.map((p) => (
                            <tr key={p.id}>
                              <td
                                style={{
                                  fontWeight: 500,
                                  maxWidth: '260px',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {p.title}
                              </td>
                              <td>{typeLabel(p.type)}</td>
                              <td style={{ whiteSpace: 'nowrap' }}>{formatPrice(p.price, p.priceUnit)}</td>
                              <td>
                                <span className={`badge badge-${p.status}`}>{p.status}</span>
                              </td>
                              <td>{p.area ? `${p.area.toLocaleString()} sq.ft` : '—'}</td>
                              <td>
                                <div className="actions">
                                  <button className="btn btn-ghost btn-sm" onClick={() => editProp(p)}>
                                    ✏ Edit
                                  </button>
                                  <button className="btn btn-danger btn-sm" onClick={() => deleteProperty(p.id)}>
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No properties yet</h3>
                      <p>Click "Add New Property" to get started.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ADD / EDIT PROPERTY PAGE */}
              {adminSection === 'add-property' && (
                <div id="admin-add-property">
                  <div className="admin-title">{formEditId ? 'Edit Property' : 'Add New Property'}</div>
                  <div className="admin-subtitle">
                    {formEditId ? 'Update the details and save' : 'Fill in the details below to create a listing'}
                  </div>

                  <form className="add-form" onSubmit={handleSaveProperty}>
                    {/* CORE INFO */}
                    <div className="form-section">
                      <div className="form-section-title">Core Information</div>
                      <div className="form-group">
                        <label>Property Title *</label>
                        <input
                          type="text"
                          placeholder="e.g. Spacious 3 BHK Flat in Kothrud"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-grid" style={{ marginTop: '.75rem' }}>
                        <div className="form-group">
                          <label>Property Type *</label>
                          <select value={formType} onChange={(e) => setFormType(e.target.value)} required>
                            <option value="">— Select Type —</option>
                            <option value="flat">Flat / Apartment</option>
                            <option value="bungalow">Bungalow / Villa</option>
                            <option value="land">Plot / Land</option>
                            <option value="commercial">Commercial Space</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Listing Status</label>
                          <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)}>
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="sold">Sold</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group" style={{ marginTop: '.75rem' }}>
                        <label>Description</label>
                        <textarea
                          placeholder="Describe the property — location highlights, USPs, nearby landmarks…"
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* PRICING */}
                    <div className="form-section">
                      <div className="form-section-title">Pricing</div>
                      <div className="form-grid thirds">
                        <div className="form-group">
                          <label>Price (₹) *</label>
                          <input
                            type="number"
                            placeholder="e.g. 4500000"
                            value={formPrice}
                            onChange={(e) => setFormPrice(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Price Type</label>
                          <select value={formPriceType} onChange={(e) => setFormPriceType(e.target.value)}>
                            <option value="fixed">Fixed</option>
                            <option value="negotiable">Negotiable</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Price Unit</label>
                          <select value={formPriceUnit} onChange={(e) => setFormPriceUnit(e.target.value)}>
                            <option value="total">Total Price</option>
                            <option value="per_sqft">Per Sq.ft</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* LOCATION */}
                    <div className="form-section">
                      <div className="form-section-title">Location</div>
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Street Address *</label>
                          <input
                            type="text"
                            placeholder="Plot No, Building, Street"
                            value={formAddress}
                            onChange={(e) => setFormAddress(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Locality / Society</label>
                          <input
                            type="text"
                            placeholder="e.g. Wakad, Viman Nagar"
                            value={formLocality}
                            onChange={(e) => setFormLocality(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-grid thirds" style={{ marginTop: '.75rem' }}>
                        <div className="form-group">
                          <label>City *</label>
                          <input
                            type="text"
                            placeholder="e.g. Pune"
                            value={formCity}
                            onChange={(e) => setFormCity(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Pincode</label>
                          <input
                            type="text"
                            placeholder="411001"
                            maxLength="6"
                            value={formPin}
                            onChange={(e) => setFormPin(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Facing</label>
                          <select value={formFacing} onChange={(e) => setFormFacing(e.target.value)}>
                            <option value="">— Select —</option>
                            <option>North</option>
                            <option>South</option>
                            <option>East</option>
                            <option>West</option>
                            <option>North-East</option>
                            <option>North-West</option>
                            <option>South-East</option>
                            <option>South-West</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group" style={{ marginTop: '.75rem' }}>
                        <label>Google Maps Link</label>
                        <input
                          type="url"
                          placeholder="https://maps.google.com/…"
                          value={formMaplink}
                          onChange={(e) => setFormMaplink(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* AREA */}
                    <div className="form-section">
                      <div className="form-section-title">Area & Dimensions</div>
                      <div className="form-grid thirds">
                        <div className="form-group">
                          <label>Total Area (sq.ft) *</label>
                          <input
                            type="number"
                            placeholder="1200"
                            min="0"
                            value={formArea}
                            onChange={(e) => setFormArea(e.target.value)}
                            required
                          />
                        </div>
                        {formType !== 'land' && (
                          <>
                            <div className="form-group">
                              <label>Built-up Area (sq.ft)</label>
                              <input
                                type="number"
                                placeholder="1050"
                                min="0"
                                value={formBuildup}
                                onChange={(e) => setFormBuildup(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Carpet Area (sq.ft)</label>
                              <input
                                type="number"
                                placeholder="950"
                                min="0"
                                value={formCarpet}
                                onChange={(e) => setFormCarpet(e.target.value)}
                              />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="form-group" style={{ marginTop: '.75rem' }}>
                        <label>Plot Dimensions</label>
                        <input
                          type="text"
                          placeholder="e.g. 40×60 ft or 30×50 ft"
                          value={formPlot}
                          onChange={(e) => setFormPlot(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* RESIDENTIAL */}
                    {formType !== 'land' && (
                      <div className="form-section">
                        <div className="form-section-title">Residential Details</div>
                        <div className="form-grid thirds">
                          <div className="form-group">
                            <label>Bedrooms (BHK)</label>
                            <input
                              type="number"
                              placeholder="3"
                              min="0"
                              max="20"
                              value={formBeds}
                              onChange={(e) => setFormBeds(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Bathrooms</label>
                            <input
                              type="number"
                              placeholder="2"
                              min="0"
                              max="20"
                              value={formBaths}
                              onChange={(e) => setFormBaths(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label>Balconies</label>
                            <input
                              type="number"
                              placeholder="1"
                              min="0"
                              max="10"
                              value={formBalc}
                              onChange={(e) => setFormBalc(e.target.value)}
                            />
                          </div>
                        </div>
                        {formType === 'flat' && (
                          <div className="form-grid" style={{ marginTop: '.75rem' }}>
                            <div className="form-group">
                              <label>Floor No.</label>
                              <input
                                type="number"
                                placeholder="e.g. 5"
                                min="0"
                                value={formFloor}
                                onChange={(e) => setFormFloor(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label>Total Floors in Building</label>
                              <input
                                type="number"
                                placeholder="e.g. 15"
                                min="0"
                                value={formTfloors}
                                onChange={(e) => setFormTfloors(e.target.value)}
                              />
                            </div>
                          </div>
                        )}
                        <div className="form-grid thirds" style={{ marginTop: '.75rem' }}>
                          <div className="form-group">
                            <label>Furnishing</label>
                            <select value={formFurnish} onChange={(e) => setFormFurnish(e.target.value)}>
                              <option value="">— Select —</option>
                              <option value="unfurnished">Unfurnished</option>
                              <option value="semi">Semi-furnished</option>
                              <option value="fully">Fully Furnished</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Parking</label>
                            <select value={formParking} onChange={(e) => setFormParking(e.target.value)}>
                              <option value="">— Select —</option>
                              <option value="none">None</option>
                              <option value="bike">Bike Only</option>
                              <option value="car">Car Only</option>
                              <option value="both">Bike + Car</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Ownership Type</label>
                            <select value={formOwnership} onChange={(e) => setFormOwnership(e.target.value)}>
                              <option value="freehold">Freehold</option>
                              <option value="leasehold">Leasehold</option>
                            </select>
                          </div>
                        </div>
                        <div className="form-grid" style={{ marginTop: '.75rem' }}>
                          <div className="form-group">
                            <label>Property Age</label>
                            <select value={formAge} onChange={(e) => setFormAge(e.target.value)}>
                              <option value="">— Select —</option>
                              <option value="new">New / Under Construction</option>
                              <option value="1-5">1–5 Years</option>
                              <option value="5-10">5–10 Years</option>
                              <option value="10+">10+ Years</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label>Possession / Ready Date</label>
                            <input
                              type="date"
                              value={formPossession}
                              onChange={(e) => setFormPossession(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* AMENITIES */}
                    <div className="form-section">
                      <div className="form-section-title">Amenities</div>
                      <div className="checkbox-grid">
                        {AMENITIES.map((a) => (
                          <label className="checkbox-item" key={a}>
                            <input
                              type="checkbox"
                              value={a}
                              checked={formAmenities.includes(a)}
                              onChange={(e) => handleAmenityCheck(a, e.target.checked)}
                            />{' '}
                            {a}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* HIGHLIGHTS */}
                    <div className="form-section">
                      <div className="form-section-title">Highlights</div>
                      <div className="form-group">
                        <label>Key Highlights (comma separated)</label>
                        <input
                          type="text"
                          placeholder="Corner plot, Vastu compliant, Near metro, Garden facing"
                          value={formHighlights}
                          onChange={(e) => setFormHighlights(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* PHOTOS */}
                    <div className="form-section">
                      <div className="form-section-title">Property Photos</div>
                      <div
                        className="img-upload-area"
                        onClick={() => document.getElementById('img-input').click()}
                      >
                        <div style={{ fontSize: '2.5rem', marginBottom: '.5rem' }}>📷</div>
                        <strong>Click to upload photos</strong>
                        <br />
                        <span style={{ fontSize: 12, color: '#bbb' }}>JPG, PNG, WebP accepted · Multiple files allowed</span>
                      </div>
                      <input
                        type="file"
                        id="img-input"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <div className="img-preview-list">
                        {formImages.map((src, i) => (
                          <div className="img-thumb-wrap" key={i}>
                            <img className="img-thumb" src={src} alt={`Photo ${i + 1}`} />
                            <button
                              type="button"
                              className="img-thumb-remove"
                              onClick={() => removeFormImage(i)}
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* LEGAL DOCS */}
                    <div className="form-section">
                      <div className="form-section-title">Legal Documents</div>
                      <div>
                        {formDocs.map((doc, i) => (
                          <div className="doc-row" key={i}>
                            <input
                              type="text"
                              placeholder="Document name"
                              value={doc.name}
                              onChange={(e) => updateDocField(i, 'name', e.target.value)}
                              required
                            />
                            <select value={doc.type} onChange={(e) => updateDocField(i, 'type', e.target.value)}>
                              <option value="title_deed">Title Deed</option>
                              <option value="ec">Encumbrance Certificate</option>
                              <option value="khata">Khata Certificate</option>
                              <option value="plan">Approved Plan</option>
                              <option value="noc">NOC</option>
                              <option value="sale_deed">Sale Deed</option>
                              <option value="other">Other</option>
                            </select>
                            <input
                              type="url"
                              placeholder="Document URL (Drive, Dropbox…)"
                              value={doc.url}
                              onChange={(e) => updateDocField(i, 'url', e.target.value)}
                            />
                            <label
                              style={{
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={doc.adminOnly}
                                onChange={(e) => updateDocField(i, 'adminOnly', e.target.checked)}
                                style={{ width: 'auto', accentColor: 'var(--accent)' }}
                              />{' '}
                              Admin only
                            </label>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeDocRow(i)}>
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: '.75rem' }} onClick={addDocRow}>
                        + Add Document
                      </button>
                      <p style={{ fontSize: '12px', color: '#aaa', marginTop: '.5rem' }}>
                        Add links to Google Drive, Dropbox, or any hosted document URL. Mark "Admin only" to hide from public.
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        justifyContent: 'flex-end',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--stone)'
                      }}
                    >
                      <button type="button" className="btn btn-ghost" onClick={() => setAdminSection('properties')}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-accent">
                        💾 Save Property
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* INQUIRIES PAGE */}
              {adminSection === 'inquiries' && (
                <div id="admin-inquiries">
                  <div className="admin-title">Client Inquiries</div>
                  <div className="admin-subtitle">Messages and visit requests from potential buyers</div>
                  {inquiries.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {inquiries.map((inq) => (
                        <div
                          style={{
                            background: 'var(--white)',
                            border: '1px solid var(--stone)',
                            borderRadius: 'var(--radius)',
                            padding: '1.25rem'
                          }}
                          key={inq.id}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              justifyContent: 'space-between',
                              marginBottom: '.75rem',
                              gap: '.5rem',
                              flexWrap: 'wrap'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 500, fontSize: '15px' }}>
                                {inq.name}
                                <span style={{ fontWeight: 400, color: '#888', fontSize: '13px' }}>
                                  {' '}
                                  — {inq.phone}
                                  {inq.email ? ` · ${inq.email}` : ''}
                                </span>
                              </div>
                              <div style={{ fontSize: '13px', color: 'var(--accent)', marginTop: '3px' }}>
                                Property: <strong>{inq.propTitle}</strong>
                                {inq.date ? `  ·  Visit: ${inq.date}` : ''}
                              </div>
                            </div>
                            <div style={{ fontSize: '12px', color: '#ccc', whiteSpace: 'nowrap' }}>
                              {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                          <p
                            style={{
                              fontSize: '14px',
                              color: '#555',
                              background: 'var(--stone)',
                              padding: '.85rem 1rem',
                              borderRadius: '8px',
                              lineHeight: 1.6
                            }}
                          >
                            "{inq.msg || 'No message.'}"
                          </p>
                          <button className="btn btn-danger btn-sm" style={{ marginTop: '.75rem' }} onClick={() => deleteInquiry(inq.id)}>
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h3>No inquiries yet</h3>
                      <p>Client messages will appear here when they submit the contact form on a property.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PROPERTY DETAIL MODAL OVERLAY */}
      {detailPropId && currentDetailProp && (
        <div className="modal-overlay open" onClick={closeDetail}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeDetail}>
              ✕
            </button>

            {/* DETAIL GALLERY */}
            <div className="detail-gallery">
              {currentDetailProp.images && currentDetailProp.images.length > 0 ? (
                <>
                  <img src={currentDetailProp.images[currentGalleryIdx]} alt={currentDetailProp.title} />
                  {currentDetailProp.images.length > 1 && (
                    <>
                      <div className="gallery-counter">
                        {currentGalleryIdx + 1} / {currentDetailProp.images.length}
                      </div>
                      <div className="gallery-nav">
                        <button
                          onClick={() =>
                            setCurrentGalleryIdx(
                              (prev) => (prev - 1 + currentDetailProp.images.length) % currentDetailProp.images.length
                            )
                          }
                        >
                          ‹
                        </button>
                        <button
                          onClick={() => setCurrentGalleryIdx((prev) => (prev + 1) % currentDetailProp.images.length)}
                        >
                          ›
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="detail-gallery-placeholder">{typeIcon(currentDetailProp.type)}</div>
              )}
            </div>

            {/* DETAIL BODY */}
            <div className="detail-body">
              <div className="detail-meta">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.6rem', flexWrap: 'wrap' }}>
                    <span className={`badge badge-${currentDetailProp.status}`}>{currentDetailProp.status}</span>
                    <span
                      style={{
                        background: 'var(--stone)',
                        padding: '4px 14px',
                        borderRadius: '50px',
                        fontSize: '12px',
                        letterSpacing: '.07em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {typeLabel(currentDetailProp.type)}
                    </span>
                    {currentDetailProp.priceType === 'negotiable' && (
                      <span style={{ background: 'rgba(139,105,20,.12)', color: 'var(--accent)', padding: '4px 12px', borderRadius: '50px', fontSize: '12px' }}>
                        Negotiable
                      </span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.7rem', color: 'var(--bark)', marginBottom: '.5rem' }}>{currentDetailProp.title}</h2>
                  <p style={{ color: '#888', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    📍 {[currentDetailProp.address, currentDetailProp.locality, currentDetailProp.city, currentDetailProp.pincode].filter(Boolean).join(', ')}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div className="detail-price">{formatPrice(currentDetailProp.price, currentDetailProp.priceUnit)}</div>
                  <div style={{ fontSize: '13px', color: '#aaa', marginTop: '4px' }}>
                    {currentDetailProp.priceUnit === 'per_sqft' && currentDetailProp.area
                      ? `≈ ${formatPrice(currentDetailProp.price * currentDetailProp.area, 'total')} total`
                      : ''}
                  </div>
                  {currentDetailProp.mapLink && (
                    <a href={currentDetailProp.mapLink} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ marginTop: '.75rem' }}>
                      📍 View on Map
                    </a>
                  )}
                </div>
              </div>

              {/* SPECS GRID */}
              <div className="detail-specs-grid">
                {currentDetailProp.beds > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.beds} BHK</div>
                    <div className="sk">Bedrooms</div>
                  </div>
                )}
                {currentDetailProp.baths > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.baths}</div>
                    <div className="sk">Bathrooms</div>
                  </div>
                )}
                {currentDetailProp.balc > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.balc}</div>
                    <div className="sk">Balconies</div>
                  </div>
                )}
                {currentDetailProp.area > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.area.toLocaleString()} sq.ft</div>
                    <div className="sk">Total Area</div>
                  </div>
                )}
                {currentDetailProp.carpet > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.carpet.toLocaleString()} sq.ft</div>
                    <div className="sk">Carpet Area</div>
                  </div>
                )}
                {currentDetailProp.buildup > 0 && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.buildup.toLocaleString()} sq.ft</div>
                    <div className="sk">Built-up Area</div>
                  </div>
                )}
                {currentDetailProp.floor > 0 && (
                  <div className="spec-box">
                    <div className="sv">
                      {currentDetailProp.floor}
                      {currentDetailProp.tfloors ? ` of ${currentDetailProp.tfloors}` : ''}
                    </div>
                    <div className="sk">Floor</div>
                  </div>
                )}
                {currentDetailProp.facing && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.facing}</div>
                    <div className="sk">Facing</div>
                  </div>
                )}
                {currentDetailProp.furnish && (
                  <div className="spec-box">
                    <div className="sv">
                      {currentDetailProp.furnish === 'unfurnished'
                        ? 'Unfurnished'
                        : currentDetailProp.furnish === 'semi'
                          ? 'Semi-furnished'
                          : 'Fully Furnished'}
                    </div>
                    <div className="sk">Furnishing</div>
                  </div>
                )}
                {currentDetailProp.parking && currentDetailProp.parking !== 'none' && (
                  <div className="spec-box">
                    <div className="sv">
                      {currentDetailProp.parking === 'bike'
                        ? 'Bike Only'
                        : currentDetailProp.parking === 'car'
                          ? 'Car Only'
                          : 'Car + Bike'}
                    </div>
                    <div className="sk">Parking</div>
                  </div>
                )}
                {currentDetailProp.age && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.age === 'new' ? 'New' : `${currentDetailProp.age} Yrs`}</div>
                    <div className="sk">Age</div>
                  </div>
                )}
                {currentDetailProp.plot && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.plot}</div>
                    <div className="sk">Dimensions</div>
                  </div>
                )}
                {currentDetailProp.ownership && (
                  <div className="spec-box">
                    <div className="sv">{currentDetailProp.ownership.charAt(0).toUpperCase() + currentDetailProp.ownership.slice(1)}</div>
                    <div className="sk">Ownership</div>
                  </div>
                )}
              </div>

              {/* ABOUT SECTION */}
              {currentDetailProp.desc && (
                <div className="detail-section">
                  <h4>About This Property</h4>
                  <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.8' }}>{currentDetailProp.desc}</p>
                </div>
              )}

              {/* HIGHLIGHTS SECTION */}
              {currentDetailProp.highlights && currentDetailProp.highlights.length > 0 && (
                <div className="detail-section">
                  <h4>Highlights</h4>
                  <div className="amenity-tags">
                    {currentDetailProp.highlights.map((h) => (
                      <span className="amenity-tag" key={h}>
                        ✓ {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* AMENITIES SECTION */}
              <div className="detail-section">
                <h4>Amenities</h4>
                <div className="amenity-tags">
                  {currentDetailProp.amenities && currentDetailProp.amenities.length > 0 ? (
                    currentDetailProp.amenities.map((a) => (
                      <span className="amenity-tag" key={a}>
                        {a}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: '#bbb', fontSize: '14px' }}>None specified</span>
                  )}
                </div>
              </div>

              {/* DOCUMENTS SECTION */}
              {currentDetailProp.docs && currentDetailProp.docs.filter((d) => !d.adminOnly).length > 0 && (
                <div className="detail-section">
                  <h4>Documents Available</h4>
                  <div className="doc-list">
                    {currentDetailProp.docs.filter((d) => !d.adminOnly).map((d, i) => (
                      <div className="doc-item" key={i}>
                        📄{' '}
                        <span style={{ flex: 1 }}>
                          {d.name}{' '}
                          <span style={{ fontSize: '12px', color: '#999', marginLeft: '4px' }}>
                            ({d.type ? d.type.replace(/_/g, ' ') : ''})
                          </span>
                        </span>
                        {d.url && d.url !== '#' ? (
                          <a href={d.url} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                            View ↗
                          </a>
                        ) : (
                          <span style={{ fontSize: '12px', color: '#bbb' }}>On request</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* INQUIRY FORM */}
              <div className="inquiry-form">
                <h4>Express Interest / Request a Visit</h4>
                <form onSubmit={handleInquirySubmit}>
                  <div className="form-row">
                    <div>
                      <label>Your Name *</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={inqName}
                        onChange={(e) => setInqName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label>Phone *</label>
                      <input
                        type="tel"
                        placeholder="+91 9XXXXXXXXX"
                        value={inqPhone}
                        onChange={(e) => setInqPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div>
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={inqEmail}
                        onChange={(e) => setInqEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <label>Preferred Visit Date</label>
                      <input
                        type="date"
                        value={inqDate}
                        onChange={(e) => setInqDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-row single">
                    <div>
                      <label>Message</label>
                      <textarea
                        style={{ minHeight: '80px', marginTop: 0 }}
                        placeholder="Any specific questions or requirements…"
                        value={inqMsg}
                        onChange={(e) => setInqMsg(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-accent">
                    📩 Send Inquiry
                  </button>
                  <p style={{ fontSize: '12px', color: '#aaa', marginTop: '.75rem' }}>
                    We'll get back to you within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <span>PropVault</span> — Real Estate Management &nbsp;·&nbsp; Admin:{' '}
        <a onClick={navigateAdmin} style={{ color: 'var(--accentl)', cursor: 'pointer', textDecoration: 'underline' }}>
          Login here
        </a>
      </footer>
    </div>
  );
}
