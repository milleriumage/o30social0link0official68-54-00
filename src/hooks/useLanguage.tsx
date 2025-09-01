import { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'it' | 'fr' | 'de' | 'nl' | 'sv' | 'no';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: Translations = {
  // Settings Dialog
  'settings.title': {
    pt: 'Configurações',
    en: 'Settings',
    es: 'Configuraciones',
    it: 'Impostazioni',
    fr: 'Paramètres',
    de: 'Einstellungen',
    nl: 'Instellingen',
    sv: 'Inställningar',
    no: 'Innstillinger'
  },
  'settings.appearance': {
    pt: 'Aparência do Chat',
    en: 'Chat Appearance',
    es: 'Apariencia del Chat',
    it: 'Aspetto Chat',
    fr: 'Apparence du Chat',
    de: 'Chat-Erscheinungsbild',
    nl: 'Chat Uiterlijk',
    sv: 'Chat Utseende',
    no: 'Chat Utseende'
  },
  'settings.controls': {
    pt: 'Controles do Chat',
    en: 'Chat Controls',
    es: 'Controles del Chat',
    it: 'Controlli Chat',
    fr: 'Contrôles du Chat',
    de: 'Chat-Steuerung',
    nl: 'Chat Bediening',
    sv: 'Chat Kontroller',
    no: 'Chat Kontroller'
  },
  'settings.preview': {
    pt: '👁️ Preview do Chat',
    en: '👁️ Chat Preview',
    es: '👁️ Vista Previa del Chat',
    it: '👁️ Anteprima Chat',
    fr: '👁️ Aperçu du Chat',
    de: '👁️ Chat-Vorschau',
    nl: '👁️ Chat Voorbeeld',
    sv: '👁️ Chat Förhandsvisning',
    no: '👁️ Chat Forhåndsvisning'
  },
  'settings.selectLanguage': {
    pt: 'Selecionar idioma',
    en: 'Select language',
    es: 'Seleccionar idioma',
    it: 'Seleziona lingua',
    fr: 'Sélectionner la langue',
    de: 'Sprache auswählen',
    nl: 'Selecteer taal',
    sv: 'Välj språk',
    no: 'Velg språk'
  },
  'settings.userName': {
    pt: 'Nome do Usuário',
    en: 'User Name',
    es: 'Nombre de Usuario',
    it: 'Nome Utente',
    fr: 'Nom d\'utilisateur',
    de: 'Benutzername',
    nl: 'Gebruikersnaam',
    sv: 'Användarnamn',
    no: 'Brukernavn'
  },
  'settings.userAvatar': {
    pt: 'Foto do usuário',
    en: 'User photo',
    es: 'Foto de usuario',
    it: 'Foto utente',
    fr: 'Photo utilisateur',
    de: 'Benutzerfoto',
    nl: 'Gebruikersfoto',
    sv: 'Användarfoto',
    no: 'Brukerfoto'
  },
  'settings.chatColor': {
    pt: 'Cor das mensagens',
    en: 'Message color',
    es: 'Color de mensajes',
    it: 'Colore messaggi',
    fr: 'Couleur des messages',
    de: 'Nachrichtenfarbe',
    nl: 'Berichtkleur',
    sv: 'Meddelandefärg',
    no: 'Meldingsfarge'
  },
  'settings.glassEffect': {
    pt: 'Efeito de vidro',
    en: 'Glass effect',
    es: 'Efecto de cristal',
    it: 'Effetto vetro',
    fr: 'Effet de verre',
    de: 'Glaseffekt',
    nl: 'Glaseffect',
    sv: 'Glaseffekt',
    no: 'Glasseffekt'
  },
  'settings.fleffyMode': {
    pt: 'Modo Fluffy',
    en: 'Fluffy Mode',
    es: 'Modo Fluffy',
    it: 'Modalità Fluffy',
    fr: 'Mode Fluffy',
    de: 'Fluffy-Modus',
    nl: 'Fluffy Modus',
    sv: 'Fluffy Läge',
    no: 'Fluffy Modus'
  },
  'settings.showCreatorName': {
    pt: 'Mostrar nome do criador',
    en: 'Show creator name',
    es: 'Mostrar nombre del creador',
    it: 'Mostra nome creatore',
    fr: 'Afficher le nom du créateur',
    de: 'Ersteller-Namen anzeigen',
    nl: 'Toon naam maker',
    sv: 'Visa skaparens namn',
    no: 'Vis skapernavn'
  },
  'settings.hideHistoryFromVisitors': {
    pt: 'Ocultar histórico para visitantes',
    en: 'Hide history from visitors',
    es: 'Ocultar historial a visitantes',
    it: 'Nascondi cronologia ai visitatori',
    fr: 'Masquer l\'historique aux visiteurs',
    de: 'Verlauf vor Besuchern verbergen',
    nl: 'Verberg geschiedenis voor bezoekers',
    sv: 'Dölj historik för besökare',
    no: 'Skjul historikk for besøkende'
  },
  'settings.chatSize': {
    pt: 'Tamanho do chat',
    en: 'Chat size',
    es: 'Tamaño del chat',
    it: 'Dimensione chat',
    fr: 'Taille du chat',
    de: 'Chat-Größe',
    nl: 'Chat grootte',
    sv: 'Chat storlek',
    no: 'Chat størrelse'
  },
  'settings.chatSizeSmall': {
    pt: 'Pequeno',
    en: 'Small',
    es: 'Pequeño',
    it: 'Piccolo',
    fr: 'Petit',
    de: 'Klein',
    nl: 'Klein',
    sv: 'Liten',
    no: 'Liten'
  },
  'settings.chatSizeLarge': {
    pt: 'Grande',
    en: 'Large',
    es: 'Grande',
    it: 'Grande',
    fr: 'Grand',
    de: 'Groß',
    nl: 'Groot',
    sv: 'Stor',
    no: 'Stor'
  },
  'settings.chatSizeDescription': {
    pt: 'Tamanho menor = mais mensagens visíveis',
    en: 'Smaller size = more visible messages',
    es: 'Tamaño menor = más mensajes visibles',
    it: 'Dimensione minore = più messaggi visibili',
    fr: 'Taille plus petite = plus de messages visibles',
    de: 'Kleinere Größe = mehr sichtbare Nachrichten',
    nl: 'Kleinere maat = meer zichtbare berichten',
    sv: 'Mindre storlek = fler synliga meddelanden',
    no: 'Mindre størrelse = flere synlige meldinger'
  },
  'settings.chatBackgroundColor': {
    pt: 'Cor de fundo do chat',
    en: 'Chat background color',
    es: 'Color de fondo del chat',
    it: 'Colore sfondo chat',
    fr: 'Couleur de fond du chat',
    de: 'Chat-Hintergrundfarbe',
    nl: 'Chat achtergrondkleur',
    sv: 'Chat bakgrundsfärg',
    no: 'Chat bakgrunnsfarge'
  },
  'settings.transparent': {
    pt: 'Transparente',
    en: 'Transparent',
    es: 'Transparente',
    it: 'Trasparente',
    fr: 'Transparent',
    de: 'Transparent',
    nl: 'Transparant',
    sv: 'Transparent',
    no: 'Gjennomsiktig'
  },
  'settings.saveAndApply': {
    pt: 'Salvar e Aplicar',
    en: 'Save and Apply',
    es: 'Guardar y Aplicar',
    it: 'Salva e Applica',
    fr: 'Enregistrer et Appliquer',
    de: 'Speichern und Anwenden',
    nl: 'Opslaan en Toepassen',
    sv: 'Spara och Tillämpa',
    no: 'Lagre og Anvend'
  },
  'settings.allowImages': {
    pt: 'Permitir Upload de Imagem',
    en: 'Allow Image Upload',
    es: 'Permitir Subida de Imagen',
    it: 'Consenti Caricamento Immagine',
    fr: 'Autoriser le Téléchargement d\'Image',
    de: 'Bild-Upload erlauben',
    nl: 'Afbeelding Upload Toestaan',
    sv: 'Tillåt Bilduppladdning',
    no: 'Tillat Bildeopplasting'
  },
  'settings.colorPalettes': {
    pt: 'Paletas de Cores',
    en: 'Color Palettes',
    es: 'Paletas de Colores',
    it: 'Tavolozze dei Colori',
    fr: 'Palettes de Couleurs',
    de: 'Farbpaletten',
    nl: 'Kleurpaletten',
    sv: 'Färgpaletter',
    no: 'Fargepaletter'
  },
  'settings.visibilityConfig': {
    pt: 'Configurar Visibilidade',
    en: 'Configure Visibility',
    es: 'Configurar Visibilidad',
    it: 'Configura Visibilità',
    fr: 'Configurer la Visibilité',
    de: 'Sichtbarkeit Konfigurieren',
    nl: 'Zichtbaarheid Configureren',
    sv: 'Konfigurera Synlighet',
    no: 'Konfigurer Synlighet'
  },
  'settings.visibilityDescription': {
    pt: 'Configuração de visibilidade de elementos da página do criador',
    en: 'Visibility configuration of creator page elements',
    es: 'Configuración de visibilidad de elementos de la página del creador',
    it: 'Configurazione visibilità elementi pagina creatore',
    fr: 'Configuration de visibilité des éléments de la page créateur',
    de: 'Sichtbarkeitskonfiguration der Ersteller-Seitenelemente',
    nl: 'Zichtbaarheidsconfiguratie van maker pagina-elementen',
    sv: 'Synlighetskonfiguration av skaparens sidelement',
    no: 'Synlighetskonfigurasjon av skapersideelementer'
  },
  'settings.externalStorage': {
    pt: 'Armazenamento Externo',
    en: 'External Storage',
    es: 'Almacenamiento Externo',
    it: 'Archiviazione Esterna',
    fr: 'Stockage Externe',
    de: 'Externer Speicher',
    nl: 'Externe Opslag',
    sv: 'Extern Lagring',
    no: 'Ekstern Lagring'
  },
  'settings.configureStorage': {
    pt: 'Configurar Armazenamento',
    en: 'Configure Storage',
    es: 'Configurar Almacenamiento',
    it: 'Configura Archiviazione',
    fr: 'Configurer le Stockage',
    de: 'Speicher Konfigurieren',
    nl: 'Opslag Configureren',
    sv: 'Konfigurera Lagring',
    no: 'Konfigurer Lagring'
  },
  'settings.privacy': {
    pt: 'Privacidade',
    en: 'Privacy',
    es: 'Privacidad',
    it: 'Privacy',
    fr: 'Confidentialité',
    de: 'Datenschutz',
    nl: 'Privacy',
    sv: 'Integritet',
    no: 'Personvern'
  },
  'settings.clearChat': {
    pt: 'Limpar Todas as Mensagens do Chat',
    en: 'Clear All Chat Messages',
    es: 'Borrar Todos los Mensajes del Chat',
    it: 'Cancella Tutti i Messaggi Chat',
    fr: 'Effacer Tous les Messages du Chat',
    de: 'Alle Chat-Nachrichten Löschen',
    nl: 'Alle Chat Berichten Wissen',
    sv: 'Rensa Alla Chatmeddelanden',
    no: 'Slett Alle Chatmeldinger'
  },
  'settings.clearChatConfirm': {
    pt: 'Tem certeza de que deseja limpar todas as mensagens do chat?',
    en: 'Are you sure you want to clear all chat messages?',
    es: '¿Estás seguro de que quieres borrar todos los mensajes del chat?',
    it: 'Sei sicuro di voler cancellare tutti i messaggi chat?',
    fr: 'Êtes-vous sûr de vouloir effacer tous les messages du chat?',
    de: 'Sind Sie sicher, dass Sie alle Chat-Nachrichten löschen möchten?',
    nl: 'Weet je zeker dat je alle chatberichten wilt wissen?',
    sv: 'Är du säker på att du vill rensa alla chatmeddelanden?',
    no: 'Er du sikker på at du vil slette alle chatmeldinger?'
  },
  'settings.clearChatDescription': {
    pt: 'Isso excluirá permanentemente todas as mensagens do chat por privacidade.',
    en: 'This will permanently delete all chat messages for privacy.',
    es: 'Esto eliminará permanentemente todos los mensajes del chat por privacidad.',
    it: 'Questo eliminerà permanentemente tutti i messaggi chat per privacy.',
    fr: 'Cela supprimera définitivement tous les messages du chat pour la confidentialité.',
    de: 'Dies wird alle Chat-Nachrichten dauerhaft aus Datenschutzgründen löschen.',
    nl: 'Dit zal alle chatberichten permanent verwijderen voor privacy.',
    sv: 'Detta kommer att permanent radera alla chatmeddelanden för integritet.',
    no: 'Dette vil permanent slette alle chatmeldinger for personvern.'
  },

  // Media Vitrine
  'vitrine.noMedia': {
    pt: 'Nenhuma mídia selecionada',
    en: 'No media selected',
    es: 'Ningún medio seleccionado',
    it: 'Nessun media selezionato',
    fr: 'Aucun média sélectionné',
    de: 'Keine Medien ausgewählt',
    nl: 'Geen media geselecteerd',
    sv: 'Ingen media vald',
    no: 'Ingen media valgt'
  },
  'vitrine.useButtons': {
    pt: 'Use os botões ao lado para adicionar conteúdo',
    en: 'Use the buttons on the side to add content',
    es: 'Usa los botones del lado para agregar contenido',
    it: 'Usa i pulsanti laterali per aggiungere contenuto',
    fr: 'Utilisez les boutons sur le côté pour ajouter du contenu',
    de: 'Verwenden Sie die Schaltflächen seitlich, um Inhalte hinzuzufügen',
    nl: 'Gebruik de knoppen aan de zijkant om inhoud toe te voegen',
    sv: 'Använd knapparna på sidan för att lägga till innehåll',
    no: 'Bruk knappene på siden for å legge til innhold'
  },
  'vitrine.uploadVideo': {
    pt: 'Upload de Vídeo',
    en: 'Upload Video',
    es: 'Subir Video',
    it: 'Carica Video',
    fr: 'Télécharger Vidéo',
    de: 'Video hochladen',
    nl: 'Video uploaden',
    sv: 'Ladda upp video',
    no: 'Last opp video'
  },
  'vitrine.addImage': {
    pt: 'Adicionar Imagem',
    en: 'Add Image',
    es: 'Agregar Imagen',
    it: 'Aggiungi Immagine',
    fr: 'Ajouter Image',
    de: 'Bild hinzufügen',
    nl: 'Afbeelding toevoegen',
    sv: 'Lägg till bild',
    no: 'Legg til bilde'
  },
  'vitrine.actions': {
    pt: 'Ações',
    en: 'Actions',
    es: 'Acciones',
    it: 'Azioni',
    fr: 'Actions',
    de: 'Aktionen',
    nl: 'Acties',
    sv: 'Åtgärder',
    no: 'Handlinger'
  },
  'vitrine.image': {
    pt: 'Imagem',
    en: 'Image',
    es: 'Imagen',
    it: 'Immagine',
    fr: 'Image',
    de: 'Bild',
    nl: 'Afbeelding',
    sv: 'Bild',
    no: 'Bilde'
  },
  'vitrine.video': {
    pt: 'Vídeo',
    en: 'Video',
    es: 'Video',
    it: 'Video',
    fr: 'Vidéo',
    de: 'Video',
    nl: 'Video',
    sv: 'Video',
    no: 'Video'
  },

  // MediaShowcase component
  'mediaShowcase.getVipSlots': {
    pt: '+ Get VIP Slots',
    en: '+ Get VIP Slots',
    es: '+ Obtener Slots VIP', 
    it: '+ Ottieni Slot VIP',
    fr: '+ Obtenir Slots VIP',
    de: '+ VIP-Slots erhalten',
    nl: '+ VIP Slots krijgen',
    sv: '+ Få VIP Slots',
    no: '+ Få VIP Slots'
  },
  'mediaShowcase.getImageSlot': {
    pt: 'Get +1 slot image upload VIP',
    en: 'Get +1 VIP image upload slot',
    es: 'Obtener +1 slot VIP subida imagen',
    it: 'Ottieni +1 slot VIP caricamento immagine',
    fr: 'Obtenir +1 slot VIP téléchargement image',
    de: '+1 VIP Bild-Upload-Slot erhalten',
    nl: '+1 VIP afbeelding upload slot krijgen',
    sv: 'Få +1 VIP bilduppladdningsplats',
    no: 'Få +1 VIP bildeopplastningsplass'
  },
  'mediaShowcase.getVideoSlot': {
    pt: 'Get +1 slot upload video VIP',
    en: 'Get +1 VIP video upload slot',
    es: 'Obtener +1 slot VIP subida video',
    it: 'Ottieni +1 slot VIP caricamento video',
    fr: 'Obtenir +1 slot VIP téléchargement vidéo',
    de: '+1 VIP Video-Upload-Slot erhalten',
    nl: '+1 VIP video upload slot krijgen', 
    sv: 'Få +1 VIP videouppladdningsplats',
    no: 'Få +1 VIP videoopplastningsplass'
  },
  'mediaShowcase.uploadPhoto': {
    pt: 'Upload Foto',
    en: 'Upload Photo',
    es: 'Subir Foto',
    it: 'Carica Foto',
    fr: 'Télécharger Photo',
    de: 'Foto hochladen',
    nl: 'Foto uploaden',
    sv: 'Ladda upp foto',
    no: 'Last opp foto'
  },
  'mediaShowcase.gallery': {
    pt: 'Galeria',
    en: 'Gallery',
    es: 'Galería',
    it: 'Galleria',
    fr: 'Galerie',
    de: 'Galerie',
    nl: 'Galerij',
    sv: 'Galleri',
    no: 'Galleri'
  },
  'mediaShowcase.uploadVideo': {
    pt: 'Upload Vídeo',
    en: 'Upload Video',
    es: 'Subir Video',
    it: 'Carica Video',
    fr: 'Télécharger Vidéo',
    de: 'Video hochladen',
    nl: 'Video uploaden',
    sv: 'Ladda upp video',
    no: 'Last opp video'
  },
  'mediaShowcase.configureVitrine': {
    pt: 'Configurar vitrine',
    en: 'Configure showcase',
    es: 'Configurar vitrina',
    it: 'Configura vetrina',
    fr: 'Configurer vitrine',
    de: 'Schaufenster konfigurieren',
    nl: 'Etalage configureren',
    sv: 'Konfigurera skyltfönster',
    no: 'Konfigurer utstillingsvindu'
  },
  'mediaShowcase.expandVitrine': {
    pt: 'Expandir vitrine',
    en: 'Expand showcase',
    es: 'Expandir vitrina',
    it: 'Espandi vetrina',
    fr: 'Agrandir vitrine',
    de: 'Schaufenster erweitern',
    nl: 'Etalage uitbreiden',
    sv: 'Expandera skyltfönster',
    no: 'Utvid utstillingsvindu'
  },
  'mediaShowcase.minimizeVitrine': {
    pt: 'Minimizar vitrine',
    en: 'Minimize showcase',
    es: 'Minimizar vitrina',
    it: 'Minimizza vetrina',
    fr: 'Réduire vitrine',
    de: 'Schaufenster minimieren',
    nl: 'Etalage minimaliseren',
    sv: 'Minimera skyltfönster',
    no: 'Minimer utstillingsvindu'
  },
  'mediaShowcase.noMediaAdded': {
    pt: 'Nenhuma mídia adicionada ainda',
    en: 'No media added yet',
    es: 'Ningún medio agregado aún',
    it: 'Nessun media aggiunto ancora',
    fr: 'Aucun média ajouté encore',
    de: 'Noch keine Medien hinzugefügt',
    nl: 'Nog geen media toegevoegd',
    sv: 'Ingen media tillagd än',
    no: 'Ingen media lagt til ennå'
  },
  'mediaShowcase.useButtonsAbove': {
    pt: 'Use os botões acima para adicionar fotos e vídeos',
    en: 'Use the buttons above to add photos and videos',
    es: 'Usa los botones de arriba para agregar fotos y videos',
    it: 'Usa i pulsanti sopra per aggiungere foto e video',
    fr: 'Utilisez les boutons ci-dessus pour ajouter des photos et vidéos',
    de: 'Verwenden Sie die Schaltflächen oben, um Fotos und Videos hinzuzufügen',
    nl: 'Gebruik de knoppen hierboven om foto\'s en video\'s toe te voegen',
    sv: 'Använd knapparna ovan för att lägga till foton och videor',
    no: 'Bruk knappene over for å legge til bilder og videoer'
  },
  'mediaShowcase.customizeMessage': {
    pt: 'Personalizar mensagem',
    en: 'Customize message',
    es: 'Personalizar mensaje',
    it: 'Personalizza messaggio',
    fr: 'Personnaliser message',
    de: 'Nachricht anpassen',
    nl: 'Bericht aanpassen',
    sv: 'Anpassa meddelande',
    no: 'Tilpass melding'
  },

  // IPage auth form
  'auth.welcome': {
    pt: 'Bem-vindo!',
    en: 'Welcome!',
    es: '¡Bienvenido!',
    it: 'Benvenuto!',
    fr: 'Bienvenu!',
    de: 'Willkommen!',
    nl: 'Welkom!',
    sv: 'Välkommen!',
    no: 'Velkommen!'
  },
  'auth.createAccountMessage': {
    pt: 'Crie sua conta e comece agora',
    en: 'Create your account and start now',
    es: 'Crea tu cuenta y comienza ahora',
    it: 'Crea il tuo account e inizia ora',
    fr: 'Créez votre compte et commencez maintenant',
    de: 'Erstellen Sie Ihr Konto und beginnen Sie jetzt',
    nl: 'Maak je account aan en begin nu',
    sv: 'Skapa ditt konto och börja nu',
    no: 'Opprett kontoen din og start nå'
  },
  'auth.loginMessage': {
    pt: 'Entre na sua conta',
    en: 'Sign in to your account',
    es: 'Inicia sesión en tu cuenta',
    it: 'Accedi al tuo account',
    fr: 'Connectez-vous à votre compte',
    de: 'Melden Sie sich bei Ihrem Konto an',
    nl: 'Log in op je account',
    sv: 'Logga in på ditt konto',
    no: 'Logg inn på kontoen din'
  },
  'auth.emailPlaceholder': {
    pt: 'Seu e-mail',
    en: 'Your email',
    es: 'Tu email',
    it: 'La tua email',
    fr: 'Votre email',
    de: 'Ihre E-Mail',
    nl: 'Je e-mail',
    sv: 'Din e-post',
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
    pt: 'Confirmar senha',
    en: 'Confirm password',
    es: 'Confirmar contraseña',
    it: 'Conferma password',
    fr: 'Confirmer le mot de passe',
    de: 'Passwort bestätigen',
    nl: 'Wachtwoord bevestigen',
    sv: 'Bekräfta lösenord',
    no: 'Bekreft passord'
  },
  'auth.processing': {
    pt: 'Processando...',
    en: 'Processing...',
    es: 'Procesando...',
    it: 'Elaborazione...',
    fr: 'Traitement...',
    de: 'Verarbeitung...',
    nl: 'Verwerken...',
    sv: 'Bearbetar...',
    no: 'Behandler...'
  },
  'auth.createAccount': {
    pt: 'Criar conta',
    en: 'Create account',
    es: 'Crear cuenta',
    it: 'Crea account',
    fr: 'Créer un compte',
    de: 'Konto erstellen',
    nl: 'Account aanmaken',
    sv: 'Skapa konto',
    no: 'Opprett konto'
  },
  'auth.signIn': {
    pt: 'Entrar',
    en: 'Sign in',
    es: 'Iniciar sesión',
    it: 'Accedi',
    fr: 'Se connecter',
    de: 'Anmelden',
    nl: 'Inloggen',
    sv: 'Logga in',
    no: 'Logg inn'
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
  'auth.alreadyHaveAccount': {
    pt: 'Já tem conta?',
    en: 'Already have an account?',
    es: '¿Ya tienes cuenta?',
    it: 'Hai già un account?',
    fr: 'Vous avez déjà un compte?',
    de: 'Haben Sie bereits ein Konto?',
    nl: 'Heb je al een account?',
    sv: 'Har du redan ett konto?',
    no: 'Har du allerede en konto?'
  },
  'auth.noAccount': {
    pt: 'Não tem conta?',
    en: 'Don\'t have an account?',
    es: '¿No tienes cuenta?',
    it: 'Non hai un account?',
    fr: 'Vous n\'avez pas de compte?',
    de: 'Haben Sie kein Konto?',
    nl: 'Heb je geen account?',
    sv: 'Har du inget konto?',
    no: 'Har du ikke en konto?'
  },
  'auth.forgotPassword': {
    pt: '🔐 Esqueceu a senha?',
    en: '🔐 Forgot password?',
    es: '🔐 ¿Olvidaste la contraseña?',
    it: '🔐 Password dimenticata?',
    fr: '🔐 Mot de passe oublié?',
    de: '🔐 Passwort vergessen?',
    nl: '🔐 Wachtwoord vergeten?',
    sv: '🔐 Glömt lösenord?',
    no: '🔐 Glemt passord?'
  },

  // Notifications
  'notifications.loading': {
    pt: 'Carregando...',
    en: 'Loading...',
    es: 'Cargando...',
    it: 'Caricamento...',
    fr: 'Chargement...',
    de: 'Laden...',
    nl: 'Laden...',
    sv: 'Laddar...',
    no: 'Laster...'
  },
  'notifications.clickToRemove': {
    pt: 'Clique para remover esta notificação',
    en: 'Click to remove this notification',
    es: 'Haz clic para eliminar esta notificación',
    it: 'Clicca per rimuovere questa notifica',
    fr: 'Cliquez pour supprimer cette notification',
    de: 'Klicken Sie, um diese Benachrichtigung zu entfernen',
    nl: 'Klik om deze melding te verwijderen',
    sv: 'Klicka för att ta bort denna avisering',
    no: 'Klikk for å fjerne dette varselet'
  },
  'notifications.credits': {
    pt: 'Créditos',
    en: 'Credits',
    es: 'Créditos',
    it: 'Crediti',
    fr: 'Crédits',
    de: 'Kredite',
    nl: 'Tegoed',
    sv: 'Krediter',
    no: 'Kreditter'
  },
  'notifications.credit': {
    pt: 'crédito',
    en: 'credit',
    es: 'crédito',
    it: 'credito',
    fr: 'crédit',
    de: 'Kredit',
    nl: 'tegoed',
    sv: 'kredit',
    no: 'kreditt'
  },
  'notifications.credits_plural': {
    pt: 'créditos',
    en: 'credits',
    es: 'créditos',
    it: 'crediti',
    fr: 'crédits',
    de: 'Kredite',
    nl: 'tegoed',
    sv: 'krediter',
    no: 'kreditter'
  },

  // Premium Plans
  'plans.free.7days': {
    pt: '7 dias gratuitos',
    en: '7 free days',
    es: '7 días gratis',
    it: '7 giorni gratuiti',
    fr: '7 jours gratuits',
    de: '7 Tage kostenlos',
    nl: '7 gratis dagen',
    sv: '7 gratis dagar',
    no: '7 gratis dager'
  },
  'plans.free.slots': {
    pt: '4 slots (3 fotos + 1 vídeo)',
    en: '4 slots (3 photos + 1 video)',
    es: '4 espacios (3 fotos + 1 video)',
    it: '4 slot (3 foto + 1 video)',
    fr: '4 emplacements (3 photos + 1 vidéo)',
    de: '4 Plätze (3 Fotos + 1 Video)',
    nl: '4 slots (3 foto\'s + 1 video)',
    sv: '4 platser (3 foton + 1 video)',
    no: '4 plasser (3 bilder + 1 video)'
  },
  'plans.noVideoRestriction': {
    pt: 'Zero restrição para slot de vídeo',
    en: 'No video slot restrictions',
    es: 'Cero restricción para espacio de video',
    it: 'Zero restrizioni per slot video',
    fr: 'Aucune restriction pour l\'emplacement vidéo',
    de: 'Keine Video-Slot-Beschränkungen',
    nl: 'Geen video slot beperkingen',
    sv: 'Inga videoplats-begränsningar',
    no: 'Ingen videoplassbegrensninger'
  },
  'plans.basic.slots': {
    pt: '16 slots (12 fotos + 4 vídeos)',
    en: '16 slots (12 photos + 4 videos)',
    es: '16 espacios (12 fotos + 4 videos)',
    it: '16 slot (12 foto + 4 video)',
    fr: '16 emplacements (12 photos + 4 vidéos)',
    de: '16 Plätze (12 Fotos + 4 Videos)',
    nl: '16 slots (12 foto\'s + 4 video\'s)',
    sv: '16 platser (12 foton + 4 videor)',
    no: '16 plasser (12 bilder + 4 videoer)'
  },
  'plans.basic.credits': {
    pt: '1.300 + bônus 1.812 créditos',
    en: '1,300 + bonus 1,812 credits',
    es: '1.300 + bono 1.812 créditos',
    it: '1.300 + bonus 1.812 crediti',
    fr: '1 300 + bonus 1 812 crédits',
    de: '1.300 + Bonus 1.812 Kredite',
    nl: '1.300 + bonus 1.812 tegoed',
    sv: '1 300 + bonus 1 812 krediter',
    no: '1 300 + bonus 1 812 kreditter'
  },
  'plans.pro.slots': {
    pt: '52 slots (40 fotos + 12 vídeos)',
    en: '52 slots (40 photos + 12 videos)',
    es: '52 espacios (40 fotos + 12 videos)',
    it: '52 slot (40 foto + 12 video)',
    fr: '52 emplacements (40 photos + 12 vidéos)',
    de: '52 Plätze (40 Fotos + 12 Videos)',
    nl: '52 slots (40 foto\'s + 12 video\'s)',
    sv: '52 platser (40 foton + 12 videor)',
    no: '52 plasser (40 bilder + 12 videoer)'
  },
  'plans.pro.credits': {
    pt: '3.400 + bônus 1.812 créditos',
    en: '3,400 + bonus 1,812 credits',
    es: '3.400 + bono 1.812 créditos',
    it: '3.400 + bonus 1.812 crediti',
    fr: '3 400 + bonus 1 812 crédits',
    de: '3.400 + Bonus 1.812 Kredite',
    nl: '3.400 + bonus 1.812 tegoed',
    sv: '3 400 + bonus 1 812 krediter',
    no: '3 400 + bonus 1 812 kreditter'
  },
  'plans.vip.slots': {
    pt: 'Slots infinitos',
    en: 'Unlimited slots',
    es: 'Espacios infinitos',
    it: 'Slot illimitati',
    fr: 'Emplacements illimités',
    de: 'Unbegrenzte Plätze',
    nl: 'Onbeperkte slots',
    sv: 'Obegränsade platser',
    no: 'Ubegrensede plasser'
  },
  'plans.vip.credits': {
    pt: '8.300 + bônus 1.812 créditos',
    en: '8,300 + bonus 1,812 credits',
    es: '8.300 + bono 1.812 créditos',
    it: '8.300 + bonus 1.812 crediti',
    fr: '8 300 + bonus 1 812 crédits',
    de: '8.300 + Bonus 1.812 Kredite',
    nl: '8.300 + bonus 1.812 tegoed',
    sv: '8 300 + bonus 1 812 krediter',
    no: '8 300 + bonus 1 812 kreditter'
  },

  'features.showAll': {
    pt: 'Ver todas as',
    en: 'View all',
    es: 'Ver todas las',
    it: 'Vedi tutte le',
    fr: 'Voir toutes les',
    de: 'Alle anzeigen',
    nl: 'Bekijk alle',
    sv: 'Se alla',
    no: 'Se alle'
  },
  'features.hideAll': {
    pt: 'Ocultar',
    en: 'Hide',
    es: 'Ocultar',
    it: 'Nascondi',
    fr: 'Masquer',
    de: 'Verstecken',
    nl: 'Verbergen',
    sv: 'Dölj',
    no: 'Skjul'
  },
  'features.included': {
    pt: 'funcionalidades incluídas em todos os planos',
    en: 'features included in all plans',
    es: 'funcionalidades incluidas en todos los planes',
    it: 'funzionalità incluse in tutti i piani',
    fr: 'fonctionnalités incluses dans tous les plans',
    de: 'Funktionen in allen Plänen enthalten',
    nl: 'functies inbegrepen in alle plannen',
    sv: 'funktioner inkluderade i alla planer',
    no: 'funksjoner inkludert i alle planer'
  },
  'features.allIncluded': {
    pt: '🌟 Todas as funcionalidades estão incluídas em todos os planos!',
    en: '🌟 All features are included in every plan!',
    es: '🌟 ¡Todas las funcionalidades están incluidas en todos los planes!',
    it: '🌟 Tutte le funzionalità sono incluse in tutti i piani!',
    fr: '🌟 Toutes les fonctionnalités sont incluses dans tous les plans !',
    de: '🌟 Alle Funktionen sind in jedem Plan enthalten!',
    nl: '🌟 Alle functies zijn inbegrepen in elk plan!',
    sv: '🌟 Alla funktioner ingår i varje plan!',
    no: '🌟 Alle funksjoner er inkludert i hver plan!'
  },
  'features.onlyDifference': {
    pt: 'A única diferença entre os planos são os slots e créditos disponíveis',
    en: 'The only difference between plans is the available slots and credits',
    es: 'La única diferencia entre los planes son los slots y créditos disponibles',
    it: 'L\'unica differenza tra i piani sono i slot e crediti disponibili',
    fr: 'La seule différence entre les plans est le nombre d\'emplacements et crédits disponibles',
    de: 'Der einzige Unterschied zwischen den Plänen sind die verfügbaren Slots und Kredite',
    nl: 'Het enige verschil tussen plannen zijn de beschikbare slots en tegoed',
    sv: 'Den enda skillnaden mellan planerna är tillgängliga platser och krediter',
    no: 'Den eneste forskjellen mellom planene er tilgjengelige plasser og kreditter'
  },
  'features.tip': {
    pt: '💡 Dica:',
    en: '💡 Tip:',
    es: '💡 Consejo:',
    it: '💡 Suggerimento:',
    fr: '💡 Astuce :',
    de: '💡 Tipp:',
    nl: '💡 Tip:',
    sv: '💡 Tips:',
    no: '💡 Tips:'
  },
  'features.chooseTip': {
    pt: 'Todos os planos têm acesso completo às funcionalidades. Escolha baseado na quantidade de slots e créditos que você precisa!',
    en: 'All plans have complete access to features. Choose based on the amount of slots and credits you need!',
    es: 'Todos los planes tienen acceso completo a las funcionalidades. ¡Elige según la cantidad de slots y créditos que necesites!',
    it: 'Tutti i piani hanno accesso completo alle funzionalità. Scegli in base al numero di slot e crediti di cui hai bisogno!',
    fr: 'Tous les plans ont un accès complet aux fonctionnalités. Choisissez en fonction du nombre d\'emplacements et de crédits dont vous avez besoin !',
    de: 'Alle Pläne haben vollständigen Zugang zu den Funktionen. Wählen Sie basierend auf der Anzahl der Slots und Kredite, die Sie benötigen!',
    nl: 'Alle plannen hebben volledige toegang tot functies. Kies gebaseerd op het aantal slots en tegoed dat je nodig hebt!',
    sv: 'Alla planer har full tillgång till funktioner. Välj baserat på antalet platser och krediter du behöver!',
    no: 'Alle planer har full tilgang til funksjoner. Velg basert på antall plasser og kreditter du trenger!'
  },
  'mediaShowcase.slots': {
    pt: 'slots',
    en: 'slots',
    es: 'slots',
    it: 'slot',
    fr: 'emplacements',
    de: 'Slots',
    nl: 'slots',
    sv: 'platser',
    no: 'plasser'
  },
  'mediaShowcase.confirmSlotPurchase': {
    pt: 'Confirmar Compra de Slot VIP',
    en: 'Confirm VIP Slot Purchase',
    es: 'Confirmar Compra de Slot VIP',
    it: 'Conferma Acquisto Slot VIP',
    fr: 'Confirmer Achat Slot VIP',
    de: 'VIP-Slot-Kauf bestätigen',
    nl: 'VIP Slot Aankoop Bevestigen',
    sv: 'Bekräfta VIP Slot Köp',
    no: 'Bekreft VIP Slot Kjøp'
  },
  'mediaShowcase.deductCredits': {
    pt: 'Deseja descontar',
    en: 'Do you want to deduct',
    es: '¿Deseas descontar',
    it: 'Vuoi detrarre',
    fr: 'Voulez-vous déduire',
    de: 'Möchten Sie abziehen',
    nl: 'Wilt u aftrekken',
    sv: 'Vill du dra av',
    no: 'Vil du trekke fra'
  },
  'mediaShowcase.creditsToUnlock': {
    pt: 'créditos para desbloquear +1 slot VIP para upload de',
    en: 'credits to unlock +1 VIP slot for upload of',
    es: 'créditos para desbloquear +1 slot VIP para subida de',
    it: 'crediti per sbloccare +1 slot VIP per caricamento di',
    fr: 'crédits pour débloquer +1 slot VIP pour téléchargement de',
    de: 'Punkte, um +1 VIP-Slot für Upload von',
    nl: 'punten om +1 VIP slot voor upload van',
    sv: 'poäng för att låsa upp +1 VIP plats för uppladdning av',
    no: 'poeng for å låse opp +1 VIP plass for opplasting av'
  },
  'mediaShowcase.image': {
    pt: 'imagem',
    en: 'image',
    es: 'imagen',
    it: 'immagine',
    fr: 'image',
    de: 'Bild',
    nl: 'afbeelding',
    sv: 'bild',
    no: 'bilde'
  },
  'mediaShowcase.video': {
    pt: 'vídeo',
    en: 'video',
    es: 'video',
    it: 'video',
    fr: 'vidéo',
    de: 'Video',
    nl: 'video',
    sv: 'video',
    no: 'video'
  },
  'mediaShowcase.actionCannotBeUndone': {
    pt: 'Esta ação não pode ser desfeita.',
    en: 'This action cannot be undone.',
    es: 'Esta acción no se puede deshacer.',
    it: 'Questa azione non può essere annullata.',
    fr: 'Cette action ne peut pas être annulée.',
    de: 'Diese Aktion kann nicht rückgängig gemacht werden.',
    nl: 'Deze actie kan niet ongedaan worden gemaakt.',
    sv: 'Denna åtgärd kan inte ångras.',
    no: 'Denne handlingen kan ikke angres.'
  },
  'mediaShowcase.no': {
    pt: 'Não',
    en: 'No',
    es: 'No',
    it: 'No',
    fr: 'Non',
    de: 'Nein',
    nl: 'Nee',
    sv: 'Nej',
    no: 'Nei'
  },
  'mediaShowcase.yes': {
    pt: 'Sim',
    en: 'Yes',
    es: 'Sí',
    it: 'Sì',
    fr: 'Oui',
    de: 'Ja',
    nl: 'Ja',
    sv: 'Ja',
    no: 'Ja'
  },
  'mediaShowcase.autoDeleteTimer': {
    pt: '⏱️ Auto Delete Timer',
    en: '⏱️ Auto Delete Timer',
    es: '⏱️ Temporizador Auto-Eliminar',
    it: '⏱️ Timer Auto-Elimina',
    fr: '⏱️ Minuteur Auto-Suppression',
    de: '⏱️ Auto-Lösch-Timer',
    nl: '⏱️ Auto Verwijder Timer',
    sv: '⏱️ Auto Radera Timer',
    no: '⏱️ Auto Slett Timer'
  },
  'mediaShowcase.cancelAutoDelete': {
    pt: '🚫 Cancelar Auto-Delete',
    en: '🚫 Cancel Auto-Delete',
    es: '🚫 Cancelar Auto-Eliminar',
    it: '🚫 Annulla Auto-Elimina',
    fr: '🚫 Annuler Auto-Suppression',
    de: '🚫 Auto-Löschung abbrechen',
    nl: '🚫 Auto Verwijdering Annuleren',
    sv: '🚫 Avbryt Auto-Radering',
    no: '🚫 Avbryt Auto-Sletting'
  },
  'mediaShowcase.replaceImage': {
    pt: '🔄 Trocar Imagem',
    en: '🔄 Replace Image',
    es: '🔄 Reemplazar Imagen',
    it: '🔄 Sostituisci Immagine',
    fr: '🔄 Remplacer Image',
    de: '🔄 Bild ersetzen',
    nl: '🔄 Afbeelding Vervangen',
    sv: '🔄 Ersätt Bild',
    no: '🔄 Erstatt Bilde'
  },
  'mediaShowcase.removeBlur': {
    pt: 'Remover Desfoque',
    en: 'Remove Blur',
    es: 'Quitar Desenfoque',
    it: 'Rimuovi Sfocatura',
    fr: 'Supprimer Flou',
    de: 'Unschärfe entfernen',
    nl: 'Vervaging Verwijderen',
    sv: 'Ta bort Oskärpa',
    no: 'Fjern Uskarphet'
  },
  'mediaShowcase.applyBlur': {
    pt: 'Aplicar Desfoque',
    en: 'Apply Blur',
    es: 'Aplicar Desenfoque',
    it: 'Applica Sfocatura',
    fr: 'Appliquer Flou',
    de: 'Unschärfe anwenden',
    nl: 'Vervaging Toepassen',
    sv: 'Tillämpa Oskärpa',
    no: 'Påfør Uskarphet'
  },
  'mediaShowcase.disableClickUnblur': {
    pt: 'Desativar Clique Desfoque',
    en: 'Disable Click Unblur',
    es: 'Desactivar Clic Desenfocar',
    it: 'Disabilita Clic Desfoca',
    fr: 'Désactiver Clic Déflouter',
    de: 'Klick-Entschärfung deaktivieren',
    nl: 'Klik Ontscherping Uitschakelen',
    sv: 'Inaktivera Klick Oskärpa',
    no: 'Deaktiver Klikk Uskarpt'
  },
  'mediaShowcase.enableClickUnblur': {
    pt: 'Ativar Clique Desfoque',
    en: 'Enable Click Unblur',
    es: 'Activar Clic Desenfocar',
    it: 'Abilita Clic Desfoca',
    fr: 'Activer Clic Déflouter',
    de: 'Klick-Entschärfung aktivieren',
    nl: 'Klik Ontscherping Inschakelen',
    sv: 'Aktivera Klick Oskärpa',
    no: 'Aktiver Klikk Uskarpt'
  },
  'mediaShowcase.setPrice': {
    pt: 'Definir Preço',
    en: 'Set Price',
    es: 'Establecer Precio',
    it: 'Imposta Prezzo',
    fr: 'Définir Prix',
    de: 'Preis festlegen',
    nl: 'Prijs Instellen',
    sv: 'Sätt Pris',
    no: 'Sett Pris'
  },
  'mediaShowcase.setLink': {
    pt: 'Definir Link',
    en: 'Set Link',
    es: 'Establecer Enlace',
    it: 'Imposta Link',
    fr: 'Définir Lien',
    de: 'Link festlegen',
    nl: 'Link Instellen',
    sv: 'Sätt Länk',
    no: 'Sett Lenke'
  },
  'mediaShowcase.mainScreen': {
    pt: 'Tela Principal',
    en: 'Main Screen',
    es: 'Pantalla Principal',
    it: 'Schermo Principale',
    fr: 'Écran Principal',
    de: 'Hauptbildschirm',
    nl: 'Hoofdscherm',
    sv: 'Huvudskärm',
    no: 'Hovedskjerm'
  },
  'mediaShowcase.configureSlideshow': {
    pt: 'Configurar Slideshow',
    en: 'Configure Slideshow',
    es: 'Configurar Presentación',
    it: 'Configura Slideshow',
    fr: 'Configurer Diaporama',
    de: 'Diashow konfigurieren',
    nl: 'Diavoorstelling Configureren',
    sv: 'Konfigurera Bildspel',
    no: 'Konfigurer Lysbildefremvisning'
  },
  'mediaShowcase.resetTimer': {
    pt: 'Reset Timer',
    en: 'Reset Timer',
    es: 'Reiniciar Temporizador',
    it: 'Ripristina Timer',
    fr: 'Réinitialiser Minuteur',
    de: 'Timer zurücksetzen',
    nl: 'Timer Resetten',
    sv: 'Återställ Timer',
    no: 'Tilbakestill Timer'
  },
  'mediaShowcase.delete': {
    pt: 'Deletar',
    en: 'Delete',
    es: 'Eliminar',
    it: 'Elimina',
    fr: 'Supprimer',
    de: 'Löschen',
    nl: 'Verwijderen',
    sv: 'Radera',
    no: 'Slett'
  },
  'mediaShowcase.main': {
    pt: 'Principal',
    en: 'Main',
    es: 'Principal',
    it: 'Principale',
    fr: 'Principal',
    de: 'Haupt',
    nl: 'Hoofd',
    sv: 'Huvud',
    no: 'Hoved'
  },
  'mediaShowcase.vitrineMinimized': {
    pt: 'Vitrine minimizada - clique no botão ˄ para expandir',
    en: 'Showcase minimized - click the ˄ button to expand',
    es: 'Vitrina minimizada - haz clic en el botón ˄ para expandir',
    it: 'Vetrina minimizzata - clicca il pulsante ˄ per espandere',
    fr: 'Vitrine minimisée - cliquez sur le bouton ˄ pour agrandir',
    de: 'Schaufenster minimiert - klicken Sie auf ˄ zum Erweitern',
    nl: 'Etalage geminimaliseerd - klik op ˄ om uit te breiden',
    sv: 'Skyltfönster minimerat - klicka på ˄ för att expandera',
    no: 'Utstillingsvindu minimert - klikk på ˄ for å utvide'
  },
  'mediaShowcase.like': {
    pt: 'Curtir',
    en: 'Like',
    es: 'Me gusta',
    it: 'Mi piace',
    fr: 'J\'aime',
    de: 'Gefällt mir',
    nl: 'Vind ik leuk',
    sv: 'Gilla',
    no: 'Lik'
  },
  'mediaShowcase.share': {
    pt: 'Compartilhar',
    en: 'Share',
    es: 'Compartir',
    it: 'Condividi',
    fr: 'Partager',
    de: 'Teilen',
    nl: 'Delen',
    sv: 'Dela',
    no: 'Del'
  },
  'mediaShowcase.unfixFromVitrine': {
    pt: 'Desfixar da Vitrine',
    en: 'Unpin from Showcase',
    es: 'Desfijar de Vitrina',
    it: 'Sfissa da Vetrina',
    fr: 'Détacher de la Vitrine',
    de: 'Aus Schaufenster lösen',
    nl: 'Losmaken van Etalage',
    sv: 'Lossa från Skyltfönster',
    no: 'Løsne fra Utstillingsvindu'
  },
  'mediaShowcase.fixToVitrine': {
    pt: 'Fixar na Vitrine',
    en: 'Pin to Showcase',
    es: 'Fijar en Vitrina',
    it: 'Fissa in Vetrina',
    fr: 'Épingler à la Vitrine',
    de: 'An Schaufenster anheften',
    nl: 'Vastmaken aan Etalage',
    sv: 'Fäst vid Skyltfönster',
    no: 'Fest til Utstillingsvindu'
  },
  'mediaShowcase.edit': {
    pt: 'Editar',
    en: 'Edit',
    es: 'Editar',
    it: 'Modifica',
    fr: 'Modifier',
    de: 'Bearbeiten',
    nl: 'Bewerken',
    sv: 'Redigera',
    no: 'Rediger'
  },

  // AddCredits component
  'addCredits.title': {
    pt: 'Adicionar Créditos',
    en: 'Add Credits',
    es: 'Agregar Créditos',
    it: 'Aggiungi Crediti',
    fr: 'Ajouter Crédits',
    de: 'Credits hinzufügen',
    nl: 'Credits Toevoegen',
    sv: 'Lägg till Krediter',
    no: 'Legg til Kreditter'
  },
  'addCredits.description': {
    pt: 'Escolha a quantidade de créditos que você deseja adicionar.',
    en: 'Choose the amount of credits you want to add.',
    es: 'Elige la cantidad de créditos que deseas agregar.',
    it: 'Scegli la quantità di crediti che vuoi aggiungere.',
    fr: 'Choisissez la quantité de crédits que vous souhaitez ajouter.',
    de: 'Wählen Sie die Anzahl der Credits, die Sie hinzufügen möchten.',
    nl: 'Kies het aantal credits dat je wilt toevoegen.',
    sv: 'Välj mängden krediter du vill lägga till.',
    no: 'Velg mengden kreditter du vil legge til.'
  },
  'addCredits.customAmount': {
    pt: 'Quantidade customizada',
    en: 'Custom amount',
    es: 'Cantidad personalizada',
    it: 'Quantità personalizzata',
    fr: 'Montant personnalisé',
    de: 'Benutzerdefinierte Menge',
    nl: 'Aangepaste hoeveelheid',
    sv: 'Anpassad mängd',
    no: 'Tilpasset mengde'
  },
  'addCredits.selectAmount': {
    pt: 'Selecione uma quantidade',
    en: 'Select an amount',
    es: 'Selecciona una cantidad',
    it: 'Seleziona una quantità',
    fr: 'Sélectionnez un montant',
    de: 'Wählen Sie eine Menge',
    nl: 'Selecteer een hoeveelheid',
    sv: 'Välj en mängd',
    no: 'Velg en mengde'
  },
  'addCredits.total': {
    pt: 'Total:',
    en: 'Total:',
    es: 'Total:',
    it: 'Totale:',
    fr: 'Total:',
    de: 'Gesamt:',
    nl: 'Totaal:',
    sv: 'Totalt:',
    no: 'Totalt:'
  },
  'addCredits.willReceive': {
    pt: 'Você vai receber',
    en: 'You will receive',
    es: 'Recibirás',
    it: 'Riceverai',
    fr: 'Vous recevrez',
    de: 'Sie erhalten',
    nl: 'Je ontvangt',
    sv: 'Du kommer att få',
    no: 'Du vil motta'
  },
  'addCredits.credits': {
    pt: 'créditos',
    en: 'credits',
    es: 'créditos',
    it: 'crediti',
    fr: 'crédits',
    de: 'Credits',
    nl: 'credits',
    sv: 'krediter',
    no: 'kreditter'
  },
  'addCredits.processing': {
    pt: 'Processando...',
    en: 'Processing...',
    es: 'Procesando...',
    it: 'Elaborazione...',
    fr: 'Traitement...',
    de: 'Verarbeitung...',
    nl: 'Verwerken...',
    sv: 'Bearbetar...',
    no: 'Behandler...'
  },
  'addCredits.continuePayment': {
    pt: 'Continuar para Pagamento',
    en: 'Continue to Payment',
    es: 'Continuar al Pago',
    it: 'Continua al Pagamento',
    fr: 'Continuer vers le Paiement',
    de: 'Zur Zahlung fortfahren',
    nl: 'Doorgaan naar Betaling',
    sv: 'Fortsätt till Betalning',
    no: 'Fortsett til Betaling'
  },

  // MyListPage component
  'myListPage.title': {
    pt: 'Minhas Páginas',
    en: 'My Pages',
    es: 'Mis Páginas', 
    it: 'Le Mie Pagine',
    fr: 'Mes Pages',
    de: 'Meine Seiten',
    nl: 'Mijn Pagina\'s',
    sv: 'Mina Sidor',
    no: 'Mine Sider'
  },
  'myListPage.back': {
    pt: 'Voltar',
    en: 'Back',
    es: 'Volver',
    it: 'Indietro', 
    fr: 'Retour',
    de: 'Zurück',
    nl: 'Terug',
    sv: 'Tillbaka',
    no: 'Tilbake'
  },
  'myListPage.pagesAvailable': {
    pt: 'páginas disponíveis',
    en: 'pages available',
    es: 'páginas disponibles',
    it: 'pagine disponibili',
    fr: 'pages disponibles',
    de: 'Seiten verfügbar',
    nl: 'pagina\'s beschikbaar',
    sv: 'sidor tillgängliga',
    no: 'sider tilgjengelig'
  },
  'myListPage.activated': {
    pt: 'Ativado',
    en: 'Activated',
    es: 'Activado',
    it: 'Attivato',
    fr: 'Activé',
    de: 'Aktiviert',
    nl: 'Geactiveerd',
    sv: 'Aktiverad',
    no: 'Aktivert'
  },
  'myListPage.enter': {
    pt: 'Entrar',
    en: 'Enter',
    es: 'Entrar',
    it: 'Entra',
    fr: 'Entrer',
    de: 'Betreten',
    nl: 'Invoeren',
    sv: 'Gå in',
    no: 'Gå inn'
  },
  'myListPage.configView': {
    pt: 'Config View',
    en: 'Config View',
    es: 'Vista Config',
    it: 'Visualizza Config',
    fr: 'Voir Config',
    de: 'Konfig Ansicht',
    nl: 'Config Weergave',
    sv: 'Config Vy',
    no: 'Config Visning'
  },
  'myListPage.copy': {
    pt: 'Copy',
    en: 'Copy',
    es: 'Copiar',
    it: 'Copia',
    fr: 'Copier',
    de: 'Kopieren',
    nl: 'Kopiëren',
    sv: 'Kopiera',
    no: 'Kopier'
  },

  // PremiumPlansManager component  
  'premiumPlans.title': {
    pt: '✨ Escolha seu Plano Premium',
    en: '✨ Choose your Premium Plan',
    es: '✨ Elige tu Plan Premium',
    it: '✨ Scegli il tuo Piano Premium',
    fr: '✨ Choisir votre Plan Premium',
    de: '✨ Wählen Sie Ihren Premium-Plan',
    nl: '✨ Kies uw Premium Plan',
    sv: '✨ Välj din Premium Plan',
    no: '✨ Velg din Premium Plan'
  },
  'premiumPlans.description': {
    pt: 'Todos os planos incluem todas as funcionalidades. A diferença está nos slots e créditos disponíveis.',
    en: 'All plans include all features. The difference is in available slots and credits.',
    es: 'Todos los planes incluyen todas las funcionalidades. La diferencia está en los slots y créditos disponibles.',
    it: 'Tutti i piani includono tutte le funzionalità. La differenza è negli slot e crediti disponibili.',
    fr: 'Tous les plans incluent toutes les fonctionnalités. La différence réside dans les slots et crédits disponibles.',
    de: 'Alle Pläne enthalten alle Funktionen. Der Unterschied liegt in verfügbaren Slots und Credits.',
    nl: 'Alle plannen bevatten alle functies. Het verschil zit in beschikbare slots en credits.',
    sv: 'Alla planer inkluderar alla funktioner. Skillnaden ligger i tillgängliga slots och krediter.',
    no: 'Alle planer inkluderer alle funksjoner. Forskjellen ligger i tilgjengelige slots og kreditter.'
  },
  'premiumPlans.startFree': {
    pt: 'Começar Grátis',
    en: 'Start Free',
    es: 'Comenzar Gratis',
    it: 'Inizia Gratis',
    fr: 'Commencer Gratuitement',
    de: 'Kostenlos Starten',
    nl: 'Gratis Beginnen',
    sv: 'Börja Gratis',
    no: 'Start Gratis'
  },
  'premiumPlans.choose': {
    pt: 'Escolher',
    en: 'Choose',
    es: 'Elegir',
    it: 'Scegli',
    fr: 'Choisir', 
    de: 'Wählen',
    nl: 'Kiezen',
    sv: 'Välj',
    no: 'Velg'
  },
  'premiumPlans.manageSubscription': {
    pt: 'Gerenciar Assinatura',
    en: 'Manage Subscription',
    es: 'Gestionar Suscripción',
    it: 'Gestisci Abbonamento',
    fr: 'Gérer Abonnement',
    de: 'Abonnement Verwalten',
    nl: 'Abonnement Beheren',
    sv: 'Hantera Prenumeration',
    no: 'Administrer Abonnement'
  },
  'premiumPlans.mostPopular': {
    pt: 'Mais Popular',
    en: 'Most Popular',
    es: 'Más Popular',
    it: 'Più Popolare',
    fr: 'Le Plus Populaire',
    de: 'Am Beliebtesten',
    nl: 'Meest Populair',
    sv: 'Mest Populär',
    no: 'Mest Populær'
  },
  'premiumPlans.bestValue': {
    pt: 'Melhor Valor',
    en: 'Best Value',
    es: 'Mejor Valor',
    it: 'Miglior Valore',
    fr: 'Meilleure Valeur',
    de: 'Bester Wert',
    nl: 'Beste Waarde',
    sv: 'Bästa Värde',
    no: 'Best Verdi'
  },

  // WishlistDialog component
  'wishlist.title': {
    pt: 'Minha Wishlist Especial',
    en: 'My Special Wishlist',
    es: 'Mi Lista de Deseos Especial',
    it: 'La Mia Lista Desideri Speciale',
    fr: 'Ma Liste de Souhaits Spéciale',
    de: 'Meine Spezielle Wunschliste',
    nl: 'Mijn Speciale Verlanglijst',
    sv: 'Min Speciella Önskelista',
    no: 'Min Spesielle Ønskeliste'
  },
  'wishlist.chooseFile': {
    pt: 'Escolher Arquivo',
    en: 'Choose File',
    es: 'Elegir Archivo',
    it: 'Scegli File',
    fr: 'Choisir Fichier',
    de: 'Datei Wählen',
    nl: 'Bestand Kiezen',
    sv: 'Välj Fil',
    no: 'Velg Fil'
  },
  'wishlist.productName': {
    pt: 'Nome do Produto',
    en: 'Product Name',
    es: 'Nombre del Producto',
    it: 'Nome Prodotto',
    fr: 'Nom du Produit',
    de: 'Produktname',
    nl: 'Productnaam',
    sv: 'Produktnamn',
    no: 'Produktnavn'
  },
  'wishlist.creditsRequired': {
    pt: 'Créditos Necessários',
    en: 'Credits Required',
    es: 'Créditos Necesarios',
    it: 'Crediti Richiesti',
    fr: 'Crédits Requis',
    de: 'Erforderliche Credits',
    nl: 'Vereiste Credits',
    sv: 'Nödvändiga Krediter',
    no: 'Nødvendige Kreditter'
  },
  'wishlist.priority': {
    pt: 'Prioridade',
    en: 'Priority',
    es: 'Prioridad',
    it: 'Priorità',
    fr: 'Priorité',
    de: 'Priorität',
    nl: 'Prioriteit',
    sv: 'Prioritet',
    no: 'Prioritet'
  },
  'wishlist.low': {
    pt: '🔵 Baixa',
    en: '🔵 Low',
    es: '🔵 Baja',
    it: '🔵 Bassa',
    fr: '🔵 Faible',
    de: '🔵 Niedrig',
    nl: '🔵 Laag',
    sv: '🔵 Låg',
    no: '🔵 Lav'
  },
  'wishlist.medium': {
    pt: '🟡 Média',
    en: '🟡 Medium',
    es: '🟡 Media',
    it: '🟡 Media', 
    fr: '🟡 Moyenne',
    de: '🟡 Mittel',
    nl: '🟡 Gemiddeld',
    sv: '🟡 Medium',
    no: '🟡 Middels'
  },
  'wishlist.high': {
    pt: '🔴 Alta',
    en: '🔴 High',
    es: '🔴 Alta',
    it: '🔴 Alta',
    fr: '🔴 Élevée',
    de: '🔴 Hoch',
    nl: '🔴 Hoog',
    sv: '🔴 Hög',
    no: '🔴 Høy'
  },

  // IPage component
  'ipage.welcome': {
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
  'ipage.createAccount': {
    pt: 'Crie sua conta e comece agora',
    en: 'Create your account and start now',
    es: 'Crea tu cuenta y comienza ahora',
    it: 'Crea il tuo account e inizia ora',
    fr: 'Créez votre compte et commencez maintenant',
    de: 'Erstellen Sie Ihr Konto und beginnen Sie jetzt',
    nl: 'Maak je account aan en begin nu',
    sv: 'Skapa ditt konto och börja nu',
    no: 'Opprett kontoen din og start nå'
  },
  'ipage.enterAccount': {
    pt: 'Entre na sua conta',
    en: 'Enter your account',
    es: 'Entra en tu cuenta',
    it: 'Accedi al tuo account',
    fr: 'Entrez dans votre compte',
    de: 'Betreten Sie Ihr Konto',
    nl: 'Ga naar je account',
    sv: 'Gå in på ditt konto',
    no: 'Gå inn på kontoen din'
  },
  'ipage.processing': {
    pt: 'Processando...',
    en: 'Processing...',
    es: 'Procesando...',
    it: 'Elaborazione...',
    fr: 'Traitement...',
    de: 'Verarbeitung...',
    nl: 'Verwerken...',
    sv: 'Bearbetar...',
    no: 'Behandler...'
  },
  'ipage.createAccountButton': {
    pt: 'Criar conta',
    en: 'Create account',
    es: 'Crear cuenta',
    it: 'Crea account',
    fr: 'Créer un compte',
    de: 'Konto erstellen',
    nl: 'Account aanmaken',
    sv: 'Skapa konto',
    no: 'Opprett konto'
  },
  'ipage.enterButton': {
    pt: 'Entrar',
    en: 'Enter',
    es: 'Entrar',
    it: 'Entra',
    fr: 'Entrer',
    de: 'Betreten',
    nl: 'Invoeren',
    sv: 'Gå in',
    no: 'Gå inn'
  },

  // Visibility Settings
  'visibility.title': {
    pt: 'Configurações de Visibilidade para Visitantes',
    en: 'Visibility Settings for Visitors',
    es: 'Configuraciones de Visibilidad para Visitantes',
    it: 'Impostazioni Visibilità per Visitatori',
    fr: 'Paramètres de Visibilité pour les Visiteurs',
    de: 'Sichtbarkeitseinstellungen für Besucher',
    nl: 'Zichtbaarheidsinstellingen voor Bezoekers',
    sv: 'Synlighetsinställningar för Besökare',
    no: 'Synlighetsinnstillinger for Besøkende'
  },
  'visibility.titleVisitor': {
    pt: 'Configurações de Visibilidade do Visitante',
    en: 'Visitor Visibility Settings',
    es: 'Configuraciones de Visibilidad del Visitante',
    it: 'Impostazioni Visibilità Visitatore',
    fr: 'Paramètres de Visibilité du Visiteur',
    de: 'Besucher-Sichtbarkeitseinstellungen',
    nl: 'Bezoeker Zichtbaarheidsinstellingen',
    sv: 'Besökares Synlighetsinställningar',
    no: 'Besøkendes Synlighetsinnstillinger'
  },
  'visibility.description': {
    pt: 'Configure quais elementos ficam ocultos quando visitantes acessam sua página através do link compartilhado.',
    en: 'Configure which elements are hidden when visitors access your page through the shared link.',
    es: 'Configura qué elementos están ocultos cuando los visitantes acceden a tu página a través del enlace compartido.',
    it: 'Configura quali elementi sono nascosti quando i visitatori accedono alla tua pagina tramite il link condiviso.',
    fr: 'Configurez quels éléments sont masqués lorsque les visiteurs accèdent à votre page via le lien partagé.',
    de: 'Konfigurieren Sie, welche Elemente verborgen sind, wenn Besucher über den geteilten Link auf Ihre Seite zugreifen.',
    nl: 'Configureer welke elementen verborgen zijn wanneer bezoekers uw pagina bezoeken via de gedeelde link.',
    sv: 'Konfigurera vilka element som är dolda när besökare kommer åt din sida via den delade länken.',
    no: 'Konfigurer hvilke elementer som er skjult når besøkende får tilgang til siden din via den delte lenken.'
  },
  'visibility.descriptionVisitor': {
    pt: 'Configure quais elementos ficam ocultos especificamente na página do visitante livre.',
    en: 'Configure which elements are specifically hidden on the free visitor page.',
    es: 'Configura qué elementos están específicamente ocultos en la página del visitante libre.',
    it: 'Configura quali elementi sono specificamente nascosti nella pagina del visitatore libero.',
    fr: 'Configurez quels éléments sont spécifiquement masqués sur la page du visiteur libre.',
    de: 'Konfigurieren Sie, welche Elemente speziell auf der kostenlosen Besucherseite verborgen sind.',
    nl: 'Configureer welke elementen specifiek verborgen zijn op de gratis bezoekersjpagina.',
    sv: 'Konfigurera vilka element som är specifikt dolda på den kostnadsfria besökarsidan.',
    no: 'Konfigurer hvilke elementer som er spesifikt skjult på den gratis besøkersiden.'
  },
  'visibility.loginRequired': {
    pt: 'Faça login para editar configurações',
    en: 'Login to edit settings',
    es: 'Inicia sesión para editar configuraciones',
    it: 'Accedi per modificare le impostazioni',
    fr: 'Connectez-vous pour modifier les paramètres',
    de: 'Anmelden, um Einstellungen zu bearbeiten',
    nl: 'Log in om instellingen te bewerken',
    sv: 'Logga in för att redigera inställningar',
    no: 'Logg inn for å redigere innstillinger'
  },
  'visibility.creatorOnly': {
    pt: 'Apenas o criador pode editar estas configurações',
    en: 'Only the creator can edit these settings',
    es: 'Solo el creador puede editar estas configuraciones',
    it: 'Solo il creatore può modificare queste impostazioni',
    fr: 'Seul le créateur peut modifier ces paramètres',
    de: 'Nur der Ersteller kann diese Einstellungen bearbeiten',
    nl: 'Alleen de maker kan deze instellingen bewerken',
    sv: 'Endast skaparen kan redigera dessa inställningar',
    no: 'Bare skaperen kan redigere disse innstillingene'
  },
  'visibility.status': {
    pt: 'Desativado = Oculto para visitantes | Ativado = Visível para visitantes',
    en: 'Disabled = Hidden from visitors | Enabled = Visible to visitors',
    es: 'Desactivado = Oculto para visitantes | Activado = Visible para visitantes',
    it: 'Disabilitato = Nascosto ai visitatori | Abilitato = Visibile ai visitatori',
    fr: 'Désactivé = Masqué aux visiteurs | Activé = Visible aux visiteurs',
    de: 'Deaktiviert = Vor Besuchern verborgen | Aktiviert = Für Besucher sichtbar',
    nl: 'Uitgeschakeld = Verborgen voor bezoekers | Ingeschakeld = Zichtbaar voor bezoekers',
    sv: 'Inaktiverad = Dold för besökare | Aktiverad = Synlig för besökare',
    no: 'Deaktivert = Skjult for besøkende | Aktivert = Synlig for besøkende'
  },
  'visibility.updatePage': {
    pt: 'Atualizar página',
    en: 'Update page',
    es: 'Actualizar página',
    it: 'Aggiorna pagina',
    fr: 'Mettre à jour la page',
    de: 'Seite aktualisieren',
    nl: 'Pagina bijwerken',
    sv: 'Uppdatera sida',
    no: 'Oppdater side'
  },
  'visibility.tip': {
    pt: 'Use essas configurações para criar uma experiência personalizada para seus visitantes. Por exemplo, desative os botões de edição para que apenas você possa modificar o conteúdo.',
    en: 'Use these settings to create a personalized experience for your visitors. For example, disable edit buttons so only you can modify content.',
    es: 'Usa estas configuraciones para crear una experiencia personalizada para tus visitantes. Por ejemplo, desactiva los botones de edición para que solo tú puedas modificar el contenido.',
    it: 'Usa queste impostazioni per creare un\'esperienza personalizzata per i tuoi visitatori. Ad esempio, disabilita i pulsanti di modifica così solo tu puoi modificare il contenuto.',
    fr: 'Utilisez ces paramètres pour créer une expérience personnalisée pour vos visiteurs. Par exemple, désactivez les boutons d\'édition pour que vous seul puissiez modifier le contenu.',
    de: 'Verwenden Sie diese Einstellungen, um eine personalisierte Erfahrung für Ihre Besucher zu schaffen. Deaktivieren Sie beispielsweise Bearbeitungsschaltflächen, damit nur Sie Inhalte ändern können.',
    nl: 'Gebruik deze instellingen om een gepersonaliseerde ervaring voor uw bezoekers te creëren. Schakel bijvoorbeeld bewerkingsknoppen uit zodat alleen u inhoud kunt wijzigen.',
    sv: 'Använd dessa inställningar för att skapa en personlig upplevelse för dina besökare. Till exempel, inaktivera redigeringsknapparna så att bara du kan ändra innehåll.',
    no: 'Bruk disse innstillingene for å skape en personlig opplevelse for dine besøkende. For eksempel, deaktiver redigeringsknapper så bare du kan endre innhold.'
  },

  // Palette Config
  'palette.title': {
    pt: 'Configuração de Paletas',
    en: 'Palette Configuration',
    es: 'Configuración de Paletas',
    it: 'Configurazione Tavolozze',
    fr: 'Configuration des Palettes',
    de: 'Paletten-Konfiguration',
    nl: 'Palet Configuratie',
    sv: 'Paletkonfiguration',
    no: 'Palettkonfigurasjon'
  },
  'palette.configPalettes': {
    pt: 'Config Paletas',
    en: 'Config Palettes',
    es: 'Config Paletas',
    it: 'Config Tavolozze',
    fr: 'Config Palettes',
    de: 'Config Paletten',
    nl: 'Config Paletten',
    sv: 'Config Paletter',
    no: 'Config Paletter'
  },
  'palette.basicPalettes': {
    pt: 'Paletas Básicas',
    en: 'Basic Palettes',
    es: 'Paletas Básicas',
    it: 'Tavolozze Base',
    fr: 'Palettes de Base',
    de: 'Grundpaletten',
    nl: 'Basis Paletten',
    sv: 'Grundpaletter',
    no: 'Grunnpaletter'
  },
  'palette.homeActive': {
    pt: 'Paleta Home Ativa',
    en: 'Home Palette Active',
    es: 'Paleta Home Activa',
    it: 'Tavolozza Home Attiva',
    fr: 'Palette Accueil Active',
    de: 'Home-Palette Aktiv',
    nl: 'Home Palet Actief',
    sv: 'Hempalett Aktiv',
    no: 'Hjemmepalett Aktiv'
  },
  'palette.home': {
    pt: 'Paleta Home',
    en: 'Home Palette',
    es: 'Paleta Home',
    it: 'Tavolozza Home',
    fr: 'Palette Accueil',
    de: 'Home-Palette',
    nl: 'Home Palet',
    sv: 'Hempalett',
    no: 'Hjemmepalett'
  },
  'palette.professionalActive': {
    pt: 'Paleta Profissional Prime Ativa',
    en: 'Professional Prime Palette Active',
    es: 'Paleta Profesional Prime Activa',
    it: 'Tavolozza Professionale Prime Attiva',
    fr: 'Palette Professionnelle Prime Active',
    de: 'Professional Prime-Palette Aktiv',
    nl: 'Professioneel Prime Palet Actief',
    sv: 'Professionell Prime-palett Aktiv',
    no: 'Profesjonell Prime-palett Aktiv'
  },
  'palette.professional': {
    pt: 'Paleta Profissional Prime',
    en: 'Professional Prime Palette',
    es: 'Paleta Profesional Prime',
    it: 'Tavolozza Professionale Prime',
    fr: 'Palette Professionnelle Prime',
    de: 'Professional Prime-Palette',
    nl: 'Professioneel Prime Palet',
    sv: 'Professionell Prime-palett',
    no: 'Profesjonell Prime-palett'
  },
  'palette.ecommerceActive': {
    pt: 'Paleta E-commerce Ativa',
    en: 'E-commerce Palette Active',
    es: 'Paleta E-commerce Activa',
    it: 'Tavolozza E-commerce Attiva',
    fr: 'Palette E-commerce Active',
    de: 'E-Commerce-Palette Aktiv',
    nl: 'E-commerce Palet Actief',
    sv: 'E-handelspalett Aktiv',
    no: 'E-handelspalett Aktiv'
  },
  'palette.ecommerce': {
    pt: 'Paleta E-commerce',
    en: 'E-commerce Palette',
    es: 'Paleta E-commerce',
    it: 'Tavolozza E-commerce',
    fr: 'Palette E-commerce',
    de: 'E-Commerce-Palette',
    nl: 'E-commerce Palet',
    sv: 'E-handelspalett',
    no: 'E-handelspalett'
  },
  'palette.fireActive': {
    pt: 'Paleta Fire Ativa',
    en: 'Fire Palette Active',
    es: 'Paleta Fire Activa',
    it: 'Tavolozza Fire Attiva',
    fr: 'Palette Fire Active',
    de: 'Fire-Palette Aktiv',
    nl: 'Fire Palet Actief',
    sv: 'Fire-palett Aktiv',
    no: 'Fire-palett Aktiv'
  },
  'palette.fire': {
    pt: 'Paleta Fire',
    en: 'Fire Palette',
    es: 'Paleta Fire',
    it: 'Tavolozza Fire',
    fr: 'Palette Fire',
    de: 'Fire-Palette',
    nl: 'Fire Palet',
    sv: 'Fire-palett',
    no: 'Fire-palett'
  },
  'palette.simpleColors': {
    pt: 'Cores Simples',
    en: 'Simple Colors',
    es: 'Colores Simples',
    it: 'Colori Semplici',
    fr: 'Couleurs Simples',
    de: 'Einfache Farben',
    nl: 'Eenvoudige Kleuren',
    sv: 'Enkla Färger',
    no: 'Enkle Farger'
  },

  // Common platform texts
  'upload.image': {
    pt: 'Adicionar Imagem',
    en: 'Add Image',
    es: 'Agregar Imagen',
    it: 'Aggiungi Immagine',
    fr: 'Ajouter Image',
    de: 'Bild hinzufügen',
    nl: 'Afbeelding toevoegen',
    sv: 'Lägg till bild',
    no: 'Legg til bilde'
  },
  'upload.video': {
    pt: 'Upload de Vídeo',
    en: 'Upload Video',
    es: 'Subir Video',
    it: 'Carica Video',
    fr: 'Télécharger Vidéo',
    de: 'Video hochladen',
    nl: 'Video uploaden',
    sv: 'Ladda upp video',
    no: 'Last opp video'
  },
  'media.main': {
    pt: 'Principal',
    en: 'Main',
    es: 'Principal',
    it: 'Principale',
    fr: 'Principal',
    de: 'Haupt',
    nl: 'Hoofd',
    sv: 'Huvud',
    no: 'Hoved'
  },
  'vitrine.slide': {
    pt: 'Slide Vitrine',
    en: 'Showcase Slide',
    es: 'Deslizar Vitrina',
    it: 'Scorrimento Vetrina',
    fr: 'Diapositive Vitrine',
    de: 'Schaufenster-Folie',
    nl: 'Showcase dia',
    sv: 'Skyltfönster bild',
    no: 'Utstillingsvindu lysark'
  },
  'notifications.empty': {
    pt: 'Você não tem notificações no momento.',
    en: 'You have no notifications at the moment.',
    es: 'No tienes notificaciones en este momento.',
    it: 'Non hai notifiche al momento.',
    fr: 'Vous n\'avez pas de notifications pour le moment.',
    de: 'Sie haben derzeit keine Benachrichtigungen.',
    nl: 'Je hebt momenteel geen meldingen.',
    sv: 'Du har inga meddelanden för tillfället.',
    no: 'Du har ingen varsler for øyeblikket.'
  },
  'credits': {
    pt: 'Créditos',
    en: 'Credits',
    es: 'Créditos',
    it: 'Crediti',
    fr: 'Crédits',
    de: 'Credits',
    nl: 'Credits',
    sv: 'Krediter',
    no: 'Kreditter'
  },

  // Main page translations
  'main.noMediaSelected': {
    pt: 'Nenhuma mídia selecionada',
    en: 'No media selected',
    es: 'Ningún medio seleccionado',
    it: 'Nessun media selezionato',
    fr: 'Aucun média sélectionné',
    de: 'Keine Medien ausgewählt',
    nl: 'Geen media geselecteerd',
    sv: 'Ingen media vald',
    no: 'Ingen media valgt'
  },
  'main.useButtonsToAdd': {
    pt: 'Use os botões ao lado para adicionar conteúdo',
    en: 'Use the buttons on the side to add content',
    es: 'Usa los botones del lado para agregar contenido',
    it: 'Usa i pulsanti laterali per aggiungere contenuto',
    fr: 'Utilisez les boutons sur le côté pour ajouter du contenu',
    de: 'Verwenden Sie die Schaltflächen seitlich, um Inhalte hinzuzufügen',
    nl: 'Gebruik de knoppen aan de zijkant om inhoud toe te voegen',
    sv: 'Använd knapparna på sidan för att lägga till innehåll',
    no: 'Bruk knappene på siden for å legge til innhold'
  },
  'main.uploadVideo': {
    pt: 'Upload de Vídeo',
    en: 'Upload Video',
    es: 'Subir Video',
    it: 'Carica Video',
    fr: 'Télécharger Vidéo',
    de: 'Video hochladen',
    nl: 'Video uploaden',
    sv: 'Ladda upp video',
    no: 'Last opp video'
  },
  'main.addImage': {
    pt: 'Adicionar Imagem',
    en: 'Add Image',
    es: 'Agregar Imagen',
    it: 'Aggiungi Immagine',
    fr: 'Ajouter Image',
    de: 'Bild hinzufügen',
    nl: 'Afbeelding toevoegen',
    sv: 'Lägg till bild',
    no: 'Legg til bilde'
  },
  'main.actions': {
    pt: 'Ações',
    en: 'Actions',
    es: 'Acciones',
    it: 'Azioni',
    fr: 'Actions',
    de: 'Aktionen',
    nl: 'Acties',
    sv: 'Åtgärder',
    no: 'Handlinger'
  },
  'main.welcome': {
    pt: 'Bem-vindo ao AuraLink',
    en: 'Welcome to AuraLink',
    es: 'Bienvenido a AuraLink',
    it: 'Benvenuto in AuraLink',
    fr: 'Bienvenue sur AuraLink',
    de: 'Willkommen bei AuraLink',
    nl: 'Welkom bij AuraLink',
    sv: 'Välkommen till AuraLink',
    no: 'Velkommen til AuraLink'
  },
  'main.createContent': {
    pt: 'Crie e compartilhe seu conteúdo de forma única',
    en: 'Create and share your content in a unique way',
    es: 'Crea y comparte tu contenido de forma única',
    it: 'Crea e condividi i tuoi contenuti in modo unico',
    fr: 'Créez et partagez votre contenu de manière unique',
    de: 'Erstellen und teilen Sie Ihre Inhalte auf einzigartige Weise',
    nl: 'Maak en deel je content op een unieke manier',
    sv: 'Skapa och dela ditt innehåll på ett unikt sätt',
    no: 'Opprett och del innholdet ditt på en unik måte'
  },
  'main.defaultButtonText': {
    pt: 'get cake 🍰',
    en: 'get cake 🍰',
    es: 'conseguir pastel 🍰',
    it: 'prendi torta 🍰',
    fr: 'avoir gâteau 🍰',
    de: 'Kuchen holen 🍰',
    nl: 'taart halen 🍰',
    sv: 'få tårta 🍰',
    no: 'få kake 🍰'
  },
  'main.getCredits': {
    pt: 'get credit',
    en: 'get credit',
    es: 'obtener crédito',
    it: 'ottieni credito',
    fr: 'obtenir crédit',
    de: 'Kredit erhalten',
    nl: 'krediet krijgen',
    sv: 'få kredit',
    no: 'få kreditt'
  },
  'main.usePix': {
    pt: 'usar pix',
    en: 'use pix',
    es: 'usar pix',
    it: 'usa pix',
    fr: 'utiliser pix',
    de: 'pix verwenden',
    nl: 'pix gebruiken',
    sv: 'använd pix',
    no: 'bruk pix'
  },
  'main.darkMode': {
    pt: 'Modo Escuro',
    en: 'Dark Mode',
    es: 'Modo Oscuro',
    it: 'Modalità Scura',
    fr: 'Mode Sombre',
    de: 'Dunkler Modus',
    nl: 'Donkere Modus',
    sv: 'Mörkt Läge',
    no: 'Mørk Modus'
  },
  'main.lightMode': {
    pt: 'Modo Claro',
    en: 'Light Mode',
    es: 'Modo Claro',
    it: 'Modalità Chiara',
    fr: 'Mode Clair',
    de: 'Heller Modus',
    nl: 'Lichte Modus',
    sv: 'Ljust Läge',
    no: 'Lys Modus'
  },
  'main.darkModeActivated': {
    pt: 'Modo escuro ativado',
    en: 'Dark mode activated',
    es: 'Modo oscuro activado',
    it: 'Modalità scura attivata',
    fr: 'Mode sombre activé',
    de: 'Dunkler Modus aktiviert',
    nl: 'Donkere modus geactiveerd',
    sv: 'Mörkt läge aktiverat',
    no: 'Mørk modus aktivert'
  },
  'main.lightModeActivated': {
    pt: 'Modo claro ativado',
    en: 'Light mode activated',
    es: 'Modo claro activado',
    it: 'Modalità chiara attivata',
    fr: 'Mode clair activé',
    de: 'Heller Modus aktiviert',
    nl: 'Lichte modus geactiveerd',
    sv: 'Ljust läge aktiverat',
    no: 'Lys modus aktivert'
  },
  'main.systemLocked': {
    pt: 'Sistema Bloqueado',
    en: 'System Locked',
    es: 'Sistema Bloqueado',
    it: 'Sistema Bloccato',
    fr: 'Système Verrouillé',
    de: 'System Gesperrt',
    nl: 'Systeem Vergrendeld',
    sv: 'System Låst',
    no: 'System Låst'
  },
  'main.accessRestricted': {
    pt: 'Acesso restrito',
    en: 'Access restricted',
    es: 'Acceso restringido',
    it: 'Accesso limitato',
    fr: 'Accès restreint',
    de: 'Zugang beschränkt',
    nl: 'Toegang beperkt',
    sv: 'Åtkomst begränsad',
    no: 'Tilgang begrenset'
  },
  'main.timerEnded': {
    pt: 'O timer chegou ao fim',
    en: 'The timer has ended',
    es: 'El temporizador ha terminado',
    it: 'Il timer è finito',
    fr: 'Le minuteur est terminé',
    de: 'Der Timer ist abgelaufen',
    nl: 'De timer is afgelopen',
    sv: 'Timern har slutat',
    no: 'Timeren er ferdig'
  },
  'main.timer': {
    pt: 'Cronômetro',
    en: 'Timer',
    es: 'Temporizador',
    it: 'Timer',
    fr: 'Minuteur',
    de: 'Timer',
    nl: 'Timer',
    sv: 'Timer',
    no: 'Timer'
  },
  'main.notifications': {
    pt: 'Notificações',
    en: 'Notifications',
    es: 'Notificaciones',
    it: 'Notifiche',
    fr: 'Notifications',
    de: 'Benachrichtigungen',
    nl: 'Meldingen',
    sv: 'Meddelanden',
    no: 'Varsler'
  },
  'main.collapseIcons': {
    pt: 'Recolher ícones',
    en: 'Collapse icons',
    es: 'Contraer iconos',
    it: 'Comprimi icone',
    fr: 'Réduire les icônes',
    de: 'Symbole einklappen',
    nl: 'Pictogrammen inklappen',
    sv: 'Dölj ikoner',
    no: 'Skjul ikoner'
  },
  'main.expandIcons': {
    pt: 'Expandir ícones',
    en: 'Expand icons',
    es: 'Expandir iconos',
    it: 'Espandi icone',
    fr: 'Étendre les icônes',
    de: 'Symbole erweitern',
    nl: 'Pictogrammen uitklappen',
    sv: 'Visa ikoner',
    no: 'Vis ikoner'
  },

  // Profile Dialog translations
  'profile.title': {
    pt: 'Configurações do Perfil',
    en: 'Profile Settings',
    es: 'Configuraciones del Perfil',
    it: 'Impostazioni Profilo',
    fr: 'Paramètres du Profil',
    de: 'Profil-Einstellungen',
    nl: 'Profielinstellingen',
    sv: 'Profilinställningar',
    no: 'Profilinnstillinger'
  },
  'profile.personalInfo': {
    pt: 'Informações Pessoais',
    en: 'Personal Information',
    es: 'Información Personal',
    it: 'Informazioni Personali',
    fr: 'Informations Personnelles',
    de: 'Persönliche Informationen',
    nl: 'Persoonlijke Informatie',
    sv: 'Personlig Information',
    no: 'Personlig Informasjon'
  },
  'profile.uploadPhoto': {
    pt: 'Upload de Foto',
    en: 'Upload Photo',
    es: 'Subir Foto',
    it: 'Carica Foto',
    fr: 'Télécharger Photo',
    de: 'Foto hochladen',
    nl: 'Foto uploaden',
    sv: 'Ladda upp foto',
    no: 'Last opp foto'
  },
  'profile.fullName': {
    pt: 'Nome Completo',
    en: 'Full Name',
    es: 'Nombre Completo',
    it: 'Nome Completo',
    fr: 'Nom Complet',
    de: 'Vollständiger Name',
    nl: 'Volledige Naam',
    sv: 'Fullständigt Namn',
    no: 'Fullt Navn'
  },
  'profile.primaryEmail': {
    pt: 'Email Principal',
    en: 'Primary Email',
    es: 'Email Principal',
    it: 'Email Primario',
    fr: 'Email Principal',
    de: 'Haupt-E-Mail',
    nl: 'Primaire E-mail',
    sv: 'Primär E-post',
    no: 'Primær E-post'
  },
  'profile.primary': {
    pt: 'Principal',
    en: 'Primary',
    es: 'Principal',
    it: 'Primario',
    fr: 'Principal',
    de: 'Haupt',
    nl: 'Primair',
    sv: 'Primär',
    no: 'Primær'
  },
  'profile.changeEmail': {
    pt: 'Alterar Email',
    en: 'Change Email',
    es: 'Cambiar Email',
    it: 'Cambia Email',
    fr: 'Changer Email',
    de: 'E-Mail ändern',
    nl: 'E-mail wijzigen',
    sv: 'Ändra e-post',
    no: 'Endre e-post'
  },
  'profile.save': {
    pt: 'Salvar',
    en: 'Save',
    es: 'Guardar',
    it: 'Salva',
    fr: 'Enregistrer',
    de: 'Speichern',
    nl: 'Opslaan',
    sv: 'Spara',
    no: 'Lagre'
  },
  'profile.loginEmail': {
    pt: 'Email de Login',
    en: 'Login Email',
    es: 'Email de Inicio',
    it: 'Email di Accesso',
    fr: 'Email de Connexion',
    de: 'Anmelde-E-Mail',
    nl: 'Inlog E-mail',
    sv: 'Inloggnings-e-post',
    no: 'Innloggings-e-post'
  },
  'profile.useLoginEmail': {
    pt: 'Use sempre o Email do cadastro para fazer login',
    en: 'Always use the registration email to log in',
    es: 'Siempre usa el email de registro para iniciar sesión',
    it: 'Usa sempre l\'email di registrazione per accedere',
    fr: 'Utilisez toujours l\'email d\'inscription pour vous connecter',
    de: 'Verwenden Sie immer die Registrierungs-E-Mail zum Anmelden',
    nl: 'Gebruik altijd de registratie-e-mail om in te loggen',
    sv: 'Använd alltid registrerings-e-posten för att logga in',
    no: 'Bruk alltid registrerings-e-posten for å logge inn'
  },
  'profile.validateEmail': {
    pt: 'Validar Email',
    en: 'Validate Email',
    es: 'Validar Email',
    it: 'Valida Email',
    fr: 'Valider Email',
    de: 'E-Mail validieren',
    nl: 'E-mail valideren',
    sv: 'Validera e-post',
    no: 'Valider e-post'
  },
  'profile.validating': {
    pt: 'Validando...',
    en: 'Validating...',
    es: 'Validando...',
    it: 'Validando...',
    fr: 'Validation...',
    de: 'Validierung...',
    nl: 'Valideren...',
    sv: 'Validerar...',
    no: 'Validerer...'
  },
  'profile.changePassword': {
    pt: 'Alterar Senha',
    en: 'Change Password',
    es: 'Cambiar Contraseña',
    it: 'Cambia Password',
    fr: 'Changer Mot de Passe',
    de: 'Passwort ändern',
    nl: 'Wachtwoord wijzigen',
    sv: 'Ändra lösenord',
    no: 'Endre passord'
  },
  'profile.sending': {
    pt: 'Enviando...',
    en: 'Sending...',
    es: 'Enviando...',
    it: 'Invio...',
    fr: 'Envoi...',
    de: 'Senden...',
    nl: 'Versturen...',
    sv: 'Skickar...',
    no: 'Sender...'
  },
  'profile.birthDate': {
    pt: 'Data de Nascimento',
    en: 'Birth Date',
    es: 'Fecha de Nacimiento',
    it: 'Data di Nascita',
    fr: 'Date de Naissance',
    de: 'Geburtsdatum',
    nl: 'Geboortedatum',
    sv: 'Födelsedatum',
    no: 'Fødselsdato'
  },
  'profile.phone': {
    pt: 'Telefone',
    en: 'Phone',
    es: 'Teléfono',
    it: 'Telefono',
    fr: 'Téléphone',
    de: 'Telefon',
    nl: 'Telefoon',
    sv: 'Telefon',
    no: 'Telefon'
  },
  'profile.saveProfile': {
    pt: 'Salvar Perfil',
    en: 'Save Profile',
    es: 'Guardar Perfil',
    it: 'Salva Profilo',
    fr: 'Enregistrer Profil',
    de: 'Profil speichern',
    nl: 'Profiel opslaan',
    sv: 'Spara profil',
    no: 'Lagre profil'
  },
  'profile.saving': {
    pt: 'Salvando...',
    en: 'Saving...',
    es: 'Guardando...',
    it: 'Salvando...',
    fr: 'Enregistrement...',
    de: 'Speichern...',
    nl: 'Opslaan...',
    sv: 'Sparar...',
    no: 'Lagrer...'
  },
  'profile.subscription': {
    pt: 'Assinatura',
    en: 'Subscription',
    es: 'Suscripción',
    it: 'Abbonamento',
    fr: 'Abonnement',
    de: 'Abonnement',
    nl: 'Abonnement',
    sv: 'Prenumeration',
    no: 'Abonnement'
  },
  'profile.currentPlan': {
    pt: 'Plano atual',
    en: 'Current plan',
    es: 'Plan actual',
    it: 'Piano attuale',
    fr: 'Plan actuel',
    de: 'Aktueller Plan',
    nl: 'Huidig plan',
    sv: 'Nuvarande plan',
    no: 'Nåværende plan'
  },
  'profile.status': {
    pt: 'Status',
    en: 'Status',
    es: 'Estado',
    it: 'Stato',
    fr: 'Statut',
    de: 'Status',
    nl: 'Status',
    sv: 'Status',
    no: 'Status'
  },
  'profile.active': {
    pt: 'Ativo',
    en: 'Active',
    es: 'Activo',
    it: 'Attivo',
    fr: 'Actif',
    de: 'Aktiv',
    nl: 'Actief',
    sv: 'Aktiv',
    no: 'Aktiv'
  },
  'profile.free': {
    pt: 'Gratuito',
    en: 'Free',
    es: 'Gratuito',
    it: 'Gratuito',
    fr: 'Gratuit',
    de: 'Kostenlos',
    nl: 'Gratis',
    sv: 'Gratis',
    no: 'Gratis'
  },
  'profile.cancelSubscription': {
    pt: 'Cancelar Assinatura',
    en: 'Cancel Subscription',
    es: 'Cancelar Suscripción',
    it: 'Cancella Abbonamento',
    fr: 'Annuler Abonnement',
    de: 'Abonnement kündigen',
    nl: 'Abonnement opzeggen',
    sv: 'Avbryt prenumeration',
    no: 'Avbryt abonnement'
  },
  'profile.cancel': {
    pt: 'Cancelar',
    en: 'Cancel',
    es: 'Cancelar',
    it: 'Annulla',
    fr: 'Annuler',
    de: 'Abbrechen',
    nl: 'Annuleren',
    sv: 'Avbryt',
    no: 'Avbryt'
  },
  'profile.verifyCode': {
    pt: 'Verificar Código',
    en: 'Verify Code',
    es: 'Verificar Código',
    it: 'Verifica Codice',
    fr: 'Vérifier Code',
    de: 'Code verifizieren',
    nl: 'Code verifiëren',
    sv: 'Verifiera kod',
    no: 'Verifiser kode'
  },
  'profile.verifying': {
    pt: 'Verificando...',
    en: 'Verifying...',
    es: 'Verificando...',
    it: 'Verificando...',
    fr: 'Vérification...',
    de: 'Verifizierung...',
    nl: 'Verifiëren...',
    sv: 'Verifierar...',
    no: 'Verifiserer...'
  },
  'profile.resend': {
    pt: 'Reenviar',
    en: 'Resend',
    es: 'Reenviar',
    it: 'Reinvia',
    fr: 'Renvoyer',
    de: 'Erneut senden',
    nl: 'Opnieuw verzenden',
    sv: 'Skicka igen',
    no: 'Send på nytt'
  },
  'profile.codeExpires': {
    pt: 'Código expira em',
    en: 'Code expires in',
    es: 'El código expira en',
    it: 'Il codice scade tra',
    fr: 'Le code expire dans',
    de: 'Code läuft ab in',
    nl: 'Code verloopt over',
    sv: 'Koden går ut om',
    no: 'Koden utløper om'
  },

  // Premium Features Categories
  'features.uploads.title': {
    pt: '🎬 Uploads e Mídias',
    en: '🎬 Uploads & Media',
    es: '🎬 Subidas y Medios',
    it: '🎬 Upload e Media',
    fr: '🎬 Téléchargements et Médias',
    de: '🎬 Uploads & Medien',
    nl: '🎬 Uploads & Media',
    sv: '🎬 Uppladdningar & Media',
    no: '🎬 Opplastinger & Media'
  },
  'features.customization.title': {
    pt: '🎨 Personalização de Mídia',
    en: '🎨 Media Customization',
    es: '🎨 Personalización de Medios',
    it: '🎨 Personalizzazione Media',
    fr: '🎨 Personnalisation des Médias',
    de: '🎨 Medien-Anpassung',
    nl: '🎨 Media Aanpassing',
    sv: '🎨 Medieanpassning',
    no: '🎨 Mediatilpasning'
  },
  'features.timing.title': {
    pt: '⏱ Controle e Temporização',
    en: '⏱ Control & Timing',
    es: '⏱ Control y Temporización',
    it: '⏱ Controllo e Temporizzazione',
    fr: '⏱ Contrôle et Temporisation',
    de: '⏱ Kontrolle & Timing',
    nl: '⏱ Controle & Timing',
    sv: '⏱ Kontroll & Timing',
    no: '⏱ Kontroll & Timing'
  },
  'features.vitrine.title': {
    pt: '🖼 Vitrine',
    en: '🖼 Showcase',
    es: '🖼 Vitrina',
    it: '🖼 Vetrina',
    fr: '🖼 Vitrine',
    de: '🖼 Schaufenster',
    nl: '🖼 Etalage',
    sv: '🖼 Skyltfönster',
    no: '🖼 Utstillingsvindu'
  },
  'features.chat.title': {
    pt: '💬 Chat',
    en: '💬 Chat',
    es: '💬 Chat',
    it: '💬 Chat',
    fr: '💬 Chat',
    de: '💬 Chat',
    nl: '💬 Chat',
    sv: '💬 Chatt',
    no: '💬 Chat'
  },
  'features.interaction.title': {
    pt: '📊 Interação e Estatísticas',
    en: '📊 Interaction & Statistics',
    es: '📊 Interacción y Estadísticas',
    it: '📊 Interazione e Statistiche',
    fr: '📊 Interaction et Statistiques',
    de: '📊 Interaktion & Statistiken',
    nl: '📊 Interactie & Statistieken',
    sv: '📊 Interaktion & Statistik',
    no: '📊 Interaksjon & Statistikk'
  },
  
  // Individual Features - Uploads
  'features.uploads.changeSlotImage': {
    pt: 'Trocar imagem do slot',
    en: 'Change slot image',
    es: 'Cambiar imagen del slot',
    it: 'Cambia immagine slot',
    fr: 'Changer image du slot',
    de: 'Slot-Bild ändern',
    nl: 'Slot afbeelding wijzigen',
    sv: 'Ändra slot-bild',
    no: 'Endre slot-bilde'
  },
  'features.uploads.pinMedia': {
    pt: 'Fixar mídia na vitrine',
    en: 'Pin media to showcase',
    es: 'Fijar media en vitrina',
    it: 'Fissa media in vetrina',
    fr: 'Épingler média dans vitrine',
    de: 'Medien im Schaufenster anheften',
    nl: 'Media vastpinnen in etalage',
    sv: 'Nåla fast media i skyltfönster',
    no: 'Fest media i utstillingsvindu'
  },
  'features.uploads.createSlideshow': {
    pt: 'Criar slide de mídia',
    en: 'Create media slideshow',
    es: 'Crear presentación de medios',
    it: 'Crea slideshow media',
    fr: 'Créer diaporama média',
    de: 'Medien-Diashow erstellen',
    nl: 'Media diavoorstelling maken',
    sv: 'Skapa media-bildspel',
    no: 'Lag media-lysbildeshow'
  },
  'features.uploads.zoomMainImage': {
    pt: 'Zoom na imagem principal',
    en: 'Zoom main image',
    es: 'Zoom en imagen principal',
    it: 'Zoom immagine principale',
    fr: 'Zoom image principale',
    de: 'Hauptbild zoomen',
    nl: 'Zoom hoofdafbeelding',
    sv: 'Zooma huvudbild',
    no: 'Zoom hovedbilde'
  },
  'features.uploads.zoomChatMedia': {
    pt: 'Zoom em mídia do chat',
    en: 'Zoom chat media',
    es: 'Zoom en media del chat',
    it: 'Zoom media chat',
    fr: 'Zoom média du chat',
    de: 'Chat-Medien zoomen',
    nl: 'Zoom chat media',
    sv: 'Zooma chat-media',
    no: 'Zoom chat-media'
  },
  
  // Individual Features - Customization
  'features.customization.manualBlur': {
    pt: 'Desfocar/focar manual',
    en: 'Manual blur/focus',
    es: 'Desenfocar/enfocar manual',
    it: 'Sfocatura/messa a fuoco manuale',
    fr: 'Flou/mise au point manuelle',
    de: 'Manuelles Unschärfe/Fokus',
    nl: 'Handmatige vervaging/focus',
    sv: 'Manuell oskärpa/fokus',
    no: 'Manuell uskarphet/fokus'
  },
  'features.customization.autoBlur': {
    pt: 'Clique desfoca automático',
    en: 'Click auto-blur',
    es: 'Clic desenfoque automático',
    it: 'Clic sfocatura automatica',
    fr: 'Clic flou automatique',
    de: 'Klick Auto-Unschärfe',
    nl: 'Klik auto-vervaging',
    sv: 'Klick auto-oskärpa',
    no: 'Klikk auto-uskarphet'
  },
  'features.customization.mediaLink': {
    pt: 'Definir link na mídia',
    en: 'Set media link',
    es: 'Definir enlace en media',
    it: 'Imposta link media',
    fr: 'Définir lien média',
    de: 'Medien-Link setzen',
    nl: 'Media link instellen',
    sv: 'Sätt media-länk',
    no: 'Sett media-lenke'
  },
  'features.customization.textPrice': {
    pt: 'Colocar texto (preço/animação)',
    en: 'Add text (price/animation)',
    es: 'Agregar texto (precio/animación)',
    it: 'Aggiungi testo (prezzo/animazione)',
    fr: 'Ajouter texte (prix/animation)',
    de: 'Text hinzufügen (Preis/Animation)',
    nl: 'Tekst toevoegen (prijs/animatie)',
    sv: 'Lägg till text (pris/animation)',
    no: 'Legg til tekst (pris/animasjon)'
  },
  'features.customization.colorPalette': {
    pt: 'Paleta de cores',
    en: 'Color palette',
    es: 'Paleta de colores',
    it: 'Tavolozza colori',
    fr: 'Palette de couleurs',
    de: 'Farbpalette',
    nl: 'Kleurenpalet',
    sv: 'Färgpalett',
    no: 'Fargepalett'
  },
  'features.customization.socialIcons': {
    pt: 'Ícones sociais + links',
    en: 'Social icons + links',
    es: 'Iconos sociales + enlaces',
    it: 'Icone social + link',
    fr: 'Icônes sociales + liens',
    de: 'Social-Icons + Links',
    nl: 'Sociale pictogrammen + links',
    sv: 'Sociala ikoner + länkar',
    no: 'Sosiale ikoner + lenker'
  },
  
  // Individual Features - Timing
  'features.timing.autoDelete': {
    pt: 'Cronômetro autodelete',
    en: 'Auto-delete timer',
    es: 'Cronómetro auto-eliminar',
    it: 'Timer auto-cancellazione',
    fr: 'Minuteur auto-suppression',
    de: 'Auto-Lösch-Timer',
    nl: 'Auto-verwijder timer',
    sv: 'Auto-radera timer',
    no: 'Auto-slett timer'
  },
  'features.timing.mainScreenTimer': {
    pt: 'Cronômetro tela principal',
    en: 'Main screen timer',
    es: 'Cronómetro pantalla principal',
    it: 'Timer schermo principale',
    fr: 'Minuteur écran principal',
    de: 'Hauptbildschirm-Timer',
    nl: 'Hoofdscherm timer',
    sv: 'Huvudskärm timer',
    no: 'Hovedskjerm timer'
  },
  'features.timing.autoLock': {
    pt: 'AutoLock',
    en: 'AutoLock',
    es: 'Bloqueo Automático',
    it: 'Blocco Automatico',
    fr: 'Verrouillage Auto',
    de: 'Auto-Sperre',
    nl: 'Auto-vergrendeling',
    sv: 'Auto-lås',
    no: 'Auto-lås'
  },
  'features.timing.passwordLock': {
    pt: 'Cadeado com senha',
    en: 'Password lock',
    es: 'Bloqueo con contraseña',
    it: 'Blocco con password',
    fr: 'Verrou avec mot de passe',
    de: 'Passwort-Sperre',
    nl: 'Wachtwoord-vergrendeling',
    sv: 'Lösenordslås',
    no: 'Passord-lås'
  },
  
  // Individual Features - Vitrine
  'features.vitrine.backgroundColor': {
    pt: 'Definir cor fundo vitrine',
    en: 'Set showcase background color',
    es: 'Definir color de fondo vitrina',
    it: 'Imposta colore sfondo vetrina',
    fr: 'Définir couleur fond vitrine',
    de: 'Schaufenster-Hintergrundfarbe setzen',
    nl: 'Etalage achtergrondkleur instellen',
    sv: 'Sätt skyltfönster bakgrundsfärg',
    no: 'Sett utstillingsvindu bakgrunnsfarge'
  },
  'features.vitrine.hide': {
    pt: 'Ocultar vitrine',
    en: 'Hide showcase',
    es: 'Ocultar vitrina',
    it: 'Nascondi vetrina',
    fr: 'Masquer vitrine',
    de: 'Schaufenster ausblenden',
    nl: 'Etalage verbergen',
    sv: 'Dölj skyltfönster',
    no: 'Skjul utstillingsvindu'
  },
  'features.vitrine.minimizedText': {
    pt: 'Texto vitrine minimizada',
    en: 'Minimized showcase text',
    es: 'Texto vitrina minimizada',
    it: 'Testo vetrina minimizzata',
    fr: 'Texte vitrine minimisée',
    de: 'Minimierter Schaufenster-Text',
    nl: 'Geminimaliseerde etalage tekst',
    sv: 'Minimerad skyltfönster text',
    no: 'Minimert utstillingsvindu tekst'
  },
  
  // Individual Features - Chat
  'features.chat.close': {
    pt: 'Fechar chat',
    en: 'Close chat',
    es: 'Cerrar chat',
    it: 'Chiudi chat',
    fr: 'Fermer chat',
    de: 'Chat schließen',
    nl: 'Chat sluiten',
    sv: 'Stäng chatt',
    no: 'Lukk chat'
  },
  'features.chat.hideHistory': {
    pt: 'Ocultar histórico',
    en: 'Hide history',
    es: 'Ocultar historial',
    it: 'Nascondi cronologia',
    fr: 'Masquer historique',
    de: 'Verlauf ausblenden',
    nl: 'Geschiedenis verbergen',
    sv: 'Dölj historik',
    no: 'Skjul historikk'
  },
  'features.chat.backgroundColor': {
    pt: 'Cor fundo chat',
    en: 'Chat background color',
    es: 'Color de fondo del chat',
    it: 'Colore sfondo chat',
    fr: 'Couleur fond chat',
    de: 'Chat-Hintergrundfarbe',
    nl: 'Chat achtergrondkleur',
    sv: 'Chat bakgrundsfärg',
    no: 'Chat bakgrunnsfarge'
  },
  'features.chat.messageColor': {
    pt: 'Cor da mensagem',
    en: 'Message color',
    es: 'Color del mensaje',
    it: 'Colore messaggio',
    fr: 'Couleur message',
    de: 'Nachrichtenfarbe',
    nl: 'Berichtkleur',
    sv: 'Meddelandefärg',
    no: 'Meldingsfarge'
  },
  'features.chat.creatorName': {
    pt: 'Nome do criador',
    en: 'Creator name',
    es: 'Nombre del creador',
    it: 'Nome creatore',
    fr: 'Nom du créateur',
    de: 'Ersteller-Name',
    nl: 'Maker naam',
    sv: 'Skaparens namn',
    no: 'Skapernavn'
  },
  'features.chat.creatorPhoto': {
    pt: 'Foto do criador',
    en: 'Creator photo',
    es: 'Foto del creador',
    it: 'Foto creatore',
    fr: 'Photo du créateur',
    de: 'Ersteller-Foto',
    nl: 'Maker foto',
    sv: 'Skaparens foto',
    no: 'Skaperfoto'
  },
  'features.chat.hideUpload': {
    pt: 'Ocultar upload chat',
    en: 'Hide chat upload',
    es: 'Ocultar subida del chat',
    it: 'Nascondi upload chat',
    fr: 'Masquer téléchargement chat',
    de: 'Chat-Upload ausblenden',
    nl: 'Chat upload verbergen',
    sv: 'Dölj chat-uppladdning',
    no: 'Skjul chat-opplasting'
  },
  'features.chat.adjustBoxHeight': {
    pt: 'Ajustar altura caixa',
    en: 'Adjust box height',
    es: 'Ajustar altura de caja',
    it: 'Regola altezza casella',
    fr: 'Ajuster hauteur boîte',
    de: 'Box-Höhe anpassen',
    nl: 'Box hoogte aanpassen',
    sv: 'Justera box-höjd',
    no: 'Juster boks-høyde'
  },
  
  // Individual Features - Interaction
  'features.interaction.likeMedia': {
    pt: 'Like na mídia',
    en: 'Like media',
    es: 'Me gusta en media',
    it: 'Like sui media',
    fr: 'Aimer les médias',
    de: 'Medien liken',
    nl: 'Media liken',
    sv: 'Gilla media',
    no: 'Lik media'
  },
  'features.interaction.shareToSocial': {
    pt: 'Compartilhar redes sociais',
    en: 'Share to social networks',
    es: 'Compartir en redes sociales',
    it: 'Condividi sui social',
    fr: 'Partager sur réseaux sociaux',
    de: 'In sozialen Netzwerken teilen',
    nl: 'Delen op sociale netwerken',
    sv: 'Dela på sociala nätverk',
    no: 'Del på sosiale nettverk'
  },
  'features.interaction.statistics': {
    pt: 'Estatísticas (likes, views)',
    en: 'Statistics (likes, views)',
    es: 'Estadísticas (me gusta, vistas)',
    it: 'Statistiche (like, visualizzazioni)',
    fr: 'Statistiques (j\'aime, vues)',
    de: 'Statistiken (Likes, Aufrufe)',
    nl: 'Statistieken (likes, weergaven)',
    sv: 'Statistik (gillningar, visningar)',
    no: 'Statistikk (likes, visninger)'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('auralink-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('auralink-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};