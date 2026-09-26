/**
 * Single source of truth for all site copy.
 * Facts are taken from trans-orbit.lk; wording is edited for the new site.
 */

export const company = {
  name: "Trans Orbit Global Logistics",
  legalName: "Trans Orbit Global Logistics (Pvt) Ltd",
  shortName: "TOGL",
  tagline: "Access to the world",
  founded: 2011,
  status: "Private Limited Liability",
  scope: "International & national logistics management",
  url: "https://www.trans-orbit.lk",
  description:
    "Freight forwarding by sea, air, road and rail from Colombo, Sri Lanka. Customs brokerage, dangerous goods, cross trade and supply chain solutions since 2011.",
};

export const contact = {
  email: "info@trans-orbit.lk",
  phone: "+94 11 266 4811",
  phoneHref: "tel:+94112664811",
  fax: "+94 11 266 4812",
  facebook: "https://www.facebook.com/transorbitgloballogistics",
  offices: [
    {
      label: "Operations office",
      lines: ["No. 125, Ananda Rajakaruna Mawatha", "Colombo 10", "Sri Lanka"],
      mapQuery: "125 Ananda Rajakaruna Mawatha, Colombo 10, Sri Lanka",
    },
    {
      label: "City office",
      lines: [
        "No. 280 A, Sri Dhamma Mawatha",
        "(formerly Campbell Avenue)",
        "Colombo 10, Sri Lanka",
      ],
      mapQuery: "280 Sri Dhamma Mawatha, Colombo 10, Sri Lanka",
    },
  ],
};

export type NavLink = { name: string; href: string; section?: string };

