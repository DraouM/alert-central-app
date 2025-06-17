
import type { EmergencyRequest, Responder, WilayaZone, RequestStatus, IncidentType, Priority, ResponderStatus, ResponderRole, AnalyticsData } from './types';
import { subDays, subHours } from 'date-fns';

const users = [
  { name: "Ali Ben Omar", nationalId: "DZ123456789" },
  { name: "Fatima Zahra", nationalId: "DZ987654321" },
  { name: "Karim Salah", nationalId: "DZ112233445" },
  { name: "Amina Khelifa", nationalId: "DZ556677889" },
];

const locations = ["Algiers Center", "Oran City", "Constantine Downtown", "Annaba Port", "Setif Heights"];
const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
const incidentTypes: IncidentType[] = ["fire", "medical", "crime", "traffic", "other"];
const priorities: Priority[] = ["low", "medium", "high", "critical"];
const requestStatuses: RequestStatus[] = ["new", "in-progress", "closed"];

export const mockRequests: EmergencyRequest[] = Array.from({ length: 25 }, (_, i) => {
  const user = users[i % users.length];
  const type = incidentTypes[i % incidentTypes.length];
  return {
    id: `REQ${1001 + i}`,
    timestamp: subHours(new Date(), i * 2 + 1),
    location: locations[i % locations.length],
    zone: zones[i % zones.length],
    type: type,
    priority: priorities[i % priorities.length],
    status: requestStatuses[i % requestStatuses.length],
    user: user,
    shortDescription: `Incident of type ${type} reported by ${user.name}.`,
    details: `Detailed description for request REQ${1001 + i}. This involves a ${type} incident at ${locations[i % locations.length]}. User reported feeling unsafe / requiring immediate assistance. Additional notes: ...`,
    voiceMessageUrl: i % 3 === 0 ? "mock_voice.mp3" : undefined,
    imageUrls: i % 2 === 0 ? [`https://placehold.co/600x400.png?text=Incident+Image+1&r=${i}` , `https://placehold.co/600x400.png?text=Incident+Image+2&r=${i+1}`] : [],
    assignedResponderIds: i % 4 === 0 ? [`RESP${2001 + (i%5)}`] : [],
    geo: {
      origin: { lat: 36.775 + (i * 0.001), lon: 3.058 + (i * 0.001) },
      destination: i % 5 === 0 ? { lat: 36.778 + (i * 0.001), lon: 3.062 + (i * 0.001) } : undefined,
    }
  };
});

const responderNames = ["Nadia Cherif", "Youssef Hamidi", "Sofia Abbas", "Mehdi Bouzid", "Leila Mansouri"];
const responderRoles: ResponderRole[] = ["dispatcher", "supervisor", "field_agent"];
const responderStatuses: ResponderStatus[] = ["online", "busy", "inactive"];
const wilayas = ["Algiers", "Oran", "Constantine", "Annaba", "Setif"];
const serviceSections = ["Police", "Civil Protection", "Hospital"];


export const mockResponders: Responder[] = Array.from({ length: 15 }, (_, i) => ({
  id: `RESP${2001 + i}`,
  name: responderNames[i % responderNames.length] + (i > 4 ? ` ${Math.floor(i/5)}` : ''),
  role: responderRoles[i % responderRoles.length],
  status: responderStatuses[i % responderStatuses.length],
  currentAssignmentId: responderStatuses[i % responderStatuses.length] === 'busy' ? mockRequests[i % mockRequests.length].id : undefined,
  wilaya: wilayas[i % wilayas.length],
  serviceSection: serviceSections[i % serviceSections.length],
}));

export const mockWilayaZones: WilayaZone[] = wilayas.map((wilayaName, i) => ({
  id: `WIL${3001 + i}`,
  name: wilayaName,
  sections: [
    { id: `SEC${4001 + i*3}`, name: `${serviceSections[0]} Section ${String.fromCharCode(65 + i)}`, service: serviceSections[0]},
    { id: `SEC${4002 + i*3}`, name: `${serviceSections[1]} Unit ${i + 1}`, service: serviceSections[1]},
    { id: `SEC${4003 + i*3}`, name: `${serviceSections[2]} District ${String.fromCharCode(88 + i)}`, service: serviceSections[2]},
  ],
  serviceBoundaries: `Custom service boundaries defined for ${wilayaName}. Includes areas X, Y, and Z.`,
}));


export const mockAnalyticsData: AnalyticsData = {
  incidentsByWilaya: wilayas.map((w, i) => ({ name: w, total: Math.floor(Math.random() * 50) + 10 + (i*5) })),
  incidentsByService: serviceSections.map((s, i) => ({ name: s, total: Math.floor(Math.random() * 80) + 20 + (i*10) })),
  incidentsByMonth: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => ({ name: m, total: Math.floor(Math.random() * 100) + 30 })),
  avgResponseTime: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => ({ month: m, time: Math.floor(Math.random() * 20) + 5 })),
};

