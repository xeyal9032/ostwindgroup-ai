// Mega Programlama Kütüphanesi - OstWindGroup AI
const programmingLibrary = {
  // JavaScript Kütüphanesi - Genişletilmiş
  javascript: {
    basics: {
      variables: {
        description: "JavaScript'te değişken tanımlama ve scope kavramları",
        examples: [
          "var name = 'OstWindGroup'; // Function scope",
          "let age = 25; // Block scope",
          "const company = 'OstWindGroup'; // Immutable",
          "const obj = { name: 'OstWindGroup' }; // Object reference immutable"
        ],
        bestPractices: [
          "const kullanın, değişmeyecek değerler için",
          "let kullanın, değişebilir değerler için",
          "var kullanmaktan kaçının",
          "Hoisting davranışını anlayın"
        ],
        scope: {
          global: "Global scope - Her yerden erişilebilir",
          function: "Function scope - Sadece fonksiyon içinde",
          block: "Block scope - Sadece blok içinde (let, const)"
        }
      },
      functions: {
        description: "JavaScript fonksiyonları ve closure kavramları",
        examples: [
          "function greet(name) { return `Merhaba ${name}!`; }",
          "const greet = (name) => `Merhaba ${name}!`;",
          "const greet = name => `Merhaba ${name}!`;",
          "function createCounter() { let count = 0; return () => ++count; }"
        ],
        bestPractices: [
          "Arrow functions kullanın",
          "Fonksiyon isimleri açıklayıcı olsun",
          "Tek sorumluluk prensibi",
          "Pure functions tercih edin"
        ],
        types: {
          declaration: "function keyword ile tanımlama",
          expression: "Değişkene atama",
          arrow: "Arrow function syntax",
          constructor: "Constructor function"
        }
      },
      arrays: {
        description: "JavaScript dizileri ve array methods",
        examples: [
          "const numbers = [1, 2, 3, 4, 5];",
          "const doubled = numbers.map(n => n * 2);",
          "const filtered = numbers.filter(n => n > 2);",
          "const sum = numbers.reduce((acc, curr) => acc + curr, 0);"
        ],
        methods: [
          "map() - Dönüştürme",
          "filter() - Filtreleme", 
          "reduce() - Azaltma",
          "forEach() - Döngü",
          "find() - Bulma",
          "some() - En az biri true",
          "every() - Hepsi true",
          "includes() - İçeriyor mu",
          "flat() - Düzleştirme",
          "flatMap() - Map + flat"
        ],
        advanced: {
          destructuring: "const [first, second, ...rest] = array;",
          spread: "const newArray = [...oldArray, newItem];",
          rest: "function sum(...numbers) { return numbers.reduce((a, b) => a + b); }"
        }
      },
      objects: {
        description: "JavaScript objeleri ve object manipulation",
        examples: [
          "const person = { name: 'OstWindGroup', age: 25 };",
          "const { name, age } = person; // Destructuring",
          "const newPerson = { ...person, city: 'Istanbul' }; // Spread",
          "Object.keys(person); // ['name', 'age']"
        ],
        methods: [
          "Object.keys() - Anahtarları al",
          "Object.values() - Değerleri al",
          "Object.entries() - Anahtar-değer çiftleri",
          "Object.assign() - Obje birleştirme",
          "Object.freeze() - Objeyi dondur",
          "Object.seal() - Objeyi mühürle"
        ]
      }
    },
    advanced: {
      async: {
        description: "Asenkron JavaScript ve Promise/async-await",
        examples: [
          "async function fetchData() { const data = await fetch('/api'); }",
          "Promise.all([promise1, promise2]).then(results => {});",
          "Promise.race([promise1, promise2]).then(result => {});",
          "async function* asyncGenerator() { yield await fetch('/api'); }"
        ],
        patterns: [
          "Error handling with try/catch",
          "Promise chaining",
          "Async iteration",
          "Promise.allSettled() for multiple promises",
          "AbortController for request cancellation"
        ],
        concepts: {
          eventLoop: "JavaScript event loop ve call stack",
          microtask: "Promise.then() microtask queue",
          macrotask: "setTimeout() macrotask queue",
          concurrency: "Concurrent execution model"
        }
      },
      modules: {
        description: "ES6 Modülleri ve module system",
        examples: [
          "export const api = { get: () => {} };",
          "import { api } from './api.js';",
          "export default class Component {}",
          "import Component, { api } from './module.js';"
        ],
        patterns: [
          "Named exports",
          "Default exports",
          "Re-exports",
          "Dynamic imports",
          "Tree shaking optimization"
        ]
      },
      classes: {
        description: "ES6 Classes ve OOP concepts",
        examples: [
          "class Person { constructor(name) { this.name = name; } }",
          "class Employee extends Person { constructor(name, title) { super(name); this.title = title; } }",
          "static methods ve instance methods",
          "Private fields (#field) ve getters/setters"
        ],
        concepts: [
          "Inheritance - Kalıtım",
          "Encapsulation - Kapsülleme",
          "Polymorphism - Çok biçimlilik",
          "Abstraction - Soyutlama"
        ]
      },
      functional: {
        description: "Functional Programming concepts",
        examples: [
          "const add = (a) => (b) => a + b; // Currying",
          "const compose = (f, g) => (x) => f(g(x));",
          "const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);"
        ],
        concepts: [
          "Pure functions",
          "Immutability",
          "Higher-order functions",
          "Currying",
          "Function composition",
          "Monads (advanced)"
        ]
      }
    },
    frameworks: {
      react: {
        description: "React - Component-based UI library",
        concepts: [
          "Components ve JSX",
          "Props ve State",
          "Hooks (useState, useEffect, useContext)",
          "Lifecycle methods",
          "Event handling",
          "Conditional rendering",
          "Lists ve keys"
        ],
        advanced: [
          "Custom hooks",
          "Context API",
          "useReducer",
          "useMemo ve useCallback",
          "Error boundaries",
          "Suspense ve lazy loading",
          "Server-side rendering (SSR)"
        ],
        ecosystem: [
          "React Router - Routing",
          "Redux - State management",
          "React Query - Data fetching",
          "Styled Components - CSS-in-JS",
          "Material-UI - Component library"
        ]
      },
      vue: {
        description: "Vue.js - Progressive framework",
        concepts: [
          "Template syntax",
          "Reactive data",
          "Computed properties",
          "Watchers",
          "Directives (v-if, v-for, v-model)",
          "Components",
          "Props ve events"
        ],
        advanced: [
          "Composition API",
          "Vuex - State management",
          "Vue Router",
          "Mixins",
          "Custom directives",
          "Plugins"
        ]
      },
      angular: {
        description: "Angular - Full-featured framework",
        concepts: [
          "Components",
          "Services",
          "Dependency injection",
          "TypeScript integration",
          "Templates ve data binding",
          "Directives",
          "Pipes"
        ],
        advanced: [
          "RxJS - Reactive programming",
          "NgRx - State management",
          "Angular CLI",
          "AOT compilation",
          "Lazy loading",
          "Angular Universal - SSR"
        ]
      }
    }
  },

  // Python Kütüphanesi - Genişletilmiş
  python: {
    basics: {
      variables: {
        description: "Python'da değişken tanımlama ve veri tipleri",
        examples: [
          "name = 'OstWindGroup'  # String",
          "age = 25  # Integer",
          "height = 1.75  # Float",
          "is_active = True  # Boolean",
          "numbers = [1, 2, 3, 4, 5]  # List",
          "person = {'name': 'OstWindGroup', 'age': 25}  # Dictionary"
        ],
        types: [
          "str - String (metin)",
          "int - Integer (tam sayı)", 
          "float - Float (ondalık sayı)",
          "bool - Boolean (True/False)",
          "list - List (dizi)",
          "dict - Dictionary (sözlük)",
          "tuple - Tuple (değişmez dizi)",
          "set - Set (küme)"
        ],
        dynamicTyping: "Python dinamik tip sistemi kullanır - değişken tipi runtime'da belirlenir"
      },
      functions: {
        description: "Python fonksiyonları ve parametreler",
        examples: [
          "def greet(name): return f'Merhaba {name}!'",
          "def calculate(a, b): return a + b",
          "lambda x: x * 2  # Lambda function",
          "def func(*args, **kwargs): pass  # Variable arguments"
        ],
        features: [
          "Default parameters - varsayılan parametreler",
          "Keyword arguments - anahtar kelime argümanları",
          "Variable arguments - değişken argümanlar",
          "Lambda functions - anonim fonksiyonlar",
          "Decorators - dekoratörler",
          "Generators - üreteçler"
        ],
        advanced: {
          closures: "def outer(x): def inner(y): return x + y; return inner",
          decorators: "@decorator def func(): pass",
          generators: "def gen(): yield 1; yield 2"
        }
      },
      classes: {
        description: "Python sınıfları ve OOP",
        examples: [
          "class Person: def __init__(self, name): self.name = name",
          "class Employee(Person): def __init__(self, name, title): super().__init__(name); self.title = title",
          "@property def name(self): return self._name",
          "classmethod ve staticmethod decorators"
        ],
        concepts: [
          "Inheritance - Kalıtım",
          "Encapsulation - Kapsülleme",
          "Polymorphism - Çok biçimlilik",
          "Abstraction - Soyutlama",
          "Method Resolution Order (MRO)",
          "Duck Typing - Ördek tipi"
        ],
        special: {
          magicMethods: "__init__, __str__, __repr__, __len__",
          properties: "@property decorator",
          descriptors: "Descriptor protocol"
        }
      },
      dataStructures: {
        description: "Python veri yapıları",
        lists: {
          description: "Listeler - değiştirilebilir diziler",
          examples: [
            "numbers = [1, 2, 3, 4, 5]",
            "numbers.append(6)  # Sonuna ekle",
            "numbers.insert(0, 0)  # Belirli pozisyona ekle",
            "numbers.remove(3)  # Değeri kaldır",
            "numbers.pop()  # Son elemanı al ve kaldır"
          ],
          methods: [
            "append() - Sonuna ekle",
            "extend() - Liste genişlet",
            "insert() - Pozisyona ekle",
            "remove() - Değeri kaldır",
            "pop() - Elemanı al ve kaldır",
            "index() - İndeks bul",
            "count() - Sayı",
            "sort() - Sırala",
            "reverse() - Ters çevir"
          ]
        },
        dictionaries: {
          description: "Sözlükler - anahtar-değer çiftleri",
          examples: [
            "person = {'name': 'OstWindGroup', 'age': 25}",
            "person['city'] = 'Istanbul'  # Yeni anahtar ekle",
            "age = person.get('age', 0)  # Güvenli erişim",
            "for key, value in person.items(): print(f'{key}: {value}')"
          ],
          methods: [
            "keys() - Anahtarları al",
            "values() - Değerleri al",
            "items() - Anahtar-değer çiftleri",
            "get() - Güvenli erişim",
            "update() - Güncelle",
            "pop() - Anahtarı kaldır",
            "clear() - Temizle"
          ]
        },
        sets: {
          description: "Kümeler - benzersiz elemanlar",
          examples: [
            "numbers = {1, 2, 3, 4, 5}",
            "numbers.add(6)  # Eleman ekle",
            "numbers.remove(3)  # Eleman kaldır",
            "union = set1 | set2  # Birleşim",
            "intersection = set1 & set2  # Kesişim"
          ]
        },
        tuples: {
          description: "Demetler - değiştirilemez diziler",
          examples: [
            "coordinates = (10, 20)",
            "person = ('OstWindGroup', 25, 'Istanbul')",
            "name, age, city = person  # Unpacking"
          ]
        }
      }
    },
    advanced: {
      modules: {
        description: "Python modülleri ve paketleri",
        examples: [
          "import math  # Modül import",
          "from datetime import datetime  # Specific import",
          "import numpy as np  # Alias ile import",
          "from .module import function  # Relative import"
        ],
        concepts: [
          "Module system - Modül sistemi",
          "Package structure - Paket yapısı",
          "Import system - Import sistemi",
          "Namespace - İsim alanı",
          "Circular imports - Döngüsel importlar"
        ]
      },
      exceptions: {
        description: "Hata yönetimi ve exception handling",
        examples: [
          "try: risky_operation() except ValueError as e: print(f'Hata: {e}')",
          "try: file = open('file.txt') except FileNotFoundError: print('Dosya bulunamadı') finally: file.close()",
          "raise ValueError('Geçersiz değer')  # Exception fırlat",
          "class CustomException(Exception): pass  # Özel exception"
        ],
        concepts: [
          "Exception hierarchy - Exception hiyerarşisi",
          "Try-except-finally - Hata yakalama",
          "Raise exceptions - Exception fırlatma",
          "Custom exceptions - Özel exceptionlar",
          "Exception chaining - Exception zincirleme"
        ]
      },
      generators: {
        description: "Generator'lar ve iterator'lar",
        examples: [
          "def fibonacci(): a, b = 0, 1; while True: yield a; a, b = b, a + b",
          "squares = (x**2 for x in range(10))  # Generator expression",
          "for value in generator(): print(value)  # Iterator protocol"
        ],
        concepts: [
          "Generator functions - Generator fonksiyonları",
          "Generator expressions - Generator ifadeleri",
          "Iterator protocol - Iterator protokolü",
          "Yield keyword - Yield anahtar kelimesi",
          "Memory efficiency - Bellek verimliliği"
        ]
      },
      decorators: {
        description: "Dekoratörler ve fonksiyon değiştirme",
        examples: [
          "def timer(func): def wrapper(*args, **kwargs): start = time.time(); result = func(*args, **kwargs); print(f'Time: {time.time() - start}'); return result; return wrapper",
          "@timer def slow_function(): time.sleep(1)",
          "class Decorator: def __init__(self, func): self.func = func; def __call__(self, *args, **kwargs): return self.func(*args, **kwargs)"
        ],
        concepts: [
          "Function decorators - Fonksiyon dekoratörleri",
          "Class decorators - Sınıf dekoratörleri",
          "Decorator patterns - Dekoratör desenleri",
          "functools.wraps - Decorator metadata",
          "Multiple decorators - Çoklu dekoratörler"
        ]
      }
    },
    libraries: {
      dataScience: [
        "pandas - Veri analizi ve manipülasyonu",
        "numpy - Sayısal hesaplamalar ve array operations",
        "matplotlib - Veri görselleştirme",
        "seaborn - İstatistiksel veri görselleştirme",
        "scipy - Bilimsel hesaplamalar",
        "scikit-learn - Makine öğrenmesi",
        "jupyter - Interactive notebooks"
      ],
      web: [
        "Django - Full-stack web framework",
        "Flask - Micro web framework",
        "FastAPI - Modern, hızlı API framework",
        "Requests - HTTP kütüphanesi",
        "BeautifulSoup - Web scraping",
        "Celery - Asenkron task queue",
        "Redis - In-memory data store"
      ],
      ai: [
        "TensorFlow - Google'ın deep learning framework'ü",
        "PyTorch - Facebook'un deep learning framework'ü",
        "Scikit-learn - Machine learning kütüphanesi",
        "OpenCV - Computer vision",
        "NLTK - Natural language processing",
        "spaCy - Advanced NLP",
        "Transformers - Hugging Face transformers"
      ],
      system: [
        "os - Operating system interface",
        "sys - System-specific parameters",
        "subprocess - Process management",
        "threading - Thread-based parallelism",
        "multiprocessing - Process-based parallelism",
        "asyncio - Asynchronous I/O",
        "concurrent.futures - High-level async"
      ]
    }
  },

  // Java Kütüphanesi - Genişletilmiş
  java: {
    basics: {
      syntax: {
        description: "Java syntax ve temel kavramlar",
        examples: [
          "public class HelloWorld { public static void main(String[] args) { System.out.println(\"Hello World\"); } }",
          "int age = 25;  // Primitive type",
          "String name = \"OstWindGroup\";  // Reference type",
          "final int MAX_SIZE = 100;  // Constant"
        ],
        concepts: [
          "Object-oriented programming",
          "Platform independence",
          "Strong typing",
          "Memory management",
          "Garbage collection"
        ]
      },
      oop: {
        description: "Object-Oriented Programming in Java",
        examples: [
          "class Person { private String name; public Person(String name) { this.name = name; } }",
          "class Employee extends Person { private String title; public Employee(String name, String title) { super(name); this.title = title; } }",
          "interface Drawable { void draw(); }",
          "abstract class Shape { abstract double getArea(); }"
        ],
        concepts: [
          "Classes and Objects",
          "Inheritance",
          "Polymorphism",
          "Encapsulation",
          "Abstraction",
          "Interfaces",
          "Abstract classes"
        ]
      },
      collections: {
        description: "Java Collections Framework",
        examples: [
          "List<String> names = new ArrayList<>();",
          "Map<String, Integer> ages = new HashMap<>();",
          "Set<Integer> numbers = new HashSet<>();",
          "Queue<String> queue = new LinkedList<>();"
        ],
        interfaces: [
          "List - Ordered collection",
          "Set - Unique elements",
          "Map - Key-value pairs",
          "Queue - FIFO structure",
          "Deque - Double-ended queue"
        ],
        implementations: [
          "ArrayList - Dynamic array",
          "LinkedList - Doubly linked list",
          "HashMap - Hash table",
          "TreeMap - Red-black tree",
          "HashSet - Hash table set",
          "TreeSet - Red-black tree set"
        ]
      }
    },
    advanced: {
      multithreading: {
        description: "Multithreading ve concurrency",
        examples: [
          "class MyThread extends Thread { public void run() { System.out.println(\"Thread running\"); } }",
          "Runnable task = () -> System.out.println(\"Lambda thread\");",
          "ExecutorService executor = Executors.newFixedThreadPool(4);",
          "CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> \"Result\");"
        ],
        concepts: [
          "Thread creation",
          "Synchronization",
          "Locks and Semaphores",
          "Thread pools",
          "Concurrent collections",
          "Atomic operations"
        ]
      },
      streams: {
        description: "Java 8+ Streams API",
        examples: [
          "List<String> filtered = names.stream().filter(n -> n.startsWith(\"A\")).collect(Collectors.toList());",
          "int sum = numbers.stream().mapToInt(Integer::intValue).sum();",
          "Map<String, List<Person>> grouped = people.stream().collect(Collectors.groupingBy(Person::getCity));"
        ],
        operations: [
          "filter() - Filtreleme",
          "map() - Dönüştürme",
          "reduce() - Azaltma",
          "collect() - Toplama",
          "forEach() - İterasyon",
          "sorted() - Sıralama"
        ]
      },
      annotations: {
        description: "Annotations ve reflection",
        examples: [
          "@Override public String toString() { return name; }",
          "@Deprecated public void oldMethod() {}",
          "@SuppressWarnings(\"unchecked\") List rawList = new ArrayList();",
          "@Component public class Service {}"
        ],
        types: [
          "Built-in annotations",
          "Custom annotations",
          "Meta-annotations",
          "Runtime annotations",
          "Compile-time annotations"
        ]
      }
    },
    frameworks: {
      spring: {
        description: "Spring Framework ecosystem",
        modules: [
          "Spring Core - Dependency injection",
          "Spring MVC - Web applications",
          "Spring Boot - Auto-configuration",
          "Spring Security - Authentication",
          "Spring Data - Data access",
          "Spring Cloud - Microservices"
        ],
        concepts: [
          "IoC Container",
          "Dependency Injection",
          "Aspect-Oriented Programming",
          "Bean lifecycle",
          "Configuration",
          "Profiles"
        ]
      },
      hibernate: {
        description: "Hibernate ORM framework",
        concepts: [
          "Object-Relational Mapping",
          "Entity mapping",
          "HQL (Hibernate Query Language)",
          "Criteria API",
          "Caching",
          "Lazy loading"
        ]
      }
    }
  },

  // C# Kütüphanesi - Genişletilmiş
  csharp: {
    basics: {
      syntax: {
        description: "C# syntax ve temel kavramlar",
        examples: [
          "using System; class Program { static void Main() { Console.WriteLine(\"Hello World\"); } }",
          "int age = 25;  // Value type",
          "string name = \"OstWindGroup\";  // Reference type",
          "const int MAX_SIZE = 100;  // Constant"
        ],
        concepts: [
          "Type safety",
          "Memory management",
          "Garbage collection",
          "Nullable types",
          "Generics"
        ]
      },
      oop: {
        description: "Object-Oriented Programming in C#",
        examples: [
          "public class Person { public string Name { get; set; } }",
          "public class Employee : Person { public string Title { get; set; } }",
          "public interface IDrawable { void Draw(); }",
          "public abstract class Shape { public abstract double GetArea(); }"
        ],
        concepts: [
          "Properties",
          "Indexers",
          "Events",
          "Delegates",
          "Lambda expressions",
          "LINQ"
        ]
      },
      collections: {
        description: "C# Collections ve LINQ",
        examples: [
          "List<string> names = new List<string>();",
          "Dictionary<string, int> ages = new Dictionary<string, int>();",
          "var filtered = names.Where(n => n.StartsWith(\"A\")).ToList();",
          "var grouped = people.GroupBy(p => p.City);"
        ],
        linq: [
          "Where - Filtreleme",
          "Select - Projeksiyon",
          "OrderBy - Sıralama",
          "GroupBy - Gruplama",
          "Join - Birleştirme",
          "Aggregate - Toplama"
        ]
      }
    },
    advanced: {
      async: {
        description: "Asynchronous programming",
        examples: [
          "async Task<string> GetDataAsync() { return await httpClient.GetStringAsync(url); }",
          "Task.Run(() => DoWork());",
          "await Task.WhenAll(task1, task2, task3);",
          "CancellationTokenSource cts = new CancellationTokenSource();"
        ],
        concepts: [
          "async/await",
          "Task and Task<T>",
          "Cancellation tokens",
          "ConfigureAwait",
          "Deadlock prevention"
        ]
      },
      reflection: {
        description: "Reflection ve metadata",
        examples: [
          "Type type = typeof(Person);",
          "PropertyInfo prop = type.GetProperty(\"Name\");",
          "MethodInfo method = type.GetMethod(\"ToString\");",
          "object instance = Activator.CreateInstance(type);"
        ]
      },
      attributes: {
        description: "Attributes ve metadata",
        examples: [
          "[Serializable] public class Person {}",
          "[Obsolete(\"Use new method\")] public void OldMethod() {}",
          "[DataContract] public class Data {}",
          "[Authorize] public ActionResult Index() {}"
        ]
      }
    },
    frameworks: {
      dotnet: {
        description: ".NET ecosystem",
        platforms: [
          ".NET Framework - Windows only",
          ".NET Core - Cross-platform",
          ".NET 5+ - Unified platform",
          ".NET MAUI - Mobile and desktop"
        ],
        concepts: [
          "Common Language Runtime (CLR)",
          "Base Class Library (BCL)",
          "Package management (NuGet)",
          "Dependency injection",
          "Configuration system"
        ]
      },
      aspnet: {
        description: "ASP.NET web framework",
        technologies: [
          "ASP.NET MVC - Model-View-Controller",
          "ASP.NET Web API - RESTful services",
          "ASP.NET Core - Modern web framework",
          "Blazor - WebAssembly and Server",
          "SignalR - Real-time communication"
        ]
      },
      entity: {
        description: "Entity Framework ORM",
        concepts: [
          "Code First approach",
          "Database First approach",
          "LINQ to Entities",
          "Change tracking",
          "Migrations",
          "Performance optimization"
        ]
      }
    }
  },

  // Go Kütüphanesi
  go: {
    basics: {
      syntax: {
        description: "Go syntax ve temel kavramlar",
        examples: [
          "package main; import \"fmt\"; func main() { fmt.Println(\"Hello World\") }",
          "var name string = \"OstWindGroup\"",
          "age := 25  // Type inference",
          "const MAX_SIZE = 100"
        ],
        concepts: [
          "Static typing",
          "Compiled language",
          "Goroutines",
          "Channels",
          "Interfaces",
          "Pointers"
        ]
      },
      concurrency: {
        description: "Go concurrency model",
        examples: [
          "go func() { fmt.Println(\"Goroutine\") }()",
          "ch := make(chan int)",
          "ch <- 42  // Send",
          "value := <-ch  // Receive",
          "select { case msg := <-ch: fmt.Println(msg) }"
        ],
        concepts: [
          "Goroutines - Lightweight threads",
          "Channels - Communication",
          "Select statement",
          "Buffered channels",
          "Channel directions"
        ]
      }
    },
    advanced: {
      interfaces: {
        description: "Go interfaces ve type system",
        examples: [
          "type Writer interface { Write([]byte) (int, error) }",
          "type Reader interface { Read([]byte) (int, error) }",
          "type ReadWriter interface { Reader; Writer }",
          "func process(w Writer) { w.Write([]byte(\"data\")) }"
        ]
      },
      packages: {
        description: "Go packages ve modules",
        examples: [
          "go mod init myproject",
          "go get github.com/gin-gonic/gin",
          "import \"github.com/user/package\"",
          "go build -o app main.go"
        ]
      }
    }
  },

  // Rust Kütüphanesi
  rust: {
    basics: {
      ownership: {
        description: "Rust ownership system",
        examples: [
          "let s = String::from(\"hello\");  // Owned",
          "let s2 = s;  // Move, s is no longer valid",
          "let s3 = s2.clone();  // Deep copy",
          "let len = calculate_length(&s3);  // Borrow"
        ],
        concepts: [
          "Ownership rules",
          "Borrowing",
          "References",
          "Lifetime",
          "Memory safety"
        ]
      },
      types: {
        description: "Rust type system",
        examples: [
          "let x: i32 = 42;  // Integer",
          "let y: f64 = 3.14;  // Float",
          "let b: bool = true;  // Boolean",
          "let s: &str = \"hello\";  // String slice",
          "let v: Vec<i32> = vec![1, 2, 3];  // Vector"
        ]
      }
    },
    advanced: {
      traits: {
        description: "Rust traits ve generics",
        examples: [
          "trait Drawable { fn draw(&self); }",
          "impl Drawable for Circle { fn draw(&self) { println!(\"Drawing circle\"); } }",
          "fn process<T: Drawable>(item: T) { item.draw(); }"
        ]
      },
      error: {
        description: "Rust error handling",
        examples: [
          "Result<T, E> - Success or error",
          "Option<T> - Some value or None",
          "match result { Ok(value) => println!(\"{}\", value), Err(e) => println!(\"Error: {}\", e) }",
          "let value = result?;  // Early return on error"
        ]
      }
    }
  },

  // Web Geliştirme Kütüphanesi
  webDevelopment: {
    frontend: {
      html: {
        semantic: [
          "<header> - Sayfa başlığı",
          "<nav> - Navigasyon",
          "<main> - Ana içerik",
          "<section> - Bölüm",
          "<article> - Makale",
          "<aside> - Yan içerik",
          "<footer> - Sayfa altı"
        ],
        accessibility: [
          "alt attribute for images",
          "aria-labels for screen readers",
          "keyboard navigation",
          "color contrast"
        ]
      },
      css: {
        layout: [
          "Flexbox - 1D layout",
          "Grid - 2D layout",
          "Position - Absolute, relative",
          "Float - Legacy layout"
        ],
        responsive: [
          "Media queries",
          "Mobile-first approach",
          "Breakpoints",
          "Viewport units"
        ],
        modern: [
          "CSS Variables",
          "Custom Properties",
          "CSS-in-JS",
          "PostCSS"
        ]
      },
      javascript: {
        dom: [
          "document.getElementById()",
          "document.querySelector()",
          "addEventListener()",
          "createElement()"
        ],
        frameworks: {
          react: [
            "Components",
            "Props",
            "State",
            "Hooks",
            "JSX"
          ],
          vue: [
            "Template",
            "Reactive data",
            "Computed properties",
            "Watchers"
          ],
          angular: [
            "Components",
            "Services",
            "Dependency injection",
            "TypeScript"
          ]
        }
      }
    },
    backend: {
      apis: {
        rest: [
          "GET - Veri alma",
          "POST - Veri gönderme",
          "PUT - Veri güncelleme",
          "DELETE - Veri silme"
        ],
        graphql: [
          "Single endpoint",
          "Type system",
          "Query language",
          "Real-time subscriptions"
        ]
      },
      databases: {
        sql: [
          "MySQL - Popüler SQL DB",
          "PostgreSQL - Gelişmiş SQL DB",
          "SQLite - Hafif SQL DB",
          "SQL Server - Microsoft SQL DB"
        ],
        nosql: [
          "MongoDB - Document DB",
          "Redis - Key-value DB",
          "Elasticsearch - Search engine",
          "Neo4j - Graph DB"
        ]
      }
    }
  }
};

