type i18nMap = { [key: string]: string }

class TranslationMap<I18n extends i18nMap> {
  private static instance: TranslationMap<any>
  defaultEnum: i18nMap = {}

  static getInstance<I18n extends i18nMap>(
    languages?: { [key: string]: I18n },
    options?: I18nOptions,
  ): TranslationMap<I18n> {
    if (languages && options) {
      TranslationMap.instance = new TranslationMap(languages, options)
    }
    return this.instance
  }

  private constructor(private languages: { [key: string]: I18n }, private options: I18nOptions = {}) {}

  t(translationKey: string): string {
    let language = this.options?.defaultLanguage ?? ""
    if (this.options?.useBrowserLanguage && typeof navigator !== "undefined") {
      language = navigator.languages[0] ?? navigator.language
    }

    const defaultEnumEntries = Array.from(Object.entries(this.defaultEnum))

    const search = defaultEnumEntries?.find((v) => {
      return v[1] === translationKey
    })?.[0]

    if (search === undefined) {
      return translationKey
    }

    const correctEnum = this.languages[language]
    const value = correctEnum[search]
    if (value !== undefined) {
      return value
    } else {
      return `${translationKey}`
    }
  }

  setDefaultLanguage(language: string) {
    this.options.defaultLanguage = language
  }
}

interface I18nOptions {
  defaultLanguage?: string
  useBrowserLanguage?: boolean
}

export function setupTranslation<I18n extends i18nMap>(
  languages: { [key: string]: I18n },
  { defaultLanguage = "pt-BR", useBrowserLanguage = true }: I18nOptions,
) {
  if (TranslationMap.getInstance() === undefined) {
    TranslationMap.getInstance(languages, {
      defaultLanguage,
      useBrowserLanguage,
    })
  }
}

export function useTranslation<I18n extends i18nMap>(enumKeys: I18n): (translationKey: string) => string {
  const map = TranslationMap.getInstance()
  map.defaultEnum = enumKeys
  return map.t.bind(map)
}

export function changeDefaultLanguage(newLanguage: string) {
  const map = TranslationMap.getInstance()
  map.setDefaultLanguage(newLanguage)
}
