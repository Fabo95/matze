import { RuleNoVolatileImport } from "@styleguide/rules/noVolatileImport/ruleNoVolatileImport";
import { RuleKeysOrder } from "@styleguide/rules/keysOrder/ruleKeysOrder";

module.exports = {
  rules: {
    "keys-order": RuleKeysOrder,
    "no-volatile-import": RuleNoVolatileImport,
  },
};
