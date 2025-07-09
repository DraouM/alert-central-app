# Alert Central: User Flow and Database Schema

This document outlines the user interaction flow for the Alert Central application and proposes a corresponding database schema.

## 1. User Flow

The application has two main user perspectives: the **Citizen** (who reports the emergency) and the **Authority User** (the dispatcher/admin managing the response).

### 1.1. Citizen User Flow (Reporting an Incident)

*This flow describes how a request is initiated. While the current project is the admin panel, this explains the origin of the data.*

1.  **Initiate Report:** A citizen opens a (hypothetical) mobile or web application to report an emergency.
2.  **Provide Details:** The citizen provides essential information about the incident:
    *   **Incident Type:** Selects from a list (e.g., Fire, Medical, Crime, Traffic).
    *   **Location:** Shares their current location via GPS or enters an address manually.
    *   **Description:** Writes a brief text description of the situation.
    *   **Media Upload (Optional):** Uploads photos of the scene or records a short voice message to provide more context.
3.  **Submit Alert:** The citizen submits the alert. The system captures their user details (Name, National ID) from their profile.
4.  **Confirmation:** The citizen receives a confirmation that their alert has been received and is being processed, along with a request ID.

### 1.2. Authority User Flow (Dispatcher/Admin)

1.  **Login:** An authorized user (e.g., a dispatcher, supervisor) logs into the **Alert Central** admin panel.

2.  **View Dashboard:**
    *   **Technology:** Next.js Server Component (`/dashboard/page.tsx`).
    *   **Action:** Upon login, the user is directed to the main dashboard.
    *   **Display:** They see key statistics at the top (Total Requests, New, In Progress, Closed). Below, a table (`<RequestsTable />`) lists all incoming requests, sortable and showing key info like ID, time, location, type, priority, and status.

3.  **Filter and Find Requests:**
    *   **Technology:** React Client Component (`<DashboardFilters />`) using state management for filter values.
    *   **Action:** The user needs to find a specific request or narrow down the list. They use the filter controls to filter by `Status`, `Date`, or `Zone`. They can also use the search bar to find a request by ID or location.

4.  **Investigate an Incident:**
    *   **Technology:** Next.js Dynamic Route (`/requests/[id]/page.tsx`).
    *   **Action:** The user clicks on a request in the dashboard table to view its details.
    *   **Display:** A detailed page shows:
        *   **User Information:** Citizen's name and national ID.
        *   **Incident Summary:** Type, priority, status, location, and full description.
        *   **Uploaded Media:** Any images are displayed, and a button allows playback of the voice message.
        *   **Responder Team:** A section to view assigned responders and their status.

5.  **Manage Responders:**
    *   **Technology:** React Client Component (`/responders/page.tsx`).
    *   **Action:** The user navigates to the "Responders" page.
    *   **Display:** They see a table of all available responders (`<RespondersTable />`), their roles, service section (Police, Hospital), status (Online, Busy, Inactive), and current assignment. They can filter this list to find available personnel. From here, they could be assigned to an incident.

6.  **Visualize Incidents on a Map:**
    *   **Technology:** React Client Component (`/map-view/page.tsx`) with a map library.
    *   **Action:** The user goes to the "Map View".
    *   **Display:** A map shows the geographic location of all incidents, color-coded by priority or type. High-density areas show clustered markers. This view helps visualize hotspots and allocate resources efficiently.

7.  **Analyze Trends:**
    *   **Technology:** Next.js Page (`/analytics/page.tsx`) with a charting library (`recharts`).
    *   **Action:** The user visits the "Analytics" page.
    *   **Display:** Interactive charts show metrics like incidents by Wilaya, incidents by service type, and average response times over a month. This helps in strategic planning and performance evaluation.

8.  **Configure Zones:**
    *   **Technology:** Next.js Page (`/zones/page.tsx`).
    *   **Action:** An admin navigates to "Zone Configuration".
    *   **Display:** The user can define or edit operational zones (e.g., "Zone A", "Zone B") within a Wilaya and specify the service boundaries and sections associated with them.

## 2. Proposed Database Schema

A NoSQL database like **Cloud Firestore** is well-suited for this application due to its flexible, document-based structure and real-time capabilities.

Here is a proposed schema using Firestore collections:

### `requests` collection

This collection stores each emergency request as a document.

*   **Document ID:** Unique auto-generated ID (e.g., `REQ1001`).

```json
// Example document in 'requests' collection
{
  "id": "REQ1001",
  "timestamp": "2023-10-27T10:00:00Z", // Firestore Timestamp
  "location": "Algiers Center",
  "zone": "Zone A", // Can be a reference to a 'zones' document
  "type": "fire", // "fire" | "medical" | "crime" | "traffic" | "other"
  "priority": "high", // "low" | "medium" | "high" | "critical"
  "status": "in-progress", // "new" | "in-progress" | "closed"
  "user": {
    "name": "Ali Ben Omar",
    "nationalId": "DZ123456789",
    "userId": "USER_abc123" // Reference to a user in a 'users' collection
  },
  "shortDescription": "Building on fire near the main post office.",
  "details": "User reported seeing smoke from the 5th floor. Sounds of alarms in the background. Mentioned people might be trapped.",
  "voiceMessageUrl": "gs://alert-central-bucket/audio/REQ1001.wav", // Link to Cloud Storage
  "imageUrls": [
    "gs://alert-central-bucket/images/REQ1001_1.jpg",
    "gs://alert-central-bucket/images/REQ1001_2.jpg"
  ],
  "assignedResponderIds": ["RESP_xyz789", "RESP_uvw456"], // Array of Responder IDs
  "geo": {
    "latitude": 36.775,
    "longitude": 3.058
  }
}
```

### `responders` collection

Stores information about each responder.

*   **Document ID:** Unique Responder ID (e.g., `RESP_xyz789`).

```json
// Example document in 'responders' collection
{
  "id": "RESP_xyz789",
  "name": "Nadia Cherif",
  "role": "field_agent", // "dispatcher" | "supervisor" | "field_agent"
  "status": "busy", // "online" | "busy" | "inactive"
  "currentAssignmentId": "REQ1001", // Reference to a request document ID
  "wilaya": "Algiers",
  "serviceSection": "Civil Protection",
  "contact": {
    "phone": "+213-555-0101",
    "radioId": "CP-Alpha-1"
  }
}
```

### `zones` collection

Defines the operational zones.

*   **Document ID:** Unique Zone ID (e.g., `ZONE_ALG_A`).

```json
// Example document in 'zones' collection
{
  "id": "ZONE_ALG_A",
  "name": "Zone A",
  "wilaya": "Algiers",
  "serviceBoundaries": "GeoJSON object defining the zone's polygon",
  "sections": [
    {
      "sectionId": "SEC_POL_A",
      "name": "Police Section A",
      "service": "Police"
    },
    {
      "sectionId": "SEC_HOSP_A",
      "name": "Hospital District A",
      "service": "Hospital"
    }
  ]
}
```
