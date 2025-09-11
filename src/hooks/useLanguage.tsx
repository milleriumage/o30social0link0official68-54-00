import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'it' | 'fr' | 'de' | 'nl' | 'sv' | 'no';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Landing Page Translations
  'landing.title': {
    pt: 'Social Link',
    en: 'Social Link',
    es: 'Social Link',
    it: 'Social Link',
    fr: 'Social Link',
    de: 'Social Link',
    nl: 'Social Link',
    sv: 'Social Link',
    no: 'Social Link'
  },
  'landing.subtitle': {
    pt: 'A nova vitrine digital com chat integrado',
    en: 'The new digital showcase with integrated chat',
    es: 'La nueva vitrina digital con chat integrado',
    it: 'La nuova vetrina digitale con chat integrata',
    fr: 'La nouvelle vitrine numérique avec chat intégré',
    de: 'Das neue digitale Schaufenster mit integriertem Chat',
    nl: 'De nieuwe digitale etalage met geïntegreerde chat',
    sv: 'Det nya digitala skyltfönstret med integrerad chat',
    no: 'Det nye digitale utstillingsvinduet med integrert chat'
  },
  'landing.description': {
    pt: 'Transforme o tradicional "link na bio" em uma vitrine interativa. Exiba conteúdos, receba pagamentos e converse com seus fãs em tempo real.',
    en: 'Transform the traditional "link in bio" into an interactive showcase. Display content, receive payments and chat with your fans in real time.',
    es: 'Transforma el tradicional "link en bio" en una vitrina interactiva. Muestra contenido, recibe pagos y conversa con tus fans en tiempo real.',
    it: 'Trasforma il tradizionale "link in bio" in una vetrina interattiva. Mostra contenuti, ricevi pagamenti e chatta con i tuoi fan in tempo reale.',
    fr: 'Transformez le traditionnel "lien en bio" en une vitrine interactive. Affichez du contenu, recevez des paiements et discutez avec vos fans en temps réel.',
    de: 'Verwandeln Sie den traditionellen "Link in der Bio" in ein interaktives Schaufenster. Zeigen Sie Inhalte, erhalten Sie Zahlungen und chatten Sie in Echtzeit mit Ihren Fans.',
    nl: 'Transformeer de traditionele "link in bio" naar een interactieve etalage. Toon inhoud, ontvang betalingen en chat in realtime met je fans.',
    sv: 'Förvandla den traditionella "länken i bio" till ett interaktivt skyltfönster. Visa innehåll, ta emot betalningar och chatta med dina fans i realtid.',
    no: 'Transformer den tradisjonelle "lenke i bio" til et interaktivt utstillingsvindu. Vis innhold, motta betalinger og chat med fansene dine i sanntid.'
  },
  'landing.features.title': {
    pt: '🔑 Principais diferenciais',
    en: '🔑 Key differentials',
    es: '🔑 Principales diferenciales',
    it: '🔑 Principali differenze',
    fr: '🔑 Principales différences',
    de: '🔑 Hauptunterschiede',
    nl: '🔑 Belangrijkste verschillen',
    sv: '🔑 Viktiga skillnader',
    no: '🔑 Viktige forskjeller'
  },
  'landing.features.subtitle': {
    pt: 'Muito mais que um simples "link na bio"',
    en: 'Much more than a simple "link in bio"',
    es: 'Mucho más que un simple "link en bio"',
    it: 'Molto più di un semplice "link in bio"',
    fr: 'Bien plus qu\'un simple "lien en bio"',
    de: 'Viel mehr als ein einfacher "Link in der Bio"',
    nl: 'Veel meer dan een simpele "link in bio"',
    sv: 'Mycket mer än en enkel "länk i bio"',
    no: 'Mye mer enn en enkel "lenke i bio"'
  },
  'landing.feature.chat.title': {
    pt: 'Chat integrado',
    en: 'Integrated chat',
    es: 'Chat integrado',
    it: 'Chat integrata',
    fr: 'Chat intégré',
    de: 'Integrierter Chat',
    nl: 'Geïntegreerde chat',
    sv: 'Integrerad chat',
    no: 'Integrert chat'
  },
  'landing.feature.chat.description': {
    pt: 'Seus fãs não só clicam — eles conversam com você. Essa interação direta gera confiança e engajamento imediato.',
    en: 'Your fans don\'t just click — they talk to you. This direct interaction generates trust and immediate engagement.',
    es: 'Tus fans no solo hacen clic — conversan contigo. Esta interacción directa genera confianza y engagement inmediato.',
    it: 'I tuoi fan non si limitano a cliccare — parlano con te. Questa interazione diretta genera fiducia e coinvolgimento immediato.',
    fr: 'Vos fans ne font pas que cliquer — ils vous parlent. Cette interaction directe génère confiance et engagement immédiat.',
    de: 'Ihre Fans klicken nicht nur — sie sprechen mit Ihnen. Diese direkte Interaktion schafft Vertrauen und sofortiges Engagement.',
    nl: 'Je fans klikken niet alleen — ze praten met je. Deze directe interactie genereert vertrouwen en onmiddellijke betrokkenheid.',
    sv: 'Dina fans klickar inte bara — de pratar med dig. Denna direkta interaktion skapar förtroende och omedelbar engagemang.',
    no: 'Fansene dine klikker ikke bare — de snakker med deg. Denne direkte interaksjonen skaper tillit og umiddelbar engasjement.'
  },
  'landing.feature.payment.title': {
    pt: 'Links de pagamento',
    en: 'Payment links',
    es: 'Enlaces de pago',
    it: 'Link di pagamento',
    fr: 'Liens de paiement',
    de: 'Zahlungslinks',
    nl: 'Betalingslinks',
    sv: 'Betalningslänkar',
    no: 'Betalingslenker'
  },
  'landing.feature.payment.description': {
    pt: 'Adicione botões de compra e receba pagamentos de forma simples e rápida.',
    en: 'Add purchase buttons and receive payments simply and quickly.',
    es: 'Añade botones de compra y recibe pagos de forma simple y rápida.',
    it: 'Aggiungi pulsanti di acquisto e ricevi pagamenti in modo semplice e veloce.',
    fr: 'Ajoutez des boutons d\'achat et recevez des paiements de manière simple et rapide.',
    de: 'Fügen Sie Kaufschaltflächen hinzu und erhalten Sie Zahlungen einfach und schnell.',
    nl: 'Voeg aankoopknoppen toe en ontvang betalingen eenvoudig en snel.',
    sv: 'Lägg till köpknappar och ta emot betalningar enkelt och snabbt.',
    no: 'Legg til kjøpsknapper og motta betalinger enkelt og raskt.'
  },
  'landing.demo': {
    pt: 'Ver Demonstração',
    en: 'View Demo',
    es: 'Ver Demostración',
    it: 'Vedi Demo',
    fr: 'Voir Démo',
    de: 'Demo Ansehen',
    nl: 'Bekijk Demo',
    sv: 'Se Demo',
    no: 'Se Demo'
  },
  'landing.cta.createAccount': {
    pt: 'Criar Conta Grátis',
    en: 'Create Free Account',
    es: 'Crear Cuenta Gratis',
    it: 'Crea Account Gratuito',
    fr: 'Créer un Compte Gratuit',
    de: 'Kostenloses Konto Erstellen',
    nl: 'Gratis Account Aanmaken',
    sv: 'Skapa Gratis Konto',
    no: 'Opprett Gratis Konto'
  },
  // Auth Dialog
  'auth.welcome': {
    pt: 'Bem-vindo!',
    en: 'Welcome!',
    es: '¡Bienvenido!',
    it: 'Benvenuto!',
    fr: 'Bienvenue!',
    de: 'Willkommen!',
    nl: 'Welkom!',
    sv: 'Välkommen!',
    no: 'Velkommen!'
  },
  'auth.createAccountMessage': {
    pt: 'Crie sua conta para começar',
    en: 'Create your account to get started',
    es: 'Crea tu cuenta para empezar',
    it: 'Crea il tuo account per iniziare',
    fr: 'Créez votre compte pour commencer',
    de: 'Erstellen Sie Ihr Konto, um loszulegen',
    nl: 'Maak je account aan om te beginnen',
    sv: 'Skapa ditt konto för att komma igång',
    no: 'Opprett din konto for å komme i gang'
  },
  'auth.loginMessage': {
    pt: 'Faça login para continuar',
    en: 'Log in to continue',
    es: 'Inicia sesión para continuar',
    it: 'Accedi per continuare',
    fr: 'Connectez-vous pour continuer',
    de: 'Melden Sie sich an, um fortzufahren',
    nl: 'Log in om door te gaan',
    sv: 'Logga in för att fortsätta',
    no: 'Logg inn for å fortsette'
  },
  'auth.emailPlaceholder': {
    pt: 'Seu e-mail',
    en: 'Your email',
    es: 'Tu email',
    it: 'La tua email',
    fr: 'Votre email',
    de: 'Ihre E-Mail',
    nl: 'Je email',
    sv: 'Din email',
    no: 'Din e-post'
  },
  'auth.passwordPlaceholder': {
    pt: 'Sua senha',
    en: 'Your password',
    es: 'Tu contraseña',
    it: 'La tua password',
    fr: 'Votre mot de passe',
    de: 'Ihr Passwort',
    nl: 'Je wachtwoord',
    sv: 'Ditt lösenord',
    no: 'Ditt passord'
  },
  'auth.confirmPasswordPlaceholder': {
    pt: 'Confirme sua senha',
    en: 'Confirm your password',
    es: 'Confirma tu contraseña',
    it: 'Conferma la tua password',
    fr: 'Confirmez votre mot de passe',
    de: 'Bestätigen Sie Ihr Passwort',
    nl: 'Bevestig je wachtwoord',
    sv: 'Bekräfta ditt lösenord',
    no: 'Bekreft ditt passord'
  },
  'auth.processing': {
    pt: 'Processando...',
    en: 'Processing...',
    es: 'Procesando...',
    it: 'Elaborazione...',
    fr: 'Traitement...',
    de: 'Verarbeitung...',
    nl: 'Verwerking...',
    sv: 'Bearbetar...',
    no: 'Behandler...'
  },
  'auth.createAccount': {
    pt: 'Criar Conta',
    en: 'Create Account',
    es: 'Crear Cuenta',
    it: 'Crea Account',
    fr: 'Créer un Compte',
    de: 'Konto Erstellen',
    nl: 'Account Aanmaken',
    sv: 'Skapa Konto',
    no: 'Opprett Konto'
  },
  'auth.signIn': {
    pt: 'Entrar',
    en: 'Sign In',
    es: 'Iniciar Sesión',
    it: 'Accedi',
    fr: 'Se Connecter',
    de: 'Anmelden',
    nl: 'Inloggen',
    sv: 'Logga In',
    no: 'Logg Inn'
  },
  'auth.or': {
    pt: 'ou',
    en: 'or',
    es: 'o',
    it: 'o',
    fr: 'ou',
    de: 'oder',
    nl: 'of',
    sv: 'eller',
    no: 'eller'
  },
  'auth.withGoogle': {
    pt: 'com Google',
    en: 'with Google',
    es: 'con Google',
    it: 'con Google',
    fr: 'avec Google',
    de: 'mit Google',
    nl: 'met Google',
    sv: 'med Google',
    no: 'med Google'
  },
  'auth.signingIn': {
    pt: 'Entrando...',
    en: 'Signing in...',
    es: 'Iniciando sesión...',
    it: 'Accesso...',
    fr: 'Connexion...',
    de: 'Anmeldung...',
    nl: 'Inloggen...',
    sv: 'Loggar in...',
    no: 'Logger inn...'
  },
  'auth.alreadyHaveAccount': {
    pt: 'Já tem uma conta?',
    en: 'Already have an account?',
    es: '¿Ya tienes una cuenta?',
    it: 'Hai già un account?',
    fr: 'Vous avez déjà un compte?',
    de: 'Haben Sie bereits ein Konto?',
    nl: 'Heb je al een account?',
    sv: 'Har du redan ett konto?',
    no: 'Har du allerede en konto?'
  },
  'auth.noAccount': {
    pt: 'Não tem uma conta?',
    en: 'Don\'t have an account?',
    es: '¿No tienes una cuenta?',
    it: 'Non hai un account?',
    fr: 'Vous n\'avez pas de compte?',
    de: 'Haben Sie kein Konto?',
    nl: 'Heb je geen account?',
    sv: 'Har du inget konto?',
    no: 'Har du ikke en konto?'
  },
  'auth.forgotPassword': {
    pt: 'Esqueceu a senha?',
    en: 'Forgot password?',
    es: '¿Olvidaste la contraseña?',
    it: 'Hai dimenticato la password?',
    fr: 'Mot de passe oublié?',
    de: 'Passwort vergessen?',
    nl: 'Wachtwoord vergeten?',
    sv: 'Glömt lösenord?',
    no: 'Glemt passord?'
  },
  // Main interface
  'main.defaultButtonText': {
    pt: 'get cake 🍰',
    en: 'get cake 🍰',
    es: 'obtener pastel 🍰',
    it: 'prendi torta 🍰',
    fr: 'obtenir gâteau 🍰',
    de: 'Kuchen holen 🍰',
    nl: 'taart krijgen 🍰',
    sv: 'få tårta 🍰',
    no: 'få kake 🍰'
  },
  // IPage specific translations
  'ipage.landingTitle': {
    pt: 'Social Link',
    en: 'Social Link',
    es: 'Social Link',
    it: 'Social Link',
    fr: 'Social Link',
    de: 'Social Link',
    nl: 'Social Link',
    sv: 'Social Link',
    no: 'Social Link'
  },
  'ipage.landingSubtitle': {
    pt: 'A nova vitrine digital com chat integrado',
    en: 'The new digital showcase with integrated chat',
    es: 'La nueva vitrina digital con chat integrado',
    it: 'La nuova vetrina digitale con chat integrata',
    fr: 'La nouvelle vitrine numérique avec chat intégré',
    de: 'Das neue digitale Schaufenster mit integriertem Chat',
    nl: 'De nieuwe digitale etalage met geïntegreerde chat',
    sv: 'Det nya digitala skyltfönstret med integrerad chat',
    no: 'Det nye digitale utstillingsvinduet med integrert chat'
  },
  'ipage.featuresTitle': {
    pt: '🔑 Principais diferenciais',
    en: '🔑 Key differentials',
    es: '🔑 Principales diferenciales',
    it: '🔑 Principali differenze',
    fr: '🔑 Principales différences',
    de: '🔑 Hauptunterschiede',
    nl: '🔑 Belangrijkste verschillen',
    sv: '🔑 Viktiga skillnader',
    no: '🔑 Viktige forskjeller'
  },
  'ipage.feature1Title': {
    pt: 'Chat integrado',
    en: 'Integrated chat',
    es: 'Chat integrado',
    it: 'Chat integrata',
    fr: 'Chat intégré',
    de: 'Integrierter Chat',
    nl: 'Geïntegreerde chat',
    sv: 'Integrerad chat',
    no: 'Integrert chat'
  },
  'ipage.feature1Description': {
    pt: 'Seus fãs não só clicam — eles conversam com você.',
    en: 'Your fans don\'t just click — they talk to you.',
    es: 'Tus fans no solo hacen clic — conversan contigo.',
    it: 'I tuoi fan non si limitano a cliccare — parlano con te.',
    fr: 'Vos fans ne font pas que cliquer — ils vous parlent.',
    de: 'Ihre Fans klicken nicht nur — sie sprechen mit Ihnen.',
    nl: 'Je fans klikken niet alleen — ze praten met je.',
    sv: 'Dina fans klickar inte bara — de pratar med dig.',
    no: 'Fansene dine klikker ikke bare — de snakker med deg.'
  },
  'ipage.feature2Title': {
    pt: 'Links de pagamento',
    en: 'Payment links',
    es: 'Enlaces de pago',
    it: 'Link di pagamento',
    fr: 'Liens de paiement',
    de: 'Zahlungslinks',
    nl: 'Betalingslinks',
    sv: 'Betalningslänkar',
    no: 'Betalingslenker'
  },
  'ipage.feature2Description': {
    pt: 'Receba pagamentos de forma simples e rápida.',
    en: 'Receive payments simply and quickly.',
    es: 'Recibe pagos de forma simple y rápida.',
    it: 'Ricevi pagamenti in modo semplice e veloce.',
    fr: 'Recevez des paiements de manière simple et rapide.',
    de: 'Erhalten Sie Zahlungen einfach und schnell.',
    nl: 'Ontvang betalingen eenvoudig en snel.',
    sv: 'Ta emot betalningar enkelt och snabbt.',
    no: 'Motta betalinger enkelt og raskt.'
  },
  'ipage.feature3Title': {
    pt: 'Vitrine interativa',
    en: 'Interactive showcase',
    es: 'Vitrina interactiva',
    it: 'Vetrina interattiva',
    fr: 'Vitrine interactive',
    de: 'Interaktives Schaufenster',
    nl: 'Interactieve etalage',
    sv: 'Interaktivt skyltfönster',
    no: 'Interaktivt utstillingsvindu'
  },
  'ipage.feature3Description': {
    pt: 'Muito mais que um simples "link na bio".',
    en: 'Much more than a simple "link in bio".',
    es: 'Mucho más que un simple "link en bio".',
    it: 'Molto più di un semplice "link in bio".',
    fr: 'Bien plus qu\'un simple "lien en bio".',
    de: 'Viel mehr als ein einfacher "Link in der Bio".',
    nl: 'Veel meer dan een simpele "link in bio".',
    sv: 'Mycket mer än en enkel "länk i bio".',
    no: 'Mye mer enn en enkel "lenke i bio".'
  },
  'ipage.testimonialsTitle': {
    pt: '💬 O que nossos usuários dizem',
    en: '💬 What our users say',
    es: '💬 Lo que dicen nuestros usuarios',
    it: '💬 Cosa dicono i nostri utenti',
    fr: '💬 Ce que disent nos utilisateurs',
    de: '💬 Was unsere Nutzer sagen',
    nl: '💬 Wat onze gebruikers zeggen',
    sv: '💬 Vad våra användare säger',
    no: '💬 Hva våre brukere sier'
  },
  'ipage.testimonial1': {
    pt: '"Minha renda dobrou desde que comecei a usar o Social Link!"',
    en: '"My income doubled since I started using Social Link!"',
    es: '"¡Mis ingresos se duplicaron desde que empecé a usar Social Link!"',
    it: '"Il mio reddito è raddoppiato da quando ho iniziato a usare Social Link!"',
    fr: '"Mes revenus ont doublé depuis que j\'ai commencé à utiliser Social Link!"',
    de: '"Mein Einkommen hat sich verdoppelt, seit ich Social Link verwende!"',
    nl: '"Mijn inkomen is verdubbeld sinds ik Social Link ben gaan gebruiken!"',
    sv: '"Min inkomst har dubblats sedan jag började använda Social Link!"',
    no: '"Inntekten min har doblet seg siden jeg begynte å bruke Social Link!"'
  },
  'ipage.testimonial2': {
    pt: '"Finalmente posso conversar diretamente com meus seguidores!"',
    en: '"Finally I can talk directly with my followers!"',
    es: '"¡Finalmente puedo hablar directamente con mis seguidores!"',
    it: '"Finalmente posso parlare direttamente con i miei follower!"',
    fr: '"Enfin je peux parler directement avec mes abonnés!"',
    de: '"Endlich kann ich direkt mit meinen Followern sprechen!"',
    nl: '"Eindelijk kan ik direct praten met mijn volgers!"',
    sv: '"Äntligen kan jag prata direkt med mina följare!"',
    no: '"Endelig kan jeg snakke direkte med mine følgere!"'
  },
  'ipage.ctaTitle': {
    pt: '🚀 Comece agora mesmo!',
    en: '🚀 Start right now!',
    es: '🚀 ¡Comienza ahora mismo!',
    it: '🚀 Inizia subito!',
    fr: '🚀 Commencez maintenant!',
    de: '🚀 Jetzt starten!',
    nl: '🚀 Begin nu meteen!',
    sv: '🚀 Börja nu!',
    no: '🚀 Begynn nå!'
  },
  'ipage.ctaDescription': {
    pt: 'Junte-se a milhares de criadores que já transformaram seus perfis',
    en: 'Join thousands of creators who have already transformed their profiles',
    es: 'Únete a miles de creadores que ya han transformado sus perfiles',
    it: 'Unisciti a migliaia di creatori che hanno già trasformato i loro profili',
    fr: 'Rejoignez des milliers de créateurs qui ont déjà transformé leurs profils',
    de: 'Schließen Sie sich Tausenden von Kreativen an, die ihre Profile bereits transformiert haben',
    nl: 'Sluit je aan bij duizenden makers die hun profielen al hebben getransformeerd',
    sv: 'Gå med tusentals skapare som redan har förvandlat sina profiler',
    no: 'Bli med tusenvis av skapere som allerede har transformert profilene sine'
  },
  // Additional IPage sections
  'ipage.exampleTitle': {
    pt: '💬 Exemplo real',
    en: '💬 Real example',
    es: '💬 Ejemplo real',
    it: '💬 Esempio reale',
    fr: '💬 Exemple réel',
    de: '💬 Echtes Beispiel',
    nl: '💬 Echt voorbeeld',
    sv: '💬 Verkligt exempel',
    no: '💬 Virkelig eksempel'
  },
  'ipage.exampleText': {
    pt: '"Com o Social Link consegui ter um chat direto com minha audiência. Eles não apenas compram, mas também conversam comigo sobre os produtos. Isso criou uma conexão muito mais forte e minhas vendas aumentaram 150%!"',
    en: '"With Social Link I managed to have direct chat with my audience. They don\'t just buy, but also talk to me about the products. This created a much stronger connection and my sales increased by 150%!"',
    es: '"¡Con Social Link logré tener un chat directo con mi audiencia. No solo compran, sino que también conversan conmigo sobre los productos. Esto creó una conexión mucho más fuerte y mis ventas aumentaron 150%!"',
    it: '"Con Social Link sono riuscito ad avere una chat diretta con il mio pubblico. Non si limitano ad acquistare, ma mi parlano anche dei prodotti. Questo ha creato una connessione molto più forte e le mie vendite sono aumentate del 150%!"',
    fr: '"Avec Social Link j\'ai réussi à avoir un chat direct avec mon audience. Ils n\'achètent pas seulement, mais me parlent aussi des produits. Cela a créé une connexion beaucoup plus forte et mes ventes ont augmenté de 150%!"',
    de: '"Mit Social Link konnte ich direkten Chat mit meinem Publikum haben. Sie kaufen nicht nur, sondern sprechen auch mit mir über die Produkte. Das schuf eine viel stärkere Verbindung und meine Verkäufe stiegen um 150%!"',
    nl: '"Met Social Link slaagde ik erin directe chat te hebben met mijn publiek. Ze kopen niet alleen, maar praten ook met me over de producten. Dit creëerde een veel sterkere verbinding en mijn verkopen stegen met 150%!"',
    sv: '"Med Social Link lyckades jag ha direkt chat med min publik. De köper inte bara, utan pratar också med mig om produkterna. Detta skapade en mycket starkare koppling och min försäljning ökade med 150%!"',
    no: '"Med Social Link klarte jeg å ha direkte chat med publikum mitt. De kjøper ikke bare, men snakker også med meg om produktene. Dette skapte en mye sterkere forbindelse og salget mitt økte med 150%!"'
  },
  'ipage.testimonialQuote': {
    pt: 'A melhor decisão que tomei para meu negócio digital foi usar o Social Link.',
    en: 'The best decision I made for my digital business was using Social Link.',
    es: 'La mejor decisión que tomé para mi negocio digital fue usar Social Link.',
    it: 'La migliore decisione che ho preso per il mio business digitale è stata usare Social Link.',
    fr: 'La meilleure décision que j\'ai prise pour mon entreprise numérique a été d\'utiliser Social Link.',
    de: 'Die beste Entscheidung, die ich für mein digitales Geschäft getroffen habe, war Social Link zu verwenden.',
    nl: 'De beste beslissing die ik nam voor mijn digitale bedrijf was Social Link gebruiken.',
    sv: 'Det bästa beslutet jag tog för min digitala verksamhet var att använda Social Link.',
    no: 'Den beste beslutningen jeg tok for min digitale virksomhet var å bruke Social Link.'
  },
  'ipage.testimonialAuthor': {
    pt: '— Ana Silva, Criadora de Conteúdo',
    en: '— Ana Silva, Content Creator',
    es: '— Ana Silva, Creadora de Contenido',
    it: '— Ana Silva, Creatrice di Contenuti',
    fr: '— Ana Silva, Créatrice de Contenu',
    de: '— Ana Silva, Content Creator',
    nl: '— Ana Silva, Content Creator',
    sv: '— Ana Silva, Innehållsskapare',
    no: '— Ana Silva, Innholdsskaper'
  },
  'ipage.whyChooseTitle': {
    pt: '🚀 Porque escolher Social Link',
    en: '🚀 Why choose Social Link',
    es: '🚀 Por qué elegir Social Link',
    it: '🚀 Perché scegliere Social Link',
    fr: '🚀 Pourquoi choisir Social Link',
    de: '🚀 Warum Social Link wählen',
    nl: '🚀 Waarom Social Link kiezen',
    sv: '🚀 Varför välja Social Link',
    no: '🚀 Hvorfor velge Social Link'
  },
  'ipage.showcase1': {
    pt: 'Links únicos',
    en: 'Unique links',
    es: 'Enlaces únicos',
    it: 'Link unici',
    fr: 'Liens uniques',
    de: 'Einzigartige Links',
    nl: 'Unieke links',
    sv: 'Unika länkar',
    no: 'Unike lenker'
  },
  'ipage.showcase1Desc': {
    pt: 'Cada link é personalizado para sua marca e audiência.',
    en: 'Each link is customized for your brand and audience.',
    es: 'Cada enlace está personalizado para tu marca y audiencia.',
    it: 'Ogni link è personalizzato per il tuo brand e pubblico.',
    fr: 'Chaque lien est personnalisé pour votre marque et audience.',
    de: 'Jeder Link ist für Ihre Marke und Zielgruppe angepasst.',
    nl: 'Elke link is aangepast voor je merk en publiek.',
    sv: 'Varje länk är anpassad för ditt varumärke och din publik.',
    no: 'Hver lenke er tilpasset for ditt merke og publikum.'
  },
  'ipage.showcase2': {
    pt: 'Chat integrado',
    en: 'Integrated chat',
    es: 'Chat integrado',
    it: 'Chat integrata',
    fr: 'Chat intégré',
    de: 'Integrierter Chat',
    nl: 'Geïntegreerde chat',
    sv: 'Integrerad chat',
    no: 'Integrert chat'
  },
  'ipage.showcase2Desc': {
    pt: 'Fale diretamente com seus fãs e clientes.',
    en: 'Talk directly with your fans and customers.',
    es: 'Habla directamente con tus fans y clientes.',
    it: 'Parla direttamente con i tuoi fan e clienti.',
    fr: 'Parlez directement avec vos fans et clients.',
    de: 'Sprechen Sie direkt mit Ihren Fans und Kunden.',
    nl: 'Praat direct met je fans en klanten.',
    sv: 'Prata direkt med dina fans och kunder.',
    no: 'Snakk direkte med fansene og kundene dine.'
  },
  'ipage.showcase3': {
    pt: 'Vendas diretas',
    en: 'Direct sales',
    es: 'Ventas directas',
    it: 'Vendite dirette',
    fr: 'Ventes directes',
    de: 'Direktverkäufe',
    nl: 'Directe verkoop',
    sv: 'Direktförsäljning',
    no: 'Direkte salg'
  },
  'ipage.showcase3Desc': {
    pt: 'Receba pagamentos sem sair da plataforma.',
    en: 'Receive payments without leaving the platform.',
    es: 'Recibe pagos sin salir de la plataforma.',
    it: 'Ricevi pagamenti senza lasciare la piattaforma.',
    fr: 'Recevez des paiements sans quitter la plateforme.',
    de: 'Erhalten Sie Zahlungen, ohne die Plattform zu verlassen.',
    nl: 'Ontvang betalingen zonder het platform te verlaten.',
    sv: 'Ta emot betalningar utan att lämna plattformen.',
    no: 'Motta betalinger uten å forlate plattformen.'
  },
  'ipage.startNowTitle': {
    pt: '👉 Comece agora',
    en: '👉 Start now',
    es: '👉 Comienza ahora',
    it: '👉 Inizia ora',
    fr: '👉 Commencez maintenant',
    de: '👉 Jetzt starten',
    nl: '👉 Begin nu',
    sv: '👉 Börja nu',
    no: '👉 Begynn nå'
  },
  'ipage.startNowDescription': {
    pt: 'Crie sua conta grátis e descubra como transformar sua audiência em clientes fiéis',
    en: 'Create your free account and discover how to transform your audience into loyal customers',
    es: 'Crea tu cuenta gratis y descubre cómo transformar tu audiencia en clientes fieles',
    it: 'Crea il tuo account gratuito e scopri come trasformare il tuo pubblico in clienti fedeli',
    fr: 'Créez votre compte gratuit et découvrez comment transformer votre audience en clients fidèles',
    de: 'Erstellen Sie Ihr kostenloses Konto und entdecken Sie, wie Sie Ihr Publikum in treue Kunden verwandeln',
    nl: 'Maak je gratis account aan en ontdek hoe je je publiek kunt omzetten in loyale klanten',
    sv: 'Skapa ditt gratis konto och upptäck hur du förvandlar din publik till lojala kunder',
    no: 'Opprett din gratis konto og oppdag hvordan du forvandler publikum til lojale kunder'
  },
  'ipage.footerTitle': {
    pt: 'Social Link',
    en: 'Social Link',
    es: 'Social Link',
    it: 'Social Link',
    fr: 'Social Link',
    de: 'Social Link',
    nl: 'Social Link',
    sv: 'Social Link',
    no: 'Social Link'
  },
  'ipage.footerSubtitle': {
    pt: 'A evolução do link na bio',
    en: 'The evolution of link in bio',
    es: 'La evolución del link en bio',
    it: 'L\'evoluzione del link in bio',
    fr: 'L\'évolution du lien en bio',
    de: 'Die Evolution des Links in der Bio',
    nl: 'De evolutie van link in bio',
    sv: 'Utvecklingen av länk i bio',
    no: 'Utviklingen av lenke i bio'
  },
  'ipage.signUpButton': {
    pt: '📝 Fazer Cadastro',
    en: '📝 Sign Up',
    es: '📝 Registrarse',
    it: '📝 Registrati',
    fr: '📝 S\'inscrire',
    de: '📝 Registrieren',
    nl: '📝 Registreren',
    sv: '📝 Registrera',
    no: '📝 Registrer'
  },
  'ipage.freeTrialButton': {
    pt: '🚀 Teste grátis por 7 dias',
    en: '🚀 Free 7-day trial',
    es: '🚀 Prueba gratis por 7 días',
    it: '🚀 Prova gratuita di 7 giorni',
    fr: '🚀 Essai gratuit de 7 jours',
    de: '🚀 7 Tage kostenlose Testversion',
    nl: '🚀 Gratis 7-daagse proefperiode',
    sv: '🚀 Gratis 7-dagars provperiod',
    no: '🚀 Gratis 7-dagers prøveperiode'
  },
  'ipage.commitmentText': {
    pt: 'Sem compromisso • Cancele a qualquer momento',
    en: 'No commitment • Cancel anytime',
    es: 'Sin compromiso • Cancela en cualquier momento',
    it: 'Nessun impegno • Cancella in qualsiasi momento',
    fr: 'Aucun engagement • Annulez à tout moment',
    de: 'Keine Verpflichtung • Jederzeit kündbar',
    nl: 'Geen verplichtingen • Stop wanneer je wilt',
    sv: 'Ingen förpliktelse • Avsluta när som helst',
    no: 'Ingen forpliktelse • Avbryt når som helst'
  }
};

// Contexto para idioma
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Detectar idioma preferido ou usar inglês como padrão
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  // Salvar idioma preferido
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    return translation ? translation[language] : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};