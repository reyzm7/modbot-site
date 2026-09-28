/* ══════════════════════════════════════════════════════════════════════
   LE TABLEAU DE BORD DE DÉMONSTRATION

   « À quoi ça ressemble ? » est la question qu'on se pose AVANT
   d'inviter un bot sur son serveur — et la seule réponse qu'on avait
   était des captures d'écran. Ce fichier donne le vrai tableau de bord,
   rempli de données inventées, sans connexion Discord et sans le
   moindre appel au bot.

   Rien ici n'est réel, et rien ne s'enregistre : le mode démo refuse
   tout appel réseau, et le bandeau le dit sur chaque écran. Les noms de
   salons et de rôles sont ceux qu'on trouve sur la plupart des serveurs,
   en anglais court, pour rester lisibles dans les cinq langues du site.
   Les textes de réglage, eux, passent par les traductions.
   ══════════════════════════════════════════════════════════════════════ */

window.MODBOT_DEMO_DONNEES = {
  serveur: {
    // Un identifiant qui ne peut appartenir à personne : les
    // identifiants Discord réels ont 17 à 20 chiffres et commencent par
    // un horodatage. Celui-ci est volontairement impossible.
    id: "000000000000000001",
    member_count: 1284,
    initials: "SD",
    installed: true,
  },

  ressources: {
    channels: [
      { id: "1001", name: "rules", type: "text" },
      { id: "1002", name: "announcements", type: "text" },
      { id: "1003", name: "general", type: "text" },
      { id: "1004", name: "chat", type: "text" },
      { id: "1005", name: "media", type: "text" },
      { id: "1006", name: "support", type: "text" },
      { id: "1007", name: "logs", type: "text" },
      { id: "1008", name: "staff", type: "text" },
      { id: "1009", name: "welcome", type: "text" },
      { id: "1010", name: "bot", type: "text" },
    ],
    voice_channels: [
      { id: "2001", name: "Voice 1" },
      { id: "2002", name: "Voice 2" },
      { id: "2003", name: "AFK" },
    ],
    categories: [
      { id: "3001", name: "INFORMATION" },
      { id: "3002", name: "COMMUNITY" },
      { id: "3003", name: "STAFF" },
    ],
    roles: [
      { id: "4001", name: "Admin", position: 90, managed: false },
      { id: "4002", name: "Moderator", position: 70, managed: false },
      { id: "4003", name: "Helper", position: 50, managed: false },
      { id: "4004", name: "VIP", position: 30, managed: false },
      { id: "4005", name: "Member", position: 10, managed: false },
      { id: "4006", name: "Muted", position: 5, managed: false },
    ],
  },

  // La rubrique Securite a son propre appel : sans cet etat, la vue
  // globale resterait sur « Chargement… » et le panneau serait vide.
  securite: {
    antiraid: { enabled: true, join_threshold: 8, join_window: 10,
                min_account_age_days: 7, action: "lockdown",
                auto_release_minutes: 15, quarantine_new: false },
    antinuke: { enabled: true, punishment: "strip", auto_restore: true,
                trust_owner: true, trust_staff: false,
                whitelist_users: [], whitelist_roles: [] },
    filter: { enabled: true, tolerant: false, immunize_staff: true,
              ladder: [], custom_words: [], allowlist: [] },
    captcha: { enabled: false, role_id: "", channel_id: "" },
    alerts: { dm_admins: true },
    auto_backup: { enabled: true, interval_hours: 24 },
    logs_enabled: {},
    permissions: {},
    safe_mode_active: false,
  },

  /**
   * La configuration montrée. `t` est la fonction de traduction du
   * site : les textes suivent donc la langue choisie, comme le reste.
   */
  config(t) {
    return {
      guild: {
        id: "000000000000000001",
        name: t("demo.serveur"),
        member_count: 1284,
        icon: "",
      },
      channels: {
        logs: "1007", tickets: "1006", suggestions: "1003",
        reports: "1008", patchnotes: "1002",
        staff_alert: "1008", contestations: "1008",
      },
      tickets: {
        author: t("demo.ticketAuteur"),
        title: t("demo.ticketTitre"),
        description: t("demo.ticketTexte"),
        emoji: "📩",
        banner: "", logo: "",
        support_role: "4003",
        options: [],
      },
      security: {
        antilink: true, antilink_channels: ["1005"],
        antispam: true, antispam_channels: [],
        filtre_channels: [], insultes_enabled: true,
        antiraid: true, antiscam: true,
        staff_alert: true, lockdown: false,
        default_words: [], custom_words: [], filtered_words: [],
        repetition: { enabled: true, salons: 3, fenetre: 300,
                      longueur: 12, infraction: true },
        mentions: { enabled: true, max: 6, roles: true },
        pseudos_suivis: true,
      },
      moderation: {
        default_words: [], custom_words: [], filtered_words: [],
        sanctions: [], bans: [],
        max_warnings: 4, expiration_infractions: 90,
      },
      personalization: {
        footer: t("demo.pied"),
        color: "#8B5CF6",
      },
      language: "fr",
      country: "FR",
      welcome: {
        enabled: true, channel_id: "1009",
        departure_enabled: true, departure_channel_id: "1009",
        dm_enabled: false, embed_enabled: true,
        title: t("demo.accueilTitre"),
        message: t("demo.accueilMessage"),
        departure_message: t("demo.departMessage"),
        dm_message: "",
      },
      reaction_roles: [
        { role_id: "4004", emoji: "⭐", label: "VIP" },
        { role_id: "4005", emoji: "✅", label: "Member" },
      ],
      reaction_title: t("demo.rolesTitre"),
      reaction_description: t("demo.rolesTexte"),
      reaction_roles_channel_id: "1001",
      reaction_roles_mode: "Plusieurs rôles possibles",
      reaction_roles_boutons: true,
      auto_roles: { enabled: true, roles: ["4005"], after_captcha: false },
      ai: { enabled: false, channels: [], persona: "",
            available: true, configured: true, provider: "—",
            model: "—", free: true, console: "", env_key: "",
            advice_title: "", advice: "" },
      voice: { enabled: true, hub_channel_id: "2001",
               category_id: "3002", name_template: "🔊 {membre}",
               limit: 0 },
      communaute: {
        xp: true, xp_salon: "1003", xp_message: t("demo.niveauMessage"),
        xp_salons_exclus: ["1010"], recompenses: [], recompenses_cumul: true,
        anniv_salon: "1003", anniv_role: "", anniv_message: "",
        mur_salon: "1002", mur_seuil: 5, mur_emoji: "⭐", mur_exclus: [],
        comptage_salon: "", comptage_repartir: true, comptage_seul: true,
        comptage_record: 0, reactions_auto: [], xp_bonus: [], xp_vocal: true,
      },
      salons_proteges: { enabled: true, salons: [{ id: "1002", mode: "annonces" }],
                         roles_autorises: ["4001", "4002"], annonces: {} },
      modmail: {
        enabled: true, salon: "1008", role: "4002",
        accueil: t("demo.modmailAccueil"),
        anonyme: true, bloques: [], pause: 30, traduire: true,
        ia: false, anciennete: 0, role_requis: "", fermeture: 7,
      },
      reponses: [], relance: { enabled: true, heures: 12, role: "4002" },
      roles_masse: { pause: 3, travail: {} },
      events: { enabled: false, salon: "", role: "" },
      premium: { actif: false, features: [] },
      recurring_messages: [], compteurs: [], social_relays: [],
      ratings: { average: 0, count: 0 },
    };
  },
};
