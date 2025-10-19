// Ukrayna Universitetləri Bilgi Kütüphanesi - OstWindGroup AI
// Bu dosya Ukrayna universitetləri, fakültələr, təhsil haqları və digər məlumatları ehtiva edir

const ukraineUniversities = {
  // Ukrayna Dövlət Biotexnologiya Universiteti
  "Ukrayna Dövlət Biotexnologiya Universiteti": {
    ukrainianName: "Державний біотехнологічний університет",
    status: "Dövlət",
    accreditation: "IV",
    educationForms: ["əyani", "qiyabi"],
    degrees: ["Bakalavr", "Magistr"],
    durationFullTime: "4 il",
    durationPartTime: "4 il",
    tuitionFees: {
      bachelor: {
        fullTime: {
          russianUkrainian: "1-ci il: 1600USD, 2-4-cü il: 1300USD",
          english: "1-ci il: 1900USD, 2-4-cü il: 1600USD"
        },
        partTime: {
          russianUkrainian: "1-ci il: 1300USD, 2-4-cü il: 1000USD",
          english: "1-ci il: 1600USD, 2-4-cü il: 1300USD"
        }
      },
      master: {
        fullTime: {
          russianUkrainian: "1-ci il: 1900USD, 2-ci yarım il: 950USD",
          english: "1-ci il: 2100USD, 2-ci yarım il: 1050USD"
        },
        partTime: {
          russianUkrainian: "1-ci il: 1900USD, 2-ci yarım il: 950USD",
          english: "1-ci il: 1800USD, 2-ci yarım il: 900USD"
        }
      }
    },
    insurance: "4 illik təhsil sığortası: 300USD",
    faculties: [
      "051. İqtisadiyyat",
      "071. Mühasibat uçotu və vergi", 
      "072. Maliyyə, bank və sığorta",
      "073. Menecment",
      "075. Marketinq",
      "076. Sahibkarlıq, ticarət və birja fəaliyyəti",
      "281. Dövlət idarəçiliyi və idarəetmə",
      "292. Beynəlxalq iqtisadi münasibətlər",
      "081. Hüquq",
      "101. Ekologiya",
      "131. Tətbiqi mexanika",
      "133. Sahə maşınqayırma",
      "141. Elektroenergetika, elektroavadanlıq və elektromexanika",
      "151. Avtomatlaşdırma və kompyuter-inteqrasiya texnologiyaları və robot texnologiyaları",
      "162. Biotexnologiya və biomühəndislik",
      "181. Qida texnologiyası",
      "192. Memarlıq, tikinti və mülki mühəndislik",
      "193. Geodeziyası və yer quruluşu",
      "201. Agronomiya",
      "202. Bitki karantini mühafizəsi",
      "204. Heyvandarlıq məhsullarının istehsalı və emalı texnologiyası",
      "205. Meşə təsərrüfatı",
      "206. Landşaft bağçılıq",
      "207. Su bioresursları və akvakultura",
      "208. Aqromühəndislik",
      "241. Otel və restoran biznesi",
      "274. Avtomobil nəqliyyatı",
      "275. Nəqliyyat texnologiyası",
      "211. Baytarlıq"
    ],
    specialFees: {
      "211. Baytarlıq": {
        bachelor: {
          fullTime: {
            russianUkrainian: "2250USD",
            english: "2650USD"
          }
        }
      }
    }
  },

  // Milli texniki universitet "Xarkov Politexnik institutu"
  "Milli texniki universitet Xarkov Politexnik institutu": {
    ukrainianName: "Національний технічний університет «Харківський політехнічний iнститут»",
    shortName: "ХПІ",
    status: "Dövlət",
    founded: "1885",
    accreditation: "IV",
    educationForms: ["əyani", "qiyabi"],
    degrees: ["Bakalavr", "Magistr"],
    durationFullTime: "4 il",
    durationPartTime: "4 il",
    faculties: [
      "011. Təhsil, pedaqoji elmlər",
      "015. Peşə təhsili",
      "017. Bədən tərbiyəsi və idman",
      "0186. Nəşriyyat və poliqrafiya(çap)",
      "029. İnformasiya, kitabxana və arxiv işi",
      "035. Filologiya",
      "051. İqtisadiyyat",
      "053. Psixalogiya",
      "054. Sosiologiya",
      "071. Uçot və vergitutma fakültəsi",
      "072. Maliyyə, bank işi və sığorta",
      "073. Menecment",
      "075. Marketinq",
      "076. Sahibkarlıq, ticarət və birja fəaliyyəti",
      "081. Hüquq",
      "101. Ekologiya",
      "105. Tətbiqi fizika və nanomateriallar",
      "113. Tətbiqi riyaziyyat",
      "121. Proqram təminatı mühəndisliyi",
      "122. Kompüter elmləri və informasiya texnologiyaları",
      "123. Kompüter mühəndisliyi",
      "124. Sistem analizi",
      "125. Kiber təhlükəsizlik",
      "126. İnformasiya sistemləri və texnologiyaları",
      "131. Tətbiqi mexanika",
      "132. Materialşünaslıq",
      "133. Maşınqayırma sahəsi",
      "141. Elektroenerjisi, elektrotexnika və elektromekanika sənayesi",
      "142. Maşınqayırma energetikası",
      "144. İstilik energetikası",
      "145. Hidroenergetika",
      "151. Avtomatlaşdırma və kompüter inteqrasiya texnologiyaları",
      "152. Metrologiya və informasiya-ölçmə texnikası",
      "153. Mikro və nanosistemli maşınlar",
      "161. Kimya texnologiyaları və mühəndisliyi",
      "162. Biotexnologiya və bioenerji",
      "171. Elektronika",
      "172. Telekommunikasiya və radiotexnika",
      "181. Qida texnologiyası",
      "185. Neft-qaz mühəndisliyi və texnologiyası",
      "263. Vətəndaş təhlükəsizliyi",
      "273. Dəmir yolu nəqliyyatı",
      "274. Avtomobil nəqliyyatı",
      "292. Beynəlxalq iqtisadi münasibətlər"
    ],
    tuitionFees: {
      // Detaylı təhsil haqları burada olacaq
      bachelor: {
        fullTime: {
          russianUkrainian: "1-ci il: 2250USD, 2-4-cü il: 1650USD",
          english: "1-ci il: 2300USD, 2-4-cü il: 1700USD"
        },
        partTime: {
          russianUkrainian: "1-ci il: 1700USD, 2-4-cü il: 1100USD",
          english: "1-ci il: 1800USD, 2-4-cü il: 1200USD"
        }
      },
      master: {
        fullTime: {
          russianUkrainian: "1-ci il: 2500USD, 2-ci yarım il: 950USD",
          english: "1-ci il: 2550USD, 2-ci yarım il: 975USD"
        },
        partTime: {
          russianUkrainian: "1-ci il: 1600USD, 2-ci yarım il: 500USD",
          english: "1-ci il: 1700USD, 2-ci yarım il: 550USD"
        }
      }
    }
  },

  // Dövlət mülki müdafiə universiteti
  "Dövlət mülki müdafiə universiteti": {
    ukrainianName: "Національний університет цивільного захисту України",
    shortName: "МЧС",
    alternativeName: "Fövqəladə hallar universiteti - FHN",
    status: "Dövlət",
    founded: "1928",
    accreditation: "IV",
    educationForms: ["əyani", "qiyabi"],
    degrees: ["Bakalavr", "Magistr"],
    durationFullTime: "4 il",
    durationPartTime: "4 il",
    tuitionFees: {
      bachelor: {
        fullTime: {
          russianUkrainian: "1700USD"
        },
        partTime: {
          russianUkrainian: "1500USD"
        }
      },
      master: {
        fullTime: {
          duration: "1.5 il",
          fee: "3400USD"
        },
        partTime: {
          duration: "2 il", 
          fee: "4400USD"
        }
      }
    },
    faculties: [
      "261. Yanğın təhlükəsizliyi",
      "263. Vətəndaş təhlükəsizliyi",
      "161. Kimya texnologiyaları və mühəndisliyi",
      "101. Ekologiya",
      "053. Psixologiya",
      "242. Turizm"
    ]
  },

  // Xarkov milli daxili işlər universiteti
  "Xarkov milli daxili işlər universiteti": {
    ukrainianName: "Харківський національний університет внутрішніх справ",
    shortName: "ХНУВС",
    alternativeName: "Polis akademiyası",
    status: "Dövlət",
    faculties: [
      "081. Hüquq",
      "262. Hüquq mühafizə fəaliyyəti",
      "125. Kibertəhlükəsizlik",
      "053. Psixologiya",
      "072. Maliyyə, bank işi və sığorta"
    ]
  },

  // Xarkov Milli Tibb Universiteti
  "Xarkov Milli Tibb Universiteti": {
    ukrainianName: "Харьковский национальный медицинский университет",
    shortName: "ХНМУ",
    status: "Dövlət",
    faculties: [
      "221. Stomatalogiya",
      "222. Müalicə işi",
      "223. Qulluq (Уход-Nursing)",
      "226. Əczaçılıq"
    ],
    additionalPrograms: [
      "Tibbə qədərki hazırlıq kursu",
      "Rezidentura"
    ]
  },

  // Karazin adına Xarkov Milli Universiteti
  "Karazin adına Xarkov Milli Universiteti": {
    ukrainianName: "Харьковский национальный университет имени В. Н. Каразина",
    status: "Dövlət",
    faculties: [
      "222. Tibb",
      "081. Hüquq",
      "293. Beynəlxalq hüquq",
      "032. Tarix və arxeologiya",
      "033. Fəlsəfə",
      "034. Kulturologiya",
      "035. Filologiya",
      "051. İqtisadiyyat",
      "052. Siyasiyyat",
      "053. Psixologiya",
      "054. Sosiologiya",
      "061. Jurnalistika",
      "071. Mühasibat uçotu və vergi",
      "072. Maliyyə, bank və sığorta",
      "073. Menecment",
      "075. Marketinq",
      "076. Sahibkarlıq, ticarət və birja fəaliyyəti",
      "091. Biologiya",
      "101. Ekologiya",
      "102. Kimya",
      "103. Geologiya",
      "104. Fizika və astronomiya",
      "111. Riyaziyyat",
      "113. Tətbiqi riyaziyyat",
      "122. Kompyuter elmləri",
      "125. Kiber təhlükəsizlik",
      "151. Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları",
      "153. Mikro və nanosistem mühəndisliyi",
      "231. Sosial iş",
      "241. Mehmanxana - restoran işi",
      "242. Turizm",
      "281. İctimai idarəetmə və administrasiya",
      "291. Beynəlxalq əlaqələr, sosial rabitə və regional araşdırmalar",
      "292. Beynəlxalq iqtisadi münasibətlər"
    ]
  },

  // Milli Aerokosmik Universiteti
  "Milli Aerokosmik Universiteti": {
    ukrainianName: "Національний аерокосмічний університет ім. М.Є. Жуковського",
    shortName: "ХАІ",
    alternativeName: "Aviasiya Universiteti",
    status: "Dövlət",
    faculties: [
      "029. İnformasiya, kitabxana və arxiv işi",
      "035. Filologiya, tətbiqi dilçilik",
      "053. Psixologiya",
      "081. Hüquq",
      "173. Avionka",
      "134. Aviasiya və raket-kosmik texnikası",
      "272. Aviasiya nəqliyyatı",
      "101. Ekologiya",
      "103. Yer haqqında elm",
      "113. Tətbiqi riyaziyyat",
      "121. Proqram təminatı mühəndisliyi",
      "122. Kompüter elmləri",
      "123. Kompüter mühəndisliyi",
      "124. Sistemli analiz",
      "125. Kibertəhlükəsizlik",
      "126. İnformasiya sistemləri və texnologiyaları",
      "131. Tətbiqi mexanika",
      "133. Sahə maşınqayırma",
      "141. Elektroenergetika, elektrotexnika və elektromexanika",
      "142. Energetika maşınqayırması",
      "144. İstilik energetikası",
      "151. Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları",
      "152. Metrologiya və informasiya-ölçmə texnikası riyaziyyat",
      "153. Mikro və nanosistemli texnika",
      "163. Biyoloji-tibb mühəndisliyi",
      "172. Telekommunikasiya və radiotexnika",
      "193. Geodeziyası və yer quruluşu",
      "255. Silah və hərbi texnika",
      "274. Avtomobil nəqliyyatı",
      "281. İctimai idarəetmə və inzibatçılıq",
      "051. İqtisadiyyat",
      "292. Beynəlxalq iqtisadi münasibətlər",
      "071. Uçot və vergitutma",
      "072. Maliyyə, bank işi və sığorta",
      "073. Menecment",
      "075. Marketinq",
      "076. Sahibkarlıq, ticarət və birja fəaliyyəti"
    ]
  },

  // Ivan Kozhedub adına Xarkov Milli Hava Qüvvələri Universiteti
  "Ivan Kozhedub adına Xarkov Milli Hava Qüvvələri Universiteti": {
    ukrainianName: "Харьковский национальный университет Воздушных Сил имени Ивана Кожедуба",
    shortName: "ХНУВС",
    status: "Dövlət",
    faculties: [
      "272.02 Hava gəmilərinin uçuş istismarı (pilot)",
      "272. Aviasiya nəqliyyatı",
      "173. Avionika",
      "121. Proqram təminatı Mühəndisliyi",
      "141. Elektroenergetika, elektrotexnika və elektromexanika",
      "152. Metrologiya və informasiya-ölçmə texnikası",
      "172. Telekommunikasiya və radiotexnika"
    ]
  }
};

