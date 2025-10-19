<template>
  <div class="email-editor-wrapper">
    <!-- Email Header Fields -->
    <div class="email-header">
      <div class="header-field">
        <label>Von:</label>
        <input
          type="email"
          v-model="fromField"
          placeholder="absender@example.com"
          class="header-input"
        />
      </div>
      <div class="header-field">
        <label>An:</label>
        <input
          type="email"
          v-model="toField"
          placeholder="empfänger@example.com"
          class="header-input"
        />
      </div>
      <div class="header-field">
        <label>CC:</label>
        <input
          type="email"
          v-model="ccField"
          placeholder="cc@example.com (optional)"
          class="header-input"
        />
      </div>
      <div class="header-field">
        <label>BCC:</label>
        <input
          type="email"
          v-model="bccField"
          placeholder="bcc@example.com (optional)"
          class="header-input"
        />
      </div>
      <div class="header-field">
        <label>Betreff:</label>
        <input
          type="text"
          v-model="subjectField"
          placeholder="Ihr Beleg zur Bestellung..."
          class="header-input"
        />
      </div>
    </div>

    <!-- Toolbar -->
    <div class="editor-toolbar">
      <!-- Text formatting -->
      <button type="button" @click="execCommand('bold')" title="Fett" class="format-btn">
        <strong>B</strong>
      </button>
      <button type="button" @click="execCommand('italic')" title="Kursiv" class="format-btn">
        <em>I</em>
      </button>
      <button type="button" @click="execCommand('underline')" title="Unterstrichen" class="format-btn">
        <u>U</u>
      </button>
      <button type="button" @click="clearFormatting" title="Formatierung entfernen" class="format-btn clear-btn">
        R
      </button>

      <span class="separator"></span>

      <!-- Font family -->
      <select
        ref="fontFamilySelect"
        @change="changeFontFamily"
        title="Schriftart"
        class="toolbar-select"
      >
        <option value="">Schriftart</option>
        <option value="Arial">Arial</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Georgia">Georgia</option>
        <option value="Courier New">Courier New</option>
        <option value="Verdana">Verdana</option>
      </select>

      <!-- Font size -->
      <select
        ref="fontSizeSelect"
        @change="changeFontSize"
        title="Schriftgröße"
        class="toolbar-select"
      >
        <option value="">Größe</option>
        <option value="4pt">4pt</option>
        <option value="5pt">5pt</option>
        <option value="6pt">6pt</option>
        <option value="7pt">7pt</option>
        <option value="8pt">8pt</option>
        <option value="9pt">9pt</option>
        <option value="10pt">10pt</option>
        <option value="11pt">11pt</option>
        <option value="12pt">12pt</option>
        <option value="14pt">14pt</option>
        <option value="16pt">16pt</option>
        <option value="18pt">18pt</option>
        <option value="20pt">20pt</option>
        <option value="22pt">22pt</option>
        <option value="24pt">24pt</option>
        <option value="28pt">28pt</option>
        <option value="32pt">32pt</option>
        <option value="36pt">36pt</option>
        <option value="48pt">48pt</option>
        <option value="72pt">72pt</option>
      </select>

      <span class="separator"></span>

      <!-- Line height -->
      <select @change="changeLineHeight" title="Zeilenabstand" class="toolbar-select">
        <option value="">Zeilenabstand</option>
        <option value="1.0">1.0 (Einfach)</option>
        <option value="1.15">1.15</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0 (Doppelt)</option>
        <option value="2.5">2.5</option>
        <option value="3.0">3.0</option>
      </select>

      <span class="separator"></span>

      <!-- Text color -->
      <input
        type="color"
        @change="changeTextColor"
        title="Textfarbe"
        class="toolbar-color"
        value="#000000"
      />

      <!-- Background color -->
      <input
        type="color"
        @change="changeBackColor"
        title="Hintergrundfarbe"
        class="toolbar-color"
        value="#ffff00"
      />

      <span class="separator"></span>

      <!-- Text alignment -->
      <button type="button" @click="setTextAlign('left')" title="Linksbündig" class="format-btn align-left">
        <span class="icon-lines">
          <span class="line" style="width: 80%"></span>
          <span class="line" style="width: 60%"></span>
          <span class="line" style="width: 70%"></span>
        </span>
      </button>
      <button type="button" @click="setTextAlign('center')" title="Zentriert" class="format-btn align-center">
        <span class="icon-lines">
          <span class="line" style="width: 60%; margin: 0 auto"></span>
          <span class="line" style="width: 80%; margin: 0 auto"></span>
          <span class="line" style="width: 50%; margin: 0 auto"></span>
        </span>
      </button>
      <button type="button" @click="setTextAlign('right')" title="Rechtsbündig" class="format-btn align-right">
        <span class="icon-lines">
          <span class="line" style="width: 80%; margin-left: auto"></span>
          <span class="line" style="width: 60%; margin-left: auto"></span>
          <span class="line" style="width: 70%; margin-left: auto"></span>
        </span>
      </button>

      <span class="separator"></span>

      <!-- Lists -->
      <button type="button" @click="execCommand('insertUnorderedList')" title="Liste" class="format-btn">
        &#8226;
      </button>
      <button type="button" @click="execCommand('insertOrderedList')" title="Nummerierte Liste" class="format-btn">
        1.
      </button>

      <span class="separator"></span>

      <!-- Link -->
      <button type="button" @click="insertLink" title="Link einfügen">
        Link
      </button>

      <span class="separator"></span>

      <!-- Image -->
      <button type="button" @click="insertImage" title="Bild einfügen">
        🖼️
      </button>
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        style="display: none;"
        @change="handleImageUpload"
      />

      <!-- Signature Dropdown -->
      <span class="separator" v-if="showSigDropdown && signatures.length > 0"></span>

      <select
        v-if="showSigDropdown && signatures.length > 0"
        @change="insertSignature"
        class="toolbar-select signature-select"
        title="Signatur einfügen"
      >
        <option value="">Signatur wählen</option>
        <option v-for="(sig, index) in signatures" :key="index" :value="index">
          {{ sig.name }}
        </option>
      </select>
    </div>

    <!-- Editor iframe -->
    <iframe
      ref="editorFrame"
      class="editor-iframe"
      :class="{ 'editor-editing': isEditing }"
      :style="{ height: editorHeightPx }"
    ></iframe>

    <!-- HTML Preview (Editor Only) -->
    <!-- wwEditor:start -->
    <div v-if="isEditing && htmlOutput" class="html-preview">
      <details>
        <summary>HTML Code (nur im Editor sichtbar)</summary>
        <pre>{{ htmlOutput }}</pre>
      </details>
    </div>
    <!-- wwEditor:end -->
  </div>
