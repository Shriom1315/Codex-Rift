/* =====================================================
   CODEX HUNT — Game Data
   All Shlokas, Riddles, Answers, Teams
   ===================================================== */

export const gameData = {
    // --- Ticker Shlokas (scrolling bar) ---
    tickerShlokas: [
        'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
        '॥ यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ॥',
        'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः',
        '॥ सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ॥',
        'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः',
        '॥ तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥',
        'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः',
        '॥ यत्र धर्मस्तत्र जयः ॥',
    ],

    // --- Round 1: The Signal (50 Riddles Pool) ---
    round1Riddles: [
        {
            shloka: 'Dharmakshetre Kurukshetre samaveta yuyutsavah ।\nmamakah pandavashchaiva kimakurvata sanjaya ॥',
            translation: 'Dhritarashtra asked: On that holy field, what did my sons and the sons of Pandu do?',
            riddle: 'I am the famous land where the great war began. Thousands of soldiers stood on my soil. My name is the second word in the shloka. What place am I?',
            answer: 'KURUKSHETRA',
            hint: 'It is the field where the Bhagavad Gita was spoken.'
        },
        {
            shloka: 'Yada yada hi Dharmasya glanir bhavati bharata ।\nabhyutthanam adharmasya tadatmanam srijamyaham ॥',
            translation: 'Whenever the ancient rules are broken and evil grows, I appear to save the world.',
            riddle: 'This word means duty and righteousness. When people forget it, Krishna takes an avatar. You can find this word in the first line of the shloka. What is it?',
            answer: 'DHARMA',
            hint: 'It is the opposite of Adharma.'
        },
        {
            shloka: 'Karmanye vadhikaraste ma phaleshu kadachana ।\nma karmaphalaheturbhur ma te sango’stvakarmani ॥',
            translation: 'You have a right to your duty, but not to what you get from it. Do not be driven by rewards.',
            riddle: 'Krishna told Arjun to focus on his work and not the result. The shloka begins with this word which means "action". What is it?',
            answer: 'KARMA',
            hint: 'Your deeds define your future.'
        },
        {
            shloka: 'Nainam chhindanti shastrani nainam dahati Pavakah ।\nna chainam kledayantyapo na shoshayati marutah ॥',
            translation: 'No weapon can cut it, and nothing can burn it. It is eternal.',
            riddle: 'I am as bright as the sun and can turn things to ash, yet I cannot touch the soul. In this shloka, I am mentioned by a name that sounds like a purifier. What am I?',
            answer: 'Aag',
            hint: 'It is another name for Agni.'
        },
        {
            shloka: 'Bhishmah shantanavo dhiman dharmaputro yudhisthirah ।',
            translation: 'The wise son of Shantanu and the son of Dharma are masters of truth.',
            riddle: 'He was the guardian of Hastinapur who lived through many generations. He had the power to choose his death. His name is the very first word here. Who is he?',
            answer: 'BHISHMA',
            hint: 'He is the Great Grandfather (Pitamah).'
        },
        {
            shloka: 'Panchali subhaga devi pavaki yajnasambhava ।',
            translation: 'The blessed queen was born from the holy flames of a sacrifice.',
            riddle: 'She was the wife of the five brothers and was born from a yagna fire. Look at the shloka for her name which means "princess of Panchal". Who is she?',
            answer: 'PANCHALI',
            hint: 'She is also known as Draupadi.'
        },
        {
            shloka: 'Gandivam sramsate hastat tvak chaiva paridahyate ।',
            translation: 'The weapon is slipping away and my heart is heavy with sadness.',
            riddle: 'Arjun’s hands were shaking when he saw his relatives. This famous bow, mentioned as the first word of the shloka, started falling. What is it?',
            answer: 'GANDIV',
            hint: 'It is the most powerful bow in the world.'
        },
        {
            shloka: 'Senayo rubhayor Madhye ratham sthapaya me’chyuta ।',
            translation: 'O Krishna, place my chariot between the two mighty armies.',
            riddle: 'Arjun wanted to see his enemies before the fight began. He asked to be placed right "in between". Find the Sanskrit word for "middle" in the shlok. What is it?',
            answer: 'MADHYA',
            hint: 'It is the word right after "ubhayor".'
        },
        {
            shloka: 'Karnah kunti-suto jyeshthah suryaputro mahadani ।',
            translation: 'The eldest son, born of the Sun, is the greatest giver of all time.',
            riddle: 'He wore golden armor at birth and never said "no" to anyone asking for help. His name is the first word in the shloka. Who is this hero?',
            answer: 'KARNA',
            hint: 'The loyal friend of Duryodhan.'
        },
        {
            shloka: 'Duryodhano manadhani suyodhana iti chochyate ।',
            translation: 'The leader of the hundred is proud and is also known by another name.',
            riddle: 'He was the eldest brother among the Kauravas. His jealousy led to the war. His name is hidden at the start of the shloka. Who is he?',
            answer: 'DURYODHAN',
            hint: 'The son of Gandhari.'
        },
        {
            shloka: 'Shakunih matulah papah kuruvamshavinashakah ।',
            translation: 'The clever uncle brought the end of the great family with his tricks.',
            riddle: 'He played with magic dice and was a master of games. He whispered evil ideas to his nephew. Find his name in the shloka. Who is he?',
            answer: 'SHAKUNI',
            hint: 'The brother of Queen Gandhari.'
        },
        {
            shloka: 'Hastinapurm rajadhani kuruvamshasya shobha ।',
            translation: 'The capital city is the jewel and pride of the royal clan.',
            riddle: 'This was the throne everyone was fighting for. It was the city of elephants. The name starts the shloka. What is the city called?',
            answer: 'HASTINAPUR',
            hint: 'The main city of the Kauravas.'
        },
        {
            shloka: 'Indraprastham navanirmitam pandavanam griham ।',
            translation: 'The new palace was a wonder built specially for the five brothers.',
            riddle: 'This city was famous for its "palace of illusions". It was built on a forest land. Its name is the first word. What is it?',
            answer: 'INDRAPRASTH',
            hint: 'It is the ancient name of Delhi.'
        },
        {
            shloka: 'Abhimanyuh viravarah subhadraputrah pratapavan ।',
            translation: 'The young warrior, son of the brave princess, is full of glory.',
            riddle: 'He was the son of Arjun who fought alone against seven maharathis inside a circle. His name is at the start. Who is he?',
            answer: 'ABHIMANYU',
            hint: 'He died very young in the war.'
        },
        {
            shloka: 'Ashwatthama hata iti naro va kunjaro va ।',
            translation: 'The news spread that the great warrior is no more, be it man or beast.',
            riddle: 'The war stopped for a moment when this name was called out. Was it the person or an elephant? Look at the first word. Who is he?',
            answer: 'ASHWATTHAMA',
            hint: 'The son of Guru Drona.'
        },
        {
            shloka: 'Dronacharya guru-shrestha dhanurveda-visharada ।',
            translation: 'The master of archery is the greatest teacher of all the princes.',
            riddle: 'He taught the Pandavas how to aim, but he had to fight against them. His name is the first word. Who is this teacher?',
            answer: 'DRONA',
            hint: 'The teacher of Arjun and Duryodhan.'
        },
        {
            shloka: 'Yudhisthira samartho’sti dharmaraja mahayatih ।',
            translation: 'The leader of the brothers is capable and follows the path of truth.',
            riddle: 'He was the eldest son of Kunti. He never stepped off the path of truth. His name is the first word. Who is he?',
            answer: 'YUDHISTHIR',
            hint: 'He is known as the King of Dharma.'
        },
        {
            shloka: 'Bhimaseno mahabalo vrikodara iti smritah ।',
            translation: 'The one with endless power is also known for his giant hunger.',
            riddle: 'He was the strongest of the brothers and loved to eat. He carried a heavy gada. Find his name in the first word. Who is he?',
            answer: 'BHIMASENA',
            hint: 'The killer of Keechak and Bakasur.'
        },
        {
            shloka: 'Ganga mata pavitri cha bhishmasya janani ।',
            translation: 'The holy mother is pure and gave birth to the great guardian.',
            riddle: 'She is the river that flows from the sky to the earth. She is the mother of the hero who never married. Her name starts the shloka. What is it?',
            answer: 'GANGA',
            hint: 'The most sacred river of India.'
        },
        {
            shloka: 'Yamuna tira vihari krishnah shyamala vardhamanah ।',
            translation: 'The dark lord plays on the banks of the blue river.',
            riddle: 'Krishna spent his childhood dancing on the banks of this river. It is the very first word here. What is its name?',
            answer: 'YAMUNA',
            hint: 'The river of Gokul and Vrindavan.'
        },
        {
            shloka: 'Vyasah sarvavetta cha mahabharata lekhakah ।',
            translation: 'The wise sage knows everything and told the story of the great war.',
            riddle: 'He is the one who saw the past and future. He is the true author of this whole story. His name starts the shloka. Who is he?',
            answer: 'VYASA',
            hint: 'The grandfather of Pandavas and Kauravas.'
        },
        {
            shloka: 'Shrimad bhagavad Gita jnana ganga pavani ।',
            translation: 'The divine song is a river of knowledge that cleanses the mind.',
            riddle: 'This is the book that contains the conversation between Krishna and Arjun. Its name is the last word of the first line. What is it?',
            answer: 'GITA',
            hint: 'The "Song of God".'
        },
        {
            shloka: 'Sudarshana chakra dhari bhagwan vishnu swaroopa ।',
            translation: 'The one who holds the celestial wheel is a form of the Supreme.',
            riddle: 'It is a weapon that returns to Krishna after destroying evil. Find the name of this spinning disk in the shloka. What is it?',
            answer: 'SUDARSHANA',
            hint: 'It is a divine wheel of light.'
        },
        {
            shloka: 'Dhritarashtra andhah nripah putravyaku-lah ।',
            translation: 'The ruler is unable to see and is worried about his children.',
            riddle: 'He was the father of the Kauravas. His love for his sons made him blind to their mistakes. His name is the first word. Who is he?',
            answer: 'DHRITARASHTRA',
            hint: 'The blind king of Hastinapur.'
        },
        {
            shloka: 'Kripacharya kulaguruh deerghajeevi mahamatih ।',
            translation: 'The royal priest is wise and lives through many ages.',
            riddle: 'He was the teacher who taught the princes before Drona arrived. He is one of the seven immortals. Find his name in the shloka.',
            answer: 'KRIPACHARYA',
            hint: 'The twin brother of Kripi.'
        },
        {
            shloka: 'Nakulah saadevdashchaiva madriputrau maharathau ।',
            translation: 'The two brothers are the sons of the second queen and great warriors.',
            riddle: 'He was the fourth brother and was known to be the most handsome. His name is the very first word. Who is he?',
            answer: 'NAKUL',
            hint: 'The twin brother of Sahadev.'
        },
        {
            shloka: 'Sahadevah samartho’sti trikalajyo mahan yatih ।',
            translation: 'The youngest one is very intelligent and knows the secrets of time.',
            riddle: 'He was the only one who knew the war was coming but he was silent. He is the fifth brother. Find his name here.',
            answer: 'SAHADEV',
            hint: 'The youngest Pandava.'
        },
        {
            shloka: 'Viduro dharmevetta cha nitishastravisharadah ।',
            translation: 'The advisor is an expert in laws and the right way of living.',
            riddle: 'He was the wisest man in the palace. He tried to save the brothers from the fire in the house of wax. Who is he?',
            answer: 'VIDUR',
            hint: 'The uncle who gave "Vidur Niti".'
        },
        {
            shloka: 'Kunti devi mahabhaga pandavanam prasuh ।',
            translation: 'The great queen is the mother of the five mighty heroes.',
            riddle: 'She was the first wife of King Pandu. She had a special power to call the Gods. Her name starts the shloka. Who is she?',
            answer: 'KUNTI',
            hint: 'She was also called Pritha.'
        },
        {
            shloka: 'Gandhari pativrata cha sheelavati suvrata ।',
            translation: 'The devoted wife is a woman of high character and vows.',
            riddle: 'She tied a cloth over her eyes because she did not want to see what her husband could not. Who is she?',
            answer: 'GANDHARI',
            hint: 'The mother of the Kauravas.'
        },
        {
            shloka: 'Dwarka puri ramya krishnasya vasasthanam ।',
            translation: 'The beautiful city is the place where the Lord resides.',
            riddle: 'This was a city made of gold that eventually sank into the sea. Its name is the first word. What is it?',
            answer: 'DWARKA',
            hint: 'Krishna moved his people here from Mathura.'
        },
        {
            shloka: 'Vedas divyah chatvarah jnanasya mulam ।',
            translation: 'The four holy books are the source of all ancient knowledge.',
            riddle: 'There are four of these, like Rig and Yajur. They are the oldest treasures of wisdom. What are they called?',
            answer: 'VEDAS',
            hint: 'The sacred scriptures of the Aryans.'
        },
        {
            shloka: 'Satyam vada dharmam chara ।',
            translation: 'Always speak what is right and follow your path.',
            riddle: 'It is said that there is no religion higher than this. It means "The Truth". It is the first word here. What is it?',
            answer: 'SATYAM',
            hint: 'Yudhisthir never spoke anything but this.'
        },
        {
            shloka: 'Ahimsa paramo dharmah ।',
            translation: 'The greatest duty is to stay away from causing pain to others.',
            riddle: 'This word means "Non-Violence". It is the first word in the shloka. What is it?',
            answer: 'AHIMSA',
            hint: 'The path of peace.'
        },
        {
            shloka: 'Danam patre cha kale cha shrestham uchyate ।',
            translation: 'The act of giving at the right time to the right person is the best.',
            riddle: 'Karna was famous for this. He gave away his armor to a beggar. What is this act of giving called?',
            answer: 'DANAM',
            hint: 'Charity or gifting.'
        },
        {
            shloka: 'Yogo karmasu kaushalam chittavritti nirodhah ।',
            translation: 'The practice of focus brings skill and controls the restless mind.',
            riddle: 'It is a way to unite the body and soul. Krishna taught this to the world. Look at the first word. What is it?',
            answer: 'YOGA',
            hint: 'The art of meditation and balance.'
        },
        {
            shloka: 'Shanti paramam sukham cha krodha rahitam manasam ।',
            translation: 'The highest joy comes from a mind that is free from anger.',
            riddle: 'After the noise of war, the world seeks this. It means "Silence" or "Peace". It is the first word. What is it?',
            answer: 'SHANTI',
            hint: 'The end goal of every prayer.'
        },
        {
            shloka: 'Moksha param padam cha punarjanma vivarjitam ।',
            translation: 'The highest state is freedom from the cycle of being born again.',
            riddle: 'It is the ultimate liberation of the soul. No more birth, no more death. Find the word in the shloka. What is it?',
            answer: 'MOKSHA',
            hint: 'Escape from the cycle of Samsara.'
        },
        {
            shloka: 'Maya mohakari shakti satyam achhadayet ।',
            translation: 'The tricking power hides the real truth from our eyes.',
            riddle: 'This world is like a dream or a magic show that we think is real. Krishna calls it by this name. Find it in the first word.',
            answer: 'MAYA',
            hint: 'Illusion or magic.'
        }
    ],


    // --- Round 2: The Mini Treasure Hunt (3 Locations) ---
    round2Locations: [
        {
            shloka: 'Drona-charyah guru-shresthah dhanurveda-visharadah ।',
            translation: 'The greatest teacher is a master of the science of weapons.',
            riddle: 'I am the temple of knowledge where students gain wisdom. To find me, you must find the name of the teacher who taught the princes. His name is the first word in the shloka. Where is the library?',
            locationName: 'Vidya Sthal',
            shortName: 'Library',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-2.8-1.5-6.6-1.5-10 0v16c3.4-1.5 7.2-1.5 10 0 2.8-1.5 6.6-1.5 10 0V4c-3.4-1.5-7.2-1.5-10 0z"></path></svg>',
            code: 'DRONA42',
            hint: 'Go to the place where the master teacher would keep his scrolls.'
        },
        {
            shloka: 'Bhimaseno mahabalo vrikodara iti smritah ।',
            translation: 'The one with vast strength is also known for his mighty appetite.',
            riddle: 'I am the field where strength is tested and bodies are made like iron. Find the name of the strongest brother in the first word of the shloka. Where is the sports ground?',
            locationName: 'Bal Sthal',
            shortName: 'Sports',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>',
            code: 'BHIMA77',
            hint: 'Seek the place where you can find the power of the wolf-bellied hero.'
        },
        {
            shloka: 'Viduro dharmevetta cha nitishastra-visharadah ।',
            translation: 'The wise man knows the laws of life and secrets of politics.',
            riddle: 'I am the hall where laws are discussed and the kingdom is managed. To unlock this door, find the name of the wisest advisor in the shloka. Where is the main office?',
            locationName: 'Vidura Sabha',
            shortName: 'Office',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"></line><line x1="6" x2="6" y1="18" y2="11"></line><line x1="10" x2="10" y1="18" y2="11"></line><line x1="14" x2="14" y1="18" y2="11"></line><line x1="18" x2="18" y1="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>',
            code: 'VIDURA99',
            hint: 'Seek the master of policy who warned the brothers about the house of wax.'
        }
    ],

    // --- Round 3: The Codex (5 Campus-wide Clues) ---
    round3Clues: [
        {
            shloka: 'Ashwatthama hata iti naro va kunjaro va ।',
            translation: 'The news spread that the secret is dead—be it man or be it beast.',
            riddle: 'A big hall where many eyes watch the stage. A great drama of truth and lies happened here. Find the name of the warrior mentioned in the first word of the shloka. Where is the auditorium?',
            locationName: 'Auditorium',
            code: 'YUDDHA01',
            hint: 'Look for the son of the master teacher in the shloka.'
        },
        {
            shloka: 'Gandivam sramsate hastat tvak chaiva paridahyate ।',
            translation: 'The divine weapon is falling away and the skin is feeling the heat.',
            riddle: 'A cold room where fire and liquids are used for science. Arjun’s hands were empty when this fell. Find the name of his bow in the shloka. Where is the lab?',
            locationName: 'Science Lab',
            code: 'GANDIV02',
            hint: 'The first word is the name of the most famous bow.'
        },
        {
            shloka: 'Kunti devi mahabhaga pandavanam prasuh ।',
            translation: 'The royal mother of the five heroes is noble and blessed.',
            riddle: 'A green land where flowers bloom and silence is everywhere. The mother of the brothers used to pray here. Find her name in the shloka. Where is the garden?',
            locationName: 'Garden',
            code: 'KUNTI03',
            hint: 'She is the mother of Yudhishtir, Bhima, and Arjun.'
        },
        {
            shloka: 'Karnah kunti-suto jyeshthah suryaputro mahadani ।',
            translation: 'The eldest son of the Sun is a warrior who gives everything away.',
            riddle: 'A wide open ground for the brave. To find this place, look for the name of the hero with the golden armor in the shloka. Where is the playground?',
            locationName: 'Playground',
            code: 'KARNA04',
            hint: 'He is the elder brother of the five Pandavas.'
        },
        {
            shloka: 'Yatra dharmastatra jayah ।',
            translation: 'Where the path of truth is followed, there is the final result.',
            riddle: 'The journey ends where it began. You have walked the path, now seek your reward. Find the word for "victory" in the shloka. Where was the starting point?',
            locationName: 'Starting Point',
            code: 'CODEX05',
            hint: 'The last word of the shloka is what you are seeking.'
        }
    ],

    // --- Teams (demo data) ---
    teams: [
        { name: 'Pandavas', code: 'PANDAVA1', currentRound: 1, score: 450, superpower: 'Chakra', eliminated: false },
        { name: 'Kauravas', code: 'KAURAVA1', currentRound: 1, score: 380, superpower: null, eliminated: false },
        { name: 'Narayani', code: 'NARAYAN1', currentRound: 1, score: 350, superpower: null, eliminated: false },
        { name: 'Hastinapur', code: 'HASTINA1', currentRound: 1, score: 320, superpower: null, eliminated: false },
        { name: 'Indraprastha', code: 'INDRAP01', currentRound: 1, score: 290, superpower: null, eliminated: false },
        { name: 'Dwaraka', code: 'DWARAK1', currentRound: 1, score: 250, superpower: null, eliminated: true },
        { name: 'Matsya', code: 'MATSYA01', currentRound: 1, score: 200, superpower: null, eliminated: true },
        { name: 'Kashi', code: 'KASHI001', currentRound: 1, score: 180, superpower: null, eliminated: true },
    ],
};