// Tasarım Kütüphanesi
const designLibrary = {
  ui: {
    principles: {
      consistency: "Tutarlılık - Aynı elementler aynı şekilde davranmalı",
      simplicity: "Basitlik - Gereksiz karmaşıklıktan kaçının",
      feedback: "Geri bildirim - Kullanıcıya ne olduğunu gösterin",
      hierarchy: "Hiyerarşi - Önemli elementleri vurgulayın"
    },
    elements: {
      color: {
        primary: "Ana renk - Marka rengi",
        secondary: "İkincil renk - Destekleyici renk",
        accent: "Vurgu rengi - Önemli elementler için",
        neutral: "Nötr renkler - Metin ve arka plan"
      },
      typography: {
        headings: "Başlıklar - H1, H2, H3",
        body: "Gövde metni - Okunabilir font",
        captions: "Açıklamalar - Küçük metinler",
        spacing: "Satır aralığı - Okunabilirlik için"
      },
      spacing: {
        padding: "İç boşluk - Element içi",
        margin: "Dış boşluk - Elementler arası",
        rhythm: "Ritim - Tutarlı boşluklar",
        breathing: "Nefes alma - Yoğunluktan kaçınma"
      }
    }
  },
  ux: {
    research: {
      userInterviews: "Kullanıcı görüşmeleri - İhtiyaçları anlama",
      surveys: "Anketler - Geniş kitle görüşleri",
      personas: "Persona oluşturma - Hedef kitle",
      userJourney: "Kullanıcı yolculuğu - Deneyim haritası"
    },
    design: {
      wireframing: "Wireframe - Yapısal tasarım",
      prototyping: "Prototip - Etkileşimli tasarım",
      testing: "Test - Kullanılabilirlik testi",
      iteration: "İterasyon - Sürekli iyileştirme"
    }
  }
};

