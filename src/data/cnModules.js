export const cnModules = [
  {
    id: 'cn_fundamentals',
    title: 'Module 1: Foundations of Computer Networks',
    notes: {
      intro: "At its core, a computer network is an interconnected group of autonomous computing devices (nodes) that communicate with one another using standardized protocols to share resources and data. Here is a breakdown of the foundational concepts you need to know.",
      chapter1: {
        title: "Why Networking Exists & Primary Goals",
        points: [
          "Explanation:\nBefore networks, moving data meant physically handing someone a floppy disk. Networks exist primarily for **resource sharing** (hardware, software, data) and **distributed processing** (breaking tasks across machines).",
          "When we design networks, we engineer them to achieve several specific goals:",
          "**Reliability:** Networks must be fault-tolerant. If one cable is cut or a router fails, traffic should reroute dynamically.",
          "**Scalability:** A well-designed system allows for the seamless addition of new nodes without degrading the performance of the existing architecture.",
          "**Performance:** Delivering data with high throughput and low latency.",
          "**Security:** Ensuring data integrity, confidentiality, and availability."
        ]
      },
      chapter2: {
        title: "The Four Core Components",
        points: [
          "A network isn't just the cables; it's a combination of hardware and software working in tandem.",
          "**1. Nodes (End Systems):** The devices users and applications interact with—laptops, smartphones, IoT sensors, and massive database servers.",
          "**2. Transmission Media (Links):** The physical pathways carrying the data. These can be guided (copper Ethernet cables, fiber optics) or unguided (Wi-Fi radio frequencies, satellite links).",
          "**3. Networking Devices:** The hardware directing the traffic. Switches forward data to specific devices within a single local network, while Routers forward data between different networks.",
          "**4. Protocols:** The strict rules defining how data is formatted, transmitted, and received (e.g., TCP/IP, HTTP). Without shared protocols, devices cannot understand each other."
        ]
      },
      chapter3: {
        title: "Types of Network Communication",
        points: [
          "At the routing level, networks deliver packets using distinct distribution methods:",
          "| Method | Sender to Receiver | Example Use Case |\n|---|---|---|\n| **Unicast** | One-to-One | Streaming a video to your phone |\n| **Broadcast** | One-to-All | A router announcing its presence |\n| **Multicast** | One-to-Many | A live IPTV feed |\n| **Anycast** | One-to-Closest | CDN routing you to the nearest edge server |"
        ]
      },
      chapter4: {
        title: "Logical Architecture: Client-Server vs. Peer-to-Peer",
        points: [
          "How we organize the roles of the nodes dictates the network's architecture.",
          "| Architecture | Description | Pros | Cons |\n|---|---|---|---|\n| **Client-Server** | Centralized machines (servers) host resources and fulfill requests made by user devices (clients). | Highly scalable, easy to secure, centralized backups. | Single point of failure, potential bottleneck under load. |\n| **Peer-to-Peer (P2P)** | Decentralized architecture where all nodes are equal, acting as both client and server simultaneously. | Highly resilient, inherently scales bandwidth as peers join. | Hard to secure, complex distributed data management. |"
        ]
      },
      chapter5: {
        title: "Examples in the Wild",
        points: [
          "Explanation:\nTo tie this all together, networks are typically classified by their geographical scope.",
          "**Personal Area Network (PAN):** A Bluetooth connection pairing your smartphone to your wireless headphones.",
          "**Local Area Network (LAN):** A home Wi-Fi network, or a corporate office where computers share a local switch and printer.",
          "**Wide Area Network (WAN):** The Internet itself—the ultimate 'network of networks', connecting disparate LANs across the globe via massive fiber optic backbones."
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary difference between a Switch and a Router?",
        back: "Switches forward data within a SINGLE local network. Routers forward data BETWEEN different networks."
      },
      {
        front: "What is Anycast?",
        back: "A one-to-closest distribution method where a request is routed to the geographically closest server among multiple servers sharing the same IP address."
      },
      {
        front: "What is the key disadvantage of a Client-Server architecture?",
        back: "The server acts as a single point of failure and can become a bottleneck under heavy load."
      }
    ],
    quiz: [
      {
        question: "Which transmission method sends data from a single sender to a specific subset of receivers?",
        options: ["Unicast", "Broadcast", "Multicast", "Anycast"],
        answer: 2
      },
      {
        question: "A Bluetooth connection between a smartphone and headphones is an example of a:",
        options: ["LAN", "WAN", "PAN", "MAN"],
        answer: 2
      },
      {
        question: "Which of the following is an unguided transmission medium?",
        options: ["Copper Ethernet cable", "Fiber optics", "Wi-Fi radio frequencies", "Coaxial cable"],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_network_types',
    title: 'Module 2: Types of Networks',
    notes: {
      intro: "Network classifications largely dictate how we design systems. We generally classify networks based on their geographical scope (how far they stretch) and their logical purpose (what they are built to do).\n\nHere is the breakdown of the major network types you need to know.",
      chapter1: {
        title: "Classification by Geographical Scope",
        points: [
          "Explanation:\nThe first four networks scale up based on the physical distance they cover.",
          "**1. PAN (Personal Area Network):** The smallest network type, typically covering a radius of just a few meters around a single person. They are mostly wireless (WPAN) and are designed to connect personal devices without needing a router.",
          "**Real-world example:** Your smartphone paired with Bluetooth earbuds, or a smartwatch syncing health data to your phone.",
          "**2. LAN (Local Area Network):** A network confined to a single physical location like a room, building, or campus. LANs are typically privately owned and offer incredibly high speeds (up to 10-100 Gbps on enterprise fiber) with very low latency.",
          "**Real-world example:** The Wi-Fi network in your home, or a corporate office where hundreds of computers are wired into Ethernet switches to access local servers and printers.",
          "**3. MAN (Metropolitan Area Network):** Larger than a LAN but smaller than a WAN, a MAN typically spans a city or a large university campus. It often acts as a high-speed backbone connecting multiple LANs together.",
          "**Real-world example:** A city-wide fiber-optic ring provided by an ISP, or a local cable television network that provides internet access to a specific municipality.",
          "**4. WAN (Wide Area Network):** A network that spans large geographical areas—countries, continents, or the entire globe. Because data travels vast distances, WANs inherently have higher latency and lower bandwidth compared to LANs. They usually lease telecommunication lines (like fiber-optic submarine cables) to connect different LANs.",
          "**Real-world example:** The Internet itself is the largest WAN. A private example would be a corporate network connecting a headquarters in New York to a branch office in Tokyo."
        ]
      },
      chapter2: {
        title: "Classification by Logical Purpose",
        points: [
          "Explanation:\nNot all network acronyms refer to geography. Some refer to *how* or *why* the network is built.",
          "**SAN (Storage Area Network):** A SAN is a specialized, high-speed network that provides block-level network access to storage. Instead of a server having its own hard drives, it connects to a SAN. To the server's operating system, the remote SAN storage appears exactly as if it were a local, physically attached drive.",
          "**Real-world example:** An enterprise data center using Fibre Channel switches to connect a cluster of database servers to a massive array of flash storage.",
          "**VPN (Virtual Private Network):** A VPN isn't a physical network; it is a **logical overlay**. It creates a secure, encrypted tunnel over a public network (like the internet). It allows users to send and receive data as if their devices were directly connected to a private LAN.",
          "**Real-world example:** A remote software engineer working from a coffee shop connects to their company's VPN. Their traffic is encrypted over the public Wi-Fi and routed securely to the corporate servers, allowing them to access internal source code repositories."
        ]
      },
      chapter3: {
        title: "Key Differences at a Glance",
        points: [
          "Explanation:\nWhen designing a system, the constraints of the underlying network dictate your architecture. Here is how the geographical networks compare:",
          "| Feature | PAN | LAN | MAN | WAN |\n|---|---|---|---|---|\n| **Scope** | ~10 Meters | Room / Building / Campus | City / Municipality | Country / Global |\n| **Ownership** | Private (Single user) | Private (Organization) | Private or Public | Usually multiple ISPs |\n| **Speed/Bandwidth** | Low (Mbps) | Very High (Gbps) | High (Gbps) | Variable (Mbps to Gbps) |\n| **Latency** | Very Low | Very Low | Moderate | High (Distance constrained) |\n| **Maintenance Cost** | Negligible | Low to Moderate | High | Very High |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary difference between a LAN and a WAN?",
        back: "A LAN is confined to a single location (home, building) with high speed/low latency. A WAN spans large geographical areas (countries, global) and typically has higher latency."
      },
      {
        front: "What is a SAN (Storage Area Network)?",
        back: "A specialized, high-speed network providing block-level access to storage, making remote storage arrays appear as local drives to servers."
      },
      {
        front: "How does a VPN work?",
        back: "It creates a logical, encrypted tunnel over a public network, allowing secure data transmission as if the device was directly connected to a private LAN."
      }
    ],
    quiz: [
      {
        question: "Which of the following networks typically spans a city and acts as a high-speed backbone connecting multiple LANs?",
        options: ["PAN", "LAN", "MAN", "WAN"],
        answer: 2
      },
      {
        question: "An enterprise data center connecting a cluster of database servers to a flash storage array using Fibre Channel is an example of a:",
        options: ["WAN", "VPN", "SAN", "MAN"],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_characteristics_osi',
    title: 'Module 3: Characteristics & The OSI Model',
    notes: {
      intro: "When you are designing or evaluating a network, you aren't just thinking about wires and routers; you are evaluating the system's **non-functional requirements**. In system design interviews and real-world engineering, these characteristics define the quality and viability of your architecture.\n\nHere are the core characteristics used to measure a network's effectiveness.",
      chapter1: {
        title: "Core Network Characteristics",
        points: [
          "| Characteristic | Description |\n|---|---|\n| **Performance** | Evaluated via **Throughput** (actual rate of data transfer, e.g., Gbps) and **Latency** (time for packet to travel from source to destination). |\n| **Reliability** | Probability that a component performs without failure, often measured by **MTBF** (Mean Time Between Failures). |\n| **Availability** | Percentage of time the network is fully operational and accessible (e.g., 99.999% uptime means <6 minutes of downtime a year). |\n| **Fault Tolerance** | Built-in redundancy (backup routers, duplicate fiber links) to reroute traffic if a component fails. It is the *mechanism* used to achieve high availability. |\n| **Robustness** | Ability to withstand anomalies (like DDoS attacks or malformed packets) and degrade gracefully without fully crashing. |\n| **Scalability** | Ability to accommodate growth (adding thousands of users or doubling traffic) without a massive performance drop or requiring a complete redesign. |\n| **Security** | Mechanisms to protect data in transit. Follows the CIA Triad: **Confidentiality** (encryption), **Integrity** (data wasn't tampered), and **Availability**. |"
        ]
      },
      chapter2: {
        title: "Introducing the OSI Model",
        points: [
          "Explanation:\nTo achieve all those characteristics, hardware and software from hundreds of different vendors must communicate flawlessly. To standardize this, the ISO created the **OSI (Open Systems Interconnection) Model**.",
          "The OSI model is a conceptual framework that divides network communication into seven distinct, manageable layers.",
          "Think of it as an assembly line. When an application sends data, it starts at the top (**Layer 7**) and moves down. Each layer adds its own specific headers (instructions) to the data before passing it to the layer below.",
          "When the receiving computer gets the data, it moves from the bottom (**Layer 1**) back up, stripping away those headers until the data is presented to the user."
        ]
      },
      chapter3: {
        title: "The 7 Layers (From Top to Bottom)",
        points: [
          "Explanation:\nA common mnemonic to remember the order from bottom-to-top (Layer 1 to 7) is: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way.",
          "| # | Layer | Function | Key Concepts / Devices |\n|---|---|---|---|\n| 7 | **Application** | Provides network services directly to software applications. | HTTP, FTP, SMTP |\n| 6 | **Presentation** | Handles data translation, formatting, and encryption ensuring readability by the receiver. | Encryption, Formatting |\n| 5 | **Session** | Establishes, maintains, and terminates communication sessions between computers. | Sessions |\n| 4 | **Transport** | End-to-end communication, error recovery, and flow control. | **TCP** (reliable), **UDP** (fast) |\n| 3 | **Network** | Routing data across multiple networks using logical addressing. | **IP addresses**, **Routers** |\n| 2 | **Data Link** | Node-to-node frame delivery on the same LAN using physical addressing. | **MAC addresses**, **Switches** |\n| 1 | **Physical** | Actual physical connection transmitting raw bits (0s and 1s) over a medium. | Cables, Wi-Fi, Radio signals |"
        ]
      },
      chapter4: {
        title: "Protocol Data Units (PDUs): Data Encapsulation",
        points: [
          "Explanation:\nAs data moves down the OSI layers, each layer wraps the data with its own specific header information (a process called **Encapsulation**). Because the structure of the data changes at each layer, the bundle is referred to by a different terminology—known as a Protocol Data Unit (PDU).",
          "| Layer(s) | PDU Terminology | Context |\n|---|---|---|\n| **5, 6, 7** (App, Pres, Session) | **Data** (or Message) | The raw information the user application wants to send. |\n| **4** (Transport) | **Segment** / **Datagram** | Called a Segment if using TCP (ordered/reliable), and a Datagram if using UDP. |\n| **3** (Network) | **Packet** | The Segment is wrapped with an IP header containing Source and Destination IP Addresses. |\n| **2** (Data Link) | **Frame** | The Packet is wrapped with a header (MAC Addresses) and a trailer (CRC Error Checking). |\n| **1** (Physical) | **Bits** | The Frame is converted into raw 1s and 0s (electrical signals, light pulses, or radio waves) for physical transmission. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is a Protocol Data Unit (PDU)?",
        back: "A specific term used to describe data as it changes form while moving through the OSI layers (e.g., Data, Segment, Packet, Frame, Bit)."
      },
      {
        front: "What is the difference between Fault Tolerance and Robustness?",
        back: "Fault Tolerance handles HARDWARE failures via redundancy (e.g., backup links). Robustness is the ability to withstand ANOMALIES (like DDoS attacks) without completely crashing."
      },
      {
        front: "What is the mnemonic for the OSI model layers from bottom to top?",
        back: "Please Do Not Throw Sausage Pizza Away (Physical, Data Link, Network, Transport, Session, Presentation, Application)."
      },
      {
        front: "At which OSI layer do Routers and IP Addresses operate?",
        back: "Layer 3 - Network Layer."
      },
      {
        front: "At which OSI layer do Switches and MAC Addresses operate?",
        back: "Layer 2 - Data Link Layer."
      }
    ],
    quiz: [
      {
        question: "Which of the following characteristics measures the actual rate at which data is successfully transferred over a link?",
        options: ["Latency", "Throughput", "Robustness", "Availability"],
        answer: 1
      },
      {
        question: "Which OSI layer is responsible for end-to-end communication, error recovery, and flow control (TCP/UDP)?",
        options: ["Network", "Session", "Transport", "Data Link"],
        answer: 2
      },
      {
        question: "What does the Presentation layer (Layer 6) primarily handle?",
        options: ["Routing across multiple networks", "Data translation, formatting, and encryption", "Providing network services to software applications", "Physical node-to-node frame delivery"],
        answer: 1
      },
      {
        question: "What is the data referred to as when it reaches Layer 2 (Data Link Layer)?",
        options: ["Packet", "Segment", "Frame", "Datagram"],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_topologies',
    title: 'Module 4: Network Topologies',
    notes: {
      intro: "When we architect a system, the **topology** is our blueprint. It describes the structural layout of the network. We must differentiate between the **physical topology** (how the cables are actually plugged in) and the **logical topology** (how the data flows).\n\nIn system design interviews, you are constantly evaluating trade-offs between cost, complexity, and fault tolerance. Network topologies are the physical manifestation of those trade-offs.",
      chapter1: {
        title: "The 6 Primary Network Topologies",
        points: [
          "| Topology | Structure | Failure Scenario (Resilience) | Real-world Use |\n|---|---|---|---|\n| **Bus** | All nodes connected to a single central cable. | **SPOF:** If the main cable cuts, the entire network drops. | Embedded systems (CAN bus in cars) |\n| **Star** | All nodes connected individually to a central switch. | **SPOF:** If the central switch dies, everything drops. | Modern home & corporate LANs (Wi-Fi) |\n| **Ring** | Nodes connected in a continuous circle (token passing). | One cut cable breaks the loop and downs the network. | Legacy fiber networks (MANs) |\n| **Mesh** | Nodes interconnected with multiple redundant paths. | **Highly resilient:** Traffic dynamically routes around failures. | Internet core routing (BGP), Wireless IoT |\n| **Tree** | Star networks connected to a linear backbone (Hierarchy). | If root fails, branches can't talk. If a branch fails, others survive. | Large corporate campuses |\n| **Hybrid** | Combination of two or more topologies. | Depends entirely on the specific combination used. | Massive-scale enterprise networks |"
        ]
      },
      chapter2: {
        title: "Deep Dive: Trade-offs (Pros & Cons)",
        points: [
          "| Topology | Advantages | Disadvantages |\n|---|---|---|\n| **Bus** | Extremely cheap, easy to install, minimal cabling. | High collisions, performance degrades rapidly as it scales. |\n| **Star** | Highly scalable, easy to isolate faults without disrupting others. | Higher cabling cost, reliant on expensive central hardware. |\n| **Ring** | Predictable, deterministic, no collisions (token passing). | Hard to scale, requires temporarily breaking the network to add nodes. |\n| **Mesh** | Ultimate fault tolerance, robustness, and security. | Prohibitively expensive and complex to wire (requires n(n-1)/2 cables). |\n| **Tree** | Highly scalable, centralized management, logical separation. | Complex configuration, reliant on distribution root nodes. |\n| **Hybrid** | Extremely flexible, tailorable to exact physical constraints. | Complex management and troubleshooting across architectures. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the key disadvantage of a Full Mesh network topology?",
        back: "It is prohibitively expensive and complex to wire because the number of cables required grows exponentially with every new node: n(n-1)/2."
      },
      {
        front: "Which topology is the undisputed standard for modern home and corporate LANs?",
        back: "Star Topology (where devices connect to a central switch or router)."
      },
      {
        front: "What is the single point of failure (SPOF) in a Star Topology?",
        back: "The central distribution device (the switch or hub). If it fails, the entire network goes down."
      }
    ],
    quiz: [
      {
        question: "Which network topology connects every node to a single central cable, where a cut in the cable brings down the entire network?",
        options: ["Star", "Mesh", "Bus", "Ring"],
        answer: 2
      },
      {
        question: "Which topology provides the ultimate fault tolerance because data can dynamically reroute around failed links?",
        options: ["Ring", "Tree", "Bus", "Mesh"],
        answer: 3
      }
    ]
  },
  {
    id: 'cn_devices',
    title: 'Module 5: Network Devices',
    notes: {
      intro: "To understand how to build resilient systems, you have to understand the hardware that directs the traffic. In system design, we categorize these devices by the OSI layer they operate on, because that layer defines exactly how much 'intelligence' the device has.\n\nDevices at Layer 1 just blast electricity. Devices at Layer 2 know *who* is on the local network. Devices at Layer 3 know *where* other networks are.",
      chapter1: {
        title: "Layer 1: Physical Layer (The 'Dumb' Devices)",
        points: [
          "Explanation:\nThese devices do not read data headers, IP addresses, or MAC addresses. They only understand raw electrical signals or radio waves.",
          "**Repeater:** Signals degrade over long cable runs (attenuation). A repeater simply takes an incoming degraded signal, amplifies/regenerates it to its original strength, and pushes it out the other side.",
          "**Hub:** Essentially a multi-port repeater. When a packet of data arrives at one port, the hub blindly duplicates it and broadcasts it out to *every other port*. This causes massive inefficiencies and frequent data collisions.",
          "**Modem (Modulator-Demodulator):** Computers speak digital (1s and 0s), but transmission mediums like phone lines or coaxial cables often speak analog (waves). A modem translates digital data into analog waves for transmission, and demodulates incoming waves back into digital data."
        ]
      },
      chapter2: {
        title: "Layer 2: Data Link Layer (The 'Local' Devices)",
        points: [
          "Explanation:\nThese devices understand **MAC addresses** (the hardcoded physical address of a network card). They manage traffic within a *single* local network (LAN).",
          "**Bridge:** Connects two separate LAN segments together to form one larger LAN. It actively inspects the MAC addresses of incoming traffic and 'filters' it, deciding whether to forward it to the other segment or keep it local.",
          "**Switch:** The modern workhorse of the LAN. A switch is essentially a multi-port bridge powered by fast hardware (ASICs). It builds a 'MAC Address Table' by memorizing the physical address of the device plugged into each port. When data arrives, it sends it *only* to the specific port that requested it.",
          "**Wireless Access Point (WAP):** Acts as a bridge between a wireless network (Wi-Fi) and a wired Ethernet network. It allows wireless devices to connect to a wired router or switch."
        ]
      },
      chapter3: {
        title: "Layer 3: Network Layer (The 'Navigators')",
        points: [
          "Explanation:\nThese devices understand **IP addresses** (logical addresses). They are responsible for moving data *between* different networks.",
          "**Router:** A router connects multiple independent networks (like your home LAN to your ISP's WAN). It maintains a 'Routing Table' and calculates the fastest, most efficient path to send an IP packet toward its ultimate destination."
        ]
      },
      chapter4: {
        title: "Layer 4-7: Upper Layers (The 'Translators')",
        points: [
          "**Gateway:** A broad term for a highly intelligent device (or software node) that acts as a 'gate' between two entirely different types of networks. While a router connects two networks using the *same* protocols (IP), a gateway translates between entirely *different* protocols and architectures (e.g., an IoT gateway translating Zigbee radio signals into standard HTTP over TCP/IP)."
        ]
      },
      chapter5: {
        title: "The 'Versus' Breakdown",
        points: [
          "Explanation:\nIn a technical interview, you are often asked to distinguish between similar hardware. Here is how they compare across key dimensions.",
          "**1. Hub vs. Switch**",
          "| Feature | Hub | Switch |\n|---|---|---|\n| **OSI Layer** | Layer 1 (Physical) | Layer 2 (Data Link) |\n| **Transmission** | Broadcasts to ALL ports | Unicasts to specific port |\n| **Addressing** | None | Uses MAC Addresses |\n| **Collision Domain** | 1 single collision domain | 1 collision domain *per port* (No collisions) |\n| **Bandwidth** | Shared across all ports | Dedicated per port |",
          "**2. Switch vs. Router**",
          "| Feature | Switch | Router |\n|---|---|---|\n| **OSI Layer** | Layer 2 (Data Link) | Layer 3 (Network) |\n| **Purpose** | Connects devices *within* a network | Connects *different* networks together |\n| **Addressing** | Uses MAC Addresses | Uses IP Addresses |\n| **Broadcast Domain** | 1 single broadcast domain | Breaks broadcast domains (1 per port) |\n| **Table Maintained** | MAC Address Table (CAM) | Routing Table |",
          "**3. Router vs. Gateway**",
          "| Feature | Router | Gateway |\n|---|---|---|\n| **Primary Role** | Directs traffic across networks | Translates protocols between networks |\n| **Protocol Handling** | Both networks must use the same protocol (IP) | Can connect networks with dissimilar protocols |\n| **OSI Layer** | Layer 3 (Network) | Can operate at any layer, usually Layers 3-7 |",
          "**4. Bridge vs. Switch**",
          "| Feature | Bridge | Switch |\n|---|---|---|\n| **Port Count** | Typically 2 to 4 ports | Typically 8 to 48+ ports |\n| **Processing** | Software-based (Slower) | Hardware-based using ASICs (Extremely fast) |\n| **Duplex** | Usually Half-Duplex | Full-Duplex |",
          "**5. Repeater vs. Hub**",
          "| Feature | Repeater | Hub |\n|---|---|---|\n| **Purpose** | Connects two cable segments to extend distance | Connects multiple devices into a star topology |\n| **Ports** | 2 ports (In and Out) | Multiple ports (4 to 24) |\n| **Function** | Signal regeneration | Signal regeneration + Multi-port broadcasting |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary difference between a Hub and a Switch?",
        back: "A Hub (Layer 1) broadcasts data blindly to all ports, sharing bandwidth and causing collisions. A Switch (Layer 2) learns MAC addresses and sends data only to the specific intended port, preventing collisions."
      },
      {
        front: "What is the function of a Modem?",
        back: "It translates (modulates) digital data from a computer into analog waves for transmission over phone/coaxial cables, and demodulates incoming waves back into digital data."
      },
      {
        front: "What is the difference between a Router and a Gateway?",
        back: "A Router directs traffic between networks using the SAME protocol (IP). A Gateway acts as a translator between networks using ENTIRELY DIFFERENT protocols and architectures."
      }
    ],
    quiz: [
      {
        question: "Which of the following devices operates at Layer 3 (Network Layer) and maintains a Routing Table?",
        options: ["Switch", "Router", "Bridge", "Gateway"],
        answer: 1
      },
      {
        question: "Which device creates 1 collision domain per port, effectively eliminating data collisions?",
        options: ["Hub", "Repeater", "Switch", "Modem"],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_layer2',
    title: 'Module 6: The Data Link Layer (Layer 2)',
    notes: {
      intro: "Welcome to **Module 6: The Data Link Layer (Layer 2)**. If Layer 3 (IP) is about navigating the global internet, Layer 2 is about exactly how devices communicate on the *same local network*. This is where the physical reality of cables and radio waves meets the logical world of data.\n\nLet's break down these core Layer 2 concepts in detail.",
      chapter1: {
        title: "Ethernet & The Frame",
        points: [
          "Explanation:\nEthernet is the undisputed king of wired local area networks (LANs). It defines both the physical cabling (Layer 1) and how data is formatted for transmission (Layer 2).",
          "When data moves across a local network, it doesn't travel as a continuous stream; it is chopped up into discrete chunks called **frames**.",
          "**1. Preamble:** A sequence of alternating 1s and 0s that wakes up the receiving network card and synchronizes the timing.",
          "**2. Destination & Source MAC Addresses:** Who is sending it, and who is receiving it (locally).",
          "**3. EtherType:** Tells the receiving device what kind of protocol is inside the payload (usually IPv4 or IPv6).",
          "**4. Payload (Data):** The actual data being sent. The maximum size is called the **MTU (Maximum Transmission Unit)**, which is strictly **1500 bytes** in standard Ethernet.",
          "**5. FCS (Frame Check Sequence):** The network equivalent of a wax seal. It uses a **CRC (Cyclic Redundancy Check)**. If the receiver's math doesn't match the sender's, the frame was corrupted and is silently dropped.",
          "**Collisions & Duplexing:**",
          "**Half-Duplex:** Devices can both send and receive, but *not at the same time* (like a walkie-talkie). Collisions are a major problem here.",
          "**Full-Duplex:** Devices can send and receive simultaneously (like a telephone). Modern Ethernet switches use dedicated transmit and receive wires, completely eliminating Layer 2 collisions."
        ]
      },
      chapter2: {
        title: "MAC Addresses (Media Access Control)",
        points: [
          "Explanation:\nIf an IP address is your house's mailing address (which can change if you move), a **MAC address** is your physical fingerprint (it never changes). It is a 48-bit hardware address burned into every Network Interface Card (NIC) at the factory.",
          "A MAC address is written as six pairs of hexadecimal digits (e.g., `00:1A:2B:3C:4D:5E`).",
          "**OUI (Organizationally Unique Identifier):** The first 24 bits identify the manufacturer (e.g., Apple, Cisco).",
          "**UAA (Universally Administered Address):** The last 24 bits are a unique serial number assigned by the manufacturer.",
          "| Address Type | Target | Example |\n|---|---|---|\n| **Unicast** | One specific, unique device. | `00:1A:2B:3C:4D:5E` |\n| **Broadcast** | *Every* device on the local network. | `FF:FF:FF:FF:FF:FF` |\n| **Multicast** | A specific group of devices listening to a stream. | `01:00:5E:00:00:01` |",
          "| Feature | MAC Address | IP Address |\n|---|---|---|\n| **OSI Layer** | Layer 2 (Data Link) | Layer 3 (Network) |\n| **Format** | 48-bit Hexadecimal | 32-bit (IPv4) or 128-bit (IPv6) |\n| **Scope** | Only valid on the *local* network segment. | Valid globally across the internet. |\n| **Permanence** | Permanent (Burned into hardware). | Dynamic (Changes based on location). |"
        ]
      },
      chapter3: {
        title: "ARP (Address Resolution Protocol)",
        points: [
          "Explanation:\nImagine you want to send data to `192.168.1.50`. Your computer knows the IP address, but switches only understand MAC addresses. How do you find the physical fingerprint of a device when you only know its logical IP? **ARP bridges Layer 3 and Layer 2.**",
          "**The ARP Process:**",
          "**1. ARP Request (Broadcast):** Your computer screams to the entire local network, *\"Who has IP 192.168.1.50?\"* Because it's a broadcast (`FF:FF:FF:FF:FF:FF`), every switch forwards it to every device.",
          "**2. ARP Reply (Unicast):** The device holding that IP responds directly to you, *\"I have 192.168.1.50, and my MAC is AA:BB:CC...\"*",
          "**3. ARP Cache:** To avoid broadcasting every time, your computer temporarily saves this mapping in a local table.",
          "**Gratuitous ARP:** A device broadcasts its own IP-to-MAC mapping without being asked (used when a device boots up to detect IP conflicts).",
          "**ARP Spoofing (Poisoning):** A malicious hacker sends fake ARP replies claiming *their* MAC address belongs to the router's IP, creating a Man-in-the-Middle attack.",
          "| Feature | ARP | DNS |\n|---|---|---|\n| **What it resolves** | Resolves IP Addresses to MAC Addresses. | Resolves Domain Names (google.com) to IP Addresses. |\n| **What it does** | Finds a physical hardware address on the LAN. | Finds the IP address of a web server on the Internet. |"
        ]
      },
      chapter4: {
        title: "Switching (How a Switch Thinks)",
        points: [
          "Explanation:\nA switch is the brain of the LAN. It operates using a **MAC Table** (or CAM table) that maps MAC addresses to specific physical ports on the switch.",
          "A switch has three primary behaviors:",
          "**1. MAC Learning (Source):** When a switch receives a frame, it looks at the *Source MAC*. If it doesn't know it, it adds it to the MAC table along with the port it came from.",
          "**2. Flooding (Unknown Unicast):** Next, it looks at the *Destination MAC*. If the destination MAC is NOT in the table, the switch panics and **floods** the frame out of *every* port (except the one it came in on).",
          "**3. Forwarding (Known Unicast):** If the Destination MAC *is* in the table, the switch surgically forwards the frame out of that exact port. No wasted bandwidth."
        ]
      },
      chapter5: {
        title: "CSMA: Collision Handling (Wired vs Wireless)",
        points: [
          "Explanation:\n**CSMA/CD (Collision Detection)** is the traffic law for Wired Ethernet operating in half-duplex. If a collision is detected, both devices broadcast a 'Jam Signal', then run a **Random Exponential Backoff Algorithm** (wait a random fraction of a ms and try again).",
          "You cannot use Collision *Detection* on Wi-Fi, because radios cannot listen and transmit on the same frequency simultaneously. Instead, wireless uses **CSMA/CA (Collision Avoidance)**.",
          "**The Hidden Node Problem:** Node A and C cannot hear each other, but both connect to Router B. If both transmit simultaneously, they cause a massive invisible collision at the router.",
          "**RTS / CTS (Request to Send / Clear to Send):** CSMA/CA introduces a reservation system. Node A sends an **RTS** frame. Router B broadcasts a **CTS** frame to everyone ('Node A is cleared, everyone else wait'). Node A then sends data safely.",
          "| Feature | CSMA/CD (Detection) | CSMA/CA (Avoidance) |\n|---|---|---|\n| **Network Type** | Wired Ethernet (802.3) | Wireless / Wi-Fi (802.11) |\n| **Core Philosophy** | Detect collisions and recover. | Prevent collisions before they happen. |\n| **Signaling** | Uses a Jam signal after collision. | Uses RTS/CTS to reserve the channel. |\n| **Efficiency** | Highly efficient until overloaded. | Less efficient due to RTS/CTS overhead, but necessary for radio. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the purpose of the ARP protocol?",
        back: "Address Resolution Protocol (ARP) bridges Layer 3 to Layer 2 by resolving a known logical IP Address into an unknown physical MAC Address."
      },
      {
        front: "What is the MAC Address used to broadcast a frame to every device on a local network?",
        back: "FF:FF:FF:FF:FF:FF"
      },
      {
        front: "What does a switch do if the Destination MAC address is NOT in its MAC Table?",
        back: "It 'Floods' the frame out of every single port (except the one it received the frame on) hoping the correct device receives it."
      },
      {
        front: "How does CSMA/CA solve the Hidden Node Problem in Wi-Fi networks?",
        back: "By using an RTS/CTS (Request to Send / Clear to Send) reservation system where the router explicitly grants a node exclusive rights to transmit."
      }
    ],
    quiz: [
      {
        question: "Which field in an Ethernet Frame uses a Cyclic Redundancy Check (CRC) to determine if the frame was corrupted in transit?",
        options: ["Preamble", "EtherType", "FCS (Frame Check Sequence)", "Payload"],
        answer: 2
      },
      {
        question: "Which of the following describes a Man-in-the-Middle attack where a hacker sends fake MAC mappings claiming to be the router?",
        options: ["ARP Spoofing (Poisoning)", "MAC Flooding", "Gratuitous ARP", "Hidden Node Attack"],
        answer: 0
      }
    ]
  },
  {
    id: 'cn_layer3',
    title: 'Module 7: The Network Layer (Layer 3)',
    notes: {
      intro: "Welcome to **Module 7: The Network Layer (Layer 3)**. We are officially leaving the local physical wire. Layer 3 is all about logical addressing and routing data across the global internet.\n\nWhile Layer 2 (MAC addresses) gets your data to the next router, Layer 3 (IP addresses) ensures your data knows its final destination on the other side of the world.",
      chapter1: {
        title: "IPv4 (Internet Protocol Version 4)",
        points: [
          "Explanation:\nIPv4 is the foundational addressing protocol of the internet. Every device connected to an IP network must have a unique IP address to communicate.",
          "An IPv4 address is a **32-bit number**, typically written in 'dotted-decimal' format for humans to read. It is divided into 4 chunks called **octets** (8 bits each).",
          "**Example:** `192.168.1.50`\n**Binary:** `11000000 . 10101000 . 00000001 . 00110010`",
          "Every IP address is split into two logical parts: the **Network Portion** (identifies the specific network) and the **Host Portion** (identifies the specific device).",
          "**The Old Way: Classful Addressing**",
          "| Class | First Octet Range | Default Subnet Mask | Designed For |\n|---|---|---|---|\n| **Class A** | 1 - 126 | `255.0.0.0` | Massive networks (Millions of hosts) |\n| **Class B** | 128 - 191 | `255.255.0.0` | Medium-to-large enterprises |\n| **Class C** | 192 - 223 | `255.255.255.0` | Small networks (up to 254 hosts) |\n| **Class D** | 224 - 239 | N/A | Multicasting (Streaming data to groups) |\n| **Class E** | 240 - 255 | N/A | Experimental / Research |",
          "**Public vs. Private IPs**",
          "To delay the internet from running out of IPv4 addresses, engineers carved out specific blocks of **Private IPs**.",
          "| Feature | Public IP | Private IP |\n|---|---|---|\n| **Routability** | Globally routable on the internet. | **Not routable** on the internet. |\n| **Uniqueness** | Must be 100% globally unique. | Only needs to be unique within your local LAN. |\n| **Cost** | Leased from an ISP. | Free to use anywhere. |\n| **Translation** | Communicates directly. | Requires **NAT (Network Address Translation)** at the router to access the internet. |",
          "**Private IP Ranges:**\n- **Class A:** `10.0.0.0` to `10.255.255.255`\n- **Class B:** `172.16.0.0` to `172.31.255.255`\n- **Class C:** `192.168.0.0` to `192.168.255.255`",
          "**Special Reserved Addresses:**\n- **Loopback (`127.0.0.1`):** Also known as localhost. Your computer uses this to talk to itself (never leaves the network card). Used for local testing.\n- **APIPA (`169.254.x.x`):** Automatic Private IP Addressing. A self-assigned IP used when your PC cannot reach a DHCP server."
        ]
      },
      chapter2: {
        title: "CIDR (Classless Inter-Domain Routing)",
        points: [
          "Explanation:\nClassful addressing was incredibly wasteful. If a company needed 500 IPs, Class C (254 hosts) was too small, so they were given a Class B (65,534 hosts), wasting 65,000+ IPs.",
          "**CIDR** abolished the rigid Class boundaries. It allows network engineers to draw the line between the Network portion and the Host portion *anywhere* they want, right down to the individual bit.",
          "**Slash Notation & Prefix Length:** CIDR uses a slash (`/`) followed by a number to represent the **Prefix Length** (how many bits from left to right are reserved for the Network).",
          "If you see `192.168.1.0 /24`, it means the first **24 bits** are the Network. The remaining 8 bits are for Hosts.",
          "If you see `10.1.1.0 /26`, it means the first **26 bits** are the Network. The remaining 6 bits are for Hosts.",
          "**CIDR vs. Subnet Mask:** They are two different ways of writing the exact same thing. Computers read the mask; humans prefer CIDR.",
          "| Network Setup | CIDR (Human readable) | Subnet Mask (Computer readable) |\n|---|---|---|\n| **Standard Class C** | `/24` | `255.255.255.0` |\n| **Halved Class C** | `/25` | `255.255.255.128` |\n| **Quartered Class C** | `/26` | `255.255.255.192` |"
        ]
      },
      chapter3: {
        title: "Subnetting",
        points: [
          "Explanation:\nSubnetting is the act of taking a large network block and slicing it into smaller, more efficient logical networks.",
          "**Binary Basics:** To subnet, you must understand how the 8 bits in an octet add up. The place values from left to right are: `128 | 64 | 32 | 16 | 8 | 4 | 2 | 1`. If a subnet mask ends in `192`, it means the two leftmost bits are turned on (`128 + 64 = 192`).",
          "**The 4 Pillars of a Subnet:**",
          "**1. Network ID (The Name):** The very first IP address in the subnet. All host bits are `0`. You cannot assign this to a computer.",
          "**2. First Usable Host:** Network ID + 1.",
          "**3. Last Usable Host:** Broadcast Address - 1.",
          "**4. Broadcast Address (The Megaphone):** The very last IP address in the subnet. All host bits are `1`. If you send data here, it hits every device in the subnet. You cannot assign this to a computer.",
          "**The Host Formula:** To calculate how many usable IPs you get in a subnet, use: **2^h - 2** (Where 'h' is the number of host bits remaining, and we subtract 2 to account for the Network ID and Broadcast Address).",
          "**Example Breakdown: Subnetting a /26** (e.g., `192.168.1.0 /26`)",
          "32 total bits - 26 network bits = **6 Host Bits**.\nTotal Hosts = 2^6 = 64.\nUsable Hosts = 64 - 2 = **62**.",
          "**The resulting Subnet Block:**\n- **Network ID:** `192.168.1.0`\n- **Usable Range:** `192.168.1.1` through `192.168.1.62`\n- **Broadcast:** `192.168.1.63`\n*(The next subnet would start immediately at `192.168.1.64`)*",
          "**VLSM (Variable Length Subnet Masking):** Standard subnetting cuts a network into equal-sized chunks. **VLSM** allows you to *subnet a subnet*. It lets you create different sized networks for different needs, completely eliminating waste (e.g., giving the Sales Dept a `/26` with 62 hosts, but giving a Router Link a `/30` with exactly 2 hosts)."
        ]
      }
    },
    flashcards: [
      {
        front: "What is the formula to calculate the number of USABLE hosts in a subnet?",
        back: "2^h - 2 (where 'h' is the number of host bits). We subtract 2 because the Network ID and Broadcast Address cannot be assigned to hosts."
      },
      {
        front: "What does CIDR notation (e.g., /24) represent?",
        back: "The Prefix Length: it tells you exactly how many bits from left to right are reserved for the Network portion of the IP address."
      },
      {
        front: "What is an APIPA address?",
        back: "Automatic Private IP Addressing (169.254.x.x). It is a self-assigned IP address used when a device cannot reach a DHCP server."
      }
    ],
    quiz: [
      {
        question: "Which of the following IPv4 ranges is reserved for Private (non-routable) Class C networks?",
        options: ["10.0.0.0 to 10.255.255.255", "172.16.0.0 to 172.31.255.255", "192.168.0.0 to 192.168.255.255", "127.0.0.1 to 127.255.255.255"],
        answer: 2
      },
      {
        question: "If you have a /26 subnet mask, how many usable hosts are available in the subnet?",
        options: ["254", "126", "62", "30"],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_core_protocols',
    title: 'Module 8: Core Network Protocols',
    notes: {
      intro: "We are now entering the territory of protocols that make the internet highly functional, scalable, and user-friendly. When you design a distributed system, you will constantly rely on DNS for routing, NAT for network boundaries, and DHCP for scaling infrastructure.\n\nHere is the deep dive into the protocols that power the Network and Application layers.",
      chapter1: {
        title: "NAT (Network Address Translation)",
        points: [
          "Explanation:\nIn the 1990s, engineers realized we were going to run out of the 4.3 billion available IPv4 addresses. **NAT was the band-aid that saved the internet.** It allows an entire private network (using free, private IPs like `192.168.x.x`) to share a *single* public IP address leased from an ISP.",
          "**The 3 Flavors of NAT:**",
          "**1. Static NAT (1-to-1):** A single private IP is mapped permanently to a single public IP. Used for hosting servers on a local network that must be accessible from the outside.",
          "**2. Dynamic NAT:** A pool of private IPs shares a pool of public IPs. If you have 50 employees but only bought 10 public IPs, only 10 people can browse the internet simultaneously.",
          "**3. PAT (Port Address Translation / NAT Overload):** This is what your home router uses. It maps *thousands* of private IPs to *one* single public IP by using **Port Numbers** to keep track of the traffic.",
          "**The NAT Table (How PAT Works):**\nWhen your PC (`192.168.1.50`) requests a web page, the router intercepts it, changes the source IP to its own Public IP, and assigns it a random port (e.g., `50001`). It records this in the NAT Table. When the web server replies to the Public IP on port `50001`, the router checks the table, translates the destination back to `192.168.1.50`, and delivers it to you.",
          "**Advantages:** Conserves IPv4 addresses. Inherently provides a layer of security (devices outside cannot easily initiate direct connections to internal devices because they don't have routable IPs).",
          "**Limitations:** Breaks the 'end-to-end' connectivity model of the internet. Creates performance bottlenecks at the router (the router must inspect and rewrite every single packet). Causes massive headaches for peer-to-peer applications like VoIP or gaming.",
          "| Feature | NAT | Proxy Server |\n|---|---|---|\n| **OSI Layer** | Layer 3 (Network Layer) | Layer 7 (Application Layer) |\n| **Operation** | Modifies IP headers on the fly. | Intercepts requests, makes a *new* request on behalf of the client. |\n| **Visibility** | Transparent to the user. | Often requires configuration on the client browser/OS. |"
        ]
      },
      chapter2: {
        title: "DHCP (Dynamic Host Configuration Protocol)",
        points: [
          "Explanation:\nIf you have 10,000 employees, manually assigning IPs, subnet masks, and default gateways to every laptop is impossible. **DHCP automates this.**",
          "**The DORA Process:**\nWhen a device connects to a network, it obtains an IP address via a 4-step process (Remember: **DORA**).",
          "**1. Discover (Broadcast):** The client shouts out, *\"Are there any DHCP servers here?\"*",
          "**2. Offer (Unicast/Broadcast):** The DHCP server replies, *\"Yes! Here is an IP address you can use.\"*",
          "**3. Request (Broadcast):** The client shouts, *\"I accept this IP from this specific server!\"* (It broadcasts this so if multiple DHCP servers made offers, the others know their offers were rejected).",
          "**4. Acknowledge (Unicast):** The server finalizes it, *\"Confirmed. The IP is yours.\"*",
          "**Leases, Renewal, and Relays:**",
          "**The Lease:** DHCP does not give you an IP forever; it *leases* it to you (usually for 24 hours).",
          "**Renewal:** At 50% of the lease time (12 hours), the client silently unicasts the server asking to renew. If the server is dead, the client tries broadcasting at 87.5% of the lease time.",
          "**DHCP Relay (IP Helper):** Routers block broadcasts. If your DHCP server is in New York, and a laptop connects in London, the laptop's Discover broadcast will hit the London router and die. A **DHCP Relay** is configured on the London router to intercept that broadcast, convert it into a Unicast packet, and forward it directly to the New York server."
        ]
      },
      chapter3: {
        title: "DNS (Domain Name System)",
        points: [
          "Explanation:\nDNS is the phonebook of the internet. Humans remember `google.com`; routers only understand `142.250.190.46`.",
          "**The Resolution Hierarchy:**\nWhen you type a URL, your computer checks its local cache. If it doesn't know the IP, it asks a **DNS Resolver** (usually hosted by your ISP or Google's `8.8.8.8`). The resolver hunts down the answer through a strict hierarchy:",
          "**1. Root Server (`.`):** 'I don't know google.com, but I know who handles all `.com` addresses. Go ask them.'",
          "**2. TLD Server (Top-Level Domain):** 'I manage `.com`. I don't know Google's exact IPs, but I know the address of Google's specific Name Server. Go ask them.'",
          "**3. Authoritative Server:** 'I am Google. The IP for `google.com` is `142.250.190.46`.'",
          "**DNS Caching & TTL (Time To Live):**\nTo prevent the Root servers from being crushed by billions of requests, every step of the chain caches the answer. The **TTL** is a timer set by the domain owner dictating how long resolvers are allowed to hold onto the cache before they must ask for an update again.",
          "**Critical DNS Record Types:**\n- **A Record:** Maps a domain to an **IPv4** address.\n- **AAAA Record:** Maps a domain to an **IPv6** address.\n- **CNAME (Canonical Name):** Maps a domain to *another domain* (an alias). e.g., mapping `www.example.com` to `example.com`.\n- **MX (Mail Exchange):** Points to the email servers for that domain.\n- **NS (Name Server):** Indicates which server is authoritative for the domain.",
          "| Feature | DNS | DHCP |\n|---|---|---|\n| **Core Function** | Translates Hostnames to IP Addresses. | Assigns IP Addresses to devices. |\n| **Direction** | You know the Name, you need the IP. | You are a device, you need an IP. |\n| **Port** | UDP/TCP Port 53 | UDP Ports 67 & 68 |"
        ]
      },
      chapter4: {
        title: "ICMP (Internet Control Message Protocol)",
        points: [
          "Explanation:\nICMP is the network layer's diagnostic and error-reporting system. It does not carry application data (like HTTP), and **it does not use port numbers.**",
          "**Ping (Echo Request / Reply):** Tests basic reachability. Your PC sends an ICMP Type 8 (Echo Request). The destination replies with an ICMP Type 0 (Echo Reply).",
          "**Destination Unreachable (Type 3):** If a router receives a packet but its routing table has no idea where the destination network is, it drops the packet and sends an ICMP Type 3 back to the sender to let them know the path is dead.",
          "**The Traceroute Trick (TTL Exceeded):**\nIn an interview, you might be asked: *'How does traceroute actually map the path?'* It exploits the **TTL (Time to Live)** field in the IP header. The TTL prevents packets from looping infinitely; every router drops the TTL by 1. If it hits 0, the router drops the packet and sends an **ICMP TTL Exceeded (Type 11)** message back to the sender.",
          "**1.** Traceroute sends a packet with `TTL = 1`. The *first* router drops it and replies. Traceroute records the first router's IP.",
          "**2.** Traceroute sends a packet with `TTL = 2`. The first router passes it, the *second* router drops it and replies. Traceroute records the second router's IP.",
          "**3.** This repeats until the destination is reached."
        ]
      },
      chapter5: {
        title: "IPv6 (Internet Protocol Version 6)",
        points: [
          "Explanation:\nIPv4 is exhausted. IPv6 is the modern standard, boasting 2^128 possible addresses—enough to assign an IP to every atom on the surface of the earth.",
          "**Structure & Compression:**\nIPv6 is a **128-bit** address written in hexadecimal, divided into 8 groups of 16 bits. *Example:* `2001:0db8:0000:0000:0000:ff00:0042:8329`",
          "**Compression Rules (to make it readable):**\n1. Omit leading zeros in any group: `2001:db8:0:0:0:ff00:42:8329`\n2. Replace consecutive groups of all zeros with a double colon `::` (**Only allowed ONCE per address**): `2001:db8::ff00:42:8329`",
          "**IPv6 Address Types:**\n- **Unicast:** One-to-one communication.\n- **Multicast:** One-to-many communication.\n- **Anycast:** One-to-closest communication. (Multiple servers share an IP; the router delivers to the geographically closest one).\n*(Note: Broadcasts do not exist in IPv6. They were removed because they are inefficient. Multicast replaces them.)*",
          "**Key Advantages & Transition:**\n- **No NAT Needed:** Every device can have a globally routable public IP.\n- **NDP (Neighbor Discovery Protocol):** ARP is dead in IPv6. NDP replaces it, utilizing highly efficient ICMPv6 and Multicast to find MAC addresses instead of noisy network-wide broadcasts.\n- **SLAAC (Stateless Address Autoconfiguration):** Devices can securely generate their own IPv6 addresses by listening to router advertisements, entirely bypassing the need for a DHCP server.",
          "| Feature | IPv4 | IPv6 |\n|---|---|---|\n| **Address Length** | 32-bit (Decimal) | 128-bit (Hexadecimal) |\n| **Header** | Variable length, complex (causes router overhead). | Fixed length (40 bytes), heavily streamlined for speed. |\n| **Local MAC Resolution** | ARP (Uses Broadcasts). | NDP (Uses Multicast). |\n| **Configuration** | Manual or DHCP. | Auto-configuration (SLAAC) or DHCPv6. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the acronym for the 4-step DHCP IP assignment process, and what does it stand for?",
        back: "DORA: Discover, Offer, Request, Acknowledge."
      },
      {
        front: "How does Traceroute exploit the IP header to map a network path?",
        back: "It sends packets with incrementally increasing TTL (Time to Live) values (1, 2, 3...). Each router drops the packet when TTL hits 0 and sends back an ICMP 'TTL Exceeded' message, revealing its IP."
      },
      {
        front: "In IPv6, what protocol replaces ARP for resolving local MAC addresses?",
        back: "NDP (Neighbor Discovery Protocol), which uses highly efficient Multicast instead of noisy Broadcasts."
      },
      {
        front: "What is PAT (Port Address Translation)?",
        back: "A type of NAT (NAT Overload) that maps thousands of private IPs to one single public IP by using Port Numbers to keep track of individual traffic streams."
      }
    ],
    quiz: [
      {
        question: "Which of the following DNS records maps a domain name directly to an IPv6 address?",
        options: ["A Record", "AAAA Record", "CNAME Record", "MX Record"],
        answer: 1
      },
      {
        question: "Which of the following compression rules for an IPv6 address is completely INVALID?",
        options: ["Omitting leading zeros in a group.", "Replacing consecutive groups of zeros with '::'.", "Using '::' multiple times in a single address.", "Keeping letters in lower-case hexadecimal."],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_routing',
    title: 'Module 9: Routing',
    notes: {
      intro: "Welcome to **Module 9: Routing**. In the last module, we established how devices get their IP addresses and how networks are logically sliced into subnets. Now, we tackle the core function of the internet: **Pathfinding**.\n\nHow does a packet traversing the globe know which cables to take to reach its destination in milliseconds? The answer lies in routing algorithms.",
      chapter1: {
        title: "Routing Basics",
        points: [
          "Explanation:\nBefore we look at the complex math, we must understand the fundamental mechanisms a router uses to make decisions.",
          "**The Routing Table:**\nEvery router maintains an internal database called a **Routing Table**. When a packet arrives, the router reads the Destination IP address, consults this table, and finds the best matching network to determine which physical interface (port) to send the packet out of.",
          "**Static vs. Dynamic Routing:**",
          "**1. Static Routing:** A network administrator manually types the routes into the router.\n- *Pros:* Zero CPU overhead, completely secure, highly predictable.\n- *Cons:* Does not scale. If a cable is cut, the router will blindly drop packets into a black hole until a human manually updates the table.",
          "**2. Dynamic Routing:** Routers use specialized protocols to talk to each other. They dynamically advertise their connected networks and continuously update their tables based on network changes.\n- *Pros:* Fault-tolerant. Automatically calculates new paths around failures. Highly scalable.\n- *Cons:* Consumes router CPU and memory. Requires bandwidth to send updates.",
          "**The Default Route (Gateway of Last Resort):**\nA router cannot possibly hold every single route on the internet. To save memory, routers use a **Default Route**, represented as `0.0.0.0/0`. If a router has absolutely no idea where the destination network is, it sends the packet to the Default Route (e.g., your home router points to your ISP)."
        ]
      },
      chapter2: {
        title: "Routing Algorithms 1: Distance Vector",
        points: [
          "Explanation:\nWhen routers dynamically build their tables, they must use a mathematical algorithm. In a **Distance Vector** protocol (Routing by Rumor), a router only knows what its direct neighbors tell it. It has no map of the overall network topology.",
          "**Distance:** How far away the destination is (usually measured in 'Hops' — the number of routers crossed).\n**Vector:** Which direction to send it (the next-hop router).",
          "**The Mechanism:**\nEvery 30 seconds, a router broadcasts its *entire* routing table to its immediate neighbors. The neighbors look at the table, add 1 to the hop count, and update their own tables if they find a shorter path.",
          "**The Math: Bellman-Ford Algorithm**\nDistance Vector routing relies on the Bellman-Ford equation to calculate the cheapest path:\n`D_x(y) = min_v { c(x,v) + D_v(y) }`\nWhere:\n- `D_x(y)` is the least cost path from node x to node y.\n- `v` represents the immediate neighbors of x.\n- `c(x,v)` is the cost to travel from x to neighbor v.\n- `D_v(y)` is the neighbor's estimated cost to the final destination y.",
          "**Protocol in the wild: RIP (Routing Information Protocol)**\nRIP uses Hop Count as its metric. Its major limitation is that the maximum hop count is 15. A hop count of 16 is considered 'Infinity' (unreachable). This makes it useless for large enterprise networks."
        ]
      },
      chapter3: {
        title: "Routing Algorithms 2: Link State",
        points: [
          "Explanation:\nLink State routing takes the opposite approach (The God's Eye View). Instead of trusting rumors from neighbors, every single router maps out the *entire* network topology for itself.",
          "**The Mechanism:**\nInstead of sharing their whole routing table, routers only share the state of their own direct links (e.g., 'My link to Router B is up and is a 10Gbps connection'). They broadcast these small updates (**LSAs - Link State Advertisements**) to *every* router in the area. Because every router receives every LSA, every router builds an identical, complete map of the network.",
          "**The Math: Dijkstra's Algorithm**\nOnce the map is built, each router runs **Dijkstra's Shortest Path algorithm** independently to calculate the best route to every destination. The algorithm systematically visits nodes, calculating the lowest cumulative path cost from the source node to all other nodes.",
          "**Protocol in the wild: OSPF (Open Shortest Path First)**\nOSPF is the enterprise standard. Unlike RIP's basic hop count, OSPF calculates path 'cost' based on the actual bandwidth of the link (a 10Gbps fiber link costs far less than a 10Mbps copper link)."
        ]
      },
      chapter4: {
        title: "Distance Vector vs. Link State",
        points: [
          "Explanation:\nIn a system design interview, understanding the trade-offs between these two approaches is critical for network architecture.",
          "| Feature | Distance Vector (RIP) | Link State (OSPF) |\n|---|---|---|\n| **Knowledge of Topology** | Only knows what neighbors tell it (Rumor). | Has a complete, independent map of the network. |\n| **Updates Sent** | Entire routing table sent periodically (e.g., every 30s). | Only changes (Link states) sent when they happen. |\n| **Metric** | Usually Hop Count. | Bandwidth / Cost. |\n| **Convergence Speed** | Slow (Susceptible to routing loops). | Very Fast. |\n| **Resource Usage** | Low CPU and Memory. | High CPU and Memory (running Dijkstra takes work). |\n| **Scale** | Small networks. | Large, hierarchical enterprise networks. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the Default Route (Gateway of Last Resort)?",
        back: "Represented as 0.0.0.0/0, it is the route a router uses when it receives a packet destined for a network that is NOT explicitly listed in its routing table."
      },
      {
        front: "What routing algorithm does a Distance Vector protocol (like RIP) use?",
        back: "The Bellman-Ford algorithm."
      },
      {
        front: "What routing algorithm does a Link State protocol (like OSPF) use?",
        back: "Dijkstra's Shortest Path algorithm."
      }
    ],
    quiz: [
      {
        question: "Which of the following is a primary characteristic of a Link State routing protocol?",
        options: ["Routers periodically broadcast their entire routing table.", "Routers only know the topology based on what their immediate neighbors tell them.", "Every router builds an identical, complete map of the entire network topology.", "It utilizes the Bellman-Ford equation to calculate Hop Count."],
        answer: 2
      },
      {
        question: "In RIP (Routing Information Protocol), what is considered 'Infinity' or unreachable?",
        options: ["10 Hops", "16 Hops", "255 Hops", "100 Hops"],
        answer: 1
      }
    ]
  },
  {
    id: 'cn_layer4',
    title: 'Module 10: The Transport Layer (Layer 4)',
    notes: {
      intro: "Welcome to **Module 10: The Transport Layer (Layer 4)**.\n\nIf Layer 3 (IP) is about getting a packet from Server A to Server B, Layer 4 is about making sure the packet gets to the correct *application* running on Server B.\n\nIn a system design interview, choosing between TCP and UDP is often the very first architectural decision you make. Do you need perfect reliability (TCP), or do you need raw speed and are willing to lose some data (UDP)? Let's break down the mechanics of both.",
      chapter1: {
        title: "UDP vs. TCP",
        points: [
          "Explanation:\n**UDP (User Datagram Protocol)** is the 'fire and forget' protocol of the internet. It is connectionless, meaning it doesn't bother checking if the receiver is ready, and doesn't care if the packet gets lost in transit.",
          "**UDP Characteristics:** Extremely fast, zero setup delay, stateless, and completely unreliable. There is no error recovery or packet ordering.",
          "**The UDP Header:** It is incredibly lightweight (only 8 bytes). It contains exactly four fields: Source Port, Destination Port, Length, and Checksum.",
          "**TCP (Transmission Control Protocol)** is the workhorse of the internet. It is a **connection-oriented, highly reliable** protocol. It guarantees that data is delivered accurately and in the exact order it was sent.",
          "**TCP Characteristics:** Achieves reliability by assigning a **Sequence Number** to every byte. The receiver sends **ACKs (Acknowledgements)** back to the sender to confirm receipt. If no ACK is received before a timeout, the packet is retransmitted.",
          "**The TCP Header:** It is heavy (minimum 20 bytes). Contains Source/Dest Ports, Sequence Number, Acknowledgment Number, Window Size, Checksum, and crucial **Flags (SYN, ACK, FIN, RST)**.",
          "| Feature | TCP | UDP |\n|---|---|---|\n| **Connection State** | Connection-oriented (Handshake required) | Connectionless (Fire and forget) |\n| **Reliability** | Guaranteed delivery and data integrity | Best-effort (Packets can be lost/corrupted) |\n| **Ordering** | Guaranteed strict order | Packets arrive in random order |\n| **Header Size** | Minimum 20 Bytes | Fixed 8 Bytes |\n| **Speed/Overhead** | High overhead (slower) | Extremely lightweight (fast) |\n| **Use Cases** | Web Browsing (HTTP), Email, File Transfer, Databases | Live Video (WebRTC), Gaming, DNS, IoT Sensor Streams |"
        ]
      },
      chapter2: {
        title: "Connection Lifecycle",
        points: [
          "Explanation:\n**TCP Three-Way Handshake (Connection Establishment)**\nBefore TCP sends a single byte of application data, it must establish a formal connection to synchronize sequence numbers. This requires three steps.",
          "**1. SYN (Synchronize):** The Client sends a packet with the SYN flag set. *'I want to talk. My Initial Sequence Number (ISN) is 1000.'*",
          "**2. SYN-ACK:** The Server receives this, allocates memory, and replies with a SYN and an ACK flag. *'I acknowledge your 1000. My ISN is 5000.'*",
          "**3. ACK:** The Client replies with an ACK. *'I acknowledge your 5000. Let's begin.'*",
          "**Security Note: SYN Flood DDoS Attack**\nWhen a server replies with a SYN-ACK, it leaves the connection 'half-open' and reserves RAM. In a SYN Flood attack, an attacker sends millions of SYN packets but never sends the final ACK, filling up the server's memory until it crashes.",
          "**TCP Four-Way Termination (Connection Teardown)**\nTCP is a full-duplex connection (a two-way street). Each direction must be closed independently.",
          "**1. FIN:** Client says, *'I am done sending data.'*",
          "**2. ACK:** Server says, *'I acknowledge you are done sending.'*",
          "**3. FIN:** Later, the Server says, *'I am also done sending data.'*",
          "**4. ACK:** Client says, *'I acknowledge. Goodbye.'*",
          "**The TIME_WAIT State:**\nAfter sending that final ACK, the client does not close the connection instantly. It enters a `TIME_WAIT` state (usually for 2 minutes). It does this in case the final ACK was lost in the network. If it was lost, the server will re-transmit its FIN, and the client needs to still be around to re-ACK it."
        ]
      },
      chapter3: {
        title: "Flow Control & Congestion Control",
        points: [
          "Explanation:\nIf a sender waited for an ACK after every single packet, the internet would be agonizingly slow. Instead, TCP allows the sender to transmit multiple packets in flight simultaneously using a **Sliding Window**.",
          "**Flow Control (Protects the Receiver)**\nFlow Control prevents a fast sender from overwhelming a slow receiver's limited RAM/buffer.",
          "In every ACK sent back to the sender, the receiver includes its **Advertised Window (rwnd)** (e.g., *'I have 50KB of buffer space left'*). If the receiver's buffer fills up, it advertises a Window Size of 0, forcing the sender to completely pause.",
          "**Congestion Control (Protects the Network)**\nCongestion Control prevents a catastrophic 'congestion collapse' by protecting the routers and switches in the middle. The sender calculates an internal **Congestion Window (cwnd)**.",
          "**1. Slow Start:** The sender starts cautiously. `cwnd` starts at 1 packet. For every successful ACK, `cwnd` doubles (1, 2, 4, 8...). It grows exponentially to rapidly probe the network's capacity.",
          "**2. AIMD (Additive Increase, Multiplicative Decrease):** Once the sender hits a threshold, it switches to AIMD. It grows slowly (+1 packet per round trip). When a packet drops (congestion detected!), it harshly halves the window (`cwnd / 2`).",
          "**3. Fast Retransmit & Fast Recovery:** If the sender receives 3 duplicate ACKs (subsequent packets arrived out of order), it immediately retransmits the missing packet without waiting for a timeout, and smoothly recovers its window size.",
          "| Feature | Flow Control | Congestion Control |\n|---|---|---|\n| **Protects** | The Receiver's RAM/Buffer. | The Network (Routers/Links). |\n| **Mechanism** | Advertised Window (`rwnd`) in the TCP Header. | Internal Congestion Window (`cwnd`) calculated by sender. |\n| **Triggered by** | Slow application layer reading data. | Dropped packets / network bottlenecks. |"
        ]
      },
      chapter4: {
        title: "Reliable Transmission Protocols",
        points: [
          "Explanation:\nWhen a packet is lost in that sliding window, how exactly does the protocol recover it? There are three mathematical models.",
          "**1. Stop and Wait:** Send 1 packet. Wait for the ACK. Send packet 2. Wait. (Highly inefficient, wastes bandwidth).",
          "**2. Go-Back-N (GBN):** Send $N$ packets. The receiver only accepts packets in strict order. If packet 2 is lost, but packets 3, 4, and 5 arrive, the receiver drops 3, 4, and 5. The sender times out on packet 2 and retransmits 2, 3, 4, and 5. (Simpler for receiver, but wastes bandwidth on retransmitting good packets).",
          "**3. Selective Repeat (SR):** Send $N$ packets. If packet 2 is lost, the receiver keeps 3, 4, and 5 in a buffer and ACKs them. The sender realizes only packet 2 is missing and *selectively* retransmits only packet 2. (Highly efficient, but requires complex memory management on both sides). *Modern TCP uses a variation of this.*"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary difference in use cases between Flow Control and Congestion Control in TCP?",
        back: "Flow Control protects the RECEIVER from being overwhelmed. Congestion Control protects the NETWORK (routers/switches) from being overwhelmed."
      },
      {
        front: "What is a SYN Flood attack?",
        back: "A DDoS attack where an attacker sends millions of SYN packets to a server but never completes the 3-way handshake with the final ACK. This leaves 'half-open' connections that consume all of the server's RAM."
      },
      {
        front: "Why does TCP connection termination require a 4-Way Handshake instead of a 3-way?",
        back: "Because TCP is full-duplex. The client might be done sending data (requiring a FIN), but the server might still be transmitting a large file. Both directions must be closed independently."
      }
    ],
    quiz: [
      {
        question: "Which TCP Congestion Control phase aggressively probes network capacity by doubling the Congestion Window (cwnd) for every successful ACK?",
        options: ["AIMD (Additive Increase, Multiplicative Decrease)", "Fast Retransmit", "Slow Start", "Selective Repeat"],
        answer: 2
      },
      {
        question: "In reliable transmission models, which protocol forces the sender to re-transmit an entire window of packets (including successfully delivered ones) if just one packet in the sequence is lost?",
        options: ["Stop and Wait", "Go-Back-N (GBN)", "Selective Repeat (SR)", "Sliding Window Protocol"],
        answer: 1
      }
    ]
  },
  {
    id: 'cn_layer7',
    title: 'Module 11: The Application Layer (Layer 7)',
    notes: {
      intro: "Welcome to **Module 11: The Application Layer (Layer 7)**. We have finally reached the top of the OSI model. This is where the network meets the software.\n\nWhen you are designing web architectures, microservices, or client-server interactions, you will spend 90% of your time operating at this layer. These protocols dictate how applications format data, authenticate users, and manage state.\n\nLet's dive into the protocols that power the modern web.",
      chapter1: {
        title: "HTTP (Hypertext Transfer Protocol)",
        points: [
          "Explanation:\nHTTP is the absolute foundation of data communication on the World Wide Web. It is a **stateless, client-server protocol** that operates over TCP (usually Port 80).",
          "**Core Concepts:**",
          "**Request & Response Cycle:** The Client (your browser) sends an HTTP Request to the Server. The Server processes it and sends back an HTTP Response.",
          "**Statelessness:** Every single HTTP request is completely independent. The server has no memory of the previous request. *(In system design, to give users a 'session', we pass Cookies or JWT tokens in the headers of every request).*.",
          "**HTTP Methods (The Verbs):**",
          "**GET:** Retrieve data (e.g., loading a webpage). Should never modify data.\n**POST:** Submit new data to the server (e.g., submitting a login form).\n**PUT:** Update or replace existing data on the server.\n**DELETE:** Remove data from the server.",
          "**Status Codes (The Server's Answer):**\n- **1xx (Informational):** Request received, continuing process.\n- **2xx (Success):** Action successfully received (e.g., `200 OK`, `201 Created`).\n- **3xx (Redirection):** Further action must be taken (e.g., `301 Moved Permanently`).\n- **4xx (Client Error):** You messed up (e.g., `400 Bad Request`, `401 Unauthorized`, `404 Not Found`).\n- **5xx (Server Error):** The server messed up (e.g., `500 Internal Server Error`, `503 Service Unavailable`).",
          "**Headers:**\nKey-value pairs sent in both requests and responses. They contain critical metadata, such as the `Content-Type` (e.g., `application/json`), authorization tokens, and caching instructions."
        ]
      },
      chapter2: {
        title: "HTTPS & TLS / SSL",
        points: [
          "Explanation:\nHTTP transmits everything in plaintext. If you send a password over HTTP, anyone intercepting the traffic can read it perfectly. **HTTPS (HTTP Secure)** is simply HTTP layered on top of an encrypted security protocol called **TLS (Transport Layer Security)**.",
          "**Encryption Mechanics:** TLS uses a hybrid approach.",
          "**1. Asymmetric Encryption (Public/Private Keys):** The server has a Public Key (shared) and a Private Key (secret). Data encrypted with the Public Key can *only* be decrypted by the Private Key. Highly secure but mathematically very slow.",
          "**2. Symmetric Encryption (Session Key):** Both sides use the *exact same key* to encrypt and decrypt. Incredibly fast but risky to share over the internet.",
          "**The Solution:** TLS uses slow Asymmetric encryption *just long enough* to securely exchange a fast Symmetric 'Session Key'. Once both sides have the Session Key, they switch to Symmetric encryption.",
          "**Certificates & The TLS Handshake:**",
          "The server provides a Digital Certificate issued by a trusted Certificate Authority (CA) to prove its identity.",
          "**1. Client Hello:** 'I want to talk securely. Here are the cipher suites I support.'\n**2. Server Hello & Certificate:** 'Let's use this cipher. Here is my Certificate and my Public Key.'\n**3. Key Exchange:** The Client verifies the certificate, generates a random symmetric Session Key, encrypts it with the Server's Public Key, and sends it to the server.\n**4. Finished:** Both sides now securely share the Symmetric Key.",
          "| Feature | HTTP | HTTPS |\n|---|---|---|\n| **Port** | 80 | 443 |\n| **Security** | Plaintext (Insecure) | Encrypted (Secure) |\n| **Performance** | Faster (No handshake overhead) | Slightly slower initial connection |",
          "| Feature | SSL (Secure Sockets Layer) | TLS (Transport Layer Security) |\n|---|---|---|\n| **Status** | Deprecated / Obsolete | The modern standard (TLS 1.2 / 1.3) |\n| **History** | Created by Netscape in the 90s | The open standard successor to SSL |"
        ]
      },
      chapter3: {
        title: "FTP (File Transfer Protocol)",
        points: [
          "Explanation:\nFTP is a legacy protocol used for transferring files between a client and a server. It is unique because it uses **two separate TCP connections** to work.",
          "**1. Control Channel (Port 21):** Used to send commands (like `USER`, `PASS`, `LIST`). This connection stays open the whole time.",
          "**2. Data Channel (Port 20):** A temporary connection opened specifically to transfer the actual file, then closed when the file is done.",
          "**Active vs. Passive Mode:**",
          "**Active Mode:** Client opens a random port and asks the Server to connect to it. *(Problem: Client firewalls block incoming connections).*.",
          "**Passive Mode (Modern Standard):** Server opens a random port and asks the Client to connect to it. *(Highly firewall-friendly).*.",
          "| Feature | FTP | SFTP (SSH File Transfer Protocol) |\n|---|---|---|\n| **Security** | Plaintext (Passwords easily stolen) | Fully encrypted |\n| **Underlying Protocol** | TCP (Ports 20/21) | SSH (Port 22) |\n| **Channels** | Uses two distinct channels | Uses a single secure channel |"
        ]
      },
      chapter4: {
        title: "The Email Trinity: SMTP, POP3, and IMAP",
        points: [
          "Explanation:\nEmail requires a complex flow of protocols. You use **SMTP** to *push* an email to your mail server, which uses SMTP to *push* it to your friend's mail server. Your friend's app then uses **IMAP** or **POP3** to *pull* the email down to their screen.",
          "**SMTP (Simple Mail Transfer Protocol):**",
          "**Purpose:** Pushing mail. It only sends; it never downloads.\n**Ports:** Port 25 (Unencrypted/Relay), Port 587 (Encrypted Submission).",
          "**POP3 (Post Office Protocol v3):**",
          "**Purpose:** Downloading mail.\n**Behavior:** By default, POP3 downloads the email to your local hard drive and then **deletes it** from the server. Saves server storage, but terrible for modern multi-device users.",
          "**IMAP (Internet Message Access Protocol):**",
          "**Purpose:** Synchronizing mail.\n**Behavior:** Reads emails directly off the server. If you read an email on your phone, it marks it 'Read' on the server, so your laptop also sees it as 'Read'. Perfect for multi-device support, but requires massive server storage.",
          "| Protocol | Function | Primary Direction | Standard Port (Encrypted) |\n|---|---|---|---|\n| **SMTP** | Sending Mail | Client -> Server (or Server -> Server) | 587 |\n| **POP3** | Receiving Mail (Download & Delete) | Server -> Client | 995 |\n| **IMAP** | Receiving Mail (Sync) | Server <-> Client | 993 |"
        ]
      },
      chapter5: {
        title: "SSH & Telnet",
        points: [
          "Explanation:\nWhen a system administrator needs to manage a headless Linux server sitting in a data center 1,000 miles away, they need a remote command-line interface.",
          "**Telnet (The Legacy Way)**",
          "Telnet transmits absolutely everything—including every keystroke, username, and password—in **plaintext**. If a network engineer logs in using Telnet, anyone sniffing the network can steal the admin credentials. (Uses Port 23).",
          "**SSH (Secure Shell)**",
          "The secure, modern replacement for Telnet. Everything is heavily encrypted via a process similar to TLS. (Uses Port 22).",
          "**Public Key Authentication:** While you can use passwords, SSH is famous for this. You generate a cryptographic keypair on your laptop and put the Public Key on the server. When connecting, the server challenges your laptop to prove it holds the matching Private Key. If the math checks out, you log in instantly without a password.",
          "| Feature | Telnet | SSH |\n|---|---|---|\n| **Port** | 23 | 22 |\n| **Encryption** | None (Plaintext) | Full cryptographic encryption |\n| **Authentication** | Passwords only | Passwords or Cryptographic Keypairs |\n| **System Design Use** | Never use this. | Industry standard for server administration. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary difference between POP3 and IMAP?",
        back: "POP3 downloads the email to a single device and deletes it from the server. IMAP synchronizes the email directly on the server, allowing seamless use across multiple devices."
      },
      {
        front: "What does an HTTP 404 Status Code represent?",
        back: "A 'Client Error' indicating that the requested resource could not be found on the server (usually because the user typed the wrong URL)."
      },
      {
        front: "Why does TLS use both Asymmetric and Symmetric encryption?",
        back: "Asymmetric encryption is highly secure but mathematically slow. TLS only uses it during the initial handshake to securely exchange a Symmetric 'Session Key'. It then switches to the much faster Symmetric encryption for the rest of the connection."
      },
      {
        front: "What is Public Key Authentication in SSH?",
        back: "Instead of a password, you use a cryptographic keypair. You place your Public Key on the server. When you connect, the server challenges your computer to prove it holds the matching Private Key."
      }
    ],
    quiz: [
      {
        question: "Which FTP mode is considered 'firewall-friendly' for the client because the Server opens a port and waits for the Client to connect to it?",
        options: ["Active Mode", "Passive Mode", "Control Mode", "Data Mode"],
        answer: 1
      },
      {
        question: "If your browser receives an HTTP 503 error, what does the '5' in 503 indicate?",
        options: ["Informational", "Success", "Redirection", "Server Error"],
        answer: 3
      }
    ]
  },
  {
    id: 'cn_backend_architecture',
    title: 'Module 12: Modern Networking & Backend Architecture',
    notes: {
      intro: "Welcome to **Module 12: Modern Networking & Backend Architecture**. We have moved past how packets travel across cables and routers. Now, we are standing inside the data center. When you get a system design interview question like 'Design Twitter' or 'Design Netflix', the concepts in this module are the exact puzzle pieces you will use to build a scalable, highly available architecture.\n\nLet’s break down the components that handle millions of requests per second.",
      chapter1: {
        title: "APIs (Application Programming Interfaces)",
        points: [
          "Explanation:\nIf a website is designed for humans to read, an API is a website designed for *code* to read. It is the contract that allows two separate software systems to communicate.",
          "**Core Concepts:**",
          "**Endpoint:** The specific URL where the API lives (e.g., `https://api.weather.com/v1/current`).",
          "**JSON (JavaScript Object Notation):** The universal lightweight language of modern APIs, structuring data in key-value pairs.",
          "**CRUD Operations:** The four fundamental actions on data:\n- **C**reate -> `POST`\n- **R**ead -> `GET`\n- **U**pdate -> `PUT` / `PATCH`\n- **D**elete -> `DELETE`",
          "**REST Basics (Representational State Transfer):**\nREST is an architectural style, not a protocol. A RESTful API must be **stateless** (server remembers nothing between requests) and **resource-based** (endpoints represent nouns, like `/users/123`, not verbs).",
          "| Feature | REST API | GraphQL | WebSockets |\n|---|---|---|---|\n| **Architecture** | Multiple endpoints (`/users`, `/posts`). | Single endpoint (`/graphql`). Client requests exactly the fields they want. | Persistent, full-duplex TCP connection. |\n| **Data Fetching** | Prone to 'Overfetching' or 'Underfetching'. | Solves overfetching. Highly flexible. | Real-time push (server pushes data instantly). |\n| **State** | Stateless. | Stateless. | Stateful (Connection stays open). |\n| **Best For** | Standard CRUD web services. | Complex UIs needing data from many sources. | Chat apps, live sports scores, multiplayer games. |"
        ]
      },
      chapter2: {
        title: "Forward Proxy vs. Reverse Proxy",
        points: [
          "Explanation:\nProxies are the 'middlemen' of the internet. The difference between them comes down to **who they are protecting**.",
          "**Forward Proxy (Protects the Client)**",
          "A forward proxy sits on the *client's* local network. When you want to go to google.com, you send the request to the proxy. The proxy goes to the internet, gets the page, and hands it back to you.",
          "**Purpose:** The internet never sees your IP address; it only sees the Proxy's IP.\n**Use Cases:** Corporate Content Filtering (blocking social media) and scanning outgoing traffic for malware.",
          "**Reverse Proxy (Protects the Server)**",
          "A reverse proxy sits inside the data center, directly in front of the backend web servers. When the client sends a request to `netflix.com`, it actually hits the Reverse Proxy first.",
          "**Purpose:** Shields the backend infrastructure from direct exposure to the internet.\n**Capabilities:**\n- **SSL Termination:** Decrypting HTTPS traffic at the proxy so backend servers don't waste CPU doing cryptography.\n- **Caching:** Serving static images/pages directly without waking up the backend server.",
          "| Feature | Forward Proxy | Reverse Proxy |\n|---|---|---|\n| **Who it represents** | Represents the Client (User). | Represents the Server (Backend). |\n| **Direction** | Outbound traffic (Client -> Internet). | Inbound traffic (Internet -> Server). |"
        ]
      },
      chapter3: {
        title: "Load Balancers",
        points: [
          "Explanation:\nIf you have one server, a traffic spike will crash it. To scale horizontally, you add 10 servers. A **Load Balancer** sits in front of them to intelligently distribute the incoming traffic.",
          "**Core Mechanisms:**",
          "**Health Checks:** The load balancer constantly 'pings' backend servers. If a server crashes, it is removed from the pool.",
          "**Sticky Sessions (Session Affinity):** Ensures a specific user's future requests are always routed back to the exact same server where their session data lives.",
          "**Load Balancing Algorithms:**",
          "**1. Round Robin:** Request 1 goes to Server A, Request 2 to B, Request 3 to C, Request 4 back to A.\n**2. Least Connections:** Routes the new request to the server with the fewest currently active connections.\n**3. IP Hash:** Hashes the client's IP address to determine the server. Ensures a specific user *always* hits the same server.\n**4. Weighted:** Assigns a higher 'weight' to more powerful servers so they receive a larger percentage of the traffic.",
          "**Load Balancer vs. Reverse Proxy:**\nA Reverse Proxy focuses on security, caching, and SSL (useful even for a single server). A Load Balancer focuses strictly on traffic distribution across *multiple* servers."
        ]
      },
      chapter4: {
        title: "API Gateways",
        points: [
          "Explanation:\nAs companies moved from monolithic applications to **Microservices**, managing hundreds of small APIs became a nightmare. The API Gateway is the **single point of entry** for all clients.",
          "**Key Responsibilities:**",
          "**Routing:** Translates a single client request into calls across multiple distinct microservices (e.g., routing `/billing` to the Billing Service).",
          "**Authentication:** Verifies the user's identity (like JWTs) *once* at the gateway, passing trusted requests downstream, saving every microservice from repeating the auth logic.",
          "**Rate Limiting:** Blocks a user if they make too many requests per minute to protect backends from abuse.",
          "**Request Aggregation:** Instead of a mobile phone making 3 slow requests over cellular networks for User, Billing, and Recommendation data, it makes 1 request to the API Gateway. The Gateway makes the 3 fast backend requests, compiles them into one JSON payload, and sends it back.",
          "| Feature | API Gateway | Load Balancer / Reverse Proxy |\n|---|---|---|\n| **Intelligence** | Highly intelligent. Understands API endpoints, payloads, and user identities. | Relatively 'dumb'. Mostly looks at IPs, Ports, and basic HTTP headers. |\n| **Logic** | Executes business logic (Auth, Aggregation, Rate Limiting). | Executes infrastructure logic (Distribution, SSL). |"
        ]
      },
      chapter5: {
        title: "CDN (Content Delivery Network)",
        points: [
          "Explanation:\nPhysics is the ultimate bottleneck. If your server is in New York and a user in Tokyo requests a 5MB image, crossing the ocean introduces massive latency. A CDN solves this.",
          "**How It Works:** A globally distributed network of proxy servers called **Edge Servers**. When the Tokyo user requests the image, they hit the Tokyo Edge Server. If it doesn't have it, it fetches it once from the Origin Server in New York, caches it locally, and serves all future Tokyo users instantly.",
          "**Static vs. Dynamic Content:**",
          "**Static Content (Easy):** Images, CSS, JavaScript. CDNs cache these perfectly.",
          "**Dynamic Content (Hard):** A unique bank account balance cannot be cached. However, modern CDNs provide highly optimized, dedicated fiber-optic paths back to the Origin Server, skipping congested public internet routers.",
          "**CDN vs. Reverse Proxy:** A Reverse Proxy sits locally in your data center. A CDN sits geographically as close to the end-user as physically possible (a massive, global network of reverse proxies)."
        ]
      }
    },
    flashcards: [
      {
        front: "What is Request Aggregation in an API Gateway?",
        back: "A pattern where the API Gateway takes a single request from a client, makes multiple internal requests to various microservices, combines the results into a single payload, and sends it back to the client. This saves mobile apps from making multiple slow network requests."
      },
      {
        front: "What is SSL Termination?",
        back: "The process where a Reverse Proxy decrypts incoming HTTPS traffic. It handles the heavy cryptographic math, passing plaintext HTTP to the backend servers to save them CPU power."
      },
      {
        front: "Explain the difference between a Forward Proxy and a Reverse Proxy.",
        back: "A Forward Proxy sits on the client's network and protects the client (e.g., hiding their IP from the internet). A Reverse Proxy sits in the data center and protects the server (e.g., hiding the backend infrastructure from the internet)."
      },
      {
        front: "What load balancing algorithm hashes the client's IP address to ensure they always connect to the same backend server?",
        back: "IP Hashing."
      }
    ],
    quiz: [
      {
        question: "Which of the following architectural styles solves the problem of 'Overfetching' by allowing the client to specify exactly which fields it wants returned in a single endpoint?",
        options: ["REST API", "WebSockets", "GraphQL", "SOAP"],
        answer: 2
      },
      {
        question: "If a backend server crashes, what load balancer mechanism ensures traffic stops being routed to that dead server?",
        options: ["Sticky Sessions", "Health Checks", "Round Robin", "Rate Limiting"],
        answer: 1
      }
    ]
  },
  {
    id: 'cn_performance',
    title: 'Module 13: Performance',
    notes: {
      intro: "Welcome to **Module 13: Performance**.\n\nIn system design interviews, you will frequently be asked to identify bottlenecks. Is the application slow because of the database, or is it physics? Understanding network performance allows you to confidently answer those questions and architect systems that respect the limitations of the physical world.\n\nLet's break down exactly where time is lost in a network and how we measure it.",
      chapter1: {
        title: "Network Delays (Where time is lost)",
        points: [
          "Explanation:\nWhen a packet travels from Host A to Host B, it crosses multiple routers. At *every single router*, the packet experiences four distinct types of delay. The total time lost at a single router (Nodal Delay) is: `d_nodal = d_proc + d_queue + d_trans + d_prop`",
          "**1. Processing Delay (d_proc)**\n**What it is:** Time the router's CPU takes to inspect the packet's header, determine where to send it, and check for bit-level errors.\n**Scale:** Usually microseconds or less (highly optimized).",
          "**2. Queuing Delay (d_queue)**\n**What it is:** Time the packet spends waiting in the router's memory buffer because the output link is currently busy.\n**Scale:** Highly variable. 0 if empty. Milliseconds if congested. If the queue is full, the packet is dropped (Packet Loss).",
          "**3. Transmission Delay (d_trans)**\n**What it is:** The physical time it takes to push all the bits of the packet onto the wire. Function of packet length (L) and link bandwidth (R).\n**Formula:** `L / R`\n**Analogy:** How long it takes to squeeze a 10-gallon bucket of water through a funnel. A wider funnel (more bandwidth) pushes it through faster.",
          "**4. Propagation Delay (d_prop)**\n**What it is:** The time it takes for a single bit to physically travel through the cable from Router A to Router B. Bound by the speed of light.\n**Formula:** `d / s` (Distance / speed).\n**Analogy:** How long the water takes to travel through a 100-mile long pipe once it's already inside.\n*(Note: You cannot optimize this without physically moving servers closer to the user—this is exactly why CDNs exist).*."
        ]
      },
      chapter2: {
        title: "Performance Metrics",
        points: [
          "Explanation:\nTo evaluate a system's health, we track these five vital metrics.",
          "**1. Bandwidth:** The maximum theoretical capacity of a network link (e.g., a 1 Gbps fiber cable). Analogy: Physical diameter of a water pipe.",
          "**2. Throughput:** The *actual* rate of successful data transfer at a given moment. Influenced by congestion and protocol overhead. Analogy: Actual water flowing out of the pipe.",
          "**3. Latency:** The total time it takes for a packet to travel from the source to the destination (sum of transmission, propagation, processing, and queuing delays).",
          "**4. Jitter:** The *variance* in latency. If Packet 1 takes 50ms, Packet 2 takes 120ms, and Packet 3 takes 40ms, you have high jitter. Disastrous for real-time UDP applications (VoIP, gaming).",
          "**5. Packet Loss:** The percentage of packets that fail to reach their destination. Almost always caused by router buffers overflowing during traffic spikes."
        ]
      },
      chapter3: {
        title: "Core Comparisons for System Design",
        points: [
          "Explanation:\nIf an interviewer asks you to optimize a system, you must use these terms correctly.",
          "| Feature | Bandwidth | Throughput |\n|---|---|---|\n| **What it measures** | Potential capacity (The ceiling). | Actual performance (The reality). |\n| **Fixed/Variable** | Fixed by the physical hardware. | Highly variable based on network conditions. |\n| **Optimization** | Buy a better, more expensive cable/port. | Optimize TCP window sizes, reduce congestion, use a CDN. |",
          "| Feature | Latency | Ping (Round Trip Time - RTT) |\n|---|---|---|\n| **Direction** | Technically, it is **One-Way** (Source to Destination). | Strictly **Two-Way** (Source -> Dest -> Source). |\n| **What it includes** | Only the network transit delays. | Network transit + destination's OS processing time to generate ICMP Echo Reply. |\n| **Usage** | Used by engineers to describe theoretical limits. | Practical diagnostic tool users see on their screens. |"
        ]
      }
    },
    flashcards: [
      {
        front: "What is Jitter and what type of applications does it affect most?",
        back: "Jitter is the variance (inconsistency) in latency between packets. It is disastrous for real-time UDP applications like VoIP or live gaming, causing robotic audio and teleporting characters."
      },
      {
        front: "What is the difference between Transmission Delay and Propagation Delay?",
        back: "Transmission Delay is the time required to push the data onto the wire (funnel). Propagation Delay is the time required for that data to physically travel through the medium to the destination (the length of the pipe)."
      },
      {
        front: "Why do packets drop?",
        back: "Packet loss almost always occurs when traffic spikes cause a router's memory buffer (Queue) to overflow. When the router has no memory left, it panics and drops incoming data."
      }
    ],
    quiz: [
      {
        question: "Which network metric describes the actual, real-world rate of successful data transfer at any given moment, rather than the theoretical maximum of the cable?",
        options: ["Bandwidth", "Throughput", "Latency", "Propagation"],
        answer: 1
      },
      {
        question: "If an interviewer asks you how to reduce 'Propagation Delay' for users in Tokyo trying to access your database in New York, what is the ONLY mathematically correct answer?",
        options: ["Increase the bandwidth of the New York router to 10Gbps.", "Use a highly compressed data format like Protocol Buffers.", "Move the data closer to the user by utilizing a CDN Edge Server in Tokyo.", "Switch the application protocol from TCP to UDP."],
        answer: 2
      }
    ]
  },
  {
    id: 'cn_commands',
    title: 'Module 14: Networking Commands',
    notes: {
      intro: "Welcome to **Module 14: Networking Commands**.\n\nIn the real world of system engineering, cloud architecture, and DevOps, you rarely have a shiny Graphical User Interface (GUI) to diagnose problems. When a server goes down at 3:00 AM, you only have a command-line terminal.\n\nMastering these commands is non-negotiable for troubleshooting, and they frequently pop up in technical interviews when assessing your hands-on operational knowledge.",
      chapter1: {
        title: "1. `ping`",
        points: [
          "**Purpose:** Tests Layer 3 (Network Layer) reachability to a specific host and measures the Round Trip Time (RTT). It uses ICMP Echo Request and Echo Reply messages.",
          "**Syntax:** `ping <hostname_or_IP>`",
          "**Sample Output:**",
          "```bash\n$ ping google.com\nPinging google.com [142.250.190.46] with 32 bytes of data:\nReply from 142.250.190.46: bytes=32 time=12ms TTL=117\nReply from 142.250.190.46: bytes=32 time=14ms TTL=117\nReply from 142.250.190.46: bytes=32 time=11ms TTL=117\n\nPing statistics for 142.250.190.46:\n    Packets: Sent = 3, Received = 3, Lost = 0 (0% loss)\n```",
          "**Explanation of Output Fields:**",
          "**bytes=32:** The size of the ICMP payload sent.",
          "**time=12ms:** The Round Trip Time (RTT). How long the packet took to get there and back.",
          "**TTL=117:** Time to Live. Shows how many router hops the packet has remaining before it is discarded.",
          "**Lost = 0:** Indicates network stability. Anything above 0% indicates a failing link or extreme congestion.",
          "**Real-world Use Cases:**",
          "**Sanity Check:** 'Is the server completely dead, or is it just the web application that crashed?' If it pings, the OS and network card are alive.",
          "**Baseline Latency:** Measuring the baseline delay between your app server and your database server."
        ]
      },
      chapter2: {
        title: "2. `tracert` / `traceroute`",
        points: [
          "**Purpose:** Maps the exact router-by-router path a packet takes from your machine to the destination. It intentionally manipulates the IP TTL field to force each router along the path to reply with an ICMP 'Time Exceeded' error.",
          "**Syntax:** `tracert <hostname_or_IP>` (Windows)",
          "**Sample Output:**",
          "```bash\n$ tracert 8.8.8.8\nTracing route to dns.google [8.8.8.8] over a maximum of 30 hops:\n\n  1    <1 ms    <1 ms    <1 ms  192.168.1.1 (Home Router)\n  2    10 ms    11 ms    12 ms  10.20.30.40 (ISP Gateway)\n  3     * * * Request timed out.\n  4    15 ms    14 ms    15 ms  dns.google [8.8.8.8]\n\nTrace complete.\n```",
          "**Explanation of Output Fields:**",
          "**Hop Column (1, 2, 3...):** The sequence of routers crossed.",
          "**Time Columns (10 ms, 11 ms...):** It sends 3 probes per hop. These are the RTTs for each probe.",
          "**Hostname/IP:** The identity of the router at that hop.",
          "**Asterisks (*):** Indicates the router dropped the packet or is configured to ignore ICMP requests for security reasons (very common on the internet backbone).",
          "**Real-world Use Cases:**",
          "**Pinpointing Outages:** If users complain they can't reach your site, `traceroute` tells you if the connection is dying at their ISP, halfway across the country, or at your own data center's firewall."
        ]
      },
      chapter3: {
        title: "3. Local Interface Config (`ipconfig` / `ip addr`)",
        points: [
          "**Purpose:** Displays or modifies the current configuration of the local Network Interface Cards (NICs), including IP addresses, Subnet Masks, and Default Gateways.\n- `ipconfig`: Windows standard.\n- `ifconfig`: Legacy Linux/Mac standard.\n- `ip addr`: Modern Linux standard.",
          "**Syntax:** `ipconfig /all` (Windows) or `ip addr show` (Linux)",
          "**Sample Output:**",
          "```bash\nWireless LAN adapter Wi-Fi:\n   Physical Address. . . . . . . . . : A1-B2-C3-D4-E5-F6\n   IPv4 Address. . . . . . . . . . . : 192.168.1.50(Preferred)\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1\n   DHCP Server . . . . . . . . . . . : 192.168.1.1\n```",
          "**Explanation of Output Fields:**",
          "**Physical Address:** Your Layer 2 MAC Address.",
          "**IPv4 Address:** Your current Layer 3 logical address.",
          "**Subnet Mask:** Defines the boundary of your local network (e.g., `/24`).",
          "**Default Gateway:** The IP of the router that handles outbound internet traffic.",
          "**Real-world Use Cases:**",
          "**Network Setup:** Finding your router's IP so you can log into its web interface.",
          "**DHCP Debugging:** Releasing and renewing a stuck IP lease (`ipconfig /release` then `/renew`)."
        ]
      },
      chapter4: {
        title: "4. `arp`",
        points: [
          "**Purpose:** Displays and modifies the local Address Resolution Protocol (ARP) cache, which maps Layer 3 IP addresses to Layer 2 MAC addresses.",
          "**Syntax:** `arp -a` (Windows/Linux)",
          "**Sample Output:**",
          "```bash\nInterface: 192.168.1.50 --- 0x4\n  Internet Address      Physical Address      Type\n  192.168.1.1           a1-b2-c3-d4-e5-f6     dynamic\n  192.168.1.255         ff-ff-ff-ff-ff-ff     static\n```",
          "**Explanation of Output Fields:**",
          "**Internet Address:** The IP address of a device on your local LAN.",
          "**Physical Address:** The corresponding MAC address.",
          "**Type (Dynamic):** Learned automatically via the ARP process. Will expire from the cache eventually.",
          "**Type (Static):** Hardcoded manually or represents a permanent multicast/broadcast address.",
          "**Real-world Use Cases:**",
          "**Security Audits:** Detecting 'ARP Spoofing' (Man-in-the-Middle attacks) by checking if two different IPs share the same MAC address in the table.",
          "**Device Discovery:** Finding the MAC address of a headless Raspberry Pi or IoT device you just plugged into the switch."
        ]
      },
      chapter5: {
        title: "5. `route`",
        points: [
          "**Purpose:** Views or manipulates the host's internal IP routing table. It shows exactly how your machine decides where to send traffic.",
          "**Syntax:** `route print` (Windows) or `ip route` (Linux)",
          "**Sample Output:**",
          "```bash\nIPv4 Route Table\n===========================================================================\nActive Routes:\nNetwork Destination        Netmask          Gateway       Interface  Metric\n          0.0.0.0          0.0.0.0      192.168.1.1    192.168.1.50      25\n      192.168.1.0    255.255.255.0         On-link     192.168.1.50      25\n===========================================================================\n```",
          "**Explanation of Output Fields:**",
          "**Network Destination 0.0.0.0:** This is the Default Route. Any traffic going to the internet matches this line.",
          "**Gateway:** Where the packet is forwarded (your router).",
          "**On-link:** Means the destination is on the exact same physical switch as you; no gateway router is needed.",
          "**Metric:** The 'cost' of the route. If there are two routes to the same destination, the OS chooses the one with the lowest metric.",
          "**Real-world Use Cases:**",
          "**VPN Troubleshooting:** When you connect to a corporate VPN but can't reach internal servers, checking the route table confirms if the OS is correctly funneling corporate IPs down the VPN tunnel interface."
        ]
      },
      chapter6: {
        title: "6. `netstat`",
        points: [
          "**Purpose:** Displays active TCP/UDP connections, listening ports, and routing statistics. It is the ultimate tool for checking what software is using the network.",
          "**Syntax:** `netstat -ano` (Windows - shows PIDs) or `netstat -tuln` (Linux - shows listening TCP/UDP ports).",
          "**Sample Output:**",
          "```bash\n  Proto  Local Address          Foreign Address        State           PID\n  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING       4231\n  TCP    192.168.1.50:51234     142.250.190.46:443     ESTABLISHED     8912\n```",
          "**Explanation of Output Fields:**",
          "**Local Address (0.0.0.0:80):** Means a local application is bound to Port 80 and is accepting connections from *any* IP interface.",
          "**State (LISTENING):** A server application (like Nginx) is waiting for incoming requests.",
          "**State (ESTABLISHED):** An active, open data connection (e.g., your browser talking to a Google server on port 443).",
          "**PID:** Process ID. Tells you exactly which application is using that port.",
          "**Real-world Use Cases:**",
          "**Port Conflicts:** You try to start a Node.js server on Port 3000 and it crashes with `EADDRINUSE`. You run `netstat` to find the PID of the ghost process hogging Port 3000 so you can kill it.",
          "**Security:** Spotting unauthorized outbound connections to strange IPs."
        ]
      },
      chapter7: {
        title: "7. `nslookup` / `dig`",
        points: [
          "**Purpose:** Queries DNS servers to resolve domain names to IP addresses, or fetches specific DNS records (MX, TXT, CNAME). `nslookup` is standard on Windows; `dig` is the superior, more detailed tool on Linux/Mac.",
          "**Syntax:** `nslookup google.com` or `dig google.com +short`",
          "**Sample Output (nslookup):**",
          "```bash\n$ nslookup google.com\nServer:  UnKnown\nAddress:  192.168.1.1\n\nNon-authoritative answer:\nName:    google.com\nAddresses:  2607:f8b0:4009:815::200e\n          142.250.190.46\n```",
          "**Explanation of Output Fields:**",
          "**Server / Address (Top):** The DNS server your machine asked (usually your local router or ISP).",
          "**Non-authoritative answer:** Means your local DNS server didn't own the domain; it just pulled the answer from its cache or asked another server.",
          "**Addresses (Bottom):** The actual IPv6 and IPv4 addresses for the domain.",
          "**Real-world Use Cases:**",
          "**DNS Propagation:** You just migrated your website to a new host and changed the DNS records. You use `nslookup` to see if the world is seeing the new IP yet.",
          "**Email Setup:** Querying `dig domain.com MX` to verify email routing records are configured correctly."
        ]
      },
      chapter8: {
        title: "8. `curl` / `wget`",
        points: [
          "**Purpose:** Tools to transfer data to or from a server over HTTP, HTTPS, or FTP directly from the command line. `wget` is primarily for downloading files, while `curl` is an incredibly powerful tool for interacting with REST APIs.",
          "**Syntax:** `curl -I https://example.com` (Fetches only headers) | `wget https://example.com/file.zip` (Downloads file).",
          "**Sample Output (curl -I):**",
          "```bash\n$ curl -I https://api.github.com\nHTTP/2 200 \nserver: GitHub.com\ndate: Tue, 21 Jul 2026 11:00:00 GMT\ncontent-type: application/json; charset=utf-8\nstrict-transport-security: max-age=31536000\n```",
          "**Explanation of Output Fields:**",
          "**HTTP/2 200:** Confirms the protocol version and the `200 OK` success status code.",
          "**content-type:** Tells you what kind of data the API returns (JSON).",
          "**strict-transport-security:** A security header enforcing HTTPS.",
          "**Real-world Use Cases:**",
          "**API Testing:** Using `curl -X POST -d '{\"key\":\"value\"}'` to test a microservice endpoint without needing to write a frontend client or launch Postman.",
          "**Automation:** Using `wget` inside a bash script to automatically download the latest version of a software package during server provisioning."
        ]
      }
    },
    flashcards: [
      {
        front: "What is the primary purpose of the `traceroute` command?",
        back: "It maps the exact router-by-router path a packet takes to its destination by manipulating the IP Time To Live (TTL) field, helping to pinpoint exactly where a network connection is failing."
      },
      {
        front: "If a Node.js server crashes with 'EADDRINUSE' (Port 3000 is already in use), what command should you run to find the ghost process?",
        back: "`netstat -ano` (Windows) or `netstat -tuln` (Linux). It displays active connections, listening ports, and the associated Process ID (PID)."
      },
      {
        front: "What does the `arp` command do?",
        back: "It displays and modifies the local Address Resolution Protocol cache, which maps Layer 3 IP addresses to Layer 2 MAC addresses."
      },
      {
        front: "What is the difference between `curl` and `wget`?",
        back: "`wget` is primarily used for downloading files from the internet, while `curl` is a powerful tool designed for interacting with REST APIs (sending payloads, testing endpoints) directly from the command line."
      }
    ],
    quiz: [
      {
        question: "When running the `ping` command, what does the 'TTL=117' field indicate?",
        options: ["The network speed in megabits per second.", "The total time elapsed since the server started.", "The number of router hops the packet has remaining before it is discarded.", "The cryptographic key length of the ICMP request."],
        answer: 2
      },
      {
        question: "You want to verify if your newly updated DNS records have propagated globally. Which command is best suited for querying DNS servers for domain names and IP resolution?",
        options: ["nslookup / dig", "route print", "netstat", "ipconfig"],
        answer: 0
      }
    ]
  }
];
