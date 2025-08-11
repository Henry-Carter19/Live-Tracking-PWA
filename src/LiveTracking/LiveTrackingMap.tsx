import React, { useEffect, useState } from "react";
import { Card, Spinner, Badge } from "react-bootstrap";
import { GeoAltFill, ClockFill } from "react-bootstrap-icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./liveTracking.css";

// Fix the TypeScript error by declaring the missing props
declare module 'react-leaflet' {
  interface MapContainerProps {
    center?: LatLngTuple;
    zoom?: number;
    scrollWheelZoom?: boolean;
  }
}

const LiveTrackingMap: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCoords({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setLastUpdated(new Date().toLocaleTimeString());
          },
          (err) => console.error("Error getting location:", err),
          { enableHighAccuracy: true }
        );
      } else {
        console.error("Geolocation not supported");
      }
    };

    getLocation();
    const interval = setInterval(getLocation, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="live-tracking-container shadow-sm">
      <Card.Header className="d-flex align-items-center">
        <GeoAltFill className="me-2 text-primary" size={20} />
        <span className="fw-bold">Live Location Tracking</span>
      </Card.Header>
      <Card.Body>
        {coords ? (
          <>
            <div className="location-data mb-3">
              <div className="mb-3">
                <Badge bg="info" className="d-inline-flex align-items-center">
                  <ClockFill className="me-1" size={12} />
                  Last updated: {lastUpdated}
                </Badge>
              </div>

              <div className="coord-item">
                <span className="coord-label">Latitude:</span>
                <span className="coord-value">{coords.lat.toFixed(6)}</span>
              </div>

              <div className="coord-item">
                <span className="coord-label">Longitude:</span>
                <span className="coord-value">{coords.lng.toFixed(6)}</span>
              </div>
            </div>

            {/* Map section */}
            <div style={{ height: "300px", width: "100%" }}>
              <MapContainer
                center={[coords.lat, coords.lng]}
                zoom={15}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />
                <Marker position={[coords.lat, coords.lng]}>
                  <Popup>Your current location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </>
        ) : (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2 mb-0">Fetching your location...</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default LiveTrackingMap;
