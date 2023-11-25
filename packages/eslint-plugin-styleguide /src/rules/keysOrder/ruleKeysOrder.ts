import { TSESLint } from '@typescript-eslint/experimental-utils';

import { checkOrderKeys } from '@styleguide/Rules/KeysOrder/logicKeysOrder';

/**
 * @description When active, checks the order of keys in objects.
 * This Rule will delete comments.
 */
export const RuleKeysOrder: TSESLint.RuleModule<string, []> = {
  meta: {
    docs: {
      description: 'No unordered keys in objects.',
      recommended: 'error',
      url: 'https://gitlab.campusjaeger.de/campusjaeger/frontend-guidelines/-/blob/master/ORDER.md',
    },
    messages: {
      defaultMessage: 'Order keys alphabetically.',
    },
    schema: {},
    type: 'layout',
    fixable: 'code',
    hasSuggestions: true,
  },
  create: checkOrderKeys,
};