// Fakültə kodları və açıqlamaları
const facultyCodes = {
  "011": "Təhsil, pedaqoji elmlər",
  "012": "Məktəbəqədərki təhsil",
  "013": "İbtidai təhsil",
  "014": "Orta təhsil",
  "015": "Peşə təhsili",
  "016": "Xüsusi təhsil",
  "017": "Bədən tərbiyəsi və idman",
  "021": "Audiovizual incəsənət və məhsullar",
  "022": "Dizayn",
  "023": "Təsviri incəsənət, dekorativ, bərpa",
  "024": "Xoreoqrafiya",
  "025": "Musiqi sənəti",
  "026": "Səhnə sənəti",
  "027": "Muzeyşünaslıq, abidəşünaslıq",
  "028": "Sosial-mədəni fəaliyyətlərin idarə edilməsi",
  "029": "İnformasiya, kitabxana və arxiv işi",
  "032": "Tarix və arxeologiya",
  "033": "Fəlsəfə",
  "034": "Kulturologiya",
  "035": "Filologiya",
  "051": "İqtisadiyyat",
  "052": "Siyasiyyat",
  "053": "Psixologiya",
  "054": "Sosiologiya",
  "061": "Jurnalistika",
  "071": "Mühasibat uçotu və vergi",
  "072": "Maliyyə, bank və sığorta",
  "073": "Menecment",
  "075": "Marketinq",
  "076": "Sahibkarlıq, ticarət və birja fəaliyyəti",
  "081": "Hüquq",
  "091": "Biologiya",
  "101": "Ekologiya",
  "102": "Kimya",
  "103": "Geologiya",
  "104": "Fizika və astronomiya",
  "105": "Tətbiqi fizika və nanomateriallar",
  "111": "Riyaziyyat",
  "113": "Tətbiqi riyaziyyat",
  "115": "Mikro və nano sistemli texnika",
  "121": "Proqram təminatı mühəndisliyi",
  "122": "Kompüter elmləri və informasiya texnologiyaları",
  "123": "Kompüter mühəndisliyi",
  "124": "Sistem analizi",
  "125": "Kiber təhlükəsizlik",
  "126": "İnformasiya sistemləri və texnologiyaları",
  "131": "Tətbiqi mexanika",
  "132": "Materialşünaslıq",
  "133": "Maşınqayırma sahəsi",
  "134": "Aviasiya və raket-kosmik texnikası",
  "141": "Elektroenergetika, elektrotexnika və elektromexanika",
  "142": "Maşınqayırma energetikası",
  "144": "İstilik energetikası",
  "145": "Hidroenergetika",
  "151": "Avtomatlaşdırma və kompüter-inteqrasiya texnologiyaları",
  "152": "Metrologiya və informasiya-ölçmə texnikası",
  "153": "Mikro və nanosistemli maşınlar",
  "161": "Kimya texnologiyaları və mühəndisliyi",
  "162": "Biotexnologiya və biomühəndislik",
  "163": "Biyoloji-tibb mühəndisliyi",
  "171": "Elektronika",
  "172": "Telekommunikasiya və radiotexnika",
  "173": "Avionika",
  "174": "Avtomatlaşdırma və kompyuter-inteqrasiya texnologiyaları və robot texnologiyaları",
  "181": "Qida texnologiyası",
  "183": "Ətraf mühit texnologiyası",
  "185": "Neft-qaz mühəndisliyi və texnologiyası",
  "186": "Nəşriyyat və poliqrafiya",
  "191": "Memarlıq və şəhərsalma",
  "192": "Tikinti və mülki mühəndislik",
  "193": "Geodeziyası və yer quruluşu",
  "194": "Hidrotexniki tikinti, su mühəndisliyi və su texnologiyası",
  "201": "Agronomiya",
  "202": "Bitki karantini mühafizəsi",
  "204": "Heyvandarlıq məhsullarının istehsalı və emalı texnologiyası",
  "205": "Meşə təsərrüfatı",
  "206": "Landşaft bağçılıq",
  "207": "Su bioresursları və akvakultura",
  "208": "Aqromühəndislik",
  "211": "Baytarlıq",
  "221": "Stomatalogiya",
  "222": "Müalicə işi",
  "223": "Qulluq (Nursing)",
  "224": "Tibbi diaqnostika və müalicə texnologiyası",
  "225": "Tibbi psixologiya",
  "226": "Əczaçılıq",
  "227": "Fiziki terapiya, Ergoterapi",
  "231": "Sosial iş",
  "232": "Sosial təminat",
  "241": "Mehmanxana - restoran işi",
  "242": "Turizm",
  "255": "Silah və hərbi texnika",
  "261": "Yanğın təhlükəsizliyi",
  "262": "Hüquq mühafizə fəaliyyəti",
  "263": "Vətəndaş təhlükəsizliyi",
  "271": "Çay və dəniz nəqliyyatı",
  "272": "Aviasiya nəqliyyatı",
  "273": "Dəmir yolu nəqliyyatı",
  "274": "Avtomobil nəqliyyatı",
  "275": "Nəqliyyat texnologiyası",
  "281": "İctimai idarəetmə və administrasiya",
  "291": "Beynəlxalq əlaqələr, sosial rabitə və regional araşdırmalar",
  "292": "Beynəlxalq iqtisadi münasibətlər",
  "293": "Beynəlxalq hüquq"
};

