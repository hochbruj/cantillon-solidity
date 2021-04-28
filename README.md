# Cantillon Smart Contracts

## Install packages:

```
npm i
```

## Running tests:

Create secrets.json like this

```
{
  "mnemonic": "your seed",
  "infuraApiKey": "your-infura-project-id"
}
```

Configure node in test-environment.config.js

### Kovan

```
npm run test:kovan
```

### Mainnet fork

```
npm run test:main
```
