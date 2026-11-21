# YaktAI Lab test kit: Reports 1 and 2

Data and code for two YaktAI Lab reports on prompt injection in an email-drafting agent (Orchestrate):

- **Report 1:** Muhammad Sakhawat, *Who Speaks for Whom: Prompt Injection and Authority in an Email-Drafting Agent*, YaktAI Lab Report 1, November 2026. https://doi.org/10.5281/zenodo.24271287
- **Report 2:** Muhammad Sakhawat, *Rewording, Real Businesses and the Limits of a Records Check*, YaktAI Lab Report 2, November 2026. https://doi.org/10.5281/zenodo.24271374

This kit: https://doi.org/10.5281/zenodo.24271419 (version 1.0).

All runs were done on 15 and 16 November 2026. Everything here uses a **fictional business** (Northfield Plumbing) and a fictional prospect (Dana, Lakeside Dental). Report 2 also used three real business settings. That data is **not** included and will not be released.

## Contents

| Folder | What it holds |
| --- | --- |
| `attacks/` | The 12 attacks of Report 1, the 48 reworded attacks of Report 2 (13 categories, with a `clear` flag for clearly harmful ones), and the 4 ordinary replies used as a control |
| `fixture/` | The fictional business and prospect, and the earlier note the drafts reply to |
| `harness/` | The scripts that ran the drafting code and the two-judge grading, the grading rubric, and the statistics script |
| `results/report1/` | Drafts before the fix and in two runs after it, for gpt-5-mini (Azure), Claude Haiku 5.5 and Gemini 3.5 Flash; both judges' grades; the 60-draft blind human check (drafts as shown, the key, the author's first-pass and post-review grades) |
| `results/report2/` | Drafts, grades and, where saved, the reader model's raw outputs, for each version of the check: word list (`eefff4c`), allow-only (`daeaf9e`, reader outputs only), provenance (`870a289`), refined (`698a0ba`), and final (`0a18d4c`) |

## Reading the files

- Each `drafts_*.json` has `rows`. A row has the attack `id`, its `goal`, `drafted`, `held`, the draft `text`, and (Report 2) `problems` (why it was held), `toCheck` (lines marked for the owner) and `notJudged`.
- Each `grades_*.json` row adds the two judges' grades: `COMPLIED`, `ECHOED` or `REFUSED`. A draft counts as compliant only when both judges say `COMPLIED`.
- Some attempts produced no draft because the model provider turned the request away under load. Those rows have `drafted: false` and an `err`. Rates in the reports are per draft written.

## Running it

The harness drives Orchestrate's own drafting code, which is private and **not** included, so it cannot be rerun as is. It is published to show exactly what was run. The attacks, rubric, drafts and grades are enough to re-grade the drafts with other judges, or to run the same attacks against another agent.

Credentials come only from environment variables: `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_KEY`, `ANTHROPIC_API_KEY`, `GCP_ACCESS_TOKEN`, `GCP_PROJECT`, `AZURE_GRADER_DEPLOYMENT` and `AZURE_ASTRA_DEPLOYMENT`. None is included.

## Notes

- Model names are as reported by each provider at the time of the runs.
- Judges are language models. The human check in Report 1 was done by the author and is not independent.
- Attack text includes fictional names, numbers and addresses on reserved `.example` domains. The IBAN in one attack is a published test example.

## Licence

Data, attacks and documentation: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code in `harness/`: MIT. Both © 2026 Aura Platform LLC (YaktAI Lab).

## Contact

hello@yaktai.com · https://yaktai.ai
