export const pointers = {
  group: {
    start: '<!--{group}-->',
    end: '<!--{/group}-->',
  },
  message: {
    start: '<!--{message',
    end: '<!--{/message}-->',
    propertiesDivider: '|',
  },
  variables: {
    start: '{variables}',
    end: '{/variables}',
    divider: ';',
    equalSign: '=',
    replace: {
      start: '<%',
      end: '%>',
    },
  },
}
