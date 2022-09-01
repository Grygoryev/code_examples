export const pointers = {
  group: {
    start: '<!--{group',
    end: '<!--{/group}-->',
    extractArgumens: {
      start: '<!--{group',
      end: '}-->',
      propertiesDivider: '|',
    },
  },
  message: {
    start: '<!--{message',
    end: '<!--{/message}-->',
    propertiesDivider: '|',
  },
  insideMessage: {
    start: '<!--{insideMessage',
    end: '<!--{/insideMessage}-->',
    propertiesDivider: '|',
  },
  option: {
    start: '<!--{option',
    end: '<!--{/option}-->',
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
  options: {
    start: '<!--{options}-->',
    end: '<!--{/options}-->',
  },
  code: {
    start: '<!--{code}-->',
    end: '<!--{/code}-->',
  },
}
