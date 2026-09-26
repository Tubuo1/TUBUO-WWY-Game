# Season 1 QA Report

Release target: six demographic game paths.

## Automated structural checks

The current Season 1 build was validated after generation.

| Path | Questions | Unique scenario strings | Stages | Pass thresholds | Skill dimensions |
| --- | ---: | ---: | --- | --- | --- |
| Women 18+ | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |
| Men 18+ | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |
| Girls 13–17 | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |
| Boys 13–17 | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |
| Girls 8–12 | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |
| Boys 8–12 | 200 | 200 | 20 / 30 / 40 / 50 / 60 | 14 / 21 / 28 / 35 / 42 | 7 |

**Total playable Season 1 decisions: 1,200.**

The validator also checks:

- exactly four answer choices per decision;
- a valid strongest-answer index;
- exactly one Boss Case at the end of every stage;
- no duplicate scenario string within a path;
- all six paths reach 200 decisions;
- every path uses all seven skill dimensions.

## Manual design checks applied

- Adult male content is not a pronoun-swapped version of the women’s game.
- Male and boy paths include responsibility, peer norms and bystander action while also recognizing male victimization.
- Under-18 paths do not ask minors to investigate suspected abuse or confront dangerous adults.
- 8–12 content avoids graphic detail and adult legal language.
- Child paths repeat the right to tell another safe adult if the first adult does not listen.
- Evidence questions separate allegation, corroboration and established fact.
- Support questions avoid making the helper take over the affected person’s choices.
- Bystander questions avoid treating physical confrontation as the default brave response.
- Settings include ordinary African homes, schools, workplaces, public transport, sports, communities and digital spaces without presenting Africa as uniquely violent.
- Wrong choices were diversified so a player cannot learn the game merely by recognizing the same three distractors.

## Runtime checks

- `app.js` parses successfully.
- `game-data-v3.js` parses successfully.
- the public `index.html` loads the v3 data and game engine;
- legacy question scripts are no longer loaded publicly;
- progress is stored separately for each game path;
- player names are stored separately for each path;
- under-18 paths do not request email;
- returning players resume the last selected path;
- badges can be downloaded as PNG files;
- completing Stage 5 unlocks a downloadable Season 1 completion award.

## Editorial status

This is a public Season 1 release, not the end of editorial review.

Future revisions should continue to test wording with safeguarding professionals, teachers, youth workers, men’s-engagement practitioners, survivor-support practitioners, parents and—using appropriate ethics and consent—young people from the age groups represented.

Feedback should improve the game without weakening the core rules on consent, dignity, safety, privacy, evidence and non-violence.
