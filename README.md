<p align="center">
  <img width="120" src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" alt="Next logo">
</p>
<h2 align="center">Next - Typescript - Tailwind</h2>
Everything you need to get started on a next project, with a set of devtools to make it easy
for you to start coding instead of spending time searching on how to setup this and that..

## Preview

https://next.alaazorkane.me/

## How to use it?

### Manually

Clone this repo in a folder of your choice, `cd` to the folder and npm install:

```bash
git clone https://github.com/AlaaZorkane/next-typescript-tailwind.git MyProjectName
cd MyProjectName
npm install # or yarn
npm run dev
```

`OPTIONAL:` Change git repo

```bash
rm -rf .git
git init
git add .
git commit -m "Init 🎉"
git remote add origin [LINK]
git push origin master
```

### Using Github (recommended)

There is a `Use this template` button beside the `clone` button.

Just click on it and github will do the rest, clone the new repo in your computer, and you're good to go 🚀

## What's inside?

### Libraries

- [Next](https://nextjs.org/)
- [Tailwindcss](https://tailwindcss.com/)

### Devtools

- [Typescript](http://typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [Eslint](https://eslint.org/)
- [Postcss](https://postcss.org/)
- [Stylelint](https://stylelint.io/)

## Extra candy 🍬

- Fast refresh!
- Alias is already setup to match your `baseUrl`,
  please don't `"../../../../components/hello"`, it's ugly. Use `"@/components/hello"` instead!
- Shared interfaces go to the folder `interfaces` and read [this](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#types-or-interfaces) about whether to use types or interfaces
- Make sure to have these vs code extensions installed for maximum developer comfort:
  - [Eslint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Tailwind exntesion](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
  - [Stylelint extension](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- No, don't use emacs.

## Notes and issues

- None 🎉

## Maintainers

Alaa Zorkane - https://twitter.com/AlaaZork

## Changelog

### 2.1.0

- Dependencies update
- Prettier is now warning level (was error)
- Tailwind future opt-in

### 2.0.0

- Changed arrow functions to normal functions
- Added Husky and precommit staged
- New linting and formatting scripts

### 1.0.0

- Initial release 🎉

