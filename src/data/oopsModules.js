export const oopsModules = [
  {
    id: 'oop_blueprint',
    title: 'The Object-Oriented Programming Blueprint: A Step-by-Step Guide',
    notes: {
      intro: "To understand Object-Oriented Programming, we must first look at what came before it: Procedural Programming. In procedural programming, code is written like a linear recipe. OOP flips this paradigm completely by binding data and functions together into a single, self-contained package called an Object.",
      chapter1: {
        title: "Chapter 1: What is Object-Oriented Programming (OOP)?",
        points: [
          "In procedural programming, code is a linear list of step-by-step instructions. As programs grow, tracking which function is modifying which data becomes chaotic.",
          "OOP flips this paradigm by binding data and functions together into a single, self-contained package called an Object.",
          "Data (Attributes / Properties): The variables that store information about the object (what the object knows).",
          "Functions (Methods): The code block that defines what actions the object can perform (what the object does).",
          "A Class acts as the blueprint, and the Object is the physical house built from that blueprint."
        ]
      },
      chapter2: {
        title: "Chapter 2: The Real-World Connection",
        points: [
          "Human beings do not naturally think in terms of linear computer logic; we think in terms of physical objects. OOP bridges this gap by allowing code structures to map directly onto real-world entities.",
          "Example (Application Blocker): The Class Blueprint is 'FocusProfile'.",
          "Data it holds: allowedScreenTime, listOfBlockedApps, isActive.",
          "Functions it performs: blockApp(), trackTime(), toggleStatus().",
          "Instead of managing floating arrays across millions of lines, you create independent Profile objects (e.g., AlexProfile, SamProfile) that manage themselves."
        ]
      },
      chapter3: {
        title: "Chapter 3: Why Study OOP? (The Core Benefits)",
        points: [
          "Modularity: An object's data and methods are bundled together. You can fix the internals of one object without breaking a separate part of the system.",
          "Code Reusability: Through Inheritance, you can write a base class once and extend it to create specialized classes without rewriting boilerplate code.",
          "Easier Maintenance: If a bug surfaces, a developer knows exactly which class to fix, without hunting through millions of lines of procedural script."
        ]
      },
      chapter4: {
        title: "Chapter 4: Limitations of OOP",
        points: [
          "Size and Memory Overhead: OOP requires more lines of boilerplate code, resulting in larger file sizes and increased memory overhead compared to lean, procedural scripts.",
          "Performance Overhead: Objects reference memory dynamically and frequently pass messages, which can run slightly slower than direct, low-level procedural calculations.",
          "Over-Engineering (Complexity): It is easy to over-complicate simple problems with massive inheritance chains and deep hierarchies."
        ]
      },
      chapter5: {
        title: "Chapter 5: What Makes a Language \"Object-Oriented\"?",
        points: [
          "Encapsulation: Hiding internal data via private keywords (restricting direct access to object states).",
          "Abstraction: Exposing simple controls while masking deep mechanics (via interfaces or abstract classes).",
          "Inheritance: Deriving new classes from existing ones (adopting and expanding the DNA of a parent class).",
          "Polymorphism: Allowing one method to take on many forms (different objects respond to the exact same method call in their own custom way)."
        ]
      }
    },
    flashcards: [
      { front: "What is the difference between a Class and an Object in OOP?", back: "A Class acts as the blueprint, and the Object is the physical instance (the house) built from that blueprint." },
      { front: "What are the two core components of an Object?", back: "Data (Attributes/Properties) and Functions (Methods)." },
      { front: "How does Modularity benefit OOP?", back: "It bundles data and methods together, allowing you to fix or alter the internals of one object without breaking separate parts of the system." },
      { front: "What is Encapsulation?", back: "Hiding internal data via private keywords to restrict direct access to object states." },
      { front: "What is Abstraction?", back: "Exposing simple controls while masking deep mechanics (e.g., using interfaces or abstract classes)." },
      { front: "What is Polymorphism?", back: "The ability for different objects to respond to the exact same method call in their own custom way (method overriding and overloading)." }
    ],
    quiz: [
      { question: "Which of the following is NOT one of the Four Pillars of OOP?", options: ["Encapsulation", "Polymorphism", "Compilation", "Inheritance"], answer: 2 },
      { question: "What is a known limitation of Object-Oriented Programming?", options: ["It forces all data to be strictly global.", "It has higher memory and performance overhead compared to low-level procedural scripts.", "It does not allow for code reusability.", "It is impossible to use in large enterprise systems."], answer: 1 },
      { question: "If you define a 'FocusProfile' that contains 'allowedScreenTime' and 'toggleStatus()', what do these represent?", options: ["Inheritance and Polymorphism", "Data (Attributes) and Functions (Methods)", "Classes and Arrays", "Abstract Classes and Interfaces"], answer: 1 },
      { question: "What does the pillar of 'Inheritance' allow you to do?", options: ["Hide variables using private keywords.", "Derive a new class from an existing parent class to reuse code.", "Execute multiple forms of a single method.", "Directly manipulate raw memory addresses."], answer: 1 }
    ]
  },
  {
    id: 'cpp_fundamentals',
    title: 'Chapter 1: Diving into C++ Fundamentals',
    notes: {
      intro: "Welcome to the next phase of our journey! Let's step straight into the mechanics of C++. We will cover its core philosophy and break down its memory management tools step-by-step.",
      philosophy: {
        title: "1. The Design Philosophy of C++",
        points: [
          "Before writing code, it helps to understand why a language was built. C++ is a powerful language because it doesn't force you into a single way of thinking.",
          "C++ was intended to support four distinct programming styles: Procedural programming, Data abstraction, Object-oriented programming, and Generic programming.",
          "The creators had several strict design goals:",
          "Maintain C compatibility to a large extent.",
          "Make C programming safer without losing performance.",
          "Treat user-defined data types as standard library components.",
          "Provide generalized support for objects, classes, and access control."
        ]
      },
      scope: {
        title: "2. Explicit Scope Resolution",
        points: [
          "In C++, having a global variable and a local variable with the exact same name creates a conflict. By default, the local variable takes precedence.",
          "If you want to explicitly tell the compiler, \"No, I want the global version,\" you use the scope resolution operator `::` to access global variables.",
          "```cpp\n#include <iostream>\nusing namespace std;\nint a = 10;\n\nint main()\n{\n    int a = 15;\n    cout << a << ::a;\n    ::a = 20;\n    cout << a << ::a;\n    return 0;\n}\n```",
          "Output:\n15101520",
          "Explanation:\n1. The first `cout` prints the local `a` (which is 15), followed immediately by the global `::a` (which is 10).\n2. The line `::a = 20;` targets the global variable and updates it. The local variable `a` remains 15.\n3. The second `cout` prints the local `a` (still 15) and the newly updated global `::a` (now 20)."
        ]
      },
      pointers: {
        title: "3. Demystifying Pointers",
        points: [
          "Pointers are variables, but instead of holding a standard value like 10, pointers contain addresses of variables in memory.",
          "Unlike the older C language, pointers and integers are NOT interchangeable in C++.",
          "To retrieve the actual value stored at the memory address the pointer is holding, a pointer needs to be \"de-referenced\" (e.g., `*p`) to get the variable.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\nint main()\n{\n    int i = 10;\n    int *j;\n    int **k;\n    j = &i;\n    k = &j;\n    cout << i << *j << **k;\n}\n```",
          "Output:\n101010",
          "Explanation:\n1. `i` holds the value 10.\n2. `j` is a pointer holding the memory address of `i` (`&i`). To get the value, we de-reference it once: `*j`.\n3. `k` is a \"pointer to a pointer\" (`**k`), holding the address of `j`. To get all the way back to the original value, we have to de-reference it twice: `**k`."
        ]
      },
      references: {
        title: "4. The Power of References",
        points: [
          "A reference is an alias for an existing variable. Unlike pointers, you don't have to use special syntax (`*`) to get the value out of it; a reference is automatically dereferenced on use.",
          "Because it is a direct alias, changing a reference changes the variable itself.",
          "```cpp\nint i = 10; // declare variable i of type int and initialize to 10\nint &j = i; // j is declared as a reference and initialized to variable i\n\ncout << i << \" \" << j; // j is automatically dereferenced on use\n\nj = 20; // changing a reference changes the variable i itself\ncout << \"\\n\" << i << \" \" << j; \n\ni = 30; // changing the variable value\ncout << \"\\n\" << i << \" \" << j; \n```",
          "Output:\n10 10\n20 20\n30 30",
          "Explanation:\n`i` and `j` are permanently linked. Changing `j` to 20 automatically alters `i`. Changing `i` to 30 automatically alters `j`."
        ]
      },
      functionCalls: {
        title: "5. Function Calls: Putting it all Together",
        points: [
          "How you pass data to a function dictates whether the function can permanently change your original data. C++ gives you three distinct ways to handle this.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\n// 1. Pass by Value\nvoid swapv(int x, int y) {\n    int t;\n    t = x; x = y; y = t;\n}\n\n// 2. Pass by Address (Pointers)\nvoid swapa(int *x, int *y) {\n    int t;\n    t = *x; *x = *y; *y = t;\n}\n\n// 3. Pass by Reference\nvoid swapr(int &x, int &y) {\n    int t;\n    t = x; x = y; y = t;\n}\n\nint main() {\n    int a = 10, b = 20;\n    \n    swapv(a, b);\n    cout << a << \" \" << b << \"\\n\";  \n    \n    swapa(&a, &b);\n    cout << a << \" \" << b << \"\\n\";  \n    \n    swapr(a, b);\n    cout << a << \" \" << b << \"\\n\"; \n}\n```",
          "Output:\n10 20\n20 10\n10 20",
          "Explanation:\n1. swapv (Value): The function receives copies of `a` and `b`. It swaps the copies, but the original variables in main are untouched. The output remains `10 20`.\n2. swapa (Address): We pass the memory addresses (`&a`, `&b`). The function uses pointers to reach into memory and physically swap the original values. The output is successfully swapped to `20 10`.\n3. swapr (Reference): The variables are now 20 and 10 from the previous step. We pass them by reference. The function acts directly on the originals (no * syntax needed) and swaps them back. The output is `10 20`."
        ]
      }
    },
    flashcards: [
      { front: "What is the purpose of the scope resolution operator (::) in C++?", back: "It allows you to explicitly access a global variable when a local variable with the exact same name exists and is taking precedence." },
      { front: "What is the difference between a pointer and a reference in C++?", back: "A pointer holds a memory address and must be explicitly de-referenced (using *) to access the value. A reference is an alias that is automatically dereferenced upon use." },
      { front: "In C++, what does a 'pointer to a pointer' (e.g. int **k) store?", back: "It stores the memory address of another pointer. To access the actual underlying value, it must be double de-referenced (**k)." },
      { front: "What happens to the original variables when you pass arguments to a function 'by value' in C++?", back: "Nothing. The function receives only copies of the variables, so any changes made inside the function do not affect the original variables." },
      { front: "If int i = 10; and int &j = i; are declared, what happens to i when you set j = 20?", back: "Because j is a reference (an alias) to i, changing j automatically changes i to 20 as well." }
    ],
    quiz: [
      { question: "Which of the following is NOT a design goal of C++?", options: ["Maintain C compatibility to a large extent.", "Make C programming safer without losing performance.", "Provide generalized support for objects and classes.", "Force developers strictly into an Object-Oriented programming style."], answer: 3 },
      { question: "If you have a global int a = 5; and inside main() you declare int a = 10;, what will cout << ::a; print?", options: ["10", "5", "Compilation Error", "Undefined Behavior"], answer: 1 },
      { question: "Which syntax is used to correctly declare a Reference in C++?", options: ["int *ref = x;", "int &ref = x;", "int @ref = x;", "int #ref = x;"], answer: 1 },
      { question: "When swapping variables, which method requires you to pass the memory addresses (e.g. &a, &b) in the function call?", options: ["Pass by Value", "Pass by Address (Pointers)", "Pass by Reference", "Pass by Global Scope"], answer: 1 }
    ]
  },
  {
    id: 'cpp_architecture',
    title: 'Chapter 2: Architecting C++ Applications',
    notes: {
      intro: "When transitioning from writing single-file competitive programming scripts to building robust, large-scale applications, the organization of your code becomes just as critical as the logic itself. This chapter explores how C++ structures and breathes life into objects.",
      interfaces: {
        title: "1. Organizing Code: Interfaces and Implementation",
        points: [
          "A fundamental principle of C++ software design is the separation of what a class does from how it actually does it.",
          "Interface vs. Implementation:",
          "The interface of a class defines the organization of objects of that class. This interface acts similarly to a type definition (typedef).",
          "The class interface is explicitly specified in a class header file (ending in .h).",
          "Conversely, the member functions that are declared in this interface are actually defined within the implementation. This implementation is specified in the source file (ending in .cpp).",
          "Separating the implementation from the interface is highly recommended because it provides better readability, allows for easier maintenance, and enables the separate compilation of the implementation and the user code.",
          "Real-World Example:",
          "Each of our standard examples has included the iostream interface from iostream.h by utilizing the `#include <iostream>` directive.",
          "This inclusion allows us to use standard input and output objects (like `cin` and `cout`) and operators (`<<` and `>>`) without needing to know the underlying implementation of those input/output streams.",
          "The source files containing the actual implementation are pre-compiled and included directly in the C++ standard library.",
          "Namespaces: To prevent naming conflicts across massive codebases, C++ uses namespaces. Namespaces can be nested inside one another and can span across multiple source files.",
          "```cpp\n#include <iostream>\n\n// Defining namespaces\nnamespace my_namespace1 {\n    class My_class {\n    public:\n        void display() { std::cout << \"Inside My_class\\n\"; }\n    };\n    \n    namespace my_namespace2 {\n        void my_func() { std::cout << \"Inside nested namespace\\n\"; }\n    }\n}\n\n// Using namespaces\nusing namespace my_namespace1;\n\nint main() {\n    My_class obj;\n    obj.display();\n    \n    // Accessing a nested namespace\n    my_namespace1::my_namespace2::my_func(); \n    return 0;\n}\n```",
          "Output:\nInside My_class\nInside nested namespace",
          "Explanation:\nWe define a primary namespace `my_namespace1` and a nested namespace `my_namespace2`. By declaring `using namespace my_namespace1;`, we can instantiate `My_class` directly, but we must use the scope resolution operator `::` to reach into the nested namespace."
        ]
      },
      constructors: {
        title: "2. The Birth of an Object: Initialization and Constructors",
        points: [
          "When an object is brought into existence, it needs starting data.",
          "Object Initialization:",
          "Initialization can happen at the time of declaration, for example: `Sample s1 {10, 3.14};` (this works if the data members are public and the types match).",
          "It can also happen using initialization methods, such as `Sample s1; s1.setData(10, 3.14);`, which works with private data as well.",
          "However, relying on methods creates a problem: what if the user forgets to initialize the object? To prevent this, developers establish and maintain 'invariants' for a class of objects by setting default values directly in the class.",
          "Constructors: For more complex initialization, C++ uses Constructors. Constructors are functions that share the exact same name as the class names.",
          "They initialize objects of the class immediately upon creation.",
          "A default constructor is automatically provided by the compiler if no constructors are defined.",
          "Constructor functions within a class can be overloaded. All object creation attempts must match one of the defined constructors.",
          "Function Overloading Rules: Function overloading in C++ means the same function name can have different signatures. A signature must differ in the number, the order, or the type of arguments. The return value is not considered part of the function signature.",
          "```cpp\n#include <iostream>\nusing namespace std; \n\nclass Sample { \n    private: \n        int age; \n    public:\n        // Constructor\n        Sample (int y) { \n            if (y > 0) age = y; \n            cout << \"Object created with age: \" << age << \"\\n\";\n        }\n};\n\nint main() { \n    int x = 21; \n    Sample s1(x); \n    return 0;\n}\n```",
          "Output:\nObject created with age: 21",
          "Explanation:\nWhen `Sample s1(x);` is executed, the `Sample` constructor is automatically triggered, verifying the input `y` is greater than `0` and assigning it to the private `age` variable immediately upon creation."
        ]
      },
      thispointer: {
        title: "3. The Internal Compass: The `this` Pointer",
        points: [
          "When an object is executing one of its own methods, it sometimes needs a way to refer to itself.",
          "The `this` pointer disambiguates references to members of the class from methods of the same class.",
          "It is available to all the methods in a class via an implicit declaration. It always points to the current object.",
          "The `this` pointer is a constant pointer, meaning you cannot modify it during the execution of the method.",
          "It dies once control returns from the method. Usage of the `this` pointer is generally optional.",
          "```cpp\n#include <iostream>\n\nclass Ex {\n    private:\n        int i; float a;\n    public:\n        // Implicit declaration is: void setData (Ex* const this, int x, float y)\n        void setData (int x, float y) {\n            this->i = x; // Or simply: i = x;\n            this->a = y; // Or simply: a = y;\n            std::cout << \"Data set: i=\" << this->i << \", a=\" << this->a << \"\\n\";\n        }\n};\n\nint main() {\n    Ex e1, e2;\n    e1.setData (5, 5.5f);\n    e2.setData (10, 10.5f);\n    return 0;\n}\n```",
          "Output:\nData set: i=5, a=5.5\nData set: i=10, a=10.5",
          "Explanation:\nEven though we only typed `int x, float y` as arguments, C++ secretly passes the `this` pointer in the background. The pointer guarantees that when `e1` calls `setData`, the data is saved specifically into `e1`'s memory space, and not `e2`'s space."
        ]
      },
      destructors: {
        title: "4. The End of an Object: Destructors",
        points: [
          "Just as constructors build objects, destructors tear them down. Memory management is critical because C++ does not have its own garbage collector.",
          "A destructor is a member function that is invoked implicitly when the object goes out of scope (such as the end of a function or program), or when it is explicitly destroyed by a call to `delete`.",
          "A destructor has the exact same name as the class, preceded by a tilde (`~`).",
          "A default destructor is provided by the compiler if none is explicitly defined.",
          "As a standard good practice, you should write destructors in case of the use of pointers within classes.",
          "If there are pointers in the class members that point to other objects, one needs to explicitly delete them inside the destructor to free up the memory."
        ]
      },
      destructors_extension: {
        title: "5. Destructors vs. Garbage Collection (The Stack vs. The Heap)",
        points: [
          "It might sound like a contradiction at first glance: if C++ doesn't clean up after itself, why is the compiler automatically giving you a default destructor? They actually tackle two completely different types of memory.",
          "1. The Stack vs. The Heap:",
          "The Stack (Automatic Memory): This is where normal, everyday variables live (like `int x = 10;`). When a function finishes running, the computer automatically erases the Stack.",
          "The Heap (Dynamic Memory): This is a massive free-for-all space. If you want a massive amount of memory to hold a huge array, you specifically ask for it using the `new` keyword. The computer will never automatically erase the Heap.",
          "2. What a Garbage Collector Does:",
          "Languages like Java or Python have a Garbage Collector. This is literally a background program that constantly runs while your app is open, scanning the Heap for old data that you aren't using anymore and deleting it for you.",
          "C++ does not have its own garbage collector. If you put something on the Heap, it stays there forever until you specifically type `delete`.",
          "3. What the Default Destructor Actually Does:",
          "A destructor is a member function that is invoked implicitly when an object goes out of scope. If you don't write one, the compiler provides a default destructor.",
          "However, the default destructor is very lazy. All it does is destroy the normal variables living on the Stack.",
          "If your object has a normal `int age;`, the default destructor deletes it. But, if your object has a pointer that points to massive data on the Heap, the default destructor will only destroy the tiny pointer itself. It completely ignores the massive data the pointer was pointing at!",
          "The Rented Apartment Analogy:",
          "Imagine your C++ Object is a rented apartment. The Default Destructor is the landlord. When your lease is up (the object goes out of scope), the landlord comes in and throws away all the standard furniture (standard variables).",
          "The Problem: What if you rented a massive TV from a third-party company (Dynamic Heap memory via a pointer)? The landlord (default destructor) throws away your TV remote (the pointer), but leaves the massive TV sitting in the living room forever. You are now still being charged for that TV, but you have no remote to control it. This is a Memory Leak.",
          "The Custom Destructor: This is why if there are pointers in class members pointing to other objects, you need to explicitly delete them to free memory. You have to write your own custom destructor (using a `~`) to explicitly return the TV before the landlord locks the door.",
          "In short: The default destructor only cleans up the simple, automatic stuff. Because C++ has no garbage collector, the responsibility of cleaning up the complex, dynamically allocated stuff falls entirely on your shoulders!"
        ]
      }
    },
    flashcards: [
      { front: "What is the primary difference between a class interface and its implementation in C++?", back: "The interface (.h file) defines the organization of objects (what the class does), while the implementation (.cpp file) contains the actual defined member functions (how the class does it)." },
      { front: "What is a C++ constructor?", back: "A constructor is a special function with the exact same name as the class that is automatically called to initialize an object immediately upon its creation." },
      { front: "What defines a function's 'signature' for function overloading in C++?", back: "A function signature is defined by the number, order, and type of arguments. The return value is NOT part of the signature." },
      { front: "What is the 'this' pointer in C++?", back: "The 'this' pointer is an implicitly declared constant pointer available to all methods in a class that always points to the current object executing the method." },
      { front: "When is a destructor called and what is its naming convention?", back: "A destructor is invoked implicitly when an object goes out of scope or is explicitly deleted. It shares the exact name as the class but is preceded by a tilde (~)." },
      { front: "What is the difference between The Stack and The Heap in C++ memory management?", back: "The Stack is automatic memory where standard variables are stored and erased automatically when a function finishes. The Heap is dynamic memory (allocated with 'new') that stays forever until explicitly deleted." },
      { front: "Why does C++ experience Memory Leaks if a default destructor is used on a class containing pointers to Heap memory?", back: "The default destructor only deletes the pointer itself (which lives on the Stack), completely ignoring the massive Heap memory it was pointing at. You lose the 'remote' but the 'TV' is left turned on forever." }
    ],
    quiz: [
      { question: "Why is separating a class's interface from its implementation considered a best practice?", options: ["It makes the program run significantly faster.", "It provides better readability, easier maintenance, and allows for separate compilation of the implementation and user code.", "It forces developers to use Object-Oriented principles.", "It eliminates the need for pointers."], answer: 1 },
      { question: "In C++, how does the compiler distinguish between overloaded functions?", options: ["By their return type.", "By the order in which they are defined in the file.", "By checking if the number, order, or type of arguments differ.", "Overloaded functions cannot be distinguished."], answer: 2 },
      { question: "Which characteristic is TRUE about the 'this' pointer?", options: ["It is a constant pointer, meaning it cannot be modified during the execution of the method.", "It is a standard global variable.", "It must always be manually declared in every class.", "It can point to multiple objects simultaneously."], answer: 0 },
      { question: "If a C++ class creates objects dynamically using pointers, what must be done to prevent memory leaks?", options: ["The memory will be handled by the garbage collector automatically.", "You must restart the program.", "The class must explicitly delete the pointers inside its destructor.", "You must pass the objects by value instead of reference."], answer: 2 },
      { question: "What is the difference between how the compiler handles the Stack and the Heap?", options: ["The compiler automatically erases the Stack, but the Heap is never automatically erased.", "The compiler automatically erases the Heap, but the Stack is never automatically erased.", "They are both automatically erased by the garbage collector.", "The Stack and the Heap are the exact same thing."], answer: 0 }
    ]
  },
  {
    id: 'cpp_inheritance',
    title: 'Chapter 3 & 4: Inheritance and the Security Checkpoint',
    notes: {
      intro: "When you use inheritance, a child class inherits the traits of the parent class. This allows you to achieve software reuse by using existing functionality, overriding existing functionality, providing new functionality, or combining existing and new functionality. However, the parent class doesn't just hand over all its secrets willingly. It uses Access Specifiers to lock down its data.",
      security_levels: {
        title: "1. The Three Levels of Security",
        points: [
          "Think of a class as a house. The access specifiers determine who is allowed to see what is inside the rooms.",
          "Public: This is the front yard. A public variable can be seen by the class itself, any derived (child) classes, and completely unrelated outside classes.",
          "Private: This is a locked safe in the master bedroom. A private variable can *only* be seen by the class itself (and special \"Friend\" functions/classes). Crucially, derived child classes get a \"No\" and cannot access private variables.",
          "Protected: This is the family room. It is blocked off from the outside world (Any Other Class gets a \"No\"), but it is completely visible to the class itself and its derived child classes."
        ]
      },
      security_example: {
        title: "2. The \"Why Did My Code Break?\" Example",
        points: [
          "Let's look at why code fails when violating these security rules, and how to fix it.",
          "The Broken Code:",
          "If a parent class has a `private` integer named `count`, and a child class tries to subtract from it (`count--`), the compiler throws an error.",
          "Result: `// undeclared variable count`. Even though it is a child, it is strictly forbidden from touching the parent's `private` safe.",
          "The Fix:",
          "If the parent class changes the security label of `count` from `private` to `protected`, the child class can now run `count--`.",
          "Result: `// OK now`. The family room is open to the children!"
        ]
      },
      inheritance_modes: {
        title: "3. Modes of Inheritance (The Transfer Rules)",
        points: [
          "When a child inherits from a parent, you declare a \"Mode of Inheritance.\" This dictates how the child is allowed to categorize the parent's data once it receives it.",
          "Public Inheritance (Most Common): Written as `class Derived : public Base`. This creates an \"is-a\" relationship, allowing the child to be used polymorphically as the base class. It changes nothing about the parent's security; public stays public, and protected stays protected.",
          "Protected Inheritance: Takes all the public and protected members of the parent and forces them to become `protected` inside the child. Useful only when a base class needs to make its members available to further derived classes down the chain.",
          "Private Inheritance: The default mode if you don't specify one. It is used for \"in-terms-of\" relationships. It takes every single piece of data from the parent and completely locks it down as `private` inside the child."
        ]
      },
      overriding: {
        title: "4. Overriding (Which method gets called?)",
        points: [
          "What happens if the parent and the child both have a method with the exact same name?",
          "If both the parent and the child have a `void display()` function, and you call `i.display();` on a child object `i`, the child's method overrides the parent's method.",
          "It will print the child's version, not the parent's."
        ]
      },
      demystifying_inside: {
        title: "5. Demystifying Private vs. Protected (Inside the Classes)",
        points: [
          "The difference between private and protected is the most common stumbling block in OOP. Let's look at how a parent shares data with a child.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\nclass Parent {\nprivate:\n    int privateBankBalance = 50000; \n\nprotected:\n    int protectedFamilyRecipe = 42; \n\npublic:\n    int publicHouseAddress = 101; \n};\n\nclass Child : public Parent {\npublic:\n    void tryToAccessData() {\n        // OUTCOME 1: SUCCESS\n        cout << \"House Address: \" << publicHouseAddress << \"\\n\";\n        \n        // OUTCOME 2: SUCCESS\n        cout << \"Family Recipe: \" << protectedFamilyRecipe << \"\\n\";\n        \n        // OUTCOME 3: MASSIVE COMPILER ERROR\n        // cout << \"Bank Balance: \" << privateBankBalance << \"\\n\";\n    }\n};\n\nint main() {\n    Child myChild;\n    myChild.tryToAccessData();\n    return 0;\n}\n```",
          "Explanation:\n1. The child easily prints `publicHouseAddress` because public variables are open to the entire universe.\n2. The child easily prints `protectedFamilyRecipe`. Even though the outside world cannot see it, the child is part of the \"family\" and has VIP access.\n3. If you uncomment the third `cout`, the program crashes because the child is completely barred from seeing the parent's `private` bank balance."
        ]
      },
      demystifying_outside: {
        title: "6. Demystifying Private vs. Protected (Outside the Classes)",
        points: [
          "Things get slightly more complex when we look at how the child receives the parent's data. If you change the inheritance mode to `protected` or `private`, the child takes all the data it received from the parent and immediately puts it into a tighter security vault, locking out the `main()` function.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\nclass Base {\npublic:\n    int data = 100;\n};\n\n// Mode 1: Public Inheritance\nclass PublicChild : public Base {\n    // 'data' remains public here.\n};\n\n// Mode 2: Protected Inheritance\nclass ProtectedChild : protected Base {\n    // 'data' is downgraded to protected here.\n};\n\n// Mode 3: Private Inheritance\nclass PrivateChild : private Base {\n    // 'data' is downgraded to private here.\n};\n\nint main() {\n    PublicChild childA;\n    ProtectedChild childB;\n    PrivateChild childC;\n\n    // OUTCOME 1: SUCCESS\n    cout << childA.data << \"\\n\"; \n\n    // OUTCOME 2: COMPILER ERROR\n    // cout << childB.data << \"\\n\"; \n\n    // OUTCOME 3: COMPILER ERROR\n    // cout << childC.data << \"\\n\"; \n\n    return 0;\n}\n```",
          "Explanation:\n1. Public Inheritance (`childA`): The child accepted the parent's public data and kept it public. The `main()` function can easily print it.\n2. Protected Inheritance (`childB`): The child accepted the parent's public data, but immediately locked it down as protected inside its own walls. When `main()` tries to print it, the compiler throws an error because `main()` is not part of the family.\n3. Private Inheritance (`childC`): The child accepted the parent's public data, but threw it into a private safe. When `main()` tries to print it, the compiler throws an error. If `PrivateChild` ever has a child of its own, that grandchild won't be able to see the data either."
        ]
      },
      one_way_street: {
        title: "7. The \"One-Way Street\" Rule",
        points: [
          "Can you still see the parent's public data if you instantiate the Parent class directly, even if a Child used private inheritance?",
          "The short answer is: Yes.",
          "Inheritance is a strictly one-way street. When a Child class inherits from a Parent class, the Child is taking a *copy* of the Parent's blueprint and modifying it for its own personal use.",
          "If the Child decides to use `private` inheritance, it is only locking up *its own copy* of the data. The Child's decisions do not retroactively change the Parent's original blueprint. The Parent class remains completely unaffected by whatever its children decide to do.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\nclass Parent {\npublic:\n    int bankBalance = 1000; // It is public in the original blueprint\n};\n\n// The Child inherits privately, locking away its copied version\nclass Child : private Parent {\n    // Inside here, 'bankBalance' is now considered private\n};\n\nint main() {\n    // 1. Instantiating the Parent Object\n    Parent myParent;\n    \n    // OUTCOME: SUCCESS! \n    // The Parent object follows its own rules. The balance is public.\n    cout << \"Parent's money: \" << myParent.bankBalance << \"\\n\"; \n\n    // 2. Instantiating the Child Object\n    Child myChild;\n    \n    // OUTCOME: MASSIVE COMPILER ERROR\n    // The Child object follows the 'private inheritance' rules. \n    // cout << \"Child's money: \" << myChild.bankBalance << \"\\n\"; \n\n    return 0;\n}\n```",
          "Explanation:\nWhen you write `Parent myParent;`, you are building a house using the original Parent blueprint where `bankBalance` is public. When you write `Child myChild;`, you are building a different house using the Child blueprint where the balance is locked in a private vault. Creating a strict, private child does not ruin the original public parent!"
        ]
      },
      typecasting_loopholes: {
        title: "8. Bypassing Inheritance Security (Typecasting)",
        points: [
          "Is there a loophole in the compiler's security to put a \"Parent mask\" on a \"Child object\" to access private inherited data? Yes, but it depends on how you cast it.",
          "1. The \"Safe\" Cast (The Compiler Stops You):",
          "In modern C++, you would normally use an implicit cast or a `static_cast` to convert a child to a parent. Because you used `private` inheritance, you told the compiler: \"Do not let the outside world know I am related to Parent.\" If you try a standard cast, the compiler steps in as a security guard and throws an error.",
          "2. The \"Sledgehammer\" Cast (You Win):",
          "C++ allows for old-school \"C-style\" casting (e.g., `(Parent*)&myChild`). When you use this, you tell the compiler: \"I do not care about your security rules, forcefully look at this memory address as if it were a Parent.\" By doing this, you bypass the security and can see the data.",
          "```cpp\n#include <iostream>\nusing namespace std;\n\nclass Parent {\npublic:\n    int bankBalance = 1000; \n};\n\nclass Child : private Parent {\n    // Child hides the fact that it is a Parent from the outside world\n};\n\nint main() {\n    Child myChild;\n\n    // ATTEMPT 1: The Safe Cast (COMPILER ERROR)\n    // Parent* p1 = &myChild; \n    // Parent* p2 = static_cast<Parent*>(&myChild); \n\n    // ATTEMPT 2: The C-Style Sledgehammer Cast (BYPASSES SECURITY!)\n    Parent* p3 = (Parent*)&myChild; \n    \n    // OUTCOME: SUCCESS! It prints 1000.\n    cout << \"Hacked Balance: \" << p3->bankBalance << \"\\n\"; \n\n    return 0;\n}\n```",
          "Takeaway:\nWhile your loophole technically works using a C-style cast, doing this in a professional codebase is considered a massive \"anti-pattern\" (a bad practice). By forcing the cast, you deliberately break the protective encapsulation of the software architecture!"
        ]
      },
      multiple_inheritance: {
        title: "9. What is Multiple Inheritance?",
        points: [
          "In standard inheritance (Single Inheritance), a child class has exactly one parent. In Multiple Inheritance, a newly derived child class is derived from several base classes simultaneously.",
          "How it works: The newly derived class is considered an instantiation of all its base classes. For example, if you have a class `Printer` and a class `Scanner`, you could use multiple inheritance to create a class `MultiFunctionCopier` that inherits the traits of both.",
          "The Golden Rule: Single inheritance is much more widely used in the industry. If your derived class does not have a strict, undeniable \"is-a\" relationship with all of the base classes, you should not use multiple inheritance. Instead, you should use Composition (e.g., giving the class a pointer or reference to another object rather than inheriting from it)."
        ]
      }
    },
    flashcards: [
      { front: "What is the difference between Private and Protected access specifiers?", back: "Private variables can only be seen by the exact class that created them. Protected variables can be seen by the exact class that created them AND any child class that inherits from it." },
      { front: "What is the default mode of inheritance in C++ if you don't specify one?", back: "Private Inheritance. It takes every single piece of data from the parent and completely locks it down as private inside the child." },
      { front: "What happens during Public Inheritance?", back: "The child receives the parent's data and changes nothing about its security level. Public stays public, and protected stays protected." },
      { front: "If a parent and child class both have a method named display(), and you call it on the child object, which one runs?", back: "The child's method overrides the parent's method, so the child's version will run." },
      { front: "Does private inheritance by a Child class retroactively change the access specifiers of the original Parent class?", back: "No. Inheritance is a one-way street. The Child only modifies its own copy of the Parent's blueprint. The original Parent class remains completely unaffected." },
      { front: "How can you bypass the security of private inheritance to access a parent's data on a child object from the outside?", back: "By using an old-school 'C-style' cast (e.g., (Parent*)&myChild). However, doing this deliberately breaks the protective encapsulation of the architecture and is considered a massive anti-pattern." },
      { front: "What is the 'Golden Rule' regarding the use of Multiple Inheritance?", back: "You should only use Multiple Inheritance if the derived class has a strict, undeniable 'is-a' relationship with all of its base classes. Otherwise, you should use Composition." }
    ],
    quiz: [
      { question: "If you are designing a banking application, what access specifier should you use for a user's account balance?", options: ["Public", "Protected", "Private", "Global"], answer: 2 },
      { question: "If Class A inherits from Class B using Protected Inheritance, what happens to Class B's Public members inside Class A?", options: ["They remain Public.", "They are downgraded to Protected.", "They are downgraded to Private.", "They are deleted."], answer: 1 },
      { question: "Which access specifier acts like a 'family room', blocking the outside world but remaining visible to child classes?", options: ["Public", "Protected", "Private", "Namespaces"], answer: 1 },
      { question: "Why does the compiler throw an error if main() tries to print childC.data when childC uses Private Inheritance?", options: ["Because the variable is deleted.", "Because the child took the parent's public data and locked it in a private safe, hiding it from main().", "Because main() is a friend function.", "Because the compiler doesn't support inheritance."], answer: 1 }
    ]
  },
  {
    id: 'solid_principles',
    title: 'Chapter 5: The Complete SOLID Principles',
    notes: {
      intro: "SOLID is a set of five design principles introduced by Robert C. Martin (affectionately known in the industry as \"Uncle Bob\"). If Object-Oriented Programming (OOP) provides the bricks and mortar for building software, the SOLID principles are the architectural building codes that ensure your skyscraper doesn't collapse under its own weight as it grows.",
      srp: {
        title: "1. S - Single Responsibility Principle (SRP)",
        points: [
          "The Rule: A class should have one, and only one, reason to change.",
          "As we discussed earlier, a class should only have one job. If a class takes on multiple responsibilities, it becomes \"coupled.\" If you need to change one of its responsibilities, you risk breaking the others.",
          "The Bad Way: You have a `User` class that holds the user's name and email, *and* it also contains a massive function that connects to a database to save the user, *and* it has a function that formats the user's data into a PDF report.",
          "The SOLID Way: You split this into three distinct classes:\n1. `User` (holds the data).\n2. `UserRepository` (handles saving to the database).\n3. `UserReportGenerator` (handles the PDF formatting)."
        ]
      },
      ocp: {
        title: "2. O - Open/Closed Principle (OCP)",
        points: [
          "The Rule: Software entities (classes, modules, functions) should be open for extension, but closed for modification.",
          "This means you should be able to add new functionality to your software without having to rewrite or alter the existing, tested code.",
          "The Bad Way: You have a `PaymentProcessor` class with a massive `if/else` statement. `if (type == \"credit\") { ... } else if (type == \"paypal\") { ... }`. If the company wants to add Apple Pay, you have to open this existing class and modify the core logic, risking breaking the credit card logic.",
          "The SOLID Way: You create a base `PaymentMethod` interface. Then, you create separate `CreditCardPayment` and `PayPalPayment` classes that inherit from it. When Apple Pay comes along, you just create a *new* `ApplePay` class. You extended the software without modifying the original processor."
        ]
      },
      lsp: {
        title: "3. L - Liskov Substitution Principle (LSP)",
        points: [
          "The Rule: Objects of a parent class should be replaceable with objects of their child classes without breaking the application.",
          "If it looks like a duck and quacks like a duck, but needs batteries, you probably have the wrong abstraction! A child class must behave exactly like its parent is expected to behave.",
          "The Classic Example: You have a `Bird` class with a `fly()` method. You create a child class `Eagle` that inherits it (everything works perfectly). Then, you create a child class `Penguin` that inherits from `Bird`. But penguins can't fly! If your main program calls `bird.fly()`, passing it a `Penguin` object will cause a crash or an error.",
          "The SOLID Way: The `Bird` class was too broad. You should create a `FlyingBird` class and a `FlightlessBird` class. The `Penguin` inherits from `FlightlessBird` and doesn't get forced to have a `fly()` method it cannot use."
        ]
      },
      isp: {
        title: "4. I - Interface Segregation Principle (ISP)",
        points: [
          "The Rule: A client should never be forced to implement an interface that it doesn't use.",
          "It is better to have many small, specific interfaces (blueprints) than one massive, general-purpose one.",
          "The Bad Way: You create an `IMachine` interface with methods: `print()`, `scan()`, and `fax()`. You create a `MultiFunctionCopier` class that uses all three. But then you create a simple `BasicPrinter` class. Because it implements the `IMachine` interface, the `BasicPrinter` is forced to have `scan()` and `fax()` methods that are completely empty or just throw errors.",
          "The SOLID Way: You segregate the interfaces. You create `IPrinter`, `IScanner`, and `IFax`. The basic printer only implements `IPrinter`. The multi-function copier can implement all three independently."
        ]
      },
      dip: {
        title: "5. D - Dependency Inversion Principle (DIP)",
        points: [
          "The Rule: High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).",
          "This sounds complicated, but it simply means you should decouple your systems so they act like plug-and-play modules.",
          "The Bad Way: Your main `Application` class explicitly creates a `MySQLDatabase` object inside of it. The application is now hard-coded (tightly coupled) to MySQL. If your boss tells you to switch to MongoDB tomorrow, you have to rip apart the entire application to change it.",
          "The SOLID Way: Your `Application` class requires an abstract `DatabaseInterface`. It doesn't care *what* database it is, as long as it has `save()` and `load()` functions. You pass the `MySQLDatabase` into the app. Tomorrow, you can easily unplug it and plug a `MongoDatabase` into the exact same slot, and the application won't even notice the difference."
        ]
      }
    },
    flashcards: [
      { front: "What does the Single Responsibility Principle (SRP) state?", back: "A class should have one, and only one, reason to change. It should only have one job to prevent coupling." },
      { front: "What is the Open/Closed Principle (OCP)?", back: "Software entities should be open for extension, but closed for modification. You should be able to add new functionality without rewriting existing, tested code." },
      { front: "According to the Liskov Substitution Principle (LSP), what must be true about child classes?", back: "Objects of a parent class should be replaceable with objects of their child classes without breaking the application." },
      { front: "What does the Interface Segregation Principle (ISP) recommend?", back: "A client should never be forced to implement an interface that it doesn't use. It is better to have many small, specific interfaces than one massive, general-purpose one." },
      { front: "What is the core idea behind the Dependency Inversion Principle (DIP)?", back: "High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces) to create decoupled, plug-and-play systems." }
    ],
    quiz: [
      { question: "If you have a class that handles user authentication AND sends marketing emails, which SOLID principle is it violating?", options: ["Single Responsibility Principle (SRP)", "Liskov Substitution Principle (LSP)", "Interface Segregation Principle (ISP)", "Dependency Inversion Principle (DIP)"], answer: 0 },
      { question: "To add a new payment method to an application, you create a new class that implements an existing 'Payment' interface rather than modifying the core processor logic. Which principle does this demonstrate?", options: ["Dependency Inversion", "Open/Closed Principle (OCP)", "Single Responsibility", "Interface Segregation"], answer: 1 },
      { question: "Creating a 'Penguin' class that inherits from a 'Bird' class (which has a fly() method) violates which principle?", options: ["Dependency Inversion Principle (DIP)", "Single Responsibility Principle (SRP)", "Open/Closed Principle (OCP)", "Liskov Substitution Principle (LSP)"], answer: 3 },
      { question: "Why is it better to have an 'Application' depend on a 'DatabaseInterface' rather than a concrete 'MySQLDatabase' class?", options: ["It violates the Single Responsibility Principle.", "It follows the Dependency Inversion Principle, allowing the database to be easily swapped later.", "Interfaces are faster to compile.", "It allows for Multiple Inheritance."], answer: 1 }
    ]
  },
  {
    id: 'cpp_polymorphism',
    title: 'Chapter 6: Polymorphism (The Power of Many Forms)',
    notes: {
      intro: "Polymorphism is a core architectural concept in OOP that can be visually broken down into two main branches: \"One thing, several forms\" which leads to Compile-time Polymorphism, and \"One Action, different activities\" which leads to Run-time Polymorphism.",
      compile_time: {
        title: "1. Compile-time Polymorphism (Early Binding)",
        points: [
          "Compile-time polymorphism is defined by the concept of \"One thing, several forms\".",
          "This is typically achieved through mechanisms like Function overloading and Operator overloading.",
          "Function Overloading: A single function name can take different forms based on its inputs, such as calculating the absolute value using `abs(-24)`, `abs(1.5f)`, or `abs(-12L)`.",
          "Operator Overloading: Standard math operators can be redefined to work with custom objects, allowing you to add complex data structures together using simple syntax like `c3 = c1 + c2`.",
          "The term \"Binding\" refers to the process of deciding which function to call.",
          "In Compile-time polymorphism, this binding is done entirely during compilation. The compiler looks at the code and knows exactly which version of the function to lock in before the program even runs."
        ]
      },
      run_time: {
        title: "2. Run-time Polymorphism (Late Binding)",
        points: [
          "Run-time polymorphism operates on the concept of \"One action, different activities\".",
          "A practical, real-world example of this is a standard mouse click: the exact same physical action could result in a \"Close window\" activity or a \"Display Menu\" activity depending on where the mouse is at that exact second.",
          "Translated to code, the \"Action\" is the function call itself.",
          "The \"Activity\" is the application's ability to execute different functions at different times.",
          "Crucially, in Run-time Polymorphism, the binding is done at run-time. The compiler does not know exactly which function will be executed; the program figures it out on the fly while it is actively running."
        ]
      },
      problem_statement: {
        title: "3. The Practical Problem Statement",
        points: [
          "To understand why Run-time Polymorphism is so valuable, we can look at a standard graphics problem.",
          "Imagine a hierarchy where you have a base `Shape` class that branches out into derived `Circle` and `Rectangle` classes.",
          "The requirements dictate that the application should be able to draw Rectangles & Circles, and the order of drawing should be strictly preserved.",
          "If you had to write separate code blocks to draw circles and separate blocks to draw rectangles, preserving a mixed order (e.g., Circle, Rectangle, Circle) would be incredibly messy.",
          "The elegant solution to this problem relies on a combination of Inheritance, Upcasting, and a Virtual Function.",
          "By using run-time polymorphism, the application can throw all of those shapes into a single list and simply issue the \"Action\" to `draw()`. The program will figure out the correct \"Activity\" (drawing a circle vs. drawing a rectangle) dynamically as it moves through the list."
        ]
      }
    },
    flashcards: [
      { front: "What is the key difference between Compile-time and Run-time polymorphism?", back: "Compile-time (Early Binding) locks in the function to be called during compilation. Run-time (Late Binding) figures out which function to execute dynamically while the program is actively running." },
      { front: "What mechanisms are typically used to achieve Compile-time Polymorphism?", back: "Function overloading and Operator overloading." },
      { front: "What is 'Binding' in the context of Polymorphism?", back: "Binding refers to the process of deciding exactly which function to call when an action is triggered." },
      { front: "How does Run-time polymorphism solve the problem of drawing multiple different shapes in a strict order?", back: "It allows the application to throw all shapes into a single list and issue one Action (`draw()`). The program dynamically figures out the correct Activity (drawing a circle vs rectangle) at run-time." }
    ],
    quiz: [
      { question: "Which of the following is an example of 'One thing, several forms' in Compile-time polymorphism?", options: ["Using a mouse click to either close a window or open a menu.", "A virtual function calculating different areas.", "Using the same abs() function name to calculate the absolute value of an int, a float, or a long.", "Upcasting a child class to a parent class."], answer: 2 },
      { question: "What does the term 'Early Binding' refer to?", options: ["The process of deciding which function to call at run-time.", "The process of the compiler locking in the exact version of a function to call before the program even runs.", "The process of linking hardware interfaces.", "Binding multiple classes into a single child class."], answer: 1 },
      { question: "A mouse click that results in different actions depending on context is an analogy for what?", options: ["Compile-time Polymorphism", "Function Overloading", "Multiple Inheritance", "Run-time Polymorphism"], answer: 3 },
      { question: "To solve the 'Practical Problem' of drawing a mixed list of Circles and Rectangles in order, you need an elegant solution that relies on Inheritance, Upcasting, and what else?", options: ["Function Overloading", "Operator Overloading", "A Virtual Function", "Private Inheritance"], answer: 2 }
    ]
  },
  {
    id: 'cpp_runtime_polymorphism',
    title: 'Chapter 7 & 8: Runtime Polymorphism and Upcasting',
    notes: {
      intro: "This section perfectly illustrates the first step in solving the graphics problem we just discussedâ€”and the massive trap that programmers fall into if they don't use Run-time Polymorphism correctly. It demonstrates a concept called Upcasting, but it also demonstrates Early Binding failing to do what we want it to do.",
      what_is_upcasting: {
        title: "1. What is Upcasting?",
        points: [
          "In the `main()` function, the code creates a pointer to the base class: `Shape *p;`. Then, it takes the address of a child object and assigns it to that base pointer: `p = &c;`. This is called Upcasting (moving up the inheritance tree: Derived -> Base).",
          "Because a `Circle` strictly \"is-a\" `Shape`, this is 100% legal in C++. The compiler allows it without any errors.",
          "Upcasting is how you can put a mix of Circles and Rectangles into a single list of `Shape` pointers to draw them in order!"
        ]
      },
      the_trap: {
        title: "2. The Trap (Why does it print \"Shape\"?)",
        points: [
          "When the code executes `p->draw();` while pointing to the Circle, it does not print \"Circle\". It prints \"Shape\". When it points to the Rectangle, it prints \"Shape\" again.",
          "Why did it completely ignore the child classes?"
        ]
      },
      early_binding_culprit: {
        title: "3. The Culprit: Early Binding (Compile-time)",
        points: [
          "Because the `draw()` function inside the base `Shape` class is just a normal, standard function, the C++ compiler defaults to Compile-time Polymorphism (Early Binding).",
          "When the compiler translates your code into machine language before the program even runs, it looks at the line `p->draw();`.",
          "1. It asks: \"What type of variable is `p`?\"\n2. It sees: \"Ah, `p` was declared as a `Shape *p`.\"\n3. It concludes: \"Therefore, I will permanently lock in the `Shape` class's version of `draw()` right now.\"",
          "The compiler completely ignores the fact that `p` happens to be holding the physical memory address of a `Circle` or a `Rectangle` at runtime. It only cares about the type of the pointer, not the contents of the memory.",
          "The Missing Piece: To fix this and make it print \"Circle\" and \"Rectangle\", we have to force the compiler to wait until the program is actually running to make its decision (Run-time Polymorphism). To do that, C++ requires you to add a single magical keyword to the `Shape` class's `draw()` function: `virtual`."
        ]
      },
      why_upcast: {
        title: "4. Why upcast if I already know it is a Circle?",
        points: [
          "If you are just creating a single `Circle` object and you want to draw it, you do not need to upcast. You can just write `Circle c; c.draw();` and be done with it.",
          "Upcasting isn't used for single, known objects. Upcasting is used to manage massive groups of unknown objects.",
          "The Video Game Scenario: Imagine you are building a video game where the screen is filled with 10,000 different shapes. Every time the screen refreshes, the game needs to draw every single shape.",
          "Without Upcasting (A Nightmare): You would need separate lists for every single shape type and write separate loops for each. If you add a new shape later, you have to rewrite your game engine.",
          "With Upcasting (The Elegant Solution): You create a single array of `Shape*` pointers. Because of upcasting, you can shove Circles, Rectangles, and Triangles into this exact same array.",
          "Now, your game engine only needs one loop: `for (int i = 0; i < 10000; i++) { allShapes[i]->draw(); }`",
          "You upcast so your main program can blindly issue commands to a group of objects without caring exactly what they are underneath!"
        ]
      },
      what_if_child_specific: {
        title: "5. What if I call a child-specific function after upcasting?",
        points: [
          "If you try to call a function that only exists in the Child class using a Base class pointer, the compiler will throw an error and crash.",
          "The \"Narrow Vision\" Rule: When you create a pointer like `Shape *p = &c;`, you are forcing the C++ compiler to look at the `Circle` object through a very narrow `Shape`-shaped tube.",
          "The compiler only looks at the blueprint of the type of the pointer (`Shape`). If the `Shape` blueprint does not have the function listed, the compiler assumes it doesn't exist, even if the underlying `Circle` object in memory has it.",
          "```cpp\nclass Shape {\npublic:\n    void draw() { cout << \"Drawing shape\\n\"; }\n};\n\nclass Circle : public Shape {\npublic:\n    void draw() { cout << \"Drawing circle\\n\"; }\n    void getRadius() { cout << \"Radius is 5\\n\"; } // Child-specific function\n};\n\nint main() {\n    Circle c;\n    Shape *p = &c; // Upcasting\n\n    // 1. THIS WORKS\n    p->draw(); \n\n    // 2. THIS CAUSES A MASSIVE COMPILER ERROR\n    // Error: 'class Shape' has no member named 'getRadius'\n    p->getRadius(); \n\n    return 0;\n}\n```",
          "How do you fix it? (Downcasting): If you are holding a `Shape*` pointer, but you absolutely need to call `getRadius()`, you have to tell the compiler to take off the narrow `Shape` tube and look at the whole object again. You do this by casting it back down the inheritance tree (Downcasting).",
          "`Circle *circlePointer = (Circle*)p; // We force the pointer back into a Circle pointer`\n`circlePointer->getRadius(); // NOW THIS WORKS!`"
        ]
      },
      pure_virtual_functions: {
        title: "6. Pure Virtual Functions (The Elegant Solution)",
        points: [
          "The slide provides the ultimate solution to the Early Binding trap: the `virtual` keyword and Pure Virtual Functions.",
          "By adding `virtual void draw() = 0;` to the base `Shape` class, two massive architectural changes occur.",
          "First, it turns `Shape` into an Abstract Class. You can no longer create a blank `Shape` object; it is purely a blueprint for its children.",
          "Second, the `= 0` syntax creates a Pure Virtual Function. It acts as a strict contract, forcing every child class (`Circle`, `Rectangle`) to provide its own specific implementation of `draw()`.",
          "Late Binding (Run-time): Now, when the compiler sees `p[i]->draw();` in the loop, the `virtual` keyword tells it: \"Do NOT lock this function in right now. Wait until the program is running, look at the actual object in memory (Circle or Rectangle), and call that specific child's version.\"",
          "The Result: You can fill an array `Shape *p[10]` with a random mix of Circles and Rectangles. When you loop through and call `draw()`, the program dynamically executes the correct code for each shape on the fly, perfectly preserving the drawing order!"
        ]
      }
    },
    flashcards: [
      { front: "What is Upcasting in C++?", back: "Taking the address of a derived child object and assigning it to a base class pointer (moving up the inheritance tree: Derived -> Base)." },
      { front: "Why does `p->draw()` call the Base class method instead of the Child class method during Early Binding?", back: "The compiler looks only at the *type* of the pointer (`Shape*`), not the contents of the memory it's pointing to at runtime." },
      { front: "Why do we upcast objects instead of just using their original types?", back: "Upcasting is used to manage massive groups of unknown objects. It allows you to put different child objects into a single array of base pointers and process them with a single loop." },
      { front: "What happens if you call a child-specific function using a base class pointer (after upcasting)?", back: "The compiler will throw an error. It looks at the object through the 'narrow vision' of the base class blueprint, which doesn't contain the child-specific function." },
      { front: "What does `virtual void draw() = 0;` do in a C++ class?", back: "It creates a Pure Virtual Function. This forces all child classes to implement their own version of the function and turns the parent class into an Abstract Class (which cannot be instantiated)." }
    ],
    quiz: [
      { question: "If you assign a Circle object to a Shape* pointer without using the virtual keyword, which version of the draw() function does the compiler lock in?", options: ["The Circle's version, because the pointer holds a Circle's memory address.", "The Shape's version, because Early Binding only looks at the pointer's declared type.", "Neither, the compiler throws an error.", "Both versions run simultaneously."], answer: 1 },
      { question: "What is the primary benefit of upcasting in a system with many different derived classes?", options: ["It makes the program run faster.", "It allows you to manage all objects in a single array and process them with a single loop.", "It deletes the parent class to save memory.", "It prevents child classes from overriding functions."], answer: 1 },
      { question: "What is the 'Narrow Vision' rule when using upcasting?", options: ["The compiler can only see private variables.", "The compiler can only look at the blueprint of the pointer's declared type, ignoring any child-specific functions the actual object might have.", "The program can only execute one function at a time.", "Pointers can only hold primitive data types."], answer: 1 },
      { question: "How do you fix the issue where a base pointer cannot access a child-specific function?", options: ["By using Downcasting (casting the base pointer back down to a child pointer).", "By deleting the base class.", "By using Private Inheritance.", "By using the 'friend' keyword."], answer: 0 },
      { question: "What happens when the compiler encounters a function marked as 'virtual' called via a base class pointer?", options: ["It uses Early Binding and locks in the base class version.", "It throws a syntax error.", "It uses Late Binding (Run-time Polymorphism) and waits until the program runs to execute the specific child class's version.", "It deletes the pointer from memory."], answer: 2 }
    ]
  },
  {
    id: 'cpp_diamond_problem',
    title: 'Chapter 12 & 13: The Diamond Problem & Ambiguity',
    notes: {
      intro: "Ah, the Diamond Problem! This is the exact reason why multiple inheritance is considered so dangerous in C++ and why modern languages like Java and C# banned it entirely.",
      diamond_setup: {
        title: "1. The Setup & The Split",
        points: [
          "At the very top, you have a single `Base` class. It has one integer named `b`.",
          "Next, you create two new child classes: `Derived1` and `Derived2`. They both inherit from `Base`.",
          "Because inheritance is copying the parent's blueprint, `Derived1` grabs a copy of `b` and adds `d1`. Its memory box becomes `[ b | d1 ]`.",
          "`Derived2` grabs a copy of `b` and adds `d2`. Its memory box becomes `[ b | d2 ]`."
        ]
      },
      the_disaster: {
        title: "2. The Disaster (The Bottom of the Diamond)",
        points: [
          "Here is where it all goes wrong. You create a `Derived3` class that uses Multiple Inheritance to inherit from both `Derived1` and `Derived2`.",
          "When `Derived3` is built, the C++ compiler blindly copies everything from both parents.",
          "It grabs the memory box from `Derived1`: `[ b | d1 ]` and `Derived2`: `[ b | d2 ]`, and tacks on its own new integer: `[ d12 ]`.",
          "The `Derived3` memory box looks like this: `[ b | d1 | b | d2 | d12 ]`",
          "The Two Massive Problems:",
          "1. Wasted Memory: `Derived3` is carrying around two completely separate copies of the `Base` class data (`b`).",
          "2. Ambiguity (The Compiler Crash): If you write `myObject.b = 100;`, the compiler instantly throws a massive error. It is physically impossible for the compiler to know which `b` you are trying to change! This is the Diamond Problem: ambiguity caused by duplicate parent data."
        ]
      },
      v_shape_ambiguity: {
        title: "3. The \"V-Shape\" Ambiguity (Not a Diamond!)",
        points: [
          "If you have two unrelated parent classes (no shared grandparent) with the same method name, and a child inherits both, it forms a \"V-Shape\", not a diamond. There is no memory duplication, but there is still an Ambiguity Crash.",
          "Example: Class A and Class B both have a `show()` method. The Child inherits both.",
          "If you try to execute `c.show()`, the compiler crashes with: `Error: request for member 'show' is ambiguous`.",
          "The Fix: The Scope Resolution Operator (`::`). You must explicitly tell the compiler which parent's method to use: `c.A::show();` or `c.B::show();`."
        ]
      },
      cpp_fix_virtual: {
        title: "4. How C++ Fixes It: Virtual Tables and Hidden Pointers",
        points: [
          "When you add the `virtual` keyword to an inheritance declaration (e.g. `class Derived1 : virtual public Base`), the compiler stops baking the `Base` data directly inside the child.",
          "Hidden Pointers: The compiler gives `Derived1` and `Derived2` a hidden pointer (the `vbptr`) pointing to a hidden lookup table (the `vbtable`).",
          "The Shared Object: When `Derived3` is finally constructed, the compiler builds exactly ONE instance of `Base` and places it at the very bottom of `Derived3`'s memory footprint.",
          "The hidden pointers inside `Derived1` and `Derived2` are both programmed to point to that single, shared `Base` object.",
          "The Code Reality: Because there is only one shared `Base` object, the bottom-most child class is strictly responsible for calling the `Base` constructor. `Derived3() : Base(99) {}`"
        ]
      },
      java_fix: {
        title: "5. How Java Fixes It: Separating State from Behavior",
        points: [
          "Fixing the Memory Problem (State): Java completely outlaws multiple inheritance of classes. A class can only `extend` ONE parent class. Therefore, memory duplication simply cannot exist.",
          "Fixing the Method Problem (Behavior): Java introduced Interfaces to allow a class to inherit multiple behaviors.",
          "The Modern Java Problem (Java 8+): Developers were given the ability to put actual code inside interfaces using the `default` keyword. Inheriting two interfaces with the exact same `default` method causes a Method Collision.",
          "The Java Override Mandate: Java fixes this method collision with brute force. The compiler halts compilation and forces the developer to manually override the method and explicitly pick which parent to listen to using the `super` keyword (e.g. `Parent1.super.show();`)."
        ]
      }
    },
    flashcards: [
      { front: "What is the C++ Diamond Problem?", back: "When two child classes inherit from a single base class, and a grandchild class inherits from both children. It causes Wasted Memory (duplicate base variables) and Ambiguity (the compiler doesn't know which copy to use)." },
      { front: "How do you fix Ambiguity if two unrelated parents share the exact same method name (The V-Shape)?", back: "By using the Scope Resolution Operator (::) to explicitly tell the compiler which method to use (e.g., `myObject.ClassA::show()`)." },
      { front: "How does C++ fix the memory duplication of the Diamond Problem?", back: "By using `virtual` inheritance. The compiler gives the middle classes a hidden pointer (vbptr) and ensures only ONE shared copy of the base class is created at the very bottom." },
      { front: "How does Java prevent the memory duplication issues of the Diamond Problem?", back: "Java completely outlaws multiple class inheritance. A class can only `extend` one parent, making memory duplication physically impossible." },
      { front: "If a Java class implements two interfaces with the exact same `default` method, how is the collision resolved?", back: "The compiler throws an error and forces the developer to manually override the method, using `InterfaceName.super.methodName()` to explicitly choose a path." }
    ],
    quiz: [
      { question: "Why does the compiler crash when a grandchild class in a Diamond Problem tries to modify a variable from the original base class?", options: ["The variable is private.", "The grandchild doesn't inherit variables.", "Ambiguity: it has two identical copies of the variable and doesn't know which one to change.", "The virtual table deletes the variable."], answer: 2 },
      { question: "If you have a 'V-Shape' inheritance graph (no shared grandparent) where two parents have the same method, does the Diamond Problem apply?", options: ["Yes, it is the exact same problem.", "No. There is no memory duplication, but you still get an Ambiguity crash because the compiler doesn't know which method to call.", "No, the compiler automatically picks the first one.", "Yes, but only in Java."], answer: 1 },
      { question: "When using `virtual` inheritance in C++ to solve the Diamond Problem, which class is responsible for calling the Base class constructor?", options: ["The top Base class itself.", "The middle derived classes.", "The bottom-most child class is strictly responsible.", "The compiler calls it automatically without parameters."], answer: 2 },
      { question: "How does modern Java (Java 8+) resolve a Method Collision when inheriting two identical 'default' methods from interfaces?", options: ["It uses virtual pointers.", "It randomly selects one method.", "It deletes both methods.", "It halts compilation and forces the developer to write a manual override explicitly stating which path to take."], answer: 3 }
    ]
  },
  {
    id: 'cpp_templates',
    title: 'Chapter 14: Templates (Automated Copy-Pasting)',
    notes: {
      intro: "The moment C++ throws those weird `<T>` brackets at you, it looks like alien math. Letâ€™s completely scrap the textbook definitions and go back to the video game logic to understand Templates.",
      the_problem: {
        title: "1. The Problem: Copy-Pasting Code is a Nightmare",
        points: [
          "Imagine you are coding an RPG. You want to create a `MagicBox` that holds items.",
          "First, you write a `MagicBox` class that specifically holds Swords. But wait, you also need a box for Potions. So, you copy-paste the entire `MagicBox` code, rename it, and change every single word \"Sword\" to \"Potion\".",
          "Then you need a box for Armor. You copy-paste it again.",
          "If you find a bug in how the box opens, you now have to fix it in three separate files. It is exhausting, stupid, and terrible coding."
        ]
      },
      the_solution: {
        title: "2. The Solution: Templates (The 3D Printer Blueprint)",
        points: [
          "A Template is C++â€™s way of saying: \"Stop copy-pasting. Write the blueprint once, and I (the compiler) will do the copy-pasting for you.\"",
          "Instead of writing a specific box for Swords or Potions, you write ONE generic blueprint. You use a placeholderâ€”usually the letter `T` (which just stands for \"Type\")â€”as a blank fill-in-the-blank space.",
          "```cpp\n// 1. \"Hey Compiler, T is just a blank space. I'll tell you what it is later.\"\ntemplate <class T> \n\nclass MagicBox {\npublic:\n    // 2. Instead of 'Sword item;' or 'Potion item;', we just use T!\n    T item; \n\n    void putItemInBox(T newItem) {\n        item = newItem;\n    }\n};\n```"
        ]
      },
      how_it_happens: {
        title: "3. How the Magic Actually Happens",
        points: [
          "When you are actually writing your game in the `main()` function, you finally tell the compiler what you want to shove into that blank `T` space using those angle brackets `< >`.",
          "```cpp\nint main() {\n    // We tell the compiler: \"Build a MagicBox, and make T equal 'Sword'\"\n    MagicBox<Sword> weaponStash; \n\n    // We tell the compiler: \"Build a MagicBox, and make T equal 'int'\"\n    MagicBox<int> numbersStash; \n\n    return 0;\n}\n```"
        ]
      },
      compiler_behind_scenes: {
        title: "4. What the Compiler Does Behind Your Back",
        points: [
          "When you click \"Run\", the C++ compiler looks at `MagicBox<Sword>`. It literally acts like a factory robot.",
          "It grabs your one blueprint, secretly copy-pastes it behind the scenes, and aggressively deletes every `T` and replaces it with `Sword`.",
          "Then it looks at `MagicBox<int>`. It copy-pastes the blueprint again, deletes every `T`, and replaces it with `int`.",
          "The Ultimate TL;DR: Templates are just automated copy-pasting. You write the logic of the code once using a blank placeholder (`T`). When you actually use the code, you tell the compiler what word to put in the blank, and it generates the final, perfectly typed code for you before the program even runs."
        ]
      }
    },
    flashcards: [
      { front: "What is the primary purpose of a C++ Template?", back: "To prevent code duplication (copy-pasting) by writing a generic blueprint once and letting the compiler generate specific versions of the code for different data types." },
      { front: "What does the `<T>` stand for in a Template?", back: "It is a placeholder that stands for 'Type'. It acts as a blank space that you will fill in later with a specific class or data type (like `int`, `string`, or `Sword`)." },
      { front: "What does the compiler physically do when it sees `MagicBox<Sword>` in your main function?", back: "It secretly copy-pastes the generic template blueprint and replaces every instance of the `T` placeholder with the word `Sword`, generating a brand new class behind the scenes." }
    ],
    quiz: [
      { question: "Why is manually copy-pasting a class (like creating separate SwordBox and PotionBox classes) considered bad practice?", options: ["It makes the code run faster.", "It makes the code impossible to compile.", "If you find a bug in the logic, you have to manually fix it in every single copied file.", "The compiler will delete the copies."], answer: 2 },
      { question: "In the code `template <class T>`, what is the compiler being told?", options: ["That 'T' is a variable that holds a number.", "That 'T' is a blank placeholder space that will be defined later.", "That the class is abstract and cannot be used.", "That it should delete all classes named T."], answer: 1 },
      { question: "When does the C++ compiler actually generate the specific, typed version of the template code?", options: ["While the program is running (Run-time).", "Before the program runs, when it sees you using the angle brackets (e.g. `<int>`) during compilation.", "When the user types input into the console.", "It never generates it; templates are just comments."], answer: 1 }
    ]
  },
  {
    id: 'cpp_vs_java',
    title: 'Chapter 15: C++ vs Java (The Great Migration)',
    notes: {
      intro: "It's time to shift gears from C++ to Java. While C++ is a powerful, multi-paradigm language that gives you raw control over memory, Java was designed from the ground up to be a purely object-oriented, managed language. Let's look at how their core OOP philosophies differ.",
      classes_and_objects: {
        title: "1. Classes and Objects",
        points: [
          "**C++:** Classes are user-defined types. Objects support multiple paradigms (procedural, OOP). Memory management is manual (pointers, `new`, `delete`).",
          "**Java:** Purely object-oriented (except for primitives). Automatic memory management (Garbage Collection). Class files are loaded dynamically at runtime (bytecode)."
        ]
      },
      constructors_and_destructors: {
        title: "2. Constructors and Destructors",
        points: [
          "**C++:** Supports default, parameterized, and copy constructors. Supports constructor overloading. Destructors handle memory cleanup.",
          "**Java:** Supports default and parameterized constructors but NO copy constructor. Constructor chaining is supported using `this()` and `super()`. Garbage collector handles cleanup (no destructors)."
        ]
      },
      encapsulation_security: {
        title: "3. Encapsulation & Security",
        points: [
          "**C++:** Uses `public`, `protected`, and `private` access specifiers. Full control over memory and object lifecycle. `friend` classes/functions can break encapsulation.",
          "**Java:** Uses `public`, `protected`, `private`, and `default` (package-private) access modifiers. No `friend` classes, so encapsulation is stricter. Immutable objects (like `String`) prevent modification after creation."
        ]
      },
      summary_comparison: {
        title: "4. The Ultimate Summary Comparison",
        points: [
          "```text\nFeature                | C++                                          | Java\n-----------------------|----------------------------------------------|--------------------------------------------------------\nClasses                | Multiple paradigms (OOP, procedural)         | Fully object-oriented (except for primitives)\nObjects                | Created on stack or heap                     | Created on heap only (garbage-collected)\nConstructors           | Default, parameterized, copy                 | Default, parameterized, chaining (this, super)\nMemory Management      | Manual (new, delete, destructors)            | Automatic (Garbage Collection)\nEncapsulation          | Public, private, protected; can use friend   | Public, private, protected, package-private (stricter)\nDestructors            | Manual destruction                           | No destructors, handled by GC\n```"
        ]
      }
    },
    flashcards: [
      { front: "What is the key difference in Memory Management between C++ and Java?", back: "C++ uses manual memory management (`new`, `delete`, destructors). Java uses automatic memory management (Garbage Collection) and has no destructors." },
      { front: "Does Java have a Copy Constructor or a `friend` keyword like C++?", back: "No. Java does not have built-in copy constructors, and it lacks the `friend` keyword, making its encapsulation stricter than C++." },
      { front: "What does Java use for Constructor Chaining?", back: "Java uses `this()` to call another constructor within the same class, and `super()` to call the parent class's constructor." }
    ],
    quiz: [
      { question: "Which of the following is true about Java's OOP implementation compared to C++?", options: ["Java supports procedural programming outside of classes.", "Java is purely object-oriented (except for primitives) and everything must be inside a class.", "Java relies heavily on manual destructors.", "Java allows breaking encapsulation using 'friend' functions."], answer: 1 },
      { question: "How is an object's cleanup handled in Java?", options: ["By explicitly calling a Destructor.", "By using the 'delete' keyword.", "By the automatic Garbage Collector.", "By using the 'friend' keyword."], answer: 2 },
      { question: "Which access modifier exists in Java but not in C++?", options: ["public", "private", "protected", "default (package-private)"], answer: 3 }
    ]
  }
];

