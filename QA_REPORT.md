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


## Zero-repetition release gate

The Season 1 content engine was rebuilt so that each path now draws from unique topic variants rather than recycling the same base scenario across stages.

Current automated checks confirm:

- 1,200/1,200 unique question IDs;
- 1,200/1,200 unique story signatures;
- 1,200/1,200 unique scenario texts after normalization;
- 1,200/1,200 unique four-choice answer sets;
- no within-path duplicate scenario;
- no global duplicate scenario across the six games;
- exactly one Boss Case per stage;
- all 1,200 questions include feedback and a source.

A separate near-duplicate review using word-set similarity found **no question pair above the 0.80 similarity threshold within any path** after the rebuild.

The public build should fail QA rather than ship if an exact duplicate scenario, story signature, answer set or question ID is introduced.


## Engagement release — v3.4

The game now includes an optional engagement layer designed around safeguarding rather than speed or spectacle.

Checks and design rules:

- sound is generated locally through Web Audio and can be muted at any time;
- no background music plays by default;
- no violent sound effects or harsh wrong-answer buzzers are used;
- a wrong answer triggers a neutral learning cue rather than a punishment cue;
- motion can be disabled independently of sound;
- the game honors the browser's reduced-motion preference on first use;
- optional haptic taps are used only where the device supports them;
- children, teens and adults use different motion intensity and different tonal profiles;
- quarter, halfway and three-quarter checkpoints provide age-appropriate encouragement;
- streak messages reward thoughtful consistency and do not score speed;
- stage pass, badge and Season 1 completion use short celebrations that do not block the next action;
- the game remains fully playable with sound, motion and haptics off.
