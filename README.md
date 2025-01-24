# Killed by LLM

A memorial to the benchmarks that defined—and were defeated by—AI progress.

## About

This website, available at [https://r0bk.github.io/killedbyllm/](https://r0bk.github.io/killedbyllm/), is meant to be a bit of fun, and to help us take a look back and remember the massive amount of progress that has been made — much of which I didn't believe I'd see within my lifetime.

It has also been heavily inspired by Cody Ogden's [Killed by Google](https://killedbygoogle.com).

## Understanding "Saturation"

For KilledByLLM, "Saturation" means a benchmark can no longer measure the frontier. While these benchmarks are still incredibly useful, valuable tools — they are no longer able to meaningfully contribute to the question of "Can AI do X?"

## Data Collection Challenges

This project represents a best-effort attempt to document benchmarks-of-note that have been enveloped by LLMs. Proper attribution, timing and scores have been difficult to determine definitively, hence there may be some errors.

To illustrate this, let's examine "Qwen-2.5-72B-instruct" on MATH:
- From Qwen's technical report - 83.1
- From Stanford's HELM - 79.0
- From Huggingface's Open LLM Leaderboard - 38.7

These scores significantly deviate from each other!

### Score Selection Approach

We take scores in the following priority:

1. From the author's paper/technical report/model card
2. From succeeding benchmark papers (e.g. SQuAD 2.0 discusses SQuAD 1.1 performance)
3. From third party sources (e.g. Stanford's HELM)

Please raise an issue or PR if you identify any discrepancies!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Contributing

Benchmarks are defined in `src/data.ts`. To add a new benchmark or update existing data:

1. Fork the repository
2. Add/modify the benchmark data
3. Submit a PR with your changes

Please include:
- Links to papers/evidence supporting the saturation claim
- Original and final scores
- The model that first achieved saturation
- Date of creation and saturation

## License

MIT

---
*P.S. The em dashes on this page were lovingly handwritten by humans.*
