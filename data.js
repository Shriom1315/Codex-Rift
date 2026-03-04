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
            translation: 'Tumhara haq sirf karm karne par hai, uske phal (result) par nahi. Isliye phal ki chinta kare bina apna kartavya nibhao.',
            riddle: 'Main wo path hoon jis par aap chalte hain par jo drishya nahi, wo parishram jo aap karte hain par parinam nishchit nahi. Main phal nahi hoon, par aapki yatra (journey) main hi nirdharit karta hoon. Bataiye main kaun hoon?',
            answer: 'KARMA',
            hint: 'He Parth, phal ki chinta chhod kar apne kartavya par dhyan do. Yahi kalyan ka marg hai.'
        },
        {
            shloka: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥',
            translation: 'Jab jab dharm ki haani hoti hai aur adharm badhta hai, tab tab main (Bhagwan) avatar leta hoon.',
            riddle: 'Jab sansar mein andhkar cha jata hai tab main prakat hota hoon, main wo niyam hoon jo srishti ko chalata hoon. Nrip (kings) mujhe sanrakshit karte hain, aur dusht mujhe todne ka prayas. Mere bina ye brahmand ruk jayega. Bataiye main kaun hoon?',
            answer: 'DHARMA',
            hint: 'Srishti ka santulan banaye rakhne ke liye jo niyam avashyak hai, wahi satya hai.'
        },
        {
            shloka: 'नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः ।\nन चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥',
            translation: 'Atma ko na shashtra kaat sakte hain, na aag jala sakti hai, na paani bhigo sakta hai aur na hi hawa sukha sakti hai.',
            riddle: 'Mujhe koi talwar (blade) kaat nahi sakti, aur na hi koi aag mujhe jala sakti hai. Janam se maran tak main tumhare saath rehta hoon, phir bhi main hamesha ek jaisa hi rehta hoon. Batao main kaun hoon?',
            answer: 'ATMA',
            hint: 'Shoorveer! Jo aag mein jalta nahi aur shastra se kat-ta nahi, us amar tatva ko pehchano.'
        },
        {
            shloka: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥',
            translation: 'Sab dharmo ko chhod kar meri sharan mein aa jao. Main tumhe sab paapo se mukt kar doonga, chinta mat karo.',
            riddle: 'Main wo sarathi hoon jo yuddh mein sahayata karta hai, wo mitra jo marg bhatakne par margdarshan karta hai. Jab sab viphul ho jaye aur asha ksheen, tab mujh par vishwas karein aur aap vijayi honge. Main kaun hoon?',
            answer: 'KRISHNA',
            hint: 'Meri sharan mein aane wale hamesha vijayi hote hain. Main hi toh tumhara margdarshak hoon!'
        },
        {
            shloka: 'क्षेत्रक्षेत्रज्ञयोर्ज्ञानं यत्तज्ज्ञानं मतं मम ।',
            translation: 'Shareer (Kshetra) aur usko janne wale (Kshetrajna) ka gyan hi asli gyan hai.',
            riddle: 'Main wo ranganngan (battlefield) bhi hoon aur yoddha bhi, prashna bhi hoon aur uska uttar bhi. Jaha sabse bada yuddh keval senaon ke beech nahi, balki antarmann aur vivek ke beech lada gaya. Main kaun sa sthan hoon?',
            answer: 'KURUKSHETRA',
            hint: 'Jahan Dharm aur Adharm ka sabse bada yuddh hua, us pavitra bhoomi ka smaran karo.'
        }
    ],

    // --- Round 2: The Mini Treasure Hunt (3 Locations) ---
    round2Locations: [
        {
            shloka: 'धृतराष्ट्र उवाच —\nधर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
            translation: 'Dhritarashtra ne pucha: He Sanjay! Dharm-kshetra Kurukshetra mein yuddh ki ikcha se ekatrit huye mere aur Pandu ke putraon ne kya kiya?',
            riddle: 'Jaha gyan (knowledge) Ganga ki tarah pravahit hota hai, aur gyan-pipasu hamesha sikhate rehte hain. Wo sthan khojiye jaha Dronacharya ne shiksha di thi—vidya ka wo kendra, jaha bauddhik yuddh lade jaate hain.',
            locationName: 'Vidya Sthal',
            shortName: 'Library',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-2.8-1.5-6.6-1.5-10 0v16c3.4-1.5 7.2-1.5 10 0 2.8-1.5 6.6-1.5 10 0V4c-3.4-1.5-7.2-1.5-10 0z"></path></svg>',
            code: 'DRONA42',
            hint: 'Gyan aur vidya ek yoddha ka sabse bada astra hai. Jis sthan par gyan ka bhandar ho, wahan jao.'
        },
        {
            shloka: 'उत्तिष्ठ भारत ।\nतस्मात्त्वमुत्तिष्ठ यशो लभस्व\nजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् ॥',
            translation: 'Khade ho jao! Yash (glory) hasil karo. Dushman ko jeeto aur ek samriddh (prosperous) rajya ka anand lo.',
            riddle: 'Jaha yoddha apne shareer ko vajra-tulya banate hain, aur Bhim ki shakti ka anubhav hota hai. Wo sthal jaha kaya lohe ki banti hai—us akhade (arena) ko khojiye jaha aap vastavik shakti ka anubhav kar sakein.',
            locationName: 'Bal Sthal',
            shortName: 'Sports',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path></svg>',
            code: 'BHIMA77',
            hint: 'Bhim ki tarah bal aur shakti arjit karna avashyak hai. Akhade ya khel-kendra ki taraf prsthan karo.'
        },
        {
            shloka: 'स्थितप्रज्ञस्य का भाषा समाधिस्थस्य केशव ।\nस्थितधीः किं प्रभाषेत किमासीत व्रजेत किम् ॥',
            translation: 'He Krishn! Sthitapragny (sthir buddhi wale purush) ki kya pehchan hai? Wo kaise bolte, baithte aur chalte hain?',
            riddle: 'Jaha Vidur ki niti-nipun baatein sunayi deti thi, aur har nirnay (decision) antim hota tha. Wo kaksh jaha gyan-vriddh jan milte hain—prashasanik karya-sthal ke piche ka satya khojiye.',
            locationName: 'Vidura Sabha',
            shortName: 'Office',
            icon: '<svg viewBox="0 0 24 24" width="1.5em" height="1.5em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="22" y2="22"></line><line x1="6" x2="6" y1="18" y2="11"></line><line x1="10" x2="10" y1="18" y2="11"></line><line x1="14" x2="14" y1="18" y2="11"></line><line x1="18" x2="18" y1="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>',
            code: 'VIDURA99',
            hint: 'Rajkaaj aur niti nirman ke kendra mein jao, jahan Vidur jaise mantri apna margdarshan dete hain.'
        }
    ],

    // --- Round 3: The Codex (5 Campus-wide Clues) ---
    round3Clues: [
        {
            shloka: 'अश्वत्थामा हत इति — नरो वा कुञ्जरो वा ।',
            translation: 'Ashwatthama mara gaya—par insaan ya haathi, ye pata nahi.',
            riddle: 'Satya jhuk sakta hai par parajit nahi, jaise Yudhishthir ka wo ek mithya kathan. Jaha dhwaniyan gunjati hain aur shabd kabhi bante hain toh kabhi vilupt ho jate hain. Us sabhagaar (hall) ko khojiye jaha manch se swar gambhirta se aate hain—vivaran aur ardha-satya ka wo sthan.',
            locationName: 'Auditorium',
            code: 'YUDDHA01',
            hint: 'He Dhananjay, jahan log ekatrit hokar gyan, kala aur vichaar sunte hain. Ek bada sabhagaar tumhari apeksha kar raha hai.'
        },
        {
            shloka: 'गाण्डीवं स्रंसते हस्तात् त्वक् चैव परिदह्यते ।\nन च शक्नोम्यवस्थातुं भ्रमतीव च मे मनः ॥',
            translation: 'Mere haath se Gandiva chhoot raha hai aur meri tvacha (skin) jal rahi hai. Main khada nahi ho paa raha hoon aur mera mann ghoom raha hai.',
            riddle: 'Arjun ka astra unka garv tha, aur unka sandhan sabse sateek. Wo sthan khojiye jaha lakshya sarvopari hai, jaha vigyan har vastoo ki pariksha leta hai. Prayogshala ka wo kaksh, jaha agni se satya ka bodh hota hai—us koot (code) ko khojiye jo nishane se milta hai.',
            locationName: 'Science Lab',
            code: 'GANDIV02',
            hint: 'Vigyan aur anishchitata ke beech... jahan naye prayog hote hain, shodh-kaksh mein satya ki khoj karo.'
        },
        {
            shloka: 'यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः ।\nतत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥',
            translation: 'Jaha Yogeshwar Krishn hain aur jaha Dhanurdhar Arjun hai, waha hamesha vijay, vaibhav aur niti rahegi.',
            riddle: 'Jaha vatika (garden) khule akash se milti hai, aur prakriti ki shanti vyapt rehti hai. Jaise Kunti prachin vrikshon ke neeche prarthana karti thi—us sthan ko khojiye jaha vrikshon ke madhya prachin gathayein chhupi hain.',
            locationName: 'Garden',
            code: 'KUNTI03',
            hint: 'Prakriti ki sharan mein shanti aur vishram milta hai. Ek hare-bhare baag ya vatika ki or jao.'
        },
        {
            shloka: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥',
            translation: 'Sajjan logo ki raksha ke liye aur dushto ke vinash ke liye, main har yug mein janam leta hoon.',
            riddle: 'Antim yuddh ke liye ek ranbhoomi chahiye, jaha Karn ki niyati nirdharit hui thi. Wo khulla prangan (open ground) jo veer yoddhao ka marg hai. Wo kshetra khojiye jaha vijetaon ko mukut milta hai aur veergatha paida hoti hai.',
            locationName: 'Playground',
            code: 'KARNA04',
            hint: 'Kuru-kshetra jaisa ek bada khulla maidaan dhundo, jahan khel aur sangharsh dono hote hain.'
        },
        {
            shloka: 'यत्र धर्मस्तत्र जयः ।',
            translation: 'Jaha Dharm hai, waha Vijay hai.',
            riddle: 'Koot (Codex) wahi hai jaha sab prarambh hua tha, jaha aapne pratham baar sapath li thi. Punah wahi jaiye jaha Sabha ka aayojan hua tha—prarambh-sthal—aur aapki vijay nishchit hai. Chakra purna hua, khoj samapt hai—khojiye aapki yatra kaha se prarambh hui thi.',
            locationName: 'Starting Point',
            code: 'CODEX05',
            hint: 'Jahan se shuruaat hui thi, purnata bhi wahi hogi. Apne prarambhik sthan par laut aao, Parth!'
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
