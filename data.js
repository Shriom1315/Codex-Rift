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
        },
        {
            shloka: 'भीष्मः शान्तनवो धीमान् धर्मपुत्रो युधिष्ठिरः ।',
            translation: 'Bhishma pitamah aur dharmraj Yudhishtir dono hi gyan ke bhandar hain.',
            riddle: 'Main wo yoddha hoon jisne iccha-mrityu ka vardan paya hai, sheron ki tarah lada hoon par pita ki pratijna se bandha hoon. Main kaun hoon?',
            answer: 'BHISHMA',
            hint: 'Ganga-putra aur Hastinapur ke rakshak ke baare mein socho.'
        },
        {
            shloka: 'यत्र नत्यों न पूज्यन्ते रमन्ते तत्र देवताः ।',
            translation: 'Jahan nari ka samman hota hai, wahan devta niwas karte hain.',
            riddle: 'Main panch Pandavon ki shakti hoon, mera apmaan hi Kurukshetra ke yuddh ka kaaran bana. Main kaun hoon?',
            answer: 'DRAUPADI',
            hint: 'Panchali aur Agnishuta ke naam se bhi jani jati hoon.'
        },
        {
            shloka: 'गाण्डीवं स्रंसते हस्तात् त्वक् चैव परिदह्यते ।',
            translation: 'Gandiva haath se chhoot raha hai aur tvacha jal rahi hai.',
            riddle: 'Main wo dhanush hoon jise swayam Agni ne Arjun ko diya tha. Meri tankaar se shatru kaanpte hain. Main kaun hoon?',
            answer: 'GANDIVA',
            hint: 'Arjun ka divya dhanush.'
        },
        {
            shloka: 'पुण्यं पश्यन्ति ज्ञानिनः तत्वं पश्यन्ति सूक्ष्मदृशः ।',
            translation: 'Gyani log punya dekhte hain aur sukshm-drishi log tattva dekhte hain.',
            riddle: 'Main Narayan ki ungli par virajman hoon, main samay ka chakra hoon aur adharm ka vinash karta hoon. Main kaun hoon?',
            answer: 'SUDARSHANA',
            hint: 'Bhagwan Vishnu ka divya chakra.'
        },
        {
            shloka: 'शल्यारुढो रथो यस्य मद्रेराजः स वीर्यवान् ।',
            translation: 'Shalya jiske rath ka sarathi hai, woh Madra-raj veer hai.',
            riddle: 'Main Madra ka raja hoon, Nakul-Sahadev ka mama, par niyati mujhe Kauravon ke sarathi ke roop mein le aayi. Main kaun hoon?',
            answer: 'SHALYA',
            hint: 'Karna ka sarathi yuddh ke antim charan mein.'
        },
        {
            shloka: 'नकुलः सादेदवश्चैव माद्रीपुत्रौ महारथौ ।',
            translation: 'Nakul aur Sahadev Madri ke putra aur maharathi hain.',
            riddle: 'Main Ashwini-kumaron ka ansh hoon, main talwar chalane mein nipun hoon aur sabase sundar Pandav mana jata hoon. Main kaun hoon?',
            answer: 'NAKULA',
            hint: 'Pandavon mein chautha bhai.'
        },
        {
            shloka: 'सहदेवः समर्थोऽस्ति त्रिकालज्ञो महान् यतिः ।',
            translation: 'Sahadev samarth hai aur teeno kaal ka gyan rakhne wala hai.',
            riddle: 'Main sabse chhota Pandav hoon, mujhe bhavishya ka gyan hai par main vardan se bandha hoon ki bata nahi sakta. Main kaun hoon?',
            answer: 'SAHADEVA',
            hint: 'Pandavon mein paanchva bhai.'
        },
        {
            shloka: 'यतो धर्मस्ततो जयः युधिष्ठिरस्य वचनम् ।',
            translation: 'Jahan dharm hai wahan vijay hai, yeh Yudhishtir ka vachan hai.',
            riddle: 'Main Dharm ka avatar hoon, main kabhi jhoot nahi bolta, mera rath hamesha bhoomi se upar chalta tha. Main kaun hoon?',
            answer: 'YUDHISHTIRA',
            hint: 'Pandavon mein sabse bade bhai.'
        },
        {
            shloka: 'गदायुद्द्हे कुशलः भीमसेनः प्रतापवान् ।',
            translation: 'Gada-yuddh mein kushal Bhimsen pratapwan hain.',
            riddle: 'Mujhme hazaar hathiyon ka bal hai, maine Bakasur ka vadh kiya aur Duryodhan ki jhang todne ki pratijna li. Main kaun hoon?',
            answer: 'BHIMA',
            hint: 'Pandavon mein doosra bhai.'
        },
        {
            shloka: 'पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम् ।',
            translation: 'He Acharya! Pandu-putron ki is vishal sena ko dekhiye.',
            riddle: 'Main sateek nishanebaaz hoon, maine machli ki aankh bhedi aur Gandiv dharan kiya. Main kaun hoon?',
            answer: 'ARJUNA',
            hint: 'Krishna ka priya sakha aur dhanurdhar.'
        },
        {
            shloka: 'कर्णः कुन्तीसुतो ज्येष्ठः सूर्यपुत्रो महादानी ।',
            translation: 'Karna Kunti ka jyeshtha putra, Surya-putra aur maha-dani hai.',
            riddle: 'Main kavach aur kundal ke saath janma, maine dosti ke liye dharm ka saath chhoda par daan mein kabhi piche nahi hat-ta. Main kaun hoon?',
            answer: 'KARNA',
            hint: 'Angaraj aur Radheya ke naam se prasiddh.'
        },
        {
            shloka: 'दुर्योधनो मानधनी सुयोधन इति चोच्यते ।',
            translation: 'Duryodhan maan-dhani hai aur use Suyodhan bhi kaha jata hai.',
            riddle: 'Main Hastinapur ka jyeshtha Kaurav hoon, mera sharir vajra ka hai par ek hissa kacha reh gaya. Main kaun hoon?',
            answer: 'DURYODHANA',
            hint: 'Pandavon ka sabse bada shatru.'
        },
        {
            shloka: 'शकुनिः मातुलः पापः कुरुवंशविनाशकः ।',
            translation: 'Shakuni mama paapi hai aur Kuruvansh ka vinashak hai.',
            riddle: 'Main Gandhari ka bhai hoon, mere paase hamesha wahi batate hain jo main chahta hoon. Main kaun hoon?',
            answer: 'SHAKUNI',
            hint: 'Dyut-krida (Gambling) ka khiladi.'
        },
        {
            shloka: 'विदुरो धर्मवेत्ता च नीतिशास्त्रविशारदः ।',
            translation: 'Vidura dharm ke gyata aur niti-shastra mein nipun hain.',
            riddle: 'Main Dhritarashtra ka bhai hoon, maine Lakshagrah se Pandavon ko bachaya aur Vidur-niti di. Main kaun hoon?',
            answer: 'VIDURA',
            hint: 'Mahabharata ka sabse bada niti-kar.'
        },
        {
            shloka: 'कुन्ती देवी महाभागा पाण्डवानाम प्रसूः ।',
            translation: 'Devi Kunti mahabhaga hain aur Pandavon ki mata hain.',
            riddle: 'Maine Durvasa rishi se vardan paya aur devayon ka avahan kiya. Main kaun hoon?',
            answer: 'KUNTI',
            hint: 'Pritha aur Pandu ki patni.'
        },
        {
            shloka: 'गान्धारी पतिव्रता च शीलवती सुव्रता ।',
            translation: 'Gandhari pativrata aur sheelwati hain.',
            riddle: 'Maine apne pati ke andhepan ke kaaran apni aankhon par patti baandh li. Main kaun hoon?',
            answer: 'GANDHARI',
            hint: 'Kauravon ki mata.'
        },
        {
            shloka: 'धृतराष्ट्रोऽन्धः नृपः पुत्रव्याकुलः ।',
            translation: 'Dhritarashtra andha raja aur putraon ke liye vyakul hai.',
            riddle: 'Main Hastinapur ka janm-andha raja hoon, mere putra-moh ne mahayuddh ko janm diya. Main kaun hoon?',
            answer: 'DHRITARASHTRA',
            hint: 'Pandu ka bada bhai.'
        },
        {
            shloka: 'अभिमन्युः वीरवरः सुभद्रापुत्रः प्रतापवान् ।',
            translation: 'Abhimanyu veer-var aur Subhadra ka putra pratapwan hai.',
            riddle: 'Maine mata ke garbh mein hi Chakravyuh todna sikha, par nikalna nahi jaan saka. Main kaun hoon?',
            answer: 'ABHIMANYU',
            hint: 'Arjun ka veer putra.'
        },
        {
            shloka: 'अश्वत्थामा हत इति नरो वा कुञ्जरो वा ।',
            translation: 'Ashwatthama mara gaya—par insaan ya haathi, ye pata nahi.',
            riddle: 'Maine Shiv-tatva se janam liya, mere maathe par ek mani hai aur main chiranjeevi hoon. Main kaun hoon?',
            answer: 'ASHWATTHAMA',
            hint: 'Drona ka putra.'
        },
        {
            shloka: 'द्रोणाचार्यः गुरुश्रेष्ठः धनुर्वेदविशारदः ।',
            translation: 'Dronacharya guru-shreshtha aur Dhanurved mein nipun hain.',
            riddle: 'Maine Pandavon aur Kauravon ko shiksha di, par Draupadi ke apmaan par chup raha. Main kaun hoon?',
            answer: 'DRONA',
            hint: 'Eklavya se angootha mangne wala guru.'
        },
        {
            shloka: 'कृपाचार्यः कुलगुरुः दीर्धजीवी महामतिः ।',
            translation: 'Kripacharya kul-guru aur deergh-jeevi hain.',
            riddle: 'Main Hastinapur ka kripalu kul-guru hoon, main bhi chiranjeevi hoon. Main kaun hoon?',
            answer: 'KRIPACHARYA',
            hint: 'Kauravon ke pehle guru.'
        },
        {
            shloka: 'व्यासः सर्ववेत्ता च महाभारत लेखकः ।',
            translation: 'Vyasa sab janne wale aur Mahabharata ke lekhak hain.',
            riddle: 'Maine Mahabharata ka granth racha aur Ganesh ji se likhwaya. Main kaun hoon?',
            answer: 'VYASA',
            hint: 'Krishna-Dwaipayana.'
        },
        {
            shloka: 'पाञ्चाली सुभगा देवी पावकी यज्ञसम्भवा ।',
            translation: 'Panchali subhaga devi hain aur yagya se janmi hain.',
            riddle: 'Main Drupad ki putri hoon, mera janam yagya ki agni se hua. Main kaun hoon?',
            answer: 'PANCHALI',
            hint: 'Draupadi ka ek aur naam.'
        },
        {
            shloka: 'हस्तिनापुरं राजधानी कुरुवंशस्य शोभा ।',
            translation: 'Hastinapur rajdhani Kuruvansh ki shobha hai.',
            riddle: 'Main Gaja-pur ke naam se bhi jani jati hoon, main Kuruvansh ki prachin satta ka kendra hoon. Main kaun hoon?',
            answer: 'HASTINAPUR',
            hint: 'Mahabharata ki mukhya rajdhani.'
        },
        {
            shloka: 'इन्द्रप्रस्थं नवनिर्मितं पाण्डवानां गृहम् ।',
            translation: 'Indraprastha naya bana Pandavon ka ghar hai.',
            riddle: 'Maine Khandava-van ko jala kar banvaya gaya tha, main Maya-sabha ke liye prasiddh hoon. Main kaun hoon?',
            answer: 'INDRAPRASTHA',
            hint: 'Aaj ki Delhi ka prachin naam.'
        },
        {
            shloka: 'द्वारका पुरी रम्या कृष्णस्य वास्थानम् ।',
            translation: 'Dwarka puri ramya hai aur Krishna ka niwas hai.',
            riddle: 'Main samudra ke beech basi swarna nagari hoon, jahan Krishna ne raj kiya. Main kaun hoon?',
            answer: 'DWARKA',
            hint: 'Krishna ki rajdhani.'
        },
        {
            shloka: 'यमुना तीर विहारी कृष्णः श्यामल वर्धमानः ।',
            translation: 'Yamuna kinare vihar karne wale Krishna shyam varna ke hain.',
            riddle: 'Main wo nadi hoon jisne Vasudev ko rasta diya jab wo Krishna ko Mathura le ja rahe the. Main kaun hoon?',
            answer: 'YAMUNA',
            hint: 'Mathura ki mukhya nadi.'
        },
        {
            shloka: 'गङ्गा माता पवित्री च भीष्मस्य जननी ।',
            translation: 'Ganga mata pavitra hain aur Bhishma ki mata hain.',
            riddle: 'Maine Shantanu se vivah kiya aur apne 7 putraon ko taran diya. Main kaun hoon?',
            answer: 'GANGA',
            hint: 'Bharat ki sabse pavitra nadi.'
        },
        {
            shloka: 'सरस्वती ज्ञानदात्री विद्यादेवी नमोस्तुते ।',
            translation: 'Saraswati gyan dene wali hain, vidya devi ko naman.',
            riddle: 'Main vilupt ho chuki nadi hoon par gyan ki devi ke roop mein pooji jati hoon. Main kaun hoon?',
            answer: 'SARASWATI',
            hint: 'Prayag mein gupt nadi.'
        },
        {
            shloka: 'वेदाः दिव्याः चत्वारः ज्ञानस्य मूलम् ।',
            translation: 'Divya char Ved gyan ke mool hain.',
            riddle: 'Hum char hain—Rig, Sama, Yajur aur Atharva. Humse hi sara gyan prapt hota hai. Hum kaun hain?',
            answer: 'VEDA',
            hint: 'Sanatan dharm ke prachin granth.'
        },
        {
            shloka: 'उपनिषदः गम्भीराः ब्रह्माज्ञान प्रकाशिताः ।',
            translation: 'Upnishad gambhir hain aur brahm-gyan ko prakashit karte hain.',
            riddle: 'Hame Vedant bhi kaha jata hai, hum jeev aur brahm ke sambandh ko samjhate hain. Hum kaun hain?',
            answer: 'UPNISHAD',
            hint: 'Aadhyatmik gyan ka shikhar.'
        },
        {
            shloka: 'पुराणानि कथा दिव्याः पुरातन इतिहासः ।',
            translation: 'Purana divya kathayein aur purana itihas hain.',
            riddle: 'Hum 18 hain, hum devi-devtaon ki kathaon se gyan dete hain. Hum kaun hain?',
            answer: 'PURANAS',
            hint: 'Bhagavata, Vishnu aur Shiv jaise granth.'
        },
        {
            shloka: 'श्रीमद्भगवद्गीता ज्ञान गङ्गा पावनी ।',
            translation: 'Shrimad Bhagawad Gita gyan rupa pavitra Ganga hai.',
            riddle: 'Main wo updesh hoon jo Kurukshetra mein diya gaya, main har mushkil ka samadhan hoon. Main kaun hoon?',
            answer: 'GITA',
            hint: 'Bhagwan ka geet.'
        },
        {
            shloka: 'मोक्षः परम पदं च पुनर्जन्म विवर्जितम् ।',
            translation: 'Moksha param pad hai aur punarjanm se mukti hai.',
            riddle: 'Main viman ya jannat nahi, main janm aur mrityu ke chakra se mukti hoon. Main kaun hoon?',
            answer: 'MOKSHA',
            hint: 'Jeevan ka antim lakshya.'
        },
        {
            shloka: 'संसारः चक्रं च जन्म मृत्यु प्रवाहितम् ।',
            translation: 'Samsara ek chakra hai jo janm aur mrityu se pravahit hai.',
            riddle: 'Main wo bhav-sagar hoon jisme har atma phansi hui hai aur sukh-dukh bhog rahi hai. Main kaun hoon?',
            answer: 'SAMSARA',
            hint: 'Mrit-lok ki duniya.'
        },
        {
            shloka: 'माया मोहकरी शक्तिः सत्यं आच्छादयेत् ।',
            translation: 'Maya mohit karne wali shakti hai jo satya ko dhak deti hai.',
            riddle: 'Main wo bhram hoon jo asatya ko satya dikhata hai, Krishna ki shakti jise samjhna kathin hai. Main kaun hoon?',
            answer: 'MAYA',
            hint: 'Jadu ya illusion.'
        },
        {
            shloka: 'भक्तिः प्रेम रूपा च ईश्वर प्राप्ति साधनम् ।',
            translation: 'Bhakti prem swaroop hai aur Ishwar pane ka sadhan.',
            riddle: 'Main Meera ka prem hoon aur Hanuman ka samarpan. Main bina shashtra ke bhi bhagwan ko jeet leti hoon. Main kaun hoon?',
            answer: 'BHAKTI',
            hint: 'Devotion.'
        },
        {
            shloka: 'योगः कर्मसु कौशलं चित्तवृत्ति निरोधः ।',
            translation: 'Yog karmon mein kushalata hai aur mann ko rokna hai.',
            riddle: 'Main sharir aur mann ko jodne wali vidya hoon, Arjun ne mujhse hi dhairya paya. Main kaun hoon?',
            answer: 'YOGA',
            hint: 'Asan aur dhyan.'
        },
        {
            shloka: 'ज्ञानं अग्निः च पापानि भस्मसात् कुरुते ।',
            translation: 'Gyan ki agni saare paapo ko bhasm kar deti hai.',
            riddle: 'Andhera (agnan) mujhe seh nahi sakta, main wo deepak hoon jo atma ko prakashit karta hai. Main kaun hoon?',
            answer: 'JYAN',
            hint: 'Knowledge.'
        },
        {
            shloka: 'वैराग्यं मोक्ष द्वारं च राग द्वेष विवर्जितम् ।',
            translation: 'Vairagya moksha ka dwar hai aur moh-maya se doori.',
            riddle: 'Main saari duniya ko chhod kar keval ishwar mein mann lagane ki sthiti hoon. Main kaun hoon?',
            answer: 'VAIRAGYA',
            hint: 'Renunciation.'
        },
        {
            shloka: 'शान्तिः परमं सुखं च क्रोध रहितं मानसम् ।',
            translation: 'Shanti param sukh hai aur krodh-rahit mann.',
            riddle: 'Main wo hoon jise har manushya dhund raha hai, yuddh ke baad bhi Ashwatthama ko ye nahi mili. Main kaun hoon?',
            answer: 'SHANTI',
            hint: 'Peace.'
        },
        {
            shloka: 'सत्यं वद धर्मं चर ।',
            translation: 'Satya bolo aur dharm ka palan karo.',
            riddle: 'Duniya mit sakti hai par main nahi, main Harishchandra ka vachan hoon. Main kaun hoon?',
            answer: 'SATYA',
            hint: 'Truth.'
        },
        {
            shloka: 'अहिंसा परमो धर्मः ।',
            translation: 'Ahimsa sabse bada dharm hai.',
            riddle: 'Main dusron ki peeda ko apni peeda samajhta hoon, bina kisi ko chot pahunchaye vijay pata hoon. Main kaun hoon?',
            answer: 'AHIMSA',
            hint: 'Non-violence.'
        },
        {
            shloka: 'दानं पात्रे च काले च श्रेष्ठं उच्यते ।',
            translation: 'Sahi samay aur sahi patra ko diya gaya daan shreshtha hai.',
            riddle: 'Maine Karna ko "Daan-veer" banaya, main wo tyag hoon jo bina mangne par diya jata hai. Main kaun hoon?',
            answer: 'DANA',
            hint: 'Charity.'
        },
        {
            shloka: 'तपः अग्निः च काया शुद्धिः ।',
            translation: 'Tapashya wo agni hai jo kaya ko shuddh karti hai.',
            riddle: 'Maine Vishwamitra ko brahmarishi banaya, main kadi mehnat aur bhakti ka mishran hoon. Main kaun hoon?',
            answer: 'TAPAS',
            hint: 'Penance.'
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
