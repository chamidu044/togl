/**
 * Single source of truth for all site copy.
 * Facts are taken from trans-orbit.lk and the TOGL company profile;
 * wording is edited for the new site.
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
  promise: "We move possibilities, with trust.",
  description:
    "Air and sea freight, LCL consolidation, customs brokerage and warehousing from Colombo, Sri Lanka. Reliable freight solutions worldwide since 2011.",
  registrations: [
    { label: "Business registration no.", value: "PV 79220" },
    { label: "DGMS registration", value: "Class A" },
    { label: "Freight forwarder registration", value: "FFA01048-2023" },
    { label: "Exchange control registration", value: "06/07/009/0415" },
  ],
};

export const leadership = {
  ceo: {
    name: "Janaka Alexander",
    title: "Chief Executive Officer",
    summary:
      "An industry veteran with more than 34 years of leadership experience, having held key positions in sales and commercial management.",
  },
  structure: [
    "TOGL is managed by the Chief Executive Officer, who reports to a board of directors that includes one executive director, who is also the Chairman.",
    "Day-to-day management is entrusted to the corporate management team, headed by the CEO.",
  ],
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
      "Customs brokerage at origin and destination",
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
    category: "Document secure solution",
    summary:
      "Highly classified documents processed promptly, efficiently and securely, from storage to disposition.",
    body: [
      "We help businesses handle their most sensitive documents through central management, from storage through to final disposition.",
      "Every step is handled promptly and securely, so confidential paperwork is always where it should be, and nowhere else.",
    ],
    includes: [
      "Secure handling of classified documents",
      "Central management from storage to disposition",
      "Prompt, efficient processing",
      "Trade and shipping documents handled with care",
    ],
    image: "/images/documents.jpg",
    imageAlt: "Shipping forms and documents on a desk",
  },
];

/** What TOGL specialises in, per the company profile. */
export const specialisms = [
  { name: "Sea freight", detail: "FCL and LCL consolidation" },
  { name: "Air freight", detail: "Consolidated and time-critical" },
  { name: "Customs brokerage", detail: "Import and export clearance" },
  { name: "Warehousing", detail: "Storage and transport" },
] as const;

/** Specialist solutions from "Why partner with us" in the company profile. */
export const specialistSolutions = [
  {
    title: "Trade logistics and export factory",
    description:
      "Lower total costs and faster response through packaging, customs clearance, overseas transport and account settlement for clients distributing worldwide.",
  },
  {
    title: "Sales logistics",
    description:
      "Third-party logistics across a variety of transport modes, including parcel delivery, to support manufacturers' and distributors' sales growth.",
  },
  {
    title: "Service parts logistics",
    description:
      "Service parts supply, repair of original equipment and after-sales services, including recall campaigns.",
  },
  {
    title: "Medical logistics",
    description:
      "Safe distribution for medical equipment and drug manufacturers and medical institutions, without shipment errors or damage.",
  },
  {
    title: "Fine arts transport",
    description:
      "Specialised packaging and transport of art objects for exhibitors and event promoters, for the safe, secure display of priceless works.",
  },
  {
    title: "Overseas relocation support",
    description:
      "Moving, visa applications, real estate referrals and language training for employees that client companies assign overseas.",
  },
  {
    title: "Document secure solution",
    description:
      "Highly classified documents processed promptly and securely, through central management from storage to disposition.",
  },
  {
    title: "Beverage transportation",
    description:
      "Just-in-time delivery and lower distribution costs, with handling specialised for glass bottles, cans and PET bottles.",
  },
  {
    title: "Packing technology",
    description:
      "Packing materials and techniques for specific products that support sales growth, cost reduction and environmental conservation.",
  },
];

export const stats = [
  { value: 2011, label: "Moving cargo since", format: "year" as const },
  { value: 100, suffix: "+", label: "Years of combined customs expertise" },
  { value: 34, suffix: "+", label: "Years of industry leadership from our CEO" },
  { value: 2, label: "Offices in Sri Lanka" },
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
      "Fully web-enabled systems give you real-time visibility of your shipment, by sea or air.",
    image: "/images/sea-open.jpg",
    imageAlt: "Container ship crossing open water, seen from above",
  },
  {
    title: "Clearance and delivery",
    description:
      "We clear the goods at destination and deliver to your door, warehouse or end customer.",
    image: "/images/warehouse-aisle.jpg",
    imageAlt: "Warehouse aisle stocked with cartons ready for delivery",
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
  "Medical",
  "Beverages",
];

export const reasons = [
  {
    title: "People who know customs",
    description:
      "Our team brings more than 100 years of combined customs brokerage experience, led by a CEO with over 34 years in the industry.",
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
    body: "As a non-asset-based company, we invest in people and systems. By growing organically rather than through acquisition, we give clients and employees peace of mind that their day-to-day business won't be disrupted, and we keep our systems' integrity intact. What matters is the quality and consistency of our service, whichever country we're working in.",
  },
  {
    title: "Objective",
    body: "To provide complete supply chain solutions: customs brokerage and freight forwarding, fulfilment and e-commerce fulfilment, real estate services, small parcel delivery, transportation and transportation management, and value-added warehousing.",
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
