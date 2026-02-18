"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

// Dynamically import the wrapper to avoid SSR issues
const Globe = dynamic(() => import("./GlobeWrapper").then((mod) => mod.GlobeWrapper), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-brand-blue/50">Loading Globe...</div>
});

interface Location {
    country: string;
    city: string;
    lat: number;
    lng: number;
    details: string;
}

const locations: Location[] = [
    {
        country: "India",
        city: "Bangalore",
        lat: 12.9716,
        lng: 77.5946,
        details: "Tech Park, Bangalore, Karnataka",
    },
    {
        country: "China",
        city: "Shanghai",
        lat: 31.2304,
        lng: 121.4737,
        details: "Innovation Hub, Shanghai",
    },
    {
        country: "Vietnam",
        city: "Ho Chi Minh City",
        lat: 10.8231,
        lng: 106.6297,
        details: "HCMC Tech Center, Ho Chi Minh City",
    },
    {
        country: "Indonesia",
        city: "Jakarta",
        lat: -6.2088,
        lng: 106.8456,
        details: "Jakarta Business District, Jakarta",
    },
];

/**
 * Interactive 3D globe showing office locations
 */
export function InteractiveGlobe() {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const globeEl = useRef<any>(null);

    const onGlobeReady = () => {
        if (globeEl.current) {
            try {
                // Enable auto-rotation
                const controls = globeEl.current.controls();
                if (controls) {
                    controls.autoRotate = true;
                    controls.autoRotateSpeed = 0.5;
                }
            } catch (e) {
                console.error("Error configuring globe controls:", e);
            }
        }
    };

    const handleLocationClick = (loc: Location) => {
        setSelectedLocation(loc);

        if (globeEl.current) {
            try {
                // Stop rotation and fly to location
                const controls = globeEl.current.controls();
                if (controls) {
                    controls.autoRotate = false;
                }
                globeEl.current.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 2 }, 1500);
            } catch (e) {
                console.error("Error moving globe:", e);
            }
        } else {
            console.warn("Globe ref is not available");
        }
    };

    const labelsData = locations.map((loc) => ({
        lat: loc.lat,
        lng: loc.lng,
        text: loc.city,
        color: "#3b82f6",
        size: 1.5,
        location: loc,
    }));

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-brand-blue/5 to-white/50 border border-brand-blue/10 shadow-2xl shadow-brand-blue/5">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center cursor-move">
                <Globe
                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                    backgroundColor="rgba(0,0,0,0)"
                    labelsData={labelsData}
                    labelText="text"
                    labelSize={(d: any) => d.size}
                    labelColor={() => "white"} // Changed to white as requested
                    labelDotRadius={0.5}
                    labelAltitude={0.01}
                    onGlobeReady={onGlobeReady}
                    onLabelClick={(label: any) => handleLocationClick(label.location)}
                    onGlobeClick={() => {
                        setSelectedLocation(null);
                        if (globeEl.current) {
                            const controls = globeEl.current.controls();
                            if (controls) controls.autoRotate = false;
                        }
                    }}
                    width={800}
                    height={800}
                    atmosphereColor="#3b82f6"
                    atmosphereAltitude={0.15}
                />
            </div>

            {/* Quick Navigation Panel */}
            <div className="absolute top-6 left-6 z-20 hidden md:block">
                <div className="bg-white/80 backdrop-blur-md border border-brand-blue/20 rounded-xl p-4 shadow-lg shadow-brand-blue/5">
                    <h3 className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-3">
                        Locate Office
                    </h3>
                    <div className="space-y-2">
                        {locations.map((loc) => (
                            <button
                                key={loc.city}
                                onClick={() => handleLocationClick(loc)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedLocation?.city === loc.city
                                    ? "bg-brand-blue text-white shadow-md"
                                    : "hover:bg-brand-blue/10 text-brand-navy/80 hover:text-brand-blue"
                                    }`}
                            >
                                <span>📍</span>
                                {loc.country}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Location Info Panel - Glassmorphism */}
            {selectedLocation && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="absolute top-6 right-6 md:top-10 md:right-10 glass border border-brand-blue/20 p-6 rounded-2xl shadow-xl shadow-brand-blue/10 max-w-sm z-20 backdrop-blur-md bg-white/80"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📍</span>
                            <h3 className="text-xl font-bold text-brand-navy">
                                {selectedLocation.country}
                            </h3>
                        </div>
                        <button
                            onClick={() => setSelectedLocation(null)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-brand-navy/5 hover:bg-brand-navy/10 text-brand-navy/60 hover:text-brand-navy transition-all"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                            <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-1">City</p>
                            <p className="text-brand-navy font-medium">{selectedLocation.city}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                            <p className="text-xs font-semibold text-brand-blue uppercase tracking-wider mb-1">Address</p>
                            <p className="text-brand-navy font-medium">{selectedLocation.details}</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Instructions Pill */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="glass px-6 py-3 rounded-full shadow-lg border border-brand-blue/20 bg-white/80 backdrop-blur-sm flex items-center gap-2"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                    </span>
                    <p className="text-sm font-medium text-brand-navy/80">
                        Interactive Map • Drag to rotate • Click pins
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
