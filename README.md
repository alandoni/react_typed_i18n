# react_typed_i18n

A React hook to enable I18n on React Projects, Works for React and NextJS

## Installing

run the command:
`npm install react-hook-typed-i18n` or `yarn install react-hook-typed-i18n`

or add it directly into your `package.json` dependencies:

```json
  "dependencies": {
    ...
    "react-hook-typed-i18n": "^1.0.0",
    ...
  }
```

## Preparing

Create a file for each supported language with the code:

```javascript
export enum I18n {
  WELCOME = "Welcome!",
  ... // Other strings using the same format
}
```

On your App.tsx file, include the library and the files for each language:

```javascript
import { setupTranslation } from "react-hook-typed-i18n"
import { I18n as EnUS } from "<the file you created previously for English>"
import { I18n as PtBR } from "<the file you created previously for Portuguese>"
... // Other files for different languages
```

and in the function, add:

```javascript
export function App() {
  setupTranslation({ "pt-BR": PtBR, "en-US": EnUS }, {})
  return (
    <div>
      <WelcomePage />
    </div>
  )
}
```

## Usage

On your components/pages, add the import:

```javascript
import { useTranslation } from "react-hook-typed-i18n"
import { I18n } from "<Select any file you created for any language>"
```

and then on the code:

```javascript
export function WelcomePage() {
  const t = useTranslation(I18n)
  return (
    <div className="welcome-page">
      <span>{t(I18n.WELCOME)}</span>
    </div>
  )
}
```
