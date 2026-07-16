export const dbmsModules = [
  {
    id: 'dbms_arch',
    title: '17. DBMS Architecture',
    notes: {
      threeSchema: {
        title: "1. View of Data (Three Schema Architecture)",
        intro: "The major purpose of DBMS is to provide users with an abstract view of the data. That is, the system hides certain details of how the data is stored and maintained.",
        objective: "To enable multiple users to access the same data with a personalized view while storing the underlying data only once.",
        levels: [
          {
            name: "Physical level / Internal level",
            desc: "The lowest level of abstraction describes how the data are stored. Low-level data structures used.",
            details: ["Has Physical schema which describes physical storage structure.", "Talks about Storage allocation (N-ary tree etc), Data compression & encryption.", "Goal: We must define algorithms that allow efficient access to data."]
          },
          {
            name: "Logical level / Conceptual level",
            desc: "Describes the design of a database at the conceptual level (what data are stored, relationships).",
            details: ["User at logical level does not need to be aware about physical-level structures.", "DBA uses this level to decide what information to keep in DB.", "Goal: ease to use."]
          },
          {
            name: "View level / External level",
            desc: "Highest level of abstraction aims to simplify users' interaction by providing different view to different end-user.",
            details: ["View schema describes part of DB user is interested in, hides the rest.", "Contains subschemas to describe different views.", "Provides a security mechanism to prevent unauthorized access."]
          }
        ]
      },
      instancesSchemas: {
        title: "2. Instances and Schemas",
        points: [
          { term: "Instance", desc: "The collection of information stored in the DB at a particular moment." },
          { term: "Schema", desc: "The overall design of the DB. Structural description of data (doesn't change frequently)." },
          { term: "Types of Schemas", desc: "Physical, Logical, and several view schemas (subschemas)." },
          { term: "Logical Schema", desc: "Most important in terms of its effect on application programs (programmers construct apps using logical schema)." },
          { term: "Physical Data Independence", desc: "Physical schema changes should not affect logical schema/application programs." }
        ]
      },
      dataModels: {
        title: "3. Data Models",
        points: [
          "Provides a way to describe the design of a DB at logical level.",
          "Underlying structure of the DB is the Data Model; a collection of conceptual tools for describing data, relationships, semantics & consistency constraints.",
          "E.g., ER model, Relational Model, object-oriented model, object-relational data model etc."
        ]
      },
      databaseLanguages: {
        title: "4. Database Languages",
        ddl: { name: "Data Definition Language (DDL)", desc: "Specify database schema and consistency constraints checked on every update." },
        dml: { 
          name: "Data Manipulation Language (DML)", 
          desc: "Express database queries and updates (Retrieval, Insertion, Deletion, Updating existing information).",
          query: "Query language is a part of DML used to specify statements requesting the retrieval of information."
        }
      },
      appAccess: {
        title: "5. Database Access from Apps",
        desc: "Apps (written in host languages like C/C++, Java) interact with DB. APIs are provided to send DML/DDL statements to DB and retrieve results (e.g., ODBC for C, JDBC for Java)."
      },
      dba: {
        title: "6. Database Administrator (DBA)",
        desc: "A person who has central control of both the data and the programs that access those data.",
        functions: ["Schema Definition", "Storage structure & access methods", "Schema and physical organization modifications", "Authorization control", "Routine maintenance (Periodic backups, Security patches, Any upgrades)"]
      },
      architectures: {
        title: "7. DBMS Application Architectures",
        types: [
          { name: "1-Tier (T1)", desc: "The client, server & DB all present on the same machine." },
          { name: "2-Tier (T2)", desc: "App partitioned into 2-components. Client invokes DB at server end through query statements using APIs like ODBC & JDBC." },
          { name: "3-Tier (T3)", desc: "App partitioned into 3 logical components. Client acts as frontend. App server acts as middle layer handling Business Logic and communicating with DB. Best for WWW.", advantages: ["Scalability due to distributed app servers", "Data integrity via middle layer", "Security, client can't directly access DB"] }
        ]
      }
    },
    flashcards: [
      { front: "What is the main objective of the Three Schema Architecture?", back: "To enable multiple users to access the same data with a personalized view while storing the underlying data only once." },
      { front: "Which level of abstraction is concerned with data compression, encryption, and storage algorithms?", back: "Physical level / Internal level." },
      { front: "What is the difference between an Instance and a Schema?", back: "An Instance is the data at a particular moment (changes frequently), while a Schema is the overall structural design (doesn't change frequently)." },
      { front: "What is DDL and DML?", back: "DDL (Data Definition Language) specifies the schema and constraints. DML (Data Manipulation Language) handles queries, inserts, deletes, and updates." },
      { front: "What are the advantages of a 3-Tier (T3) Architecture over a 2-Tier?", back: "1. Scalability (distributed app servers)\n2. Data integrity (middle layer minimizes corruption)\n3. Better Security (clients can't access DB directly)." }
    ],
    quiz: [
      { question: "Which level of database abstraction is used by the Database Administrator (DBA) to decide what information to keep?", options: ["Physical level", "Logical level", "View level", "Hardware level"], answer: 1 },
      { question: "A structural description of data that doesn't change frequently is called a:", options: ["Data Model", "Instance", "Schema", "Constraint"], answer: 2 },
      { question: "Which language feature is used to define consistency constraints checked during every DB update?", options: ["Data Manipulation Language (DML)", "Query Language", "Data Definition Language (DDL)", "Host Language"], answer: 2 },
      { question: "In which architecture does the Application Server act as a middle layer containing business logic?", options: ["1-Tier", "2-Tier", "3-Tier", "Distributed-Tier"], answer: 2 }
    ]
  },
  {
    id: 'er_model',
    title: '18. Entity-Relationship Model',
    notes: {
      intro: {
        title: "1. Data Model & ER Model",
        dataModel: "Collection of conceptual tools for describing data, data relationships, data semantics, and consistency constraints.",
        erModel: [
          "It is a high level data model based on a perception of a real world that consists of a collection of basic objects, called entities and of relationships among these objects.",
          "Graphical representation of ER Model is ER diagram, which acts as a blueprint of DB."
        ]
      },
      entities: {
        title: "2. Entities & Entity Sets",
        entityDef: "An Entity is a 'thing' or 'object' in the real world that is distinguishable from all other objects (e.g., each student in a college). It has physical existence and can be uniquely identified by a primary attribute (Primary Key).",
        entityTypes: [
          { name: "Strong Entity", desc: "Can be uniquely identified." },
          { name: "Weak Entity", desc: "Cannot be uniquely identified on its own. Depends on some other strong entity for its existence. It doesn't have sufficient attributes to select a uniquely identifiable attribute (e.g., Loan -> Strong Entity, Payment -> Weak Entity)." }
        ],
        entitySet: "It is a set of entities of the same type that share the same properties, or attributes (e.g., Student, Customer of a bank)."
      },
      attributes: {
        title: "3. Attributes & Types",
        attributeDef: "An entity is represented by a set of attributes (e.g., Student_ID, Name, Standard, Course, Batch, Contact number, Address). For each attribute, there is a set of permitted values called the domain (or value set).",
        types: [
          { name: "Simple", desc: "Attributes which can't be divided further (e.g., Account number, Roll number)." },
          { name: "Composite", desc: "Can be divided into subparts (e.g., Name into first-name, middle-name, last-name; Address into street, city, state, PIN)." },
          { name: "Single-valued", desc: "Only one value attribute (e.g., Student ID)." },
          { name: "Multi-valued", desc: "Attribute having more than one value (e.g., phone-number, dependent-name). May have upper or lower limits applied." },
          { name: "Derived", desc: "Value of this type can be derived from the value of other related attributes (e.g., Age from date of birth, membership-period)." },
          { name: "NULL Value", desc: "When an entity does not have a value for it. May indicate 'not applicable' (value doesn't exist, e.g., no middle-name) or 'unknown' (missing entry or not known yet, e.g., salary)." }
        ]
      },
      relationships: {
        title: "4. Relationships & Constraints",
        relationshipDef: "Association among two or more entities (e.g., Person has vehicle, Customer borrow loan).",
        relationshipTypes: [
          "Strong Relationship: between two independent entities.",
          "Weak Relationship: between weak entity and its owner/strong entity."
        ],
        degree: "Number of entities participating in a relationship (Unary, Binary (most common), Ternary).",
        cardinality: {
          title: "Mapping Cardinality / Cardinality Ratio",
          desc: "Number of entities to which another entity can be associated via a relationship.",
          types: [
            { name: "One to one (1:1)", desc: "Entity in A associates with at most one entity in B, and vice versa (e.g., Citizen has Aadhar Card)." },
            { name: "One to many (1:N)", desc: "Entity in A associated with N entities in B, but entity in B is associated with at most one entity in A (e.g., Citizen has Vehicle)." },
            { name: "Many to one (N:1)", desc: "Entity in A associated with at most one entity in B, but entity in B can be associated with N entities in A (e.g., Course taken by Professor)." },
            { name: "Many to many (M:N)", desc: "Entity in A associated with N entities in B, and entity in B associated with N entities in A (e.g., Customer buys product, Student attend course)." }
          ]
        },
        participation: {
          title: "Participation Constraints",
          desc: "Also known as Minimum cardinality constraint.",
          types: [
            { name: "Partial Participation", desc: "Not all entities are involved in the relationship instance." },
            { name: "Total Participation", desc: "Each entity must be involved in at least one relationship instance (e.g., Loan has total participation in 'Customer borrow loan' as it can't exist without a customer). Weak entities have total participation constraint." }
          ]
        }
      },
      notations: {
        title: "5. ER Notations (Symbols)",
        symbols: [
          { symbol: "Rectangle", meaning: "Entity" },
          { symbol: "Double Rectangle", meaning: "Weak Entity" },
          { symbol: "Oval", meaning: "Attribute" },
          { symbol: "Double Oval", meaning: "Multi-valued Attribute" },
          { symbol: "Oval with underline", meaning: "Primary Key Attribute" },
          { symbol: "Oval with dashed underline", meaning: "Weak Key Attribute" },
          { symbol: "Dashed Oval", meaning: "Derived Attribute" },
          { symbol: "Diamond", meaning: "Relationship" },
          { symbol: "Double Diamond", meaning: "Weak Relationship" },
          { symbol: "Double Line", meaning: "Total Participation" }
        ]
      },
      trap: {
        title: "6. The Classic Database Trap",
        desc: "It is incredibly common to confuse these two concepts because they often overlap in the real world. To clear this up, you just have to remember what each concept is actually measuring:",
        identity: {
          title: "1. Strong vs. Weak Entity (The 'Identity' Question)",
          desc: "This is entirely about whether an entity has its own Primary Key to uniquely identify itself without anyone else's help.",
          strong: "It can stand completely on its own. Example: A 'University Building' has a unique identifier ('Building_Name'). It doesn't need any other information to exist or be identified.",
          weak: "It does not have a unique identifier of its own. It relies on a Strong Entity to give it meaning. Example: A 'Room'. If told to 'Go to Room 101', you will ask, 'Which building?'. Room 101 means absolutely nothing on its own. The 'Room' (Weak Entity) depends entirely on the 'Building' (Strong Entity) for its identity. (Visual Symbol: Double Rectangle)"
        },
        rules: {
          title: "2. Total vs. Partial Participation (The 'Rules' Question)",
          desc: "This has nothing to do with identity or primary keys. This is just a business rule set by the database designer about a specific relationship (verb).",
          total: "The database physically forces every single entity in this group to be part of the relationship. Example: An 'Employee' and a 'Department'. The company rule is: 'Every employee MUST be assigned to a department.' Therefore, the Employee entity has Total Participation. You cannot exist in the database as a floating employee with no department. (Visual Symbol: Double Line)",
          partial: "The entity can participate, but it doesn't have to. Example: The 'Department' side of that same relationship. A company might create a brand new 'AI Department' but hasn't hired anyone for it yet. The department exists, but currently has no employees. Therefore, the Department has Partial Participation. (Visual Symbol: Single Line)"
        },
        overlap: {
          title: "3. Why do people confuse them? (The Overlap)",
          desc: "People confuse them because a Weak Entity ALWAYS has Total Participation. Think about the Room and the Building. Because a room relies on a building for its very existence, it is physically impossible to have a room floating in the database without being attached to a building. Therefore, a Weak Entity is always connected with a Double Line (Total Participation).",
          difference: "The difference is that a Strong Entity can ALSO have Total Participation. Let's look at a Patient and a Hospital Bed:\n\n1. A Patient is a Strong Entity. They have their own unique Patient_ID. They don't need a bed to have an identity.\n2. However, the hospital might have a rule: 'Every admitted patient MUST be assigned to a bed.'\n3. Therefore, the Patient has Total Participation in the 'Assigned To' relationship.",
          summary: [
            "If you lack a Primary Key and need another entity just to exist, you are a Weak Entity.",
            "If you have a Primary Key, but the business rules force you to be connected to something else, you are a Strong Entity with Total Participation.",
            "Visual Rule of Thumb: Whenever you see a Weak Entity, you will see a 'Double-Double-Double' combination: Double Rectangle (Weak Entity), Double Diamond (Identifying Relationship), and Double Line (Total Participation)."
          ]
        }
      }
    },
    flashcards: [
      { front: "What is the difference between a Strong Entity and a Weak Entity?", back: "A Strong Entity can be uniquely identified using its primary key. A Weak Entity cannot be uniquely identified on its own and depends on a strong entity for its existence." },
      { front: "Give an example of a Composite Attribute and a Derived Attribute.", back: "Composite: Name (can be split into first, middle, last). Derived: Age (can be calculated from Date of Birth)." },
      { front: "What does a double rectangle and a double oval signify in an ER diagram?", back: "Double rectangle = Weak Entity. Double oval = Multi-valued Attribute." },
      { front: "What is Mapping Cardinality and what are its four types?", back: "It's the number of entities to which another entity can be associated. The 4 types are: One-to-one, One-to-many, Many-to-one, and Many-to-many." },
      { front: "What is Total Participation?", back: "A constraint where every entity in the entity set must be involved in at least one relationship instance (represented by a double line in ER diagrams)." }
    ],
    quiz: [
      { question: "Which type of attribute can be divided into subparts, such as an Address divided into street, city, and state?", options: ["Simple Attribute", "Derived Attribute", "Composite Attribute", "Multi-valued Attribute"], answer: 2 },
      { question: "In an ER diagram, what shape is used to represent a Relationship?", options: ["Rectangle", "Oval", "Diamond", "Double Oval"], answer: 2 },
      { question: "If a weak entity like 'Payment' depends on a strong entity like 'Loan', what type of relationship exists between them?", options: ["Strong Relationship", "Weak Relationship", "Unary Relationship", "Ternary Relationship"], answer: 1 },
      { question: "Which relationship type describes 'A citizen has an Aadhar Card'?", options: ["One to many", "Many to one", "Many to many", "One to one"], answer: 3 }
    ]
  },
  {
    id: 'extended_er',
    title: '19. Extended ER Features',
    notes: {
      intro: {
        title: "Lecture 4: Extended ER Features",
        desc: "As systems get massive and complex, basic building blocks (Entities, Attributes, Relationships) aren't enough. Database designers borrowed concepts from Object-Oriented Programming (like Classes and Inheritance) to make ER diagrams smarter, cleaner, and less repetitive."
      },
      blankSpaces: {
        title: "1. The Problem with Blank Spaces (NULLs)",
        problem: "Imagine one giant table for a University holding everyone (`PERSON`). It has columns like Name, Date_of_Birth, Salary (Professors), and GPA (Students).",
        disaster: "Adding a Student leaves Salary blank (NULL). Adding a Professor leaves GPA blank. With 50,000 people, the database fills with millions of wasted, blank spaces.",
        fix: "We use the Superclass / Subclass system (Specialisation & Generalisation) to break the data apart so that attributes only live where they belong."
      },
      specialisation: {
        title: "2. Specialisation (The 'Top-Down' Approach)",
        setup: "You start with a very broad, general entity (Superclass, e.g., `Person`).",
        split: "You break it down into more specific Subclasses (e.g., `Employee`, `Student`, `Customer`).",
        isA: "An Employee 'is a' Person. A Student 'is a' Person. Visually represented by a triangle connecting them.",
        reason: "To keep attributes where they belong! An Employee needs a Salary attribute. A Customer needs a Credit_Card attribute. Specialisation keeps the blueprint clean and avoids NULLs."
      },
      generalisation: {
        title: "3. Generalisation (The 'Bottom-Up' Approach)",
        desc: "The exact reverse of Specialisation. You start with specific distinct entities and realize they share the exact same attributes.",
        setup: "You have `Car`, `Jeep`, and `Bus` as separate entities, all having `Engine_Size` and `Number_of_Wheels`.",
        grouping: "Instead of writing those attributes three times, you create a new Superclass called `Vehicle` and push common attributes up to it.",
        reason: "To completely eliminate data repetition and simplify the database design."
      },
      inheritance: {
        title: "4. Inheritance (The Magic of Superclasses)",
        desc: "Using Specialisation or Generalisation automatically triggers Inheritance. Subclasses automatically receive traits of the Superclass.",
        attribute: "An `Employee` automatically inherits `Name` and `Date_of_Birth` from the `Person` Superclass.",
        participation: "If a `Person` can participate in a 'Holds' relationship with a `Bank_Account`, then `Employee` and `Student` automatically get permission to hold a bank account too."
      },
      aggregation: {
        title: "5. Aggregation (Boxing it up)",
        desc: "A specific solution to a strict rule: You are never allowed to connect a Relationship (Diamond) directly to another Relationship (Diamond). Entities connect to Relationships, and that is it.",
        problem: "Imagine a `Doctor` prescribes (`prescribes`) a `Medicine`. You want to record which `Pharmacy` filled (`filled`) that prescription. You cannot connect the `Pharmacy` via `filled` directly to the `prescribes` diamond.",
        solution: "Aggregation is a visual hack. You draw a massive rectangular box around the entire [Doctor - prescribes - Medicine] section. The database treats everything inside this box as one single, giant Entity (e.g., 'Prescription Document'). Now, you can connect the `Pharmacy` to the giant box using the `filled` relationship."
      }
    },
    flashcards: [
      { front: "What is the main problem Specialisation and Generalisation solve?", back: "They eliminate wasted blank (NULL) spaces and data repetition by organizing attributes into Superclasses and Subclasses." },
      { front: "What is Specialisation?", back: "A top-down approach where a broad Superclass (e.g., Person) is broken down into specific Subclasses (e.g., Student, Professor) to assign specific attributes where they belong." },
      { front: "What is Generalisation?", back: "A bottom-up approach where specific entities sharing common attributes (e.g., Car, Bus) are grouped into a new Superclass (e.g., Vehicle) to eliminate repetition." },
      { front: "What happens when Inheritance is triggered?", back: "Subclasses automatically inherit all attributes and relationship participation permissions from their Superclass." },
      { front: "Why is Aggregation used in ER Diagrams?", back: "It provides a visual hack to bypass the rule that Relationships (Diamonds) cannot connect to other Relationships. By boxing a relationship and its entities, it's treated as a single abstract entity." }
    ],
    quiz: [
      { question: "Which approach starts with specific entities and groups them into a broader Superclass?", options: ["Specialisation", "Generalisation", "Aggregation", "Inheritance"], answer: 1 },
      { question: "What is the visual representation of an 'Is-A' relationship in an ER diagram?", options: ["A diamond", "A double rectangle", "A triangle", "A dashed line"], answer: 2 },
      { question: "If an Employee inherits the 'Name' attribute from a Person superclass, what concept is this?", options: ["Aggregation", "Attribute Inheritance", "Generalisation", "Participation Constraints"], answer: 1 },
      { question: "How does Aggregation solve the 'Diamond-to-Diamond' rule violation?", options: ["It uses a double line to connect them.", "It draws a box around a relationship making it an abstract entity.", "It uses a triangle to link them.", "It creates a weak entity."], answer: 1 }
    ]
  },
  {
    id: 'relational_model',
    title: '20. Relational Model',
    notes: {
      intro: {
        title: "1. The Basic Vocabulary (Translating the Blueprint)",
        desc: "The Relational Model teaches us how to take a theoretical ER diagram (the blueprint) and turn it into actual tables that a computer can understand (using software like MySQL or Oracle). We stop using words like 'Entity' and start using spreadsheet terminology.",
        definitions: [
          { term: "Relation = Table", meaning: "An entity (like 'Student') becomes a table." },
          { term: "Tuple = Row", meaning: "A single record in the table (e.g., all the data for John Doe)." },
          { term: "Attribute = Column", meaning: "The properties of the entity (e.g., Name, Age, GPA)." },
          { term: "Domain", meaning: "The strict list of permitted values for a specific column. (e.g., The domain for a 'Month' column is only the numbers 1 through 12)." },
          { term: "Degree", meaning: "The total number of columns in the table." },
          { term: "Cardinality", meaning: "The total number of rows in the table." },
          { term: "Relational Key", meaning: "Set of attributes which can uniquely identify each tuple." }
        ]
      },
      properties: {
        title: "2. Properties of a Relational Table (The Strict Rules)",
        list: [
          "The name of the relation is distinct among all other relations.",
          "Values must be Atomic: Multi-valued (multiple phone numbers) and Composite attributes (Address = Street + City + ZIP) from ER diagrams are illegal here. Every cell holds one indivisible piece of data.",
          "The name of each attribute/column must be unique.",
          "Every tuple (row) must be unique: You cannot have two identical rows.",
          "Sequence doesn't matter: The database doesn't care what order the rows or columns are in.",
          "Tables must follow integrity constraints to maintain data consistency."
        ]
      },
      keys: {
        title: "3. Database Keys (The Hierarchy)",
        list: [
          { name: "Super Key (SK)", desc: "Any combination of columns that can uniquely identify a row. Example: {Aadhar Card + First Name + Last Name}. It guarantees we find the person, but it's overkill." },
          { name: "Candidate Key (CK)", desc: "A Super Key stripped down to its minimal form with absolutely no redundant attributes. Example: {Aadhar Card} is a CK. {Passport Number} is also a CK." },
          { name: "Primary Key (PK)", desc: "The database designer looks at all Candidate Keys and picks exactly one to be the official identifier. Example: The designer chooses {Aadhar Card} as the PK." },
          { name: "Alternate Key (AK)", desc: "The 'losers' of the Primary Key election. Example: Because Aadhar was chosen, {Passport Number} becomes an Alternate Key." },
          { name: "Foreign Key (FK)", desc: "Creates a relationship between two tables. A relation (r1) may include the PK of another relation (r2). r1 is called the Referencing (Child) relation of the FK dependency, and r2 is called the Referenced (Parent) relation. Helps to cross-reference between two different relations. Example: An Orders table has a Customer_ID column pointing back to the Customers table." },
          { name: "Composite Key", desc: "A Primary Key that requires at least two columns combined to be unique (e.g., {Flight_Number + Date})." },
          { name: "Compound Key", desc: "A specific type of Composite Key where the columns you are combining are both Foreign Keys pointing to other tables." },
          { name: "Surrogate Key", desc: "A completely fake, synthetic column created by the database just to act as an ID when natural data makes a terrible PK (like an auto-incrementing integer: 1, 2, 3...)." }
        ]
      },
      integrity: {
        title: "4. Integrity Constraints (Keeping the Data Clean)",
        desc: "Constraints are the invisible electric fences the database sets up to prevent bad data from corrupting the system when users run CRUD operations.",
        types: [
          { name: "Domain Constraints", desc: "Prevents users from entering the wrong type or range of data. Example: If you try to enter 'Apple' into a Phone_Number column, or a birth year of '3024', the Domain Constraint blocks it." },
          { name: "Entity Constraints", desc: "The most fundamental rule: Every table must have a Primary Key, and that Primary Key cannot be NULL. You cannot have a completely anonymous, unidentifiable row floating in your table." },
          { name: "Referential Constraints", desc: "Maintains consistency among tuples of two relations. Requires that a foreign key value in the referencing (child) table must exactly match a primary key value in the referenced (parent) table, or it must be NULL." },
          { name: "Key Constraints (The 6 Types)", desc: "These constraints enforce rules at the column (attribute) level to maintain data integrity during CRUD operations:", list: [
            { name: "1. NOT NULL", desc: "Restricts the user from entering a NULL value. It ensures that every required element in the database has a concrete value." },
            { name: "2. UNIQUE", desc: "Ensures that all the values in a specific column are completely different from each other (no duplicates allowed)." },
            { name: "3. DEFAULT", desc: "Used to set a fallback default value to the column. If a user inserts a row but doesn't provide a value for this column, the default is automatically injected." },
            { name: "4. CHECK", desc: "A custom logical test that keeps a check on data before and after a CRUD operation. E.g., 'Age > 18'. If the test fails, the database rejects the action." },
            { name: "5. PRIMARY KEY", desc: "An attribute (or set of attributes) that uniquely identifies each entity. It is a strict combination of UNIQUE and NOT NULL constraints." },
            { name: "6. FOREIGN KEY", desc: "When there is a relationship between two tables, there must be a common attribute. The parent's Primary Key becomes the child's Foreign Key. This constraint prevents actions that would result in orphaned data or loss of connection." }
          ]}
        ]
      }
    },
    flashcards: [
      { front: "What is the difference between Degree and Cardinality in a table?", back: "Degree is the number of attributes/columns. Cardinality is the total number of tuples/rows." },
      { front: "What is the difference between a Super Key (SK) and a Candidate Key (CK)?", back: "A Super Key is any combination of attributes that uniquely identifies a tuple. A Candidate Key is a minimal Super Key (no redundant attributes)." },
      { front: "What does it mean for table values to be atomic?", back: "The values cannot be broken down any further (e.g., a single value per cell, not an array or list)." },
      { front: "What is the role of a Foreign Key (FK)?", back: "It creates a relationship between two tables by having the Child (Referencing) table include the Primary Key of the Parent (Referenced) table." },
      { front: "What is a Surrogate Key?", back: "A synthetic Primary Key generated automatically by the database, usually an integer, rather than being derived from application data." }
    ],
    quiz: [
      { question: "Which key is defined as the minimum subset of super keys that can uniquely identify each tuple?", options: ["Primary Key", "Alternate Key", "Candidate Key", "Surrogate Key"], answer: 2 },
      { question: "The total number of rows (tuples) in a relation is known as its:", options: ["Degree", "Domain", "Cardinality", "Schema"], answer: 2 },
      { question: "Which constraint ensures that every relation must have a Primary Key and it cannot be NULL?", options: ["Domain Constraint", "Foreign Key Constraint", "Entity Constraint", "Atomic Constraint"], answer: 2 },
      { question: "If relation 'r1' includes the Primary Key of relation 'r2', what is 'r1' known as?", options: ["Referenced Relation", "Parent Relation", "Referencing (Child) Relation", "Surrogate Relation"], answer: 2 }
    ]
  },
  {
    id: 'er_to_relational',
    title: '21. Transform - ER to Relational',
    notes: {
      intro: {
        title: "1. Introduction to Transformation",
        points: [
          "Both ER-Model and Relational Model are abstract logical representation of real world enterprises. Because the two models implies the similar design principles, we can convert ER design into Relational design.",
          "Converting a DB representation from an ER diagram to a table format is the way we arrive at Relational DB-design from an ER diagram."
        ]
      },
      notations: {
        title: "2. ER Diagram Notations to Relations",
        rules: [
          {
            entity: "1. Strong Entity",
            steps: [
              "Becomes an individual table with entity name, attributes becomes columns of the relation.",
              "Entity's Primary Key (PK) is used as Relation's PK.",
              "FK are added to establish relationships with other relations."
            ]
          },
          {
            entity: "2. Weak Entity",
            steps: [
              "A table is formed with all the attributes of the entity.",
              "PK of its corresponding Strong Entity will be added as FK.",
              "PK of the relation will be a composite PK, {FK + Partial discriminator Key}."
            ]
          },
          {
            entity: "3. Single Values Attributes",
            steps: [
              "Represented as columns directly in the tables/relations."
            ]
          },
          {
            entity: "4. Composite Attributes",
            steps: [
              "Handled by creating a separate attribute itself in the original relation for each composite attribute.",
              "e.g., Address: {street-name, house-no}, is a composite attribute in customer relation, we add address-street-name & address-house-name as new columns in the attribute and ignore \"address\" as an attribute."
            ]
          },
          {
            entity: "5. Multivalued Attributes",
            steps: [
              "New tables (named as original attribute name) are created for each multivalued attribute.",
              "PK of the entity is used as column FK in the new table.",
              "Multivalued attribute's similar name is added as a column to define multiple values.",
              "PK of the new table would be {FK + multivalued name}.",
              "e.g., For Strong entity Employee, dependent-name is a multivalued attribute.",
              "  1. New table named dependent-name will be formed with columns emp-id, and dname.",
              "  2. PK: {emp-id, name}",
              "  3. FK: {emp-id}"
            ]
          },
          {
            entity: "6. Derived Attributes",
            steps: [
              "Not considered in the tables."
            ]
          },
          {
            entity: "7. Generalisation",
            steps: [
              "Method-1: Create a table for the higher level entity set. For each lower-level entity set, create a table that includes a column for each of the attributes of that entity set plus a column for each attribute of the primary key of the higher-level entity set.\nFor e.g., Banking System generalisation of Account - saving & current.\n1. Table 1: account (account-number, balance)\n2. Table 2: savings-account (account-number, interest-rate, daily-withdrawal-limit)\n3. Table 3: current-account (account-number, overdraft-amount, per-transaction-charges)",
              "Method-2: An alternative representation is possible, if the generalisation is disjoint and completeâ€”that is, if no entity is a member of two lower-level entity sets directly below a higher-level entity set, and if every entity in the higher level entity set is also a member of one of the lower-level entity sets. Here, do not create a table for the higher-level entity set. Instead, for each lower-level entity set, create a table that includes a column for each of the attributes of that entity set plus a column for each attribute of the higher-level entity sets.\nTables would be:\n1. Table 1: savings-account (account-number, balance, interest-rate, daily-withdrawal-limit)\n2. Table 2: current-account (account-number, balance, overdraft-amount, per-transaction-charges)",
              "Drawbacks of Method-2: If the second method were used for an overlapping generalisation, some values such as balance would be stored twice unnecessarily. Similarly, if the generalisation were not completeâ€”that is, if some accounts were neither savings nor current accountsâ€”then such accounts could not be represented with the second method."
            ]
          },
          {
            entity: "8. Aggregation",
            steps: [
              "Table of the relationship set is made.",
              "Attributes includes primary keys of entity set and aggregation set's entities.",
              "Also, add descriptive attribute if any on the relationship."
            ]
          }
        ]
      }
    },
    flashcards: [
      { front: "How is a Strong Entity converted to a relation?", back: "It becomes an individual table with its entity name. Attributes become columns. Its Primary Key becomes the table's PK." },
      { front: "How is a Weak Entity converted?", back: "A table is formed with its attributes. The PK of its corresponding Strong Entity is added as an FK. The table's composite PK is {FK + Partial discriminator Key}." },
      { front: "How are Composite Attributes handled?", back: "By creating a separate column for each component of the composite attribute. (e.g. Address becomes Address-Street and Address-House-No)." },
      { front: "How are Multivalued Attributes handled?", back: "A new table is created named after the attribute. The PK of the main entity is used as an FK. The new table's PK is {FK + multivalued name}." },
      { front: "Are Derived Attributes considered in relations?", back: "No, they are not considered in the tables." }
    ],
    quiz: [
      { question: "In Method-1 of Generalisation mapping, how many tables are created for a parent with two children (e.g., Account -> Savings, Current)?", options: ["1 Table", "2 Tables", "3 Tables", "4 Tables"], answer: 2 },
      { question: "What happens to a Weak Entity when transformed to a relational model?", options: ["It merges into the Strong Entity.", "It forms a table where its PK is the partial discriminator only.", "It forms a table with a composite PK of {Strong Entity FK + Partial Discriminator}.", "It is ignored in the relational model."], answer: 2 },
      { question: "What is a drawback of Method-2 in Generalisation (creating tables only for lower-level entities)?", options: ["It requires too many tables.", "It cannot handle disjoint generalisation.", "If it's overlapping, values might be stored twice unnecessarily.", "It violates domain constraints."], answer: 2 },
      { question: "When handling a multivalued attribute like 'dependent-name' for 'Employee', what is the Primary Key of the newly created table?", options: ["emp-id", "dependent-name", "A surrogate key", "{emp-id, dependent-name}"], answer: 3 }
    ]
  },
  {
    id: 'normalisation',
    title: '22. Normalisation',
    notes: {
      intro: {
        title: "What is Normalisation?",
        points: [
          "Normalisation is a step towards DB optimisation.",
          "Normalisation is used to minimise the redundancy from relations. It is also used to eliminate undesirable characteristics like Insertion, Update, and Deletion Anomalies.",
          "Normalisation divides the composite attributes into individual attributes OR larger table into smaller and links them using relationships.",
          "The normal form is used to reduce redundancy from the database table."
        ]
      },
      whyNormalise: {
        title: "Why Normalisation?",
        reason: "To avoid redundancy in the DB, not to store redundant data.",
        redundancyEffect: "When we have redundant data: Insertion, deletion and updation anomalies arise."
      },
      anomalies: {
        title: "Anomalies",
        intro: "Anomalies means abnormalities. There are three types of anomalies introduced by data redundancy.",
        types: [
          { name: "Insertion Anomaly", desc: "When certain data (attribute) can not be inserted into the DB without the presence of other data." },
          { name: "Deletion Anomaly", desc: "The delete anomaly refers to the situation where the deletion of data results in the unintended loss of some other important data." },
          { name: "Updation Anomaly (Modification Anomaly)", desc: "The update anomaly is when an update of a single data value requires multiple rows of data to be updated. Due to updation to many places, may be Data inconsistency arises, if one forgets to update the data at all the intended places." }
        ],
        consequences: [
          "Due to these anomalies, DB size increases and DB performance become very slow.",
          "To rectify these anomalies and the effect of these on DB, we use Database optimisation technique called NORMALISATION."
        ]
      },
      functionalDependency: {
        title: "Functional Dependency (FD)",
        definition: "It's a relationship between the primary key attribute (usually) of the relation to that of the other attribute of the relation.",
        notation: "X â†’ Y means the left side of FD is known as a Determinant, the right side of the production is known as a Dependent.",
        types: [
          {
            name: "Trivial FD",
            desc: "A â†’ B has trivial functional dependency if B is a subset of A. Aâ†’A, Bâ†’B are also Trivial FD.",
            rule: "If B âŠ† A then A â†’ B holds â€” this is a trivial (and complete non-trivial) FD."
          },
          {
            name: "Non-trivial FD",
            desc: "A â†’ B has a non-trivial functional dependency if B is not a subset of A. [A intersection B is NULL]."
          }
        ]
      },
      armstrongs: {
        title: "Rules of FD (Armstrong's Axioms)",
        rules: [
          {
            name: "Reflexive",
            points: [
              "If 'A' is a set of attributes and 'B' is a subset of 'A'. Then, Aâ†’ B holds.",
              "If A âŠ‡ B then A â†’ B."
            ]
          },
          {
            name: "Augmentation",
            points: [
              "If B can be determined from A, then adding an attribute to this functional dependency won't change anything.",
              "If Aâ†’ B holds, then AXâ†’ BX holds too. 'X' being a set of attributes."
            ]
          },
          {
            name: "Transitivity",
            points: [
              "If A determines B and B determines C, we can say that A determines C.",
              "If Aâ†’ B and Bâ†’ C then Aâ†’ C."
            ]
          }
        ]
      },
      normalForms: {
        title: "Types of Normal Forms",
        forms: [
          {
            name: "1NF (First Normal Form)",
            rules: [
              "Every relation cell must have atomic value.",
              "Relation must not have multi-valued attributes."
            ],
            color: "blue"
          },
          {
            name: "2NF (Second Normal Form)",
            rules: [
              "Relation must be in 1NF.",
              "There should not be any partial dependency.",
              "All non-prime attributes must be fully dependent on PK.",
              "Non prime attribute can not depend on the part of the PK."
            ],
            color: "indigo"
          },
          {
            name: "3NF (Third Normal Form)",
            rules: [
              "Relation must be in 2NF.",
              "No transitivity dependency exists.",
              "Non-prime attribute should not find a non-prime attribute."
            ],
            color: "violet"
          },
          {
            name: "BCNF (Boyce-Codd Normal Form)",
            rules: [
              "Relation must be in 3NF.",
              "FD: A -> B, A must be a super key.",
              "We must not derive prime attribute from any prime or non-prime attribute."
            ],
            color: "emerald"
          }
        ]
      },
      advantages: {
        title: "Advantages of Normalisation",
        points: [
          "Normalisation helps to minimise data redundancy.",
          "Greater overall database organisation.",
          "Data consistency is maintained in DB."
        ]
      }
    },
    flashcards: [
      { front: "What is Normalisation and why do we need it?", back: "Normalisation is a DB optimisation technique to minimise redundancy and eliminate Insertion, Deletion, and Updation anomalies. Without it, DB size increases and performance degrades." },
      { front: "What are the 3 types of anomalies caused by data redundancy?", back: "1. Insertion Anomaly â€” can't insert data without other data.\n2. Deletion Anomaly â€” deleting data causes unintended loss of other data.\n3. Updation Anomaly â€” updating one value requires changing multiple rows, risking data inconsistency." },
      { front: "What is Functional Dependency (FD) and what does X â†’ Y mean?", back: "FD is a relationship between attributes. X â†’ Y means X (Determinant) functionally determines Y (Dependent). Knowing the value of X uniquely identifies the value of Y." },
      { front: "What is the difference between Trivial and Non-trivial FD?", back: "Trivial FD: B is a subset of A (e.g., Aâ†’A). Non-trivial FD: B is NOT a subset of A (A âˆ© B = NULL)." },
      { front: "State Armstrong's 3 axioms for FD.", back: "1. Reflexivity: If B âŠ† A, then A â†’ B.\n2. Augmentation: If A â†’ B, then AX â†’ BX.\n3. Transitivity: If A â†’ B and B â†’ C, then A â†’ C." },
      { front: "What are the requirements for 1NF?", back: "1. Every cell must have an atomic (indivisible) value.\n2. No multi-valued attributes are allowed." },
      { front: "What is Partial Dependency and which Normal Form removes it?", back: "Partial Dependency occurs when a non-prime attribute is functionally dependent on a proper subset of any candidate key. 2NF removes Partial Dependencies." },
      { front: "What is Transitive Dependency and which Normal Form removes it?", back: "Transitive Dependency occurs when a non-prime attribute determines another non-prime attribute (Aâ†’Bâ†’C where A is PK). 3NF removes Transitive Dependencies." },
      { front: "What is the key difference between 3NF and BCNF?", back: "In 3NF, a non-prime attribute can appear on the right side of FD if the left side is a Super Key. In BCNF, for EVERY FD Xâ†’Y, X must be a Super Key â€” no exceptions." }
    ],
    quiz: [
      { question: "What is the primary goal of Normalisation?", options: ["To increase the number of tables.", "To minimise redundancy and eliminate anomalies.", "To increase DB performance by adding indexes.", "To combine multiple tables into one."], answer: 1 },
      { question: "Which anomaly describes the scenario where deleting one record causes unintended loss of other important data?", options: ["Insertion Anomaly", "Updation Anomaly", "Deletion Anomaly", "Redundancy Anomaly"], answer: 2 },
      { question: "In X â†’ Y, what is 'X' called?", options: ["Dependent", "Attribute", "Determinant", "Candidate Key"], answer: 2 },
      { question: "Which of Armstrong's Axioms states: 'If A â†’ B and B â†’ C, then A â†’ C'?", options: ["Reflexivity", "Augmentation", "Transitivity", "Decomposition"], answer: 2 },
      { question: "A â†’ B is a Trivial FD when:", options: ["A âˆ© B = NULL", "B is not a subset of A", "B is a subset of A", "A determines a primary key"], answer: 2 },
      { question: "Which Normal Form specifically eliminates Partial Dependencies?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: 1 },
      { question: "For BCNF, which of the following must be true for every FD X â†’ Y?", options: ["Y must be a prime attribute.", "X must be a Super Key.", "X must be a Foreign Key.", "Y must be a non-prime attribute."], answer: 1 }
    ]
  },
  {
    id: 'transaction',
    title: '23. Transaction',
    notes: {
      intro: {
        title: "Transaction",
        points: [
          "A unit of work done against the DB in a logical sequence.",
          "Sequence is very important in transaction.",
          "It is a logical unit of work that contains one or more SQL statements. The result of all these statements in a transaction either gets completed successfully (all the changes made to the database are permanent) or if at any point any failure happens it gets rollbacked (all the changes being done are undone.)"
        ]
      },
      acid: {
        title: "ACID Properties",
        intro: "To ensure integrity of the data, we require that the DB system maintain the following properties of the transaction.",
        properties: [
          { name: "Atomicity", desc: "Either all operations of transaction are reflected properly in the DB, or none are." },
          { name: "Consistency", desc: "Integrity constraints must be maintained before and after transaction.\nDB must be consistent after transaction happens." },
          { name: "Isolation", desc: "Even though multiple transactions may execute concurrently, the system guarantees that, for every pair of transactions Ti and Tj, it appears to Ti that either Tj finished execution before Ti started, or Tj started execution after Ti finished. Thus, each transaction is unaware of other transactions executing concurrently in the system.\nMultiple transactions can happen in the system in isolation, without interfering each other." },
          { name: "Durability", desc: "After transaction completes successfully, the changes it has made to the database persist, even if there are system failures." }
        ]
      },
      states: {
        title: "Transaction States in DBMS",
        list: [
          { name: "Active state", desc: "The very first state of the life cycle of the transaction, all the read and write operations are being performed. If they execute without any error the T comes to Partially committed state. Although if any error occurs then it leads to a Failed state." },
          { name: "Partially committed state", desc: "After transaction is executed the changes are saved in the buffer in the main memory. If the changes made are permanent on the DB then the state will transfer to the committed state and if there is any failure, the T will go to Failed state." },
          { name: "Committed state", desc: "When updates are made permanent on the DB. Then the T is said to be in the committed state. Rollback can't be done from the committed states. New consistent state is achieved at this stage." },
          { name: "Failed state", desc: "When T is being executed and some failure occurs. Due to this it is impossible to continue the execution of the T." },
          { name: "Aborted state", desc: "When T reaches the failed state, all the changes made in the buffer are reversed. After that the T rollback completely. T reaches abort state after rollback. DB's state prior to the T is achieved." },
          { name: "Terminated state", desc: "A transaction is said to have terminated if has either committed or aborted." }
        ]
      }
    },
    flashcards: [
      { front: "What is a Transaction?", back: "A logical unit of work done against the DB in a logical sequence. It contains one or more SQL statements that either complete fully or rollback entirely." },
      { front: "What does Atomicity mean in ACID?", back: "Either all operations of a transaction are reflected properly in the DB, or none are. (All or nothing)" },
      { front: "What does Isolation mean in ACID?", back: "Multiple transactions can execute concurrently in isolation without interfering with each other. Each transaction appears to run independently." },
      { front: "When does a transaction enter the 'Partially committed state'?", back: "After the transaction is executed and changes are saved in the buffer in the main memory (but not yet permanently on the DB)." },
      { front: "What happens when a transaction reaches the 'Aborted state'?", back: "All changes made in the buffer are reversed (rollback completely), and the DB is restored to its state prior to the transaction." }
    ],
    quiz: [
      { question: "Which ACID property ensures that once a transaction completes successfully, its changes persist even in the event of system failures?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: 3 },
      { question: "What is the very first state of the life cycle of a transaction where read and write operations are performed?", options: ["Partially committed state", "Active state", "Initiated state", "Started state"], answer: 1 },
      { question: "If a transaction is in the partially committed state and a failure occurs, to which state does it transition next?", options: ["Aborted state", "Terminated state", "Failed state", "Active state"], answer: 2 },
      { question: "Which of the following is true about the 'Committed state'?", options: ["Changes are only in the buffer.", "Rollback can still be performed.", "Updates are made permanent on the DB.", "It transitions to the failed state."], answer: 2 }
    ]
  },
  {
    id: 'transaction_implementation',
    title: '24. Atomicity & Durability Implementation',
    notes: {
      intro: "Recovery Mechanism Component of DBMS supports atomicity and durability.",
      shadowCopy: {
        title: "Shadow-copy scheme",
        basics: [
          "Based on making copies of DB (aka, shadow copies).",
          "Assumption: only one Transaction (T) is active at a time.",
          "A pointer called db-pointer is maintained on the disk; which at any instant points to current copy of DB.",
          "T, that wants to update DB first creates a complete copy of DB.",
          "All further updates are done on new DB copy leaving the original copy (shadow copy) untouched.",
          "If at any point the T has to be aborted the system deletes the new copy. And the old copy is not affected."
        ],
        commitSteps: [
          "OS makes sure all the pages of the new copy of DB written on the disk.",
          "DB system updates the db-pointer to point to the new copy of DB.",
          "New copy is now the current copy of DB.",
          "The old copy is deleted.",
          "The T is said to have been COMMITTED at the point where the updated db-pointer is written to disk."
        ],
        atomicity: [
          "If T fails at any time before db-pointer is updated, the old content of DB are not affected.",
          "T abort can be done by just deleting the new copy of DB.",
          "Hence, either all updates are reflected or none."
        ],
        durability: [
          "Suppose, system fails any time before the updated db-pointer is written to disk.",
          "When the system restarts, it will read db-pointer & will thus, see the original content of DB and none of the effects of T will be visible.",
          "T is assumed to be successful only when db-pointer is updated.",
          "If system fails after db-pointer has been updated. Before that all the pages of the new copy were written to disk. Hence, when system restarts, it will read new DB copy."
        ],
        implementationDetail: "The implementation is dependent on write to the db-pointer being atomic. Luckily, disk system provide atomic updates to entire block or at least a disk sector. So, we make sure db-pointer lies entirely in a single sector. By storing db-pointer at the beginning of a block.",
        drawback: "Inefficient, as entire DB is copied for every Transaction."
      },
      logBased: {
        title: "Log-based recovery methods",
        basics: [
          "The log is a sequence of records. Log of each transaction is maintained in some stable storage so that if any failure occurs, then it can be recovered from there.",
          "If any operation is performed on the database, then it will be recorded in the log.",
          "But the process of storing the logs should be done before the actual transaction is applied in the database.",
          "Stable storage is a classification of computer data storage technology that guarantees atomicity for any given write operation and allows software to be written that is robust against some hardware and power failures."
        ],
        deferred: {
          title: "Deferred DB Modifications",
          points: [
            "Ensuring atomicity by recording all the DB modifications in the log but deferring the execution of all the write operations until the final action of the T has been executed.",
            "Log information is used to execute deferred writes when T is completed.",
            "If system crashed before the T completes, or if T is aborted, the information in the logs are ignored.",
            "If T completes, the records associated to it in the log file are used in executing the deferred writes.",
            "If failure occur while this updating is taking place, we preform redo."
          ]
        },
        immediate: {
          title: "Immediate DB Modifications",
          points: [
            "DB modifications to be output to the DB while the T is still in active state.",
            "DB modifications written by active T are called uncommitted modifications.",
            "In the event of crash or T failure, system uses old value field of the log records to restore modified values.",
            "Update takes place only after log records in a stable storage."
          ],
          failureHandling: [
            "System failure before T completes, or if T aborted, then old value field is used to undo the T.",
            "If T completes and system crashes, then new value field is used to redo T having commit logs in the logs."
          ]
        }
      }
    },
    flashcards: [
      { front: "Which DBMS component supports atomicity and durability?", back: "The Recovery Mechanism Component." },
      { front: "What is the core idea of the Shadow-copy scheme?", back: "It is based on making copies of the database (shadow copies) and maintaining a 'db-pointer' to the current copy." },
      { front: "In the Shadow-copy scheme, when is a transaction considered committed?", back: "A transaction is said to have been COMMITTED at the exact point where the updated db-pointer is successfully written to disk." },
      { front: "Why is the Shadow-copy scheme considered inefficient?", back: "Because the entire database is copied for every single transaction." },
      { front: "In log-based recovery, when should the process of storing logs be done?", back: "The process of storing logs should be done BEFORE the actual transaction is applied to the database." },
      { front: "What is Stable Storage in the context of DBMS?", back: "A storage technology that guarantees atomicity for any given write operation and is robust against hardware and power failures." },
      { front: "Explain 'Deferred DB Modifications'.", back: "It ensures atomicity by recording modifications in the log but deferring the execution of write operations until the final action of the transaction has been executed." },
      { front: "What happens in 'Deferred DB Modifications' if a system crashes before the transaction completes?", back: "The information in the logs for that transaction is simply ignored." },
      { front: "Explain 'Immediate DB Modifications'.", back: "Database modifications are output to the DB while the transaction is still in the active state. These are called uncommitted modifications." },
      { front: "How are failures handled in 'Immediate DB Modifications' before a transaction completes?", back: "The system uses the old value field of the log records to undo the transaction." }
    ],
    quiz: [
      { question: "Which of the following is a major assumption of the Shadow-copy scheme?", options: ["Multiple transactions can be active simultaneously.", "Only one transaction is active at a time.", "Database pointer is not required.", "The entire database is never copied."], answer: 1 },
      { question: "In the Shadow-copy scheme, how is a transaction aborted?", options: ["By restoring log files.", "By undoing the changes in the DB.", "By just deleting the new copy of the DB.", "By updating the db-pointer."], answer: 2 },
      { question: "Where must the db-pointer be stored to ensure its update is atomic?", options: ["In RAM.", "In volatile memory.", "Entirely in a single disk sector or block.", "Spread across multiple disk sectors."], answer: 2 },
      { question: "In Log-based recovery methods, what type of storage is used for maintaining the log of each transaction?", options: ["Cache storage", "Volatile storage", "Stable storage", "Temporary storage"], answer: 2 },
      { question: "In 'Deferred DB Modifications', when are the deferred writes actually executed?", options: ["While the transaction is in active state.", "When the transaction is completed.", "Before the log is written.", "As soon as the user requests it."], answer: 1 },
      { question: "In 'Immediate DB Modifications', modifications written by an active transaction are known as:", options: ["Committed modifications", "Uncommitted modifications", "Stable modifications", "Deferred modifications"], answer: 1 },
      { question: "What action is performed in 'Immediate DB Modifications' if a transaction completes, but the system crashes right after?", options: ["Undo the transaction.", "Ignore the logs.", "Redo the transaction using new value fields.", "Delete the new shadow copy."], answer: 2 },
      { question: "What is the primary drawback of the Shadow-copy scheme?", options: ["It requires stable storage.", "It uses immediate DB modifications.", "It cannot handle transaction failures.", "It is inefficient because the entire DB is copied for every transaction."], answer: 3 }
    ]
  },
  {
    id: 'indexing',
    title: '25. Indexing in DBMS',
    notes: {
      intro: {
        title: "Indexing",
        points: [
          "Indexing is used to optimise the performance of a database by minimising the number of disk accesses required when a query is processed.",
          "The index is a type of data structure. It is used to locate and access the data in a database table quickly.",
          "Speeds up operation with read operations like SELECT queries, WHERE clause etc.",
          "Indexing is optional, but increases access speed. It is not the primary mean to access the tuple, it is the secondary mean.",
          "Index file is always sorted."
        ]
      },
      structure: {
        title: "Index Structure",
        parts: [
          { name: "Search Key", desc: "Contains copy of primary key or candidate key of the table or something else." },
          { name: "Data Reference", desc: "Pointer holding the address of disk block where the value of the corresponding key is stored." }
        ]
      },
      methods: {
        title: "Indexing Methods",
        primary: {
          title: "Primary Index (Clustering Index)",
          basics: [
            "A file may have several indices, on different search keys. If the data file containing the records is sequentially ordered, a Primary index is an index whose search key also defines the sequential order of the file.",
            "NOTE: The term primary index is sometimes used to mean an index on a primary key. However, such usage is nonstandard and should be avoided.",
            "All files are ordered sequentially on some search key. It could be Primary Key or non-primary key.",
            "Primary Indexing can be based on Data file is sorted w.r.t Primary Key attribute or non-key attributes."
          ],
          denseSparse: {
            title: "Dense And Sparse Indices",
            dense: [
              "The dense index contains an index record for every search key value in the data file.",
              "The index record contains the search-key value and a pointer to the first data record with that search-key value. The rest of the records with the same search-key value would be stored sequentially after the first record.",
              "It needs more space to store index record itself. The index records have the search key and a pointer to the actual record on the disk."
            ],
            sparse: [
              "An index record appears for only some of the search-key values.",
              "Sparse Index helps you to resolve the issues of dense indexing in DBMS. In this method of indexing technique, a range of index columns stores the same data block address, and when data needs to be retrieved, the block address will be fetched."
            ]
          },
          basedOnKey: [
            "Data file is sorted w.r.t primary key attribute.",
            "PK will be used as search-key in Index.",
            "Sparse Index will be formed i.e., no. of entries in the index file = no. of blocks in datafile."
          ],
          basedOnNonKey: [
            "Data file is sorted w.r.t non-key attribute.",
            "No. Of entries in the index = unique non-key attribute value in the data file.",
            "This is dense index as, all the unique values have an entry in the index file.",
            "E.g., Let's assume that a company recruited many employees in various departments. In this case, clustering indexing in DBMS should be created for all employees who belong to the same dept."
          ],
          multiLevel: [
            "Index with two or more levels.",
            "If the single level index become enough large that the binary search it self would take much time, we can break down indexing into multiple levels."
          ]
        },
        secondary: {
          title: "Secondary Index (Non-Clustering Index)",
          points: [
            "Datafile is unsorted. Hence, Primary Indexing is not possible.",
            "Can be done on key or non-key attribute.",
            "Called secondary indexing because normally one indexing is already applied.",
            "No. Of entries in the index file = no. of records in the data file.",
            "It's an example of Dense index."
          ]
        }
      },
      prosCons: {
        advantages: ["Faster access and retrieval of data.", "IO is less."],
        limitations: ["Additional space to store index table.", "Indexing Decrease performance in INSERT, DELETE, and UPDATE query."]
      }
    },
    flashcards: [
      { front: "What is the primary purpose of indexing in a DBMS?", back: "To optimize database performance by minimizing the number of disk accesses required for queries." },
      { front: "What are the two main components of an index entry?", back: "Search Key and Data Reference." },
      { front: "Is an index file typically sorted or unsorted?", back: "An index file is always sorted." },
      { front: "What is a Dense Index?", back: "An index where there is an index record for every single search key value in the data file." },
      { front: "What is a Sparse Index?", back: "An index where an index record appears for only some of the search-key values, typically pointing to data blocks instead of individual records." },
      { front: "When is a Sparse Index typically formed in Primary Indexing?", back: "When the data file is sorted w.r.t the primary key attribute (no. of entries in index file = no. of blocks in datafile)." },
      { front: "What is another name for Primary Index?", back: "Clustering Index." },
      { front: "Why use a Multi-level Index?", back: "When a single-level index becomes so large that binary search on it would take too much time, breaking it down into multiple levels speeds up access." },
      { front: "In Secondary Indexing, what is the ordering of the data file?", back: "The data file is unsorted." },
      { front: "Is a Secondary Index typically dense or sparse?", back: "It is an example of a Dense index, as the number of entries in the index file equals the number of records in the data file." },
      { front: "Name a major limitation of Indexing.", back: "It requires additional space to store the index table and decreases performance in INSERT, DELETE, and UPDATE queries." }
    ],
    quiz: [
      { question: "Which of the following operations is primarily sped up by using an index?", options: ["INSERT", "DELETE", "SELECT", "UPDATE"], answer: 2 },
      { question: "What does a 'Data Reference' in an index hold?", options: ["A copy of the primary key.", "The actual tuple data.", "A pointer holding the address of the disk block.", "A hash value."], answer: 2 },
      { question: "Which of the following is true about a Dense Index?", options: ["It contains an index record for every search key value in the data file.", "It has index records for only some search-key values.", "It uses less space than a sparse index.", "It is only used with unsorted data files."], answer: 0 },
      { question: "In Primary Indexing based on a Non-Key attribute, the number of entries in the index equals:", options: ["The number of blocks in the data file.", "The total number of records.", "The unique non-key attribute values in the data file.", "The number of levels in the index."], answer: 2 },
      { question: "Which scenario describes a Clustering Index (based on Non-Key attribute)?", options: ["Data file sorted on Primary Key.", "Unsorted data file.", "Data file sorted on a non-key attribute like department name.", "Indexing on a random attribute."], answer: 2 },
      { question: "Secondary Indexing is also known as:", options: ["Clustering Index", "Non-Clustering Index", "Sparse Index", "Multi-level Index"], answer: 1 },
      { question: "How many entries are typically in a Secondary Index file?", options: ["Equal to the number of blocks in the data file.", "Equal to the number of unique values.", "Equal to the number of records in the data file.", "One per index level."], answer: 2 },
      { question: "What is the impact of Indexing on data modification queries (INSERT, DELETE, UPDATE)?", options: ["It increases their performance.", "It has no effect.", "It decreases their performance.", "It makes them atomic."], answer: 2 }
    ]
  },
  {
    id: 'nosql',
    title: '26. NoSQL Databases',
    notes: {
      intro: {
        title: "What is NoSQL?",
        points: [
          "NoSQL databases (aka 'not only SQL') are non-tabular databases and store data differently than relational tables.",
          "They provide flexible schemas and scale easily with large amounts of data and high user loads.",
          "They are schema free.",
          "Data structures used are not tabular, they are more flexible, has the ability to adjust dynamically.",
          "Can handle huge amount of data (big data).",
          "Most of the NoSQL are open sources and has the capability of horizontal scaling.",
          "It just stores data in some format other than relational."
        ]
      },
      history: {
        title: "History behind NoSQL",
        points: [
          "Emerged in the late 2000s as the cost of storage dramatically decreased. Developers became the primary cost, so databases optimized for productivity.",
          "Data becoming unstructured more, hence defining schema in advance became costly.",
          "Allow developers to store huge amounts of unstructured data for flexibility.",
          "Recognising the need to rapidly adapt to changing requirements (Agile).",
          "Cloud computing rose in popularity, needing distribution across servers/regions, scale out, and geo-placement."
        ]
      },
      acidVsBase: {
        title: "ACID vs. BASE & Consistency",
        intro: "The fundamental trade-off of database design: How does NoSQL maintain perfect ACID consistency across multiple different documents spread across servers? Usually, it doesn't. It trades rigid ACID for a more relaxed model called BASE.",
        sections: [
          {
            subtitle: "The Single 'Sticky Note' Rule (Document-Level ACID)",
            desc: "Most NoSQL databases (like MongoDB) have ACID properties, but only for a single document at a time. Updating 5 fields on one document guarantees Atomicity. However, transferring value between two documents is difficult as it cannot easily lock both simultaneously."
          },
          {
            subtitle: "BASE Model",
            desc: "NoSQL prioritizes speed and global scaling using BASE:\nâ€¢ Basically Available: System always responds (won't crash/lock), even if a server goes down.\nâ€¢ Soft State: Database state might change over time without new input due to background syncing.\nâ€¢ Eventual Consistency: If you stop sending updates, eventually all servers worldwide will agree on the same data. Briefly, they might be out of sync."
          },
          {
            subtitle: "Real-World Example (The Instagram Like)",
            desc: "Liking a photo in India instantly updates the Mumbai server. At that exact millisecond, a user in Seattle sees the old count from the Washington server (technically inconsistent). Milliseconds later, Mumbai syncs with Washington, achieving eventual consistency."
          }
        ]
      },
      types: {
        title: "Types of NoSQL Data Models",
        models: [
          {
            name: "Key-Value Stores",
            desc: "The simplest type. Data element stored as a key-value pair. Uses compact, efficient index structures for constant-time retrieval.",
            useCases: "Shopping carts, user preferences, profiles, caching, real-time random data access.",
            examples: "Oracle NoSQL, Amazon DynamoDB, Redis, MongoDB."
          },
          {
            name: "Column-Oriented (Wide-Column)",
            desc: "Data stored such that each row of a column is next to other rows from that same column. Columns often of the same type benefit from efficient compression.",
            useCases: "Analytics.",
            examples: "Cassandra, RedShift, Snowflake, HBase."
          },
          {
            name: "Document Based Stores",
            desc: "Store data in documents similar to JSON objects. Supports ACID properties at document level.",
            useCases: "E-commerce platforms, trading platforms, mobile app development.",
            examples: "MongoDB, CouchDB."
          },
          {
            name: "Graph Based Stores",
            desc: "Focuses on the relationship between data elements (nodes and links/edges). Optimised to capture and search connections, overcoming JOIN overhead.",
            useCases: "Fraud detection, social networks, knowledge graphs.",
            examples: "Neo4j, Amazon Neptune."
          }
        ]
      },
      prosCons: {
        advantages: [
          "Flexible Schema (schema changes in RDBMS are huge tasks).",
          "Horizontal Scaling (scale-out) achieved through Sharding or Replica-sets.",
          "High Availability (auto-replication to preceding consistent state).",
          "Easy insert and read operations (data accessed together is stored together).",
          "Caching mechanism.",
          "Optimized for Cloud applications."
        ],
        disadvantages: [
          "Data Redundancy (optimised for queries, not reducing duplication).",
          "Update & Delete operations are costly.",
          "Single model doesn't fulfil all application needs (may need multiple databases).",
          "Doesn't support multi-document ACID properties in general.",
          "Doesn't support data entry with strict consistency constraints."
        ],
        whenToUse: [
          "Fast-paced Agile development",
          "Storage of structured and semi-structured data",
          "Huge volumes of data",
          "Requirements for scale-out architecture",
          "Modern application paradigms like micro-services and real-time streaming"
        ]
      },
      sqlVsNosql: {
        title: "SQL vs NoSQL",
        headers: ["Feature", "SQL Databases", "NoSQL Databases"],
        rows: [
          ["Data Storage Model", "Tables with fixed rows and columns", "JSON documents, key-value pairs, wide-column tables, Graph nodes/edges"],
          ["Development History", "1970s (focus on reducing data duplication)", "Late 2000s (focus on scaling, agile, DevOps)"],
          ["Primary Purpose", "General Purpose", "Document: general. Key-value: simple lookup. Wide-column: predictable queries. Graph: relationships"],
          ["Schemas", "Fixed", "Flexible"],
          ["Scaling", "Vertical (Scale-up)", "Horizontal (scale-out across servers)"],
          ["ACID Properties", "Supported", "Not Supported (except at document-level in DBs like MongoDB)"],
          ["JOINS", "Typically Required", "Typically not required"],
          ["Data Object Mapping", "Requires ORM", "Many do not require ORMs"]
        ]
      }
    },
    flashcards: [
      { front: "What does NoSQL stand for?", back: "'Not Only SQL'." },
      { front: "What is the primary difference in scaling between SQL and NoSQL?", back: "SQL typically scales Vertically (Scale-up), while NoSQL scales Horizontally (Scale-out) across commodity servers." },
      { front: "What are the four main types of NoSQL data models?", back: "Key-Value, Document, Wide-Column, and Graph." },
      { front: "What does BASE stand for in NoSQL?", back: "Basically Available, Soft state, Eventual consistency." },
      { front: "Explain 'Eventual Consistency'.", back: "If no new updates are made, eventually all servers worldwide will sync and agree on the same data. For a brief moment, they might be out of sync." },
      { front: "Does NoSQL support ACID properties?", back: "Generally no for multi-table transactions, but many support Document-Level ACID (guaranteeing Atomicity for a single document)." },
      { front: "Which NoSQL database type is best for analyzing relationships, like in social networks?", back: "Graph Based Stores (e.g., Neo4j)." },
      { front: "Why are read operations often faster in NoSQL compared to SQL?", back: "Because data accessed together is stored together, eliminating the need for complex and expensive JOIN operations." },
      { front: "What is a major limitation of NoSQL databases regarding data updates?", back: "Update and Delete operations can be costly, and data redundancy is high since they don't focus on reducing duplication." },
      { front: "When should you definitely use SQL instead of NoSQL?", back: "When building applications like banking systems that require strict, multi-table ACID consistency." }
    ],
    quiz: [
      { question: "Which of the following is NOT a characteristic of BASE in NoSQL?", options: ["Basically Available", "Soft State", "Eventual Consistency", "Atomicity"], answer: 3 },
      { question: "In NoSQL, what does Document-Level ACID mean?", options: ["All documents in the DB are locked during an update.", "A single document's updates are guaranteed to be atomic.", "Multiple documents can be updated atomically.", "There are no ACID properties at all."], answer: 1 },
      { question: "Which NoSQL model stores data such that each row of a column is next to other rows from that same column?", options: ["Document Store", "Key-Value Store", "Wide-Column Store", "Graph Store"], answer: 2 },
      { question: "Which of the following use cases is best suited for a Graph Database?", options: ["Shopping Cart", "Fraud Detection", "Financial Ledger", "E-commerce Product Catalog"], answer: 1 },
      { question: "How does NoSQL typically achieve horizontal scaling?", options: ["Adding more RAM to a single server.", "Sharding or Replica-sets.", "Using ORMs.", "Switching to a relational schema."], answer: 1 },
      { question: "A common misconception about NoSQL databases is:", options: ["They don't store relationship data well.", "They are schema-free.", "They scale horizontally.", "They handle large volumes of data."], answer: 0 },
      { question: "Which of the following is a disadvantage of NoSQL?", options: ["Rigid Schemas", "Slow read operations", "Data Redundancy", "Inability to handle unstructured data"], answer: 2 },
      { question: "If you need rapid agile development and have unstructured big data, which database is generally preferred?", options: ["Relational Database", "NoSQL Database", "Centralized Mainframe", "XML Database"], answer: 1 }
    ]
  },
  {
    id: 'modern_data_ecosystems',
    title: '27. Modern Data Ecosystems',
    notes: {
      intro: "Two of the most famous names in the Big Data world, MongoDB and Apache Hadoop, do completely different jobs. Additionally, modern tools like Supabase bring traditional SQL back into the modern web.",
      mongodb: {
        title: "MongoDB (The Ultimate 'Sticky Note' Database)",
        points: [
          "MongoDB is the most famous NoSQL Document Database in the world.",
          "What it is: A database designed to store, retrieve, and manage data for live applications in real-time.",
          "How it stores data: Instead of a spreadsheet, it stores data in 'Collections' (like a folder) that contain 'Documents' (the individual JSON-like sticky notes).",
          "What it is best for: Modern web applications, mobile apps, or video games with complex user profiles. Built to serve data to millions of active users with blistering speed."
        ]
      },
      hadoop: {
        title: "Apache Hadoop (The Heavy Data Lifter)",
        points: [
          "Hadoop is NOT a database. It is a Distributed Data Processing Framework.",
          "What it is: Software tools to store and analyze massive amounts of data (Petabytes) by distributing the workload across a cluster of cheap, regular computers.",
          "HDFS (Hadoop Distributed File System): Chops large files into blocks and scatters them across hundreds of servers.",
          "MapReduce: Instead of loading data into RAM, Hadoop sends math equations to where the data lives (Map), and then master server adds the answers together (Reduce).",
          "What it is best for: Batch Processing. Terrible for real-time applications. Excellent for running massive overnight historical analytics."
        ]
      },
      workingTogether: {
        title: "How MongoDB and Hadoop Work Together",
        points: [
          "The Front Line: MongoDB runs the live website, quickly saving customer orders and loading profiles instantly.",
          "The Transfer: At the end of every week, all new data is exported from MongoDB into Hadoop.",
          "The Back Room: Hadoop acts as a giant historical archive. Data scientists run complex analytics on Hadoop without slowing down the live MongoDB servers."
        ]
      },
      supabase: {
        title: "Supabase (The Big Plot Twist: Return to SQL)",
        intro: "Supabase represents a massive return to SQL. The core database inside Supabase is PostgreSQL (a strict, powerful Relational SQL Database enforcing absolute ACID compliance).",
        points: [
          "The Wrapper Concept: Developers wanted the strict rules and relationships of SQL (to avoid NoSQL's 'Eventual Consistency' headaches in financial/inventory apps), but hated how difficult traditional SQL was to connect to modern apps.",
          "The Solution: Supabase acts as a 'Wrapper'. The engine is Postgres (indestructible SQL freight train), and the dashboard is a modern, easy-to-use API.",
          "Supabase vs. Firebase: Firebase is the NoSQL Document DB king of rapid app development. Supabase was built as the 'Open-Source Firebase Alternative', giving the same fast serverless experience but with strict SQL tables.",
          "Backend-as-a-Service (BaaS): Supabase gives you the entire backend in one box: Postgres DB, Authentication (logins), Storage (large files), and Real-time Subscriptions (broadcasting SQL changes instantly)."
        ]
      }
    },
    flashcards: [
      { front: "What type of database is MongoDB?", back: "It is a NoSQL Document Database." },
      { front: "How does MongoDB organize its data?", back: "It stores data in 'Collections' that contain 'Documents' (JSON-like structures)." },
      { front: "Is Apache Hadoop a database?", back: "No, it is a Distributed Data Processing Framework." },
      { front: "What does HDFS stand for and what does it do?", back: "Hadoop Distributed File System. It chops massive files into blocks and scatters them across different servers." },
      { front: "What is MapReduce?", back: "A framework where math operations are sent to where the data lives (Map), and the finished answers are sent back to a master server to be added together (Reduce)." },
      { front: "What is Hadoop best suited for: Real-time queries or Batch processing?", back: "Batch Processing (e.g., crunching numbers on petabytes of historical data overnight)." },
      { front: "What core database technology powers Supabase?", back: "PostgreSQL, a strict and powerful Relational SQL Database." },
      { front: "Why is Supabase referred to as a 'Wrapper'?", back: "Because it wraps a complex Postgres SQL engine with a modern, easy-to-use dashboard and API for frontend apps." },
      { front: "How does Supabase differ from Firebase?", back: "Firebase uses a NoSQL Document Database, while Supabase (the open-source alternative) uses a strict SQL table structure." },
      { front: "What does BaaS mean, and what features does Supabase offer as a BaaS?", back: "Backend-as-a-Service. Supabase offers Postgres DB, Authentication, Storage, and Real-time Subscriptions." }
    ],
    quiz: [
      { question: "Which of the following best describes MongoDB?", options: ["Distributed Data Processing Framework", "Relational SQL Database", "NoSQL Document Database", "Wide-Column Store"], answer: 2 },
      { question: "What is the primary function of Hadoop?", options: ["Serving real-time user profiles", "Batch processing of massive datasets", "Real-time subscriptions", "Client-side state management"], answer: 1 },
      { question: "Which two components make up the core of Apache Hadoop?", options: ["Postgres and HDFS", "HDFS and MapReduce", "MapReduce and Supabase", "Collections and Documents"], answer: 1 },
      { question: "How do large companies typically combine MongoDB and Hadoop?", options: ["They don't, they are mutually exclusive.", "Hadoop for real-time app data, MongoDB for batch processing.", "MongoDB for real-time live apps, Hadoop for historical batch analytics.", "Both are used as a wrapper for Postgres."], answer: 2 },
      { question: "Supabase was explicitly built as an open-source alternative to which popular platform?", options: ["MongoDB", "Apache Hadoop", "Firebase", "AWS S3"], answer: 2 },
      { question: "Despite its modern API, what kind of database lies at the heart of Supabase?", options: ["NoSQL Document", "Key-Value Store", "Graph Database", "Relational SQL (Postgres)"], answer: 3 },
      { question: "Why might a developer choose Supabase over Firebase for a complex financial app?", options: ["To use a NoSQL database.", "To avoid strict table rules.", "To benefit from strict SQL relationships and absolute ACID compliance.", "Because it uses MapReduce."], answer: 2 },
      { question: "Which of the following is NOT typically provided automatically by a BaaS like Supabase?", options: ["Authentication", "Storage for large files", "Frontend UI rendering", "Real-time database subscriptions"], answer: 2 }
    ]
  },
  {
    id: 'types_of_databases',
    title: 'LEC-16: Types of Databases',
    notes: {
      intro: "This lecture expands the big picture of databases by categorizing the evolution of database types, comparing Relational, Object-Oriented, NoSQL, Hierarchical, and Network databases.",
      relational: {
        title: "1. Relational Databases (SQL)",
        points: [
          "Based on the Relational Model and widely popular since the 1970s.",
          "Data is stored in discrete tables that are JOINed together using foreign keys.",
          "Use Structured Query Language (SQL) for CRUD operations.",
          "Advantages: Strong guarantee of data normalisation and highly optimized for structured data.",
          "Disadvantages: Scalability issues (horizontal scaling is difficult) and increased complexity as data grows huge.",
          "Examples: MySQL, Microsoft SQL Server, Oracle."
        ]
      },
      objectOriented: {
        title: "2. Object-Oriented Databases (The Programmer's Dream)",
        points: [
          "The Problem it Solves: Normally, with SQL, you have to write a complex middle layer of code (ORM) to chop your programming objects into flat rows and columns, and then rebuild them when reading.",
          "The Solution: Drops tables entirely. It stores data exactly as a programming object directly on the disk.",
          "Core Concept: Everything is an Object Package. Information is instantly available in one package instead of being scattered across multiple tables.",
          "Features: Supports OOP concepts like Inheritance, object-identity, and Encapsulation.",
          "Advantages: Data storage and retrieval is easy and quick. Handles complex data relations that standard relational databases struggle with.",
          "Disadvantages: High complexity causes performance issues (read, write, update operations can be slowed down). Lacks massive community support.",
          "Examples: ObjectDB, GemStone."
        ]
      },
      nosql: {
        title: "3. NoSQL Databases",
        points: [
          "Non-tabular databases that store data differently than relational tables.",
          "Types: Document, Key-Value, Wide-Column, and Graph.",
          "Advantages: Flexible schemas (schema free), scales easily with large amounts of data (big data) and high user loads (horizontal scaling).",
          "Data structures are flexible and have the ability to adjust dynamically."
        ]
      },
      hierarchical: {
        title: "4. Hierarchical Databases (The Family Tree Approach)",
        points: [
          "One of the oldest database models, built specifically around a strict parent-child hierarchy.",
          "Structure: A tree-like organization with a root 'parent' at the top, linking to subdirectories (children).",
          "The Golden Rule: A parent record can have multiple child records, but each child record can only have ONE parent.",
          "How it searches: To find data, the engine must traverse the entire tree starting at the root node.",
          "Advantages: Ease of use. Because data naturally maps out in a strict one-to-many physical architecture, traversing a branch is lightning-fast.",
          "Real-World Analogy: Folders on your computer (C: Drive -> Documents -> Notes), or website drop-down menus.",
          "Disadvantages: Inflexible. Cannot describe relationships where a child node has multiple parent nodes (M:N). Top-to-bottom searching can be time-consuming and redundant.",
          "Examples: IBM IMS."
        ]
      },
      network: {
        title: "5. Network Databases",
        points: [
          "An extension of Hierarchical databases designed to solve the inflexibility issue.",
          "Structure: Organized in a Graph structure rather than a strict tree.",
          "The Difference: Child records are given the freedom to associate with multiple parent records.",
          "Advantages: Can handle complex relations that hierarchical databases cannot.",
          "Disadvantages: Maintenance is tedious. The M:N links may cause slow retrieval. Lacks modern web community support.",
          "Examples: Integrated Data Store (IDS), IDMS."
        ]
      },
      summary: {
        title: "The Big Picture Map",
        points: [
          "Relational (SQL): Looks at the world as a collection of organized, strict Spreadsheets connected by keys.",
          "NoSQL (MongoDB): Looks at the world as flexible, independent Sticky Notes (JSON) that can scale globally.",
          "Object-Oriented: Looks at the world exactly how your backend programming code doesâ€”as self-contained Objects.",
          "Hierarchical: Looks at the world as a strict Family Tree or File Directory System."
        ]
      }
    },
    flashcards: [
      { front: "What is an Object-Oriented Database?", back: "A database that drops tables and stores data exactly as a programming object directly on the disk, removing the need for an ORM." },
      { front: "What is the Golden Rule of Hierarchical Databases?", back: "A parent record can have multiple child records, but each child record can only have ONE parent." },
      { front: "What is a major disadvantage of Object-Oriented Databases?", back: "High complexity causes performance issues (slowing down read/write operations) and it lacks massive community support compared to SQL." },
      { front: "How does a Network Database differ from a Hierarchical Database?", back: "A Network database allows a child record to have multiple parent records (Graph structure), whereas a Hierarchical database strictly limits a child to one parent (Tree structure)." },
      { front: "What is the main advantage of a Hierarchical Database?", back: "Traversing a specific branch is lightning-fast because the data is mapped out in a strict one-to-many physical architecture on the disk." }
    ],
    quiz: [
      { question: "Which database type is best compared to a strict family tree or file directory system?", options: ["Relational Database", "NoSQL Database", "Hierarchical Database", "Network Database"], answer: 2 },
      { question: "What problem do Object-Oriented databases primarily solve?", options: ["The inability to scale horizontally.", "The need for complex ORM layers that map programming objects to SQL tables.", "The lack of security in NoSQL databases.", "The need for strict parent-child relationships."], answer: 1 },
      { question: "Which database type uses a Graph structure and allows multiple parent records for a single child?", options: ["Network Database", "Hierarchical Database", "Relational Database", "Document Database"], answer: 0 },
      { question: "Which of the following is a disadvantage of a Hierarchical Database?", options: ["It requires an ORM to interact with code.", "It cannot describe relationships where a child has multiple parents.", "Traversing a single branch is extremely slow.", "It does not support the concept of a 'root' parent."], answer: 1 }
    ]
  },
  {
    id: 'partitioning_sharding',
    title: 'LEC-18: Partitioning & Sharding in DBMS',
    notes: {
      intro: "A big problem can be solved easily when it is chopped into several smaller sub-problems. This is exactly what the partitioning technique does for large databases.",
      concept: {
        title: "1. What is Partitioning?",
        points: [
          "It divides a big database containing data metrics and indexes into smaller and handy slices of data called partitions.",
          "The partitioned tables are directly used by SQL queries without any alteration.",
          "Data Definition Language (DDL) can easily work on the smaller partitioned slices instead of handling the giant database altogether.",
          "Partitioning divides stored database objects into separate servers. This increases performance and controllability of the data.",
          "It helps manage huge chunks of data optimally when horizontally scaling relational databases across multiple servers."
        ]
      },
      verticalHorizontal: {
        title: "2. Vertical vs Horizontal Partitioning",
        points: [
          "Vertical Partitioning: Slicing relation vertically / column-wise. Need to access different servers to get complete tuples.",
          "Horizontal Partitioning: Slicing relation horizontally / row-wise. Independent chunks of data tuples are stored in different servers."
        ]
      },
      whenToApply: {
        title: "3. When is Partitioning Applied?",
        points: [
          "When the dataset becomes so huge that managing and dealing with it becomes a tedious task.",
          "When the number of requests is large enough that single DB server access is taking huge time, leading to high system response time."
        ]
      },
      advantages: {
        title: "4. Advantages of Partitioning",
        points: [
          "Parallelism: Multiple servers process queries simultaneously.",
          "Availability: If one partition fails, others remain accessible.",
          "Performance: Queries run faster on smaller datasets.",
          "Manageability: Smaller chunks are easier to maintain and backup.",
          "Reduce Cost: Scaling-out (horizontal) with commodity hardware is often cheaper than scaling-up (vertical) with a massive supercomputer."
        ]
      },
      sharding: {
        title: "5. Sharding & Distributed Databases",
        points: [
          "Distributed Database: A single logical database that is spread across multiple locations (servers) and logically interconnected by network. It is the product of optimization techniques like Clustering, Partitioning, and Sharding.",
          "Sharding: A technique to implement Horizontal Partitioning.",
          "The fundamental idea of Sharding is that instead of having all data sit on one DB instance, we split it up and introduce a Routing layer to forward requests to the right instances that actually contain the data.",
          "Pros: Massive Scalability and high Availability.",
          "Cons: Increased Complexity (mapping partitions, implementing routing layers), Non-uniformity (might require Re-Sharding), and it is not well suited for Analytical queries (the Scatter-Gather problem)."
        ]
      }
    },
    flashcards: [
      { front: "What is the main goal of Database Partitioning?", back: "To divide a large database into smaller, manageable slices (partitions) across servers to increase performance and data controllability." },
      { front: "What is the difference between Vertical and Horizontal Partitioning?", back: "Vertical Partitioning slices relations column-wise. Horizontal Partitioning slices relations row-wise, storing independent tuples on different servers." },
      { front: "What is Sharding?", back: "A specific technique to implement Horizontal Partitioning, where data is split across instances and a Routing layer forwards requests to the correct instance." },
      { front: "What is the 'Scatter-Gather problem' in Sharding?", back: "A disadvantage where analytical queries spanning the entire dataset are slow, because the system must scatter the query to all shards and gather/merge the results." },
      { front: "Why can Partitioning reduce costs?", back: "Because scaling-out (adding cheaper commodity servers) is often less expensive than scaling-up (buying a single massive super-server)." }
    ],
    quiz: [
      { question: "Which partitioning technique slices relations row-wise?", options: ["Vertical Partitioning", "Horizontal Partitioning", "Diagonal Partitioning", "Clustering"], answer: 1 },
      { question: "What is introduced in Sharding to forward requests to the correct database instance?", options: ["A Load Balancer", "A Routing Layer", "A Caching Layer", "A Master Node"], answer: 1 },
      { question: "Which of the following is considered a CON (disadvantage) of Sharding?", options: ["Decreased availability", "Higher hardware costs", "Complexity and the need for Re-Sharding", "Inability to perform fast single-record lookups"], answer: 2 },
      { question: "A Distributed Database is the product of applying which optimization techniques?", options: ["Normalisation and Indexing", "Clustering, Partitioning, and Sharding", "Vertical Scaling and Upgrading", "Caching and Spooling"], answer: 1 }
    ]
  },
  {
    id: 'cap_theorem',
    title: 'LEC-20: CAP Theorem',
    notes: {
      intro: "The CAP Theorem is one of the most important concepts in Distributed Databases. It is essential for designing efficient distributed systems tailored to your business logic.",
      consistency: {
        title: "1. Consistency",
        points: [
          "In a consistent system, all nodes see the same data simultaneously.",
          "If a read operation is performed, it should return the value of the most recent write operation.",
          "All users see the same data at the same time, regardless of the node they connect to.",
          "When data is written to a single node, it is then replicated across the other nodes in the system."
        ]
      },
      availability: {
        title: "2. Availability",
        points: [
          "The system remains operational all of the time.",
          "Every request will get a response regardless of the individual state of the nodes.",
          "Unlike a consistent system, there's no guarantee that the response will be the most recent write operation."
        ]
      },
      partitionTolerance: {
        title: "3. Partition Tolerance",
        points: [
          "A partition means there's a break in communication between nodes.",
          "If a system is partition-tolerant, the system does not fail regardless of whether messages are dropped or delayed between nodes.",
          "To achieve this, the system must replicate records across combinations of nodes and networks."
        ]
      },
      theorem: {
        title: "4. What does the CAP Theorem say?",
        points: [
          "The CAP theorem states that a distributed system can only provide two of three properties simultaneously: consistency, availability, and partition tolerance.",
          "The theorem formalises the tradeoff between consistency and availability when there's a partition."
        ]
      },
      caDatabases: {
        title: "5. CA Databases (Consistency & Availability)",
        points: [
          "Enables consistency and availability, but cannot deliver fault (partition) tolerance.",
          "Since partitions are bound to happen in distributed systems, CA databases aren't a practical choice for distributed networks.",
          "Some relational databases (MySQL, PostgreSQL) allow for CA. You can deploy them to nodes using replication."
        ]
      },
      cpDatabases: {
        title: "6. CP Databases (Consistency & Partition Tolerance)",
        points: [
          "Enables consistency and partition tolerance, but not availability.",
          "When a partition occurs, the system has to turn off inconsistent nodes until the partition can be fixed.",
          "Structured so there is only one primary node that receives all write requests in a replica set.",
          "Example: MongoDB. In a banking system where Availability is not as important as strict consistency, CP is ideal."
        ]
      },
      apDatabases: {
        title: "7. AP Databases (Availability & Partition Tolerance)",
        points: [
          "Enables availability and partition tolerance, but not strict consistency.",
          "In a partition, all nodes are available but they may not be updated (Eventual Consistency).",
          "Example: Apache Cassandra or Amazon DynamoDB. Has no primary node.",
          "For apps like Facebook, we value availability more than consistency, making AP databases the best choice."
        ]
      }
    },
    flashcards: [
      { front: "What are the three properties of the CAP Theorem?", back: "Consistency, Availability, and Partition Tolerance." },
      { front: "According to the CAP Theorem, how many properties can a distributed system guarantee simultaneously?", back: "Only two out of the three (e.g., CA, CP, or AP)." },
      { front: "What does Consistency mean in the CAP Theorem?", back: "All nodes see the same data simultaneously; any read operation returns the most recent write." },
      { front: "Why are CA databases not practical for distributed systems?", back: "Because network partitions (communication breaks) are inevitable in distributed systems, so a system must have Partition Tolerance (P)." },
      { front: "Is MongoDB a CP or AP database, and why?", back: "MongoDB is a CP database. It uses a single primary node for writes to guarantee consistency, but sacrifices availability if the primary node goes down during a partition." },
      { front: "What type of database is best for Facebook: CP or AP?", back: "AP (Availability and Partition Tolerance), because it's better to show an older version of data than to have the app be unavailable." }
    ],
    quiz: [
      { question: "What does the 'P' stand for in the CAP Theorem?", options: ["Performance", "Partition Tolerance", "Primary Node", "Parallelism"], answer: 1 },
      { question: "Which of the following database types provides Eventual Consistency rather than Strict Consistency?", options: ["CA Databases", "CP Databases", "AP Databases", "Relational Databases"], answer: 2 },
      { question: "If a banking application requires that a user's balance is perfectly accurate at all times, which CAP property MUST it guarantee?", options: ["Availability", "Consistency", "Partition Tolerance", "Latency"], answer: 1 },
      { question: "Which NoSQL database is famously known as a CP database?", options: ["Apache Cassandra", "Amazon DynamoDB", "MongoDB", "MySQL"], answer: 2 },
      { question: "In a CP database, what happens when a network partition occurs?", options: ["The system keeps all nodes available but out of sync.", "The system turns off inconsistent nodes, sacrificing availability.", "The system disables partition tolerance.", "The system switches to an AP model automatically."], answer: 1 }
    ]
  },
  {
    id: 'master_slave_db',
    title: 'LEC-21: The Master-Slave Database Concept',
    notes: {
      intro: "Master-Slave is a general architectural pattern to optimise I/O in a system where the number of requests goes so high that a single DB server cannot handle it efficiently.",
      concept: {
        title: "1. The Core Concept (CQRS)",
        points: [
          "This architecture is a Database Scaling Pattern often related to Command Query Responsibility Segregation (CQRS).",
          "The true or latest data is kept in the Master DB. Therefore, all write operations (Commands) are directed strictly to the Master.",
          "Reading operations (Queries) are done entirely from the Slave databases."
        ]
      },
      whyItsNeeded: {
        title: "2. Why is this Architecture Needed?",
        points: [
          "If a site receives a lot of traffic and relies on a single master database, it will be rapidly overloaded with both reading and writing requests.",
          "This overload makes the entire system slow for everyone on the site.",
          "By separating reads and writes, this architecture safeguards site reliability and availability while significantly reducing latency."
        ]
      },
      replication: {
        title: "3. Database Replication",
        points: [
          "DB replication is the mechanism that takes care of distributing the newly written data from the Master machine to the Slave machines.",
          "Replication can be synchronous (blocking until slaves update) or asynchronous (updating in the background), depending on the system's strictness needs."
        ]
      }
    },
    flashcards: [
      { front: "In a Master-Slave Database architecture, which database handles the write operations?", back: "The Master Database handles all write operations to ensure a single source of truth." },
      { front: "Where are read operations directed in a Master-Slave architecture?", back: "Read operations are directed to the Slave databases." },
      { front: "What does CQRS stand for in database patterns?", back: "Command Query Responsibility Segregation (separating read and write workloads)." },
      { front: "What is the primary benefit of a Master-Slave database architecture?", back: "It optimizes I/O by preventing a single database from being overloaded with simultaneous read and write requests, thus safeguarding availability and reducing latency." },
      { front: "What mechanism is used to distribute data from the Master to the Slaves?", back: "Database Replication (which can be synchronous or asynchronous)." }
    ],
    quiz: [
      { question: "If a system uses a Master-Slave architecture and a user updates their profile picture, which database receives that specific request?", options: ["The Slave Database", "The Master Database", "Both simultaneously", "The Routing Layer"], answer: 1 },
      { question: "What is the primary reason for routing all 'read' requests to Slave databases?", options: ["To prevent the Master database from being overloaded by massive amounts of site traffic.", "To ensure data is always strictly consistent.", "Because Slave databases are inherently faster at processing writes.", "To satisfy the rules of the CAP Theorem."], answer: 0 },
      { question: "Database replication between Master and Slave nodes can be performed in two ways. What are they?", options: ["Vertical and Horizontal", "Synchronous and Asynchronous", "Sharded and Partitioned", "Relational and NoSQL"], answer: 1 },
      { question: "CQRS is a database scaling pattern that is closely related to Master-Slave architecture. What does it stand for?", options: ["Common Query Routing System", "Command Query Responsibility Segregation", "Consistent Query Replication Server", "Centralized Query Routing Segregation"], answer: 1 }
    ]
  },
];

