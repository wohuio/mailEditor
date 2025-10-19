export default {
  editor: {
    label: {
      en: "Email Editor",
    },
    icon: "fontawesome/solid/envelope",
  },
  properties: {
    // Initial Content
    initialContent: {
      label: {
        en: "Initialer Inhalt (HTML)",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "HTML content to load initially",
      },
      propertyHelp: "Lade gespeicherten HTML-Inhalt (optional)",
      /* wwEditor:end */
    },

    // Placeholder
    placeholder: {
      label: {
        en: "Platzhalter Text",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "Schreibe deine Email...",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Placeholder text when editor is empty",
      },
      /* wwEditor:end */
    },

    // Signatures - Simple text field approach
    signaturesJson: {
      label: {
        en: "Signaturen (JSON Format)",
      },
      type: "LongText",
      section: "settings",
      bindable: true,
      defaultValue: '[\n  {"name": "Geschäftlich", "html": "<p>Mit freundlichen Grüßen</p>"},\n  {"name": "Privat", "html": "<p>Viele Grüße</p>"}\n]',
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "JSON array with signature objects. Format: [{name: 'Name', html: '<p>HTML</p>'}]",
      },
      propertyHelp: "JSON Array mit Signaturen. Jedes Objekt: {name: 'Name', html: '<p>HTML</p>'}",
      /* wwEditor:end */
    },

    // Email Header Fields
    fromField: {
      label: {
        en: "Von (Absender)",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Sender email address",
      },
      propertyHelp: "E-Mail-Adresse des Absenders",
      /* wwEditor:end */
    },

    toField: {
      label: {
        en: "An (Empfänger)",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Recipient email address",
      },
      propertyHelp: "E-Mail-Adresse des Empfängers",
      /* wwEditor:end */
    },

    ccField: {
      label: {
        en: "CC",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "CC email address (optional)",
      },
      propertyHelp: "CC E-Mail-Adresse (optional)",
      /* wwEditor:end */
    },

    bccField: {
      label: {
        en: "BCC",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "BCC email address (optional)",
      },
      propertyHelp: "BCC E-Mail-Adresse (optional)",
      /* wwEditor:end */
    },

    subjectField: {
      label: {
        en: "Betreff",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "",
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Email subject",
      },
      propertyHelp: "Betreff der E-Mail",
      /* wwEditor:end */
    },
  },
  triggerEvents: [
    {
      name: "editor-ready",
      label: { en: "Editor bereit" },
      event: { ready: true },
      default: true,
    },
    {
      name: "content-changed",
      label: { en: "Inhalt geändert" },
      event: { html: "" },
    },
  ],
};