// Yapay Zeka Kütüphanesi
const aiLibrary = {
  machineLearning: {
    supervised: {
      classification: "Sınıflandırma - Kategorilere ayırma",
      regression: "Regresyon - Sayısal tahmin",
      algorithms: [
        "Linear Regression",
        "Logistic Regression", 
        "Decision Trees",
        "Random Forest",
        "SVM",
        "Naive Bayes"
      ]
    },
    unsupervised: {
      clustering: "Kümeleme - Benzer gruplar",
      dimensionality: "Boyut azaltma - Özellik seçimi",
      algorithms: [
        "K-Means",
        "Hierarchical Clustering",
        "PCA",
        "t-SNE",
        "DBSCAN"
      ]
    }
  },
  deepLearning: {
    neuralNetworks: {
      perceptron: "Perceptron - Temel nöron",
      mlp: "MLP - Çok katmanlı perceptron",
      backpropagation: "Geri yayılım - Öğrenme algoritması"
    },
    architectures: {
      cnn: "CNN - Evrişimli sinir ağları",
      rnn: "RNN - Tekrarlayan sinir ağları",
      lstm: "LSTM - Uzun kısa vadeli bellek",
      transformer: "Transformer - Dikkat mekanizması"
    }
  },
  applications: {
    nlp: {
      tasks: [
        "Text Classification",
        "Sentiment Analysis",
        "Named Entity Recognition",
        "Machine Translation",
        "Question Answering"
      ],
      models: [
        "BERT",
        "GPT",
        "T5",
        "RoBERTa"
      ]
    },
    computerVision: {
      tasks: [
        "Image Classification",
        "Object Detection",
        "Image Segmentation",
        "Face Recognition"
      ],
      models: [
        "ResNet",
        "YOLO",
        "Mask R-CNN",
        "EfficientNet"
      ]
    }
  }
};

// Sektör ve trend kütüphanesini import et
const industryLibrary = require('./industry-library');

module.exports = {
  programmingLibrary,
  designLibrary,
  aiLibrary,
  industryLibrary
};
