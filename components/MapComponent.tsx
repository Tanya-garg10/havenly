'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from 'next-themes';
import { Locate, RotateCcw, Search } from 'lucide-react';
import type { Property } from '@/lib/dummy-data';

interface MapComponentProps {
  properties: Property[];
  hoveredPropertyId: string | null;
  selectedPropertyId: string | null;
  onPropertySelect: (property: Property) => void;
  onBoundsChange: (bounds: L.LatLngBounds) => void;
  onResetBounds: () => void;
  isBoundsFiltered: boolean;
}

// Fix default leaflet marker icon assets (prevents missing image warnings)
const setupLeafletAssets = () => {
  if (typeof window === 'undefined') return;
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  properties: Property[];
}

export default function MapComponent({
  properties,
  hoveredPropertyId,
  selectedPropertyId,
  onPropertySelect,
  onBoundsChange,
  onResetBounds,
  isBoundsFiltered,
}: MapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const isInternalMapChange = useRef(false);

  const { resolvedTheme } = useTheme();
  
  const [mapTrigger, setMapTrigger] = useState(0);
  const [showSearchAreaBtn, setShowSearchAreaBtn] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([34.0195, -118.6814]); // Malibu default
  const [zoomLevel, setZoomLevel] = useState(12);

  // Setup Leaflet Assets
  useEffect(() => {
    setupLeafletAssets();
  }, []);

  // Initialize Map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current || mapRef.current) return;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      zoomControl: false, // Position zoom control manually
      attributionControl: false,
    }).setView(mapCenter, zoomLevel);

    mapRef.current = map;

    // Add Zoom Control to bottom-right (more premium layout)
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Create markers layer group
    const markersGroup = L.layerGroup().addTo(map);
    markersLayerGroupRef.current = markersGroup;

    // Listen to bounds and zoom changes
    const handleMapChange = () => {
      setZoomLevel(map.getZoom());
      setMapTrigger((prev) => prev + 1);
      
      // Only show the "Search this area" button if the map was changed by user pan/zoom
      if (!isInternalMapChange.current) {
        setShowSearchAreaBtn(true);
      }
    };

    map.on('moveend', handleMapChange);
    map.on('zoomend', handleMapChange);

    // Set initial custom attribution at bottom right
    L.control.attribution({ prefix: false }).addAttribution('&copy; CartoDB &copy; OSM').addTo(map);

    return () => {
      map.off('moveend', handleMapChange);
      map.off('zoomend', handleMapChange);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Sync Basemap Tiles with active Theme (Light/Dark mode)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    // CartoDB Positron for light theme, CartoDB Dark Matter for dark theme
    const tileUrl =
      resolvedTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    const newTiles = L.tileLayer(tileUrl, {
      maxZoom: 19,
    });

    newTiles.addTo(map);
    tileLayerRef.current = newTiles;
  }, [resolvedTheme]);

  // Sync Map Viewport when properties change FROM OUTSIDE (e.g. text search or category change)
  useEffect(() => {
    if (!mapRef.current || properties.length === 0) return;
    
    // If the change came from a bounds viewport search, do not force-re-center the map
    if (isBoundsFiltered) return;

    const map = mapRef.current;
    
    // Create bounds from all properties
    const coordinates = properties.map(
      (p) => [p.location.coordinates.lat, p.location.coordinates.lng] as [number, number]
    );

    isInternalMapChange.current = true;
    
    if (coordinates.length === 1) {
      map.setView(coordinates[0], 12, { animate: true });
    } else {
      const bounds = L.latLngBounds(coordinates);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12, animate: true });
    }

    // Reset user viewport search trigger since we did an external reload
    setShowSearchAreaBtn(false);
    
    // Reset the internal flag after animation completes
    setTimeout(() => {
      isInternalMapChange.current = false;
    }, 500);
  }, [properties, isBoundsFiltered]);

  // Custom Pixel-Based Clustering Algorithm
  // Groups markers that are closer than 60 pixels at the current zoom level
  const computeClusters = useCallback((): Cluster[] => {
    if (!mapRef.current || properties.length === 0) return [];
    const map = mapRef.current;
    const bounds = map.getBounds();

    // 1. Filter properties in view (optional, but optimizes rendering)
    const propertiesInView = properties.filter((p) =>
      bounds.contains([p.location.coordinates.lat, p.location.coordinates.lng])
    );

    const clusters: Cluster[] = [];
    const clusterRadius = 60; // Cluster proximity threshold in pixels

    propertiesInView.forEach((property) => {
      const latlng = L.latLng(property.location.coordinates.lat, property.location.coordinates.lng);
      const pixelPos = map.latLngToContainerPoint(latlng);

      // Find an existing cluster close enough in pixels
      let matchedCluster = clusters.find((cluster) => {
        const clusterLatLng = L.latLng(cluster.lat, cluster.lng);
        const clusterPixelPos = map.latLngToContainerPoint(clusterLatLng);
        const distance = Math.sqrt(
          Math.pow(pixelPos.x - clusterPixelPos.x, 2) + Math.pow(pixelPos.y - clusterPixelPos.y, 2)
        );
        return distance < clusterRadius;
      });

      if (matchedCluster) {
        matchedCluster.properties.push(property);
        // Recalculate center as average of items
        const count = matchedCluster.properties.length;
        matchedCluster.lat =
          (matchedCluster.lat * (count - 1) + property.location.coordinates.lat) / count;
        matchedCluster.lng =
          (matchedCluster.lng * (count - 1) + property.location.coordinates.lng) / count;
      } else {
        clusters.push({
          id: `cluster-${property.id}`,
          lat: property.location.coordinates.lat,
          lng: property.location.coordinates.lng,
          properties: [property],
        });
      }
    });

    return clusters;
  }, [properties, mapTrigger]);

  // Render Markers and Clusters
  useEffect(() => {
    if (!mapRef.current || !markersLayerGroupRef.current) return;
    const map = mapRef.current;
    const markersGroup = markersLayerGroupRef.current;

    // Clear previous markers
    markersGroup.clearLayers();

    const clusters = computeClusters();

    clusters.forEach((cluster) => {
      const isSingle = cluster.properties.length === 1;

      if (isSingle) {
        const property = cluster.properties[0];
        const isHovered = property.id === hoveredPropertyId;
        const isSelected = property.id === selectedPropertyId;

        // Custom HTML Marker matching Airbnb aesthetic
        const priceLabel = `₹${Math.round(property.pricePerNight).toLocaleString()}`;
        const activeClass = isSelected
          ? 'bg-primary text-primary-foreground border-primary scale-110 shadow-lg z-[1000]'
          : isHovered
          ? 'bg-foreground text-background border-foreground scale-108 shadow-md z-[990]'
          : 'bg-background text-foreground border-border shadow-sm hover:scale-105 hover:bg-muted';

        const customIcon = L.divIcon({
          html: `<div class="flex items-center justify-center font-sans font-bold text-xs border rounded-full px-2.5 py-1 transition-all duration-200 select-none ${activeClass}">
                   ${priceLabel}
                 </div>`,
          className: 'price-marker-wrapper',
          iconSize: [60, 24],
          iconAnchor: [30, 12],
        });

        const marker = L.marker([cluster.lat, cluster.lng], { icon: customIcon });

        // Add Leaflet Popup with HTML Listing Card
        const popupContent = `
          <a href="/property/${property.id}" class="block group outline-none select-none text-foreground">
            <div class="w-48 overflow-hidden rounded-xl bg-background border border-border shadow-lg font-sans">
              <div class="relative h-28 w-full overflow-hidden bg-muted">
                <img src="${property.image}" alt="${property.title}" class="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105" />
              </div>
              <div class="p-2.5 flex flex-col gap-1">
                <h4 class="font-bold text-xs truncate leading-tight text-foreground">${property.title}</h4>
                <p class="text-[10px] text-muted-foreground truncate">${property.location.city}, ${property.location.state}</p>
                <div class="mt-1 flex items-center justify-between">
                  <span class="font-bold text-[11px] text-foreground">₹${Math.round(property.pricePerNight).toLocaleString()} <span class="font-normal text-[9px] text-muted-foreground">/ night</span></span>
                  <span class="flex items-center gap-0.5 text-[10px] font-semibold text-foreground"><span class="text-primary font-bold text-[11px]">★</span> ${property.rating.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </a>
        `;

        marker.bindPopup(popupContent, {
          closeButton: false,
          offset: L.point(0, -8),
          className: 'custom-map-popup',
        });

        // Trigger hover state in list and open popups
        marker.on('click', () => {
          onPropertySelect(property);
          marker.openPopup();
        });

        marker.addTo(markersGroup);

        // Keep popup open/highlighted if selected
        if (isSelected) {
          marker.openPopup();
        }
      } else {
        // Render Cluster Marker (styled circle badge with count)
        const count = cluster.properties.length;
        const isHoveredInCluster = cluster.properties.some((p) => p.id === hoveredPropertyId);
        const isSelectedInCluster = cluster.properties.some((p) => p.id === selectedPropertyId);

        const borderClass = isSelectedInCluster
          ? 'border-primary bg-primary/20 scale-105 ring-2 ring-primary/30'
          : isHoveredInCluster
          ? 'border-foreground bg-foreground/20'
          : 'border-primary bg-primary/10';

        const textClass = isSelectedInCluster ? 'text-primary' : isHoveredInCluster ? 'text-foreground font-extrabold' : 'text-primary';

        const clusterIcon = L.divIcon({
          html: `<div class="flex items-center justify-center rounded-full border-2 font-sans font-bold text-sm shadow-md transition-all duration-200 h-10 w-10 ${borderClass} ${textClass}">
                   ${count}
                 </div>`,
          className: 'cluster-marker-wrapper',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        });

        const marker = L.marker([cluster.lat, cluster.lng], { icon: clusterIcon });

        // Click cluster: zooms in by 2 levels to spread markers
        marker.on('click', () => {
          isInternalMapChange.current = true;
          map.setView([cluster.lat, cluster.lng], map.getZoom() + 2, { animate: true });
          
          setTimeout(() => {
            isInternalMapChange.current = false;
          }, 500);
        });

        marker.addTo(markersGroup);
      }
    });
  }, [properties, hoveredPropertyId, selectedPropertyId, computeClusters, onPropertySelect]);

  // Handle Geolocation (Locate Me)
  const handleLocateMe = useCallback(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    map.locate({ setView: true, maxZoom: 14 });

    const onLocationFound = (e: L.LocationEvent) => {
      // Clear previous location marker
      if (locationMarkerRef.current) {
        map.removeLayer(locationMarkerRef.current);
      }

      // Draw custom blue pulse dot marker
      const pulseIcon = L.divIcon({
        html: `<div class="relative flex h-5 h-5 items-center justify-center">
                 <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                 <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500 border border-white shadow-md"></span>
               </div>`,
        className: 'locate-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      const userMarker = L.marker(e.latlng, { icon: pulseIcon }).addTo(map);
      locationMarkerRef.current = userMarker;

      map.off('locationfound', onLocationFound);
    };

    const onLocationError = () => {
      alert('Unable to retrieve your location. Please check your browser permissions.');
      map.off('locationerror', onLocationError);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
  }, []);

  // Handle Viewport Search Trigger
  const handleViewportSearch = () => {
    if (!mapRef.current) return;
    onBoundsChange(mapRef.current.getBounds());
    setShowSearchAreaBtn(false);
  };

  // Reset Bounds Filter (re-centers map to fits all items)
  const handleResetSearch = () => {
    onResetBounds();
    setShowSearchAreaBtn(false);
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-muted/20 shadow-inner group/map">
      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Floating Viewport Search Controls */}
      <div className="absolute top-4 inset-x-0 mx-auto flex justify-center gap-2 z-20 pointer-events-none">
        {showSearchAreaBtn && (
          <button
            onClick={handleViewportSearch}
            className="flex items-center gap-2 bg-background border border-border text-foreground hover:bg-muted font-semibold text-xs px-4 py-2.5 rounded-full shadow-lg pointer-events-auto transition-transform duration-200 hover:scale-105 active:scale-98 animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <Search size={14} className="text-primary stroke-[2.5]" />
            Search This Area
          </button>
        )}
        
        {isBoundsFiltered && (
          <button
            onClick={handleResetSearch}
            className="flex items-center gap-1.5 bg-background border border-border text-muted-foreground hover:bg-muted font-semibold text-xs px-4 py-2.5 rounded-full shadow-lg pointer-events-auto transition-transform duration-200 hover:scale-105 active:scale-98 animate-in fade-in slide-in-from-top-4 duration-300"
          >
            <RotateCcw size={13} />
            Reset Map Filter
          </button>
        )}
      </div>

      {/* Floating Geolocation Button */}
      <button
        onClick={handleLocateMe}
        title="Locate Me"
        className="absolute bottom-20 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border text-foreground hover:bg-muted hover:text-primary hover:scale-105 active:scale-95 shadow-md transition-all cursor-pointer"
      >
        <Locate size={18} />
      </button>
    </div>
  );
}
