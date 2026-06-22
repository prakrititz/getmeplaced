import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, CheckSquare, User, AppWindow, Settings, Cpu, ChevronRight, RotateCcw, Server, Activity, FolderOpen, Terminal, ArrowDownUp, Code, Power, HardDrive } from 'lucide-react';

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
  }
];

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeModuleId, setActiveModuleId] = useState(courseModules[8].id); // Defaulting to the new module 9 for visibility
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
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shadow-sm w-fit mx-auto md:mx-0">
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <BookOpen size={16} /> Notes
          </button>
          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'flashcards' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Layers size={16} /> Flashcards ({activeModule.flashcards ? activeModule.flashcards.length : 0})
          </button>
          <button 
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-indigo-900/40 shadow-sm text-indigo-300' : 'text-slate-400 hover:text-slate-200'}`}
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