// Təhsil haqları haqqında ümumi məlumatlar
const tuitionInfo = {
  generalInfo: "Ukrayna universitetlərində təhsil haqları universitetə, fakültəyə və təhsil formasına görə dəyişir.",
  paymentMethods: "Təhsil haqları illik və ya yarımillik ödənilir.",
  insurance: "Təhsil sığortası təhsil haqqına əlavə olunur və təhsil müddəti boyunca davam edir.",
  languageOptions: {
    russianUkrainian: "Rus və Ukrayn dillərində təhsil",
    english: "İngilis dilində təhsil (daha baha)"
  },
  educationForms: {
    fullTime: "Əyani təhsil - tam günlük təhsil",
    partTime: "Qiyabi təhsil - axşam və ya həftəsonu təhsil"
  }
};

// Açar sözlər və sinonimlər
const keywords = {
  "FHN": ["Fövqəladə Hallar Nazirliyinin Akademiyası", "Fövqəladə hallar universiteti"],
  "ХПІ": ["Xarkov Politexnik institutu", "Milli texniki universitet"],
  "ХНМУ": ["Xarkov Milli Tibb Universiteti", "Milli Tibb Universiteti"],
  "ХНУВС": ["Xarkov milli daxili işlər universiteti", "Polis akademiyası"],
  "ХАІ": ["Milli Aerokosmik Universiteti", "Aviasiya Universiteti"],
  "МЧС": ["Dövlət mülki müdafiə universiteti", "Fövqəladə hallar universiteti"]
};

module.exports = {
  ukraineUniversities,
  facultyCodes,
  tuitionInfo,
  keywords
};
