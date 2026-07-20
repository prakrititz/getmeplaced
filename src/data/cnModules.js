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
  }
];
