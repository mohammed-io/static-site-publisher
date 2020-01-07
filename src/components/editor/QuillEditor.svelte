<script>
  import { onMount } from 'svelte';
  import _ from 'lodash';
  import 'highlight.js';

  import hljs from 'highlight.js';
  import Quill from 'quill';
  import Parchment from 'parchment';
  import HTMLBlot from './HTMLBlot';
  import ImageBlot from './ImageBlot';
  import DividerBlot from './DividerBlot';

  import 'quill/dist/quill.bubble.css';
  import '../../styles/quill-editor.css';
  import 'highlight.js/styles/atom-one-dark.css'

  export let body = 'Hello World!';

  import qq from 'quill/';

  let editorElement;
  let editor;

  let areSidebarControlsShown = false;

  function createEditor() {
    Quill.register(ImageBlot, true);
    Quill.register(DividerBlot, true);
    Quill.register(HTMLBlot, true);

    const icons = Quill.import('ui/icons');
    // icons.header[3] = require('!html-loader!quill/assets/icons/header-3.svg');

    let quill = new Quill(editorElement, {
      modules: {
        syntax: { highlight: text => hljs.highlightAuto(text).value },
        toolbar: [
          ['bold', 'italic', 'code', 'link'],
          [{ header: '2' }, { header: '3' }],
          ['blockquote', 'code-block'],
        ],
      },
      theme: 'bubble',
      scrollingContainer: 'html, body',
      // placeholder: this.trans.posts.forms.editor.body,
    });

    /**
     * Temporary workaround for customizing the link tooltip.
     *
     * @link https://github.com/quilljs/quill/issues/1107#issuecomment-259938173
     */
    let tooltip = quill.theme.tooltip;
    let input = tooltip.root.querySelector('input[data-link]');

    input.dataset.link = 'foo'; // this.trans.posts.forms.editor.link;

    return quill;
  }

  function handleEditorValue() {
    editor.root.innerHTML = body;

    editor.on('text-change', (delta, oldContents, source) => {
      body = editor.getText() ? editor.root.innerHTML : '';
    });
  }

  function handleClicksInsideEditor() {
    editor.on('click', event => {
      let blot = Parchment.find(event.target, true);

      if (blot instanceof ImageBlot) {
        let values = blot.value(blot.domNode)['captioned-image'];

        values.existingBlot = blot;

        this.showImageModal(values);
      }
    });
  }

  function initSideControls() {
    let Block = Quill.import('blots/block');

    editor.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
      let sidebarControls = document.getElementById('sidebarControls');

      if (eventType !== Quill.events.SELECTION_CHANGE) return;

      if (range == null) return;

      if (range.length === 0) {
        let [block, offset] = editor.scroll.descendant(Block, range.index);

        if (
          block != null &&
          block.domNode.firstChild instanceof HTMLBRElement
        ) {
          let lineBounds = editor.getBounds(range);

          sidebarControls.style.display = 'flex';

          // sidebarControls.style.left = lineBounds.left - 50 + 'px';
          sidebarControls.style.top = lineBounds.top - 2 + 'px';
        } else {
          sidebarControls.style.display = 'none';
        }
      } else {
        sidebarControls.style.display = 'none';
      }
    });
  }

  function openSidebarControls() {
    areSidebarControlsShown = !areSidebarControlsShown;

    editor.focus();
  }

  onMount(() => {
    editor = createEditor();

    handleEditorValue();
    handleClicksInsideEditor();
    initSideControls();
  });

  // const foo = {
  //   name: 'quill-editor',

  //   props: {
  //     value: {
  //       type: String,
  //       default: '',
  //     },
  //   },

  //   data() {
  //     return {
  //       editor: null,
  //       trans: JSON.parse(Canvas.lang),
  //     };
  //   },

  //   mounted() {
  //     this.editor = this.createEditor();

  //     this.handleEditorValue();
  //     this.handleClicksInsideEditor();
  //     this.initSideControls();
  //   },

  //   watch: {
  //     'activePost.body'(val) {
  //       this.update();
  //     },
  //   },

  //   methods: {
  //     createEditor() {
  //       Quill.register(ImageBlot, true);
  //       Quill.register(DividerBlot, true);
  //       Quill.register(HTMLBlot, true);

  //       const icons = Quill.import('ui/icons');
  //       icons.header[3] = require('!html-loader!quill/assets/icons/header-3.svg');

  //       let quill = new Quill(this.$refs.editor, {
  //         modules: {
  //           // syntax: { hljs },
  //           toolbar: [
  //             ['bold', 'italic', 'code', 'link'],
  //             [{ header: '2' }, { header: '3' }],
  //             ['blockquote', 'code-block'],
  //           ],
  //         },
  //         theme: 'bubble',
  //         scrollingContainer: 'html, body',
  //         placeholder: this.trans.posts.forms.editor.body,
  //       });

  //       /**
  //        * Temporary workaround for customizing the link tooltip.
  //        *
  //        * @link https://github.com/quilljs/quill/issues/1107#issuecomment-259938173
  //        */
  //       let tooltip = quill.theme.tooltip;
  //       let input = tooltip.root.querySelector('input[data-link]');

  //       input.dataset.link = this.trans.posts.forms.editor.link;

  //       return quill;
  //     },

  //     handleEditorValue() {
  //       this.editor.root.innerHTML = this.$store.getters.activePost.body;

  //       this.editor.on('text-change', (delta, oldContents, source) => {
  //         this.$store.dispatch(
  //           'updatePostBody',
  //           this.editor.getText() ? this.editor.root.innerHTML : ''
  //         );
  //       });
  //     },

  //     handleClicksInsideEditor() {
  //       this.editor.root.addEventListener('click', event => {
  //         let blot = Parchment.find(event.target, true);

  //         if (blot instanceof ImageBlot) {
  //           let values = blot.value(blot.domNode)['captioned-image'];

  //           values.existingBlot = blot;

  //           this.showImageModal(values);
  //         }
  //       });
  //     },

  //     initSideControls() {
  //       let Block = Quill.import('blots/block');

  //       this.editor.on(Quill.events.EDITOR_CHANGE, (eventType, range) => {
  //         let sidebarControls = document.getElementById('sidebarControls');

  //         if (eventType !== Quill.events.SELECTION_CHANGE) return;

  //         if (range == null) return;

  //         if (range.length === 0) {
  //           let [block, offset] = this.editor.scroll.descendant(
  //             Block,
  //             range.index
  //           );

  //           if (
  //             block != null &&
  //             block.domNode.firstChild instanceof HTMLBRElement
  //           ) {
  //             let lineBounds = this.editor.getBounds(range);

  //             sidebarControls.classList.remove('active');

  //             sidebarControls.style.display = 'block';

  //             sidebarControls.style.left = lineBounds.left - 50 + 'px';
  //             sidebarControls.style.top = lineBounds.top - 2 + 'px';
  //           } else {
  //             sidebarControls.style.display = 'none';

  //             sidebarControls.classList.remove('active');
  //           }
  //         } else {
  //           sidebarControls.style.display = 'none';

  //           sidebarControls.classList.remove('active');
  //         }
  //       });
  //     },

  //     openSidebarControls() {
  //       document.getElementById('sidebarControls').classList.toggle('active');

  //       this.editor.focus();
  //     },

  //     showImageModal(data = null) {
  //       this.$emit('openingImageModal', data);

  //       // $(this.$refs.imageModal.$el).modal('show')
  //     },

  //     showHTMLModal() {
  //       // $(this.$refs.htmlModal.$el).modal('show')
  //     },

  //     insertImage({ url, caption, existingBlot, layout }) {
  //       let values = {
  //         url: url,
  //         caption: caption,
  //         layout: layout,
  //       };

  //       if (existingBlot) {
  //         return existingBlot.replaceWith('captioned-image', values);
  //       }

  //       let range = this.editor.getSelection(true);

  //       this.editor.insertEmbed(
  //         range.index,
  //         'captioned-image',
  //         values,
  //         Quill.sources.USER
  //       );

  //       this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
  //     },

  //     insertHTML({ content }) {
  //       let range = this.editor.getSelection(true);

  //       this.editor.insertEmbed(
  //         range.index,
  //         'html',
  //         {
  //           content: content,
  //         },
  //         Quill.sources.USER
  //       );

  //       this.editor.setSelection(range.index + 1, Quill.sources.SILENT);
  //     },

  //     insertDivider() {
  //       let range = this.editor.getSelection(true);

  //       this.editor.insertText(range.index, '\n', Quill.sources.USER);
  //       this.editor.insertEmbed(
  //         range.index + 1,
  //         'divider',
  //         true,
  //         Quill.sources.USER
  //       );
  //       this.editor.setSelection(range.index + 2, Quill.sources.SILENT);
  //     },

  //     update: _.debounce(function(e) {
  //       this.$parent.save();
  //     }, 1200),
  //   },
  // };
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="//fonts.googleapis.com/css?family=Karla|Merriweather:400,700,900" />
</svelte:head>
<div>
  <div style="position: relative">
    <div id="sidebarControls" class="flex flex-row -mx-12">
      <button
        class="flex items-center border border-gray-200 rounded-full p-2 mx-1"
        type="button"
        on:click={openSidebarControls}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          viewBox="0 0 24 24"
          class="fill-current text-gray-700">
          <circle cx="12" cy="12" r="10" style="fill:none" />
          <path
            class="secondary"
            d="M13 11h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1
            0-2h4V7a1 1 0 0 1 2 0v4z" />
        </svg>
      </button>
      <div
        class="controls"
        class:hidden={!areSidebarControlsShown}
        class:flex={areSidebarControlsShown}>
        <button
          class="flex items-center border border-gray-200 rounded-full p-2 mx-1
          bg-white"
          type="button"
          on:click={() => 'showImageModal'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            viewBox="0 0 24 24"
            class="">
            <path
              class="secondary"
              d="M6.59 6l2.7-2.7A1 1 0 0 1 10 3h4a1 1 0 0 1 .7.3L17.42 6H20a2 2
              0 0 1 2 2v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8c0-1.1.9-2
              2-2h2.59zM19 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-7 8a5 5 0 1 0 0-10 5
              5 0 0 0 0 10z" />
            <path class="secondary" d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </button>
        <button
          class="flex items-center border border-gray-200 rounded-full p-2"
          type="button"
          on:click={() => 'showHTMLModal'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            viewBox="0 0 24 24"
            class="icon-code">
            <rect width="18" height="18" x="3" y="3" style="fill:none" rx="2" />
            <path
              class="secondary"
              d="M8.7 13.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 1 1
              1.4 1.4L7.42 12l1.3 1.3zm6.6 0l1.29-1.3-1.3-1.3a1 1 0 1 1
              1.42-1.4l2 2a1 1 0 0 1 0 1.4l-2 2a1 1 0 0 1-1.42-1.4zm-3.32 3.9a1
              1 0 0 1-1.96-.4l2-10a1 1 0 0 1 1.96.4l-2 10z" />
          </svg>
        </button>
        <button
          class="flex items-center border border-gray-200 rounded-full p-2 mx-1"
          type="button"
          on:click={() => 'insertDivider'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            viewBox="0 0 24 24"
            class="icon-dots-horizontal">
            <path
              class="secondary"
              fill-rule="evenodd"
              d="M5 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1
              0 4zm7 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
          </svg>
        </button>
      </div>
    </div>

    <div bind:this={editorElement} />

    <!-- <image-modal ref="imageModal" @addingImage="insertImage" />

      <html-modal ref="htmlModal" @addingHTML="insertHTML" /> -->
  </div>
</div>