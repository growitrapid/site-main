// @ts-ignore
import DOMPurify from 'dompurify';
import { customPostItemRenderer, customUserItemRenderer, getPosts, getUsers, MentionLinksPlugin } from './mention';

var re_weburl = new RegExp(
      "^" +
      // protocol identifier (optional)
      // short syntax // still required
      "(?:(?:(?:https?|ftp):)?\\/\\/)" +
      // user:pass BasicAuth (optional)
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      "(?:" +
      "(?:" +
      "[a-z0-9\\u00a1-\\uffff]" +
      "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
      ")?" +
      "[a-z0-9\\u00a1-\\uffff]\\." +
      ")+" +
      // TLD identifier name, may end with dot
      "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
      ")" +
      // port number (optional)
      "(?::\\d{2,5})?" +
      // resource path (optional)
      "(?:[/?#]\\S*)?" +
      "$", "i"
);

/**
 * 
 * @param {*} props 
 * @returns {import("@types/ckeditor__ckeditor5-core/src/editor/editorconfig").EditorConfig}
 */
export default function EditorToolbarConfig(props: any) {

      var _code_languages = props.languages;
      
      return {
            language: 'en',
            tabSpaces: 4,

            extraPlugins: [
                  ...(props.extraPlugins || []),
                  MentionLinksPlugin
            ],

            toolbar: {
                  items: [
                        'heading',
                        'style',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'link',
                        'blockQuote',
                        'subscript',
                        'superscript',
                        'removeFormat',
                        '|',
                        'fontBackgroundColor',
                        'fontColor',
                        'fontFamily',
                        'fontSize',
                        'highlight',
                        '|',
                        'alignment',
                        'indent',
                        'outdent',
                        'numberedList',
                        'bulletedList',
                        'todoList',
                        'insertTable',
                        '|',
                        'imageInsert',
                        'mediaEmbed',
                        '|',
                        'code',
                        'codeBlock',
                        '|',
                        'findAndReplace',
                        'horizontalLine',
                        'htmlEmbed',
                        'pageBreak',
                        'specialCharacters',
                        'restrictedEditingException',
                        'selectAll',
                        'sourceEditing',
                        '|',
                        'textPartLanguage',
                        '|',
                        'undo',
                        'redo'
                  ]
            },
            heading: {
                  options: [
                        { model: 'paragraph', title: 'Paragraph Text', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                  ]
            },
            fontFamily: {
                  supportAllValues: true
            },
            fontSize: {
                  // options: ['8rem', '10rem', '12rem', '14rem', 'default', '18rem', '20rem', '22rem', '30rem', '32rem'],
                  options: ['0.5', '0.6', '0.7', '0.8', '0.9', '1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '2.0'].map(val => ({
                        model: val,
                        title: `x${val}`,
                        view: {
                              name: 'span',
                              styles: {
                                    'font-size': `${val}rem`
                              }
                        }
                  }))

                  // supportAllValues: true
            },
            fontColor: {
                  colors,
                  columns: 10,
                  documentColors: 20,
            },
            fontBackgroundColor: {
                  colors,
                  columns: 10,
                  documentColors: 20,
            },
            image: {
                  toolbar: [
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:alignCenter',
                        'imageStyle:breakText',
                        'imageStyle:side',
                        'imageStyle:sideLeft',
                        '|',
                        'imageResize:25',
                        'imageResize:50',
                        'imageResize:75',
                        'imageResize:original',
                        '|',
                        'imageTextAlternative',
                        'toggleImageCaption',
                        'linkImage'
                  ],
                  resizeUnit: '%',
                  resizeOptions: [
                        {
                              name: 'imageResize:original',
                              value: null,
                              icon: 'original'
                        },
                        {
                              name: 'imageResize:25',
                              value: '25',
                              icon: 'small'
                        },
                        {
                              name: 'imageResize:50',
                              value: '50',
                              icon: 'medium'
                        },
                        {
                              name: 'imageResize:75',
                              value: '75',
                              icon: 'large'
                        }
                  ],
            },
            link: {
                  toggleDownloadable: {
                        mode: 'manual',
                        label: 'Downloadable',
                        attributes: {
                              download: 'file'
                        }
                  },
                  decorators: {
                        openInNewTab: {
                              mode: 'manual',
                              label: 'Open in a new tab',
                              defaultValue: true,			// This option will be selected by default.
                              attributes: {
                                    target: '_blank',
                                    rel: 'noopener noreferrer'
                              }
                        }
                  }
            },
            table: {
                  contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties',
                        'toggleTableCaption'
                  ]
            },
            mediaEmbed: {
                  toolbar: [
                        'mediaEmbed',
                  ],
                  extraProviders: [
                        {
                              name: 'All',
                              // A URL regexp or an array of URL regexps:
                              url: re_weburl,

                              // To be defined only if the media are previewable:
                              html: (match: any) => {

                                    return (
                                          '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">' +
                                          `<iframe src="${match[0]}" ` +
                                          'style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" ' +
                                          'frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>' +
                                          '</iframe>' +
                                          '</div>'
                                    );
                              }
                        },
                  ],
                  previewsInData: true
            },
            codeBlock: {
                  languages: _code_languages.map((_language: any) => {
                        return {
                              language: _language,
                              label: _language === "cs" ? "c#" : _language.toUpperCase()
                        };
                  }),
            },
            mention: {
                  feeds: [
                        ...props.mentionFeeds || [],
                        {
                              marker: '@',
                              feed: getUsers,
                              itemRenderer: customUserItemRenderer
                        },
                        {
                              marker: '#',
                              feed: getPosts,
                              itemRenderer: customPostItemRenderer
                        },
                  ],
            },
            htmlEmbed: {
                  showPreviews: true,
                  sanitizeHtml: (inputHtml: any) => {
                        // Strip unsafe elements and attributes, e.g.:
                        // the `<script>` elements and `on*` attributes.
                        const purify = DOMPurify(window);
                        const outputHtml = purify.sanitize(inputHtml, {
                              ADD_TAGS: ["NOTE"]
                        });
                        // const outputHtml = sanitizeHtml(inputHtml);

                        return {
                              html: outputHtml,
                              // true or false depending on whether the sanitizer stripped anything.
                              hasChanged: true
                        };
                  }
            },
            style: {
                  definitions: [
                        {
                              name: 'Info tag',
                              element: 'div',
                              classes: ['info-tag']
                        }
                  ],
            },
      }

};


const colors = [
      // Black
      ...colorRow(0, 0, 10, true),
      ...colorRow(0, 100, 10),
      ...colorRow(30, 100, 10),
      ...colorRow(60, 100, 10),
      ...colorRow(90, 100, 10),
      ...colorRow(120, 100, 10),
      ...colorRow(150, 100, 10),
      ...colorRow(180, 100, 10),
      ...colorRow(210, 100, 10),
      ...colorRow(240, 100, 10),
      ...colorRow(270, 100, 10),
      ...colorRow(300, 100, 10),
      ...colorRow(330, 100, 10),
      ...colorRow(360, 100, 10),
];

function colorRow(h: number, s: number, row: number, isBlack?: boolean) {
      const palette = [];

      for (let i = 0; i < row; i++) {
            let index = isBlack ? i : (i + 1);
            let r = isBlack ? (row - 1) : (row + 1);

            palette.push({
                  color: `hsl(${h}, ${s}%, ${100 / r * index}%)`,
                  label: `hsl(${h}, ${s}%, ${100 / r * index}%)`,
                  hasBorder: true
            });
      }

      return palette;
}
