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

    // --- Round 1: The Signal (5 Riddles) ---
    round1Riddles: [
        {
            shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
            translation: 'You have the right to perform your duty, but never to its fruits. Let not the fruit of action be your motive, nor let your attachment be to inaction.',
            riddle: 'I am the path you walk but never see, the effort you give but cannot guarantee. I am not the reward, yet I define your journey. What am I?',
            answer: 'KARMA',
            hint: 'The law of action in Hindu philosophy'
        },
        {
            shloka: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
            translation: 'Whenever there is a decline of righteousness and rise of unrighteousness, O Bharata, then I manifest Myself.',
            riddle: 'I rise when darkness falls upon the world, I am the eternal law that keeps creation twirled. Kings seek to uphold me, villains try to break — without me, the universe would cease to wake. What am I?',
            answer: 'DHARMA',
            hint: 'The cosmic law that upholds the universe'
        },
        {
            shloka: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥',
            translation: 'Weapons cannot cleave It, fire cannot burn It, waters cannot drench It, and wind cannot dry It.',
            riddle: 'I cannot be cut by any blade, nor consumed by the fiercest flame. I journey with you from birth to death, yet I remain ever the same. What am I?',
            answer: 'ATMA',
            hint: 'The eternal soul within every being'
        },
        {
            shloka: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
            translation: 'Surrender all dharmas and take refuge in Me alone. I shall liberate you from all sins; do not grieve.',
            riddle: 'I am the charioteer who steers through war, the friend who guides when paths are far. When all else fails and hope is thin, surrender unto me — and you shall win. Who am I?',
            answer: 'KRISHNA',
            hint: 'The divine charioteer of Arjuna'
        },
        {
            shloka: 'क्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम ।',
            translation: 'The knowledge of the field and its knower — that alone I consider true knowledge.',
            riddle: 'I am the battlefield and the warrior, the question and the answer. Where the greatest war was fought not with armies alone, but with conscience. Where am I?',
            answer: 'KURUKSHETRA',
            hint: 'The sacred battlefield of the Mahabharata'
        }
    ],

    // --- Round 2: The Mini Treasure Hunt (3 Locations) ---
    round2Locations: [
        {
            shloka: 'धृतराष्ट्र उवाच —\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
            translation: 'Dhritarashtra said: In the field of Dharma, at Kurukshetra, gathered together eager for battle, what did my sons and the Pandavas do, O Sanjaya?',
            riddle: 'Where knowledge flows like Ganga\'s sacred stream, and seekers sit in wisdom\'s eternal dream. Find the throne where Dronacharya once taught — the seat of learning, where great battles of the mind are fought.',
            locationName: 'Vidya Sthal',
            shortName: 'Library',
            icon: '📚',
            code: 'DRONA42',
            hint: 'Where books reside and scholars seek wisdom'
        },
        {
            shloka: 'उत्तिष्ठ भारत ।\nतस्मात्त्वमुत्तिष्ठ यशो लभस्व\nजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् ॥',
            translation: 'Arise, O Bharata! Therefore, stand up and win glory. Conquer your enemies and enjoy a prosperous kingdom.',
            riddle: 'Where warriors strengthen their mortal clay, and Bhima\'s power holds its mighty sway. The ground where bodies are forged like steel — find the arena where true might you feel.',
            locationName: 'Bal Sthal',
            shortName: 'Sports',
            icon: '🏋️',
            code: 'BHIMA77',
            hint: 'Where physical strength is built and tested'
        },
        {
            shloka: 'स्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव ।\nस्थितधीः किं प्रभाषेत किमासीत व्रजेत किम् ॥',
            translation: 'What is the description of a person of steady wisdom, who is established in meditation, O Keshava? How does the person of stable mind speak, sit, or walk?',
            riddle: 'Where Vidura\'s sage counsel once was heard, and every decision shapes the final word. The chamber where the wise convene with grace — find truth behind the administrative face.',
            locationName: 'Vidura Sabha',
            shortName: 'Office',
            icon: '🏛️',
            code: 'VIDURA99',
            hint: 'Where administrative decisions are made'
        }
    ],

    // --- Round 3: The Codex (5 Campus-wide Clues) ---
    round3Clues: [
        {
            shloka: 'अश्वत्थामा हत इति — नरो वा कुञ्जरो वा ।',
            translation: 'Ashwatthama is dead — whether man or elephant, is uncertain.',
            riddle: 'Truth bends but never breaks, like Yudhishthira\'s one lie. Where sounds echo half-complete, where words both live and die. Find the hall where voices carry, thundering through the air — the stage of half-truths spoken and stories beyond compare.',
            locationName: 'Auditorium',
            code: 'YUDDHA01',
            hint: 'Where performances and speeches take place'
        },
        {
            shloka: 'गाण्डीवं स्रंसते हस्तात् त्वक् चैव परिदह्यते ।\nन च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः ॥',
            translation: 'The Gandiva slips from my hand, and my skin burns all over. I am unable to stand any longer, and my mind seems to be spinning.',
            riddle: 'Arjuna\'s weapon was his pride, precision was his purest art. Find the place where aim is key, where science strikes the mark apart. In this hall of experiments, where truth is tested through the fire — discover the code that awaits the one precision does inspire.',
            locationName: 'Science Lab',
            code: 'GANDIV02',
            hint: 'Where scientific experiments are conducted'
        },
        {
            shloka: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥',
            translation: 'Wherever Krishna, the Lord of Yoga, and wherever Arjuna the bowman — there will be fortune, victory, prosperity, and firm morality.',
            riddle: 'Where the garden meets the sky so wide, and nature\'s quiet court convenes with pride. Like Kunti who once prayed beneath the trees of old — find the place where ancient greens and silent stories unfold.',
            locationName: 'Garden',
            code: 'KUNTI03',
            hint: 'Where nature and tranquility reside'
        },
        {
            shloka: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
            translation: 'For the protection of the good, for the destruction of the wicked, and for establishment of Dharma, I manifest Myself age after age.',
            riddle: 'The final battle needs a field, where Karna met his heroic fate. Where open ground awaits the brave — the warriors\' ultimate gate. Find the arena where champions are crowned and legends born of might.',
            locationName: 'Playground',
            code: 'KARNA04',
            hint: 'The main open field of the campus'
        },
        {
            shloka: 'यत्र धर्मस्तत्र जयः ।',
            translation: 'Where there is Dharma, there is Victory.',
            riddle: 'The Codex lies where ALL began, where first you took your sacred oath. Return to where the Sabha sat — the origin — and victory crowns you both. The circle is complete, the quest is done — find where your journey first begun.',
            locationName: 'Starting Point',
            code: 'CODEX05',
            hint: 'Return to where the hunt began'
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
