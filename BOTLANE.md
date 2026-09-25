# PaperBots — BotLane private build

PaperBots is BotLane's private copy of [Paperclip](https://github.com/paperclipai/paperclip),
the open-source app for running teams of AI agents. It is for BotLane's own use by a
single operator. It is not sold, hosted for others or redistributed.

## Licence

Paperclip is MIT-licensed. The original [LICENSE](LICENSE) (Copyright (c) 2025 Paperclip AI)
is kept unchanged, as the MIT terms require. BotLane's changes in this repository are
covered by the same terms.

## What differs from upstream

The application source is unchanged, which keeps upstream updates easy to merge. The
BotLane changes are:

| Change | Why |
| --- | --- |
| `.env.botlane.example` | Single-user local config: `local_trusted` mode (no login, loopback only), telemetry off |
| `docker/docker-compose.botlane.yml` | Docker stack with ports published on `127.0.0.1` only, telemetry off |
| Removed `.github/workflows/`, `CODEOWNERS`, `dependabot.yml` | These are upstream's release, publishing and cloud-deploy pipelines. They would fail without upstream's secrets and use Actions minutes on a private repo |
| Notice at the top of `README.md` and this file | Identifies the build |

## Run it locally (recommended)

Requires Node.js 24.11+ and pnpm 9 (`corepack enable` picks the pinned version).

```sh
cp .env.botlane.example .env
# replace both change-me values with the output of: openssl rand -hex 32
pnpm install
pnpm dev
```

Open http://localhost:3100. In `local_trusted` mode you are signed in automatically as
the instance admin. The server only listens on 127.0.0.1. Data, including an embedded
PostgreSQL database, lives under `~/.paperclip`.

## Run it in Docker

```sh
export BETTER_AUTH_SECRET=$(openssl rand -hex 32)
docker compose -f docker/docker-compose.botlane.yml up --build
```

Open http://localhost:3100, create your account and choose **Claim this instance**.
Docker uses `authenticated/private` mode because `local_trusted` refuses to bind
outside loopback inside a container. Claim the instance straight away: until an admin
exists, the first signed-in user to claim it becomes admin.

## Pull in upstream updates

```sh
git remote add upstream https://github.com/paperclipai/paperclip.git   # once
git fetch upstream
git merge upstream/master
```

If upstream has changed a workflow file that was removed here, git reports a
modify/delete conflict. Keep the deletion with `git rm .github/workflows/<file>`, then
finish the merge.

## Upstream docs

- Development: [doc/DEVELOPING.md](doc/DEVELOPING.md)
- Deployment modes: [doc/DEPLOYMENT-MODES.md](doc/DEPLOYMENT-MODES.md)
- Full docs: https://docs.paperclip.ing
