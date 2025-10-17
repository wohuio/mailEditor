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
