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
  'ipage.whyChooseTitle': {
    pt: '🌟 Por que escolher o Social Link?',
    en: '🌟 Why choose Social Link?',
    es: '🌟 ¿Por qué elegir Social Link?',
    it: '🌟 Perché scegliere Social Link?',
    fr: '🌟 Pourquoi choisir Social Link?',
    de: '🌟 Warum Social Link wählen?',
    nl: '🌟 Waarom Social Link kiezen?',
    sv: '🌟 Varför välja Social Link?',
    no: '🌟 Hvorfor velge Social Link?'
  },
  'ipage.showcase1': {
    pt: 'Sua Vitrine',
    en: 'Your Showcase',
    es: 'Tu Vitrina',
    it: 'La Tua Vetrina',
    fr: 'Votre Vitrine',
    de: 'Ihr Schaufenster',
    nl: 'Jouw Etalage',
    sv: 'Ditt Skyltfönster',
    no: 'Ditt Utstillingsvindu'
  },
  'ipage.showcase1Desc': {
    pt: 'Uma página única e personalizada',
    en: 'A unique and personalized page',
    es: 'Una página única y personalizada',
    it: 'Una pagina unica e personalizzata',
    fr: 'Une page unique et personnalisée',
    de: 'Eine einzigartige und personalisierte Seite',
    nl: 'Een unieke en gepersonaliseerde pagina',
    sv: 'En unik och personlig sida',
    no: 'En unik og personlig side'
  },
  'ipage.showcase2': {
    pt: 'Seu Chat',
    en: 'Your Chat',
    es: 'Tu Chat',
    it: 'La Tua Chat',
    fr: 'Votre Chat',
    de: 'Ihr Chat',
    nl: 'Jouw Chat',
    sv: 'Din Chat',
    no: 'Din Chat'
  },
  'ipage.showcase2Desc': {
    pt: 'Conexão real com sua audiência',
    en: 'Real connection with your audience',
    es: 'Conexión real con tu audiencia',
    it: 'Connessione reale con il tuo pubblico',
    fr: 'Connexion réelle avec votre audience',
    de: 'Echte Verbindung zu Ihrem Publikum',
    nl: 'Echte verbinding met je publiek',
    sv: 'Verklig kontakt med din publik',
    no: 'Ekte forbindelse med publikummet ditt'
  },
  'ipage.showcase3': {
    pt: 'Suas Vendas',
    en: 'Your Sales',
    es: 'Tus Ventas',
    it: 'Le Tue Vendite',
    fr: 'Vos Ventes',
    de: 'Ihre Verkäufe',
    nl: 'Jouw Verkopen',
    sv: 'Din Försäljning',
    no: 'Ditt Salg'
  },
  'ipage.showcase3Desc': {
    pt: 'Monetização facilitada e eficiente',
    en: 'Easy and efficient monetization',
    es: 'Monetización fácil y eficiente',
    it: 'Monetizzazione facile ed efficiente',
    fr: 'Monétisation facile et efficace',
    de: 'Einfache und effiziente Monetarisierung',
    nl: 'Eenvoudige en efficiënte monetisatie',
    sv: 'Enkel och effektiv intäktsgenerering',
    no: 'Enkel og effektiv inntektsgenerering'
  },
  'ipage.exampleTitle': {
    pt: '👩‍💻 Exemplo real',
    en: '👩‍💻 Real example',
    es: '👩‍💻 Ejemplo real',
    it: '👩‍💻 Esempio reale',
    fr: '👩‍💻 Exemple réel',
    de: '👩‍💻 Echtes Beispiel',
    nl: '👩‍💻 Echt voorbeeld',
    sv: '👩‍💻 Verkligt exempel',
    no: '👩‍💻 Ekte eksempel'
  },
  'ipage.exampleText': {
    pt: 'Ketlen, uma jovem criadora, montou sua vitrine no Social Link. Em poucos dias, ela já fazia 50 vendas por dia, faturando perto de $1.000 por mês.',
    en: 'Ketlen, a young creator, set up her showcase on Social Link. In just a few days, she was already making 50 sales per day, earning close to $1,000 per month.',
    es: 'Ketlen, una joven creadora, montó su vitrina en Social Link. En pocos días, ya hacía 50 ventas por día, facturando cerca de $1,000 por mes.',
    it: 'Ketlen, una giovane creatrice, ha allestito la sua vetrina su Social Link. In pochi giorni, faceva già 50 vendite al giorno, fatturando quasi $1,000 al mese.',
    fr: 'Ketlen, une jeune créatrice, a monté sa vitrine sur Social Link. En quelques jours, elle faisait déjà 50 ventes par jour, facturant près de $1,000 par mois.',
    de: 'Ketlen, eine junge Kreative, hat ihr Schaufenster auf Social Link eingerichtet. In nur wenigen Tagen machte sie bereits 50 Verkäufe pro Tag und verdiente fast $1,000 pro Monat.',
    nl: 'Ketlen, een jonge maker, zette haar etalage op Social Link op. In slechts een paar dagen maakte ze al 50 verkopen per dag, met een omzet van bijna $1,000 per maand.',
    sv: 'Ketlen, en ung skapare, satte upp sitt skyltfönster på Social Link. På bara några dagar gjorde hon redan 50 försäljningar per dag och tjänade nära $1,000 per månad.',
    no: 'Ketlen, en ung skaper, satte opp sitt utstillingsvindu på Social Link. På bare noen få dager gjorde hun allerede 50 salg per dag og tjente nesten $1,000 per måned.'
  },
  'ipage.testimonialQuote': {
    pt: '"No Linktree as pessoas só clicavam e iam embora. No Social Link, elas conversam comigo — e é isso que fez minhas vendas explodirem."',
    en: '"On Linktree people just clicked and left. On Social Link, they talk to me — and that\'s what made my sales explode."',
    es: '"En Linktree la gente solo hacía clic y se iba. En Social Link, hablan conmigo — y eso es lo que hizo explotar mis ventas."',
    it: '"Su Linktree le persone cliccavano e se ne andavano. Su Social Link, parlano con me — ed è questo che ha fatto esplodere le mie vendite."',
    fr: '"Sur Linktree les gens cliquaient juste et partaient. Sur Social Link, ils me parlent — et c\'est ce qui a fait exploser mes ventes."',
    de: '"Bei Linktree klickten die Leute nur und gingen weg. Bei Social Link sprechen sie mit mir — und das hat meine Verkäufe explodieren lassen."',
    nl: '"Op Linktree klikten mensen alleen en gingen weg. Op Social Link praten ze met me — en dat is wat mijn verkopen deed exploderen."',
    sv: '"På Linktree klickade folk bara och gick. På Social Link pratar de med mig — och det är vad som fick min försäljning att explodera."',
    no: '"På Linktree klikket folk bare og dro. På Social Link snakker de med meg — og det er det som fikk salget mitt til å eksplodere."'
  },
  'ipage.testimonialAuthor': {
    pt: '— Ketlen, Criadora de Conteúdo',
    en: '— Ketlen, Content Creator',
    es: '— Ketlen, Creadora de Contenido',
    it: '— Ketlen, Creatrice di Contenuti',
    fr: '— Ketlen, Créatrice de Contenu',
    de: '— Ketlen, Content-Erstellerin',
    nl: '— Ketlen, Content Creator',
    sv: '— Ketlen, Innehållsskapare',
    no: '— Ketlen, Innholdsskaper'
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