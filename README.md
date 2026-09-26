# WHAT WOULD YOU DO?

**Every choice changes the story.**

A TUBUO Writes interactive decision game about gender-based violence, boundaries, consent, safety, evidence, empathy and responsible action.

## Season 1 now has six distinct games

| Path | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 | Total |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Women 18+ | 20 | 30 | 40 | 50 | 60 | 200 |
| Men 18+ | 20 | 30 | 40 | 50 | 60 | 200 |
| Girls 13–17 | 20 | 30 | 40 | 50 | 60 | 200 |
| Boys 13–17 | 20 | 30 | 40 | 50 | 60 | 200 |
| Girls 8–12 | 20 | 30 | 40 | 50 | 60 | 200 |
| Boys 8–12 | 20 | 30 | 40 | 50 | 60 | 200 |

**Season 1 total: 1,200 playable decisions.**

Every stage requires 70% to pass: 14/20, 21/30, 28/40, 35/50 and 42/60.

## Design rule

The six paths are not pronoun swaps.

- Adult women: coercive control, consent, economic abuse, workplace harassment, stalking, technology-facilitated abuse, family pressure, survivor support, evidence, disability and migration-related power imbalances.
- Adult men: consent, jealousy and surveillance, peer norms, accountability among men, workplace power, anger and intimidation, fatherhood, bystander action and male victimization.
- Teen girls: first relationships, pressure, intimate images, school harassment, rumours, adult boundary violations, online grooming, friendships, home violence and evidence.
- Teen boys: respect, peer pressure, consent, digital image-sharing, misogynistic group norms, anger, safe bystander action, adult boundary violations and male victimization.
- Children 8–12: body autonomy, safe/unsafe secrets, online safety, gifts and manipulation, bullying, trusted adults, witnessing frightening behaviour and helping friends safely. The male and female child paths emphasize different social pressures while keeping the same rights standard.

## Safeguarding

The game never asks players to disclose personal experiences of violence. Children are not instructed to investigate abuse, confront dangerous adults or stop adult violence. The child versions repeat a core message: if one safe adult does not listen, tell another.

The game distinguishes allegations from established facts, avoids survivor blame, does not assume police are safe everywhere and does not apply one country's law to every setting.

A discreet **NEED HELP?** route is available throughout. The game is educational, not an emergency or counselling service.

## Progress and privacy

Progress is stored locally in the browser. Each of the six paths has separate progress, scores, stage locks and badges so multiple paths can be played on the same device without overwriting each other.

For players under 18, the game asks only for a badge name or nickname and does not ask for email, school, address or date of birth.

## Sources

The content framework uses material from WHO, UNICEF, UN Women, UNFPA and the Convention on the Rights of the Child. Each decision includes a source-linked **Learn More** route.

See [METHODOLOGY.md](METHODOLOGY.md) for the editorial and safeguarding framework and [QA_REPORT.md](QA_REPORT.md) for the Season 1 structural and safeguarding checks.

## Technical structure

- `index.html` — public entry point
- `game-data-v3.js` — six path definitions, source registry, question architecture and validation
- `app.js` — selector, game engine, progress, scoring, stage locks, results, downloadable badges and help/methodology screens
- `styles.css` — responsive and accessible presentation
- legacy `questions.js` and `stage2.js` remain in the repository for version history but are no longer loaded by the public game

The data layer validates that all six paths contain exactly 200 decisions and that the full Season 1 bank contains exactly 1,200 playable decisions.
