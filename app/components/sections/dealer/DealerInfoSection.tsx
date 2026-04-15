"use client";
import { Section } from "@/components/layout/Section";
import { Row } from "@/components/layout/Row";
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

// Google Maps type declarations
declare global {
  interface Window {
    google?: typeof google;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleMap = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleMarker = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleInfoWindow = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GoogleGeocoder = any;

interface Dealer {
  name: string;
  address: string;
  phone: string;
  email?: string;
}

interface DealerRegion {
  region: string;
  dealers: Dealer[];
}

const dealerData: DealerRegion[] = [
  {
    region: 'NCR',
    dealers: [
      {
        name: 'TACLOBAN FAR EAST MARKETING',
        address: 'TACLOBAN CITY',
        phone: '733-0783 / 733-0787',
        email: 'everbest@example.com'
      },
      {
        name: 'JENTROUS MARKETING',
        address: '152 Rizal Avenue Extension, Caloocan City',
        phone: '366-2962 / 361-1156',
        email: 'jentrous@example.com'
      },
      {
        name: 'SOLID MILL SUPPLY',
        address: 'C. M. Recto Avenue, Sta. Cruz, Manila',
        phone: '244-8216 to 18',
        email: 'solidmill@example.com'
      },
      {
        name: 'FINELINE INDUSTRIAL MARKETING INC.',
        address: 'Real Street, Pamplona, Las Piñas City',
        phone: '02 873-4461 to 2',
        email: 'fineline@example.com'
      },
      {
        name: 'MALACKKU INDUSTRIAL SALES',
        address: 'Tomas Mapua Street, Sta. Cruz, Manila',
        phone: '309-4397 / 309-4360',
        email: 'malackku@example.com'
      },
      {
        name: 'TOOLS ARE US INDUSTRIAL SALES',
        address: '10F National Road, Putatan, Muntinlupa City',
        phone: '861-2475 / 861-4018',
        email: 'toolsareus@example.com'
      },
      {
        name: 'GERSONITE INDUSTRIAL CORP.',
        address: '346 Quirino Highway, Sangandaan, Novaliches, Quezon City',
        phone: '361-2978 / 454-0421',
        email: 'gersonite@example.com'
      },
      {
        name: 'NEW TRIUMPH GENERAL. MERCHANDISING CORP.',
        address: '1356 C. M. Recto Avenue, Sta. Cruz, Manila',
        phone: '734-5110 / 734-1491 / 733-1973',
        email: 'newtriumph@example.com'
      },
      {
        name: 'TOOLS FROM US',
        address: '695 Edsa, Cubao, Quezon City',
        phone: '411-0550',
        email: 'toolsfromus@example.com'
      },
      {
        name: 'HAN\'S INFINITE SALES',
        address: 'Tayuman, Tondo, Manila',
        phone: '252-6141 to 45',
        email: 'hansinfinite@example.com'
      },
      {
        name: 'ORA LABORA INDUSTRIAL SALES',
        address: '13397 E. Rodriguez Ave., Quezon City',
        phone: '584-6620 / 871-7996',
        email: 'oralabora@example.com'
      },
      {
        name: 'TOOL WIND PARTS AND SERVICES',
        address: '47-A 10th Avenue corner 7th Street, Caloocan City',
        phone: '366-0708 / 367-6291',
        email: 'toolwind@example.com'
      },
      {
        name: 'HILONGOS INDUSTRIAL SUPPLY',
        address: '2 Saenz Arcade, Sumuling Hi-way Mayamot, Antipolo',
        phone: '682-1255',
        email: 'hilongos@example.com'
      }
    ]
  },
  {
    region: 'Luzon',
    dealers: [
      {
        name: 'FINELINE INDUSTRIAL MARKETING. INC.',
        address: 'SGT Building, Daang Maharlika, Calamba, Laguna',
        phone: '02 775-0405 / 049 806-6758',
        email: 'fineline.calamba@example.com'
      },
      {
        name: 'GOOD YEAR HARDWARE',
        address: 'Olongapo City',
        phone: '(047) 222-4727',
        email: 'goodyear@example.com'
      },
      {
        name: 'JALBUENA TOOLS AND GEN.',
        address: '86 Katandao St., Baguio City',
        phone: '(074) 619-1816',
        email: 'jalbuena@example.com'
      },
      {
        name: 'FIRST PACIFIC HARDWARE',
        address: 'TA-352, Balili, KM4, LA Trinidad, Benguet',
        phone: '',
        email: 'firstpacific@example.com'
      },
      {
        name: 'INHAND WORKS',
        address: 'Dau, Mabalacat, Pampanga',
        phone: '(045) 331-2262 / 625-5021',
        email: 'inhand@example.com'
      },
      {
        name: 'N C R CONSTRUCTION SUPPLY',
        address: '866 Henson Street, Angeles City',
        phone: '(045) 323-4401 to 02',
        email: 'ncrconstruction@example.com'
      }
    ]
  },
  {
    region: 'Visayas',
    dealers: [
      {
        name: 'BELMONT HARDWARE DEPOT CEBU',
        address: 'Legazpi Corner P. Burgos St. Cebu City, Philippines 6000',
        phone: '+63 32 256-1252 / +63 917 631-4716',
        email: 'belmont.cebu@example.com'
      },
      {
        name: 'BELMONT HARDWARE DEPOT MANDAUE',
        address: 'MC. Briones St. Hi-way Mandaue City, Philippines 6014',
        phone: '+63 32 346-1143 / +63 917 632-8394',
        email: 'belmont.mandaue@example.com'
      },
      {
        name: 'BELMONT INDUSTRIAL TOOL CENTER',
        address: 'GF Belmont Bldg. MC. Briones St. Hi-way Mandaue City',
        phone: '+63 32 346-4268 to 70 / +63 917 631-4718',
        email: 'belmont.tools@example.com'
      },
      {
        name: 'GOLDEN RULE STORE GENERAL HARDWARE',
        address: 'Maria Cristina St., Dumaguete City',
        phone: '(035) 225-4391 to 2',
        email: 'goldenrule@example.com'
      },
      {
        name: 'POWER INDUSTRIAL',
        address: '40 Quezon Street, Iloilo City',
        phone: '(033) 337-6574',
        email: 'powerindustrial@example.com'
      },
      {
        name: 'TOOLS SHOP',
        address: '3 Solis Street, Iloilo City',
        phone: '(033) 336-9957',
        email: 'toolsshop@example.com'
      },
      {
        name: 'UYMATIAO TRADING CORP.',
        address: 'Gov. M. Perdices Street, Dumaguete City',
        phone: '(035) 226-5555 / (035) 422-9999',
        email: 'uymatiao@example.com'
      }
    ]
  },
  {
    region: 'Mindanao',
    dealers: [
      {
        name: 'BUILDMORE CONSTRUCTION DEPOT',
        address: 'Lot 23A, General Santos Drive Osita Subd., Zone II, Koronadal City',
        phone: '(083) 520-8118 / 520-2265',
        email: 'buildmore@example.com'
      },
      {
        name: 'DAVAO HOME BUILDERS CENTER',
        address: 'R. Magsaysay St., Digos City',
        phone: '(082) 553-2279',
        email: 'davaohomebuilders@example.com'
      },
      {
        name: 'DADIANGAS GLASS & CONSTRUCTION DEPOT',
        address: 'I. Santiago Boulevard, General Santos City',
        phone: '(083) 553-2970 / 553-4734 / 552-5958',
        email: 'dadiangas@example.com'
      },
      {
        name: 'DDIS, INC.',
        address: '27 F. Bangoy Street, Davao City',
        phone: '(082) 226-3440 / 221-0652-53',
        email: 'ddis@example.com'
      },
      {
        name: 'DNW ENTERPRISE',
        address: '222 Gov. Alvarez Street, Zamboanga City',
        phone: '(062) 991-0853 / 991-0224',
        email: 'dnw@example.com'
      },
      {
        name: 'GOLDTOWN INDUSTRIAL SUPPLY',
        address: 'Pres. Sergio Osmeña Boulevard, Cagayan de Oro',
        phone: '(088) 856-3366',
        email: 'goldtown@example.com'
      },
      {
        name: 'J H HARDWARE',
        address: 'Magsaysay Street, Davao City',
        phone: '(082) 227-6452',
        email: 'jhh@example.com'
      },
      {
        name: 'PABLO\'S POWER TRADE CENTER',
        address: '2 Pereyra Bldg. Capitol Brgy. Maguapo West, Tagum City',
        phone: '',
        email: 'pablos@example.com'
      },
      {
        name: 'SAVE MORE INDUSTRIAL SUPPLY, INC.',
        address: '139 CVA Bldg. Ramon Magsaysay Ave., Davao City',
        phone: '(082) 305-3020',
        email: 'savemore@example.com'
      },
      {
        name: 'TEBROS HARDWARE',
        address: '112 R. Magsaysay Ave., Davao City',
        phone: '(082) 227-7937 / 221-3447',
        email: 'tebros@example.com'
      },
      {
        name: 'TRUST HARDWARE',
        address: 'Monteverde Avenue, Davao City',
        phone: '(082) 2210241 / 222-2136 / 227-7215',
        email: 'trust@example.com'
      },
      {
        name: 'WELDEX INDUSTRIAL SUPPLY INC',
        address: '6 Roxas Ext. Brgy 31-D Boulevard., Davao City',
        phone: '(082) 301-5572',
        email: 'weldex@example.com'
      }
    ]
  }
];

export function DealerInfoSection() {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAjbHyFs7o64UZtx5xVhryDsHxPHONhNC4";
  const [activeTab, setActiveTab] = useState('NCR');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<GoogleMap>(null);
  const markerRef = useRef<GoogleMarker>(null);
  const infoWindowRef = useRef<GoogleInfoWindow>(null);
  const geocoderRef = useRef<GoogleGeocoder>(null);
  
  // Initialize Google Maps
  useEffect(() => {
    // Inject CSS to hide InfoWindow close button globally
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        .gm-style-iw button[aria-label="Close"] {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Load Google Maps script
    if (typeof window !== 'undefined' && !(window as unknown as { google?: GoogleMap }).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geocoding`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else if ((window as unknown as { google?: GoogleMap }).google) {
      initMap();
    }
    
    function initMap() {
      if (mapRef.current && (window as unknown as { google?: GoogleMap }).google) {
        const google = (window as unknown as { google: GoogleMap }).google;
        
        const map = new google.maps.Map(mapRef.current, {
          zoom: 17,
          center: { lat: 14.5995, lng: 120.9842 },
          mapTypeId: 'hybrid',
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
        });
        
        googleMapRef.current = map;
        geocoderRef.current = new google.maps.Geocoder();
        infoWindowRef.current = new google.maps.InfoWindow();
        setMapLoaded(true);
        
        // Pin the first dealer if already selected
        if (selectedDealer) {
          pinDealerOnMap(selectedDealer);
        }
      }
    }
  }, []);
  
  // Function to pin dealer on map
  const pinDealerOnMap = (dealer: Dealer) => {
    if (!googleMapRef.current || !geocoderRef.current || !infoWindowRef.current || !(window as any).google) return;
    
    const google = (window as any).google;
    const geocoder = geocoderRef.current;
    const map = googleMapRef.current;
    const infoWindow = infoWindowRef.current;
    
    geocoder.geocode({ address: dealer.name }, (results: any, status: any) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }
        
        const marker = new google.maps.Marker({
          map: map,
          position: location,
          title: dealer.name,
          animation: google.maps.Animation.DROP,
        });
        
        markerRef.current = marker;
        map.setCenter(location);
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        const contentString = `
          <div style="font-family: Roboto, Arial, sans-serif; padding: 0; margin: 0; max-width: 300px;">
            <div style="font-size: 16px; font-weight: 500; color: #202124; padding: 12px 16px 4px 16px; margin: 0;">
              ${dealer.name}
            </div>
            <div style="font-size: 14px; color: #70757a; padding: 0 16px 12px 16px; margin: 0; line-height: 1.4;">
              ${dealer.address}
            </div>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.name + ', ' + dealer.address)}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display: block; font-size: 14px; color: #1a73e8; text-decoration: none; padding: 0 16px 12px 16px; font-weight: 500; border: none !important; outline: none !important; box-shadow: none !important;"
              onmouseover="this.style.textDecoration='underline'" 
              onmouseout="this.style.textDecoration='none'"
            >
              View on Google Maps
            </a>
          </div>
        `;
        
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      }
    });
  };
  
  // Update map when dealer is selected
  useEffect(() => {
    if (selectedDealer && mapLoaded) {
      pinDealerOnMap(selectedDealer);
    }
  }, [selectedDealer, mapLoaded]);
  
  useEffect(() => {
    // Set the first dealer as selected when the active tab or search term changes
    const activeRegionData = dealerData.find(region => region.region === activeTab);
    const filteredDealers = activeRegionData?.dealers.filter(dealer => 
      dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      dealer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    if (filteredDealers.length > 0 && !selectedDealer) {
      setSelectedDealer(filteredDealers[0]);
    } else if (filteredDealers.length === 0) {
      setSelectedDealer(null);
    }
  }, [activeTab, searchTerm]);
  
  // Filter dealers based on search term within the active region
  const activeRegionData = dealerData.find(region => region.region === activeTab);
  const filteredDealers = activeRegionData?.dealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dealer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.phone.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const regions = ['NCR', 'Luzon', 'Visayas', 'Mindanao'];

  return (
    <Section bgColor="bg-[#F5F6FA] lg:py-[100px] md:py-[40px] py-[30px]">
      <Row>
        <div className="text-center mb-[30px]">
                <h2 className="text-[36px] md:text-[48px] lg:text-6xl font-normal tracking-[-2.4px] leading-[40px] lg:leading-[72.6px] text-[#333333] lg:mb-[30px] mb-[20px]">
                  Find a Trusted SMWPI Dealer
                </h2>
                <p className="text-base leading-[28px] tracking-[-0.64px] text-[#333333]">
                  Access premium marine plywood from authorized dealers nationwide. Built on decades of craftsmanship and innovation, our products deliver reliability you can depend on.
                </p>
            </div>
      </Row>
      <Row className="!max-w-[1280px]">
        {/* Tabs and Search */}
        <div className="flex flex-col min-[1240px]:flex-row">
          {/* LEFT — Tabs */}
          <div className="order-2 min-[1240px]:order-1 hidden md:flex flex-wrap flex-1 max-[1240px]:mt-6">
            {regions.map((region, index) => (
              <button
                key={region}
                onClick={() => setActiveTab(region)}
                className={`
                  font-body text-white text-[16px] lg:text-[20px] md:text-[18px] md:leading-[20px] font-bold lg:leading-[24px] tracking-[-0.15px]
                  py-[17px]
                  px-[40px] max-[980px]:px-[25px] cursor-pointer
                  whitespace-nowrap
                  transition-colors
                  ${index !== regions.length - 1 ? '' : ''}
                  ${activeTab === region ? 'bg-[#0839D0]' : 'bg-[#04217B] hover:bg-[#0839D0]'}
                  ${region === 'NCR' ? '' : ''}
                  ${region === 'Mindanao' ? '' : ''}
                `}
              >
                {region.toUpperCase()}
              </button>
            ))}
          </div>

          {/* RIGHT — Search */}
          <div className="order-1 min-[1240px]:order-2 shrink-0 w-full min-[1240px]:w-auto">
            <div className="flex w-full min-[1240px]:w-auto justify-end  gap-[10px]">
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="
                  w-full min-[580px]:w-[261px]
                  h-[45px]
                  px-4
                  border-t border-b border-l border-black/10
                  bg-white
                  font-body text-[14px]
                  focus:outline-none focus:ring-2 focus:ring-[#0839D0]
                "
              />
              <button
                className="
                  h-[45px]
                  px-4
                  bg-[#D7232C]
                  text-white
                  tracking-[-0.15px]
                  leading-[24px]
                  rounded-[100px]
                  font-body text-[14px] font-medium
                  flex items-center justify-center
                  hover:bg-[#A91F1A]
                  cursor-pointer
                  transition-colors
                "
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        <div className="md:hidden mt-4 mb-[32px]">
          <div className="relative">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 pr-10 border-2  rounded-lg bg-white text-[#333] font-body text-[14px] font-medium appearance-none cursor-pointer"
            >
              {regions.map((region) => (
                <option key={region} value={region} className="py-2">
                  {region.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-[#000]" />
            </div>
          </div>
        </div>

        {/* Dealer List and Map */}
        <div className="flex flex-col lg:flex-row gap-0 w-full">
          {/* Left side - Dealer listings */}
          <div className="lg:w-[433px]">
            <div className="max-h-[702px] overflow-y-auto border-gray-200 overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#04217B] [&::-webkit-scrollbar-thumb]:bg-gray-400/50 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400/80">
              {filteredDealers.length > 0 ? (
                filteredDealers.map((dealer, index) => (
                <div 
                  key={`${dealer.name}-${index}`} 
                  className={`p-[30px] cursor-pointer transition-colors
                    ${index > 0 ? 'border-t border-black' : ''}
                    ${selectedDealer && selectedDealer.name === dealer.name 
                      ? 'bg-[#0839D0]' 
                      : 'bg-[#04217B] hover:bg-[#0839D0] cursor-pointer'
                    }`}
                  onClick={() => setSelectedDealer(dealer)}
                >
                    {/* Dealer name */}
                    <h3 className="text-white font-body text-[16px] leading-[20px] md:text-[18px] lg:text-[20px] lg:leading-[24px] font-bold tracking-[-0.2px] mb-[10px]">
                      {dealer.name}
                    </h3>

                    <div className="mt-2 space-y-2">
                      {/* Location */}
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.address)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 mb-[10px] text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                        onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                      >
                        <img
                          src="/images/location-icon-white.svg"
                          alt="Location"
                          className="w-6 h-6 flex-shrink-0"
                        />
                        <span>{dealer.address}</span>
                      </a>

                      {/* Contact */}
                      {dealer.phone && (
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/telephone-icon-white.svg"
                            alt="Contact"
                            className="w-6 h-6 flex-shrink-0"
                          />

                          {dealer.phone.includes(' to ') ? (
                            <a 
                              href={`tel:${dealer.phone.split(' to ')[0].trim().replace(/\s+/g, '').replace(/[()]/g, '')}`}
                              className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                              onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                            >
                              {dealer.phone}
                            </a>
                          ) : (
                            <div className="flex flex-wrap gap-1">
                              {dealer.phone.split('/').map((number, idx) => (
                                <span key={idx} className="flex items-center">
                                  <a 
                                    href={`tel:${number.trim().replace(/\s+/g, '').replace(/[()]/g, '')}`}
                                    className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                                    onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                                  >
                                    {number.trim()}
                                  </a>
                                  {idx < dealer.phone.split('/').length - 1 && (
                                    <span className="text-white mx-1">/</span>
                                  )}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Email */}
                      {dealer.email && (
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/email-icon-white.svg"
                            alt="Email"
                            className="w-6 h-6 flex-shrink-0"
                          />
                          <a 
                            href={`mailto:${dealer.email}`}
                            className="text-white font-body text-[14px] md:text-[16px] font-normal leading-[19px] tracking-[-0.15px] hover:underline"
                            onClick={(e) => { e.stopPropagation(); setSelectedDealer(dealer); }}
                          >
                            {dealer.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <p className="text-center text-gray-500">
                    No dealers found matching your search in {activeTab}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Google Maps */}
            <div className="h-[500px] md:h-[600px] lg:h-[702px] lg:max-w-[847px] w-full bg-gray-100 border border-gray-300 relative overflow-hidden">
              {selectedDealer ? (
                <div 
                  ref={mapRef} 
                  className="w-full h-full"
                  style={{ minHeight: '500px' }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 text-gray-500">
                  <div className="text-center">
                    <div className="flex items-center justify-center bg-white border-2 border-gray-300 w-16 h-16 mx-auto mb-4">
                      <img
                        src="/images/location-icon.svg"
                        alt="Location"
                        className="w-8 h-8"
                      />
                    </div>
                    <p className="text-sm">Select a dealer to view location</p>
                  </div>
                </div>
              )}
            </div>
        </div>
      </Row>
    </Section>
  );
}
