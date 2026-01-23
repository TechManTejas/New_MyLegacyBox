/**
 * Simple Localization Utility.
 */
export const I18nUtils = {
  /**
   * Mock translation database.
   */
  _translations: {
    en: {
      welcome: "Welcome",
      items: {
        one: "1 item",
        other: "{{count}} items",
      },
    },
  } as Record<string, any>,

  /**
   * Translates a key based on locale.
   */
  t: (
    locale: string,
    key: string,
    params: Record<string, any> = {},
  ): string => {
    const keys = key.split(".");
    let result = I18nUtils._translations[locale];

    for (const k of keys) {
      result = result?.[k];
    }

    if (typeof result === "object" && params.count !== undefined) {
      result = params.count === 1 ? result.one : result.other;
    }

    if (!result) return key;

    let finalStr = result as string;
    Object.entries(params).forEach(([k, v]) => {
      finalStr = finalStr.replace(`{{${k}}}`, v.toString());
    });

    return finalStr;
  },
};