export const navLinks: NavLink[] = [
  { name: "Services", href: "/#services", section: "services" },
  { name: "Process", href: "/#process", section: "process" },
  { name: "Network", href: "/#network", section: "network" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export type ServiceSlug =
  | "air-freight"
  | "sea-freight"
  | "specialized"
  | "cross-trade"
  | "service-parts"
  | "documents";

export type Service = {
  slug: ServiceSlug;
  title: string;
  category: string;
  summary: string;
  body: string[];
  includes: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    slug: "air-freight",
    title: "Air Freight",
    category: "Air consolidation",
    summary:
      "Cost-conscious air consolidation to and from India, with room for the shipment that missed the first pickup.",
    body: [
      "We consolidate your shipments to and from India even when they are picked up at different times of the day, so you pay consolidation rates without waiting on a single collection.",
      "If a critical shipment misses the first pickup, call us. Until your cargo is tendered to the airline, we will still consolidate it, even if it is collected from a different location in the same province or city.",
    ],
    includes: [
      "Consolidated air cargo to and from India",
      "Late additions up to airline tender",
      "Multi-location pickups in the same city",
      "Airline booking and airway bill documentation",
    ],
    image: "/images/air-cargo.jpg",
    imageAlt: "Cargo aircraft on an airport apron at sunset",
  },
  {
    slug: "sea-freight",
    title: "Sea Freight",
    category: "FCL and LCL",
    summary:
      "Ocean freight forwarding for full and shared containers to and from the world's major markets.",
    body: [
      "We provide comprehensive ocean freight forwarding, including FCL and LCL consolidated shipments to and from the world's major markets.",
      "A worldwide network of responsive, trained professionals and integrated information systems keeps your cargo moving and your paperwork in order at every port.",
    ],
    includes: [
      "Full container load (FCL)",
      "Less than container load (LCL) consolidation",
      "Port-to-port and door-to-door",
      "Bills of lading and shipping documentation",
    ],
    image: "/images/sea-aerial.jpg",
    imageAlt: "Aerial view of a container ship under way",
  },
  {
    slug: "specialized",
    title: "Hazardous Cargo",
    category: "Specialized logistics",
    summary:
      "Dangerous goods moved by certified people, with the paperwork and packaging done right the first time.",
    body: [
      "If you supply or purchase dangerous goods, we help you through the complexity that comes with moving restricted materials, particularly by air.",
      "Our hazardous-certified personnel manage the logistics process through to the end user.",
    ],
    includes: [
      "Dangerous goods documentation, completed correctly to avoid delays",
      "Packaging arranged to the required IATA standard",
      "Handling by DG-certified personnel",
      "Consolidated DG shipments where permitted",
    ],
    image: "/images/tanker.jpg",
    imageAlt: "Green tanker truck carrying bulk liquid cargo",
  },
  {
    slug: "cross-trade",
    title: "Cross Trade",
    category: "Third-party shipping",
    summary:
      "Collect from your supplier and ship straight to your customer, anywhere in the world.",
    body: [
      "If your client needs a consignment in another part of the world, we collect it from your supplier and ship it directly to your end user.",
      "Every movement is coordinated through our network, so the goods never need to pass through Sri Lanka.",
    ],
    includes: [
      "Supplier collection in the origin country",
      "Direct shipment to your end user",
      "Coordination across our partner network",
      "One point of contact from origin to destination",
    ],
    image: "/images/port-terminal.jpg",
    imageAlt: "Container terminal with stacked containers and gantry cranes",
  },
  {
    slug: "service-parts",
    title: "Service Parts",
    category: "After-sales logistics",
    summary:
      "Keep service parts, repairs and recalls moving so your customers stay supported.",
    body: [
      "For manufacturers of consumer goods, we take on the supply of service parts, the movement of original equipment for repair, and a wide range of after-sales logistics.",
      "That includes recall campaigns, so you can protect your customers and your reputation without building the logistics yourself.",
    ],
    includes: [
      "Service parts supply",
      "Returns and repair movements",
      "Recall campaign logistics",
      "Parts centre and production line supply",
    ],
    image: "/images/warehouse.jpg",
    imageAlt: "Warehouse racking with a forklift in the aisle",
  },
  {
    slug: "documents",
    title: "Document Logistics",
    category: "Trade documents",
    summary:
      "Time-critical trade documents delivered securely, so your cargo is never held up by paperwork.",
    body: [
      "Original bills of lading, certificates of origin and letters of credit often decide when cargo can be released. We move them securely and on time.",
      "We track each consignment from pickup to signature and coordinate with banks, consignees and customs so nothing waits on a missing original.",
    ],
    includes: [
      "Original bills of lading and certificates of origin",
      "Letters of credit and bank documents",
      "Tracked pickup and signed delivery",
      "Coordination with banks and consignees",
    ],
    image: "/images/documents.jpg",
    imageAlt: "Shipping forms and documents on a desk",
  },
];

export const modes = [
  {
    name: "Sea",
    detail: "FCL and LCL ocean freight",
    image: "/images/sea-wake.jpg",
    imageAlt: "Container ship leaving a white wake on dark blue water",
  },
  {
    name: "Air",
    detail: "Consolidated and time-critical",
    image: "/images/air-loading.jpg",
    imageAlt: "Cargo being loaded onto an aircraft",
  },
  {
    name: "Road",
    detail: "Domestic and cross-border haulage",
    image: "/images/road.jpg",
    imageAlt: "Truck driving along a winding highway",
  },
  {
    name: "Rail",
    detail: "Container rail connections",
    image: "/images/rail.jpg",
    imageAlt: "Container trains in a rail yard",
  },
] as const;

export const stats = [
  { value: 2011, label: "Moving cargo since", format: "year" as const },
  { value: 100, suffix: "+", label: "Years of combined customs expertise" },
  { value: 4, label: "Modes of transport: sea, air, road and rail" },
  { value: 2, label: "Offices in Colombo" },
];

export const processSteps = [
  {
    title: "Consult and quote",
    description:
      "Tell us what you're moving, from where and by when. We recommend the right mode and route for your cost and timeline.",
    image: "/images/team-port.jpg",
    imageAlt: "Two logistics staff in hard hats reviewing a tablet beside shipping containers",
  },
  {
    title: "Documentation and customs",
    description:
      "Our customs brokerage team prepares every declaration, permit and certificate, including dangerous goods paperwork.",
    image: "/images/documents.jpg",
    imageAlt: "Customs forms and shipping documents",
  },
  {
    title: "Pickup and consolidation",
    description:
      "We collect from your supplier or factory and consolidate with other cargo where it saves you money.",
    image: "/images/air-loading.jpg",
    imageAlt: "Cargo being loaded onto an aircraft",
  },
  {
    title: "Transit with visibility",
    description:
      "Web-enabled systems give you real-time visibility of your shipment across sea, air, road and rail.",
    image: "/images/sea-open.jpg",
    imageAlt: "Container ship crossing open water, seen from above",
  },
  {
    title: "Clearance and delivery",
    description:
      "We clear the goods at destination and deliver to your door, warehouse or end customer.",
    image: "/images/road-dusk.jpg",
    imageAlt: "Trucks on a highway at dusk",
  },
];

export const industries = [
  "Consumer goods",
  "Fashion and luxury",
  "Capital goods",
  "Pharma and cosmetics",
  "Mass distribution",
  "Wines and spirits",
  "Automotive",
  "Electronics",
  "Fine art",
  "Perishables",
];

export const reasons = [
  {
    title: "People who know customs",
    description:
      "Our team brings more than 100 years of combined experience in customs brokerage for import and export.",
  },
  {
    title: "Dangerous goods, handled properly",
    description:
      "Hazardous-certified staff, correct DG documentation and packaging to IATA standard.",
  },
  {
    title: "Real-time visibility",
    description:
      "Fully web-enabled systems show where your products are throughout the supply chain.",
  },
  {
    title: "Invested in people, not assets",
    description:
      "As a non-asset-based company we choose the right carrier for your cargo, not the one we own.",
  },
  {
    title: "Consolidation that bends",
    description:
      "Separate pickups, late additions and multiple locations can still ride on one consolidation.",
  },
  {
    title: "Honest, steady growth",
    description:
      "We grow organically, not by acquisition, so your day-to-day business is never disrupted.",
  },
];

export const solutions = [
  {
    title: "Customs brokerage",
    description: "Import and export clearance, duties and trade compliance.",
  },
  {
    title: "Freight forwarding",
    description: "International and domestic transport across every mode.",
  },
  {
    title: "Fulfilment and e-commerce",
    description: "Order fulfilment for retail and online sellers.",
  },
  {
    title: "Small parcel delivery",
    description: "Samples, spares and parcels, tracked end to end.",
  },
  {
    title: "Transportation management",
    description: "Planning, carrier selection and execution in one place.",
  },
  {
    title: "Value-added warehousing",
    description: "Storage, labelling, kitting and distribution.",
  },
];

export const principles = [
  {
    title: "Mission",
    body: "To be the region's best-staffed and best-managed integrated supply chain company, inventing new concepts and solutions that give our clients more options for their transportation needs.",
  },
  {
    title: "Vision",
    body: "As a non-asset-based company, we invest in people and systems. By growing organically rather than through acquisition, we give clients and employees peace of mind that their day-to-day business won't be disrupted, whichever country we're working in.",
  },
  {
    title: "Objective",
    body: "To provide complete supply chain solutions: customs brokerage and freight forwarding, fulfilment and e-commerce fulfilment, small parcel delivery, transportation management, and value-added warehousing.",
  },
];

/** Trade lanes drawn on the network map and globe. Colombo is always the origin. */
export const colombo = { lat: 6.9271, lng: 79.8612, label: "Colombo" };

export const hubs: {
  lat: number;
  lng: number;
  label: string;
  labelSide?: "left" | "right";
}[] = [
  { lat: 13.0827, lng: 80.2707, label: "Chennai", labelSide: "right" },
  { lat: 19.076, lng: 72.8777, label: "Mumbai", labelSide: "left" },
  { lat: 25.2048, lng: 55.2708, label: "Dubai", labelSide: "left" },
  { lat: 1.3521, lng: 103.8198, label: "Singapore", labelSide: "right" },
  { lat: 31.2304, lng: 121.4737, label: "Shanghai", labelSide: "right" },
  { lat: 51.9244, lng: 4.4777, label: "Rotterdam", labelSide: "right" },
  { lat: 51.5072, lng: -0.1276, label: "London", labelSide: "left" },
  { lat: 40.7128, lng: -74.006, label: "New York", labelSide: "left" },
  { lat: -33.8688, lng: 151.2093, label: "Sydney", labelSide: "right" },
];