</template>

<script>
// Suppress ResizeObserver errors by wrapping it
(function() {
  if (!window.resizeObserverPatched) {
    var OriginalResizeObserver = window.ResizeObserver;

    window.ResizeObserver = function(callback) {
      var wrappedCallback = function(entries, observer) {
        window.requestAnimationFrame(function() {
          try {
            callback(entries, observer);
          } catch (e) {
            // Silently catch ResizeObserver errors
          }
        });
      };
      return new OriginalResizeObserver(wrappedCallback);
    };

    window.ResizeObserver.prototype = OriginalResizeObserver.prototype;
    window.resizeObserverPatched = true;
  }

  // Also suppress the error messages
  var originalError = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    if (message && typeof message === 'string' && message.indexOf('ResizeObserver') !== -1) {
      return true;
    }
    if (error && error.message && error.message.indexOf('ResizeObserver') !== -1) {
      return true;
    }
    if (originalError) {
      return originalError(message, source, lineno, colno, error);
    }
    return false;
  };

  window.addEventListener('error', function(event) {
    if (event.message && event.message.indexOf('ResizeObserver') !== -1) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  }, true);
})();

export default {
  name: 'EmailEditorComponent',
  props: {
    uid: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      default: function() {
        return {};
      }
    },
    /* wwEditor:start */
    wwEditorState: {
      type: Object,
      default: function() {
        return {};
      }
    }
    /* wwEditor:end */
  },
  data: function() {
    return {
      htmlOutput: '',
      updateTimer: null,
      editorDoc: null,
      editorWindow: null,
      toolbarUpdateTimer: null
    };
  },
  computed: {
    isEditing: function() {
      /* wwEditor:start */
      if (!this.wwEditorState) return false;
      return this.wwEditorState.isEditing === true;
      /* wwEditor:end */
      /* wwEditor:remove */
      return false;
      /* wwEditor:end-remove */
    },
    placeholderText: function() {
      if (!this.content) return 'Schreibe deine Email...';
      return this.content.placeholder || 'Schreibe deine Email...';
    },
    fromField: {
      get: function() {
        return this.content && this.content.fromField !== undefined ? this.content.fromField : '';
      },
      set: function(value) {
        this.$emit('update:content', Object.assign({}, this.content, { fromField: value }));
        this.updateEmailHeaderVariables();
      }
    },
    toField: {
      get: function() {
        return this.content && this.content.toField !== undefined ? this.content.toField : '';
      },
      set: function(value) {
        this.$emit('update:content', Object.assign({}, this.content, { toField: value }));
        this.updateEmailHeaderVariables();
      }
    },
    ccField: {
      get: function() {
        return this.content && this.content.ccField !== undefined ? this.content.ccField : '';
      },
      set: function(value) {
        this.$emit('update:content', Object.assign({}, this.content, { ccField: value }));
        this.updateEmailHeaderVariables();
      }
    },
    bccField: {
      get: function() {
        return this.content && this.content.bccField !== undefined ? this.content.bccField : '';
      },
      set: function(value) {
        this.$emit('update:content', Object.assign({}, this.content, { bccField: value }));
        this.updateEmailHeaderVariables();
      }
    },
    subjectField: {
      get: function() {
        return this.content && this.content.subjectField !== undefined ? this.content.subjectField : '';
      },
      set: function(value) {
        this.$emit('update:content', Object.assign({}, this.content, { subjectField: value }));
        this.updateEmailHeaderVariables();
      }
    },
    editorHeightPx: function() {
      var height = this.content && this.content.editorHeight !== undefined ? this.content.editorHeight : 600;
      return height + 'px';
    },
    showSigDropdown: function() {
      return this.signatures.length > 0;
    },
    signatures: function() {
      if (!this.content || !this.content.signaturesJson) return [];

      var signaturesJson = this.content.signaturesJson;

      // If it's already an array (from binding), use it directly
      if (Array.isArray(signaturesJson)) {
        return signaturesJson.filter(function(sig) {
          return sig && sig.name && sig.html;
        });
      }

      // Otherwise parse JSON string
      if (typeof signaturesJson !== 'string') return [];

      try {
        var parsed = JSON.parse(signaturesJson);
        if (!Array.isArray(parsed)) return [];

        return parsed.filter(function(sig) {
          return sig && sig.name && sig.html;
        });
      } catch (e) {
        console.warn('Email Editor: Invalid signatures JSON', e);
        return [];
      }
    }
  },
  watch: {
    'content.initialContent': function(newContent) {
      if (newContent && this.editorDoc && this.editorDoc.body) {
        this.editorDoc.body.innerHTML = newContent;
        this.updateVariable();
      }
    }
  },
  mounted: function() {
    this.registerVariable();

    var self = this;
    this.$nextTick(function() {
      setTimeout(function() {
        self.initializeEditor();
      }, 100);
    });
  },
  beforeDestroy: function() {
    // Clean up
    if (this.updateTimer) {
      clearTimeout(this.updateTimer);
    }
  },
  methods: {
    initializeEditor: function() {
      var self = this;

      try {
        var iframe = this.$refs.editorFrame;

        if (!iframe) return;

        this.editorDoc = iframe.contentDocument || iframe.contentWindow.document;
        this.editorWindow = iframe.contentWindow;

        // Setup iframe document
        this.editorDoc.open();
        this.editorDoc.write(
          '<!DOCTYPE html>' +
          '<html>' +
          '<head>' +
          '<style>' +
          'body {' +
          '  margin: 0;' +
          '  padding: 20px;' +
          '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;' +
          '  font-size: 14px;' +
          '  line-height: 1.6;' +
          '  color: #333;' +
          '}' +
          'body:empty::before {' +
          '  content: "' + this.placeholderText + '";' +
          '  color: #999;' +
          '  pointer-events: none;' +
          '}' +
          'h1 { font-size: 2em; margin: 0.67em 0; }' +
          'h2 { font-size: 1.5em; margin: 0.75em 0; }' +
          'p { margin: 1em 0; }' +
          'ul, ol { margin: 1em 0; padding-left: 40px; }' +
          'a { color: #007AFF; text-decoration: underline; }' +
          'img { max-width: 100%; height: auto; }' +
          '</style>' +
          '</head>' +
          '<body contenteditable="true"></body>' +
          '</html>'
        );
        this.editorDoc.close();

        // Load initial content
        if (this.content && this.content.initialContent) {
          this.editorDoc.body.innerHTML = this.content.initialContent;
        }

        // Setup input listener
        this.editorDoc.body.addEventListener('input', function() {
          self.onInput();
        });

        // Setup paste listener
        this.editorDoc.body.addEventListener('paste', function(e) {
          self.onPaste(e);
        });

        // Setup selection change listener to update toolbar
        this.editorDoc.addEventListener('selectionchange', function() {
          self.updateToolbarState();
        });

        // Also listen on mouseup and keyup
        this.editorDoc.body.addEventListener('mouseup', function() {
          self.updateToolbarState();
        });

        this.editorDoc.body.addEventListener('keyup', function() {
          self.updateToolbarState();
        });

        // Set initial HTML value
        self.updateVariable();

        // Emit ready event
        this.$nextTick(function() {
          self.$emit('trigger-event', {
            name: 'editor-ready',
            event: { ready: true }
          });
        });
      } catch (err) {
        console.error('Error initializing editor:', err);
      }
    },

    execCommand: function(command, value) {
      if (!this.editorDoc) return;

      // Focus iframe first
      if (this.editorWindow) {
        this.editorWindow.focus();
      }

      // Execute command on iframe document
      this.editorDoc.execCommand(command, false, value || null);

      // Trigger update
      var self = this;
      setTimeout(function() {
        self.onInput();
      }, 50);
    },

    clearFormatting: function() {
      if (!this.editorDoc || !this.editorWindow) return;

      var selection = this.editorWindow.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      // Get selected text
      var range = selection.getRangeAt(0);
      var selectedText = range.toString();

      if (selectedText) {
        // Remove formatting by replacing with plain text
        this.editorDoc.execCommand('removeFormat', false, null);
        this.editorDoc.execCommand('unlink', false, null);

        var self = this;
        setTimeout(function() {
          self.onInput();
        }, 50);
      }
    },

    insertLink: function() {
      var url = window.prompt('URL eingeben:');
      if (url) {
        this.execCommand('createLink', url);
      }
    },

    changeFontFamily: function(event) {
      var font = event.target.value;
      if (font) {
        this.execCommand('fontName', font);
        event.target.value = '';
      }
    },

    changeFontSize: function(event) {
      var size = event.target.value;
      if (size) {
        // Use CSS styling for precise font sizes
        if (this.editorWindow) {
          this.editorWindow.focus();
        }

        if (this.editorDoc) {
          // Wrap selection in span with font-size
          this.editorDoc.execCommand('fontSize', false, '7');

          // Find the font tags and replace with spans
          var fontElements = this.editorDoc.getElementsByTagName('font');
          for (var i = fontElements.length - 1; i >= 0; i--) {
            var font = fontElements[i];
            if (font.size === '7') {
              var span = this.editorDoc.createElement('span');
              span.style.fontSize = size;
              span.innerHTML = font.innerHTML;
              font.parentNode.replaceChild(span, font);
            }
          }
        }

        event.target.value = '';

        var self = this;
        setTimeout(function() {
          self.onInput();
        }, 50);
      }
    },

    changeLineHeight: function(event) {
      var lineHeight = event.target.value;
      if (lineHeight) {
        if (this.editorWindow) {
          this.editorWindow.focus();
        }

        if (this.editorDoc) {
          // Apply line-height to selected block
          var selection = this.editorWindow.getSelection();
          if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var container = range.commonAncestorContainer;

            // Find parent block element
            var blockElement = container.nodeType === 3 ? container.parentNode : container;
            while (blockElement && !this.isBlockElement(blockElement)) {
              blockElement = blockElement.parentNode;
            }

            if (blockElement && blockElement !== this.editorDoc.body) {
              blockElement.style.lineHeight = lineHeight;
            }
          }
        }

        event.target.value = '';

        var self = this;
        setTimeout(function() {
          self.onInput();
        }, 50);
      }
    },

    isBlockElement: function(element) {
      var blockTags = ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI', 'BLOCKQUOTE'];
      return element && blockTags.indexOf(element.tagName) !== -1;
    },

    setTextAlign: function(alignment) {
      if (!this.editorDoc || !this.editorWindow) return;

      if (this.editorWindow) {
        this.editorWindow.focus();
      }

      var selection = this.editorWindow.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      var range = selection.getRangeAt(0);
      var container = range.commonAncestorContainer;

      // Find parent block element
      var blockElement = container.nodeType === 3 ? container.parentNode : container;
      while (blockElement && blockElement !== this.editorDoc.body && !this.isBlockElement(blockElement)) {
        blockElement = blockElement.parentNode;
      }

      // If no block element found, wrap selection in a div
      if (!blockElement || blockElement === this.editorDoc.body) {
        this.editorDoc.execCommand('formatBlock', false, 'div');
        // Get the newly created block
        selection = this.editorWindow.getSelection();
        if (selection && selection.rangeCount > 0) {
          range = selection.getRangeAt(0);
          container = range.commonAncestorContainer;
          blockElement = container.nodeType === 3 ? container.parentNode : container;
          while (blockElement && blockElement !== this.editorDoc.body && !this.isBlockElement(blockElement)) {
            blockElement = blockElement.parentNode;
          }
        }
      }

      // Apply text-align style
      if (blockElement && blockElement !== this.editorDoc.body) {
        blockElement.style.textAlign = alignment;
      }

      var self = this;
      setTimeout(function() {
        self.onInput();
      }, 50);
    },

    changeTextColor: function(event) {
      var color = event.target.value;
      this.execCommand('foreColor', color);
    },

    changeBackColor: function(event) {
      var color = event.target.value;
      this.execCommand('backColor', color);
    },

    insertImage: function() {
      if (this.$refs.imageInput) {
        this.$refs.imageInput.click();
      }
    },

    handleImageUpload: function(event) {
      var self = this;
      var file = event.target.files[0];

      if (!file) return;

      // Check if it's an image
      if (!file.type.match('image.*')) {
        alert('Bitte wählen Sie eine Bilddatei (PNG, JPG, GIF)');
        return;
      }

      // Read file as data URL
      var reader = new FileReader();

      reader.onload = function(e) {
        var dataUrl = e.target.result;

        // Insert image into editor
        if (self.editorDoc) {
          self.editorDoc.execCommand('insertImage', false, dataUrl);
        }

        // Clear input
        if (self.$refs.imageInput) {
          self.$refs.imageInput.value = '';
        }

        // Trigger update
        setTimeout(function() {
          self.onInput();
        }, 50);
      };

      reader.readAsDataURL(file);
    },

    insertSignature: function(event) {
      var index = event.target.value;
      if (!index && index !== 0) return;

      var signature = this.signatures[parseInt(index)];
      if (!signature || !signature.html) return;

      // Insert signature at end of document
      if (this.editorDoc && this.editorDoc.body) {
        // Add some spacing before signature
        var currentContent = this.editorDoc.body.innerHTML;
        if (currentContent && currentContent.trim() !== '') {
          this.editorDoc.body.innerHTML = currentContent + '<br><br>' + signature.html;
        } else {
          this.editorDoc.body.innerHTML = signature.html;
        }
      }

      // Reset dropdown
      event.target.value = '';

      // Trigger update
      var self = this;
      setTimeout(function() {
        self.onInput();
      }, 50);
    },

    onInput: function() {
      var self = this;

      if (this.updateTimer) {
        clearTimeout(this.updateTimer);
      }

      this.updateTimer = setTimeout(function() {
        self.updateVariable();
        self.emitContentChanged();
      }, 300);
    },

    onPaste: function(e) {
      e.preventDefault();

      var text = '';
      if (e.clipboardData || e.originalEvent.clipboardData) {
        text = (e.originalEvent || e).clipboardData.getData('text/plain');
      } else if (window.clipboardData) {
        text = window.clipboardData.getData('Text');
      }

      if (this.editorDoc) {
        this.editorDoc.execCommand('insertText', false, text);
      }
    },

    getHtml: function() {
      if (!this.editorDoc || !this.editorDoc.body) return '';

      // Get body content
      var bodyContent = this.editorDoc.body.innerHTML;

      // Return full HTML document
      return '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<meta charset="UTF-8">' +
        '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '<style>' +
        'body {' +
        '  margin: 0;' +
        '  padding: 20px;' +
        '  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;' +
        '  font-size: 14px;' +
        '  line-height: 1.6;' +
        '  color: #333;' +
        '}' +
        'h1 { font-size: 2em; margin: 0.67em 0; }' +
        'h2 { font-size: 1.5em; margin: 0.75em 0; }' +
        'p { margin: 1em 0; }' +
        'ul, ol { margin: 1em 0; padding-left: 40px; }' +
        'a { color: #007AFF; text-decoration: underline; }' +
        'img { max-width: 100%; height: auto; }' +
        '</style>' +
        '</head>' +
        '<body>' +
        bodyContent +
        '</body>' +
        '</html>';
    },

    registerVariable: function() {
      if (typeof wwLib === 'undefined') return;
      if (!wwLib.wwVariable) return;
      if (!wwLib.wwVariable.useComponentVariable) return;

      try {
        // Register HTML content variable
        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'html',
          type: 'string',
          defaultValue: ''
        });

        // Register email header variables
        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'from',
          type: 'string',
          defaultValue: ''
        });

        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'to',
          type: 'string',
          defaultValue: ''
        });

        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'cc',
          type: 'string',
          defaultValue: ''
        });

        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'bcc',
          type: 'string',
          defaultValue: ''
        });

        wwLib.wwVariable.useComponentVariable({
          uid: this.uid,
          name: 'subject',
          type: 'string',
          defaultValue: ''
        });
      } catch (err) {
        console.warn('Could not register variable:', err);
      }
    },

    updateVariable: function() {
      var html = this.getHtml();
      this.htmlOutput = html;

      console.log('Email Editor: Updating html variable, length:', html.length);

      if (typeof wwLib === 'undefined') {
        console.warn('Email Editor: wwLib is undefined');
        return;
      }
      if (!wwLib.wwVariable) {
        console.warn('Email Editor: wwLib.wwVariable is undefined');
        return;
      }
      if (!wwLib.wwVariable.updateComponentVariable) {
        console.warn('Email Editor: wwLib.wwVariable.updateComponentVariable is undefined');
        return;
      }

      try {
        wwLib.wwVariable.updateComponentVariable(this.uid, 'html', html);
        console.log('Email Editor: Variable updated successfully');
      } catch (err) {
        console.warn('Email Editor: Could not update variable:', err);
      }
    },

    emitContentChanged: function() {
      this.$emit('trigger-event', {
        name: 'content-changed',
        event: { html: this.getHtml() }
      });
    },

    clearContent: function() {
      if (this.editorDoc && this.editorDoc.body) {
        this.editorDoc.body.innerHTML = '';
        this.updateVariable();
      }
    },

    setContent: function(html) {
      if (this.editorDoc && this.editorDoc.body) {
        this.editorDoc.body.innerHTML = html;
        this.updateVariable();
      }
    },

    getContent: function() {
      return this.getHtml();
    },

    updateToolbarState: function() {
      var self = this;

      // Debounce toolbar updates
      if (this.toolbarUpdateTimer) {
        clearTimeout(this.toolbarUpdateTimer);
      }

      this.toolbarUpdateTimer = setTimeout(function() {
        self.performToolbarUpdate();
      }, 100);
    },

    performToolbarUpdate: function() {
      if (!this.editorWindow || !this.editorDoc) return;

      try {
        var selection = this.editorWindow.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        var range = selection.getRangeAt(0);

        // If selection is collapsed (just cursor, no selection), use cursor position
        if (range.collapsed) {
          var container = range.startContainer;
          var element = container.nodeType === 3 ? container.parentNode : container;

          this.updateDropdownsForElement(element);
        } else {
          // For multi-element selections, get the start element
          var startContainer = range.startContainer;
          var startElement = startContainer.nodeType === 3 ? startContainer.parentNode : startContainer;

          this.updateDropdownsForElement(startElement);
        }
      } catch (e) {
        // Ignore errors
      }
    },

    updateDropdownsForElement: function(element) {
      // Update font family dropdown
      if (this.$refs.fontFamilySelect) {
        var fontFamily = this.getEffectiveFontFamily(element);

        // Try to match with dropdown options
        var options = this.$refs.fontFamilySelect.options;
        var matched = false;
        for (var i = 0; i < options.length; i++) {
          if (options[i].value) {
            var optionValue = options[i].value.toLowerCase();
            if (fontFamily.toLowerCase().indexOf(optionValue) !== -1 ||
                optionValue.indexOf(fontFamily.toLowerCase()) !== -1) {
              this.$refs.fontFamilySelect.value = options[i].value;
              matched = true;
              break;
            }
          }
        }
        if (!matched) {
          this.$refs.fontFamilySelect.value = '';
        }
      }

      // Update font size dropdown
      if (this.$refs.fontSizeSelect) {
        var fontSize = this.getEffectiveFontSize(element);

        // Try to match with dropdown options (with tolerance)
        var options = this.$refs.fontSizeSelect.options;
        var matched = false;
        for (var i = 0; i < options.length; i++) {
          if (options[i].value) {
            var optionPt = parseFloat(options[i].value);
            if (Math.abs(optionPt - fontSize) <= 1) {
              this.$refs.fontSizeSelect.value = options[i].value;
              matched = true;
              break;
            }
          }
        }
        if (!matched) {
          this.$refs.fontSizeSelect.value = '';
        }
      }
    },

    getEffectiveFontFamily: function(element) {
      // Traverse up the DOM tree to find the first explicit font-family
      var currentElement = element;

      while (currentElement && currentElement !== this.editorDoc.body) {
        if (currentElement.style && currentElement.style.fontFamily) {
          var fontFamily = currentElement.style.fontFamily;
          fontFamily = fontFamily.replace(/['"]/g, '').split(',')[0].trim();
          return fontFamily;
        }

        // Check for font tags
        if (currentElement.tagName === 'FONT' && currentElement.face) {
          return currentElement.face;
        }

        currentElement = currentElement.parentNode;
      }

      // Fall back to computed style
      var computedStyle = this.editorWindow.getComputedStyle(element);
      var fontFamily = computedStyle.fontFamily;
      fontFamily = fontFamily.replace(/['"]/g, '').split(',')[0].trim();
      return fontFamily;
    },

    getEffectiveFontSize: function(element) {
      // Traverse up the DOM tree to find the first explicit font-size
      var currentElement = element;

      while (currentElement && currentElement !== this.editorDoc.body) {
        if (currentElement.style && currentElement.style.fontSize) {
          return this.convertToPoints(currentElement.style.fontSize);
        }

        currentElement = currentElement.parentNode;
      }

      // Fall back to computed style
      var computedStyle = this.editorWindow.getComputedStyle(element);
      return this.convertToPoints(computedStyle.fontSize);
    },

    convertToPoints: function(fontSize) {
      if (!fontSize) return 12;

      if (fontSize.indexOf('pt') !== -1) {
        return parseFloat(fontSize);
      } else if (fontSize.indexOf('px') !== -1) {
        // Convert px to pt (1pt = 1.333px approximately)
        var pxSize = parseFloat(fontSize);
        return Math.round(pxSize * 0.75);
      } else if (fontSize.indexOf('em') !== -1) {
        // Rough conversion: 1em = 12pt (base font size)
        var emSize = parseFloat(fontSize);
        return Math.round(emSize * 12);
      } else if (fontSize.indexOf('%') !== -1) {
        // Rough conversion: 100% = 12pt (base font size)
        var percentSize = parseFloat(fontSize);
        return Math.round((percentSize / 100) * 12);
      }

      return 12;
    },

    updateEmailHeaderVariables: function() {
      // Update component variables for output
      if (typeof wwLib !== 'undefined' && wwLib.wwVariable && wwLib.wwVariable.updateComponentVariable) {
        try {
          wwLib.wwVariable.updateComponentVariable(this.uid, 'from', this.fromField);
          wwLib.wwVariable.updateComponentVariable(this.uid, 'to', this.toField);
          wwLib.wwVariable.updateComponentVariable(this.uid, 'cc', this.ccField);
          wwLib.wwVariable.updateComponentVariable(this.uid, 'bcc', this.bccField);
          wwLib.wwVariable.updateComponentVariable(this.uid, 'subject', this.subjectField);
        } catch (err) {
          console.warn('Could not update email header variables:', err);
        }
      }

      // Emit event
      this.$emit('trigger-event', {
        name: 'headers-changed',
        event: {
          from: this.fromField,
          to: this.toField,
          cc: this.ccField,
          bcc: this.bccField,
          subject: this.subjectField
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.email-editor-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 0;
  overflow: visible;
  border: 1px solid #e0e0e0;
  box-shadow: none;
}

.email-header {
  padding: 20px;
  background: #f9fafb;
  border-bottom: 1px solid #ececec;

  .header-field {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    label {
      min-width: 70px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      margin-right: 12px;
    }

    .header-input {
      flex: 1;
      padding: 10px 14px;
      background: #ffffff;
      border: 1px solid #d1d5db;
      border-radius: 0;
      font-size: 14px;
      color: #1f2937;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        border-color: #9ca3af;
      }

      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: none;
      }

      &::placeholder {
        color: #9ca3af;
      }
    }
  }
}

.editor-toolbar {
  display: flex;
  gap: 4px;
  padding: 12px 20px;
  background: #ffffff;
  border-bottom: 1px solid #ececec;
  flex-wrap: wrap;
  user-select: none;
  align-items: center;

  button {
    padding: 8px;
    background: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
    font-size: 16px;
    min-width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #1f2937;
    font-weight: 500;
    position: relative;

    &:hover {
      background: #f3f4f6;
      transform: translateY(-1px);
    }

    &:active {
      background: #e5e7eb;
      transform: translateY(0);
    }

    &.format-btn {
      strong, em, u {
        font-size: 16px;
      }

      .icon-lines {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 18px;

        .line {
          height: 2px;
          background: currentColor;
          border-radius: 0;
          display: block;
        }
      }
    }

    &.clear-btn {
      font-size: 16px;
      line-height: 1;
      color: #1f2937;
      font-weight: 600;

      &:hover {
        background: #f3f4f6;
      }
    }
  }

  .separator {
    width: 1px;
    height: 20px;
    background: #e5e7eb;
    margin: 0 4px;
  }

  .toolbar-select {
    padding: 8px 12px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    cursor: pointer;
    font-size: 13px;
    min-width: 115px;
    height: 36px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    color: #1f2937;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    font-weight: 500;

    &:hover {
      background: #ffffff;
      border-color: #d1d5db;
      box-shadow: none;
    }

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: none;
      background: #ffffff;
    }
  }

  .toolbar-color {
    width: 36px;
    height: 36px;
    padding: 4px;
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      border-color: #d1d5db;
      box-shadow: none;
      transform: translateY(-1px);
    }

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: none;
    }

    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }

    &::-webkit-color-swatch {
      border: none;
      border-radius: 0;
    }
  }
}

.editor-iframe {
  width: 100%;
  min-height: 500px;
  border: none;
  display: block;

  /* wwEditor:start */
  &.editor-editing {
    pointer-events: none;
  }
  /* wwEditor:end */
}

/* wwEditor:start */
.html-preview {
  padding: 16px;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;

  details {
    cursor: pointer;

    summary {
      font-weight: 600;
      color: #333;
      padding: 8px;
      background: #ffffff;
      border-radius: 0;
      margin-bottom: 8px;

      &:hover {
        background: #f0f0f0;
      }
    }
  }

  pre {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 16px;
    border-radius: 0;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
    font-size: 12px;
    line-height: 1.5;
    max-height: 400px;
    overflow-y: auto;
    white-space: pre-wrap;
    word-break: break-all;
  }
}
/* wwEditor:end */

@media (max-width: 768px) {
  .editor-iframe {
    min-height: 200px;
  }

  .export-controls {
    .export-button {
      width: 100%;
    }
  }
}
</style>
