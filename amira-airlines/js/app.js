
(function(){
  // ---------------- shared icon glyphs (elegant custom SVGs, replacing plain emoji/text) ----------------
  const ICON_CHECK = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5L6.5 12L13 4"/></svg>';
  const ICON_LOCK = '<svg width="11" height="13" viewBox="0 0 14 16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="10" height="7.5" rx="1.3"/><path d="M4.5 7V4.6a2.5 2.5 0 0 1 5 0V7"/></svg>';
  const ICON_STAR = '<svg viewBox="0 0 18 17" fill="currentColor"><path d="M9 0.5L11.2 6L17 6.6L12.6 10.4L13.9 16L9 13L4.1 16L5.4 10.4L1 6.6L6.8 6L9 0.5Z"/></svg>';

  // ---------------- i18n ----------------
  const T = {
    he: {
      "nav.sub":"טיסות פרטיות · הרצליה","nav.routes":"המסלולים","nav.about":"אודות","nav.process":"איך זה עובד","nav.reviews":"ביקורות","nav.faq":"שאלות נפוצות","nav.contact":"צור קשר","nav.cta":"בקש הצעת מחיר",
      "hero.eyebrow":"טיסות פרטיות · שדה הרצליה","hero.h1a":"השמיים שלך.","hero.h1b":"הקצב שלך.",
      "hero.lead":"חברת טיסות פרטיות בוטיקית המציעה חוויית טיסה מותאמת אישית — ממריאים מהרצליה, אתם קובעים את המסלול ואת משך הזמן באוויר.",
      "hero.cta1":"בנה את הטיסה שלך","hero.cta2":"הכירו את הטייס","hero.stat0":"החל מ-30 דקות באוויר","hero.stat1":"יעדים זמינים","hero.stat2":"יחס אישי בכל טיסה",
      "types.eyebrow":"שלושה מסלולים","types.h2":"בחרו את סוג הטיסה","types.p":"כל טיסה יוצאת ונוחתת בשדה הרצליה. משך הזמן באוויר הוא שלכם לעצב — נגדיר אותו יחד בשלב הבא.",
      "scenario.1h":"רגע שלא שוכחים","scenario.1p":"הצעת נישואין, יום נישואין, יום הולדת עגול — מתנה שאף אחד אחר לא חשב עליה.",
      "scenario.2h":"יום עסקים, בלי פקקים","scenario.2p":"פגישה בחיפה בבוקר וחזרה לצהריים — בלי לאבד את היום בכביש 2.",
      "scenario.3h":"בילוי עם מי שחשוב","scenario.3p":"חברים, משפחה, או סתם רצון לראות את הארץ מזווית שכמעט אף אחד לא רואה.",
      "types.biz.tag":"AMIRA · עסקים","types.biz.h3":"AMIRA Business","types.biz.desc":"להמריא ולנחות — בלי לבזבז דקה. הפתרון המהיר ביותר לאיש העסקים שצריך להיות במקום אחר, ולחזור.",
      "types.biz.li1":"המראה מיידית, נחיתה מיידית ביעד","types.biz.li2":"מסלול הטיסה הישיר והקצר ביותר","types.biz.li3":"תיאום מדויק סביב לוח הזמנים שלכם",
      "types.exp.tag":"AMIRA · חוויה","types.exp.h3":"AMIRA Experience","types.exp.desc":"בדיוק לפי מה שבא לכם — הטייס יכול להסביר ולספר לאורך כל הדרך, או פשוט לטוס בשקט מול הנוף ולתת לרגע לדבר בעצמו.",
      "types.exp.li1":"עד 3 נוסעים על הסיפון","types.exp.li2":"מסלול טיסה נבחר לפי נוף וזמן","types.exp.li3":"בליווי הסבר, או בשקט מלא — הבחירה שלכם",
      "types.wings.tag":"AMIRA · טייס ליום","types.wings.h3":"AMIRA Wings","types.wings.desc":"תדריך טרום-טיסה מלא, הסברים לאורך הדרך, ושליטה אמיתית על ההגאים לצד הטייס — תרגישו טייסים ליום אחד.",
      "types.wings.li1":"תדריך טרום-טיסה מפורט","types.wings.li2":"הסבר צמוד על מכשירי הטיסה והניווט","types.wings.li3":"שליטה על ההגאים לצד הטייס",
      "types.select":"בחר מסלול זה",
      "config.eyebrow":"מכשיר הטיסה","config.h2":"בנו את הטיסה שלכם","config.p":"קבעו את משך הזמן באוויר — היעדים ייפתחו בהתאם, בדיוק כמו תכנון טיסה אמיתי.",
      "config.selectedPrefixLabel":"מסלול נבחר:","config.priceLabel":"מחיר משוער","config.priceTrust":"מחיר שקוף · ללא עלויות נסתרות","config.durationLabel":"משך זמן טיסה","config.hours":"שעות",
      "config.aircraftLabel":"בחרו מטוס","config.cap152":"טייס + נוסע אחד","config.cap172":"טייס + 1 עד 3 נוסעים","config.capDa42":"דו-מנועי · טייס + עד 3 נוסעים","config.perHour":"/שעה","config.soon":"בקרוב",
      "config.destHeading":"יעדים זמינים למשך הזמן שנבחר","config.destHint":"הגדילו את משך הטיסה כדי לפתוח יעדים רחוקים יותר",
      "config.cta1":"בקש הצעת מחיר","config.cta2":"המשך לפרטים","config.share":"שתף את הטיסה שלך","config.saved":"הבחירה שלכם נשמרה — תוכלו לחזור בכל רגע",
      "pilot.eyebrow":"מאחורי ההגה","pilot.h2":"טייס אחד. מטוס אחד. תשומת לב מלאה.",
      "pilot.p1":"AMIRA AIRLINES נולדה מתוך תשוקה אמיתית לטיסה ולשירות ברמה הגבוהה ביותר. כל טיסה מתוכננת ומבוצעת באופן אישי — אין צוותים מתחלפים, אין קווי ייצור. רק אתם, הטייס, והשמיים.",
      "pilot.quote":"\u201cכל טיסה היא הצהרה — על דיוק, על אחריות, ועל האופן שבו אני רוצה שתרגישו כשאתם עולים למטוס.\u201d",
      "pilot.p2":"ההכשרה, הרישוי והביטחון בטיסה עומדים בבסיס כל חוויה, כדי שתוכלו להתמקד רק בדבר אחד — הרגע.",
      "pilot.cred2n":"100%","pilot.cred2l":"טיסות בליווי אישי","pilot.cred3l":"בסיס הבית",
      "reviews.eyebrow":"מהלקוחות שלנו","reviews.h2":"ביקורות ודירוגים",
      "reviews.formH":"כתבו ביקורת","reviews.name":"שם","reviews.rating":"דירוג","reviews.text":"הביקורת שלכם","reviews.textPh":"ספרו לנו איך הייתה החוויה...",
      "reviews.err.name":"נא למלא שם","reviews.err.rating":"נא לבחור דירוג","reviews.err.text":"נא לכתוב כמה מילים",
      "reviews.submit":"שליחת ביקורת",
      "reviews.successH":"תודה על הביקורת!","reviews.successP":"היא תיבדק ותתפרסם בקרוב.",
      "process.eyebrow":"מהלב, אל השמיים","process.h2":"איך זה עובד",
      "process.s1h":"בחירה ובקשה","process.s1p":"בוחרים מסלול, משך זמן ויעד, ושולחים בקשה דרך האתר",
      "process.s2h":"תיאום אישי","process.s2p":"חוזרים אליכם תוך זמן קצר לתיאום מועד ופרטים סופיים",
      "process.s3h":"תדריך והמראה","process.s3p":"מגיעים לשדה הרצליה, תדריך קצר, ולאוויר",
      "process.s4h":"החוויה","process.s4p":"נהנים מהטיסה בקצב שלכם, ונוחתים בחזרה בהרצליה",
      "itin.eyebrow":"מהתכנון לשמיים","itin.h2":"דוגמה למסלול יום","itin.p":"שלוש דוגמאות אמיתיות איך יום טיסה עם AMIRA נראה בפועל, לפי סוג המסלול שתבחרו.",
      "itin.biz.tag":"AMIRA Business","itin.biz.s1":"הגעה לשדה הרצליה, תדריך של 5 דקות","itin.biz.s2":"המראה ישירה לחיפה","itin.biz.s3":"נחיתה, מעבר ישיר לפגישה","itin.biz.s4":"המראה חזרה, בלי המתנה מיותרת","itin.biz.s5":"נחיתה בהרצליה — חזרה למשרד עוד לפני הצהריים",
      "itin.wings.tag":"AMIRA Wings","itin.wings.s1":"הגעה לשדה, תדריך טרום-טיסה מלא","itin.wings.s2":"עלייה למטוס, הסבר על מכשירי הטיסה","itin.wings.s3":"המראה — שליטה על ההגאים לצד הטייס","itin.wings.s4":"טיסה מעל הגליל והכנרת עם הסבר צמוד","itin.wings.s5":"נחיתה בהרצליה",
      "itin.exp.tag":"AMIRA Experience","itin.exp.s1":"הגעה לשדה לקראת שקיעה","itin.exp.s2":"המראה, טיסה שקטה מעל קו החוף","itin.exp.s3":"עצירה קלה באוויר מול הנוף האהוב עליכם","itin.exp.s4":"שקיעה מעל הים, מהאוויר","itin.exp.s5":"נחיתה בהרצליה, סיום החוויה",
      "itin.note":"כל הזמנים הם דוגמה בלבד — כל טיסה נבנית לפי משך הזמן, היעד וההעדפות שתבחרו במחשבון.",
      "trip.eyebrow":"בואו נטוס לשם","trip.h2":"שלושה טיולי יום מלאים","trip.p":"דוגמאות אמיתיות שמשלבות טיסה, נחיתה, ועצירה בקרקע בזמן שאתם בוחרים — בדיוק כמו שהמחשבון למעלה מאפשר.",
      "trip.flightTime":"זמן טיסה כולל","trip.groundTime":"עצירה בקרקע",
      "trip.haifa.tag":"מטוס 172 · טיול זוגי","trip.haifa.h":"יום בחיפה","trip.haifa.p":"ממריאים מהרצליה לחיפה לאורך קו החוף וההרים הירוקים של הכרמל — כ-25 דקות טיסה בכל כיוון. נוחתים בשדה התעופה ויורדים לטיול זוגי: גני הבאהאים, שוק תלפיות, או חוף הכרמל — לבחירתכם, שעתיים-שלוש. עולים חזרה למטוס וטסים חזרה להרצליה.","trip.haifa.ground":"2–3 שעות","trip.haifa.price":"מחיר משוער: ₪1,770–1,830",
      "trip.roshpina.tag":"מטוס 172 · טיול גליל","trip.roshpina.h":"יום בראש פינה והגליל","trip.roshpina.p":"טסים צפונה מעל עמק הירדן והכנרת אל ראש פינה — כ-45 דקות טיסה בכל כיוון. נוחתים בשדה התעופה ההיסטורי ויורדים לסיור: המושבה העתיקה עם הסמטאות והגלריות, יקב בוטיק ברמת הגולן, או שייט קצר בכנרת — כ-3-4 שעות לבחירתכם. חוזרים לשדה וטסים בחזרה להרצליה.","trip.roshpina.ground":"3–4 שעות","trip.roshpina.price":"מחיר משוער: ₪2,660–2,720",
      "trip.masada.tag":"מטוס 172 · מדבר וים המלח","trip.masada.h":"יום במצדה וים המלח","trip.masada.p":"טסים דרומה מעל מדבר יהודה אל מנחת מצדה — כ-35 דקות טיסה בכל כיוון, עם נוף אווירי לים המלח שרק מעטים רואים. נוחתים ועולים ברכבל אל ההר המבודד והחפירות הארכיאולוגיות, ולסיום צפים בים המלח — כ-3-4 שעות. חוזרים למטוס וטסים בחזרה להרצליה.","trip.masada.ground":"3–4 שעות","trip.masada.price":"מחיר משוער: ₪2,240–2,300",
      "trip.note":"המחירים מבוססים על מטוס Cessna 172 ומשקפים טיסה + עצירה בקרקע בטווח השעות שצוין. זמני הטיסה הם הערכה ומחייבים אישור מול הטייס.",
      "policy.eyebrow":"שקיפות מלאה","policy.h2":"בטיחות ומדיניות",
      "policy.c1tag":"מזג אוויר","policy.c1h":"גמישות מלאה","policy.c1p":"בטיחות קודמת לכל. אם תנאי מזג האוויר אינם מתאימים, נתאם יחד מועד חלופי ללא עלות נוספת.",
      "policy.c2tag":"ביטול","policy.c2h":"מדיניות ביטול הוגנת","policy.c2p":"ביטול עד 48 שעות לפני הטיסה — החזר מלא. ביטול בטווח קצר יותר או שינוי מועד ייבחנו לפי נסיבות, ותמיד בתיאום אישי איתכם.",
      "policy.c3tag":"רגולציה","policy.c3h":"פועלים באחריות","policy.c3p":"הפעלת הטיסות מתבצעת בהתאם לדרישות רשות התעופה האזרחית ולתקנות הבטיחות הרלוונטיות.",
      "policy.note":"<b>לתשומת ליבכם:</b> AMIRA AIRLINES נמצאת כעת בתהליכי רישוי והקמה. פתיחת הזמנות בפועל תוכרז באתר ובערוצי יצירת הקשר בקרוב.",
      "gallery.eyebrow":"תמונת מצב","gallery.h2":"השמיים מזווית אחרת","gallery.c2":"פנים התא · ססנה 172","gallery.c4":"טיסת שקיעה · ססנה 172",
      "faq.eyebrow":"שאלות נפוצות","faq.h2":"מה שכדאי לדעת",
      "faq.q1":"איך נקבע המחיר של הטיסה?","faq.a1":"המחיר מחושב לפי משך הזמן באוויר שתבחרו, ומוצג לכם באופן שקוף ומיידי במחשבון שבאתר. המחיר הסופי מאושר בעת תיאום ההזמנה.",
      "faq.q2":"מה קורה אם מזג האוויר לא מתאים ביום הטיסה?","faq.a2":"בטיחות היא תמיד בראש סדר העדיפויות. במקרה כזה נתאם יחד מועד חלופי, ללא עלות נוספת.",
      "faq.q3":"כמה נוסעים יכולים לעלות לטיסה?","faq.a3":"אנחנו טסים בססנה 152 (טייס + נוסע אחד) או בססנה 172 (טייס + עד 3 נוסעים), בהתאם למספר הנוסעים שתבחרו במחשבון — המטוס המתאים והמחיר נקבעים אוטומטית.",
      "faq.q4":"האם ניתן לשלב כמה יעדים בטיסה אחת?","faq.a4":"בהחלט — כתבו לנו את הרעיון שלכם בטופס הפנייה ונבנה יחד מסלול מותאם, בכפוף לזמן הטיסה הכולל.",
      "faq.q5":"האם החברה מורשית לבצע טיסות מסחריות?","faq.a5":"AMIRA AIRLINES נמצאת בתהליכי רישוי מול רשות התעופה האזרחית. פתיחת ההזמנות בפועל תוכרז באופן רשמי באתר.",
      "faq.q6":"אפשר לנחות ולהישאר ביעד לזמן מה?","faq.a6":"כן — לאחר בחירת יעד, ניתן להוסיף עצירה על הקרקע באורך של עד 4 שעות, בעלות של 60 ₪ לכל שעת עצירה. משך העצירה לבחירתכם, והמחיר מתעדכן במחשבון בזמן אמת.",
      "contact.eyebrow":"בואו נתחיל","contact.h2":"בקשו הצעת מחיר","contact.p":"מלאו את הפרטים ונחזור אליכם באופן אישי לתיאום הטיסה — ללא כל התחייבות.",
      "form.name":"שם מלא","form.phone":"טלפון","form.email":"אימייל","form.date":"תאריך מועדף","form.pax":"כמה נוסעים","form.aircraftChosen":"מטוס נבחר","form.notes":"הערות נוספות","form.notesPh":"ספרו לנו עוד על החוויה שאתם מדמיינים...","form.priceConfirmLabel":"מחיר משוער לטיסה שבחרתם","form.reassure":"ללא התחייבות · ביטול חינם עד 48 שעות לפני הטיסה",
      "form.err.name":"נא למלא שם מלא","form.err.phone":"נא למלא מספר טלפון תקין","form.err.email":"נא למלא כתובת אימייל תקינה",
      "form.submit":"שליחת בקשה","form.successH":"הבקשה נשלחה בהצלחה","form.successP":"תודה! נחזור אליכם תוך 24 שעות לתיאום הטיסה.",
      "a11y.skip":"דלג לתוכן הראשי",
      "notice.bar":"<svg width=\"15\" height=\"15\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" style=\"vertical-align:-3px;margin-inline-end:6px;\"><circle cx=\"8\" cy=\"8\" r=\"6.4\"/><line x1=\"8\" y1=\"7.2\" x2=\"8\" y2=\"11.2\"/><circle cx=\"8\" cy=\"4.7\" r=\"0.65\" fill=\"currentColor\" stroke=\"none\"/></svg>האתר בשלבי הקמה — לצפייה בלבד · <a href=\"#\" id=\"openTerms\">תנאי שימוש</a>",
      "footer.nav":"ניווט","footer.legal":"משפטי","footer.rights":"© 2026 AMIRA AIRLINES. כל הזכויות שמורות.","footer.reg":"בתהליכי רישוי מול רשות התעופה האזרחית",
      "legal.tabTerms":"תנאי שימוש","legal.tabPrivacy":"מדיניות פרטיות"
    },
    en: {
      "nav.sub":"Private Aviation · Herzliya","nav.routes":"Routes","nav.about":"About","nav.process":"How It Works","nav.reviews":"Reviews","nav.faq":"FAQ","nav.contact":"Contact","nav.cta":"Request a Quote",
      "hero.eyebrow":"Private Aviation · Herzliya Airfield","hero.h1a":"Your sky.","hero.h1b":"Your pace.",
      "hero.lead":"A boutique private aviation house offering fully personal flight experiences — depart from Herzliya, you set the route and the time in the air.",
      "hero.cta1":"Build Your Flight","hero.cta2":"Meet the Pilot","hero.stat0":"Starting from 30 minutes airborne","hero.stat1":"Destinations available","hero.stat2":"Personal care, every flight",
      "types.eyebrow":"Three Routes","types.h2":"Choose Your Flight","types.p":"Every flight departs and lands at Herzliya. Time in the air is yours to shape — we'll set it together in the next step.",
      "scenario.1h":"A Moment You Won't Forget","scenario.1p":"A proposal, an anniversary, a milestone birthday — a gift no one else thought of.",
      "scenario.2h":"A Business Day, Without Traffic","scenario.2p":"A morning meeting in Haifa and back by noon — without losing the day on Highway 2.",
      "scenario.3h":"Time With Who Matters","scenario.3p":"Friends, family, or simply the wish to see the country from an angle almost no one sees.",
      "types.biz.tag":"AMIRA · Business","types.biz.h3":"AMIRA Business","types.biz.desc":"Take off, land, done — not a minute wasted. The fastest way for a busy professional to be somewhere else, and back.",
      "types.biz.li1":"Immediate takeoff, immediate landing at destination","types.biz.li2":"The most direct, shortest flight path","types.biz.li3":"Precise coordination around your schedule",
      "types.exp.tag":"AMIRA · Experience","types.exp.h3":"AMIRA Experience","types.exp.desc":"Exactly the way you want it — the pilot can narrate and explain along the way, or simply fly quietly and let the view speak for itself.",
      "types.exp.li1":"Up to 3 passengers on board","types.exp.li2":"Route curated for scenery and time","types.exp.li3":"Guided narration, or complete quiet — your choice",
      "types.wings.tag":"AMIRA · A Day as Pilot","types.wings.h3":"AMIRA Wings","types.wings.desc":"A full pre-flight briefing, explanations along the way, and real hands-on control of the yoke beside the pilot — feel like a pilot for a day.",
      "types.wings.li1":"Detailed pre-flight briefing","types.wings.li2":"Close explanation of instruments and navigation","types.wings.li3":"Hands-on control of the yoke beside the pilot",
      "types.select":"Select This Route",
      "config.eyebrow":"The Flight Instrument","config.h2":"Build Your Flight","config.p":"Set your time in the air — destinations unlock accordingly, just like real flight planning.",
      "config.selectedPrefixLabel":"Selected route:","config.priceLabel":"Estimated Price","config.priceTrust":"Transparent pricing · No hidden costs","config.durationLabel":"Flight Duration","config.hours":"hrs",
      "config.aircraftLabel":"Choose Your Aircraft","config.cap152":"Pilot + 1 passenger","config.cap172":"Pilot + 1 to 3 passengers","config.capDa42":"Twin-engine · Pilot + up to 3 passengers","config.perHour":"/hr","config.soon":"Coming Soon",
      "config.destHeading":"Destinations available for the selected duration","config.destHint":"Increase flight time to unlock farther destinations",
      "config.cta1":"Request a Quote","config.cta2":"Continue to Details","config.share":"Share Your Flight","config.saved":"Your selection is saved — come back anytime",
      "pilot.eyebrow":"Behind the Yoke","pilot.h2":"One pilot. One aircraft. Full attention.",
      "pilot.p1":"AMIRA AIRLINES was born from a genuine passion for flight and for service at the highest level. Every flight is planned and flown personally — no rotating crews, no assembly line. Just you, the pilot, and the sky.",
      "pilot.quote":"\u201cEvery flight is a statement — about precision, about responsibility, and about how I want you to feel the moment you step aboard.\u201d",
      "pilot.p2":"Training, licensing, and flight safety are the foundation of every experience, so you can focus on just one thing — the moment.",
      "pilot.cred2n":"100%","pilot.cred2l":"Personally piloted flights","pilot.cred3l":"Home Base",
      "reviews.eyebrow":"From Our Customers","reviews.h2":"Reviews & Ratings",
      "reviews.formH":"Write a Review","reviews.name":"Name","reviews.rating":"Rating","reviews.text":"Your Review","reviews.textPh":"Tell us how the experience was...",
      "reviews.err.name":"Please enter your name","reviews.err.rating":"Please choose a rating","reviews.err.text":"Please write a few words",
      "reviews.submit":"Submit Review",
      "reviews.successH":"Thank you for your review!","reviews.successP":"It will be checked and published soon.",
      "process.eyebrow":"From the Heart, To the Sky","process.h2":"How It Works",
      "process.s1h":"Choose & Request","process.s1p":"Select your route, duration and destination, and send a request through the site",
      "process.s2h":"Personal Coordination","process.s2p":"We'll get back to you shortly to confirm the date and final details",
      "process.s3h":"Briefing & Takeoff","process.s3p":"Arrive at Herzliya Airfield, a short briefing, and up we go",
      "process.s4h":"The Experience","process.s4p":"Enjoy the flight at your own pace, and land back in Herzliya",
      "itin.eyebrow":"From Planning to Sky","itin.h2":"Sample Day Itinerary","itin.p":"Three real examples of what a flight day with AMIRA actually looks like, by route type.",
      "itin.biz.tag":"AMIRA Business","itin.biz.s1":"Arrive at Herzliya Airfield, 5-minute briefing","itin.biz.s2":"Direct takeoff to Haifa","itin.biz.s3":"Landing, straight to the meeting","itin.biz.s4":"Takeoff back, no unnecessary waiting","itin.biz.s5":"Land in Herzliya — back at the office before noon",
      "itin.wings.tag":"AMIRA Wings","itin.wings.s1":"Arrive at the airfield, full pre-flight briefing","itin.wings.s2":"Board the aircraft, instrument walkthrough","itin.wings.s3":"Takeoff — hands-on control beside the pilot","itin.wings.s4":"Flight over the Galilee and the Sea of Galilee with close narration","itin.wings.s5":"Land in Herzliya",
      "itin.exp.tag":"AMIRA Experience","itin.exp.s1":"Arrive at the airfield toward sunset","itin.exp.s2":"Takeoff, a quiet flight along the coast","itin.exp.s3":"A gentle pause in the air facing your favorite view","itin.exp.s4":"Sunset over the sea, from above","itin.exp.s5":"Land in Herzliya, experience complete",
      "itin.note":"All times are illustrative — every flight is built around the duration, destination and preferences you choose in the calculator.",
      "trip.eyebrow":"Let's Fly There","trip.h2":"Three Full Day Trips","trip.p":"Real examples combining a flight, a landing, and ground time of your choosing — exactly what the calculator above lets you build.",
      "trip.flightTime":"Total Flight Time","trip.groundTime":"Ground Stopover",
      "trip.haifa.tag":"Cessna 172 · Couple's Outing","trip.haifa.h":"A Day in Haifa","trip.haifa.p":"Depart Herzliya for Haifa along the coastline and the green slopes of the Carmel — about 25 minutes each way. Land at the airfield and head down for a couple's outing: the Baha'i Gardens, the Talpiot Market, or the Carmel beach — your choice, two to three hours. Board again and fly back to Herzliya.","trip.haifa.ground":"2–3 hours","trip.haifa.price":"Estimated price: ₪1,770–1,830",
      "trip.roshpina.tag":"Cessna 172 · Galilee Outing","trip.roshpina.h":"A Day in Rosh Pina & the Galilee","trip.roshpina.p":"Fly north over the Jordan Valley and the Sea of Galilee to Rosh Pina — about 45 minutes each way. Land at the historic airfield and head out: the old artist colony's alleys and galleries, a boutique winery in the Golan, or a short boat ride on the Kinneret — three to four hours, your choice. Return to the airfield and fly back to Herzliya.","trip.roshpina.ground":"3–4 hours","trip.roshpina.price":"Estimated price: ₪2,660–2,720",
      "trip.masada.tag":"Cessna 172 · Desert & Dead Sea","trip.masada.h":"A Day at Masada & the Dead Sea","trip.masada.p":"Fly south over the Judean Desert to the Masada airstrip — about 35 minutes each way, with an aerial view of the Dead Sea few ever see. Land and take the cable car up to the isolated mountain fortress and its archaeological ruins, then float in the Dead Sea to finish — three to four hours. Board again and fly back to Herzliya.","trip.masada.ground":"3–4 hours","trip.masada.price":"Estimated price: ₪2,240–2,300",
      "trip.note":"Prices are based on a Cessna 172 and reflect flight time plus a ground stopover within the stated range. Flight times are estimates and must be confirmed with the pilot.",
      "policy.eyebrow":"Full Transparency","policy.h2":"Safety & Policy",
      "policy.c1tag":"Weather","policy.c1h":"Full Flexibility","policy.c1p":"Safety comes first. If weather conditions aren't suitable, we'll coordinate an alternative date at no extra cost.",
      "policy.c2tag":"Cancellation","policy.c2h":"Fair Cancellation Policy","policy.c2p":"Cancel up to 48 hours before the flight for a full refund. Shorter-notice cancellations or date changes are reviewed case by case, always in personal coordination with you.",
      "policy.c3tag":"Regulation","policy.c3h":"Operating Responsibly","policy.c3p":"Flight operations are conducted in accordance with Israel Civil Aviation Authority requirements and relevant safety regulations.",
      "policy.note":"<b>Please note:</b> AMIRA AIRLINES is currently in licensing and setup process. Live bookings will be announced on the site and via our contact channels soon.",
      "gallery.eyebrow":"A Glimpse","gallery.h2":"The Sky, From a Different Angle","gallery.c2":"Cabin Interior · Cessna 172","gallery.c4":"Sunset Flight · Cessna 172",
      "faq.eyebrow":"FAQ","faq.h2":"Good to Know",
      "faq.q1":"How is the flight price determined?","faq.a1":"Price is calculated by your selected time in the air, shown to you instantly and transparently in the site's calculator. Final price is confirmed when booking.",
      "faq.q2":"What if the weather isn't suitable on the flight day?","faq.a2":"Safety always comes first. In that case we'll coordinate an alternative date together, at no extra cost.",
      "faq.q3":"How many passengers can fly?","faq.a3":"We fly a Cessna 152 (pilot + 1 passenger) or a Cessna 172 (pilot + up to 3 passengers), based on the passenger count you select in the calculator — the right aircraft and price are set automatically.",
      "faq.q4":"Can I combine several destinations in one flight?","faq.a4":"Absolutely — tell us your idea in the request form and we'll build a custom route together, subject to total flight time.",
      "faq.q5":"Is the company licensed for commercial flights?","faq.a5":"AMIRA AIRLINES is in the process of licensing with the Israel Civil Aviation Authority. Live bookings will be formally announced on the site.",
      "faq.q6":"Can we land and stay at the destination for a while?","faq.a6":"Yes — after choosing a destination, you can add a ground stopover of up to 4 hours, at ₪60 per hour. The stopover length is your choice, and the price updates live in the calculator.",
      "contact.eyebrow":"Let's Begin","contact.h2":"Request a Quote","contact.p":"Fill in your details and we'll get back to you personally to coordinate the flight — no commitment required.",
      "contact.baseVal":"Herzliya Airfield (LLHZ)",
      "form.name":"Full Name","form.phone":"Phone","form.email":"Email","form.date":"Preferred Date","form.pax":"Passengers","form.aircraftChosen":"Aircraft Chosen","form.notes":"Additional Notes","form.notesPh":"Tell us more about the experience you're imagining...","form.priceConfirmLabel":"Estimated price for your selected flight","form.reassure":"No commitment · Free cancellation up to 48 hours before the flight",
      "form.err.name":"Please enter your full name","form.err.phone":"Please enter a valid phone number","form.err.email":"Please enter a valid email address",
      "form.submit":"Send Request","form.successH":"Request Sent Successfully","form.successP":"Thank you! We'll be in touch within 24 hours to coordinate your flight.",
      "a11y.skip":"Skip to main content",
      "notice.bar":"<svg width=\"15\" height=\"15\" viewBox=\"0 0 16 16\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.3\" style=\"vertical-align:-3px;margin-inline-end:6px;\"><circle cx=\"8\" cy=\"8\" r=\"6.4\"/><line x1=\"8\" y1=\"7.2\" x2=\"8\" y2=\"11.2\"/><circle cx=\"8\" cy=\"4.7\" r=\"0.65\" fill=\"currentColor\" stroke=\"none\"/></svg>Site in development — for viewing only · <a href=\"#\" id=\"openTerms\">Terms of Use</a>",
      "footer.nav":"Navigate","footer.legal":"Legal","footer.rights":"© 2026 AMIRA AIRLINES. All rights reserved.","footer.reg":"In licensing process with the Israel Civil Aviation Authority",
      "legal.tabTerms":"Terms of Use","legal.tabPrivacy":"Privacy Policy"
    }
  };

  let currentLang = 'he';
  function applyLang(lang){
    currentLang = lang;
    document.body.classList.toggle('en', lang==='en');
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='he' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(T[lang][key]!==undefined) el.innerHTML = T[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const key = el.getAttribute('data-i18n-placeholder');
      if(T[lang][key]!==undefined) el.setAttribute('placeholder', T[lang][key]);
    });
    document.getElementById('langToggle').textContent = lang==='he' ? 'EN' : 'עב';
    renderDestinations();
    updateSelectedTypeLabel();
    syncNoticeHeight();
    renderReviews();
  }
  document.getElementById('langToggle').addEventListener('click', ()=>applyLang(currentLang==='he'?'en':'he'));

  // ---------------- legal modal ----------------
  const legalModal = document.getElementById('legalModal');
  let legalLastFocus = null;
  function openLegal(tab){
    legalLastFocus = document.activeElement;
    switchLegalTab(tab || 'terms');
    legalModal.classList.add('open');
    legalModal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    legalModal.querySelector('.legal-close').focus();
  }
  function closeLegal(){
    legalModal.classList.remove('open');
    legalModal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    if(legalLastFocus) legalLastFocus.focus();
  }
  function switchLegalTab(tab){
    legalModal.querySelectorAll('.legal-tab-btn').forEach(b=>b.classList.toggle('active', b.getAttribute('data-tab')===tab));
    legalModal.querySelectorAll('.legal-content').forEach(c=>{ c.hidden = c.getAttribute('data-tab-content')!==tab; });
  }
  // Event delegation: #openTerms is recreated whenever the language switches, so we listen on document.
  document.addEventListener('click', (e)=>{
    if(e.target.closest('#openTerms') || e.target.closest('#openTermsFooter')){ e.preventDefault(); openLegal('terms'); }
    if(e.target.closest('#openPrivacy')){ e.preventDefault(); openLegal('privacy'); }
    if(e.target.closest('[data-close]')){ closeLegal(); }
    const tabBtn = e.target.closest('.legal-tab-btn');
    if(tabBtn){ switchLegalTab(tabBtn.getAttribute('data-tab')); }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && legalModal.classList.contains('open')) closeLegal();
  });

  // ---------------- notice bar height sync ----------------
  function syncNoticeHeight(){
    const bar = document.getElementById('noticeBar');
    if(!bar) return;
    document.documentElement.style.setProperty('--notice-h', bar.offsetHeight + 'px');
  }
  window.addEventListener('load', syncNoticeHeight);
  window.addEventListener('resize', syncNoticeHeight);
  window.addEventListener('orientationchange', syncNoticeHeight);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(syncNoticeHeight); }
  // ResizeObserver catches any reflow of the bar itself (font swap, text wrap, zoom) —
  // this is what actually fixes the iOS race condition where content could render
  // before web fonts finished loading, leaving the header offset wrong.
  if('ResizeObserver' in window){
    new ResizeObserver(syncNoticeHeight).observe(document.getElementById('noticeBar'));
  }
  syncNoticeHeight();

  // ---------------- header scroll ----------------
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', ()=>{
    header.classList.toggle('scrolled', window.scrollY > 40);
    backToTop.classList.toggle('show', window.scrollY > 900);
  });

  // ---------------- mobile drawer ----------------
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  menuToggle.addEventListener('click', ()=>{
    const isOpen = mobileDrawer.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  mobileDrawer.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      mobileDrawer.classList.remove('open');
      menuToggle.setAttribute('aria-expanded','false');
    });
  });

  // ---------------- reveal on scroll ----------------
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
    },{threshold:.15});
    revealEls.forEach(el=>io.observe(el));
    // Safety net: if anything is still unrevealed after 4s (unusual layout edge case),
    // show it anyway rather than leaving content permanently invisible.
    setTimeout(()=>{ revealEls.forEach(el=>el.classList.add('in')); }, 4000);
  } else {
    // No IntersectionObserver support at all — just show everything immediately.
    revealEls.forEach(el=>el.classList.add('in'));
  }

  // ---------------- flight type selection ----------------
  const typeNames = { he:{business:'AMIRA Business', wings:'AMIRA Wings', experience:'AMIRA Experience'}, en:{business:'AMIRA Business', wings:'AMIRA Wings', experience:'AMIRA Experience'} };
  let selectedType = 'business';
  function updateSelectedTypeLabel(){
    document.getElementById('selectedTypeLabel').textContent = typeNames[currentLang][selectedType];
  }
  document.querySelectorAll('.type-card').forEach(card=>{
    card.querySelector('.type-select-btn').addEventListener('click', ()=>{
      selectedType = card.getAttribute('data-type');
      document.querySelectorAll('.type-card').forEach(c=>c.classList.remove('active'));
      card.classList.add('active');
      updateSelectedTypeLabel();
      saveSelection();
      const configEl = document.getElementById('configurator');
      const rect = configEl.getBoundingClientRect();
      const alreadyVisible = rect.top >= 0 && rect.top < window.innerHeight * 0.6;
      if(!alreadyVisible) configEl.scrollIntoView({behavior:'smooth'});
    });
  });
  document.querySelector('.type-card[data-type="business"]').classList.add('active');

  // ---------------- destinations & pricing ----------------
  // Rates: Cessna 152 (pilot+1) — 1500 ₪/hr. Cessna 172 (pilot + 1 to 3) — 1650 ₪/hr. Diamond DA42 (future, pilot+3) — 2650 ₪/hr.
  const AIRCRAFT = {
    c152: { name:'Cessna 152', rate:1500, maxPax:1 },
    c172: { name:'Cessna 172', rate:1650, maxPax:3 }
  };
  const STOPOVER_RATE = 60; // ₪ per hour on the ground at the destination
  let selectedAircraft = 'c152';
  function currentRate(){ return AIRCRAFT[selectedAircraft].rate; }
  function currentAircraft(){ return AIRCRAFT[selectedAircraft].name; }
  function currentMaxPax(){ return AIRCRAFT[selectedAircraft].maxPax; }

  // Destinations verified against the CAA (רת"א) AIP list of civil airports and מנחתים.
  // Flight-time minimums are estimates based on straight-line distance from Herzliya at light-aircraft
  // cruise speed — confirm exact times with your flight school before publishing final figures.
  const destinations = [
    { id:'circuit', min:0.5, he:'טיסת סיבוב מקומית', en:'Local Scenic Circuit',
      dhe:'לאורך קו החוף וחזרה להרצליה', den:'Along the coastline, back to Herzliya',
      noteHe:'הכי מומלץ לקראת שקיעה', noteEn:'Best flown toward sunset', noStop:true,
      actsHe:['קו החוף מהרצליה ועד תל אביב-יפו','חורבות קיסריה הרומית מהאוויר','מרינת הרצליה ונמל התעופה מלמעלה','שקיעה מעל הים התיכון'],
      actsEn:['The coastline from Herzliya to Tel Aviv-Jaffa','The Roman ruins of Caesarea from above','Herzliya Marina and the airfield from the air','Sunset over the Mediterranean']
    },
    { id:'megiddo', min:1, he:'מגידו · עמק יזרעאל', en:'Megiddo · Jezreel Valley', field:'מנחת מגידו',
      dhe:'האתר המקראי המפורסם בעולם, מהאוויר', den:'The world-famous biblical site, from above',
      noteHe:'אתר מורשת עולמית של אונסק"ו', noteEn:'A UNESCO World Heritage Site',
      actsHe:['תל מגידו והחפירות הארכיאולוגיות','עמק יזרעאל הפורה מלמעלה','מערכת המים העתיקה של העיר המקראית','נוף פתוח אל הרי הגליל התחתון'],
      actsEn:['Tel Megiddo and its archaeological excavations','The fertile Jezreel Valley from above','The ancient water system of the biblical city','Open views toward the Lower Galilee hills']
    },
    { id:'haifa', min:1.25, he:'חיפה', en:'Haifa', field:'שדה תעופה חיפה',
      dhe:'מפרץ חיפה והכרמל מהאוויר', den:'Haifa Bay and the Carmel from above',
      noteHe:'נוף מרהיב על גני הבאהאים', noteEn:'A stunning view over the Baha\u2019i Gardens',
      actsHe:['גני הבאהאים המדורגים מלמעלה','מפרץ חיפה ונמל הספנות','הר הכרמל וקו החוף הצפוני','המושבה הגרמנית מהאוויר'],
      actsEn:['The terraced Baha\u2019i Gardens from above','Haifa Bay and the shipping port','Mount Carmel and the northern coastline','The German Colony from the air']
    },
    { id:'masada', min:1.5, he:'מצדה · ים המלח', en:'Masada · Dead Sea', field:'מנחת מצדה',
      dhe:'ההר המבודד וים המלח ממעוף הציפור', den:'The isolated mountain and the Dead Sea from above',
      noteHe:'הנקודה הכי נמוכה בעולם — מהאוויר', noteEn:'The lowest point on Earth — from the air',
      actsHe:['מצדה וההר המבודד מעל המדבר','ים המלח והחופים הלבנים','מדבר יהודה ומצוקי הים המלח','ניגודי הצבעים בין המדבר לים'],
      actsEn:['Masada and the isolated mountain over the desert','The Dead Sea and its white shores','The Judean Desert and Dead Sea cliffs','The color contrast between desert and sea']
    },
    { id:'beersheva', min:1.5, he:'באר שבע · הנגב', en:'Beer Sheva · Negev', field:'מנחת באר-שבע',
      dhe:'שער הנגב מהאוויר', den:'The gateway to the Negev from above',
      noteHe:'מומלץ לקראת שקיעה מעל הדיונות', noteEn:'Best toward sunset over the dunes',
      actsHe:['באר שבע והנגב הצפוני מהאוויר','נחל הבשור ונופי הספר המדברי','תצפית מדברית רחבה','שקיעה מעל דיונות הנגב'],
      actsEn:['Beer Sheva and the northern Negev from above','Nahal Besor and the desert frontier landscape','A wide desert vista','Sunset over the Negev dunes']
    },
    { id:'roshpina', min:1.75, he:'ראש פינה · הגליל', en:'Rosh Pina · Galilee', field:'שדה תעופה ראש פינה',
      dhe:'הכנרת, הגולן והגליל העליון', den:'The Sea of Galilee, the Golan and Upper Galilee',
      noteHe:'מומלץ בעונת נדידת הציפורים בחולה', noteEn:'Best during the Hula Valley bird migration season',
      actsHe:['הכנרת בשלמותה מהאוויר','רמות הגולן ויקבי הגליל','המושבה העתיקה ראש פינה','שמורת החולה ונדידת הציפורים'],
      actsEn:['The Sea of Galilee in full view','The Golan Heights and Galilee vineyards','The historic Rosh Pina artist colony','The Hula Valley nature reserve and bird migration']
    },
    { id:'eilat', min:4, he:'אילת · שדה רמון', en:'Eilat · Ramon Airport', field:'שדה תעופה אילן ואסף רמון',
      dhe:'המדבר וים סוף ממעוף הציפור', den:'The desert and the Red Sea from above',
      noteHe:'החוויה הדרמטית ביותר מבין המסלולים', noteEn:'The most dramatic of all our routes',
      actsHe:['מפרץ אילת וים סוף בגוונים טורקיז','הרי אילת והמכתשים מהאוויר','פארק תמנע ועמודי שלמה','שונית האלמוגים מלמעלה'],
      actsEn:['The turquoise waters of the Gulf of Eilat','The Eilat mountains and craters from above','Timna Park and Solomon\u2019s Pillars','The coral reef from the air']
    }
  ];
  let selectedDest = 'circuit'; // default to the local circuit so the detail panel isn't empty on first view
  let stopoverHours = 0;

  function renderDestinations(){
    const wrap = document.getElementById('destArc');
    const dur = parseFloat(document.getElementById('durationSlider').value);
    wrap.innerHTML = '';
    destinations.forEach(d=>{
      const unlocked = dur >= d.min;
      const el = document.createElement('div');
      el.className = 'dest-card ' + (unlocked ? 'unlocked' : 'locked') + (selectedDest===d.id ? ' selected' : '');
      const name = currentLang==='he' ? d.he : d.en;
      const desc = currentLang==='he' ? d.dhe : d.den;
      const minTxt = currentLang==='he' ? `דרוש ${formatDuration(d.min)}` : `Requires ${formatDuration(d.min)}`;
      el.innerHTML = `
        <span class="dcheck">${ICON_CHECK}</span>
        <div class="dname">${!unlocked? `<span class="lock-icon">${ICON_LOCK}</span>`:''}${name}</div>
        <div class="ddesc">${desc}</div>
        <div class="dmin">${minTxt}</div>`;
      el.setAttribute('role', unlocked ? 'button' : 'group');
      el.setAttribute('aria-pressed', String(selectedDest===d.id));
      el.setAttribute('aria-disabled', String(!unlocked));
      el.setAttribute('aria-label', name + (unlocked ? '' : ' - ' + minTxt));
      if(unlocked){
        el.setAttribute('tabindex','0');
        const select = ()=>{
          selectedDest = (selectedDest===d.id) ? null : d.id;
          stopoverHours = 0;
          renderDestinations();
          saveSelection();
        };
        el.addEventListener('click', select);
        el.addEventListener('keydown', (ev)=>{
          if(ev.key==='Enter' || ev.key===' '){ ev.preventDefault(); select(); }
        });
      }
      wrap.appendChild(el);
    });
    renderDestDetails();
    updatePriceDisplay();
  }

  function renderDestDetails(){
    const panel = document.getElementById('destDetails');
    if(!selectedDest){ panel.classList.remove('show'); panel.innerHTML=''; return; }
    const d = destinations.find(x=>x.id===selectedDest);
    if(!d){ panel.classList.remove('show'); return; }
    const name = currentLang==='he' ? d.he : d.en;
    const note = currentLang==='he' ? d.noteHe : d.noteEn;
    const acts = currentLang==='he' ? d.actsHe : d.actsEn;
    const seeLabel = currentLang==='he' ? 'מה תראו מהאוויר' : 'What you\u2019ll see from above';
    let stopoverHtml = '';
    if(!d.noStop){
      const dur = parseFloat(document.getElementById('durationSlider').value);
      const maxStopover = Math.max(1, Math.floor(dur * 2));
      if(stopoverHours > maxStopover) stopoverHours = maxStopover;
      const stopLabel = currentLang==='he' ? 'רוצים לעצור ביעד?' : 'Want to stop at the destination?';
      const stopHint = currentLang==='he' ? `עד פי 2 מזמן הטיסה · ₪${STOPOVER_RATE} לכל שעת עצירה על הקרקע` : `Up to 2x the flight time · ₪${STOPOVER_RATE} per hour on the ground`;
      const noneLabel = currentLang==='he' ? 'ללא עצירה' : 'No stopover';
      const hourLabel = currentLang==='he' ? 'שעה' : 'hour';
      const hoursLabel = currentLang==='he' ? 'שעות' : 'hours';
      let options = `<option value="0" ${stopoverHours===0?'selected':''}>${noneLabel}</option>`;
      for(let h=1; h<=maxStopover; h++){
        options += `<option value="${h}" ${stopoverHours===h?'selected':''}>${h} ${h===1?hourLabel:hoursLabel}</option>`;
      }
      stopoverHtml = `
        <div class="dd-stopover">
          <div class="dd-stopover-row">
            <label for="stopoverSelect">${stopLabel}</label>
            <select id="stopoverSelect">${options}</select>
          </div>
          <span class="dd-stopover-hint">${stopHint}</span>
        </div>`;
    } else {
      const noStopNote = currentLang==='he' ? 'מסלול זה ממריא ונוחת בהרצליה ללא נחיתת ביניים, ולכן אינו כולל עצירה.' : 'This route takes off and lands in Herzliya with no intermediate landing, so a stopover doesn\u2019t apply.';
      stopoverHtml = `<div class="dd-stopover"><span class="dd-stopover-hint">${noStopNote}</span></div>`;
    }
    panel.innerHTML = `
      <div class="dd-head">
        <h4>${name}</h4>
        <span class="dd-note">${note}</span>
      </div>
      <div class="dd-label">${seeLabel}</div>
      <ul class="dd-list">${acts.map(a=>`<li>${a}</li>`).join('')}</ul>
      ${stopoverHtml}`;
    panel.classList.add('show');
    const sel = document.getElementById('stopoverSelect');
    if(sel){
      sel.addEventListener('change', (e)=>{
        stopoverHours = parseFloat(e.target.value);
        updatePriceDisplay();
        saveSelection();
      });
    }
  }

  function formatDuration(h){
    const hrs = Math.floor(h);
    const mins = Math.round((h-hrs)*60);
    const hrsLbl = currentLang==='he' ? 'שעות' : 'hrs';
    const minLbl = currentLang==='he' ? 'דק׳' : 'min';
    if(mins===0) return `${hrs} ${hrsLbl}`;
    return `${hrs}:${mins.toString().padStart(2,'0')} ${hrsLbl}`;
  }

  let displayedPrice = 0;
  function animatePrice(target){
    const start = displayedPrice;
    const diff = target - start;
    if(diff===0) return;
    const duration = 350;
    const startTime = performance.now();
    function tick(now){
      const t = Math.min(1, (now-startTime)/duration);
      const eased = 1 - Math.pow(1-t, 3);
      const val = Math.round(start + diff*eased);
      document.getElementById('priceNum').textContent = '₪' + val.toLocaleString();
      if(t<1) requestAnimationFrame(tick); else displayedPrice = target;
    }
    requestAnimationFrame(tick);
  }

  function computeTotalPrice(){
    const dur = parseFloat(document.getElementById('durationSlider').value);
    const flightCost = Math.round(dur * currentRate() / 10) * 10;
    const stopoverCost = stopoverHours * STOPOVER_RATE;
    return { flightCost, stopoverCost, total: flightCost + stopoverCost };
  }

  function updatePriceDisplay(){
    const { flightCost, stopoverCost, total } = computeTotalPrice();
    animatePrice(total);
    const breakdownEl = document.getElementById('priceBreakdown');
    if(stopoverCost > 0){
      const flightLbl = currentLang==='he' ? 'טיסה' : 'Flight';
      const stopLbl = currentLang==='he' ? 'עצירה ביעד' : 'Stopover';
      breakdownEl.innerHTML = `${flightLbl} ₪${flightCost.toLocaleString()} + ${stopLbl} ₪${stopoverCost.toLocaleString()}`;
      breakdownEl.classList.add('show');
    } else {
      breakdownEl.classList.remove('show');
      breakdownEl.innerHTML = '';
    }
    const formPriceEl = document.getElementById('formPriceValue');
    if(formPriceEl) formPriceEl.textContent = '₪' + total.toLocaleString();
  }

  const aircraftGrid = document.getElementById('aircraftGrid');
  function syncAircraftDisplay(){
    const f = document.getElementById('f_aircraft_display');
    if(f) f.value = currentAircraft();
  }
  function refreshPaxOptions(){
    const sel = document.getElementById('f_pax');
    if(!sel) return;
    const max = currentMaxPax();
    const prevValue = sel.value;
    sel.innerHTML = '';
    for(let p=1; p<=max; p++){
      const opt = document.createElement('option');
      opt.value = p;
      opt.textContent = p;
      sel.appendChild(opt);
    }
    sel.value = (prevValue && parseInt(prevValue,10)<=max) ? prevValue : String(max);
    syncAircraftDisplay();
  }
  aircraftGrid.querySelectorAll('.aircraft-card:not(.ac-future)').forEach(card=>{
    card.addEventListener('click', ()=>{
      selectedAircraft = card.getAttribute('data-aircraft');
      aircraftGrid.querySelectorAll('.aircraft-card').forEach(c=>c.classList.toggle('active', c===card));
      updatePriceDisplay();
      saveSelection();
      refreshPaxOptions();
    });
  });

  function updatePriceAndGauge(){
    const slider = document.getElementById('durationSlider');
    const dur = parseFloat(slider.value);
    const hrs = Math.floor(dur);
    const mins = Math.round((dur-hrs)*60);
    const hrsLbl = T[currentLang]['config.hours'];
    const timeStr = mins===0 ? `${hrs}` : `${hrs}:${mins.toString().padStart(2,'0')}`;
    document.getElementById('durationVal').innerHTML = `${timeStr} <span data-i18n="config.hours">${hrsLbl}</span>`;
    const pct = (dur - slider.min) / (slider.max - slider.min) * 100;
    document.getElementById('gaugeFill').style.width = pct + '%';
    // if a selected destination no longer meets minimum, deselect it
    if(selectedDest){
      const d = destinations.find(x=>x.id===selectedDest);
      if(d && dur < d.min) selectedDest = null;
    }
    renderDestinations(); // also calls updatePriceDisplay()
    saveSelection();
  }

  const slider = document.getElementById('durationSlider');
  slider.addEventListener('input', updatePriceAndGauge);

  // build tick marks (every 0.25h from 0.5 to 4 => 15 ticks)
  const ticksWrap = document.getElementById('gaugeTicks');
  const totalTicks = (4.5 - 0.5) / 0.25;
  for(let i=0;i<=totalTicks;i++){
    const s = document.createElement('span');
    const isMajor = (i % 2 === 0);
    s.className = isMajor ? 'major' : '';
    s.style.height = isMajor ? '14px' : '8px';
    ticksWrap.appendChild(s);
  }

  document.getElementById('requestQuoteBtn').addEventListener('click', (e)=>{
    buildSummary();
  });

  function buildSummary(){
    const dur = parseFloat(slider.value);
    const { total } = computeTotalPrice();
    const destObj = destinations.find(d=>d.id===selectedDest);
    const destName = destObj ? (currentLang==='he'?destObj.he:destObj.en) : (currentLang==='he'?'טרם נבחר':'Not selected yet');
    const stopTxt = stopoverHours>0 ? (currentLang==='he'?` (+ ${stopoverHours} ש׳ עצירה ביעד)`:` (+ ${stopoverHours}h stopover)`) : '';
    const paxCount = document.getElementById('f_pax')?.value || currentMaxPax();
    const summary = document.getElementById('formSummary');
    const lines = currentLang==='he' ? [
      `מסלול: ${typeNames.he[selectedType]}`,
      `מטוס: ${currentAircraft()} (${paxCount} נוסעים)`,
      `משך טיסה: ${formatDuration(dur)}`,
      `יעד: ${destName}${stopTxt}`,
      `מחיר משוער: ₪${total.toLocaleString()}`
    ] : [
      `Route: ${typeNames.en[selectedType]}`,
      `Aircraft: ${currentAircraft()} (${paxCount} passengers)`,
      `Duration: ${formatDuration(dur)}`,
      `Destination: ${destName}${stopTxt}`,
      `Estimated price: ₪${total.toLocaleString()}`
    ];
    summary.innerHTML = lines.join('<br>');
    summary.classList.add('show');
  }

  // ---------------- shareable summary text ----------------
  function buildShareText(){
    const dur = parseFloat(slider.value);
    const { total } = computeTotalPrice();
    const destObj = destinations.find(d=>d.id===selectedDest);
    const destName = destObj ? (currentLang==='he'?destObj.he:destObj.en) : null;
    const stopTxt = stopoverHours>0 ? (currentLang==='he'?` + ${stopoverHours} ש׳ עצירה`:` + ${stopoverHours}h stopover`) : '';
    if(currentLang==='he'){
      return `היי! מתעניין/ת בטיסה עם AMIRA AIRLINES ✈️\nמסלול: ${typeNames.he[selectedType]}\nמטוס: ${currentAircraft()}\nמשך טיסה: ${formatDuration(dur)}${destName? `\nיעד: ${destName}${stopTxt}`:''}\nמחיר משוער: ₪${total.toLocaleString()}`;
    }
    return `Hi! Interested in a flight with AMIRA AIRLINES ✈️\nRoute: ${typeNames.en[selectedType]}\nAircraft: ${currentAircraft()}\nDuration: ${formatDuration(dur)}${destName? `\nDestination: ${destName}${stopTxt}`:''}\nEstimated price: ₪${total.toLocaleString()}`;
  }

  document.getElementById('shareBtn').addEventListener('click', async ()=>{
    const text = buildShareText();
    if(navigator.share){
      try{ await navigator.share({ title:'AMIRA AIRLINES', text }); return; }catch(err){ /* user cancelled or unsupported, fall through */ }
    }
    try{
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById('shareBtn');
      const original = btn.textContent;
      btn.textContent = currentLang==='he' ? 'הועתק!' : 'Copied!';
      setTimeout(()=>{ btn.textContent = original; }, 1800);
    }catch(err){ /* clipboard unavailable, silently no-op */ }
  });

  // ---------------- save / restore selection ----------------
  const STORAGE_KEY = 'amira_flight_selection';
  function saveSelection(){
    try{
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ type:selectedType, duration:slider.value, dest:selectedDest, aircraft:selectedAircraft, stopover:stopoverHours }));
      const note = document.getElementById('savedNote');
      note.textContent = T[currentLang]['config.saved'];
      note.style.display = 'block';
    }catch(err){ /* localStorage unavailable, fail silently */ }
  }
  function restoreSelection(){
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(!raw) return;
      const saved = JSON.parse(raw);
      if(saved.type){
        selectedType = saved.type;
        document.querySelectorAll('.type-card').forEach(c=>c.classList.toggle('active', c.getAttribute('data-type')===selectedType));
      }
      if(saved.duration){ slider.value = saved.duration; }
      if(saved.dest){ selectedDest = saved.dest; }
      if(saved.aircraft && AIRCRAFT[saved.aircraft]){
        selectedAircraft = saved.aircraft;
        aircraftGrid.querySelectorAll('.aircraft-card').forEach(c=>c.classList.toggle('active', c.getAttribute('data-aircraft')===selectedAircraft));
      }
      if(saved.stopover){ stopoverHours = saved.stopover; }
    }catch(err){ /* ignore corrupt data */ }
  }

  // ---------------- FAQ accordion ----------------
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', ()=>{
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i=>{ i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight=null; });
      if(!isOpen){ item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
    });
  });

  // ---------------- lead form ----------------
  function validateField(input, testFn){
    const field = input.closest('.field');
    const errEl = field.querySelector('.error-msg');
    const valid = testFn(input.value.trim());
    input.classList.toggle('invalid', !valid);
    if(errEl) errEl.classList.toggle('show', !valid);
    return valid;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const f_name = document.getElementById('f_name');
  const f_phone = document.getElementById('f_phone');
  const f_email = document.getElementById('f_email');
  [f_name, f_phone, f_email].forEach(inp=>{
    inp.addEventListener('blur', ()=>runValidation(inp));
  });
  function runValidation(inp){
    if(inp===f_name) return validateField(f_name, v=>v.length>1);
    if(inp===f_phone) return validateField(f_phone, v=>v.replace(/\D/g,'').length>=9);
    if(inp===f_email) return validateField(f_email, v=>emailPattern.test(v));
  }

  // ---------------- real form submission ----------------
  // 1. Go to https://formspree.io , sign up free, create a form, and copy your endpoint URL.
  // 2. Paste it below instead of the placeholder. That's it — submissions will arrive by email.
  const FORM_ENDPOINT = 'https://formspree.io/f/mpqvyyal';
  const CONTACT_EMAIL = 'eladamira1305@gmail.com';

  document.getElementById('leadForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const validName = runValidation(f_name);
    const validPhone = runValidation(f_phone);
    const validEmail = runValidation(f_email);
    if(!validName || !validPhone || !validEmail){
      document.querySelector('.field .invalid')?.closest('.field').querySelector('input').focus();
      return;
    }

    const dur = parseFloat(slider.value);
    const { flightCost, stopoverCost, total } = computeTotalPrice();
    const destObj = destinations.find(d=>d.id===selectedDest);
    const payload = {
      name: f_name.value.trim(),
      phone: f_phone.value.trim(),
      email: f_email.value.trim(),
      preferred_date: document.getElementById('f_date').value,
      passengers_aircraft: `${currentAircraft()} \u00b7 ${document.getElementById('f_pax').value} passengers`,
      notes: document.getElementById('f_notes').value.trim(),
      flight_type: typeNames[currentLang][selectedType],
      duration: formatDuration(dur),
      destination: destObj ? (currentLang==='he'?destObj.he:destObj.en) : '—',
      stopover: stopoverCost>0 ? `${stopoverHours}h (+₪${stopoverCost})` : (currentLang==='he'?'ללא':'None'),
      flight_cost: '\u20aa' + flightCost.toLocaleString(),
      estimated_price: '\u20aa' + total.toLocaleString(),
      _subject: `בקשת טיסה חדשה — ${f_name.value.trim()}`
    };

    const submitBtn = document.querySelector('.submit-btn');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = currentLang==='he' ? 'שולח...' : 'Sending...';
    submitBtn.disabled = true;

    let success = false;
    if(!FORM_ENDPOINT.includes('YOUR_FORM_ID')){
      try{
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type':'application/json', 'Accept':'application/json' },
          body: JSON.stringify(payload)
        });
        success = res.ok;
      }catch(err){ success = false; }
    }

    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
    buildSummary();

    if(success){
      document.getElementById('formFields').style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
      document.getElementById('formSummary').classList.add('show');
    } else {
      showSubmitFallback(payload);
    }
  });

  function showSubmitFallback(payload){
    const box = document.getElementById('formFallback');
    const lines = Object.entries(payload).filter(([k])=>k!=='_subject')
      .map(([k,v])=>`${k}: ${v}`).join('%0D%0A');
    const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload._subject)}&body=${lines}`;
    box.innerHTML = currentLang==='he'
      ? `<p>לא הצלחנו לשלוח את הבקשה אוטומטית. שלחו לנו ישירות:</p>
         <div class="fallback-links"><a href="${mailHref}" class="btn btn-ghost btn-sm">שליחה במייל</a></div>`
      : `<p>We couldn't send the request automatically. Please reach us directly:</p>
         <div class="fallback-links"><a href="${mailHref}" class="btn btn-ghost btn-sm">Send by Email</a></div>`;
    box.classList.add('show');
  }

  // ---------------- reviews & ratings ----------------
  // 🔒 Publishing/removing reviews happens ONLY here, in the code — there is no public delete
  // button, by design, since a static site has no secure way to offer one. Add an object per
  // approved review: { name:'דנה כהן', rating:5, text:'חוויה מדהימה, ממליצה בחום!' }
  const FEATURED_REVIEWS = [
    // { name:'', rating:5, text:'' },
  ];

  function renderReviews(){
    const grid = document.getElementById('reviewsGrid');
    if(FEATURED_REVIEWS.length===0){
      const msg = currentLang==='he' ? 'עדיין אין ביקורות כאן — היו הראשונים לשתף את החוויה שלכם.' : 'No reviews here yet — be the first to share your experience.';
      grid.innerHTML = `<div class="reviews-empty"><p>${msg}</p></div>`;
      return;
    }
    grid.innerHTML = FEATURED_REVIEWS.map(r=>{
      const stars = Array.from({length:5}, (_,i)=>`<span style="opacity:${i<r.rating?1:0.25}">${ICON_STAR}</span>`).join('');
      return `<div class="review-card"><div class="review-stars">${stars}</div><p class="review-text">${r.text}</p><div class="review-name">${r.name}</div></div>`;
    }).join('');
  }

  let selectedRating = 0;
  const starInput = document.getElementById('starInput');
  for(let i=1; i<=5; i++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-star', i);
    btn.setAttribute('aria-label', String(i));
    btn.innerHTML = ICON_STAR;
    starInput.appendChild(btn);
  }
  function paintStars(n){
    starInput.querySelectorAll('button').forEach(b=>{
      b.classList.toggle('filled', parseInt(b.getAttribute('data-star'),10)<=n);
    });
  }
  starInput.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('mouseenter', ()=>paintStars(parseInt(btn.getAttribute('data-star'),10)));
    btn.addEventListener('click', ()=>{
      selectedRating = parseInt(btn.getAttribute('data-star'),10);
      document.getElementById('starError').classList.remove('show');
    });
  });
  starInput.addEventListener('mouseleave', ()=>paintStars(selectedRating));

  const r_name = document.getElementById('r_name');
  const r_text = document.getElementById('r_text');
  document.getElementById('reviewForm').addEventListener('submit', async function(e){
    e.preventDefault();
    const validName = validateField(r_name, v=>v.length>1);
    const validText = validateField(r_text, v=>v.length>4);
    const validRating = selectedRating>0;
    document.getElementById('starError').classList.toggle('show', !validRating);
    if(!validName || !validText || !validRating){
      if(!validName) r_name.focus(); else if(!validRating) starInput.focus(); else r_text.focus();
      return;
    }
    const payload = {
      name: r_name.value.trim(),
      rating: `${selectedRating}/5`,
      review: r_text.value.trim(),
      _subject: `ביקורת חדשה באתר — ${r_name.value.trim()} (${selectedRating}/5)`
    };
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = currentLang==='he' ? 'שולח...' : 'Sending...';
    submitBtn.disabled = true;
    let success = false;
    if(!FORM_ENDPOINT.includes('YOUR_FORM_ID')){
      try{
        const res = await fetch(FORM_ENDPOINT, {
          method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(payload)
        });
        success = res.ok;
      }catch(err){ success = false; }
    }
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
    if(success){
      e.target.style.display = 'none';
      document.getElementById('reviewSuccess').classList.add('show');
    } else {
      const box = document.getElementById('reviewFallback');
      const mailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(payload.review)}`;
      box.innerHTML = currentLang==='he'
        ? `<p>לא הצלחנו לשלוח את הביקורת אוטומטית. שלחו לנו אותה ישירות:</p><div class="fallback-links"><a href="${mailHref}" class="btn btn-ghost btn-sm">שליחה במייל</a></div>`
        : `<p>We couldn't send the review automatically. Please send it to us directly:</p><div class="fallback-links"><a href="${mailHref}" class="btn btn-ghost btn-sm">Send by Email</a></div>`;
      box.classList.add('show');
    }
  });

  // ---------------- init ----------------
  restoreSelection();
  refreshPaxOptions();
  updateSelectedTypeLabel();
  updatePriceAndGauge();
  applyLang('he');
})();
