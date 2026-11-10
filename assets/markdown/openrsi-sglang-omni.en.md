# OpenRSI × SGLang-Omni: Scaling RSI for AI Infra

[Zhuofeng Li](https://zhuofeng-li.github.io/)\*, [Aaron Tian](https://github.com/db-ol)\*, [Yichen Feng](https://yichenfeng.me/), [Wenhao Chai](https://wenhaochai.com/), [Xinyang Han](https://davidhanx.github.io/), [Cara Li](https://caralinotes.com/), [Shujia Liang](https://vincentcaptain.github.io/), [Yuetai Li](https://yuetl9.github.io/), [Chenyang Zhao](https://github.com/zhaochenyang20)\*

\* Project lead. A collaboration between OpenRSI and the SGLang-Omni team.

**Published:** November 9, 2026.

[Original interactive article](https://zhuofeng-li.github.io/blog/2026/openrsi-sglang-omni/) · [中文版](./openrsi-sglang-omni.zh.md)

> This Markdown edition preserves the article’s text, reported results, references, and caveats as of publication. Interactive figures are represented by text and data tables; the original article retains the animations. No new benchmark runs were performed for this conversion.

## Overview

OpenRSI scales recursive self-improvement to real-world AI infrastructure. Our agents run a continuous performance-optimization loop, with every gain validated by an independent verifier, while people define each problem and review the changes at the end. In partnership with SGLang-Omni, this loop has run across eight omni models and raised each model’s throughput by +7.6% to +326.5% on H100, with fourteen PRs so far, all reviewed and merged by the SGLang-Omni maintainers.

The +7.6% to +326.5% headline range refers to the **H100 non-streaming measurements** in Table 1. Streaming results and attribution caveats are reported separately below.

- [OpenRSI-SGLang-Omni tasks](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI)
- [RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness)
- [RSI-Anything data pipeline](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md)

## Introduction

Recursive self-improvement (RSI), AI that improves itself, is one of the most important research problems in AI, yet most demonstrations stay on benchmarks and toy problems. OpenRSI takes a first step toward real-world RSI: our agents improve the infrastructure that serves AI models, and each verified, merged change becomes the baseline for the next round. Concretely, given an objective, agents formulate a hypothesis, design experiments and refine their approach from the evidence, iterating continuously while an independent verifier validates every gain.

Here we partnered with the SGLang-Omni team. Together we set the goal: make omni models run faster in SGLang-Omni, without touching model weights or slowing down any other model. We turned that goal into tasks with [RSI-Anything](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md), and our agents ran those tasks on [RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness). They produce optimizations that pass upstream review and complement human experts by taking on the experiment-heavy part of the work at a pace no human can match. The results ship as code that people run: SGLang-Omni maintainers have since merged fourteen PRs from this work across eight omni models (Table 1). The agents’ part is performance optimization. Defining the tasks, system design such as Ming3-TTS streaming, and review were done by people.

### Table 1. Merged OpenRSI changes in SGLang-Omni

Each row compares main before the model’s first OpenRSI PR with main after its last, at **128 requests per round**. Gains are non-streaming / streaming.

| Model | Merged PRs | H100 gain: non-streaming / streaming | H200 gain: non-streaming / streaming |
| --- | --- | --- | --- |
| CosyVoice3 | [#2524](https://github.com/sgl-project/sglang-omni/pull/2524), [#2555](https://github.com/sgl-project/sglang-omni/pull/2555) | +44.4% / +46.2% | +48.1% / +56.3% |
| MOSS-TTS [1] | [#2525](https://github.com/sgl-project/sglang-omni/pull/2525), [#2859](https://github.com/sgl-project/sglang-omni/pull/2859) | +48.5% / +76.3% | +65.2% / +149.5% |
| Fish S2-Pro | [#2778](https://github.com/sgl-project/sglang-omni/pull/2778) | +9.6% / +0.3% | +13.4% / +2.1% |
| Qwen3-TTS | [#2779](https://github.com/sgl-project/sglang-omni/pull/2779) | +25.2% / +4.7% | +44.1% / +12.0% |
| Qwen3-ASR [2] | [#2880](https://github.com/sgl-project/sglang-omni/pull/2880), [#2881](https://github.com/sgl-project/sglang-omni/pull/2881), [#2882](https://github.com/sgl-project/sglang-omni/pull/2882) | +14.2% / +5.0% | +15.4% / +8.4% |
| Whisper | [#2901](https://github.com/sgl-project/sglang-omni/pull/2901) | +7.6% / +12.2% | +14.0% / +17.6% |
| MOSS-TD | [#3071](https://github.com/sgl-project/sglang-omni/pull/3071) | +18.8% / +30.0% | +19.9% / +32.1% |
| Ming3-TTS [3] | [#3136](https://github.com/sgl-project/sglang-omni/pull/3136), [#3189](https://github.com/sgl-project/sglang-omni/pull/3189), [#3190](https://github.com/sgl-project/sglang-omni/pull/3190) | +326.5% / +93.9% | +344.3% / +114.5% |

**Attribution and measurement caveats**

1. **MOSS-TTS — not all OpenRSI.** The range also includes a streaming codec rewrite ([#2805](https://github.com/sgl-project/sglang-omni/pull/2805)), [#2662](https://github.com/sgl-project/sglang-omni/pull/2662), [#2770](https://github.com/sgl-project/sglang-omni/pull/2770), [#2772](https://github.com/sgl-project/sglang-omni/pull/2772), and the SGLang 0.5.22 upgrade ([#2964](https://github.com/sgl-project/sglang-omni/pull/2964)); the two sides run different images. [#2859](https://github.com/sgl-project/sglang-omni/pull/2859) adds about **41 s of startup and 3.7 GiB of peak VRAM**. The H200 streaming baseline is low (3.90 req/s, against 5.32 on H100) for reasons not yet known, so read +149.5% with care.
2. **Qwen3-ASR — not all OpenRSI.** The range also includes the SGLang 0.5.22 upgrade ([#2964](https://github.com/sgl-project/sglang-omni/pull/2964)); the two sides run different images.
3. **Ming3-TTS — not all OpenRSI.** The range includes **28 other PRs**. [#3136](https://github.com/sgl-project/sglang-omni/pull/3136) also fixes a sampling bug in the baseline, and the benchmark reuses reference recordings. The opt-in streaming in [#3189](https://github.com/sgl-project/sglang-omni/pull/3189) and [#3190](https://github.com/sgl-project/sglang-omni/pull/3190) was designed by people.

### Changes, baselines, and default settings

#### CosyVoice3

- **Changes:** Idle encoder threads sleep instead of spinning; reference features cross stages as tensors.
- **Default behavior:** **Yes**. Code only; no default settings changed.
- **Main before → after:** [f29a119 → fe4b23f](https://github.com/sgl-project/sglang-omni/compare/f29a1195d12826bcedfda78f4e58429745eda5b8...fe4b23f06b27f7b2492703891c8036a919d2041e).
- **OpenRSI tasks:** [cosyvoice3](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/cosyvoice3/sglang-omni-cosyvoice3-dual-mode-runtime/).

#### MOSS-TTS

- **Changes:** In-place embedding sums, fused channel embeddings and overlapped graphed decode.
- **Default behavior:** **Yes**. #2859 turns on async decode and lowers the AR memory share from 0.72 to 0.60.
- **Main before → after:** [a65abc0 → 53ea267](https://github.com/sgl-project/sglang-omni/compare/a65abc07e535a57589aebc7ebbf92498e2170761...53ea2678733ac7b4c4744895e8cf2632117c2dcd).
- **OpenRSI tasks:** [moss-tts-v1.5](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/moss-tts-v1.5/sglang-omni-moss-v1.5-dual-mode-runtime/).

#### Fish S2-Pro

- **Changes:** Skips unused quantizer reconstruction and packs waveforms.
- **Default behavior:** **Yes**. Code only; no default settings changed.
- **Main before → after:** [08182f2 → 28c3e35](https://github.com/sgl-project/sglang-omni/compare/08182f2bc44dbf951e086927d6eb657f3a419171...28c3e35a33bef2f45b3315431f4a512d6ed463cf).
- **OpenRSI tasks:** [fish-s2-pro](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/fish-s2-pro/sglang-omni-fish-s2-pro-dual-mode-runtime/).

#### Qwen3-TTS

- **Changes:** Reuses prefill and vocoder graphs for the Base model.
- **Default behavior:** **Yes**. The gain includes new 0.6B vocoder batching defaults: two requests, no wait.
- **Main before → after:** [8220d22 → 08182f2](https://github.com/sgl-project/sglang-omni/compare/8220d220703cf8d8f5c5d9a2cde00b5ed13717b8...08182f2bc44dbf951e086927d6eb657f3a419171).
- **OpenRSI tasks:** [qwen3-tts-0.6b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-tts-0.6b/sglang-omni-qwen3-tts-base-0.6b-dual-mode-runtime/), [qwen3-tts-1.7b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-tts-1.7b/sglang-omni-qwen3-tts-base-1.7b-dual-mode-runtime/).

#### Qwen3-ASR

- **Changes:** Overlaps prefill with decode, captures prefill and decode graphs, and plans encoder chunks.
- **Default behavior:** **Yes, on CUDA**. #2880 and #2881 turn on full prefill graphs and async prefill. #2881 raises some streaming tail latency.
- **Main before → after:** [e43663e → cca9cf5](https://github.com/sgl-project/sglang-omni/compare/e43663e908bf1c3aee15abfd3a19d44373459108...cca9cf580b87b0c039e8da001c415e5c4046bfb2).
- **OpenRSI tasks:** [qwen3-asr-1.7b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-asr-1.7b/qwen3-asr-streaming-throughput/).

#### Whisper

- **Changes:** Incremental text streaming, FlashAttention-4 encoder attention and reachable prefill graphs, in one PR, plus optional encoder-batch pipelining.
- **Default behavior:** **Yes, as measured**. Measured with defaults. Encoder pipelining, dense prefill and the thread cap stay off.
- **Main before → after:** [4809648 → ff302a0](https://github.com/sgl-project/sglang-omni/compare/4809648d486bdff88dee5199b3e448af3c250f00...ff302a0c1ee9c28bce8604c14e374a02d3ec5ade).
- **OpenRSI tasks:** [whisper-v3](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/whisper-large-v3/whisper-asr-streaming-throughput/).

#### MOSS-TD

- **Changes:** Full prefill graphs, packed encoder attention, trimmed fbank extraction and asynchronous prefill.
- **Default behavior:** **Yes, on CUDA**. Full prefill and trimmed fbank become defaults. One 64-client streaming first-text p95 rose.
- **Main before → after:** [6e1a217 → 39113da](https://github.com/sgl-project/sglang-omni/compare/6e1a217974743f7f858537169d835c42f9f0d5b9...39113da3ec2ed39d4bfa370e35b06ea3edd96757).
- **OpenRSI tasks:** [moss-td](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/moss-transcribe-diarize/moss-transcribe-diarize-streaming-throughput/).

#### Ming3-TTS

- **Changes:** Cached GPU reference preprocessing, prefill and vocoder graphs, asynchronous decode and fused flow arithmetic for the 0.5B model.
- **Default behavior:** **0.5B only**. GPU preprocessing, async decode and chunked prefill become defaults; streaming is opt-in.
- **Main before → after:** [e727710 → 069cfe4](https://github.com/sgl-project/sglang-omni/compare/e727710aa6a0b29cef7dc362155c350dae313f21...069cfe406c07ff57d7647d6e19e36de1aeda3c1e).
- **OpenRSI tasks:** [ming3-0.5b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/ming3-0.5b/).

## Method: Harnessed RSI

Today the usual way to optimize a serving stack with AI is an engineer driving a coding agent such as Codex or Claude Code. The agent writes and runs code; the human picks each experiment, reads each result and decides what comes next. **The human is the loop** (Figure 1, left), and for systems work that is costly:

- **Many rounds, mostly idle.** The human has to step in on every round, and each round waits until they read the result and write the next prompt. Most of the wall-clock time is spent waiting on a human, so the loop is slow and inefficient.

- **The human caps what the AI can do.** The agent only explores what the human thinks to try and has time to check. A serving stack holds countless small knobs, settings and code paths, far more than anyone can try one by one, and finding which ones matter takes measurement. One line that stops idle threads from spinning was first proposed inside a larger change (#2443); split out and measured on its own, it was worth +32.5% streaming throughput (#2524).

**Harnessed RSI** (Figure 1, right) takes the human out of the inner loop of performance optimization, not out of the work. Defining a problem well, with its task, benchmark and guards, takes human effort, and system design stays with people. Once that is done, agents propose, run and measure changes to the serving runtime round after round, and people return to review what they find.

1. **Two nested loops that never stop.** An agent explores in the inner loop. The harness governs the outer loop, deciding when work is judged and carrying every lesson into the next round. Rounds run back to back, without waiting on anyone.

2. **Every step is verified.** Nothing counts until an independent verifier, which the agent never sees, confirms it. Within a search, each confirmed gain becomes the bar the next round must beat. Across PRs, later work builds on what landed: #2555 was measured with #2524 in place, and #3071 reuses the asynchronous prefill that #2881 added. That is the recursive part today: AI improving the infrastructure that AI runs on.

**Figure 1. Where the human sits (text version).**

| Human + coding agent | Harnessed RSI |
| --- | --- |
| A human picks the next experiment. | People define the task: model, question, baseline, and verifier. |
| The agent edits and runs code. | The agent explores in a persistent workspace (inner loop). |
| A human reads the output and judges whether it helped. | RSI-Harness submits candidates to an isolated verifier with fresh runs and hidden tests (outer loop). |
| Every new round waits for another human prompt. | Feedback starts the next round, until a submission or time limit; the best verified result becomes the new baseline. |
| Rounds scale with human hours. Evidence is whatever the human checked. | Rounds scale with compute. People review the results. |

## RSI-Anything: A scalable RSI pipeline for SGLang-Omni

On top of the harness we built RSI-Anything, a lightweight pipeline built to scale RSI across SGLang-Omni quickly: it turns a research proposal into merged SGLang-Omni code. Agents handle the experiments and the implementation iteration: building an executable benchmark from the proposal, searching for improvements, reproducing their own gains and opening the pull request with evidence. People write the proposal and own the merge. In review, SGLang-Omni maintainers set requirements and joined the design over many rounds, and in some cases contributed code or reproduced results on their own.

**Figure 2. The RSI-Anything pipeline for SGLang-Omni (text version).**

| Step | Owner | Work and artifact |
| --- | --- | --- |
| 01 — Define | People | Write a research contract in `proposal.md`. |
| 02 — Build | Agents | Turn the proposal into a Harbor task with an executable benchmark and evaluator. |
| 03 — Iterate | Agents + RSI-Harness | Edit, run, and evaluate; retain candidates and logs. |
| 04 — Verify | Agents | Review the trajectory and reproduce the gain. |
| 05 — Contribute | Agents | Prepare the upstream PR with code and evidence. |
| 06 — Land | SGLang-Omni maintainers | Review over multiple rounds, sometimes add code or independently reproduce results, then merge. |

If a gain does not reproduce, step 04 returns to step 03. If review asks for changes, step 06 returns to step 05. A reproducible, merged gain becomes the baseline for the next proposal.

## Merged PRs

The fourteen PRs touch every stage of speech serving, from audio encoders to decoders and vocoders, and they fall into five patterns (Figure 3). Almost all of them remove overhead in the runtime around the model; #2901 also adds incremental text streaming for Whisper, and #3189 and #3190, designed by people, add streaming audio for Ming3-TTS.

These changes target runtime overhead without changing model weights or sampling settings. Output correctness and quality were checked within the reported test coverage; unchanged waveforms or perceptual quality are not established.

### 1. Idle threads compete for cores

Threads that spin while they wait hold CPU cores the rest of the pipeline needs. Letting them sleep gives those cores back, so queued work starts at once.

Related PRs: [#2524 — CosyVoice3](https://github.com/sgl-project/sglang-omni/pull/2524).

### 2. Data is converted at every hop

Tensors were turned into Python lists to cross a stage boundary, then rebuilt on the other side. Now they travel as tensors, and only the final message carries typed bytes.

Related PRs: [#2555 — CosyVoice3](https://github.com/sgl-project/sglang-omni/pull/2555); [#2778 — Fish S2-Pro](https://github.com/sgl-project/sglang-omni/pull/2778).

### 3. Work nobody uses

Some results were computed and thrown away: a quantizer reconstruction no caller needed, a fresh tensor for every embedding channel, a frontend that ran twice on a fallback path, audio features extracted past where they were needed, reference audio encoded again on every request. The agents skip that work.

Related PRs: [#2525 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2525); [#2778 — Fish S2-Pro](https://github.com/sgl-project/sglang-omni/pull/2778); [#2882 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2882); [#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071); [#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136).

### 4. Too many small GPU launches

Launching small kernels one at a time leaves the GPU waiting on the CPU. Capturing whole steps as CUDA graphs, or fusing kernels, replays them at once. [#2901](https://github.com/sgl-project/sglang-omni/pull/2901) also moves encoder attention to FlashAttention-4.

Related PRs: [#2779 — Qwen3-TTS](https://github.com/sgl-project/sglang-omni/pull/2779); [#2859 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2859); [#2880 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2880); [#2901 — Whisper](https://github.com/sgl-project/sglang-omni/pull/2901); [#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071); [#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136).

### 5. Two machines that wait on each other

Prefill and decode run on **two separate machines**. They used to take turns, so each machine sat idle while the other worked. Now the prefill machine starts the next request as soon as it finishes the last one. Its decode starts the moment the decode machine finishes the request before it, so neither machine sits idle.

Related PRs: [#2779 — Qwen3-TTS](https://github.com/sgl-project/sglang-omni/pull/2779); [#2859 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2859); [#2881 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2881); [#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071); [#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136).

**Figure 3.** Fourteen PRs, five patterns. A PR that combines several patterns appears under each of them. [#3189](https://github.com/sgl-project/sglang-omni/pull/3189) and [#3190](https://github.com/sgl-project/sglang-omni/pull/3190) add streaming, a new feature, so they are not shown. The animations are schematic, not measured timelines; both rows of each run on the same clock.

## Why it came together quickly

Figure 4 shows the best search run for each of the first six models, from the task logs. In five of the six, the first candidate to pass every guard arrived within eight hours.

**Figure 4. Best search run for each of the first six models.** Times are hours since the selected run started.

| Model | Runs considered | First candidate passing all guards in the best run (h) | Best reward (× task baseline) | Run duration (h) |
| --- | --- | --- | --- | --- |
| CosyVoice3 | 6 | 46.383 | 1.5389× | 58.2 |
| MOSS-TTS | 17 | 7.255 | 2.1955× | 24.99 |
| Fish S2-Pro | 4 | 5.03 | 1.8033× | 25.7 |
| Qwen3-TTS | 10 | 4.627 | 1.4436× | 22.94 |
| Qwen3-ASR | 5 | 7.364 | 1.6587× | 24.02 |
| Whisper | 2 | 4.191 | 1.9790× | 24.04 |

Reward is throughput over the task’s frozen baseline (1.0×). Guards also check latency and word error rate (WER), so a faster candidate can still fail. Each task scores against its own benchmark: **rewards are not comparable across models or with Table 1**. Appendix B preserves the successful evaluations, rejected measurements, and incomplete measurements plotted in the original interactive figure.

1. **Serving has a scoreboard.** Throughput and latency can be measured automatically, which gives the loop a dense, reliable signal. Quality is harder to score: WER covers transcription accuracy, not how the audio sounds.

2. **One harness, many tasks.** The same harness ran every search, and one proposal led to PRs for four models. Once a task and its evaluator exist, another agent round costs compute, not someone's afternoon.

3. **Guards keep results honest.** Every submission is scored in a clean environment, and a faster candidate that regresses latency or WER earns no reward.

4. **Evidence arrives with the diff.** Every PR came with a serving study and stated caveats, and most with an audit of the raw benchmark records. That gave review a concrete starting point, though review still took a median of about three and a half days and up to 23 commits.

## What this means for inference optimization

Once a problem is well defined, inference optimization turns from work limited by expert attention into a search limited by compute, evaluator quality and review bandwidth.

**Figure 5. Where the bottleneck moves once a problem is well defined (text version).**

| Stage | Before OpenRSI | With Harnessed RSI |
| --- | --- | --- |
| Define the problem | Engineers: system design and first implementation. | People still own design, first implementation, tasks, benchmarks, and guards. |
| Find ideas | An engineer, competing with other priorities. | Multiple agents search from a written proposal. |
| Implement | An engineer, one change at a time. | Multiple agents work in parallel workspaces. |
| Measure | An engineer runs benchmarks manually. | The evaluator’s quality limits what can be found. |
| Review and merge | A maintainer checks claims from scratch. | Maintainers review the evidence; review bandwidth becomes a limit. |

1. **The long tail gets searched to the end.** No human can try every thread setting, data conversion and launch pattern in a serving stack. Agents can work through them one by one and measure each on its own, which is how #2524 showed that a single setting can be worth about a third of throughput.

2. **Tuning becomes continuous.** Once a task and its evaluator exist, a new model, runtime or machine shape can start another round instead of a new project.

3. **Results depend on the deployment.** #2524 is worth +82.9% on 8 cores and +33.6% on 16. Agents can afford to measure each target configuration instead of assuming one answer.

4. **The evaluator is the product.** Agents optimize what is measured, so benchmarks, quality checks and guards against reward hacking become the main engineering work. For speech, WER alone is not enough.

## What’s next

This is the first of many collaborations between OpenRSI and the SGLang-Omni team. Next, we want to hand agents more of the loop that people still run today, and move toward fully autonomous RSI for AI infrastructure. Stay tuned.

[RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness) and [RSI-Anything](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md) are open source. We welcome new tasks: [contribute one](https://github.com/OpenRSI-Foundation/OpenRSI-Index#-call-for-contributors), and contributors with accepted tasks are invited as co-authors.

 [RSI-Harness on GitHub](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness)

## Acknowledgements

Led by Zhuofeng Li, Aaron Tian and Chenyang Zhao, with Yichen Feng, Wenhao Chai, Xinyang Han, Cara Li, Shujia Liang and Yuetai Li. Thanks to the SGLang-Omni team for many rounds of review, design input, code and independent reproductions, and to the other SGLang-Omni contributors whose optimizations landed in the same period.

## Appendix A. Throughput values behind Table 1

Values are copied from the original table’s tooltips, in requests per second (req/s). Each cell is **before → after**. Percentages above preserve the source’s reported precision; they are not recalculated from these rounded rates.

| Model | H100 non-streaming | H100 streaming | H200 non-streaming | H200 streaming |
| --- | --- | --- | --- | --- |
| CosyVoice3 | 10.49 → 15.15 | 9.58 → 14.00 | 7.96 → 11.78 | 6.63 → 10.36 |
| MOSS-TTS | 10.30 → 15.30 | 5.32 → 9.37 | 9.98 → 16.49 | 3.90 → 9.73 |
| Fish S2-Pro | 7.92 → 8.69 | 7.93 → 7.95 | 7.10 → 8.05 | 7.00 → 7.15 |
| Qwen3-TTS | 22.79 → 28.53 | 34.68 → 36.32 | 19.85 → 28.61 | 31.23 → 34.97 |
| Qwen3-ASR | 130.49 → 149.07 | 132.62 → 139.23 | 105.16 → 121.38 | 110.15 → 119.40 |
| Whisper | 65.45 → 70.43 | 67.97 → 76.25 | 55.72 → 63.54 | 59.22 → 69.63 |
| MOSS-TD | 101.89 → 121.05 | 101.24 → 131.62 | 87.67 → 105.15 | 94.71 → 125.13 |
| Ming3-TTS | 8.30 → 35.39 | 8.59 → 16.66 | 7.15 → 31.78 | 7.42 → 15.92 |

## Appendix B. Search trajectory data from Figure 4

These are the points shown for the **best run** of each model, not all runs. The original plot used a solid staircase for verified best rewards, hollow dots for measured candidates that failed a guard, ticks for incomplete measurements, and a dashed line at the frozen 1.0× baseline.

### CosyVoice3

**Passed every guard** — hour → reward:

46.383 → 1.5389×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 1.589 | 1.3990× | CosyVoice3 WER; Qwen3-TTS CustomVoice latency, WER; MOSS-TTS throughput, latency |
| 3.166 | 1.3627× | Qwen3-TTS Base throughput, latency |
| 10.906 | 1.4345× | CosyVoice3 WER; Qwen3-TTS Base latency; Qwen3-TTS CustomVoice latency, WER |
| 12.415 | 0.9947× | CosyVoice3 latency, throughput; Qwen3-TTS CustomVoice WER |
| 14.148 | 1.4497× | Qwen3-TTS Base latency; Qwen3-TTS CustomVoice WER |
| 14.916 | 1.4268× | Qwen3-TTS CustomVoice WER |
| 28.706 | 1.2895× | Qwen3-TTS Base throughput, latency |
| 30.127 | 1.4313× | Qwen3-TTS CustomVoice WER |
| 35.48 | 1.3325× | Qwen3-TTS Base throughput, latency |
| 44.216 | 1.5239× | Qwen3-TTS Base latency |

**No complete measurement (hours):** 37.958, 40.027, 51.087.

### MOSS-TTS

**Passed every guard** — hour → reward:

7.255 → 2.0102×; 11.738 → 2.1117×; 17.917 → 2.1217×; 19.925 → 2.1561×; 21.614 → 2.1675×; 24.928 → 2.1955×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 14.719 | 2.1153× | streaming throughput |
| 23.06 | 2.1742× | throughput |

**No complete measurement (hours):** None.

### Fish S2-Pro

**Passed every guard** — hour → reward:

5.03 → 1.1062×; 7.923 → 1.2075×; 10.981 → 1.4999×; 13.181 → 1.5748×; 15.313 → 1.6169×; 20.823 → 1.7164×; 22.996 → 1.7392×; 25.647 → 1.8033×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 2.363 | 0.9899× | throughput, latency, streaming latency |
| 18.018 | 1.6239× | latency, throughput, streaming latency |

**No complete measurement (hours):** None.

### Qwen3-TTS

**Passed every guard** — hour → reward:

4.627 → 1.2687×; 12.399 → 1.4436×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 6.907 | 1.2725× | latency, streaming latency |
| 10.009 | 1.2837× | latency |
| 15.207 | 1.3504× | throughput, latency, streaming throughput |
| 18.459 | 1.4383× | throughput |
| 20.872 | 1.4755× | latency, streaming latency |
| 22.748 | 1.4521× | streaming throughput |

**No complete measurement (hours):** 1.702, 2.293, 7.35, 7.542, 8.553.

### Qwen3-ASR

**Passed every guard** — hour → reward:

7.364 → 1.2108×; 8.818 → 1.3121×; 10.005 → 1.5306×; 14.074 → 1.6175×; 21.428 → 1.6587×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 4.356 | 1.1355× | latency, streaming latency |
| 6.491 | 1.2185× | streaming latency |
| 16.012 | 1.6302× | latency |
| 18.095 | 1.6286× | latency |
| 18.833 | 1.6589× | streaming latency |
| 20.443 | 1.6450× | latency, streaming latency |
| 22.723 | 1.6411× | latency, streaming latency, no gain over the current best |

**No complete measurement (hours):** 3.896.

### Whisper

**Passed every guard** — hour → reward:

4.191 → 1.3478×; 5.421 → 1.6218×; 6.394 → 1.7370×; 8.547 → 1.7587×; 11.173 → 1.9449×; 23.087 → 1.9790×.

| Hour | Measured ratio (× baseline; rejected) | Failed guards |
| --- | --- | --- |
| 9.969 | 1.7868× | streaming latency |
| 14.699 | 1.9895× | streaming latency |
| 17.334 | 1.9889× | streaming latency |
| 19.451 | 1.9831× | streaming latency |

**No complete measurement (hours):** 2.74, 2.933.

---

Source: [original article](https://zhuofeng-li.github.io/blog/2026/openrsi-sglang-omni/); [source snapshot](https://github.com/Zhuofeng-Li/Zhuofeng-Li.github.io/blob/1f53aa4cd699fdffb84f60393564b161c97a4cf7/_posts/2026-11-09-openrsi-sglang-omni.html). Markdown edition prepared November 10, 2026.
