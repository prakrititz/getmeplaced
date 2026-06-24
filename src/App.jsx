import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, CheckSquare, User, AppWindow, Settings, Cpu, ChevronRight, RotateCcw, Server, Activity, FolderOpen, Terminal, ArrowDownUp, Code, Power, HardDrive, Database, AlertTriangle, ShieldCheck, AlertOctagon, Skull } from 'lucide-react';

// --- DATA STRUCTURE ---
const courseModules = [
  {
    id: 'intro',
    title: '1. Introduction to OS',
    notes: {
      definitions: [
        { term: "Application Software", desc: "Performs specific tasks for the user." },
        { term: "System Software", desc: "Operates and controls the computer system and provides a platform to run application software." },
        { term: "Operating System (OS)", desc: "A piece of software that manages all resources (hardware and software), provides an environment to execute programs conveniently and efficiently, hides hardware complexity, and acts as a resource manager." }
      ],
      functions: [
        { title: "Hardware Access", desc: "Provides safe access to the computer hardware." },
        { title: "Interface", desc: "Acts as an interface between the user and the computer hardware." },
        { title: "Arbitration", desc: "Resource management (memory, device, file, security, process, etc.)." },
        { title: "Abstraction", desc: "Hides the underlying complexity of the hardware from the user and apps." },
        { title: "Protection", desc: "Facilitates execution of application programs by providing isolation and protection." }
      ],
      whyOs: [
        "Bulky and complex apps (hardware interaction code would have to be in the app's code base).",
        "Resource exploitation by a single application.",
        "No memory protection between different programs."
      ],
      ipc: {
        title: "Inter-Process Communication (IPC)",
        desc: "The mechanism that allows independent processes (which have independent memory space for protection) to communicate with each other or between user mode and kernel mode.",
        methods: "Done by: 1. Shared Memory and 2. Message Passing."
      }
    },
    flashcards: [
      { front: "What is System Software?", back: "Software that operates and controls the computer system and provides a platform to run application software." },
      { front: "What is the primary function of an Operating System?", back: "To manage resources (hardware/software), hide underlying complexity, and provide an environment to execute programs efficiently." },
      { front: "Define 'Abstraction' in the context of an OS.", back: "The function of the OS that hides the underlying complexity of the hardware from the user and applications." },
      { front: "Define 'Arbitration' in the context of an OS.", back: "Resource management by the OS (allocating memory, devices, files, CPU time, and security to different processes)." },
      { front: "What are the consequences of not having an OS?", back: "1. Bulky applications (must include hardware code)\n2. Resource exploitation by a single app\n3. No memory protection." }
    ],
    quiz: [
      { question: "What would likely happen if there was no Operating System?", options: ["Applications would run much faster.", "Hardware interaction code must be in the app's code base.", "Memory protection would be handled automatically by the CPU.", "System software would take over application tasks."], answer: 1 },
      { question: "The OS function of hiding the underlying complexity of the hardware is also known as:", options: ["Arbitration", "Virtualization", "Abstraction", "Isolation"], answer: 2 },
      { question: "Resource management (handling memory, devices, security) by the OS is referred to as:", options: ["Arbitration", "Compilation", "Abstraction", "Execution"], answer: 0 },
      { question: "According to the system architecture hierarchy, what sits directly between the Application Programs and the Computer Hardware?", options: ["The User", "System Software", "The Operating System", "Memory"], answer: 2 }
    ]
  },
  {
    id: 'types',
    title: '2. Types of OS',
    notes: {
      osGoals: [
        "Maximum CPU utilization",
        "Less process starvation",
        "Higher priority job execution"
      ],
      osTypes: [
        { name: "Single Process OS", examples: "MS DOS, 1981", desc: "Only 1 process executes at a time from the ready queue. The oldest type of OS." },
        { name: "Batch-Processing OS", examples: "ATLAS, late 1950s", desc: "Operator sorts jobs (punch cards) with similar needs into batches. Executed one by one. Cons: No priority, starvation risk, CPU idles during I/O." },
        { name: "Multiprogramming OS", examples: "THE, Dijkstra", desc: "Keeps multiple jobs in memory. Single CPU. Switches context when current process goes to wait state (e.g., I/O). Reduces CPU idle time." },
        { name: "Multitasking OS", examples: "CTSS, MIT", desc: "Logical extension of multiprogramming. Single CPU running multiple tasks simultaneously via context switching and time sharing. Increases responsiveness." },
        { name: "Multi-Processing OS", examples: "Windows NT", desc: "More than 1 CPU in a single computer. Increases reliability (fault tolerance), throughput, and lowers process starvation." },
        { name: "Distributed OS", examples: "LOCUS", desc: "Manages loosely connected, autonomous, interconnected computational nodes." },
        { name: "Real Time OS (RTOS)", examples: "ATCS, Robots", desc: "Computations within tight-time boundaries. Error-free, real-time execution." }
      ]
    },
    flashcards: [
      { front: "What are the 3 main goals of an OS?", back: "1. Maximum CPU utilization\n2. Less process starvation\n3. Higher priority job execution" },
      { front: "What is a Batch-Processing OS and its drawbacks?", back: "Operator groups jobs with similar needs into batches. \n\nDrawbacks:\n1. Cannot set priorities dynamically.\n2. Risk of starvation.\n3. CPU idles during I/O operations." },
      { front: "How does Multiprogramming improve CPU utilization?", back: "By keeping multiple jobs in memory. If the current job goes to a wait state (e.g., I/O), the single CPU context-switches to execute another job, reducing idle time." },
      { front: "Multiprogramming vs. Multitasking vs. Multi-processing", back: "• Multiprogramming: Multiple jobs in memory, switches on I/O wait (Single CPU).\n• Multitasking: Logical extension of multiprogramming, uses time-sharing to run tasks simultaneously (Single CPU).\n• Multi-processing: >1 CPU in a single system." }
    ],
    quiz: [
      { question: "Which type of Operating System groups jobs with similar needs and executes them together, but suffers from CPU idling during I/O operations?", options: ["Multitasking OS", "Batch-processing OS", "Real Time OS", "Distributed OS"], answer: 1 },
      { question: "What is the primary difference between Multiprogramming and Multi-processing?", options: ["Multiprogramming uses multiple CPUs; Multi-processing uses one CPU.", "Multi-processing uses multiple CPUs; Multiprogramming uses a single CPU to switch between tasks.", "They are exactly the same concept.", "Multiprogramming is for real-time systems; Multi-processing is for batch systems."], answer: 1 },
      { question: "An Air Traffic Control System requires strict execution within tight time boundaries. Which OS is best suited?", options: ["Real Time OS (RTOS)", "Batch-processing OS", "Single process OS", "Distributed OS"], answer: 0 }
    ]
  },
  {
    id: 'threads',
    title: '3. Multi-Tasking vs Threads',
    notes: {
      coreConcepts: [
        { term: "Program", desc: "An executable file stored on Disk containing compiled instructions. It's ready to be executed." },
        { term: "Process", desc: "A program under execution. Resides in the computer's primary memory (RAM)." },
        { term: "Thread", desc: "A 'light-weight process'. It is a single sequence stream and an independent path of execution within a process." },
        { term: "Thread Example", desc: "In a text editor, typing, spell-checking, formatting, and auto-saving are done concurrently by multiple threads within the single editor process." }
      ],
      multitaskingVsThreading: [
        { feature: "Definition", tasking: "Execution of more than one task simultaneously.", threading: "A process is divided into several different sub-tasks (threads), each with its own path of execution." },
        { feature: "Context Switching", tasking: "More than 1 process is context switched.", threading: "More than 1 thread is context switched." },
        { feature: "CPU Requirement", tasking: "Number of CPUs: 1.", threading: "Number of CPUs: >= 1 (Better to have more than 1 for true parallelism)." },
        { feature: "Isolation & Memory", tasking: "Isolation and memory protection exists. OS allocates separate memory and resources to each program.", threading: "NO isolation and memory protection. Threads share the same memory and resources allocated to the parent process." }
      ],
      contextSwitching: [
        { feature: "State Switch", thread: "OS saves current state of thread & switches to another thread of SAME process.", process: "OS saves current state of process & switches to another process by restoring its state." },
        { feature: "Memory Address Space", thread: "Doesn't include switching of memory address space (only Program Counter, Registers, & Stack are switched).", process: "INCLUDES switching of memory address space." },
        { feature: "Speed", thread: "Fast switching.", process: "Slow switching." },
        { feature: "CPU Cache", thread: "CPU's cache state is PRESERVED.", process: "CPU's cache state is FLUSHED." }
      ],
      scheduling: "Threads are scheduled for execution based on their priority. All threads are assigned processor time slices by the operating system."
    },
    flashcards: [
      { front: "What is the difference between a Program and a Process?", back: "A Program is a static, compiled executable file stored on Disk. A Process is a program in execution, residing in RAM (Primary Memory)." },
      { front: "What is a Thread?", back: "A light-weight process. It's a single, independent path of execution within a process, used to achieve parallelism." },
      { front: "Do threads have memory isolation?", back: "No. Threads belonging to the same process share the same memory and resources. Processes, however, have strict memory isolation." },
      { front: "Why is Thread Context Switching faster than Process Context Switching?", back: "Because Thread Context Switching does not require switching the memory address space and it PRESERVES the CPU's cache state. Process switching is slower and flushes the cache." },
      { front: "During a Thread Context Switch, what actually gets switched?", back: "Only the Program Counter, Registers, and Stack are switched. The memory address space remains the same." }
    ],
    quiz: [
      { question: "Where does a 'Process' reside?", options: ["Disk", "RAM (Primary Memory)", "CPU Cache", "ROM"], answer: 1 },
      { question: "Which of the following is true about Multi-Threading?", options: ["Every thread gets its own separate memory address space.", "Threads provide strict isolation and memory protection.", "Threads within the same process share memory and resources.", "Thread context switching flushes the CPU cache."], answer: 2 },
      { question: "During a Process Context Switch, what happens to the CPU's cache state?", options: ["It is preserved.", "It is flushed.", "It is transferred to the new process.", "It is compressed."], answer: 1 },
      { question: "In a text editor, typing and spell-checking happening at the same time is an example of:", options: ["Multiple separate processes", "Batch-processing", "Multi-threading within a single process", "A Distributed OS"], answer: 2 }
    ]
  },
  {
    id: 'components',
    title: '4. Components of OS',
    notes: {
      coreComponents: [
        { term: "Kernel", desc: "The heart/core component of the OS that interacts directly with hardware. It performs the most crucial tasks and is the very first part of the OS to load on start-up." },
        { term: "User Space", desc: "Where application software runs. Apps here do not have privileged access to the underlying hardware and must interact with the kernel (e.g., via GUI or CLI)." },
        { term: "Shell", desc: "Also known as a command interpreter. It receives commands from users and gets them executed." }
      ],
      kernelFunctions: [
        { title: "Process Management", desc: "Scheduling processes/threads on CPUs, creating/deleting processes, suspending/resuming, and providing mechanisms for process synchronization and communication." },
        { title: "Memory Management", desc: "Allocating and deallocating memory space as needed. Keeping track of which part of memory is currently being used and by which process." },
        { title: "File Management", desc: "Creating/deleting files and directories, mapping files into secondary storage, and providing backup support onto stable storage media." },
        { title: "I/O Management", desc: "Managing and controlling I/O operations and devices through Spooling, Buffering, and Caching." }
      ],
      ioTechniques: [
        { term: "Spooling", desc: "Data copy between two devices with differing speeds for TWO jobs. Example: Print spooling and mail spooling." },
        { term: "Buffering", desc: "Data copy within ONE job to handle speed mismatches. Example: YouTube video buffering." },
        { term: "Caching", desc: "Storing frequently used data for quick access. Example: Memory caching, Web caching." }
      ],
      kernelTypes: [
        { type: "Monolithic Kernel", examples: "Linux, Unix, MS-DOS", pros: "High performance as communication is fast (less user/kernel mode overhead).", cons: "Bulky size, high memory required, less reliable (if one module crashes, the whole kernel goes down).", desc: "All functions are implemented within the kernel itself." },
        { type: "Micro Kernel", examples: "L4 Linux, Symbian OS, MINIX", pros: "Smaller in size, more reliable, and more stable.", cons: "Slower performance due to overhead switching between user mode and kernel mode.", desc: "Only major functions (Memory & Process mgmt) are in the kernel. File and I/O mgmt are kept in User-space." },
        { type: "Hybrid Kernel", examples: "MacOS, Windows NT/7/10", pros: "Combined approach: Speed and design of monolithic + modularity and stability of micro.", cons: "Still has some IPC overhead, though lesser than pure microkernels.", desc: "Takes advantages of both worlds. For example, File management might be in User space while the rest is in Kernel space." },
        { type: "Nano/Exo Kernels", examples: "Research/Specialized", pros: "Extremely minimal.", cons: "Complex application development.", desc: "Bare minimum hardware abstraction." }
      ],
      ipc: {
        title: "Inter-Process Communication (IPC)",
        desc: "The mechanism that allows independent processes (which have independent memory space for protection) to communicate with each other or between user mode and kernel mode.",
        methods: "Done by: 1. Shared Memory and 2. Message Passing."
      }
    },
    flashcards: [
      { front: "What is the difference between the Kernel and the Shell?", back: "The Kernel is the core component that interacts directly with hardware. The Shell is the command interpreter that receives user commands and passes them to the OS for execution." },
      { front: "Spooling vs. Buffering: What is the difference?", back: "Spooling handles data transfer between two devices with differing speeds for TWO distinct jobs (e.g., Print spooling). Buffering handles data within ONE job (e.g., Video buffering)." },
      { front: "Why is a Monolithic Kernel considered less reliable than a Micro Kernel?", back: "In a Monolithic kernel, all functions are in the kernel space. If a single module (like a device driver) crashes, it can crash the entire kernel. In a Micro kernel, non-essential services run in user space, isolating failures." },
      { front: "What are the two primary methods of Inter-Process Communication (IPC)?", back: "1. Shared Memory\n2. Message Passing" },
      { front: "Which kernel type combines the speed of Monolithic and the stability of Micro?", back: "Hybrid Kernel. Examples include MacOS and Windows NT/7/10." }
    ],
    quiz: [
      { question: "Which component of the OS is the very first part to load on start-up and interacts directly with the hardware?", options: ["The Shell", "User Space", "The Kernel", "Application Software"], answer: 2 },
      { question: "Print spooling is an example of which I/O management technique?", options: ["Buffering", "Caching", "Spooling", "Message Passing"], answer: 2 },
      { question: "Which of the following is a major disadvantage of a Micro Kernel?", options: ["It is very bulky in size.", "A single module crash takes down the whole system.", "Performance is slower due to overhead switching between user and kernel modes.", "It cannot handle Memory Management."], answer: 2 },
      { question: "How do two independent processes with memory protection communicate with each other?", options: ["By disabling memory protection.", "Via Inter-Process Communication (Shared memory or Message passing).", "By merging into a single process.", "They cannot communicate under any circumstances."], answer: 1 }
    ]
  },
  {
    id: 'syscalls',
    title: '5. System Calls',
    notes: {
      overview: {
        definition: "A mechanism using which a user program can request a service from the kernel for which it does not have permission to perform (like accessing I/O devices or communicating with other programs).",
        keyFact: "System Calls are the ONLY way through which a process can go into kernel mode from user mode.",
        implementation: "System calls are typically implemented in C.",
        wrapperExample: "Commands like `mkdir` are often just wrappers (e.g., in glibc) that indirectly execute actual system calls. `mkdir` interacts with the kernel to ask the file management module to create a new directory.",
        transition: "Transitions from User Space (US) to Kernel Space (KS) are done by software interrupts."
      },
      typesOfSyscalls: [
        { category: "Process Control", items: "end, abort, load, execute, create/terminate process, get/set process attributes, wait for time, wait/signal event, allocate/free memory." },
        { category: "File Management", items: "create/delete file, open/close, read/write/reposition, get/set file attributes." },
        { category: "Device Management", items: "request/release device, read/write/reposition, get/set device attributes, logically attach/detach devices." },
        { category: "Information Maintenance", items: "get/set time or date, get/set system data, get/set process/file/device attributes." },
        { category: "Communication Management", items: "create/delete communication connection, send/receive messages, transfer status information, attach/detach remote devices." }
      ],
      comparisonTable: [
        { category: "Process Control", win: "CreateProcess(), ExitProcess(), WaitForSingleObject()", unix: "fork(), exit(), wait()" },
        { category: "File Management", win: "CreateFile(), ReadFile(), WriteFile(), CloseHandle(), SetFileSecurity(), InitializeSecurityDescriptor(), SetSecurityDescriptorGroup()", unix: "open(), read(), write(), close(), chmod(), umask(), chown()" },
        { category: "Device Management", win: "SetConsoleMode(), ReadConsole(), WriteConsole()", unix: "ioctl(), read(), write()" },
        { category: "Information Management", win: "GetCurrentProcessID(), SetTimer(), Sleep()", unix: "getpid(), alarm(), sleep()" },
        { category: "Communication", win: "CreatePipe(), CreateFileMapping(), MapViewOfFile()", unix: "pipe(), shmget(), mmap()" }
      ]
    },
    flashcards: [
      { front: "What is the only way a process can enter Kernel Mode from User Mode?", back: "Through System Calls." },
      { front: "How does the actual transition from User Space to Kernel Space occur?", back: "By using Software Interrupts." },
      { front: "Are commands like 'mkdir' actual system calls?", back: "No, they are typically wrappers (usually found in libraries like glibc) that indirectly interact with the kernel using underlying actual system calls." },
      { front: "Name the 5 main types of System Calls.", back: "1. Process Control\n2. File Management\n3. Device Management\n4. Information Maintenance\n5. Communication Management" },
      { front: "What are the Unix equivalents of Windows' CreateProcess() and CreateFile()?", back: "fork() and open() respectively." }
    ],
    quiz: [
      { question: "Which mechanism is used to transition the CPU from User Mode to Kernel Mode?", options: ["Hardware polling", "Software Interrupts", "Message Passing", "Spooling"], answer: 1 },
      { question: "Which of the following is a Unix system call for Process Control?", options: ["open()", "read()", "fork()", "ioctl()"], answer: 2 },
      { question: "In which programming language are system calls primarily implemented?", options: ["Java", "Python", "Assembly only", "C"], answer: 3 },
      { question: "Operations like 'send/receive messages' and 'attach remote devices' fall under which category of system calls?", options: ["Device Management", "Communication Management", "Process Control", "Information Maintenance"], answer: 1 }
    ]
  },
  {
    id: 'boot',
    title: '6. The Boot Process',
    notes: {
      steps: [
        { title: "Power On", desc: "The user turns on the PC, sending power to the motherboard and components." },
        { title: "CPU & BIOS/UEFI", desc: "CPU initializes itself and looks for a firmware program (BIOS) stored in a ROM chip. In modern PCs, the CPU loads UEFI (Unified Extensible Firmware Interface) instead of traditional BIOS." },
        { title: "POST (Power-On Self-Test)", desc: "The BIOS/UEFI runs the POST to test and initialize system hardware (e.g., checking for RAM). If an inappropriate setting or error is found, the boot process is stopped." },
        { title: "MBR & Bootloader Handoff", desc: "BIOS looks at the MBR (Master Boot Record), a special boot sector at the beginning of a disk. The MBR contains the 'bootloader' code. The BIOS hands off responsibility to it." },
        { title: "OS Loading", desc: "The bootloader executes. It is a small program tasked with booting the rest of the OS (boots Kernel first, then User Space)." }
      ],
      definitions: [
        { term: "BIOS (Basic Input-Output System)", desc: "A ROM firmware chip on the motherboard that allows access and setup of the computer system at the most basic level." },
        { term: "UEFI", desc: "The modern replacement for BIOS. It can do much more than initialize hardware, acting almost like a tiny OS (e.g., powers Intel's Active Management Technology for remote management)." },
        { term: "MBR (Master Boot Record)", desc: "A special boot sector at the very beginning of a storage disk containing the code to load the OS." }
      ],
      bootloaders: [
        { os: "Windows", name: "Windows Boot Manager (Bootmgr.exe)" },
        { os: "Linux", name: "GRUB" },
        { os: "Mac", name: "boot.efi" }
      ]
    },
    flashcards: [
      { front: "What is POST?", back: "Power-On Self-Test. It is run by the BIOS/UEFI to test and initialize system hardware. If hardware like RAM is missing, it throws an error and stops the boot." },
      { front: "Where is the BIOS stored?", back: "In a ROM (Read-Only Memory) chip on the motherboard." },
      { front: "What does the MBR contain?", back: "The Master Boot Record (MBR) contains the code that loads the rest of the operating system, known as the 'bootloader'." },
      { front: "What has largely replaced the traditional BIOS in modern PCs?", back: "UEFI (Unified Extensible Firmware Interface)." },
      { front: "Name the standard bootloaders for Windows and Linux.", back: "Windows: Bootmgr.exe\nLinux: GRUB" }
    ],
    quiz: [
      { question: "What is the first software that runs when a computer is turned on?", options: ["The Operating System", "The Bootloader", "BIOS / UEFI", "User Space Applications"], answer: 2 },
      { question: "What process checks if essential hardware like RAM is present and working during startup?", options: ["MBR", "POST", "GRUB", "IPC"], answer: 1 },
      { question: "Where does the BIOS look to find the bootloader?", options: ["RAM", "CPU Cache", "MBR (Master Boot Record)", "ROM"], answer: 2 },
      { question: "Which of the following is the standard bootloader for most Linux systems?", options: ["Bootmgr.exe", "boot.efi", "GRUB", "NTLDR"], answer: 2 }
    ]
  },
  {
    id: 'arch',
    title: '7. 32-Bit vs. 64-Bit',
    notes: {
      registers: [
        { title: "32-bit Architecture", bytes: "4 bytes", desc: "The CPU has 32-bit registers, processing 32 bits (4 bytes) of data in a single instruction cycle." },
        { title: "64-bit Architecture", bytes: "8 bytes", desc: "The CPU has 64-bit registers, processing 64 bits (8 bytes) of data in a single instruction cycle." }
      ],
      memory: [
        { term: "32-bit OS Limit", value: "4 GB", desc: "Can point to 2^32 unique memory addresses, which equals exactly 4 GB of physical memory. Extra installed RAM is ignored." },
        { term: "64-bit OS Limit", value: "16 Exabytes", desc: "Can point to 2^64 unique memory addresses (17,179,869,184 GB). Effectively unlimited for current hardware." }
      ],
      advantages: [
        { title: "Uncapped Resource Usage", desc: "Allows usage of high capacity RAM (16GB, 32GB+), eliminating bottlenecks and enhancing multitasking." },
        { title: "Backward Compatibility", desc: "64-bit CPUs can run both 32-bit and 64-bit operating systems. 32-bit CPUs can ONLY run 32-bit operating systems." },
        { title: "Better Graphics & Math Performance", desc: "Doubled data path size allows massive parallel calculations, drastically improving graphics, games, and 3D rendering speeds." }
      ]
    },
    flashcards: [
      { front: "What is the primary difference in data processing between 32-bit and 64-bit CPUs?", back: "A 32-bit CPU processes 32 bits (4 bytes) of data per cycle, while a 64-bit CPU processes 64 bits (8 bytes) per cycle." },
      { front: "Why can't a 32-bit Operating System support 8GB of RAM?", back: "A 32-bit address bus can only generate 2^32 unique addresses, which limits addressable physical memory to exactly 4 GB. Any RAM beyond 4GB cannot be referenced." },
      { front: "What is the maximum addressable memory of a 64-bit Operating System?", back: "2^64 bytes, which is approximately 17.2 Billion GB (or 16 Exabytes)." },
      { front: "Can a 32-bit CPU run a 64-bit Operating System?", back: "No. A 32-bit CPU can only run a 32-bit OS. However, a 64-bit CPU is backward compatible and can run both 32-bit and 64-bit OS/software." },
      { front: "Why are 64-bit systems significantly better for graphics-intensive apps?", back: "Graphics rendering involves massive mathematical calculations. 64-bit CPUs can process twice as much data (8 bytes) per instruction cycle compared to 32-bit CPUs (4 bytes)." }
    ],
    quiz: [
      { question: "What is the maximum physical memory limit that a 32-bit operating system can address?", options: ["2 GB", "4 GB", "8 GB", "16 GB"], answer: 1 },
      { question: "Which of the following statement is TRUE regarding CPU compatibility?", options: ["A 32-bit CPU can run a 64-bit Operating System.", "A 64-bit CPU can run both 32-bit and 64-bit Operating Systems.", "A 64-bit CPU can only run 64-bit software.", "Operating system architecture has no dependency on CPU architecture."], answer: 1 },
      { question: "How many bytes of data can a 64-bit register process in a single instruction cycle?", options: ["4 bytes", "8 bytes", "16 bytes", "64 bytes"], answer: 1 },
      { question: "Why do modern video editing and 3D games run smoother on a 64-bit operating system?", options: ["It reduces CPU cycle speeds to protect the hardware.", "It uses less power and registers.", "It can process 8 bytes of graphics calculations per cycle instead of 4 bytes.", "It disables system calls to run faster."], answer: 2 }
    ]
  },
  {
    id: 'storage',
    title: '8. Storage Devices Basics',
    notes: {
      hierarchy: [
        { level: "Registers", type: "Primary (Internal)", speed: "Fastest (Sub-nanosecond)", size: "Bytes", desc: "Located inside the CPU. Holds instructions/data being processed at the current microsecond." },
        { level: "Cache", type: "Primary (SRAM)", speed: "Ultra-fast (Nanoseconds)", size: "Megabytes (MB)", desc: "Sits next to the CPU. Acts as a waiting room for frequently used instructions/data." },
        { level: "Main Memory (RAM)", type: "Primary (DRAM)", speed: "Fast (10-50ns)", size: "Gigabytes (GB)", desc: "Main workspace. Loaded with active applications/files from secondary storage." },
        { level: "Secondary Memory", type: "Electronic/Magnetic/Optical/Tape", speed: "Slow (Milliseconds)", size: "Terabytes (TB)", desc: "Permanent long-term storage (SSDs, HDDs, CDs, Tapes) that retains data without power." }
      ],
      comparisons: [
        { factor: "Cost", primary: "Extremely expensive per GB. Registers are the costliest due to specialized on-chip semiconductor fabrication.", secondary: "Very inexpensive per GB. High capacity drives are highly affordable." },
        { factor: "Speed", primary: "Astronomically fast (cycles in nanoseconds). Access order: Registers > Cache > RAM.", secondary: "Slower (milliseconds/microseconds) due to interface speeds or mechanical parts." },
        { factor: "Size", primary: "Highly limited capacity (Bytes for registers, Megabytes for Cache, Gigabytes for RAM).", secondary: "Massive storage capacities (Terabytes to Petabytes)." },
        { factor: "Volatility", primary: "Volatile. Requires constant electrical current; data is wiped instantly on power loss.", secondary: "Non-Volatile. Retains stored data permanently even when powered off completely." }
      ]
    },
    flashcards: [
      { front: "Rank the memory hierarchy types from fastest access speed to slowest.", back: "Registers ➔ Cache ➔ Main Memory (RAM) ➔ Secondary Storage (SSDs/HDDs)." },
      { front: "What is the difference between Volatile and Non-Volatile memory?", back: "Volatile memory (Registers, Cache, RAM) requires electrical power to retain data and is wiped on power-off. Non-Volatile memory (SSD, HDD, Tapes) retains data permanently without power." },
      { front: "Why are CPU Registers the most expensive storage units in a computer?", back: "They are built directly into the silicon of the CPU processor using highly specialized, ultra-fast semiconductor technology." },
      { front: "What is the primary function of CPU Cache?", back: "To act as a high-speed waiting room for frequently used instructions/data, preventing the CPU from waiting on slower RAM fetches." },
      { front: "Which category of storage device do SSDs, HDDs, and Magnetic Tapes fall under?", back: "Secondary Memory (Long-term, non-volatile storage)." }
    ],
    quiz: [
      { question: "Which of the following is the fastest memory type in the hierarchy?", options: ["Main Memory (RAM)", "Cache", "Secondary Storage", "Registers"], answer: 3 },
      { question: "What happens to the data in volatile memory when the computer is powered off?", options: ["It is permanently saved to disk.", "It remains intact until the next boot.", "It is instantly and completely wiped.", "It is compressed to save space."], answer: 2 },
      { question: "Which storage type is the cheapest per gigabyte but has the slowest access speed?", options: ["Cache", "RAM", "Secondary Storage", "Registers"], answer: 2 },
      { question: "Why does a computer load files from the HDD/SSD into RAM when opening an application?", options: ["Because RAM is non-volatile.", "To allow the CPU to access and process the data much faster.", "Because Secondary Storage cannot be read by the OS.", "To clear the CPU cache automatically."], answer: 1 }
    ]
  },
  {
    id: 'process',
    title: '9. Intro to Process',
    notes: {
      definitions: [
        { term: "Program", desc: "A passive, static file containing compiled code sitting on a disk, ready to execute." },
        { term: "Process", desc: "An active, dynamic entity representing a program under execution. Resides in RAM." }
      ],
      steps: [
        { title: "Load", desc: "OS loads the compiled program code and static data from the disk into the RAM." },
        { title: "Stack Allocation", desc: "OS allocates memory for the runtime stack (holds local variables, function parameters, and return addresses)." },
        { title: "Heap Allocation", desc: "OS allocates memory for the heap (used for dynamic runtime allocations like malloc or new)." },
        { title: "I/O Tasks", desc: "OS sets up input/output streams (stdin, stdout, stderr) and opens files/devices." },
        { title: "Handoff", desc: "OS hands over control of the CPU to the program's main() function to start execution." }
      ],
      layout: [
        { section: "Stack", desc: "Local variables, function arguments, & return values. Grows downward towards heap." },
        { section: "Heap", desc: "Dynamically allocated variables at runtime. Grows upward towards stack." },
        { section: "Data", desc: "Global & static variables defined before execution." },
        { section: "Text", desc: "The compiled program instructions loaded from the disk." }
      ],
      pcb: [
        { attr: "Process ID (PID)", desc: "Unique identifier for each process." },
        { attr: "Program Counter (PC)", desc: "Pointer to the next instruction address to execute." },
        { attr: "Process State", desc: "Current status (Ready, Running, Waiting, etc.)." },
        { attr: "Priority", desc: "Determines CPU time allocation order." },
        { attr: "Registers", desc: "Saves register states when swapped out to preserve execution state." },
        { attr: "List of open files", desc: "Tracks directories and files accessed." },
        { attr: "List of open devices", desc: "Tracks hardware resources allocated." }
      ]
    },
    flashcards: [
      { front: "What is the core difference between a Program and a Process?", back: "A Program is passive and static (compiled code on disk). A Process is active and dynamic (a program currently in execution loaded in RAM)." },
      { front: "State the 5 steps the OS goes through to create a process.", back: "1. Load code/data to RAM\n2. Allocate runtime Stack\n3. Allocate Heap memory\n4. Setup I/O tasks\n5. Handoff CPU control to main()" },
      { front: "Draw or describe the memory layout of a process from top to bottom.", back: "Top\n- Stack (grows down)\n- [Free Memory Space]\n- Heap (grows up)\n- Data (Global/Static variables)\n- Text (Compiled instructions)\nBottom" },
      { front: "What is the Process Control Block (PCB)?", back: "A data structure representing the 'ID card' or 'profile' of a process containing attributes like PID, Program Counter, Priority, States, and Register values." },
      { front: "What is the purpose of Registers in a PCB during context switching?", back: "When a process's time slice expires, its CPU register values are saved to its PCB (swapped out). When scheduled again, they are reloaded from the PCB to resume execution seamlessly." }
    ],
    quiz: [
      { question: "Which of the following describes a passive entity sitting on a disk?", options: ["Process", "Thread", "Program", "PCB"], answer: 2 },
      { question: "During process creation, which layout section allocates memory for local variables and function return parameters?", options: ["Text", "Data", "Heap", "Stack"], answer: 3 },
      { question: "What tracks the address of the next instruction a process will execute?", options: ["Process ID (PID)", "Program Counter (PC)", "Process State", "Priority Register"], answer: 1 },
      { question: "What happens to process registers when a process is swapped out?", options: ["They are cleared.", "They are copied and saved to the process's PCB.", "They remain on the CPU core.", "They are stored on the hard drive's MBR."], answer: 1 }
    ]
  },
  {
    id: 'states',
    title: '10. Process States & Queues',
    notes: {
      statesList: [
        { name: "New", desc: "The process is being created. OS has grabbed the program but hasn't fully loaded it into the RAM yet." },
        { name: "Ready", desc: "The process is fully loaded into Main Memory (RAM) and is waiting for CPU allocation." },
        { name: "Running", desc: "The CPU is actively executing the process's compiled instructions." },
        { name: "Waiting / Blocked", desc: "The process is paused waiting for an external event or I/O operation (e.g., keyboard input, file read)." },
        { name: "Terminated", desc: "The process finishes execution or crashes. OS deletes its PCB entry and reclaims memory." }
      ],
      queues: [
        { name: "Job Queue", state: "New", memory: "Secondary Memory (Disk)", scheduler: "Job Scheduler / Long-Term Scheduler (LTS)", desc: "Holds all processes that are newly created and awaiting memory allocation." },
        { name: "Ready Queue", state: "Ready", memory: "Main Memory (RAM)", scheduler: "CPU Scheduler / Short-Term Scheduler (STS)", desc: "Holds all processes loaded in RAM that are ready to run and waiting for CPU time." },
        { name: "Waiting Queue", state: "Waiting", memory: "Main Memory / Device Controller", scheduler: "N/A", desc: "Holds processes that are blocked waiting for specific I/O events or devices." }
      ],
      schedulerDetails: [
        { term: "Long-Term Scheduler (LTS)", role: "Decides which jobs are loaded from disk into RAM (Job Queue ➔ Ready Queue). Controls the degree of multi-programming." },
        { term: "Short-Term Scheduler (STS)", role: "Decides which process in RAM gets CPU execution next (Ready Queue ➔ CPU). Runs frequently." },
        { term: "Degree of Multi-programming", role: "The number of processes currently sitting in Main Memory. Directly controlled by the LTS." },
        { term: "Dispatcher", role: "The actual OS module that executes the context switch decided by the STS. Restores registers and hands CPU control to the selected process." }
      ]
    },
    flashcards: [
      { front: "What are the 5 states of a process?", back: "New, Ready, Running (or Run), Waiting (or Blocked), and Terminated." },
      { front: "After waiting for an I/O operation to complete, what state does a process transition to?", back: "It goes to the Ready state (NOT Running). It must wait in the Ready queue for the CPU scheduler to pick it again." },
      { front: "What is the 'degree of multi-programming' and which scheduler controls it?", back: "It is the number of processes currently loaded in Main Memory. It is controlled by the Long-Term Scheduler (LTS)." },
      { front: "Short-Term Scheduler (STS) vs. Dispatcher: What is the difference?", back: "The STS makes the decision (decides WHICH process gets the CPU next). The Dispatcher executes the action (performs the context switch, restores PCB registers, and hands CPU control)." },
      { front: "What causes a process to transition from Running to Ready?", back: "An Interrupt, such as when a process exceeds its allocated time slice (Time Sharing timer expires)." }
    ],
    quiz: [
      { question: "Which state describes a process that is in Main Memory (RAM) waiting to be assigned to a processor?", options: ["New", "Ready", "Running", "Waiting"], answer: 1 },
      { question: "Who controls the degree of multi-programming in an Operating System?", options: ["Short-Term Scheduler (STS)", "Dispatcher", "Long-Term Scheduler (LTS)", "Device Controller"], answer: 2 },
      { question: "Which queue stores processes that reside in secondary memory (disk)?", options: ["Ready Queue", "Waiting Queue", "Job Queue", "Device Queue"], answer: 2 },
      { question: "The module that physically gives control of the CPU to a process selected by the STS is called the:", options: ["Long-Term Scheduler", "Dispatcher", "Interrupt Handler", "Context Swapper"], answer: 1 }
    ]
  },
  {
    id: 'swap',
    title: '11. Swapping & Context-Switching',
    notes: {
      swapping: {
        definition: "Swapping is a mechanism where a process can be swapped temporarily out of main memory (RAM) to secondary storage (disk) to free up memory for other processes, and later swapped back in to resume execution.",
        scheduler: "Medium-Term Scheduler (MTS)",
        purpose: "Improve process mix or resolve overcommitted memory requirements, reducing the degree of multi-programming."
      },
      switching: {
        definition: "Context-switching is the process of saving the execution state (context) of an active process in its PCB and restoring the state of another process to resume it on the CPU.",
        overhead: "It is pure overhead because the CPU performs no useful work while the OS is executing the context switch. Speed varies by register count, memory speed, etc."
      },
      orphan: {
        definition: "A process whose parent process has been terminated (either finished or crashed) but the child process is still running.",
        remedy: "Adopted by the init process (the first process of the OS, PID 1)."
      },
      zombie: {
        definition: "A child process whose execution is complete but still has an entry in the Process Table because the parent has not yet read its exit status.",
        remedy: "The parent must read the child's exit status using the wait() system call. Once done, the zombie is eliminated from the table, which is known as reaping the zombie."
      }
    },
    flashcards: [
      { front: "What is swapping and which scheduler is responsible for it?", back: "Swapping is moving a partially executed process out of RAM to secondary storage (disk) and back. It is managed by the Medium-Term Scheduler (MTS) to free up memory." },
      { front: "Why is context-switching considered 'pure overhead'?", back: "Because the CPU does not execute any useful application instructions while context switching—it is purely administrative OS workload." },
      { front: "Define an Orphan Process and describe how the OS handles it.", back: "An Orphan process is a child process whose parent has terminated while the child is still running. The OS handles it by having the 'init' process (PID 1) adopt it." },
      { front: "What is a Zombie (Defunct) Process and why does it occur?", back: "A child process that has finished execution but still takes up an entry in the process table. This happens because the parent process has not yet read its exit status via wait()." },
      { front: "What is 'reaping' in the context of zombie processes?", back: "Reaping is the process of removing a completed child process's entry from the process table once its parent reads its exit status using the wait() system call." }
    ],
    quiz: [
      { question: "Which scheduler is responsible for swapping processes in and out of Main Memory?", options: ["Long-Term Scheduler (LTS)", "Short-Term Scheduler (STS)", "Medium-Term Scheduler (MTS)", "Device Scheduler"], answer: 2 },
      { question: "Context-switching is referred to as 'pure overhead' because:", options: ["It takes up a lot of disk space.", "The CPU does no useful application work during the switch.", "It destroys the PCB registers.", "It requires a complete system reboot."], answer: 1 },
      { question: "Who adopts an Orphan process when its parent process terminates?", options: ["The init process (PID 1)", "The dispatcher", "The Medium-Term Scheduler", "Another sibling process"], answer: 0 },
      { question: "A finished child process remains in the Process Table as a Zombie until the parent process:", options: ["Kills the child process.", "Performs a context switch.", "Reboots the computer.", "Calls the wait() system call to read its exit status."], answer: 3 }
    ]
  },
  {
    id: 'scheduling',
    title: '12. Process Scheduling & FCFS',
    notes: {
      scheduling: [
        { term: "Process Scheduling", desc: "Basis of Multi-programming OS. By switching the CPU among processes, the OS can make the computer more productive. Many processes are kept in memory at a time, when a process must wait or time quantum expires, the OS takes the CPU away from that process & gives the CPU to another process & this pattern continues." },
        { term: "CPU Scheduler", desc: "Whenever the CPU become ideal, OS must select one process from the ready queue to be executed. Done by STS." }
      ],
      types: [
        { type: "Non-Preemptive scheduling", desc: "Once CPU has been allocated to a process, the process keeps the CPU until it releases CPU either by terminating or by switching to wait-state. Starvation, as a process with long burst time may starve less burst time process. Low CPU utilization." },
        { type: "Preemptive scheduling", desc: "CPU is taken away from a process after time quantum expires along with terminating or switching to wait-state. Less Starvation. High CPU utilization." }
      ],
      goals: [
        "Maximum CPU utilization",
        "Minimum Turnaround time (TAT).",
        "Min. Wait-time",
        "Min. response time.",
        "Max. throughput of system."
      ],
      metrics: [
        { term: "Throughput", desc: "No. of processes completed per unit time." },
        { term: "Arrival time (AT)", desc: "Time when process is arrived at the ready queue." },
        { term: "Burst time (BT)", desc: "The time required by the process for its execution." },
        { term: "Turnaround time (TAT)", desc: "Time taken from first time process enters ready state till it terminates. (CT - AT)" },
        { term: "Wait time (WT)", desc: "Time process spends waiting for CPU. (WT = TAT - BT)" },
        { term: "Response time", desc: "Time duration between process getting into ready queue and process getting CPU for the first time." },
        { term: "Completion Time (CT)", desc: "Time taken till process gets terminated." }
      ],
      fcfs: {
        title: "FCFS (First come-first serve)",
        desc: "Whichever process comes first in the ready queue will be given CPU first. In this, if one process has longer BT. It will have major effect on average WT of diff processes, called Convoy effect.",
        convoyEffect: "Convoy Effect is a situation where many processes, who need to use a resource for a short time, are blocked by one process holding that resource for a long time. This cause poor resource management."
      }
    },
    flashcards: [
      { front: "What is Process Scheduling?", back: "The basis of multi-programming OS. Switching the CPU among processes to make the computer more productive." },
      { front: "Who performs CPU Scheduling?", back: "The Short-Term Scheduler (STS). It selects a process from the ready queue when the CPU is idle." },
      { front: "What is the difference between Non-Preemptive and Preemptive scheduling?", back: "Non-Preemptive: Process keeps CPU until termination or wait-state. Preemptive: CPU can be taken away after a time quantum expires." },
      { front: "What are the 5 main goals of CPU scheduling?", back: "1. Maximum CPU utilization\n2. Minimum Turnaround Time (TAT)\n3. Minimum Wait Time (WT)\n4. Minimum Response Time\n5. Maximum Throughput" },
      { front: "Define Turnaround Time (TAT) and its formula.", back: "Time taken from when a process enters the ready state until it terminates. Formula: TAT = CT - AT" },
      { front: "Define Wait Time (WT) and its formula.", back: "Time a process spends waiting for the CPU. Formula: WT = TAT - BT" },
      { front: "What is the Convoy Effect in FCFS?", back: "A situation where many processes with short burst times are blocked by one process with a very long burst time holding the CPU, leading to poor resource management." }
    ],
    quiz: [
      { question: "Which scheduler is responsible for selecting a process from the ready queue when the CPU becomes idle?", options: ["Long-Term Scheduler", "Medium-Term Scheduler", "Short-Term Scheduler (STS)", "Dispatcher"], answer: 2 },
      { question: "In which type of scheduling does a process keep the CPU until it explicitly releases it by terminating or switching to a wait state?", options: ["Preemptive scheduling", "Non-Preemptive scheduling", "Time-sharing", "Round Robin"], answer: 1 },
      { question: "What is the formula for calculating Wait Time (WT)?", options: ["WT = CT - AT", "WT = TAT + BT", "WT = TAT - BT", "WT = CT - BT"], answer: 2 },
      { question: "What is the term for 'Number of processes completed per unit time'?", options: ["Turnaround Time", "Response Time", "Throughput", "Burst Time"], answer: 2 },
      { question: "What is the Convoy Effect?", options: ["When multiple processes run simultaneously on different CPUs.", "When many short processes are blocked by one long process holding the CPU.", "When the OS fails to schedule any process.", "When process priorities are constantly elevated to prevent starvation."], answer: 1 }
    ]
  },
  {
    id: 'sjf_priority_rr',
    title: '13. CPU Scheduling (SJF, Priority, RR)',
    notes: {
      sjf: {
        nonPreemptive: [
          "Process with least Burst Time (BT) will be dispatched to CPU first.",
          "Must do estimation for BT for each process in ready queue beforehand. Correct estimation of BT is an impossible task (ideally).",
          "Run lowest time process for all time then, choose job having lowest BT at that instance.",
          "This will suffer from convoy effect as if the very first process which came to Ready state is having a large BT.",
          "Process starvation might happen.",
          "Criteria for SJF algos: Arrival Time (AT) + Burst Time (BT)."
        ],
        preemptive: [
          "Less starvation.",
          "No convoy effect.",
          "Gives average WT less for a given set of processes as scheduling short job before a long one decreases the WT of short job more than it increases the WT of the long process."
        ]
      },
      priority: {
        nonPreemptive: [
          "Priority is assigned to a process when it is created.",
          "SJF is a special case of general priority scheduling with priority inversely proportional to BT."
        ],
        preemptive: [
          "Current RUN state job will be preempted if next job has higher priority.",
          "May cause indefinite waiting (Starvation) for lower priority jobs. (Possibility is they won't get executed ever). (True for both preemptive and non-preemptive version)."
        ],
        solution: {
          title: "Ageing is the solution",
          desc: "Gradually increase priority of process that wait so long. E.g., increase priority by 1 every 15 minutes."
        }
      },
      rr: {
        features: [
          "Most popular.",
          "Like FCFS but preemptive.",
          "Designed for time sharing systems.",
          "Criteria: AT + time quantum (TQ), Doesn't depend on BT.",
          "No process is going to wait forever, hence very low starvation. [No convoy effect]",
          "Easy to implement.",
          "If TQ is small, more will be the context switch (more overhead)."
        ]
      }
    },
    flashcards: [
      { front: "What is the main drawback of SJF (Non-preemptive)?", back: "1. Must estimate Burst Time (BT) beforehand (ideally impossible).\n2. May suffer from the Convoy Effect if the first process has a large BT.\n3. Starvation may happen for long processes." },
      { front: "Why does Preemptive SJF give less average Wait Time?", back: "Because scheduling a short job before a long one decreases the wait time of the short job more than it increases the wait time of the long process." },
      { front: "How is SJF related to Priority Scheduling?", back: "SJF is a special case of general priority scheduling where the priority is inversely proportional to the Burst Time (BT)." },
      { front: "What is the problem with Priority Scheduling and what is its solution?", back: "Problem: Indefinite waiting (Starvation) for lower priority jobs.\nSolution: 'Ageing' - gradually increasing the priority of processes that have waited a long time." },
      { front: "What happens in Round Robin if the Time Quantum (TQ) is too small?", back: "There will be more context switching, leading to higher system overhead." },
      { front: "Does Round Robin depend on Burst Time?", back: "No. The criteria for RR is Arrival Time (AT) + Time Quantum (TQ). It doesn't depend on BT." }
    ],
    quiz: [
      { question: "Which algorithm relies on predicting the Burst Time of a process beforehand?", options: ["Round Robin", "SJF (Shortest Job First)", "Priority Scheduling", "FCFS"], answer: 1 },
      { question: "What is the solution to starvation in Priority Scheduling?", options: ["Ageing", "Context Switching", "Decreasing Time Quantum", "Preemption"], answer: 0 },
      { question: "Round Robin is essentially the preemptive version of which scheduling algorithm?", options: ["SJF", "Priority Scheduling", "FCFS", "Multilevel Queue"], answer: 2 },
      { question: "In Round Robin, what happens if the Time Quantum is extremely small?", options: ["Starvation increases", "CPU utilization becomes 100%", "Context switch overhead becomes too high", "Processes terminate faster"], answer: 2 },
      { question: "Which of the following scheduling algorithms is specifically designed for time-sharing systems?", options: ["Non-preemptive SJF", "FCFS", "Round Robin", "Priority Scheduling"], answer: 2 }
    ]
  },
  {
    id: 'mlq_mlfq',
    title: '14. MLQ & MLFQ',
    notes: {
      mlq: {
        title: 'Multi-Level Queue (MLQ)',
        subtitle: 'The Strict VIP System',
        desc: "The OS sets up a strict hierarchy of queues and permanently assigns a process to a specific queue. It is totally inflexible.",
        queues: [
          { name: "First Class (System Processes)", priority: "Highest", desc: "Things the OS needs to do to keep the computer from crashing. Created by OS." },
          { name: "Business Class (Interactive Processes)", priority: "High", desc: "Foreground processes requiring user input (I/O). Example: Web browser." },
          { name: "Economy Class (Batch Processes)", priority: "Lowest", desc: "Background processes that run silently. Example: Virus scan." }
        ],
        rules: [
          "Each queue has its own scheduling algorithm. E.g., SP -> RR, IP -> RR, BP -> FCFS.",
          "Scheduling among different queues uses fixed priority preemptive scheduling. Foreground queue has absolute priority over background queue.",
          "If the CPU is serving an Economy process and a First Class process arrives, the Economy process is immediately preempted."
        ],
        problem: {
          title: 'The Huge Problem: Severe Starvation',
          desc: "Only after the completion of ALL processes from top-level queues will lower-level queues be scheduled. This causes extreme starvation for lower-priority processes. Convoy effect is also present."
        }
      },
      mlfq: {
        title: 'Multi-Level Feedback Queue (MLFQ)',
        subtitle: 'The Smart & Fair System',
        desc: "Engineers realized MLQ was too harsh, so MLFQ was invented. It allows processes to move between queues based on their behavior and wait time.",
        features: [
          { title: "Punishing CPU Hogs (Moving Down)", desc: "If a process uses too much CPU time (large Burst Time), the OS demotes it to a lower priority queue. This keeps top queues clear for quick, interactive tasks." },
          { title: "The Cure for Starvation - Ageing (Moving Up)", desc: "If a process gets stuck in the bottom queue and waits for a long time, the OS upgrades its priority. This completely prevents starvation." }
        ],
        summary: "MLFQ actively learns. Quick tasks stay in the VIP line. Heavy tasks get bumped to the slow line. But because of Ageing, no process ever starves to death. Less starvation than MLQ, highly flexible, and can be configured to match specific system requirements."
      }
    },
    flashcards: [
      { front: "What is the main difference between MLQ and MLFQ?", back: "In MLQ, a process is permanently assigned to a specific queue (inflexible). In MLFQ, processes can move between queues dynamically based on their behavior and wait time." },
      { front: "How does MLQ handle scheduling between different queues?", back: "It uses fixed priority preemptive scheduling. The CPU will only serve a lower priority queue if all higher priority queues are completely empty." },
      { front: "What is the biggest problem with Multi-Level Queue (MLQ)?", back: "Severe Starvation. Lower priority processes (like batch jobs) might wait forever if higher priority processes keep arriving." },
      { front: "How does MLFQ punish CPU-heavy processes?", back: "If a process uses too much CPU time (exceeds its time quantum), MLFQ demotes it to a lower priority queue." },
      { front: "What mechanism does MLFQ use to prevent starvation?", back: "Ageing. If a process waits too long in a low-priority queue, its priority is gradually increased (upgraded to a higher queue)." }
    ],
    quiz: [
      { question: "Which statement is TRUE about Multi-Level Queue (MLQ) scheduling?", options: ["Processes can move between queues freely.", "It prevents starvation completely.", "A process is permanently assigned to a queue upon creation.", "All queues use the FCFS algorithm."], answer: 2 },
      { question: "In the 'Airport Boarding' analogy for MLQ, which processes get the 'First Class' absolute highest priority?", options: ["Batch Processes", "System Processes", "Interactive Processes", "Background Processes"], answer: 1 },
      { question: "What is the solution used by MLFQ to prevent lower-priority processes from starving?", options: ["Round Robin", "Context Switching", "Ageing", "Preemption"], answer: 2 },
      { question: "In MLFQ, what happens to a process that consumes too much continuous CPU time?", options: ["It is terminated by the OS.", "It is moved to a higher-priority queue.", "It is moved to a lower-priority queue.", "It stays in the same queue indefinitely."], answer: 2 },
      { question: "Why is MLFQ considered better than MLQ for general-purpose OS?", options: ["It is much easier to implement than MLQ.", "It is inflexible and strict.", "It causes a massive convoy effect.", "It balances response time for interactive jobs while preventing starvation using ageing."], answer: 3 }
    ]
  },
  {
    id: 'concurrency',
    title: '15. Intro to Concurrency',
    notes: {
      intro: {
        title: "What is Concurrency?",
        desc: "Concurrency is the illusion or reality of multiple things happening at the exact same time. In an OS, this usually happens when several threads are running in parallel.",
        example: "In MS Word, you are typing (Thread 1), the red squiggly line is checking your spelling (Thread 2), and the auto-save is saving your document to the disk (Thread 3). All these happen concurrently within the single MS Word process."
      },
      tcb: {
        title: "Thread Control Block (TCB)",
        desc: "Just like every Process has a PCB, every Thread has a TCB. When the OS performs a context switch between threads, it saves the thread's state into its TCB.",
        saved: "The Program Counter (PC) (where the thread left off), the Registers, and the Stack.",
        notSaved: "The memory address space! Threads share the memory of their parent process. This makes switching between threads incredibly fast and preserves the CPU cache."
      },
      trickQuestion: {
        title: 'The "Trick" Interview Question',
        question: 'If I have a system with only a Single CPU (one core), will my program execute faster if I split it into multiple threads?',
        answer: "NEVER.",
        explanation: "A single CPU can physically only execute one instruction at a time. If you use multiple threads on one CPU core, the CPU just rapidly context-switches between them. Because context-switching takes effort (overhead), the total execution time will actually be slower than if you just ran it on a single thread."
      },
      benefits: [
        { title: "Responsiveness", desc: "If one thread is blocked (e.g., waiting for I/O), other threads can continue executing, keeping the application responsive." },
        { title: "Resource Sharing", desc: "Threads naturally share the same memory space and resources of the process, making it very easy for them to pass data back and forth without complex IPC." },
        { title: "Economy", desc: "Creating a Thread is incredibly cheap and lightweight compared to a Process. Context-switching between threads is also vastly cheaper." },
        { title: "Multiprocessor Utilization", desc: "If run on a modern computer with multiple cores, the OS will automatically distribute threads across those cores, giving massive parallelism." }
      ]
    },
    flashcards: [
      { front: "What is saved in a Thread Control Block (TCB) during a context switch?", back: "The Program Counter (PC), the Registers, and the Stack." },
      { front: "What is NOT saved during a thread context switch (unlike a process context switch)?", back: "The memory address space. Threads share the memory of their parent process." },
      { front: "Will multi-threading make a program run faster on a single-core CPU?", back: "NEVER. The context-switching overhead actually makes the total computation time slower. A single core can only run one instruction at a time." },
      { front: "If multi-threading doesn't increase speed on a single core, what is its primary benefit?", back: "Responsiveness. It allows the UI to stay active while another thread waits for I/O operations (like downloading a file or reading from disk)." },
      { front: "Why is creating a thread considered 'cheaper' than creating a process?", back: "Because threads share the same memory and resources as their parent process. The OS doesn't have to allocate new memory or data segments." }
    ],
    quiz: [
      { question: "What tracks the state of a thread during a context switch?", options: ["PCB (Process Control Block)", "TCB (Thread Control Block)", "MTS (Medium-Term Scheduler)", "CPU Registers"], answer: 1 },
      { question: "Which of the following is NOT uniquely stored in a thread's TCB?", options: ["Program Counter (PC)", "Stack", "Memory Address Space", "Registers"], answer: 2 },
      { question: "True or False: Multi-threading a CPU-intensive task on a single-core processor will reduce its total execution time.", options: ["True", "False"], answer: 1 },
      { question: "What happens when you run a multi-threaded application on a multi-core processor?", options: ["All threads run on the first core.", "The application crashes.", "The OS distributes the threads across multiple cores for true parallelism.", "The threads combine into a single process."], answer: 2 },
      { question: "Which of the following is a key economic benefit of using threads instead of processes?", options: ["Threads don't need CPU time.", "Context-switching between threads is vastly cheaper.", "Threads prevent all types of system crashes.", "Threads don't use any RAM at all."], answer: 1 }
    ]
  },
  {
    id: 'critical_section',
    title: '16. Critical Section Problem',
    notes: {
      intro: {
        title: "The Critical Section (C.S)",
        desc: "Because threads share the same memory, it causes a huge problem if they aren't careful.",
        points: [
          { label: "The Shared Resource", text: "Imagine a shared bank account balance, or in our analogy, the shared bathroom." },
          { label: "The Critical Section", text: "This is the specific segment of code where a thread actually reads or writes to that shared data." },
          { label: "The Rule", text: "Only one thread should be allowed inside the Critical Section at a time." }
        ]
      },
      raceCondition: {
        title: "The Major Issue: Race Conditions",
        desc: "What happens if two roommates try to use the bathroom at the exact same time? Chaos. In programming, this is called a Race Condition.",
        example: "Imagine Thread A wants to add $10 to a bank account, and Thread B wants to withdraw $10. Because the OS scheduler pauses and switches threads constantly, they might both read the balance at the exact same time, do their math, and write it back. The final balance will be completely wrong because it depends entirely on which thread finished its math last. They are 'racing' to change the data."
      },
      solutions: {
        title: "Solutions to the Race Condition",
        desc: "To stop the race and maintain order, we need Process Synchronization:",
        methods: [
          { name: "Atomic Operations", analogy: "The 'Flash' Solution", desc: "'Atomic' means unbreakable or indivisible. If the hardware supports an Atomic Operation, it forces the CPU to do the entire read-math-save process in exactly one single cycle. The OS physically cannot pause it mid-execution. The race condition is avoided because the action is instantaneous." },
          { name: "Mutual Exclusion (Mutex)", analogy: "The 'Deadbolt' Solution", desc: "A Mutex is a special lock variable. Thread A checks the lock, acquires it, and enters the C.S. If Thread B arrives and sees it's Occupied, B is forced to go to sleep (Wait state). When A finishes, it releases the lock, and the OS wakes B up. Result: Only one thread at a time." },
          { name: "Semaphores", analogy: "The 'Bouncer' Solution", desc: "A Semaphore is an integer variable (a counter) managed by the OS. Instead of a single deadbolt, imagine a room with 5 stalls and a Bouncer with 5 tokens. Every time a thread enters, the counter goes down. When it hits 0, new threads are put to sleep until someone leaves and returns a token." },
          { name: "Peterson’s Solution", analogy: "The 'Polite Roommates' Solution", desc: "A clever mathematical algorithm using two variables: a 'flag' (saying I want to enter) and a 'turn' variable (saying I will politely let you go first). Crucial Exam Note: It is an old theoretical trick that ONLY works for exactly 2 threads. If you have 3 or more, the math breaks down and it fails." }
        ]
      },
      disadvantages: {
        title: "The Dark Side of Mutex/Locks (Disadvantages)",
        desc: "While locks solve the Race Condition, they introduce brand new, very dangerous problems:",
        list: [
          { name: "Contention & Infinite Waiting", desc: "If Thread A acquires the lock and goes into the Critical Section, Thread B is stuck outside doing nothing ('busy waiting'). But what if Thread A suddenly crashes or dies while holding the lock? Thread B will stand outside waiting forever." },
          { name: "Deadlocks", desc: "Imagine Thread A locks the shared printer, but needs the shared scanner to finish. Meanwhile, Thread B has locked the scanner, but needs the printer to finish. They both sit there staring at each other, waiting forever. The whole system freezes." },
          { name: "Starvation", desc: "High-priority threads might get stuck waiting endlessly if lower-priority threads keep grabbing the lock right before them." },
          { name: "Debugging Nightmare", desc: "Bugs involving locks and race conditions are notoriously hard to fix because they only happen randomly based on how the CPU scheduler happens to switch the threads that day." }
        ]
      },
      globalVarFail: {
        title: "Why a simple global variable lock fails",
        desc: "Imagine a global variable `boolean door_locked = false;`. A human thinks: 'Check if false. If false, make it true and enter.' Here is how the CPU ruins this:",
        steps: [
          { time: "Millisecond 1", event: "Thread A reads the variable. Sees `door_locked = false`." },
          { time: "Millisecond 2", event: "CONTEXT SWITCH! The OS pauses Thread A right before it can change it to true." },
          { time: "Millisecond 3", event: "Thread B walks up and reads it. It ALSO sees `door_locked = false`." },
          { time: "Millisecond 4", event: "Thread B changes it to true and walks into the Critical Section." },
          { time: "Millisecond 5", event: "The OS wakes Thread A back up. Thread A remembers 'the door was false!' It changes it to true and walks inside." }
        ],
        takeaway: "BOOM. Both threads are inside. You cannot use a simple software variable because Reading and Writing take two separate CPU cycles, and the OS can pause the thread right in between them."
      },
      petersonFail: {
        title: "Why Peterson's Solution fails for 3+ Threads",
        desc: "Peterson's solution uses two variables: a `flag` array ('I want to enter') and an integer `turn` ('I will politely let you go first'). It works flawlessly for 2 threads because whoever sets `turn` last loses the tie-breaker.",
        whyItFails: "The magic relies entirely on the `turn` variable, which can only hold ONE value at a time.",
        example: "Imagine 3 roommates. Thread A says 'I want to go in, but Thread B, it's your turn' (turn = B). Suddenly, Thread C shows up and says 'Thread A, it's your turn' (turn = A). Thread C just overwrote Thread A's polite gesture! The logic is scrambled. Both A and B might see the scrambled variables and walk in at the same time.",
        takeaway: "Peterson's Solution is like a seesaw—it perfectly balances exactly two people. Throw a third person on, and the physics break down. For 3+ threads, you MUST use hardware-backed atomic locks (Mutexes/Semaphores)."
      }
    },
    flashcards: [
      { front: "What is a Race Condition?", back: "When two or more threads attempt to access and change shared data at the exact same time, causing unpredictable results based on scheduling." },
      { front: "What is a Critical Section?", back: "The specific segment of code where a thread accesses (reads or writes) shared resources like variables or files." },
      { front: "What does it mean for an operation to be 'Atomic'?", back: "It is unbreakable and executes entirely in exactly one CPU cycle, meaning the OS scheduler cannot interrupt it mid-execution." },
      { front: "What is a major limitation of Peterson's Solution?", back: "It only works for exactly 2 processes/threads. It fails if there are 3 or more." },
      { front: "What happens if a thread dies while holding a lock/mutex?", back: "Infinite Waiting. Any other thread waiting for that lock will be stuck waiting forever because the lock will never be released." }
    ],
    quiz: [
      { question: "Which of the following best describes the 'Critical Section'?", options: ["The part of the OS kernel that handles interrupts.", "The segment of code where shared resources are accessed and modified.", "The memory area where the TCB is stored.", "The queue where blocked processes wait."], answer: 1 },
      { question: "Why is a simple true/false 'flag' variable generally NOT enough to solve the race condition on its own?", options: ["It uses too much memory.", "It causes a deadlock immediately.", "The changing of the flag itself can suffer from a race condition.", "Flags are only allowed in kernel mode."], answer: 2 },
      { question: "What is the key limitation of Peterson's Solution?", options: ["It requires special hardware instructions.", "It causes severe starvation.", "It is an infinite loop.", "It only works for exactly 2 processes/threads."], answer: 3 },
      { question: "What dangerous situation occurs when Thread A is waiting for a resource held by Thread B, and Thread B is waiting for a resource held by Thread A?", options: ["Starvation", "Deadlock", "Race Condition", "Convoy Effect"], answer: 1 },
      { question: "What does 'Mutual Exclusion' ensure?", options: ["Multiple processes can execute the critical section simultaneously.", "No two processes can be in their critical sections at the same time.", "The CPU will never be idle.", "All processes will finish at the same time."], answer: 1 }
    ]
  },
  {
    id: 'semaphores',
    title: '17. Semaphores & Condition Variables',
    notes: {
      busyWaiting: {
        title: "What EXACTLY is 'Busy Waiting'?",
        issue: "Also known as 'Spinlocking'. It happens when a thread uses a while-loop to constantly check a locked condition without pausing. It actively burns up its assigned CPU time slice just to run in a circle, wasting power.",
        solution: "Condition Variables fix this. Instead of looping, the thread calls wait(). The OS literally removes the thread from the CPU, puts it in a sleeping queue, and gives the CPU to someone else. It uses zero CPU power while asleep."
      },
      conditionVars: {
        title: "Condition Variables (The 'Restaurant Pager')",
        desc: "A Condition Variable puts a thread to sleep until a specific condition happens, completely eliminating busy waiting. It ALWAYS works together with a lock.",
        analogy: "You go to a busy restaurant. You acquire the lock to speak to the host. Table isn't ready. Instead of standing there blocking everyone (busy waiting), you are given a pager. You release the lock and sit on a bench to sleep (Wait state). When your table opens, the host buzzes your pager (Notifies you). You wake up, re-acquire the lock, and proceed."
      },
      semaphoreTypes: {
        title: "Semaphores (The 'Bouncer with Tokens')",
        desc: "A semaphore is just an integer variable managed by the OS that tracks how many resources are available.",
        binary: "The integer can only be 0 or 1. Functionally identical to a standard Mutex lock (1 token = 1 person in the bathroom).",
        counting: "The integer can be any number. If you have 5 shared network connections, the semaphore starts at 5. This allows multiple threads to be inside the Critical Section concurrently, up to the limit of the finite resources."
      },
      howItWorks: {
        title: "How Semaphores defeat Busy Waiting",
        points: [
          { action: "wait()", desc: "When a thread wants to use a resource, it calls wait(). If the bouncer has tokens, it takes one and goes in." },
          { action: "block()", desc: "If the integer is 0, the OS executes a block() operation. It puts the thread's name on a clipboard (waiting queue), changes state to Waiting, and frees the CPU for other work." },
          { action: "signal() & wakeup()", desc: "When a thread finishes, it calls signal() to give the token back. The OS checks the clipboard. If someone is waiting, it calls wakeup() to move them to the Ready Queue." }
        ]
      },
      atomicProtection: {
        title: "Why don't Race Conditions happen INSIDE the Semaphore?",
        desc: "If three threads try to do S = S - 1 at the exact same microsecond, why doesn't the semaphore itself break? The OS guarantees that Semaphore operations are Atomic using the physical CPU hardware:",
        hardware: "Modern CPUs have special unbreakable hardware instructions (like 'Test-and-Set'). The CPU physically locks the memory bus for a fraction of a microsecond, blocking every other core from touching that specific spot in RAM. The math executes entirely in one unbreakable step."
      },
      nestedLocks: {
        title: "Nesting Locks (The 'Library and Stapler' Analogy)",
        desc: "A Counting Semaphore alone DOES NOT protect a single shared variable from race conditions. If the counter > 0, it lets multiple threads in. If they both touch `var a`, they race! To fix this, you must combine tools: nest a Mutex inside a Counting Semaphore.",
        analogy: {
          library: "The Counting Semaphore (Size 5): Stands at the front door. Ensures only 5 people can enter the library to study.",
          stapler: "The Mutex (Size 1): Sits on the stapler. Ensures only 1 person inside can use the stapler at a time."
        },
        codeTitle: "How it looks in Pseudocode",
        code: "// 1. Thread arrives at the room\nwait(Counting_Semaphore)  // Decreases counter. If > 0, thread enters.\n\n    // 2. Thread does independent work...\n    do_independent_math();\n\n    // 3. Thread touches the shared 'var a'\n    wait(Mutex)  // Locks 'var a' exclusively\n\n        var a = a + 10;  // Critical Section\n\n    signal(Mutex) // Unlocks 'var a'\n\n    // 4. Thread leaves the room\nsignal(Counting_Semaphore) // Increases counter, letting new thread in",
        rules: [
          "Single shared variable: MUST use a Mutex.",
          "Pool of independent resources (like 5 separate DB connections): Use a Counting Semaphore.",
          "Both (multiple threads allowed in, but occasionally need to touch one shared variable): Nest the Mutex inside the Counting Semaphore."
        ]
      }
    },
    flashcards: [
      { front: "What is 'Busy Waiting' (or Spinlocking)?", back: "When a thread uses a while-loop to continuously check a condition, actively burning CPU cycles without doing any useful work." },
      { front: "What is the purpose of a Condition Variable?", back: "To completely eliminate busy waiting. It allows a thread to release its lock and go to sleep until another thread sends a notify() signal." },
      { front: "What is the difference between a Binary and Counting Semaphore?", back: "A Binary Semaphore (0 or 1) acts like a Mutex, allowing only 1 thread. A Counting Semaphore (any number) allows multiple threads to access finite resources concurrently." },
      { front: "What does the OS do when a thread calls wait() on a Semaphore that is currently at 0?", back: "It executes a block() operation. The thread is removed from the CPU, put into a waiting queue, and its state is changed to Waiting." },
      { front: "How are Semaphore operations protected from their own race conditions?", back: "Through Hardware-Level Locks. The CPU uses unbreakable instructions to physically lock the memory bus for a microsecond, guaranteeing the S = S - 1 math is completely atomic." }
    ],
    quiz: [
      { question: "Which of the following scenarios best describes 'Busy Waiting'?", options: ["A thread sleeping while waiting for I/O.", "A thread executing a while-loop to constantly check if a lock is free.", "A thread executing inside a Critical Section.", "A thread that has been terminated."], answer: 1 },
      { question: "In the 'Restaurant Pager' analogy for Condition Variables, what does stepping away from the host stand to sit on the bench represent?", options: ["Acquiring the lock.", "Busy waiting.", "Releasing the lock and entering the Wait state.", "Notifying the OS."], answer: 2 },
      { question: "Which type of semaphore allows multiple threads to be inside the critical section concurrently?", options: ["Binary Semaphore", "Counting Semaphore", "Mutex Semaphore", "Atomic Semaphore"], answer: 1 },
      { question: "What OS action grabs a blocked thread from the waiting list and moves it to the Ready Queue?", options: ["block()", "wait()", "signal()", "wakeup()"], answer: 3 },
      { question: "How does the OS guarantee that Semaphore operations themselves are atomic?", options: ["It uses purely software-based algorithms like Peterson's Solution.", "It relies on the physical CPU hardware to lock the memory bus.", "It makes the threads run on a single core.", "It puts all threads to sleep simultaneously."], answer: 1 }
    ]
  },
  {
    id: 'classic_problems',
    title: '20. Classic Sync Problems',
    notes: {
      diningPhilosophers: {
        title: "The Dining Philosophers Problem",
        desc: "Imagine 5 philosophers sitting around a circular table. There is a big bowl of noodles in the middle. There are exactly 5 forks placed between them. A philosopher only does two things: Think or Eat. To eat, a philosopher needs TWO forks (left and right).",
        translation: {
          philosophers: "Threads",
          forks: "Shared Resources (Array of 5 Binary Semaphores/Mutexes)",
          eating: "Critical Section. Must successfully call wait() on both left and right forks. Call signal() on both when finished."
        },
        deadlock: {
          title: "The Disaster: DEADLOCK",
          desc: "If the rule is simply 'Grab left fork, then grab right fork, then eat', a catastrophic failure happens:",
          steps: [
            "All 5 philosophers get hungry at the exact same millisecond.",
            "They all grab their left fork at the same time.",
            "All 5 forks are held. All 5 fork semaphores are at 0.",
            "Everyone reaches for their right fork... but it's taken by their neighbor.",
            "They all wait forever. Nobody eats. This is a Deadlock."
          ]
        },
        enhancements: {
          title: "How to fix it (The 3 Enhancements)",
          points: [
            { name: "Limit the seats (At most 4)", desc: "If only 4 philosophers sit at the 5-seat table, there will always be at least one extra fork left on the table. This guarantees at least one person can eat, breaking the deadlock." },
            { name: "Atomic Pickup", desc: "A philosopher is not allowed to pick up just one fork. They must pick up both forks at the exact same time in one unbreakable (atomic) motion. If both aren't available, they can't pick up either." },
            { name: "The Odd-Even Rule (Asymmetry)", desc: "Number the philosophers 1-5. Tell Odd philosophers to grab Left fork first, then Right. Tell Even philosophers to grab Right fork first, then Left. This messes up the symmetry, making it impossible for everyone to grab the same side at once." }
          ]
        }
      },
      producerConsumer: {
        title: "The Producer / Consumer Problem",
        desc: "A classic problem perfectly demonstrating nesting a Mutex inside a Counting Semaphore.",
        setup: [
          { name: "The Producer", desc: "A thread that generates data (like a chef making burgers)." },
          { name: "The Consumer", desc: "A thread that uses the data (like a customer eating burgers)." },
          { name: "The Buffer", desc: "The shared memory array where the data sits (the shelf where the chef puts the burgers). It has limited size." }
        ],
        semaphores: [
          { name: "mutex (Size 1)", desc: "A Binary Semaphore to lock the buffer so chef and customer don't crash into each other." },
          { name: "empty (Size N)", desc: "A Counting Semaphore tracking how many empty spaces are left on the shelf." },
          { name: "full (Size 0)", desc: "A Counting Semaphore tracking how many items are currently on the shelf ready to be consumed." }
        ],
        producerCode: "wait(empty)     // 1. Is there an empty space? (If shelf full, sleep)\nwait(mutex)     // 2. Lock the shelf\n  // place in buffer (Put burger on shelf)\nsignal(mutex)   // 3. Unlock the shelf\nsignal(full)    // 4. Shout to consumer: '1 more item available!'",
        consumerCode: "wait(full)      // 1. Is there an item? (If shelf empty, sleep)\nwait(mutex)     // 2. Lock the shelf\n  // consume (Take burger off shelf)\nsignal(mutex)   // 3. Unlock the shelf\nsignal(empty)   // 4. Shout to producer: '1 more empty space!'",
        takeaway: "The Counting Semaphores (empty and full) act as the front door, putting threads to sleep if there's no room or no data. The mutex acts as the inner lock ensuring they don't corrupt the shared array."
      }
    },
    flashcards: [
      { front: "In the Dining Philosophers problem, what do the Philosophers and Forks represent?", back: "Philosophers = Threads. Forks = Shared Resources (Binary Semaphores/Mutexes)." },
      { front: "How does 'Limiting the seats to 4' fix the Dining Philosophers Deadlock?", back: "With 4 people and 5 forks, there is always at least one extra fork left on the table, guaranteeing at least one person can eat." },
      { front: "What is the Odd-Even Rule (Asymmetry) in the Dining Philosophers problem?", back: "Odd philosophers grab Left then Right. Even philosophers grab Right then Left. This breaks the symmetry so they can't all get stuck holding their left fork simultaneously." },
      { front: "In Producer/Consumer, why is wait(empty) called BEFORE wait(mutex) by the Producer?", back: "If the buffer is totally full, the Producer must go to sleep immediately without acquiring the lock. Otherwise, it would lock the shelf and then sleep, causing a deadlock." },
      { front: "What do the 'empty' and 'full' semaphores track in the Producer/Consumer problem?", back: "Empty tracks how many empty spaces are left in the buffer. Full tracks how many available items are in the buffer ready to be consumed." }
    ],
    quiz: [
      { question: "What happens in the Dining Philosophers problem if all 5 philosophers grab their left fork at the exact same millisecond?", options: ["They all eat successfully.", "The OS crashes immediately.", "A Deadlock occurs because they will all wait forever for their right fork.", "A Race Condition corrupts the forks."], answer: 2 },
      { question: "Which of the following is NOT a valid solution to the Dining Philosophers deadlock?", options: ["Limiting the table to 4 philosophers.", "Using a Counting Semaphore instead of Binary Semaphores for the forks.", "Forcing atomic pickup of both forks at the same time.", "Using the Odd-Even rule (Asymmetry)."], answer: 1 },
      { question: "In the Producer/Consumer problem, what type of semaphore is 'mutex'?", options: ["Binary Semaphore", "Counting Semaphore", "Condition Variable", "Hardware Lock"], answer: 0 },
      { question: "In the Producer/Consumer problem, what happens if the Consumer calls wait(full) when the shelf is completely empty?", options: ["The Consumer thread crashes.", "The Consumer immediately consumes random memory.", "The Consumer is put to sleep (Wait state) until the Producer signals 'full'.", "The Consumer signals the 'empty' semaphore."], answer: 2 },
      { question: "What is the primary role of the 'mutex' semaphore in the Producer/Consumer problem?", options: ["To track how many burgers are on the shelf.", "To ensure the Producer and Consumer don't access/corrupt the shared buffer at the exact same time.", "To track how many empty spaces are left.", "To limit the total number of producers."], answer: 1 }
    ]
  },
  {
    id: 'deadlock_part_1',
    title: '21. Deadlock (Part 1)',
    notes: {
      definition: {
        title: "What is a Deadlock?",
        desc: "A severe synchronization bug where two or more processes are stuck in an infinite waiting state because they are waiting on a resource that will never become available.",
        example: "Thread 1 (T1) locks Resource 1 (R1). Thread 2 (T2) locks Resource 2 (R2). T1 requests R2 (held by T2). T2 requests R1 (held by T1). Both wait forever."
      },
      conditions: {
        title: "The 4 Necessary Conditions",
        desc: "For a deadlock to happen, ALL FOUR conditions must be true at the exact same time. If even one is false, a deadlock is mathematically impossible.",
        list: [
          { name: "Mutual Exclusion", desc: "Resources cannot be shared. Only one process can use the resource at a time." },
          { name: "Hold & Wait", desc: "A process holds at least one resource, but is waiting to acquire more resources held by someone else." },
          { name: "No-preemption", desc: "The OS cannot forcefully strip a resource away. It must be released voluntarily." },
          { name: "Circular Wait", desc: "A closed loop of processes waiting on each other (A waits for B, B waits for C, C waits for A)." }
        ]
      },
      handling: {
        title: "How the OS Handles Deadlocks",
        methods: [
          { name: "Prevention / Avoidance", desc: "Write strict rules so the system mathematically never enters a deadlocked state." },
          { name: "Detect and Recover", desc: "Let deadlocks happen, run background checks to detect them, and kill a process to break the loop." },
          { name: "Deadlock Ignorance (Ostrich Algorithm)", desc: "Pretend deadlocks don't exist. Used by Windows and Linux! It's cheaper to let the user reboot than waste CPU constantly checking for rare deadlocks." }
        ]
      },
      prevention: {
        title: "Deadlock Prevention (Breaking the Conditions)",
        desc: "Prevention works by intentionally breaking at least one of the 4 necessary conditions:",
        methods: [
          { name: "Breaking Mutual Exclusion", desc: "Make all resources shareable. Reality: Usually fails because things like printers or write-locks are intrinsically non-shareable." },
          { name: "Breaking Hold & Wait", desc: "Protocol 1: Force a process to request every single resource before starting (Inefficient). Protocol 2: If a process wants a new resource, it must temporarily drop/release everything it's holding before asking." },
          { name: "Breaking No-Preemption", desc: "Allow the OS to forcefully steal resources. If Process A requests a resource held by waiting Process B, the OS steals it from B and gives it to A." },
          { name: "Breaking Circular Wait", desc: "The most common software solution! Assign a numerical ID to every resource. A process is ONLY allowed to request resources in ascending numerical order. This makes it mathematically impossible to form a circle." }
        ]
      }
    },
    flashcards: [
      { front: "What are the 4 necessary conditions for a Deadlock?", back: "1. Mutual Exclusion, 2. Hold & Wait, 3. No-preemption, 4. Circular Wait. (All 4 must be true simultaneously)." },
      { front: "What is the 'Ostrich Algorithm' for handling deadlocks?", back: "Ignoring the problem completely. Used by Windows/Linux because deadlocks are rare and constant checking wastes too much CPU power." },
      { front: "How do you break the 'Circular Wait' condition?", back: "Assign a numerical ID to all resources. Force every process to request resources in strictly ascending numerical order." },
      { front: "Why is breaking 'Mutual Exclusion' usually impossible?", back: "Because some hardware and data (like a physical printer or a write-lock) are intrinsically non-shareable." },
      { front: "What happens if you break 'Hold & Wait' by forcing a process to request all resources before starting?", back: "It works, but it is highly inefficient and ties up resources unnecessarily for long periods." }
    ],
    quiz: [
      { question: "Which of the following is NOT one of the 4 necessary conditions for a deadlock?", options: ["Mutual Exclusion", "Hold & Wait", "Circular Wait", "Process Starvation"], answer: 3 },
      { question: "Which deadlock handling method do modern Operating Systems like Windows and Linux primarily use?", options: ["Deadlock Ignorance (Ostrich Algorithm)", "Deadlock Avoidance (Banker's Algorithm)", "Deadlock Prevention", "Detect and Recover"], answer: 0 },
      { question: "How does an OS break the 'No-preemption' condition?", options: ["By making all resources read-only.", "By forcing processes to request resources in numerical order.", "By allowing the OS to forcefully steal a resource from a waiting process.", "By crashing the entire system."], answer: 2 },
      { question: "What is the consequence of breaking 'Hold & Wait' by making a process drop all its current resources before asking for a new one?", options: ["It guarantees a deadlock will happen.", "The process might have to restart its work or wait longer to reacquire everything.", "The CPU will overheat.", "The OS will switch to the Ostrich Algorithm."], answer: 1 },
      { question: "If Thread A holds Resource 1 and requests Resource 2, while Thread B holds Resource 2 and requests Resource 1, which necessary condition is actively being demonstrated?", options: ["Circular Wait", "No-preemption", "Deadlock Ignorance", "Process Synchronization"], answer: 0 }
    ]
  },
  {
    id: 'deadlock_part_2',
    title: '22. Deadlock (Part 2)',
    notes: {
      avoidance: {
        title: "Deadlock Avoidance & The 'Safe State'",
        desc: "To avoid deadlocks, the OS demands one massive piece of information upfront: Every process must declare the maximum number of resources it will ever need during its entire lifetime. The OS evaluates every request based on the resulting state:",
        states: [
          { name: "Safe State", desc: "The OS can find at least one specific sequence where everyone gets what they need, finishes, and returns their resources without getting stuck." },
          { name: "Unsafe State", desc: "There is a chance we might get stuck later. An Unsafe State is NOT a Deadlock. It just means the OS can no longer guarantee a deadlock won't happen." }
        ],
        goldenRule: "The OS will only grant a resource request if the resulting state is guaranteed to be a Safe State. If it's unsafe, the process is forced to wait."
      },
      banker: {
        title: "The Banker's Algorithm",
        desc: "Invented by Edsger Dijkstra, this algorithm calculates if a state is safe or unsafe. Think of the OS as a Bank Manager, and resources as cash:",
        steps: [
          "Customers (processes) tell the banker their maximum credit limit (Max Needs).",
          "A customer asks to borrow some cash right now (Request).",
          "Before handing over cash, the Banker simulates: 'If I give them this cash, will I still have enough cash left to satisfy the maximum needs of at least one other customer? And when they finish, will I have enough for the next?'",
          "If the simulation works out perfectly (Safe State), the Banker hands over the cash.",
          "If the simulation shows the bank might run out (Unsafe State), the Banker says, 'Sorry, you must wait.'"
        ]
      },
      detection: {
        title: "Deadlock Detection",
        desc: "If the OS doesn't use the Banker's Algorithm (to save CPU), deadlocks will eventually happen. The OS needs a way to detect them.",
        single: "Single Instance Resources (Wait-For Graph): If you have exactly one of every resource, the OS draws arrows from processes to resources they wait for. A closed circle (cycle) means a 100% certain deadlock.",
        multiple: "Multiple Instance Resources: If you have multiple resources (e.g., 3 printers), a simple circle graph doesn't work. The OS runs a modified, backward Banker's Algorithm to detect deadlock."
      },
      recovery: {
        title: "Recovery from Deadlock",
        desc: "Once detected, the OS has two brutal options to fix the deadlock:",
        methods: [
          {
            name: "Process Termination (The 'Murder' Option)",
            sub: [
              { type: "Nuclear Option", desc: "Abort all deadlocked processes. Resources are freed, but all work is instantly lost." },
              { type: "Sniper Option", desc: "Abort one process at a time. Free its resources, check if the deadlock breaks. If not, kill the next." }
            ]
          },
          {
            name: "Resource Preemption (The 'Thief' Option)",
            desc: "The OS acts like a bully. It preempts (steals) locked resources right out of the hands of one process and gives them to another to break the cycle. The robbed process is paused and rolled back."
          }
        ]
      }
    },
    flashcards: [
      { front: "What information must a process declare upfront for Deadlock Avoidance to work?", back: "Every process must declare the maximum number of resources it will ever need during its entire lifetime." },
      { front: "True or False: An Unsafe State is the same thing as a Deadlock.", back: "False. An Unsafe State is NOT a Deadlock. It just means the OS can no longer mathematically guarantee that a deadlock won't happen." },
      { front: "What is the 'Golden Rule' of Deadlock Avoidance?", back: "The OS will ONLY grant a resource request if the resulting state is mathematically proven to be a Safe State." },
      { front: "How does the OS detect a deadlock if there is only a Single Instance of each resource?", back: "It draws a Wait-For Graph. If there is a closed cycle (a circle of arrows), a deadlock definitely exists." },
      { front: "What is the difference between the 'Nuclear' and 'Sniper' options for Process Termination recovery?", back: "Nuclear kills ALL deadlocked processes at once. Sniper kills one process at a time until the deadlock cycle is broken." }
    ],
    quiz: [
      { question: "In the Banker's Algorithm analogy, what does the 'Bank Manager' simulate before granting a resource request?", options: ["Whether the requesting process has the highest priority.", "Whether the bank has enough cash left to satisfy the maximum needs of at least one other process.", "Whether the process has caused a deadlock in the past.", "Whether the requested resource is a single instance or multiple instance."], answer: 1 },
      { question: "If an OS identifies a system as being in an 'Unsafe State', what does that specifically mean?", options: ["The system is actively deadlocked.", "The system will definitely deadlock in the next 5 seconds.", "The OS cannot guarantee a deadlock won't happen, so it must force the process to wait.", "The OS must immediately reboot."], answer: 2 },
      { question: "Which deadlock detection method is used when there are MULTIPLE instances of a resource type (e.g., 5 identical printers)?", options: ["Wait-For Graph Cycle Detection", "A modified Banker's Algorithm", "The Ostrich Algorithm", "Process Starvation Analysis"], answer: 1 },
      { question: "Which of the following describes the 'Resource Preemption' method of deadlock recovery?", options: ["Aborting every process in the deadlock circle simultaneously.", "Rolling back the OS to a previous save state.", "Forcefully stealing resources from one process and giving them to another to break the cycle.", "Asking the user to manually kill a process."], answer: 2 },
      { question: "Why don't all Operating Systems constantly use Deadlock Avoidance (like the Banker's Algorithm)?", options: ["Because it is illegal to use Dijkstra's algorithm.", "Because it takes too much CPU power to constantly run the simulations.", "Because it guarantees a deadlock will eventually happen.", "Because processes never know how many resources they need."], answer: 1 }
    ]
  },
  {
    id: 'memory_management',
    title: '24. Memory Management & Contiguous Allocation',
    notes: {
      intro: {
        title: "Why Do We Need Memory Management?",
        desc: "In a multiprogramming environment, multiple processes live in the main memory (RAM) simultaneously. This keeps the CPU busy and makes the computer responsive. But because they all share the same physical memory, the OS must carefully manage it — deciding where each process goes, how to protect them from each other, and how to use the space efficiently.",
        goal: "The goal is to maximize CPU utilization and responsiveness by keeping as many processes in memory as possible, while keeping them isolated and protected from each other."
      },
      addresses: {
        title: "Logical vs Physical Address Space",
        desc: "This is one of the most important concepts in memory management. There are two completely different types of addresses in a computer:",
        logical: {
          title: "Logical Address (Virtual Address)",
          points: [
            "Generated by the CPU when it executes an instruction.",
            "It is the address of an instruction or data from the PROCESS'S point of view.",
            "The user/programmer can see and work with logical addresses.",
            "Logical addresses do NOT exist physically in RAM. They are a fiction, an illusion.",
            "The full set of all logical addresses a program generates is called the Logical Address Space.",
            "Range: 0 to max (always starts from 0 for every process)."
          ]
        },
        physical: {
          title: "Physical Address",
          points: [
            "An address loaded into the actual Memory-Address Register of the physical RAM chip.",
            "The user/programmer can NEVER access physical addresses directly.",
            "It is a real, physical location in your computer's RAM stick.",
            "The set of all physical addresses corresponding to the logical addresses is called the Physical Address Space.",
            "Computed and managed by the Memory Management Unit (MMU) hardware.",
            "Range: R+0 to R+max, where R is the base value (Relocation Register value)."
          ]
        },
        mmu: {
          title: "The MMU: The Address Translator",
          desc: "The Memory Management Unit (MMU) is a piece of hardware (a chip) inside the CPU that performs the runtime mapping from a Logical Address to a Physical Address. The translation formula is dead simple:",
          formula: "Physical Address = Logical Address + Value in Relocation Register",
          example: "CPU generates Logical Address = 346. Relocation Register = 14000. The MMU adds 346 + 14000 = 14346 and sends 14346 to the RAM chip. The CPU thinks it's talking to address 346, but RAM sees address 14346."
        }
      },
      protection: {
        title: "Memory Protection: How the OS Shields Processes",
        desc: "The OS uses two special registers loaded by the CPU dispatcher at every context switch to create an invisible fence around each process's memory:",
        registers: [
          { name: "Relocation Register (Base Register)", desc: "Holds the smallest physical address of the process (where its memory starts in RAM). Also called the Base Register." },
          { name: "Limit Register", desc: "Holds the size of the process's logical address space. If a process's logical address is 74000 bytes, the limit register is set to 74000. Example: Relocation = 100040, Limit = 74600." }
        ],
        howItWorks: "Before EVERY memory access, the CPU hardware automatically checks: Is the Logical Address < Limit Register? If YES, the MMU translates it and accesses RAM safely. If NO, the access is out of bounds! The hardware immediately generates a TRAP (a fatal addressing error), killing the rogue process. This guarantees a process can NEVER accidentally access another process's memory or the OS's memory.",
        userModeRule: "Any attempt by a program running in user mode to access OS memory or another process's memory results in a Trap, which the OS treats as a fatal error."
      },
      allocationMethods: {
        title: "The Two Big Allocation Methods on Physical Memory",
        contiguous: "Contiguous Allocation: Each process is stored in a single, unbroken block of physical memory. Simple, but causes fragmentation.",
        nonContiguous: "Non-Contiguous Allocation: A process can be scattered across multiple separate blocks of memory. More complex, but solves fragmentation. (Paging and Segmentation are examples)."
      },
      fixedPartition: {
        title: "Contiguous Allocation: Fixed Partitioning",
        desc: "The memory is divided into fixed, pre-set partitions of equal or different sizes at boot time. Each process gets assigned to one partition. Simple to implement.",
        limitations: [
          { name: "Internal Fragmentation", desc: "If a process (3 MB) is loaded into a 5 MB partition, the remaining 2 MB inside that partition is completely wasted. Nobody else can use it. This waste of space inside a partition is called Internal Fragmentation." },
          { name: "External Fragmentation", desc: "The total unused space across all partitions might be plenty (e.g., 8 MB free in total), but it's scattered in small unusable chunks. A new 6 MB process might not fit because no single partition is large enough, even though 8 MB is free. This waste outside of allocated space is External Fragmentation." },
          { name: "Limitation on Process Size", desc: "A process cannot be larger than the biggest partition. If the largest partition is 4 MB, you can never run a 5 MB process, even if total free memory is 20 MB." },
          { name: "Low Degree of Multiprogramming", desc: "Since the number of partitions is fixed at boot time, you can only run that many processes at once. You can't load more processes than there are partitions." }
        ]
      },
      dynamicPartition: {
        title: "Contiguous Allocation: Dynamic Partitioning",
        desc: "The partition size is NOT declared in advance. When a process arrives, the OS carves out a partition of exactly the right size for that process on the spot. Process Size = Partition Size.",
        advantages: [
          "No Internal Fragmentation: Every partition is exactly the size of the process, so there's zero wasted space inside a partition.",
          "No limit on process size: A process can be as large as the total free memory allows.",
          "Better degree of multiprogramming: More processes can fit in memory efficiently."
        ],
        limitation: "External Fragmentation (Still): As processes finish and leave, they create scattered 'holes' of free memory. A new, larger process might not fit into any single hole, even if the total free space is enough. Dynamic partitioning eliminates internal fragmentation but does NOT solve external fragmentation.",
        compaction: "Solution to External Fragmentation: The OS periodically performs Compaction — it shuffles all active processes to one end of RAM, merging all the small holes into one big contiguous free block. This is expensive (takes time) and requires that all processes can be relocated."
      }
    },
    flashcards: [
      { front: "Why does an OS need Memory Management?", back: "To keep multiple processes in memory simultaneously, maximizing CPU utilization, while keeping each process isolated and protected from accessing each other's data." },
      { front: "What is a Logical (Virtual) Address?", back: "An address generated by the CPU from the PROCESS'S perspective. It does NOT exist physically in RAM. It is an illusion/fiction that starts from 0 for every process." },
      { front: "What is a Physical Address?", back: "A real location in the physical RAM chip. The user can never access it directly. It is computed by the MMU by adding the Logical Address to the Relocation Register." },
      { front: "What device translates Logical Addresses to Physical Addresses?", back: "The Memory Management Unit (MMU) — a hardware chip inside the CPU that performs this translation at runtime for every single memory access." },
      { front: "What is the formula used by the MMU to translate addresses?", back: "Physical Address = Logical Address + Value in Relocation Register (Base Register)." },
      { front: "What is the Relocation Register (Base Register)?", back: "A special CPU register that holds the smallest physical address of the process — i.e., where its memory block STARTS in RAM." },
      { front: "What is the Limit Register, and what does it do?", back: "It holds the SIZE of the process's logical address space. Before every memory access, the CPU checks: Is Logical Address < Limit Register? If not, it triggers a fatal Trap." },
      { front: "What is Internal Fragmentation?", back: "The waste of memory INSIDE a partition. It happens in Fixed Partitioning when a process is smaller than the partition it's assigned to. The leftover space inside can't be used by anyone." },
      { front: "What is External Fragmentation?", back: "The waste of memory OUTSIDE allocated areas. Total free memory may be enough, but it's scattered in small chunks. No single chunk is big enough for the waiting process." },
      { front: "Which type of fragmentation does Fixed Partitioning suffer from?", back: "BOTH Internal Fragmentation (wasted space inside partitions) AND External Fragmentation (scattered free chunks between partitions). It also has a limitation on process size." },
      { front: "What is the KEY advantage of Dynamic Partitioning over Fixed Partitioning?", back: "It eliminates Internal Fragmentation by making the partition exactly the same size as the process." },
      { front: "Does Dynamic Partitioning solve External Fragmentation?", back: "No. Dynamic Partitioning still suffers from External Fragmentation as processes finish and leave holes scattered throughout memory." },
      { front: "What is Compaction, and which problem does it solve?", back: "Compaction is when the OS shuffles all active processes to one end of RAM to merge all scattered holes into one big free block. It solves External Fragmentation." },
      { front: "Why can a user program NEVER access the OS's memory region?", back: "Because the CPU hardware checks every logical address against the Limit Register. Any out-of-bounds access triggers a Trap, which the OS treats as a fatal error." },
      { front: "What are the two main Contiguous Allocation methods?", back: "Fixed Partitioning (partitions set at boot, fixed sizes) and Dynamic Partitioning (partitions carved at runtime, exactly process-sized)." }
    ],
    quiz: [
      { question: "In a multiprogramming system, why must the OS share main memory among multiple processes?", options: ["To reduce the speed of the CPU.", "To keep CPU utilization high and make the computer responsive.", "To prevent any process from completing.", "To increase the size of each process."], answer: 1 },
      { question: "A logical address is BEST described as:", options: ["The actual physical location in RAM.", "An address stored in the Relocation Register.", "An address generated by the CPU from the process's perspective, which doesn't physically exist in RAM.", "The address inside the Limit Register."], answer: 2 },
      { question: "The MMU translates Logical Address 500 to a Physical Address. If the Relocation Register holds 12000, what is the Physical Address?", options: ["500", "12000", "11500", "12500"], answer: 3 },
      { question: "The Limit Register holds the value 74600. A process generates a logical address of 80000. What happens?", options: ["The MMU translates it and accesses physical address 80000.", "The address is ignored and the CPU moves on.", "The CPU triggers a Trap (a fatal addressing error).", "The Limit Register is updated to 80000."], answer: 2 },
      { question: "Which hardware device is specifically responsible for the runtime mapping (translation) of logical to physical addresses?", options: ["The CPU Scheduler", "The Dispatcher", "The Memory Management Unit (MMU)", "The Limit Register"], answer: 2 },
      { question: "When a context switch happens, what does the dispatcher do to ensure memory protection?", options: ["It resets all logical addresses to 0.", "It loads the correct Relocation and Limit Register values for the new process as part of context switching.", "It erases the previous process's memory partition.", "It runs the Banker's Algorithm."], answer: 1 },
      { question: "A 3 MB process is loaded into a fixed partition of 5 MB. What type of fragmentation occurs, and how much memory is wasted?", options: ["External Fragmentation, 5 MB wasted.", "Internal Fragmentation, 2 MB wasted inside the partition.", "No fragmentation, the space is reused.", "External Fragmentation, 2 MB wasted."], answer: 1 },
      { question: "RAM has 3 free holes of 2MB, 1MB, and 3MB (total 6MB free). A new 5MB process arrives. What is the problem, and what type of fragmentation is this?", options: ["The process can be loaded. This is not fragmentation.", "There is Internal Fragmentation. The 5MB process is too large.", "There is External Fragmentation. Total free space is enough, but no single hole is large enough.", "This is a Deadlock scenario."], answer: 2 },
      { question: "What is the MAIN limitation of Fixed Partitioning related to the degree of multiprogramming?", options: ["Processes can only run in kernel mode.", "The number of partitions is fixed, so you can never have more active processes than there are partitions.", "All processes must be the same size.", "It requires the MMU to be disabled."], answer: 1 },
      { question: "What is the KEY advantage of Dynamic Partitioning over Fixed Partitioning?", options: ["It solves External Fragmentation completely.", "It eliminates Internal Fragmentation by making the partition exactly the size of the process.", "It allows unlimited processes regardless of RAM size.", "It doesn't need a Relocation Register."], answer: 1 },
      { question: "Dynamic Partitioning is used. P1(5MB) and P3(3MB) finish and leave. Now there are holes of 5MB and 3MB. A new 7MB process arrives. This is an example of:", options: ["Internal Fragmentation.", "A Safe State.", "External Fragmentation.", "Process Starvation."], answer: 2 },
      { question: "What is Compaction, and what specific memory problem does it solve?", options: ["A CPU scheduling algorithm that solves process starvation.", "An OS operation that shuffles processes together in RAM to merge scattered free holes into one block, solving External Fragmentation.", "A method of compressing process data to make it smaller.", "A technique to solve Internal Fragmentation in Fixed Partitioning."], answer: 1 }
    ]
  },
  {
    id: 'freespace',
    title: '12. Free Space Management',
    notes: {
      defragmentation: {
        title: "1. Defragmentation/Compaction",
        desc: "Dynamic partitioning suffers from external fragmentation. Compaction minimizes the probability of external fragmentation.",
        points: [
          "All the free partitions are made contiguous, and all the loaded partitions are brought together.",
          "By applying this technique, we can store the bigger processes in the memory. The free partitions are merged which can now be allocated according to the needs of new processes. This technique is also called defragmentation.",
          "The efficiency of the system is decreased in the case of compaction since all the free spaces will be transferred from several places to a single place."
        ]
      },
      representation: {
        title: "2. How free space is stored/represented in OS?",
        desc: "Free holes in the memory are represented by a free list (Linked-List data structure)."
      },
      satisfyingRequest: {
        title: "3. How to satisfy a request of a of n size from a list of free holes?",
        desc: "Various algorithms which are implemented by the Operating System in order to find out the holes in the linked list and allocate them to the processes.",
        algorithms: [
          { name: "First Fit", desc: "Allocate the first hole that is big enough. Simple and easy to implement. Fast/Less time complexity." },
          { name: "Next Fit", desc: "Enhancement on First fit but starts search always from last allocated hole. Same advantages of First Fit." },
          { name: "Best Fit", desc: "Allocate smallest hole that is big enough. Lesser internal fragmentation. May create many small holes and cause major external fragmentation. Slow, as required to iterate whole free holes list." },
          { name: "Worst Fit", desc: "Allocate the largest hole that is big enough. Slow, as required to iterate whole free holes list. Leaves larger holes that may accommodate other processes." }
        ]
      }
    },
    flashcards: [
      { front: "What is Defragmentation/Compaction?", back: "A technique to minimize external fragmentation by making all free partitions contiguous and bringing all loaded partitions together, allowing bigger processes to be stored in memory." },
      { front: "Why does system efficiency decrease during compaction?", back: "Because all the free spaces are transferred from several places to a single place, which is a slow and resource-intensive operation." },
      { front: "How is free space stored/represented in an OS?", back: "Free holes in the memory are represented by a free list, which is typically a Linked-List data structure." },
      { front: "What is First Fit?", back: "An algorithm that allocates the first hole that is big enough. It is simple, easy to implement, and fast." },
      { front: "What is Next Fit?", back: "An enhancement of First Fit that always starts the search from the last allocated hole. It shares the same advantages as First Fit." },
      { front: "What is Best Fit?", back: "An algorithm that allocates the smallest hole that is big enough. It results in lesser internal fragmentation but may create many small holes (major external fragmentation) and is slow." },
      { front: "What is Worst Fit?", back: "An algorithm that allocates the largest hole that is big enough. It leaves larger holes for other processes but is slow because it iterates the whole free holes list." }
    ],
    quiz: [
      { question: "Which problem does compaction aim to solve?", options: ["Internal fragmentation", "External fragmentation", "Process starvation", "CPU overhead"], answer: 1 },
      { question: "Which data structure represents free holes in memory?", options: ["Stack", "Array", "Linked-List", "Binary Tree"], answer: 2 },
      { question: "Which free space management algorithm is known for being fast and simple because it allocates the first big enough hole?", options: ["First Fit", "Next Fit", "Best Fit", "Worst Fit"], answer: 0 },
      { question: "Which algorithm allocates the smallest hole that is big enough, potentially causing major external fragmentation?", options: ["First Fit", "Next Fit", "Best Fit", "Worst Fit"], answer: 2 },
      { question: "Why is the efficiency of the system decreased during compaction?", options: ["It uses too much memory.", "All free spaces must be transferred from several places to a single place.", "It completely stops the CPU scheduler.", "It increases internal fragmentation."], answer: 1 }
    ]
  },
  {
    id: 'paging',
    title: '13. Paging (Non-Contiguous)',
    notes: {
      intro: {
        title: "1. Need for Paging",
        points: [
          "The main disadvantage of Dynamic partitioning is External Fragmentation.",
          "It can be removed by Compaction, but with overhead.",
          "We need a more dynamic/flexible/optimal mechanism to load processes.",
          "Idea: What if we divide a 2KB process into 1KB-1KB blocks to fit into non-contiguous free holes?"
        ]
      },
      concept: {
        title: "2. What is Paging?",
        desc: "A memory-management scheme that permits the physical address space of a process to be non-contiguous. It avoids external fragmentation and the need for compaction.",
        framesPages: [
          "Physical Memory is divided into fixed-sized blocks called Frames.",
          "Logical Memory is divided into blocks of the same size called Pages.",
          "CRITICAL RULE: Page Size exactly equals Frame Size."
        ],
        pageTable: [
          "A Data structure that stores which page is mapped to which frame.",
          "The page table contains the base address of each page in the physical memory.",
          "Stored in main memory at the time of process creation.",
          "Its base address is stored in the Process Control Block (PCB)."
        ],
        addressing: "Every logical address generated by the CPU is divided into two parts: a Page Number (p) and a Page Offset (d). The Page Number is used as an index into the page table.",
        ptbr: "Page Table Base Register (PTBR) points to the current page table. Changing page tables during context-switching requires updating only this one register."
      },
      tlb: {
        title: "3. Translation Look-aside Buffer (TLB)",
        problem: "Why is basic paging slow? Because the page table is stored in main memory. Every memory access requires TWO memory references (one for the page table, one for the actual data).",
        solution: "TLB is hardware support to speed up the paging process. It's a high-speed hardware cache that stores key-value pairs of recent page-to-frame translations.",
        howItWorks: "When retrieving a physical address, we first check the TLB. If there's a TLB hit, translation is fast. On a TLB miss, we check the actual page table in main memory, then add that entry into the TLB for future use.",
        asid: "Address Space Identifier (ASID): Stored in each TLB entry to uniquely identify processes. It provides address space protection, allowing the TLB to contain entries for several different processes simultaneously. If the ASID doesn't match the current process, it's treated as a TLB miss."
      }
    },
    flashcards: [
      { front: "What is Paging?", back: "A memory-management scheme that permits the physical address space of a process to be non-contiguous, avoiding external fragmentation." },
      { front: "Frames vs Pages", back: "Physical memory is divided into fixed-size blocks called Frames. Logical memory is divided into blocks of the same size called Pages. (Page Size = Frame Size)" },
      { front: "What is a Page Table?", back: "A data structure stored in main memory that maps logical pages to physical frames." },
      { front: "What are the two parts of a Logical Address in paging?", back: "1. Page Number (p): Used as an index into the page table.\n2. Page Offset (d): The displacement within the page/frame." },
      { front: "What is the PTBR?", back: "Page Table Base Register. It's a hardware register that points to the current page table in main memory." },
      { front: "Why is standard paging slow?", back: "Because it requires two memory accesses for every reference: one to access the page table in main memory, and one to access the actual data." },
      { front: "What is the TLB?", back: "Translation Look-aside Buffer. A fast hardware cache that stores recent page-to-frame translations to speed up paging." },
      { front: "What is an ASID in the TLB?", back: "Address Space Identifier. It uniquely identifies the process an entry belongs to, providing protection and allowing the TLB to hold entries for multiple processes at once." }
    ],
    quiz: [
      { question: "What is the primary relationship between a Page and a Frame?", options: ["A Frame is always larger than a Page.", "A Page is always larger than a Frame.", "Page size must be exactly equal to Frame size.", "They are completely independent of each other."], answer: 2 },
      { question: "Where is the Page Table stored?", options: ["On the hard disk.", "Inside the CPU cache.", "In Main Memory (RAM).", "Inside the TLB."], answer: 2 },
      { question: "Which register points to the current page table during execution?", options: ["Program Counter (PC)", "Page Table Base Register (PTBR)", "Instruction Register (IR)", "Stack Pointer (SP)"], answer: 1 },
      { question: "Why does basic paging require two main memory accesses?", options: ["One for the code and one for the data.", "One to fetch the page table entry, and one to fetch the actual physical data.", "Because memory is split into two halves.", "It actually requires three accesses."], answer: 1 },
      { question: "What is the function of the ASID in a TLB?", options: ["It compresses the page table to save space.", "It encrypts the memory data.", "It uniquely identifies processes to provide memory protection within the shared TLB.", "It counts the number of page faults."], answer: 2 },
      { question: "What happens if a logical address's page number is found in the TLB (TLB Hit)?", options: ["The CPU crashes.", "The OS must read the page table from RAM.", "The physical address is resolved immediately without accessing the page table in RAM.", "A page fault occurs."], answer: 2 }
    ]
  },
  {
    id: 'segmentation',
    title: '14. Segmentation (Non-Contiguous)',
    notes: {
      intro: {
        title: "1. The Need for Segmentation",
        points: [
          "An important aspect of memory management that becomes unavoidable with paging is the separation of the user's view of memory from the actual physical memory.",
          "Segmentation is a memory management technique that supports the user view of memory.",
          "A logical address space is a collection of segments. These segments are based on the user view of logical memory.",
          "Process is divided into variable segments based on the user view."
        ]
      },
      pagingVsSegmentation: {
        title: "2. Paging vs. Segmentation",
        points: [
          "Paging is closer to the Operating system rather than the User.",
          "Paging divides all processes into pages, although a process can have related parts of functions that should ideally be loaded together.",
          "The OS doesn't care about the User's view in paging. It may divide the same function into different pages, and those pages may not be loaded at the same time, decreasing efficiency.",
          "It is better to have segmentation which divides the process into logical segments. Each segment contains the same type of functions (e.g., the main function in one segment, library functions in another segment)."
        ]
      },
      addressing: {
        title: "3. Logical Address in Segmentation",
        desc: "Each segment has a segment number and an offset, defining a segment: <segment-number, offset> or {s, d}."
      },
      hardware: {
        title: "4. Segmentation Hardware",
        desc: "The CPU generates a logical address containing 's' (segment number) and 'd' (offset).",
        points: [
          "The segment number 's' is used as an index into the Segment Table.",
          "The Segment Table contains a 'limit' (length of the segment) and a 'base' (starting physical address).",
          "If the offset 'd' is less than the 'limit', the physical address is calculated by adding 'd' to the 'base'.",
          "If 'd' is greater than or equal to the limit, a trap (addressing error) is generated by the OS."
        ]
      },
      prosCons: {
        title: "5. Advantages & Disadvantages",
        advantages: [
          "No internal fragmentation.",
          "One segment has a contiguous allocation, hence efficient working within a segment.",
          "The size of the segment table is generally less than the size of the page table.",
          "Results in a more efficient system because the compiler keeps the same type of functions in one segment."
        ],
        disadvantages: [
          "External fragmentation.",
          "The different size of segments is not good at the time of swapping."
        ]
      },
      modern: {
        title: "6. Modern System Architecture",
        desc: "Modern System architecture provides both segmentation and paging implemented in some hybrid approach."
      }
    },
    flashcards: [
      { front: "What is Segmentation?", back: "A non-contiguous memory management technique that divides a process into variable-sized segments based on the user's logical view of memory." },
      { front: "What makes up a Logical Address in Segmentation?", back: "It consists of a Segment Number (s) and an Offset (d)." },
      { front: "What does a Segment Table store?", back: "It stores the 'base' (starting physical address) and the 'limit' (length) of each segment." },
      { front: "How does Segmentation differ from Paging in terms of 'view'?", back: "Segmentation supports the User's view of memory (grouping related functions into variable segments). Paging supports the OS's view (splitting memory into fixed-size meaningless blocks)." },
      { front: "Does Segmentation suffer from Internal or External Fragmentation?", back: "Segmentation suffers from External Fragmentation, but has NO Internal Fragmentation." },
      { front: "Why is Segmentation considered efficient for compilers?", back: "Because compilers can group the same type of functions (like standard libraries or the main function) into a single, contiguous segment." }
    ],
    quiz: [
      { question: "Which memory management technique directly supports the user's view of memory?", options: ["Paging", "Segmentation", "Dynamic Partitioning", "Fixed Partitioning"], answer: 1 },
      { question: "In segmentation, what does the Segment Table contain for each segment?", options: ["Page Number and Frame Number", "Base Address and Limit (Length)", "ASID and physical address", "Process ID and Program Counter"], answer: 1 },
      { question: "What happens if the offset 'd' generated by the CPU is greater than the segment 'limit'?", options: ["The segment is expanded automatically.", "The TLB is updated.", "A trap (addressing error) is generated.", "It wraps around to the base address."], answer: 2 },
      { question: "Which of the following is an ADVANTAGE of Segmentation?", options: ["It completely eliminates External Fragmentation.", "It makes swapping very easy due to uniform sizes.", "No internal fragmentation.", "It avoids the need for any memory translation."], answer: 2 },
      { question: "Why is paging considered 'closer to the OS' while segmentation is 'closer to the user'?", options: ["Paging is written in C.", "Paging divides processes into fixed-size blocks regardless of logical function boundaries, while segmentation groups logical parts together.", "Segmentation is faster.", "Paging only works in User Mode."], answer: 1 },
      { question: "How do modern architectures typically handle memory management?", options: ["Only Paging", "Only Segmentation", "A hybrid approach combining both Segmentation and Paging", "Neither, they use direct physical memory addressing"], answer: 2 }
    ]
  },
  {
    id: 'virtualmemory',
    title: '15. Virtual Memory & Demand Paging',
    notes: {
      intro: {
        title: "1. What is Virtual Memory?",
        desc: "A technique that allows the execution of processes that are not completely in the memory. It provides the user an illusion of having a very big main memory by treating a part of secondary memory (Swap-space) as the main memory.",
        benefits: [
          "Programs can be larger than physical memory.",
          "A program is no longer constrained by the amount of physical memory available.",
          "Because each user program takes less physical memory, more programs can be run simultaneously (increased degree of multi-programming, CPU utilization, and throughput).",
          "Benefits both the system and the user by allowing partial execution."
        ]
      },
      demandPaging: {
        title: "2. Demand Paging & Lazy Swapper",
        desc: "Demand Paging is a popular method of virtual memory management where least used pages are stored in secondary memory. A page is only copied to main memory when its demand is made (or a page fault occurs).",
        points: [
          "Lazy Swapper: Never swaps a page into memory unless that page will be needed.",
          "Pager vs Swapper: A 'swapper' manipulates entire processes, whereas a 'pager' is concerned with individual pages of a process.",
          "By guessing which pages will be used and only bringing those in, the OS decreases swap time and physical memory needed."
        ]
      },
      validInvalid: {
        title: "3. Valid-Invalid Bit Scheme",
        desc: "Used in the page table to distinguish between pages that are in memory and those on the disk.",
        bits: [
          { bit: "1 (Valid)", meaning: "The associated page is both legal and in memory." },
          { bit: "0 (Invalid)", meaning: "The page either is not valid (not in the logical address space) or is valid but is currently on the disk." }
        ]
      },
      pageFault: {
        title: "4. Page Faults & Handling",
        desc: "Access to a page marked invalid (not brought into memory) causes a page fault. The paging hardware notices the invalid bit and causes a trap to the OS.",
        steps: [
          "Check an internal table (in PCB) to determine if the reference was valid or an invalid memory access.",
          "If invalid: throw exception. If valid: pager will swap-in the page.",
          "Find a free frame (from the free-frame list).",
          "Schedule a disk operation to read the desired page into the newly allocated frame.",
          "When disk read is complete, modify the page table to indicate the page is now in memory (set valid bit).",
          "Restart the instruction that was interrupted by the trap. The process accesses the page as though it had always been in memory."
        ]
      },
      pureDemandPaging: {
        title: "5. Pure Demand Paging",
        points: [
          "In extreme cases, start executing a process with NO pages in memory. The first instruction causes an immediate page fault.",
          "Rule: Never bring a page into memory until it is strictly required.",
          "Relies heavily on 'Locality of Reference' to achieve reasonable performance."
        ]
      },
      prosCons: {
        title: "6. Advantages & Disadvantages",
        advantages: [
          "The degree of multi-programming is increased.",
          "Users can run large apps with less real physical memory."
        ],
        disadvantages: [
          "The system can become slower as swapping takes time.",
          "Thrashing may occur if too much swapping happens."
        ]
      }
    },
    flashcards: [
      { front: "What is Virtual Memory?", back: "A technique that allows execution of processes not completely in memory, giving the illusion of a huge main memory by using secondary memory (swap space)." },
      { front: "What is a Lazy Swapper?", back: "A swapper that never swaps a page into memory unless that page is actually needed." },
      { front: "What does a Valid-Invalid Bit of '0' mean in demand paging?", back: "It means the page is either illegal/not in the logical address space, OR it is valid but currently residing on the disk (not in RAM)." },
      { front: "What is a Page Fault?", back: "An event that occurs when a process tries to access a page that was not brought into memory (marked with an invalid bit). It causes a trap to the OS." },
      { front: "What is Pure Demand Paging?", back: "Starting process execution with NO pages in memory, bringing them in one by one only as they fault and are demanded." },
      { front: "What is the key to reasonable performance in demand paging?", back: "Locality of Reference." },
      { front: "What is Thrashing?", back: "A disadvantage of virtual memory where the system spends more time swapping pages in and out of memory than actually executing code." }
    ],
    quiz: [
      { question: "What is the primary advantage of Virtual Memory?", options: ["It makes the physical RAM run faster.", "Programs can be larger than physical memory.", "It completely eliminates page faults.", "It removes the need for an OS."], answer: 1 },
      { question: "What does a 'Pager' do differently from a 'Swapper'?", options: ["A pager operates on individual pages, while a swapper manipulates entire processes.", "A pager is hardware, a swapper is software.", "A swapper is lazy, a pager is aggressive.", "They are exactly the same thing."], answer: 0 },
      { question: "In the valid-invalid bit scheme, what triggers a page fault trap?", options: ["Valid bit = 1", "Valid bit = 0", "A full TLB", "Compaction"], answer: 1 },
      { question: "What is the first step the OS takes when handling a Page Fault?", options: ["Find a free frame.", "Restart the instruction.", "Schedule a disk operation.", "Check the internal PCB table to ensure it's a valid memory access."], answer: 3 },
      { question: "Which principle makes Demand Paging performance acceptable in practice?", options: ["Pure Demand Paging", "Locality of Reference", "Thrashing", "Context Switching"], answer: 1 },
      { question: "Which of the following is a disadvantage of Virtual Memory?", options: ["Decreased multi-programming.", "Internal fragmentation.", "Thrashing.", "Increased physical memory limits."], answer: 2 }
    ]
  },
  {
    id: 'pagereplacement',
    title: '16. Page Replacement Algorithms',
    notes: {
      intro: {
        title: "1. What is Page Replacement?",
        points: [
          "Whenever a Page Fault occurs, the OS must bring the page from swap-space into a frame.",
          "If the system is highly utilized and all frames are busy, the OS must replace one of the currently allocated pages with the new page.",
          "The Page Replacement Algorithm decides which memory page is swapped out. (AIM: To have the minimum number of page faults)"
        ]
      },
      algorithms: {
        title: "2. Types of Page Replacement Algorithms",
        types: [
          {
            name: "First-In, First-Out (FIFO)",
            desc: "Allocates a frame to the page by replacing the oldest page in memory.",
            points: [
              "Easy to implement.",
              "Performance is not always good: The replaced page might contain heavily used variables initialized early on, causing another immediate page fault.",
              "Suffers from Belady's Anomaly."
            ],
            belady: "Belady's Anomaly: In LRU and Optimal algorithms, increasing frames reduces page faults. But in FIFO, increasing main memory/frames can counter-intuitively INCREASE the number of page faults in some cases."
          },
          {
            name: "Optimal Page Replacement",
            desc: "Replace the page that is never referenced in the future, or referenced farthest in the future.",
            points: [
              "Has the lowest page fault rate among any algorithm.",
              "Difficult/Impossible to implement as the OS requires future knowledge of the reference string (Similar to SJF scheduling)."
            ]
          },
          {
            name: "Least-Recently Used (LRU)",
            desc: "Uses the recent past as an approximation of the near future; replaces the page that has not been used for the longest period.",
            implementations: [
              {
                method: "Counters",
                details: "Associate a time field with each page table entry. Replace the page with the smallest time value."
              },
              {
                method: "Stack",
                details: "Keep a stack of page numbers. When a page is referenced, remove it from the stack and put it on top. Most recently used is always on top, least recently used is on the bottom. (Implemented via Doubly Linked List)"
              }
            ]
          },
          {
            name: "Counting-Based (Reference Counting)",
            desc: "Keeps a counter of the number of references made to each page.",
            subTypes: [
              {
                subName: "Least Frequently Used (LFU)",
                subDesc: "Actively used pages should have a large reference count. Replaces the page with the smallest count."
              },
              {
                subName: "Most Frequently Used (MFU)",
                subDesc: "Based on the argument that the page with the smallest count was probably just brought in and hasn't been used yet. Replaces the page with the largest count."
              }
            ],
            note: "Neither MFU nor LFU replacement is common."
          }
        ]
      }
    },
    flashcards: [
      { front: "What is the primary AIM of a page replacement algorithm?", back: "To have the minimum number of page faults." },
      { front: "What is Belady's Anomaly?", back: "A strange behavior found in the FIFO algorithm where increasing the number of physical frames counter-intuitively INCREASES the number of page faults." },
      { front: "Which algorithm guarantees the lowest possible page fault rate?", back: "Optimal Page Replacement (though it's impossible to implement in reality because it requires knowledge of future references)." },
      { front: "What are the two common ways to implement the LRU algorithm?", back: "1. Counters (using a time field)\n2. Stack (keeping most recently used on top, using a doubly linked list)." },
      { front: "Why is Optimal Page Replacement similar to SJF scheduling?", back: "Because both require knowledge of the future (future memory references for Optimal, and future burst times for Shortest Job First)." },
      { front: "What is the difference between LFU and MFU?", back: "LFU replaces the page with the smallest reference count. MFU replaces the page with the largest reference count (assuming the smallest count was just brought in)." }
    ],
    quiz: [
      { question: "What is the root cause that forces an OS to perform Page Replacement?", options: ["A page hit occurs.", "A page fault occurs and all physical frames are currently busy.", "The user clicks a button.", "The CPU requests data from the cache."], answer: 1 },
      { question: "Which algorithm exhibits Belady's Anomaly?", options: ["LRU", "Optimal", "FIFO", "LFU"], answer: 2 },
      { question: "Why might FIFO have poor performance in some scenarios?", options: ["It replaces the newest page.", "It might replace a heavily used variable that was initialized early in the program.", "It requires a complex stack data structure.", "It predicts the future incorrectly."], answer: 1 },
      { question: "In the Stack implementation of LRU, where is the least recently used page located?", options: ["At the top of the stack.", "At the bottom of the stack.", "In the middle of the stack.", "It is deleted from the stack entirely."], answer: 1 },
      { question: "Which of the following describes the Optimal Page Replacement algorithm?", options: ["Replace the oldest page.", "Replace the page that will not be used for the longest period of time.", "Replace the page with the smallest reference count.", "Replace the page with the smallest time value."], answer: 1 },
      { question: "Why are LFU and MFU not commonly used?", options: ["They are too fast.", "They are difficult to implement and often don't approximate optimal replacement well.", "They suffer from Belady's Anomaly.", "They require future knowledge."], answer: 1 }
    ]
  },
  {
    id: 'thrashing',
    title: '17. Thrashing',
    notes: {
      intro: {
        title: "1. What is Thrashing?",
        desc: "If a process doesn't have the number of frames it needs to support pages in active use, it will quickly page-fault. It replaces pages that will be needed again right away, causing a continuous loop of faulting and replacing.",
        points: [
          "This extremely high paging activity is called Thrashing.",
          "A system is Thrashing when it spends more time servicing page faults than actually executing processes."
        ]
      },
      graph: {
        title: "2. CPU Utilization vs. Degree of Multiprogramming",
        desc: "Initially, as the degree of multiprogramming increases, CPU utilization increases. However, if the degree of multiprogramming becomes too high, processes don't get enough frames, leading to Thrashing. CPU utilization drops drastically as the system spends all its time swapping pages."
      },
      techniques: {
        title: "3. Techniques to Handle Thrashing",
        methods: [
          {
            name: "Working Set Model",
            desc: "Based on the concept of the Locality Model.",
            details: "The principle states: allocate enough frames to a process to accommodate its current locality, and it will only fault when moving to a new locality. If allocated frames are fewer than the current locality's size, the process is bound to thrash."
          },
          {
            name: "Page Fault Frequency (PFF)",
            desc: "Thrashing is characterized by a high page-fault rate, so we want to directly control this rate.",
            details: "Establish upper and lower bounds on the desired page-fault rate. If the pf-rate exceeds the upper limit, allocate the process another frame. If the pf-rate falls below the lower limit, remove a frame from the process. By controlling the pf-rate, thrashing can be prevented."
          }
        ]
      }
    },
    flashcards: [
      { front: "What is Thrashing?", back: "A state where the system spends more time servicing page faults (swapping pages in and out) than executing processes." },
      { front: "What causes Thrashing?", back: "When a process does not have enough frames to support its pages in active use, causing it to continuously page-fault and replace pages it immediately needs again." },
      { front: "In the CPU Utilization vs Degree of Multiprogramming graph, what does Thrashing look like?", back: "CPU utilization increases linearly up to a peak, but then sharply drops off as thrashing begins." },
      { front: "What is the Working Set Model?", back: "A thrashing prevention technique based on the Locality Model. It allocates enough frames to a process to accommodate its current 'locality' to prevent thrashing." },
      { front: "How does the Page Fault Frequency (PFF) technique prevent thrashing?", back: "It establishes upper and lower bounds on the page-fault rate. If the rate is too high, it gives the process another frame. If it's too low, it takes a frame away." }
    ],
    quiz: [
      { question: "What is the primary indicator that a system is Thrashing?", options: ["CPU utilization is at 100%.", "The system spends more time servicing page faults than executing processes.", "There are no page faults occurring.", "The hard drive turns off."], answer: 1 },
      { question: "According to the CPU Utilization graph, what happens when the degree of multiprogramming becomes too high?", options: ["CPU utilization remains flat.", "CPU utilization drops drastically because of thrashing.", "CPU utilization reaches 100% efficiently.", "Processes finish instantly."], answer: 1 },
      { question: "What happens if a process is allocated fewer frames than the size of its current locality?", options: ["The process runs optimally.", "The OS creates more physical RAM.", "The process is bound to thrash.", "The TLB is cleared."], answer: 2 },
      { question: "In the Page Fault Frequency technique, what action is taken if the page-fault rate exceeds the upper limit?", options: ["Kill the process.", "Allocate the process another frame.", "Remove a frame from the process.", "Restart the computer."], answer: 1 },
      { question: "Which thrashing prevention technique is directly based on the 'Locality Model'?", options: ["Page Fault Frequency", "Working Set Model", "Optimal Page Replacement", "Demand Paging"], answer: 1 }
    ]
  }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(courseModules[16].id); // Defaulting to the new module 17 for visibility
  const [activeTab, setActiveTab] = useState('notes');

  const activeModule = courseModules.find(m => m.id === activeModuleId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header & Module Selector */}
        <header className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-100">OS Placement Guide</h1>
              <p className="text-slate-400 mt-1">Structured Module-by-Module Prep</p>
            </div>
          </div>

          {/* Module Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {courseModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => { setActiveModuleId(mod.id); setActiveTab('notes'); }}
                className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeModuleId === mod.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                <FolderOpen size={16} /> {mod.title}
              </button>
            ))}
          </div>
        </header>

        {/* Tab Navigation for Active Module */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-sm w-full md:w-fit mx-auto md:mx-0 overflow-x-auto scrollbar-hide">
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <BookOpen size={16} /> Notes
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'flashcards' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Layers size={16} /> Flashcards ({activeModule.flashcards ? activeModule.flashcards.length : 0})
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <CheckSquare size={16} /> Quiz ({activeModule.quiz ? activeModule.quiz.length : 0})
          </button>
        </div>

        {/* Content Area */}
        <main className="min-h-[500px]">
          {activeTab === 'notes' && <NotesView module={activeModule} />}
          {activeTab === 'flashcards' && <FlashcardsView cards={activeModule.flashcards} key={`fc-${activeModule.id}`} />}
          {activeTab === 'quiz' && <QuizView questions={activeModule.quiz} key={`qz-${activeModule.id}`} />}
        </main>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NotesView({ module }) {
  // Render Module 1: Intro
  if (module.id === 'intro') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Layers className="text-indigo-400" /> System Architecture
          </h2>
          <div className="flex flex-col items-center max-w-sm mx-auto space-y-2">
            <div className="flex flex-col items-center justify-center w-full p-4 bg-slate-800 border-2 border-slate-700 rounded-xl">
              <User className="text-slate-300 mb-2" size={32} />
              <span className="font-semibold text-slate-200">User</span>
            </div>
            <ChevronRight className="rotate-90 text-slate-600" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-blue-900/20 border-2 border-blue-800 rounded-xl">
              <AppWindow className="text-blue-400 mb-2" size={28} />
              <span className="font-semibold text-blue-300">Application Programs</span>
            </div>
            <ChevronRight className="rotate-90 text-slate-600" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-indigo-900/30 border-2 border-indigo-500 rounded-xl shadow-sm">
              <Settings className="text-indigo-400 mb-2" size={28} />
              <span className="font-bold text-indigo-300 text-lg">Operating System</span>
            </div>
            <ChevronRight className="rotate-90 text-slate-600" />
            <div className="flex flex-col items-center justify-center w-full p-4 bg-slate-950 border-2 border-slate-700 rounded-xl">
              <Cpu className="text-slate-400 mb-2" size={28} />
              <span className="font-semibold text-white">Computer Hardware</span>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6">Core Definitions</h2>
            <div className="space-y-6">
              {module.notes.definitions.map((item, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4 text-left">
                  <h3 className="font-bold text-slate-100 text-lg">{item.term}</h3>
                  <p className="text-slate-300 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
              <h2 className="text-xl font-bold text-slate-100 mb-6 text-left">Key OS Functions</h2>
              <ul className="space-y-3 text-left">
                {module.notes.functions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-indigo-900/50 text-indigo-400 p-1 rounded-full shrink-0">
                      <CheckSquare size={14} />
                    </div>
                    <div>
                      <strong className="text-slate-100">{item.title}: </strong>
                      <span className="text-slate-300">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-amber-950/30 rounded-2xl p-8 shadow-sm border border-amber-900/50 text-left">
              <h2 className="text-xl font-bold text-amber-400 mb-4">What if there is no OS?</h2>
              <ul className="space-y-2 list-disc list-inside text-amber-200/80">
                {module.notes.whyOs.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            {module.notes.ipc && (
              <section className="bg-blue-950/30 rounded-2xl p-8 shadow-sm border border-blue-900/50 text-left">
                <h2 className="text-xl font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <Activity className="text-blue-500" /> {module.notes.ipc.title}
                </h2>
                <p className="text-blue-200/80 mb-4">{module.notes.ipc.desc}</p>
                <div className="inline-block bg-blue-900/50 border border-blue-800 text-blue-100 px-4 py-2 rounded-lg font-medium">
                  {module.notes.ipc.methods}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Render Module 2: Types of OS
  if (module.id === 'types') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Cpu className="text-indigo-400" /> Primary Goals of an OS
          </h2>
          <ul className="space-y-3">
            {module.notes.osGoals.map((goal, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="bg-indigo-900/50 text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Operating System Types</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.osTypes.map((type, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-indigo-300 text-lg">{type.name}</h3>
                  {type.examples && <span className="text-xs bg-slate-950 text-slate-400 px-2 py-0.5 rounded font-mono">{type.examples}</span>}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Render Module 3: Multi-Tasking vs Threads
  if (module.id === 'threads') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Core Concepts</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.coreConcepts.map((concept, idx) => (
              <div key={idx} className="border-l-4 border-emerald-500 pl-4 bg-slate-800/30 p-3 rounded-r-xl">
                <h3 className="font-bold text-slate-100">{concept.term}</h3>
                <p className="text-slate-300 text-sm mt-1">{concept.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden text-left">
          <div className="p-6 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-xl font-bold text-slate-100">Multi-Tasking vs Multi-Threading</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-sm">
                  <th className="p-4 border-b border-slate-700 font-semibold w-1/4">Feature</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-indigo-300">Multi-Tasking</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-emerald-300">Multi-Threading</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.multitaskingVsThreading.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 border-b border-slate-800 font-medium text-slate-200 align-top">{row.feature}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.tasking}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.threading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden text-left">
          <div className="p-6 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-xl font-bold text-slate-100">Context Switching (Thread vs Process)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-sm">
                  <th className="p-4 border-b border-slate-700 font-semibold w-1/4">Feature</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-indigo-300">Thread Context Switch</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-emerald-300">Process Context Switch</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.contextSwitching.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 border-b border-slate-800 font-medium text-slate-200 align-top">{row.feature}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.thread}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.process}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  // Render Module 4: Components of OS
  if (module.id === 'components') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Core Components</h2>
          <div className="space-y-4">
            {module.notes.coreComponents.map((comp, idx) => (
              <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-bold text-slate-200 text-lg">{comp.term}</h3>
                <p className="text-slate-300 text-sm mt-1">{comp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Kernel Functions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.kernelFunctions.map((func, idx) => (
              <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h3 className="font-bold text-emerald-400 mb-2">{func.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{func.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">I/O Management Techniques</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {module.notes.ioTechniques.map((tech, idx) => (
              <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h3 className="font-bold text-indigo-400 mb-2">{tech.term}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Types of Kernels</h2>
          <div className="space-y-4">
            {module.notes.kernelTypes.map((k, idx) => (
              <div key={idx} className="bg-slate-800/20 p-5 rounded-xl border border-slate-800 hover:border-indigo-500/30 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-slate-200 text-lg">{k.type}</h3>
                  {k.examples && <span className="text-xs bg-slate-950 text-slate-400 px-3 py-1 rounded font-mono">{k.examples}</span>}
                </div>
                <p className="text-slate-300 text-sm mb-3 leading-relaxed">{k.desc}</p>
                <div className="grid md:grid-cols-2 gap-2 text-xs">
                  <div className="bg-emerald-950/20 border border-emerald-900/30 p-2.5 rounded-lg text-emerald-300"><strong className="block mb-1 text-emerald-400">Pros:</strong> {k.pros}</div>
                  <div className="bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg text-red-300"><strong className="block mb-1 text-red-400">Cons:</strong> {k.cons}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Render Module 5: System Calls
  if (module.id === 'syscalls') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Overview and Diagram */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Overview Text */}
            <div className="flex-1 space-y-4 text-left">
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Terminal className="text-indigo-400" /> What are System Calls?
              </h2>
              <p className="text-slate-300 leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-950/20 py-2">
                {module.notes.overview.definition}
              </p>
              
              <div className="bg-red-950/30 border border-red-900/50 p-4 rounded-xl text-red-200">
                <strong className="text-red-400 block mb-1">Crucial Concept:</strong>
                {module.notes.overview.keyFact}
              </div>

              <div className="space-y-2 mt-4 text-sm text-slate-400">
                <p><strong className="text-slate-300">Implementation:</strong> {module.notes.overview.implementation}</p>
                <p><strong className="text-slate-300">Wrappers:</strong> {module.notes.overview.wrapperExample}</p>
              </div>
            </div>

            {/* Transition Diagram (User/Kernel) */}
            <div className="w-full lg:w-72 shrink-0 bg-slate-950 border border-slate-800 rounded-xl p-5 shadow-inner">
              <h3 className="text-center font-bold text-slate-400 text-sm uppercase tracking-widest mb-4">Architecture Mode</h3>
              
              {/* User Mode Section */}
              <div className="space-y-2 mb-2 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-blue-500 rounded-full"></div>
                <div className="text-xs font-bold text-blue-400 mb-1 ml-2 text-left">USER MODE</div>
                <div className="bg-slate-800 border border-slate-700 py-2 text-center rounded-lg text-slate-200 text-sm font-medium">User App</div>
                <div className="bg-slate-800 border border-slate-700 py-2 text-center rounded-lg text-slate-200 text-sm font-medium">Glibc</div>
              </div>

              {/* Software Interrupt Boundary */}
              <div className="py-3 flex items-center gap-2">
                <div className="flex-1 h-px bg-slate-700"></div>
                <div className="flex flex-col items-center justify-center text-indigo-400 text-xs font-bold whitespace-nowrap bg-indigo-950/50 px-2 py-1 rounded border border-indigo-900/50">
                  <ArrowDownUp size={14} className="mb-1" />
                  Software Interrupt
                </div>
                <div className="flex-1 h-px bg-slate-700"></div>
              </div>

              {/* Kernel Mode Section */}
              <div className="space-y-2 mt-2 relative">
                <div className="absolute -left-2 top-0 bottom-0 w-1 bg-emerald-500 rounded-full"></div>
                <div className="text-xs font-bold text-emerald-400 mb-1 ml-2 text-left">KERNEL MODE</div>
                <div className="bg-slate-800 border border-slate-700 py-2 text-center rounded-lg text-slate-200 text-sm font-medium">System Call Interface (SCI)</div>
                <div className="bg-slate-800 border border-slate-700 py-2 text-center rounded-lg text-slate-200 text-sm font-medium">Kernel</div>
                <div className="bg-slate-900 border border-slate-700 py-2 text-center rounded-lg text-slate-400 text-sm font-medium">Hardware</div>
              </div>
            </div>

          </div>
        </section>

        {/* Categories Grid */}
        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden p-8 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Layers className="text-emerald-400" /> Types of System Calls
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {module.notes.typesOfSyscalls.map((type, idx) => (
                <div key={idx} className="bg-slate-800 border border-slate-700 p-4 rounded-xl hover:border-emerald-500/50 transition-colors">
                  <h3 className="font-bold text-emerald-400 mb-2">{type.category}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{type.items}</p>
                </div>
             ))}
          </div>
        </section>

        {/* Windows vs Unix Table */}
        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden text-left">
          <div className="p-6 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Code className="text-blue-400" /> Windows vs Unix System Calls
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-sm">
                  <th className="p-4 border-b border-slate-700 font-semibold w-1/4">Category</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-blue-300">Windows</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-emerald-300">Unix</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.comparisonTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/80 transition-colors">
                    <td className="p-4 border-b border-slate-800 font-medium text-slate-200 align-top">{row.category}</td>
                    <td className="p-4 border-b border-slate-800 align-top">
                      <div className="flex flex-wrap gap-1">
                        {row.win.split(', ').map((cmd, i) => (
                           <span key={i} className="font-mono text-slate-400 bg-slate-950/50 px-2 py-0.5 rounded text-xs">{cmd}</span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-800 align-top">
                      <div className="flex flex-wrap gap-1">
                         {row.unix.split(', ').map((cmd, i) => (
                           <span key={i} className="font-mono text-slate-400 bg-slate-950/50 px-2 py-0.5 rounded text-xs">{cmd}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 6: The Boot Process
  if (module.id === 'boot') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Boot Flowchart/Diagram */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="text-rose-400" /> What happens during boot?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
            <div className="flex flex-col items-center justify-center p-3 bg-slate-800 border border-slate-700 rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-rose-300 text-sm">Power On</span>
              <span className="text-[10px] text-slate-500 mt-1">System initialized</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-slate-800 border border-slate-700 rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-indigo-300 text-sm">BIOS / UEFI</span>
              <span className="text-[10px] text-slate-500 mt-1">Runs POST</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-indigo-950/40 border-2 border-indigo-500 rounded-lg w-full md:w-40 text-center shadow-lg">
              <span className="font-bold text-indigo-200 text-sm">MBR / Disk</span>
              <span className="text-[10px] text-indigo-400 mt-1">Reads first sector</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-slate-800 border border-slate-700 rounded-lg w-full md:w-40 text-center">
              <span className="font-semibold text-emerald-300 text-sm">Bootloader</span>
              <span className="text-[10px] text-slate-500 mt-1">Loads kernel</span>
            </div>
            <ChevronRight className="rotate-90 md:rotate-0 text-indigo-500 shrink-0" size={24} />
            
            <div className="flex flex-col items-center justify-center p-3 bg-emerald-950/20 border border-emerald-800 rounded-lg w-full md:w-40 text-center">
              <span className="font-bold text-emerald-400 text-sm">Operating System</span>
              <span className="text-[10px] text-emerald-500 mt-1">User space ready</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm mt-4 italic">
            The MBR (Master Boot Record) helps the computer find and start the operating system by specifying boot sectors and partition parameters.
          </p>
        </section>

        {/* Step-by-step Timeline */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-8 flex items-center gap-2">
            <Power className="text-rose-400" /> Detail: System Startup Steps
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[1.15rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-rose-500/50 before:via-indigo-500/50 before:to-emerald-500/50">
            {module.notes.steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-indigo-400 text-slate-400 group-hover:text-indigo-400 flex items-center justify-center shrink-0 z-10 transition-colors font-bold shadow-sm">
                  {idx + 1}
                </div>
                <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex-1 hover:border-slate-600 transition-colors">
                  <h3 className="font-bold text-slate-200 mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's inside the MBR? */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Server className="text-indigo-400" /> What's inside the MBR?
          </h2>
          <p className="text-slate-300 text-sm mb-6">
            Traditionally, the MBR occupies the <strong>first 512 bytes</strong> of the storage disk. Its internal layout is strictly structured:
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-800 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-blue-300 text-sm">1. Bootloader Code</span>
                <span className="text-xs bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded font-mono">446 bytes</span>
              </div>
              <p className="text-xs text-slate-400">Small program executed by BIOS to locate and run the secondary bootloader/OS kernel.</p>
            </div>
            
            <div className="bg-slate-800 border-l-4 border-indigo-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-indigo-300 text-sm">2. Partition Table</span>
                <span className="text-xs bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded font-mono">64 bytes</span>
              </div>
              <p className="text-xs text-slate-400">Contains info for up to 4 primary partitions (start/end sectors, size, bootable flag).</p>
            </div>

            <div className="bg-slate-800 border-l-4 border-emerald-500 p-4 rounded-r-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-emerald-300 text-sm">3. Boot Signature</span>
                <span className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-mono">2 bytes</span>
              </div>
              <p className="text-xs text-slate-400">Usually set to <code className="text-emerald-400">0x55AA</code>. Tells the BIOS/UEFI that the sector is bootable.</p>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Visual 512-Byte MBR Map</span>
            <div className="flex text-center text-xs font-mono font-bold text-white rounded-lg overflow-hidden border border-slate-700">
              <div className="bg-blue-600/80 py-3 w-[87%] border-r border-slate-800">Bootloader Code (446B)</div>
              <div className="bg-indigo-600/80 py-3 w-[11.5%] border-r border-slate-800">Partition Table (64B)</div>
              <div className="bg-emerald-600/80 py-3 w-[1.5%]">Sig (2B)</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-slate-200 mb-2">Example Scenario:</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                Suppose a storage disk contains a <strong>Windows partition</strong> and a <strong>Linux partition</strong>. The MBR partition table stores exactly where these partitions begin on the disk plates and which partition is marked as "active" (bootable) to let the boot code know where to hand off execution.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-200 mb-2">Modern Systems & GPT:</h3>
              <p className="text-slate-400 leading-relaxed text-xs">
                Many modern systems use <strong>GPT (GUID Partition Table)</strong> instead of MBR. GPT is superior because it:
              </p>
              <ul className="list-disc list-inside text-xs text-slate-400 mt-2 space-y-1">
                <li>Supports disks larger than 2 Terabytes (TB)</li>
                <li>Allows more than 4 primary partitions (up to 128)</li>
                <li>Includes backup partition tables for reliability</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Hardware & Firmware */}
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <HardDrive className="text-indigo-400" /> Key Hardware & Firmware
            </h2>
            <div className="space-y-4">
              {module.notes.definitions.map((def, idx) => (
                <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-bold text-slate-200 text-lg">{def.term}</h3>
                  <p className="text-slate-400 mt-1 text-sm">{def.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* OS Bootloaders */}
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
             <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Terminal className="text-emerald-400" /> OS Bootloaders
            </h2>
            <div className="grid gap-3">
              {module.notes.bootloaders.map((boot, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
                   <span className="font-bold text-slate-300">{boot.os}</span>
                   <span className="font-mono text-sm bg-slate-950/50 text-emerald-400 px-3 py-1 rounded-full">{boot.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Exam Prep Key Concept Block */}
        <section className="bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-300 mb-2">Exam Checkpoint</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong>MBR (Master Boot Record)</strong> is the first sector of a storage disk containing boot code and partition information used during system startup. Remember its exact 512-byte structure breakdown (446 bytes code + 64 bytes partitions + 2 bytes signature) for MCQ/theory exams!
          </p>
        </section>

      </div>
    );
  }

  // Render Module 7: 32-Bit vs. 64-Bit OS
  if (module.id === 'arch') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Core Differences Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Cpu className="text-indigo-400" /> Registers & Data Processing
            </h2>
            <div className="space-y-4">
              {module.notes.registers.map((reg, idx) => (
                <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-slate-200">{reg.title}</h3>
                    <span className="text-xs bg-indigo-900/40 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold">{reg.bytes} / cycle</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{reg.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-300 block mb-1">Performance Insight:</strong>
              Because 64-bit registers are twice as large, they process double the data per instruction cycle, yielding huge math & execution speedups.
            </div>
          </section>

          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <HardDrive className="text-emerald-400" /> Addressable Memory Limits
              </h2>
              <div className="space-y-4">
                {module.notes.memory.map((mem, idx) => (
                  <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-slate-200">{mem.term}</h3>
                      <span className="text-xs bg-emerald-900/40 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">{mem.value} max</span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{mem.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 bg-indigo-950/30 border border-indigo-900/50 p-4 rounded-xl text-indigo-300 text-xs leading-relaxed">
              <strong className="text-indigo-400 block mb-1">Why the 4GB limit?</strong>
              A 32-bit OS can only reference 2<sup>32</sup> distinct addresses. 2<sup>32</sup> bytes = exactly 4,294,967,296 bytes (4 GB). Beyond this, the CPU has no way to point to physical memory locations!
            </div>
          </section>
        </div>

        {/* Key Advantages */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <CheckSquare className="text-rose-400" /> Key Advantages of 64-Bit Architecture
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {module.notes.advantages.map((adv, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-rose-300 mb-2">{adv.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Interview Prep Card */}
        <section className="bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-300 mb-2">Interview Summary</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            If asked the difference: <span className="italic text-white">"A 32-bit OS is limited to 4GB of RAM and processes 4 bytes per cycle, whereas a 64-bit OS can address virtually unlimited RAM and processes 8 bytes per cycle, making it vastly superior for performance and heavy resource usage."</span>
          </p>
        </section>

      </div>
    );
  }

  // Render Module 8: Storage Devices Basics
  if (module.id === 'storage') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Memory Hierarchy Pyramid */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Layers className="text-indigo-400" /> The Memory Hierarchy
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Computer memory is structured like a pyramid: storage at the top is extremely fast, small, and expensive, while storage at the bottom is slow, massive, and cheap.
          </p>

          <div className="flex flex-col items-center max-w-md mx-auto space-y-2 mb-6">
            {/* Registers (Top) */}
            <div className="w-full bg-rose-950/40 border-2 border-rose-500 rounded-lg p-3 text-center shadow-lg transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-rose-300 text-sm block">1. Registers (Inside CPU)</span>
              <span className="text-[10px] text-slate-400">Speed: Sub-nanosecond | Size: Bytes | Cost: Extremely High</span>
            </div>
            
            <ChevronRight className="rotate-90 text-slate-600 shrink-0" size={16} />

            {/* Cache */}
            <div className="w-[90%] bg-indigo-950/40 border-2 border-indigo-500 rounded-lg p-3 text-center shadow-md transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-indigo-300 text-sm block">2. Cache (SRAM, Next to CPU)</span>
              <span className="text-[10px] text-slate-400">Speed: Nanoseconds | Size: Megabytes (MB) | Cost: High</span>
            </div>
            
            <ChevronRight className="rotate-90 text-slate-600 shrink-0" size={16} />

            {/* RAM */}
            <div className="w-[80%] bg-blue-950/40 border-2 border-blue-500 rounded-lg p-3 text-center shadow-md transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-blue-300 text-sm block">3. Main Memory (RAM / DRAM)</span>
              <span className="text-[10px] text-slate-400">Speed: 10-50ns | Size: Gigabytes (GB) | Cost: Medium</span>
            </div>
            
            <ChevronRight className="rotate-90 text-slate-600 shrink-0" size={16} />

            {/* Secondary Storage */}
            <div className="w-[70%] bg-slate-800 border-2 border-slate-700 rounded-lg p-3 text-center transform hover:scale-[1.02] transition-transform">
              <span className="font-bold text-slate-200 text-sm block">4. Secondary Storage (SSDs/HDDs)</span>
              <span className="text-[10px] text-slate-400">Speed: Milliseconds | Size: Terabytes (TB) | Cost: Low</span>
            </div>
          </div>
        </section>

        {/* Detailed Descriptions Grid */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 text-left">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Detailed Memory Levels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-indigo-400 text-lg border-b border-slate-800 pb-2">Primary Memory</h3>
              {module.notes.hierarchy.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="text-slate-200">{item.level}</strong>
                    <span className="text-[10px] bg-slate-950 text-indigo-300 px-2 py-0.5 rounded font-mono">{item.size}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-emerald-400 text-lg border-b border-slate-800 pb-2">Secondary Memory</h3>
              <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 h-full flex flex-col justify-between">
                <div>
                  <strong className="text-slate-200 block mb-2">Long-term Permanent Storage</strong>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    Unlike primary memory, secondary memory stores data permanently. Modern systems divide these into:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                    <li><strong>Electronic Disks:</strong> SSDs, USB Flash Drives</li>
                    <li><strong>Magnetic Disks:</strong> HDDs (Hard Disk Drives)</li>
                    <li><strong>Optical Disks:</strong> CDs, DVDs, Blu-rays</li>
                    <li><strong>Magnetic Tapes:</strong> Enterprise back-ups</li>
                  </ul>
                </div>
                <div className="mt-4 text-[10px] text-slate-500 italic">
                  *Secondary memory can be thousands of times slower to access than CPU registers but holds millions of times more storage.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trade-offs Comparisons */}
        <section className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 overflow-hidden text-left">
          <div className="p-6 border-b border-slate-800 bg-slate-800/50">
            <h2 className="text-xl font-bold text-slate-100">Trade-offs Comparisons (Primary vs Secondary)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-800 text-slate-300 text-sm">
                  <th className="p-4 border-b border-slate-700 font-semibold w-1/4">Factor</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-indigo-300">Primary Memory</th>
                  <th className="p-4 border-b border-slate-700 font-semibold w-3/8 text-emerald-300">Secondary Storage</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {module.notes.comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 border-b border-slate-800 font-medium text-slate-200 align-top">{row.factor}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.primary}</td>
                    <td className="p-4 border-b border-slate-800 text-slate-300 align-top">{row.secondary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Volatility Highlight Block */}
        <section className="bg-amber-950/20 border border-amber-900/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-amber-400 mb-2 flex items-center gap-2">
            <Activity className="text-amber-500" /> Volatility Check
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <strong className="text-amber-300 block mb-1">Volatile (RAM, Cache, Registers)</strong>
              Requires electrical currents to sustain states. Data is wiped instantly when power is cut.
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <strong className="text-emerald-400 block mb-1">Non-Volatile (SSD, HDD, Flash Drives)</strong>
              Stores data physically or magnetically. Retains records permanently even when power is turned off.
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render Module 9: Intro to Process
  if (module.id === 'process') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Program vs Process */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
            <Activity className="text-indigo-400" /> Program vs. Process
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            The easiest way to understand this is the difference between a <strong>recipe (Program)</strong> and <strong>baking the cake (Process)</strong>.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl">
              <span className="text-xs bg-slate-950 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Program</span>
              <h3 className="font-bold text-slate-200 text-lg mb-1">Passive & Static</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Compiled binary code sitting passively on your hard drive (disk). It is just a file waiting to be executed.
              </p>
            </div>
            <div className="bg-slate-800/50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <span className="text-xs bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Process</span>
              <h3 className="font-bold text-indigo-300 text-lg mb-1">Active & Dynamic</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                A program currently under execution. It is loaded into the RAM (primary memory) and actively utilizes hardware resources like the CPU.
              </p>
            </div>
          </div>
        </section>

        {/* Process Creation Steps */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Layers className="text-indigo-400" /> How the OS Creates a Process
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {module.notes.steps.map((step, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl flex flex-col relative">
                <div className="absolute -top-3 -left-2 bg-indigo-600 text-white font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-sm">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-slate-200 text-sm mb-1 mt-1">{step.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed flex-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture of Process */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Terminal className="text-emerald-400" /> Process Memory Layout
            </h2>
            
            {/* Memory Stack Layout Representation */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col space-y-2 max-w-sm mx-auto shadow-inner relative">
              <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-800 pb-1 mb-2">High Memory Addresses</div>
              
              {/* Stack Block */}
              <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3 text-center">
                <span className="font-bold text-slate-200 text-sm block">Stack</span>
                <span className="text-[10px] text-slate-400 block">Local variables & function arguments</span>
                <span className="text-[9px] text-indigo-400 mt-1 block">↓ Grows Downward ↓</span>
              </div>
              
              {/* Free Space */}
              <div className="h-8 border border-dashed border-slate-800 rounded-lg flex items-center justify-center text-[10px] text-slate-600">
                Shared Free Address Space
              </div>

              {/* Heap Block */}
              <div className="bg-slate-800 border-2 border-slate-700 rounded-lg p-3 text-center">
                <span className="text-[9px] text-emerald-400 mb-1 block">↑ Grows Upward ↑</span>
                <span className="font-bold text-slate-200 text-sm block">Heap</span>
                <span className="text-[10px] text-slate-400 block">Dynamic allocations (malloc/new)</span>
              </div>

              {/* Data Block */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-center">
                <span className="font-bold text-slate-200 text-sm block">Data</span>
                <span className="text-[10px] text-slate-400 block">Global & static data</span>
              </div>

              {/* Text Block */}
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-center">
                <span className="font-bold text-slate-200 text-sm block">Text</span>
                <span className="text-[10px] text-slate-400 block">Compiled instructions (read-only)</span>
              </div>
              
              <div className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest border-t border-slate-800 pt-1 mt-2">Low Memory Addresses</div>
            </div>
          </section>

          {/* PCB Section */}
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Server className="text-indigo-400" /> Process Control Block (PCB)
              </h2>
              <p className="text-slate-400 text-xs mb-6">
                All processes are tracked by the OS in a <strong>Process Table</strong> where each entry is a <strong>PCB</strong>. Think of the PCB as the process's official ID profile.
              </p>

              {/* PCB Fields Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {module.notes.pcb.map((item, idx) => (
                  <div key={idx} className="bg-slate-850 border border-slate-800 p-2.5 rounded-lg">
                    <strong className="text-indigo-300 block mb-0.5">{item.attr}</strong>
                    <span className="text-slate-400 text-[11px] leading-tight block">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Registers in PCB Context Switching */}
        <section className="bg-indigo-950/30 border border-indigo-500/50 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
            <Cpu className="text-indigo-400" /> Deep Dive: Registers in the PCB & Context Switching
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Since CPU cores rapidly cycle between multiple active processes (Time Sharing), the OS must store the execution status when swapping processes out:
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850">
              <strong className="text-rose-400 block mb-1">Swapping Out (Pause)</strong>
              When a process's time slice expires, the OS copies all register values from the CPU registers and saves them into the process's PCB before pausing it.
            </div>
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850">
              <strong className="text-emerald-400 block mb-1">Swapping In (Resume)</strong>
              When the scheduler selects this process to execute again, the OS reads the register values from its PCB and writes them back to the CPU hardware registers, resuming execution seamlessly.
            </div>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 10: Process States & Queues
  if (module.id === 'states') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* State Transition Diagram */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="text-rose-400" /> State Transition Diagram
          </h2>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            As a process executes, it transitions through different states. Click or hover on the states to learn more about the life cycle.
          </p>

          {/* Graphical State Flowchart (Authentic Transition Diagram) */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex justify-center items-center shadow-inner overflow-x-auto">
            <svg viewBox="0 0 800 320" className="w-full min-w-[700px] text-xs font-semibold">
              <defs>
                {/* Glow Filter */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                
                {/* Arrow Marker Definitions */}
                <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6366f1" />
                </marker>
                <marker id="arrow-rose" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
                </marker>
                <marker id="arrow-slate" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#94a3b8" />
                </marker>
                <marker id="arrow-amber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f59e0b" />
                </marker>
                <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
                </marker>
              </defs>

              {/* Connections (Lines and Curves) */}
              
              {/* New -> Ready (Admitted) */}
              <path d="M 125 100 L 202 100" stroke="#94a3b8" strokeWidth="2" fill="none" markerEnd="url(#arrow-slate)" />
              <text x="165" y="90" textAnchor="middle" fill="#94a3b8" className="font-mono text-[10px]">admitted</text>

              {/* Ready -> Running (Scheduler Dispatch) */}
              <path d="M 312 90 L 480 90" stroke="#6366f1" strokeWidth="2" fill="none" markerEnd="url(#arrow-indigo)" />
              <text x="396" y="80" textAnchor="middle" fill="#a5b4fc" className="font-mono text-[10px]">scheduler dispatch</text>

              {/* Running -> Ready (Interrupt Curve) */}
              <path d="M 480 110 Q 396 150 312 110" stroke="#f43f5e" strokeWidth="2" fill="none" markerEnd="url(#arrow-rose)" />
              <text x="396" y="145" textAnchor="middle" fill="#fda4af" className="font-mono text-[10px]">interrupt</text>

              {/* Running -> Terminated (Exit) */}
              <path d="M 590 100 L 667 100" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow-emerald)" />
              <text x="630" y="90" textAnchor="middle" fill="#6ee7b7" className="font-mono text-[10px]">exit</text>

              {/* Running -> Waiting (I/O or event wait) */}
              <path d="M 525 125 L 460 212" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-amber)" />
              <text x="515" y="175" textAnchor="start" fill="#fcd34d" className="font-mono text-[10px]">I/O or event wait</text>

              {/* Waiting -> Ready (I/O or event completion) */}
              <path d="M 340 215 L 275 127" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrow-emerald)" />
              <text x="280" y="175" textAnchor="end" fill="#6ee7b7" className="font-mono text-[10px]">I/O or event completion</text>

              {/* Nodes (States) */}
              
              {/* New Node */}
              <g className="cursor-pointer group">
                <rect x="35" y="75" width="90" height="50" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" className="transition-colors group-hover:fill-slate-800" />
                <text x="80" y="100" textAnchor="middle" alignmentBaseline="central" fill="#f8fafc" className="font-bold">NEW</text>
                <text x="80" y="115" textAnchor="middle" fill="#64748b" className="text-[8px]">Admitted next</text>
              </g>

              {/* Ready Node */}
              <g className="cursor-pointer group">
                <rect x="210" y="75" width="100" height="50" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" className="transition-colors group-hover:fill-indigo-950" />
                <text x="260" y="100" textAnchor="middle" alignmentBaseline="central" fill="#e0e7ff" className="font-bold">READY</text>
                <text x="260" y="115" textAnchor="middle" fill="#818cf8" className="text-[8px]">In RAM / Wait CPU</text>
              </g>

              {/* Running Node */}
              <g className="cursor-pointer group">
                <rect x="490" y="75" width="100" height="50" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" className="transition-colors group-hover:fill-rose-950" />
                <text x="540" y="100" textAnchor="middle" alignmentBaseline="central" fill="#ffe4e6" className="font-bold">RUNNING</text>
                <text x="540" y="115" textAnchor="middle" fill="#fb7185" className="text-[8px]">Executing instructions</text>
              </g>

              {/* Terminated Node */}
              <g className="cursor-pointer group">
                <rect x="675" y="75" width="90" height="50" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" className="transition-colors group-hover:fill-emerald-950" />
                <text x="720" y="100" textAnchor="middle" alignmentBaseline="central" fill="#d1fae5" className="font-bold">TERMINATED</text>
                <text x="720" y="115" textAnchor="middle" fill="#34d399" className="text-[8px]">De-allocated</text>
              </g>

              {/* Waiting Node */}
              <g className="cursor-pointer group">
                <rect x="340" y="215" width="120" height="50" rx="8" fill="#78350f" stroke="#f59e0b" strokeWidth="2" className="transition-colors group-hover:fill-amber-950" />
                <text x="400" y="240" textAnchor="middle" alignmentBaseline="central" fill="#fef3c7" className="font-bold">WAITING</text>
                <text x="400" y="255" textAnchor="middle" fill="#fbbf24" className="text-[8px]">Blocked on I/O</text>
              </g>
            </svg>
          </div>
        </section>

        {/* Process States Descriptions */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6">The 5 Process States</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {module.notes.statesList.map((state, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl">
                <h3 className="font-bold text-slate-200 text-sm mb-2 pb-1 border-b border-slate-700">{state.name}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed">{state.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Queues & Schedulers */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Queues */}
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Layers className="text-indigo-400" /> Process Queues
              </h2>
              <div className="space-y-4">
                {module.notes.queues.map((q, idx) => (
                  <div key={idx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-indigo-300 text-sm">{q.name}</h3>
                      <span className="text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded font-mono">{q.memory}</span>
                    </div>
                    <p className="text-slate-400 text-xs mb-2 leading-relaxed">{q.desc}</p>
                    <div className="text-[10px] text-slate-500">
                      <strong>Scheduler:</strong> {q.scheduler}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Schedulers & Dispatcher */}
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Cpu className="text-emerald-400" /> Schedulers & Dispatchers
              </h2>
              <div className="space-y-4">
                {module.notes.schedulerDetails.map((detail, idx) => (
                  <div key={idx} className="bg-slate-850 border border-slate-800 p-3 rounded-lg">
                    <strong className="text-emerald-400 text-xs block mb-1">{detail.term}</strong>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{detail.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Quick Review Card */}
        <section className="bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-6 text-left">
          <h2 className="text-lg font-bold text-indigo-300 mb-2">Interview Checklist</h2>
          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li><strong>Waiting State Destination:</strong> After I/O completion, a process goes back to the <strong>Ready Queue</strong> (NOT straight to the Running state).</li>
            <li><strong>Multi-programming:</strong> The <strong>Long-Term Scheduler (LTS)</strong> determines how many processes occupy RAM (Degree of Multi-programming).</li>
            <li><strong>STS vs. Dispatcher:</strong> The STS <strong>decides</strong> who gets CPU time; the Dispatcher <strong>executes</strong> the actual context switch.</li>
          </ul>
        </section>

      </div>
    );
  }

  // Render Module 11: Swapping & Context-Switching
  if (module.id === 'swap') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Swapping (MTS) */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-2 flex items-center gap-2">
            <FolderOpen className="text-indigo-400" /> Swapping & Memory Management
          </h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            When Main Memory (RAM) becomes full (overcommitted), the OS must free up space by moving processes to disk. This is managed by the <strong>Medium-Term Scheduler (MTS)</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl">
              <span className="text-xs bg-red-950 text-red-400 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Swap-Out</span>
              <h3 className="font-bold text-slate-200 text-base mb-1">RAM ➔ Secondary Storage (Disk)</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Kicks a partially executed, inactive process out of RAM to the hard drive, freeing up memory space for active or higher-priority processes. Directly decreases the degree of multi-programming.
              </p>
            </div>
            <div className="bg-slate-800/50 border-l-4 border-indigo-500 p-5 rounded-r-xl">
              <span className="text-xs bg-emerald-950 text-emerald-400 px-2.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider block w-fit mb-2">Swap-In</span>
              <h3 className="font-bold text-indigo-300 text-base mb-1">Secondary Storage (Disk) ➔ RAM</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Brings the swapped-out process back from disk into RAM when space becomes available, allowing it to resume execution exactly where it left off.
              </p>
            </div>
          </div>
        </section>

        {/* Context Switching & Overhead */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Cpu className="text-rose-400" /> Context-Switching (Pure Overhead)
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">
            <div className="flex-1 bg-slate-800/30 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-200 text-base mb-2">How Context-Switching Works:</h3>
                <ol className="list-decimal list-inside text-xs text-slate-400 space-y-2 leading-relaxed">
                  <li>The CPU stops executing <strong>Process A</strong> due to an interrupt (e.g. time slice expiration).</li>
                  <li>The kernel copies CPU hardware register states and saves them into <strong>Process A's PCB</strong>.</li>
                  <li>The kernel selects <strong>Process B</strong> from the Ready Queue and loads its saved register values from its <strong>PCB</strong> back into CPU registers.</li>
                  <li>Control of the CPU is passed to the dispatcher, and Process B resumes execution.</li>
                </ol>
              </div>
            </div>

            <div className="w-full lg:w-80 bg-red-950/20 border border-red-900/50 p-6 rounded-xl flex flex-col justify-between">
              <div>
                <strong className="text-red-400 text-sm block mb-1">Why is it "Pure Overhead"?</strong>
                <p className="text-red-200/80 text-xs leading-relaxed">
                  While context switching is happening, the CPU is not doing any actual application or user-facing workload. It is purely OS administrative task work.
                </p>
              </div>
              <div className="mt-4 text-[10px] text-red-300 font-mono italic">
                *Switching speed depends on memory speed, number of registers, and hardware configurations.
              </div>
            </div>
          </div>
        </section>

        {/* Orphan vs Zombie Process Comparison */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="text-amber-400" /> Orphan vs. Zombie Processes
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Orphan */}
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-200 text-lg">Orphan Process</h3>
                  <span className="text-[10px] bg-slate-950 text-sky-300 px-2 py-0.5 rounded font-mono font-bold">Parent Dead / Child Alive</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Occurs when a parent process finishes executing or crashes, leaving its child process actively running.
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px]">
                  <strong className="text-sky-400 block mb-0.5">OS Remedy: Adoption</strong>
                  Orphan processes are automatically adopted by the <code className="text-sky-300">init</code> process (PID 1, the root process of the OS).
                </div>
              </div>
            </div>

            {/* Zombie */}
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-200 text-lg">Zombie (Defunct) Process</h3>
                  <span className="text-[10px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">Child Dead / Parent Alive</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  A child process that has finished execution but still takes up an entry (a "nametag" or PCB record) in the OS Process Table.
                </p>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px]">
                  <strong className="text-amber-400 block mb-0.5">OS Remedy: Reaping</strong>
                  The parent must read the child's exit status using <code className="text-amber-300">wait()</code>. Once completed, the zombie is deleted. This is known as **reaping the zombie**.
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Analogy Section */}
        <section className="bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-8 shadow-sm text-left">
          <h2 className="text-xl font-bold text-indigo-300 mb-6 flex items-center gap-2">
            <BookOpen className="text-indigo-400" /> Mental Model: The Restaurant Kitchen Analogy
          </h2>
          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p className="text-base font-medium">Imagine your computer is a busy restaurant:</p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li><strong>The CPU</strong> is the <strong>Head Chef</strong>.</li>
              <li><strong>The RAM</strong> is the <strong>Kitchen Counter</strong>.</li>
              <li><strong>The Hard Drive</strong> is the <strong>Pantry/Fridge</strong>.</li>
              <li><strong>A Process</strong> is a <strong>Dish/Order</strong> being prepared.</li>
            </ul>
            
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
              <strong className="text-rose-400 block mb-2 text-base">1. Context-Switching (Switching between orders)</strong>
              The Chef is cooking a Burger. A VIP Pizza order comes in. The Chef writes down exactly what step they were on for the Burger on a sticky note (saving state), cooks the Pizza, and then resumes the Burger using the sticky note. That action of swapping notes is Context-Switching.
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
              <strong className="text-emerald-400 block mb-2 text-base">2. Swapping (Making room on the counter)</strong>
              The Counter (RAM) is full of ingredients. The manager moves ingredients for a non-urgent Soup to the Fridge (Hard Drive) to clear space (Swap-Out). Later, they bring the Soup ingredients back to the Counter when there is room (Swap-In).
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
              <strong className="text-sky-400 block mb-2 text-base">3. Orphan Process (Parent leaves)</strong>
              A Master Chef hires an Assistant to chop onions, but then the Master Chef's shift ends and they go home. The Assistant is left chopping onions with no boss. The Restaurant Manager (OS 'init' process) steps in to adopt the Assistant.
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-colors">
              <strong className="text-amber-400 block mb-2 text-base">4. Zombie Process (Parent ignores)</strong>
              The Assistant finishes boiling water and says "I'm done!", but the Master Chef is busy and ignores them. The Assistant is dead (finished) but still standing there taking up space waiting to be acknowledged. Once acknowledged, the Zombie is "reaped".
            </div>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 12: Intro to Process Scheduling
  if (module.id === 'scheduling') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Intro to Scheduling */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="text-indigo-400" /> Process Scheduling Fundamentals
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.scheduling.map((item, idx) => (
              <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <h3 className="font-bold text-slate-200 text-base mb-2">{item.term}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-slate-100 mt-10 mb-6 flex items-center gap-2">
            <BookOpen className="text-emerald-400" /> Preemptive vs. Non-Preemptive Scheduling
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-2">
            {module.notes.types.map((type, idx) => {
              const isPreemptive = type.type.toLowerCase().includes('preemptive') && !type.type.toLowerCase().includes('non-');
              return (
                <div key={idx} className={`bg-slate-800/40 border border-slate-700 p-6 rounded-xl flex flex-col justify-between ${isPreemptive ? 'hover:border-emerald-500' : 'hover:border-rose-500'} transition-colors`}>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      {isPreemptive ? <CheckSquare className="text-emerald-400" size={20} /> : <Power className="text-rose-400" size={20} />}
                      <h4 className={`font-bold text-xl ${isPreemptive ? 'text-emerald-400' : 'text-rose-400'}`}>{type.type}</h4>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{type.desc}</p>
                  </div>
                  
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm mt-4">
                    <strong className={`block mb-2 text-xs uppercase tracking-wider font-bold ${isPreemptive ? 'text-emerald-300' : 'text-rose-300'}`}>Mental Model (Analogy)</strong>
                    {isPreemptive ? (
                      <span className="text-slate-400 leading-relaxed">
                        <strong>The "Fairness" Approach:</strong> You are reading a book, but your boss calls with an urgent task. You put a bookmark in the book (Save Context), handle the call, and resume reading later. 
                        <br/><br/><span className="text-emerald-400/80 italic font-medium">The OS can forcefully pause the process if its time expires or a higher priority task arrives.</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 leading-relaxed">
                        <strong>The "Do Not Disturb" Approach:</strong> You are in a public restroom. Even if someone outside has a massive emergency, they MUST wait until you unlock the door and come out. 
                        <br/><br/><span className="text-rose-400/80 italic font-medium">The OS CANNOT pause the process. The process keeps the CPU until it voluntarily finishes.</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Goals & Metrics */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <CheckSquare className="text-rose-400" /> Goals of CPU Scheduling
              </h2>
              <ul className="space-y-3">
                {module.notes.goals.map((goal, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-rose-900/50 text-rose-400 p-1 rounded-full shrink-0">
                      <CheckSquare size={14} />
                    </div>
                    <span className="text-slate-300 font-medium text-sm">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <BookOpen className="text-sky-400" /> Key Scheduling Metrics
            </h2>
            <div className="space-y-3 text-sm">
              {module.notes.metrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700">
                  <strong className="text-sky-300">{metric.term}: </strong>
                  <span className="text-slate-400">{metric.desc}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* FCFS & Convoy Effect */}
        <section className="bg-indigo-950/40 border border-indigo-500/50 rounded-2xl p-8 shadow-sm text-left">
          <h2 className="text-xl font-bold text-indigo-300 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-400" /> {module.notes.fcfs.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            {module.notes.fcfs.desc}
          </p>
          <div className="bg-amber-950/40 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-amber-400 text-lg mb-2">The Convoy Effect</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.fcfs.convoyEffect}</p>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 13: CPU Scheduling (SJF, Priority, RR)
  if (module.id === 'sjf_priority_rr') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Shortest Job First (SJF) */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Activity className="text-indigo-400" /> Shortest Job First (SJF)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-lg mb-3">Non-Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.sjf.nonPreemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-700 text-slate-300 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/40 border-l-4 border-emerald-500 p-5 rounded-r-xl">
              <h3 className="font-bold text-emerald-400 text-lg mb-3">Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.sjf.preemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-emerald-900 text-emerald-400 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Priority Scheduling */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <Layers className="text-rose-400" /> Priority Scheduling
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-lg mb-3">Non-Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.priority.nonPreemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-700 text-slate-300 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-slate-200 text-lg mb-3">Preemptive</h3>
              <ul className="space-y-2">
                {module.notes.priority.preemptive.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-rose-900 text-rose-400 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-amber-950/40 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-amber-400 text-lg mb-2">Solution to Starvation: {module.notes.priority.solution.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.priority.solution.desc}</p>
          </div>
        </section>

        {/* Round Robin (RR) */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <RotateCcw className="text-sky-400" /> Round Robin Scheduling (RR)
          </h2>
          <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl mb-6">
            <ul className="space-y-3">
              {module.notes.rr.features.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 bg-sky-900 text-sky-400 p-1 rounded-full shrink-0"><CheckSquare size={14} /></div>
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center shadow-inner overflow-x-auto text-sm">
             <h3 className="text-slate-400 font-bold tracking-widest uppercase mb-4">RR Execution Flow</h3>
             <div className="flex flex-col items-center space-y-3 text-center">
               <div className="bg-slate-800 border-2 border-sky-500 rounded-full px-6 py-2 font-bold text-sky-300">Ready Queue</div>
               <ArrowDownUp size={20} className="text-slate-600" />
               <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300">Pick a process (FCFS)</div>
               <ArrowDownUp size={20} className="text-slate-600" />
               <div className="bg-indigo-900/40 border-2 border-indigo-500 rounded-lg px-6 py-3 font-bold text-indigo-300 transform rotate-45 flex items-center justify-center w-24 h-24">
                 <span className="-rotate-45 font-bold tracking-widest">BT &lt; TQ?</span>
               </div>
               
               <div className="flex gap-16 mt-2 relative w-full justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-emerald-400 font-bold mb-2">Yes</span>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300">Execute till termination</div>
                    <ArrowDownUp size={20} className="text-slate-600 my-2" />
                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300">Terminate state</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-rose-400 font-bold mb-2">No</span>
                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300">Execute for TQ</div>
                    <ArrowDownUp size={20} className="text-slate-600 my-2" />
                    <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 text-xs">TQ expires &rarr; Back to Ready Queue</div>
                  </div>
               </div>
             </div>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 14: MLQ & MLFQ
  if (module.id === 'mlq_mlfq') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* MLQ */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Layers className="text-rose-400" /> {module.notes.mlq.title}
            </h2>
            <p className="text-rose-400 text-sm font-medium italic mt-1">{module.notes.mlq.subtitle}</p>
          </div>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.mlq.desc}</p>
          
          <div className="space-y-4 mb-8">
            {module.notes.mlq.queues.map((q, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-200 text-base">{q.name}</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{q.desc}</p>
                </div>
                <div className="bg-slate-950 px-3 py-1 rounded text-xs font-mono text-rose-300 shrink-0 border border-slate-800">
                  Priority: {q.priority}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700 mb-6">
             <h3 className="font-bold text-slate-200 mb-3 text-sm uppercase tracking-wider">How it works:</h3>
             <ul className="space-y-2">
                {module.notes.mlq.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 bg-slate-700 text-slate-300 p-1 rounded-full shrink-0"><ChevronRight size={12} /></div>
                    <span className="text-slate-300 text-sm leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
          </div>

          <div className="bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-red-400 text-lg mb-2">{module.notes.mlq.problem.title}</h3>
            <p className="text-red-200/80 text-sm leading-relaxed">{module.notes.mlq.problem.desc}</p>
          </div>
        </section>

        {/* MLFQ */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
              <Activity className="text-emerald-400" /> {module.notes.mlfq.title}
            </h2>
            <p className="text-emerald-400 text-sm font-medium italic mt-1">{module.notes.mlfq.subtitle}</p>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.mlfq.desc}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {module.notes.mlfq.features.map((feature, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
                <h3 className="font-bold text-emerald-300 text-base mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <h3 className="font-bold text-emerald-400 text-lg mb-2">Why MLFQ is the Ultimate Winner</h3>
            <p className="text-emerald-200/80 text-sm leading-relaxed">{module.notes.mlfq.summary}</p>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 15: Intro to Concurrency
  if (module.id === 'concurrency') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* What is Concurrency? */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="bg-indigo-950/30 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            <strong className="text-indigo-300 block mb-1 text-sm">Example: MS Word</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.intro.example}</p>
          </div>
        </section>

        {/* TCB */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Server className="text-emerald-400" /> {module.notes.tcb.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.tcb.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <strong className="text-emerald-400 block mb-2 text-sm flex items-center gap-2"><CheckSquare size={16}/> Saved in TCB</strong>
              <p className="text-slate-300 text-sm leading-relaxed">{module.notes.tcb.saved}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <strong className="text-rose-400 block mb-2 text-sm flex items-center gap-2"><Power size={16}/> NOT Saved in TCB</strong>
              <p className="text-slate-300 text-sm leading-relaxed">{module.notes.tcb.notSaved}</p>
            </div>
          </div>
        </section>

        {/* The Trick Question */}
        <section className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <Activity className="text-rose-400" /> {module.notes.trickQuestion.title}
          </h2>
          <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 mb-6 text-center">
            <p className="text-slate-200 text-lg font-medium italic mb-4">"{module.notes.trickQuestion.question}"</p>
            <span className="bg-rose-900 text-white font-bold tracking-widest uppercase px-6 py-2 rounded-lg text-xl">{module.notes.trickQuestion.answer}</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{module.notes.trickQuestion.explanation}</p>
        </section>

        {/* Benefits */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
            <CheckSquare className="text-sky-400" /> Benefits of Multi-Threading (Even on a single CPU)
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.benefits.map((benefit, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
                <strong className="text-sky-300 block mb-2 text-sm">{idx + 1}. {benefit.title}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // Render Module 16: Critical Section Problem
  if (module.id === 'critical_section') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Critical Section */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
            <Database className="text-indigo-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <div key={idx} className="bg-slate-800/40 p-4 rounded-xl border-l-2 border-indigo-500">
                <strong className="text-indigo-300 block mb-1 text-sm">{point.label}</strong>
                <span className="text-slate-400 text-sm block mt-1">{point.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Race Condition */}
        <section className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-400" /> {module.notes.raceCondition.title}
          </h2>
          <p className="text-rose-200/90 text-sm leading-relaxed mb-4">{module.notes.raceCondition.desc}</p>
          <div className="bg-slate-900/80 p-5 rounded-xl border border-rose-900 text-sm text-slate-300 italic">
            "{module.notes.raceCondition.example}"
          </div>
        </section>

        {/* Solutions */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> {module.notes.solutions.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.solutions.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.solutions.methods.map((method, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <strong className="text-emerald-300 block mb-1 text-base">{method.name}</strong>
                  {method.analogy && (
                    <span className="text-emerald-500/80 font-mono text-xs italic block mb-3 border-b border-slate-700 pb-2">Analogy: {method.analogy}</span>
                  )}
                  <p className="text-slate-300 text-xs leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disadvantages */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-amber-400" /> {module.notes.disadvantages.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.disadvantages.desc}</p>
          <div className="space-y-3">
            {module.notes.disadvantages.list.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                <div className="mt-1"><Skull size={18} className="text-amber-500/70" /></div>
                <div>
                  <strong className="text-amber-300 block mb-1 text-sm">{item.name}</strong>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Global Var & Peterson Failures */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
                <AlertTriangle size={20} className="text-rose-400" /> {module.notes.globalVarFail.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.globalVarFail.desc}</p>
              <div className="space-y-2 mb-6">
                {module.notes.globalVarFail.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700 text-sm">
                    <span className="text-rose-300 font-mono text-xs block mb-1">{step.time}</span>
                    <span className="text-slate-300">{step.event}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-rose-950/30 p-4 rounded-xl border border-rose-900/50 text-rose-200 text-sm font-medium italic">
              {module.notes.globalVarFail.takeaway}
            </div>
          </section>

          <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-amber-400" /> {module.notes.petersonFail.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.petersonFail.desc}</p>
              <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-900/50 mb-4">
                <strong className="text-amber-400 block mb-1 text-sm">Why it fails:</strong>
                <p className="text-slate-300 text-sm leading-relaxed">{module.notes.petersonFail.whyItFails}</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-sm text-slate-400 italic mb-6">
                "{module.notes.petersonFail.example}"
              </div>
            </div>
            <div className="bg-amber-950/30 p-4 rounded-xl border border-amber-900/50 text-amber-200 text-sm font-medium italic">
              {module.notes.petersonFail.takeaway}
            </div>
          </section>
        </div>

      </div>
    );
  }

  // Render Module 17: Semaphores
  if (module.id === 'semaphores') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Busy Waiting */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-400" /> {module.notes.busyWaiting.title}
          </h2>
          <div className="bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-4">
            <p className="text-rose-200/90 text-sm leading-relaxed">{module.notes.busyWaiting.issue}</p>
          </div>
          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-emerald-200/90 text-sm leading-relaxed">{module.notes.busyWaiting.solution}</p>
          </div>
        </section>

        {/* Condition Variables */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-indigo-400" /> {module.notes.conditionVars.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.conditionVars.desc}</p>
          <div className="bg-indigo-950/30 p-5 rounded-xl border border-indigo-900/50 text-indigo-200/90 text-sm italic">
            <strong className="text-indigo-300 block mb-2 text-sm not-italic">Analogy:</strong>
            {module.notes.conditionVars.analogy}
          </div>
        </section>

        {/* Semaphores */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <Layers className="text-amber-400" /> {module.notes.semaphoreTypes.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.semaphoreTypes.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <strong className="text-amber-300 block mb-2 text-sm flex items-center gap-2"><Power size={16}/> Binary Semaphore (0 or 1)</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{module.notes.semaphoreTypes.binary}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700 p-5 rounded-xl">
              <strong className="text-amber-300 block mb-2 text-sm flex items-center gap-2"><Server size={16}/> Counting Semaphore (Any #)</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{module.notes.semaphoreTypes.counting}</p>
            </div>
          </div>

          <h3 className="font-bold text-slate-200 mb-4 text-base">{module.notes.howItWorks.title}</h3>
          <div className="space-y-3">
            {module.notes.howItWorks.points.map((point, idx) => (
              <div key={idx} className="bg-slate-800/50 p-4 rounded-xl flex gap-4 items-start border border-slate-700 hover:border-amber-500/50 transition-colors">
                <div className="bg-slate-950 px-3 py-1 rounded text-xs font-mono text-amber-400 shrink-0 border border-slate-800 mt-0.5">
                  {point.action}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hardware Locks */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-400" /> {module.notes.atomicProtection.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.atomicProtection.desc}</p>
          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-emerald-200/90 text-sm leading-relaxed">{module.notes.atomicProtection.hardware}</p>
          </div>
        </section>

        {/* Nested Locks */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Layers className="text-sky-400" /> {module.notes.nestedLocks.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.nestedLocks.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-sky-950/20 border border-sky-900/50 p-4 rounded-xl">
              <strong className="text-sky-300 block mb-1 text-sm">The Library</strong>
              <p className="text-sky-200/80 text-xs leading-relaxed">{module.notes.nestedLocks.analogy.library}</p>
            </div>
            <div className="bg-sky-950/20 border border-sky-900/50 p-4 rounded-xl">
              <strong className="text-sky-300 block mb-1 text-sm">The Stapler</strong>
              <p className="text-sky-200/80 text-xs leading-relaxed">{module.notes.nestedLocks.analogy.stapler}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-slate-200 mb-3 text-sm">{module.notes.nestedLocks.codeTitle}</h3>
            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-sky-300 font-mono overflow-x-auto">
              {module.notes.nestedLocks.code}
            </pre>
          </div>

          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
            <strong className="text-slate-200 block mb-3 text-sm">The Golden Rule to Remember:</strong>
            <ul className="space-y-2">
              {module.notes.nestedLocks.rules.map((rule, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-slate-400 items-start">
                  <span className="text-sky-400 font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 20: Classic Problems
  if (module.id === 'classic_problems') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Dining Philosophers */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <User className="text-amber-400" /> {module.notes.diningPhilosophers.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.diningPhilosophers.desc}</p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {Object.entries(module.notes.diningPhilosophers.translation).map(([key, val], idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl">
                <strong className="text-amber-300 block mb-1 text-sm capitalize">{key}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{val}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-6">
            <h3 className="font-bold text-rose-400 mb-2">{module.notes.diningPhilosophers.deadlock.title}</h3>
            <p className="text-rose-200/90 text-sm mb-3">{module.notes.diningPhilosophers.deadlock.desc}</p>
            <ol className="list-decimal list-inside text-rose-300/80 text-sm space-y-1">
              {module.notes.diningPhilosophers.deadlock.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2"><CheckSquare size={18}/> {module.notes.diningPhilosophers.enhancements.title}</h3>
          <div className="space-y-3">
            {module.notes.diningPhilosophers.enhancements.points.map((point, idx) => (
              <div key={idx} className="bg-slate-800/50 p-4 rounded-xl border border-emerald-900/30">
                <strong className="text-emerald-300 block mb-1 text-sm">{point.name}</strong>
                <p className="text-slate-400 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Producer/Consumer */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-sky-400" /> {module.notes.producerConsumer.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.producerConsumer.desc}</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {module.notes.producerConsumer.setup.map((item, idx) => (
              <div key={idx} className="bg-sky-950/20 border border-sky-900/50 p-4 rounded-xl">
                <strong className="text-sky-300 block mb-1 text-sm">{item.name}</strong>
                <p className="text-sky-200/80 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-slate-200 mb-3 text-sm">The 3 Semaphores Used:</h3>
          <div className="space-y-2 mb-6">
            {module.notes.producerConsumer.semaphores.map((sem, idx) => (
              <div key={idx} className="bg-slate-800/40 p-3 rounded-lg border border-slate-700 text-sm flex gap-3">
                <span className="text-sky-400 font-mono font-bold w-32 shrink-0">{sem.name}</span>
                <span className="text-slate-300">{sem.desc}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-emerald-400 mb-2 text-sm">Producer Code</h3>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-emerald-300 font-mono overflow-x-auto">
                {module.notes.producerConsumer.producerCode}
              </pre>
            </div>
            <div>
              <h3 className="font-bold text-rose-400 mb-2 text-sm">Consumer Code</h3>
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-rose-300 font-mono overflow-x-auto">
                {module.notes.producerConsumer.consumerCode}
              </pre>
            </div>
          </div>

          <div className="bg-sky-950/30 p-5 rounded-xl border border-sky-900/50 text-sky-200 text-sm italic">
            <strong className="text-sky-400 block mb-1 not-italic">Key Takeaway:</strong>
            {module.notes.producerConsumer.takeaway}
          </div>
        </section>

      </div>
    );
  }

  // Render Module 21: Deadlock Part 1
  if (module.id === 'deadlock_part_1') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Definition */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-400" /> {module.notes.definition.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.definition.desc}</p>
          <div className="bg-rose-950/30 p-5 rounded-xl border border-rose-900/50 text-rose-200 text-sm italic">
            <strong className="text-rose-300 block mb-1 not-italic">Example:</strong>
            {module.notes.definition.example}
          </div>
        </section>

        {/* 4 Conditions */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-amber-400" /> {module.notes.conditions.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.conditions.desc}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.conditions.list.map((cond, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-amber-900/30 p-5 rounded-xl hover:border-amber-500/50 transition-colors">
                <strong className="text-amber-300 block mb-2 text-sm">{idx + 1}. {cond.name}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{cond.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How OS Handles */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Settings className="text-sky-400" /> {module.notes.handling.title}
          </h2>
          <div className="space-y-3">
            {module.notes.handling.methods.map((method, idx) => (
              <div key={idx} className="bg-sky-950/10 p-4 rounded-xl border border-sky-900/30 flex flex-col md:flex-row gap-3 md:items-center">
                <div className="bg-sky-950 px-3 py-1 rounded text-xs font-mono text-sky-400 shrink-0 border border-sky-900/50">
                  Method {idx + 1}
                </div>
                <div>
                  <strong className="text-sky-300 block text-sm">{method.name}</strong>
                  <p className="text-slate-400 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prevention */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-400" /> {module.notes.prevention.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.prevention.desc}</p>
          <div className="space-y-4">
            {module.notes.prevention.methods.map((method, idx) => (
              <div key={idx} className="bg-emerald-950/10 border-l-4 border-emerald-500 p-5 rounded-r-xl">
                <strong className="text-emerald-300 block mb-2 text-sm">{method.name}</strong>
                <p className="text-slate-300 text-sm leading-relaxed">{method.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // Render Module 22: Deadlock Part 2
  if (module.id === 'deadlock_part_2') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        
        {/* Avoidance */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-emerald-400" /> {module.notes.avoidance.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.avoidance.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.avoidance.states.map((state, idx) => (
              <div key={idx} className="bg-emerald-950/20 border border-emerald-900/50 p-5 rounded-xl">
                <strong className={`block mb-2 text-sm ${idx === 0 ? 'text-emerald-300' : 'text-amber-400'}`}>{state.name}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{state.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-emerald-950/40 p-5 rounded-xl border border-emerald-900/50 text-emerald-200 text-sm font-medium">
            <span className="text-emerald-400 font-bold">The Golden Rule:</span> {module.notes.avoidance.goldenRule}
          </div>
        </section>

        {/* Banker's Algorithm */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Settings className="text-sky-400" /> {module.notes.banker.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.banker.desc}</p>
          <div className="bg-sky-950/10 p-5 rounded-xl border border-sky-900/30">
            <ol className="list-decimal list-inside space-y-3 text-slate-300 text-sm">
              {module.notes.banker.steps.map((step, idx) => (
                <li key={idx} className="pl-2">
                  <span className={idx === 2 ? "text-sky-300 italic" : ""}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Detection */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <Activity className="text-amber-400" /> {module.notes.detection.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.detection.desc}</p>
          <div className="space-y-4">
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed"><span className="text-amber-300 font-bold">Single Instance:</span> {module.notes.detection.single.split(':')[1]}</p>
            </div>
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
              <p className="text-slate-300 text-sm leading-relaxed"><span className="text-amber-300 font-bold">Multiple Instance:</span> {module.notes.detection.multiple.split(':')[1]}</p>
            </div>
          </div>
        </section>

        {/* Recovery */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-rose-400" /> {module.notes.recovery.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.recovery.desc}</p>
          
          <div className="space-y-6">
            {module.notes.recovery.methods.map((method, idx) => (
              <div key={idx} className="bg-rose-950/20 p-5 rounded-xl border border-rose-900/50">
                <strong className="text-rose-300 block mb-3 text-sm">{method.name}</strong>
                {method.sub ? (
                  <div className="space-y-3">
                    {method.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                        <span className="text-rose-400 text-xs font-bold block mb-1">{subItem.type}</span>
                        <p className="text-slate-400 text-xs leading-relaxed">{subItem.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{method.desc}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    );
  }

  // Render Module 24: Memory Management
  if (module.id === 'memory_management') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">

        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Database className="text-sky-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.intro.desc}</p>
          <div className="bg-sky-950/30 border-l-4 border-sky-500 p-4 rounded-r-xl">
            <p className="text-sky-200 text-sm"><span className="font-bold text-sky-300">The Goal:</span> {module.notes.intro.goal}</p>
          </div>
        </section>

        {/* Logical vs Physical Address */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-amber-400" /> {module.notes.addresses.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.addresses.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Logical */}
            <div className="bg-amber-950/20 border border-amber-900/40 rounded-xl p-5">
              <h3 className="text-amber-300 font-bold mb-3">{module.notes.addresses.logical.title}</h3>
              <ul className="space-y-2">
                {module.notes.addresses.logical.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300 items-start">
                    <span className="text-amber-400 font-bold shrink-0 mt-0.5">▸</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Physical */}
            <div className="bg-sky-950/20 border border-sky-900/40 rounded-xl p-5">
              <h3 className="text-sky-300 font-bold mb-3">{module.notes.addresses.physical.title}</h3>
              <ul className="space-y-2">
                {module.notes.addresses.physical.points.map((p, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300 items-start">
                    <span className="text-sky-400 font-bold shrink-0 mt-0.5">▸</span><span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MMU Box */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <h3 className="text-emerald-400 font-bold mb-3 flex items-center gap-2"><Cpu size={18}/> {module.notes.addresses.mmu.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{module.notes.addresses.mmu.desc}</p>
            <div className="bg-slate-950 border border-emerald-900/50 rounded-xl p-4 mb-4">
              <p className="text-emerald-400 font-mono text-center font-bold text-sm">{module.notes.addresses.mmu.formula}</p>
            </div>
            <div className="flex items-center gap-3 bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4 overflow-x-auto">
              <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-slate-400 text-xs mb-1">CPU</div><div className="text-white font-mono font-bold">346</div></div>
              <span className="text-slate-400 font-bold text-lg shrink-0">+</span>
              <div className="bg-amber-950/40 border border-amber-800 rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-amber-400 text-xs mb-1">Relocation Reg</div><div className="text-white font-mono font-bold">14000</div></div>
              <span className="text-slate-400 font-bold text-lg shrink-0">=</span>
              <div className="bg-sky-950/40 border border-sky-800 rounded-lg px-3 py-2 text-xs text-center shrink-0"><div className="text-sky-400 text-xs mb-1">Physical Addr</div><div className="text-white font-mono font-bold">14346</div></div>
              <span className="text-slate-400 font-bold text-lg shrink-0">→</span>
              <div className="bg-emerald-950/40 border border-emerald-800 rounded-lg px-4 py-2 text-xs text-center shrink-0"><div className="text-emerald-400 font-bold">RAM</div></div>
            </div>
          </div>
        </section>

        {/* Memory Protection */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-rose-400" /> {module.notes.protection.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.protection.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {module.notes.protection.registers.map((reg, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-rose-900/30 p-4 rounded-xl">
                <strong className="text-rose-300 block mb-2 text-sm">{reg.name}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{reg.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl mb-4">
            <p className="text-rose-200/90 text-sm leading-relaxed">
              <strong className="text-rose-300 block mb-1">How it works (every single memory access):</strong>
              {module.notes.protection.howItWorks}
            </p>
          </div>
          <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-xl text-amber-200/90 text-sm">
            <span className="text-amber-400 font-bold">User Mode Rule:</span> {module.notes.protection.userModeRule}
          </div>
        </section>

        {/* Allocation Methods */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-400" /> {module.notes.allocationMethods.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-xl">
              <strong className="text-indigo-300 block mb-2 text-sm">Contiguous Allocation</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{module.notes.allocationMethods.contiguous}</p>
            </div>
            <div className="bg-violet-950/20 border border-violet-900/40 p-5 rounded-xl">
              <strong className="text-violet-300 block mb-2 text-sm">Non-Contiguous Allocation</strong>
              <p className="text-slate-400 text-xs leading-relaxed">{module.notes.allocationMethods.nonContiguous}</p>
            </div>
          </div>
        </section>

        {/* Fixed Partitioning */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <FolderOpen className="text-amber-400" /> {module.notes.fixedPartition.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.fixedPartition.desc}</p>
          
          {/* Visual Diagram */}
          <div className="mb-6 bg-slate-950 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-500 text-xs text-center mb-3">Fixed Partitioning — Memory Layout</p>
            <div className="space-y-1 max-w-xs mx-auto">
              <div className="bg-slate-700 rounded px-3 py-2 text-xs text-center text-slate-300">OS (Fixed)</div>
              {['P1 (3MB) → 5MB Partition', 'P2 (3MB) → 5MB Partition', 'P3 (3MB) → 5MB Partition', 'Free Space'].map((item, i) => (
                <div key={i} className={`rounded px-3 py-2 text-xs text-center border ${
                  i < 3 ? 'bg-amber-950/40 border-amber-900/50 text-amber-200' : 'bg-slate-800/40 border-dashed border-slate-700 text-slate-500'
                }`}>{item}</div>
              ))}
            </div>
            <p className="text-rose-400 text-xs text-center mt-2 italic">2MB wasted inside EACH occupied partition (Internal Fragmentation)</p>
          </div>

          <h3 className="font-bold text-rose-400 mb-3 text-sm">Limitations:</h3>
          <div className="space-y-3">
            {module.notes.fixedPartition.limitations.map((lim, idx) => (
              <div key={idx} className="bg-rose-950/15 border-l-4 border-rose-700 p-4 rounded-r-xl">
                <strong className="text-rose-300 block mb-1 text-sm">{lim.name}</strong>
                <p className="text-slate-300 text-sm leading-relaxed">{lim.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Partitioning */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Activity className="text-emerald-400" /> {module.notes.dynamicPartition.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.dynamicPartition.desc}</p>

          {/* Visual Diagram */}
          <div className="mb-6 bg-slate-950 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-500 text-xs text-center mb-3">Dynamic Partitioning — Process Size = Partition Size</p>
            <div className="space-y-1 max-w-xs mx-auto">
              <div className="bg-slate-700 rounded px-3 py-2 text-xs text-center text-slate-300">OS</div>
              {['P1 Partition (5MB exact)', 'P2 Partition (2MB exact)', 'P3 Partition (3MB exact)', 'P4 Partition (4MB exact)'].map((item, i) => (
                <div key={i} className="bg-emerald-950/40 border border-emerald-900/50 rounded px-3 py-2 text-xs text-center text-emerald-200">{item}</div>
              ))}
            </div>
            <p className="text-emerald-400 text-xs text-center mt-2 italic">Zero internal fragmentation — every byte is used!</p>
          </div>

          <h3 className="font-bold text-emerald-400 mb-3 text-sm">Advantages over Fixed Partitioning:</h3>
          <div className="space-y-2 mb-6">
            {module.notes.dynamicPartition.advantages.map((adv, idx) => (
              <div key={idx} className="flex gap-2 items-start text-sm text-slate-300 bg-emerald-950/10 border border-emerald-900/20 rounded-lg p-3">
                <span className="text-emerald-400 font-bold shrink-0">✓</span><span>{adv}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl mb-4">
            <strong className="text-amber-300 block mb-2 text-sm">Limitation: External Fragmentation (Still!)</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.dynamicPartition.limitation}</p>
          </div>

          <div className="bg-sky-950/20 border border-sky-900/30 p-5 rounded-xl">
            <strong className="text-sky-300 block mb-2 text-sm">Solution: Compaction</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.dynamicPartition.compaction}</p>
          </div>
        </section>

        {/* Quick Reference Card */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <CheckSquare className="text-slate-400" /> Quick Comparison: Fixed vs Dynamic
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-2 pr-4 text-slate-400 font-semibold">Property</th>
                  <th className="text-center py-2 px-4 text-amber-400 font-semibold">Fixed</th>
                  <th className="text-center py-2 px-4 text-emerald-400 font-semibold">Dynamic</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ['Internal Fragmentation', '❌ Yes (big problem)', '✅ No'],
                  ['External Fragmentation', '❌ Yes', '❌ Yes (still!)'],
                  ['Partition Size', 'Fixed at boot time', 'Determined at runtime'],
                  ['Process Size Limit', '≤ Largest partition', 'No fixed limit'],
                  ['Multiprogramming Degree', 'Limited by # of partitions', 'Better'],
                  ['Implementation Complexity', 'Simple', 'More complex'],
                ].map(([prop, fixed, dynamic], i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-4 font-medium text-slate-300">{prop}</td>
                    <td className="py-3 px-4 text-center text-xs">{fixed}</td>
                    <td className="py-3 px-4 text-center text-xs">{dynamic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    );
  }

  // Render Module 12: Free Space Management
  if (module.id === 'freespace') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Defragmentation / Compaction */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Settings className="text-indigo-400" /> {module.notes.defragmentation.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.defragmentation.desc}</p>
          <ul className="space-y-3">
            {module.notes.defragmentation.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-indigo-900/50 text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Representation */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Database className="text-emerald-400" /> {module.notes.representation.title}
          </h2>
          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl">
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.representation.desc}</p>
          </div>
        </section>

        {/* Satisfying Request */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <Layers className="text-amber-400" /> {module.notes.satisfyingRequest.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.satisfyingRequest.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {module.notes.satisfyingRequest.algorithms.map((algo, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-amber-900/30 p-5 rounded-xl">
                <strong className="text-amber-300 block mb-2 text-sm">{algo.name}</strong>
                <p className="text-slate-400 text-xs leading-relaxed">{algo.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Render Module 13: Paging
  if (module.id === 'paging') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertTriangle className="text-rose-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-rose-900/50 text-rose-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Concept */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Layers className="text-indigo-400" /> {module.notes.concept.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.concept.desc}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-indigo-950/20 border border-indigo-900/40 p-5 rounded-xl">
              <strong className="text-indigo-300 block mb-2 text-sm">Frames vs Pages</strong>
              <ul className="space-y-2 text-slate-400 text-xs">
                {module.notes.concept.framesPages.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-violet-950/20 border border-violet-900/40 p-5 rounded-xl">
              <strong className="text-violet-300 block mb-2 text-sm">Page Table</strong>
              <ul className="space-y-2 text-slate-400 text-xs">
                {module.notes.concept.pageTable.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <strong className="text-sky-300 block mb-1 text-sm">Addressing:</strong>
              <p className="text-slate-400 text-sm">{module.notes.concept.addressing}</p>
            </div>
            <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl">
              <strong className="text-sky-300 block mb-1 text-sm">PTBR:</strong>
              <p className="text-slate-400 text-sm">{module.notes.concept.ptbr}</p>
            </div>
          </div>
        </section>

        {/* TLB */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-400" /> {module.notes.tlb.title}
          </h2>
          
          <div className="bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl mb-6">
            <strong className="text-amber-300 block mb-2 text-sm">The Problem</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.tlb.problem}</p>
          </div>
          
          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
            <strong className="text-emerald-300 block mb-2 text-sm">The Solution (TLB)</strong>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{module.notes.tlb.solution}</p>
            <strong className="text-emerald-300 block mb-1 text-sm">How It Works:</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.tlb.howItWorks}</p>
          </div>

          <div className="bg-sky-950/20 border border-sky-900/30 p-5 rounded-xl">
            <strong className="text-sky-300 block mb-2 text-sm">ASID (Address Space Identifier)</strong>
            <p className="text-slate-400 text-sm leading-relaxed">{module.notes.tlb.asid}</p>
          </div>
        </section>
      </div>
    );
  }

  // Render Module 14: Segmentation
  if (module.id === 'segmentation') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <User className="text-amber-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-amber-900/50 text-amber-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Paging vs Segmentation */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <ArrowDownUp className="text-indigo-400" /> {module.notes.pagingVsSegmentation.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.pagingVsSegmentation.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-indigo-900/50 text-indigo-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Logical Address & Hardware */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <Cpu className="text-emerald-400" /> Logical Address & Hardware
          </h2>
          
          <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-xl mb-6">
            <strong className="text-emerald-300 block mb-2 text-sm">{module.notes.addressing.title}</strong>
            <p className="text-slate-300 text-sm leading-relaxed">{module.notes.addressing.desc}</p>
          </div>
          
          <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-xl">
            <strong className="text-sky-300 block mb-3 text-sm">{module.notes.hardware.title}</strong>
            <p className="text-slate-400 text-sm mb-3">{module.notes.hardware.desc}</p>
            <ul className="space-y-2 text-slate-400 text-xs pl-4 border-l border-slate-700">
              {module.notes.hardware.points.map((point, idx) => (
                <li key={idx}>• {point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-rose-400" /> {module.notes.prosCons.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-5 rounded-xl">
              <strong className="text-emerald-400 block mb-3 text-sm flex items-center gap-2"><CheckSquare size={16}/> Advantages</strong>
              <ul className="space-y-2 text-slate-300 text-sm">
                {module.notes.prosCons.advantages.map((adv, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-emerald-500">✓</span> <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-xl">
              <strong className="text-rose-400 block mb-3 text-sm flex items-center gap-2"><AlertTriangle size={16}/> Disadvantages</strong>
              <ul className="space-y-2 text-slate-300 text-sm">
                {module.notes.prosCons.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-rose-500">✗</span> <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-indigo-950/20 border border-indigo-900/30 p-5 rounded-xl">
            <strong className="text-indigo-300 block mb-2 text-sm">{module.notes.modern.title}</strong>
            <p className="text-slate-400 text-sm leading-relaxed">{module.notes.modern.desc}</p>
          </div>
        </section>
      </div>
    );
  }

  // Render Module 15: Virtual Memory
  if (module.id === 'virtualmemory') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-sky-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <strong className="text-sky-300 block mb-3 text-sm">Benefits:</strong>
          <ul className="space-y-3">
            {module.notes.intro.benefits.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-sky-900/50 text-sky-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Demand Paging */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Activity className="text-indigo-400" /> {module.notes.demandPaging.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.demandPaging.desc}</p>
          <div className="bg-indigo-950/20 border-l-4 border-indigo-500 p-5 rounded-r-xl">
            <ul className="space-y-3">
              {module.notes.demandPaging.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 text-indigo-400 shrink-0">
                    <ChevronRight size={16} />
                  </div>
                  <span className="text-slate-300 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Valid-Invalid Bit Scheme */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> {module.notes.validInvalid.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.validInvalid.desc}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl flex flex-col gap-2">
              <strong className="text-emerald-400 text-lg">{module.notes.validInvalid.bits[0].bit}</strong>
              <span className="text-slate-400 text-sm">{module.notes.validInvalid.bits[0].meaning}</span>
            </div>
            <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl flex flex-col gap-2">
              <strong className="text-rose-400 text-lg">{module.notes.validInvalid.bits[1].bit}</strong>
              <span className="text-slate-400 text-sm">{module.notes.validInvalid.bits[1].meaning}</span>
            </div>
          </div>
        </section>

        {/* Page Faults & Pure Demand Paging */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-400" /> {module.notes.pageFault.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.pageFault.desc}</p>
          
          <div className="bg-slate-800/40 border border-slate-700/50 p-5 rounded-xl mb-6">
            <strong className="text-rose-300 block mb-4 text-sm flex items-center gap-2"><Settings size={16}/> Steps in Handling a Page Fault:</strong>
            <ol className="space-y-4 relative before:absolute before:inset-0 before:ml-[13px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {module.notes.pageFault.steps.map((step, idx) => (
                <li key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-700 bg-slate-800 text-slate-300 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-xs font-bold z-10">
                    {idx + 1}
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-slate-800/80 p-3 rounded border border-slate-700/50 text-slate-300 text-xs shadow">
                    {step}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-xl">
            <strong className="text-amber-300 block mb-3 text-sm">{module.notes.pureDemandPaging.title}</strong>
            <ul className="space-y-2 text-slate-400 text-xs">
              {module.notes.pureDemandPaging.points.map((point, idx) => (
                <li key={idx}>• {point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-violet-400 mb-4 flex items-center gap-2">
            <CheckSquare className="text-violet-400" /> {module.notes.prosCons.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/20 border border-emerald-900/40 p-5 rounded-xl">
              <strong className="text-emerald-400 block mb-3 text-sm flex items-center gap-2"><CheckSquare size={16}/> Advantages</strong>
              <ul className="space-y-2 text-slate-300 text-sm">
                {module.notes.prosCons.advantages.map((adv, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-emerald-500">✓</span> <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-rose-950/20 border border-rose-900/40 p-5 rounded-xl">
              <strong className="text-rose-400 block mb-3 text-sm flex items-center gap-2"><Skull size={16}/> Disadvantages</strong>
              <ul className="space-y-2 text-slate-300 text-sm">
                {module.notes.prosCons.disadvantages.map((dis, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-rose-500">✗</span> <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Render Module 16: Page Replacement Algorithms
  if (module.id === 'pagereplacement') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <AppWindow className="text-emerald-400" /> {module.notes.intro.title}
          </h2>
          <ul className="space-y-3">
            {module.notes.intro.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="mt-1 bg-emerald-900/50 text-emerald-400 p-1 rounded-full shrink-0">
                  <CheckSquare size={14} />
                </div>
                <span className="text-slate-300 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Algorithms */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-indigo-400 mb-6 flex items-center gap-2">
            <Layers className="text-indigo-400" /> {module.notes.algorithms.title}
          </h2>
          
          <div className="space-y-6">
            {module.notes.algorithms.types.map((algo, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-indigo-300 mb-3">{algo.name}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{algo.desc}</p>
                
                {algo.points && (
                  <ul className="space-y-2 mb-4">
                    {algo.points.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-slate-400 text-sm">
                        <span className="text-indigo-500 mt-1"><ChevronRight size={14}/></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {algo.belady && (
                  <div className="bg-rose-950/20 border-l-4 border-rose-500 p-4 rounded-r-xl mt-4">
                    <p className="text-rose-200 text-sm leading-relaxed">{algo.belady}</p>
                  </div>
                )}
                
                {algo.implementations && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {algo.implementations.map((impl, iIdx) => (
                      <div key={iIdx} className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg">
                        <strong className="text-emerald-300 block mb-2 text-sm">{impl.method}</strong>
                        <p className="text-slate-400 text-xs leading-relaxed">{impl.details}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {algo.subTypes && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {algo.subTypes.map((sub, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/50 border border-slate-700 p-4 rounded-lg">
                        <strong className="text-sky-300 block mb-2 text-sm">{sub.subName}</strong>
                        <p className="text-slate-400 text-xs leading-relaxed">{sub.subDesc}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {algo.note && (
                  <div className="mt-4 text-slate-500 text-xs italic">
                    Note: {algo.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // Render Module 17: Thrashing
  if (module.id === 'thrashing') {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 text-left">
        {/* Intro */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <AlertOctagon className="text-rose-400" /> {module.notes.intro.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">{module.notes.intro.desc}</p>
          <div className="bg-rose-950/20 border-l-4 border-rose-500 p-5 rounded-r-xl">
            <ul className="space-y-3">
              {module.notes.intro.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 text-rose-400 shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <strong className="text-rose-200 text-sm">{point}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Graph */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Activity className="text-sky-400" /> {module.notes.graph.title}
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">{module.notes.graph.desc}</p>
          
          {/* Custom CSS representation of the graph */}
          <div className="relative w-full max-w-lg mx-auto h-64 border-l-2 border-b-2 border-slate-600 mb-10 mt-10">
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
              CPU Utilization
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-bold uppercase tracking-wider whitespace-nowrap">
              Degree of Multiprogramming
            </div>
            
            {/* The curve */}
            <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible drop-shadow-lg">
              <path d="M 0 200 Q 150 50, 250 50 T 350 200" fill="none" stroke="#818cf8" strokeWidth="4" strokeLinecap="round" />
            </svg>
            
            {/* Thrashing indicator */}
            <div className="absolute top-16 right-4 flex items-center gap-2 animate-pulse">
              <div className="w-1 h-8 bg-amber-500"></div>
              <div className="flex items-center text-amber-500 text-sm font-bold">
                <span className="bg-amber-500/20 px-2 py-1 rounded">Thrashing</span>
                <ChevronRight size={20} className="-ml-1" />
              </div>
            </div>
          </div>
        </section>

        {/* Techniques */}
        <section className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800">
          <h2 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" /> {module.notes.techniques.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {module.notes.techniques.methods.map((method, idx) => (
              <div key={idx} className="bg-slate-800/40 border border-slate-700/50 p-6 rounded-xl flex flex-col h-full hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-900/30 p-2 rounded-lg text-emerald-400">
                    {idx === 0 ? <AppWindow size={20} /> : <Activity size={20} />}
                  </div>
                  <h3 className="text-lg font-bold text-emerald-300">{method.name}</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{method.desc}</p>
                <div className="mt-auto bg-slate-900/50 p-4 rounded-lg border-l-2 border-emerald-500/50">
                  <p className="text-slate-400 text-xs leading-relaxed">{method.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return <div>Module content not found.</div>;
}

function FlashcardsView({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset when module changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  if (!cards || cards.length === 0) return <div className="text-center p-10 text-slate-500">No flashcards for this module yet.</div>;

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 150);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-slate-400 mb-4 font-medium">Card {currentIndex + 1} of {cards.length}</div>
      
      <div 
        className="relative w-full max-w-lg h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`w-full h-full transition-transform duration-500 transform-style-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-slate-800 border-2 border-slate-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-indigo-500/50 transition-colors">
            <p className="text-sm text-indigo-400 font-bold tracking-widest uppercase mb-4">Question</p>
            <h3 className="text-2xl font-semibold text-slate-100">{cards[currentIndex].front}</h3>
            <p className="text-slate-500 mt-8 text-sm flex items-center gap-1"><RotateCcw size={14}/> Click to flip</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-indigo-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg rotate-y-180">
            <p className="text-sm text-indigo-300 font-bold tracking-widest uppercase mb-4">Answer</p>
            <p className="text-xl font-medium text-white whitespace-pre-line leading-relaxed">{cards[currentIndex].back}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={prevCard} className="px-6 py-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 font-medium hover:bg-slate-700 transition-colors">
          Previous
        </button>
        <button onClick={nextCard} className="px-6 py-3 bg-indigo-600 rounded-xl text-white font-medium hover:bg-indigo-500 transition-colors">
          Next Card
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

function QuizView({ questions }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!questions || questions.length === 0) return <div className="text-center p-10 text-slate-500">No quiz questions for this module yet.</div>;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedOpt(idx);
    setShowResult(true);
    if (idx === questions[currentQ].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="bg-slate-900 rounded-2xl p-10 shadow-sm border border-slate-800 text-center animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-indigo-900/50 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckSquare size={40} />
        </div>
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Quiz Complete!</h2>
        <p className="text-slate-400 mb-8 text-lg">You scored {score} out of {questions.length}</p>
        
        <div className="w-full bg-slate-800 rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className="bg-indigo-500 h-4 rounded-full transition-all duration-1000" 
            style={{ width: (score / questions.length) * 100 + '%' }}
          ></div>
        </div>

        <button onClick={restartQuiz} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors">
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="bg-slate-900 rounded-2xl p-8 shadow-sm border border-slate-800 max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-bold text-slate-500 tracking-wider uppercase">Question {currentQ + 1} of {questions.length}</span>
        <span className="text-sm font-medium text-indigo-400 bg-indigo-900/30 px-3 py-1 rounded-full">Score: {score}</span>
      </div>

      <h2 className="text-xl font-bold text-slate-100 mb-6">{q.question}</h2>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
          if (!showResult) btnClass += "border-slate-700 hover:border-indigo-500 hover:bg-slate-800 text-slate-300";
          else {
            if (idx === q.answer) btnClass += "border-emerald-500 bg-emerald-900/30 text-emerald-400";
            else if (idx === selectedOpt) btnClass += "border-red-500 bg-red-900/30 text-red-400";
            else btnClass += "border-slate-800 bg-slate-800/50 text-slate-500 opacity-50";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={showResult} className={btnClass}>
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-8 flex justify-end animate-in fade-in">
          <button onClick={nextQuestion} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
            {currentQ < questions.length - 1 ? 'Next Question' : 'View Results'} <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
