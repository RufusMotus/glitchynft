# GlitchyNFT

GlitchyNFT is a creator which allowed you to create your own 'NFT' from prepared assets. Why creator for 'NFT'? We all love them (right?)! Project was created for [Appwrite Hackathon on Dev.to](https://dev.to/devteam/announcing-the-appwrite-hackathon-on-dev-1oc0)

## Techstack

- [Vue](https://github.com/vuejs/vue)
- [Pinia](https://github.com/vuejs/pinia)
- [Typescript](https://github.com/microsoft/TypeScript/)
- [Appwrite](https://github.com/appwrite/appwrite)

## Assets resource

- [Craftpix](https://craftpix.net/freebies/)

## Missing functionalities due to lack of time

- auction house functions
- liking GlitchyNFTs
- viewing GlitchyNFTs of different users

## Screenshots

![Explorer view](/doc/explorer.png)
![Creator view](/doc/creator.png)

# Setup

### #1 Prerequisites:

- Appwrite is running
- Appwrite CLI is installed
- you are logged into Appwrite CLI

### #2 Appwrite

Init project in the root folder

```
appwrite init project
```

when ask to override say `yes`, choose `Create a new Appwrite project` and follow the rest of the prompts

to create collections run

```
appwrite deploy collection
```

and select all of the collections

copy `projectId` from the `appwrite.json`, replace `PROJECT_ID` with copied `projectId` and run

```
appwrite projects createKey --projectId PROJECT_ID --name APIKey --scopes documents.write
```

copy `secret` from the promp and paste it in `.env.example` as `API_KEY`

set the rest of the variables and change it to `.env`

```
VITE_APP_APPWRITE_ENDPOINT=Your Appwrite host
VITE_APP_APPWRITE_PROJECT=Project ID from appwrite.json
API_KEY=Api key created through Appwrite CLI
```

install dependencies

```
pnpm install
```

create assets in the Appwrite database by running (might take a moment)

```
pnpm run create-assets
```

### #3 Client

Build client:

```
pnpm run build
```

Serve client:

```
pnpm run preview
```
