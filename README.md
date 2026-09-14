# Cognitive Outsourcing Platform

Research platform built for a BSc dissertation study on cognitive outsourcing in human-AI decision-making. Deployed at [cognitive-outsourcing-platform.vercel.app](https://cognitive-outsourcing-platform.vercel.app).

Participants complete seven short reasoning tasks, each showing a predefined AI recommendation (correct, incorrect, or partially correct) before they give a final answer. Responses are stored anonymously in Firestore.

## Structure

- `src/` - the React/Vite application (participant flow, tasks, questionnaire, Firestore integration)
- `analysis/` - data analysis materials:
  - `export-firestore.js` - exports participant data from Firestore to CSV/JSON (requires a local service account key, not included)
  - `data_analysis_colab.py` - the Google Colab analysis script (statistical tests, figures)
  - `firestore.rules` - Firestore security rules
  - `data_analysis_colab.ipynb` - the same analysis as a notebook, with charts included (outputs cleared of participant data)

## Run

```bash
npm install
npm run dev
```

The raw dataset and processed dataset are not included in this repository and are available on request.
