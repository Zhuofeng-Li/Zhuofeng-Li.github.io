# OpenRSI × SGLang-Omni：将递归自我改进扩展到 AI 基础设施

[Zhuofeng Li](https://zhuofeng-li.github.io/)\*, [Aaron Tian](https://github.com/db-ol)\*, [Yichen Feng](https://yichenfeng.me/), [Wenhao Chai](https://wenhaochai.com/), [Xinyang Han](https://davidhanx.github.io/), [Cara Li](https://caralinotes.com/), [Shujia Liang](https://vincentcaptain.github.io/), [Yuetai Li](https://yuetl9.github.io/), [Chenyang Zhao](https://github.com/zhaochenyang20)\*

\* 项目负责人。本文由 OpenRSI 与 SGLang-Omni 团队合作完成。

**发布日期：** 2026 年 11 月 9 日。

[原始交互式文章](https://zhuofeng-li.github.io/blog/2026/openrsi-sglang-omni/) · [English version](./openrsi-sglang-omni.en.md)

> 本 Markdown 版本保留原文发布时的正文、实验结果、引用和限制说明。交互图以文字及数据表呈现，动画可在原网页查看。本次转换没有重新运行基准测试。

## 概览

OpenRSI 将递归自我改进（Recursive Self-Improvement，RSI）扩展到真实的 AI 基础设施。我们的智能体持续运行性能优化循环，每项收益都由独立验证器确认；人类负责定义问题，并在最后审阅改动。通过与 SGLang-Omni 合作，这套循环已应用于八个 omni 模型，在 H100 上测得的各模型吞吐提升为 +7.6% 至 +326.5%。截至原文发布，已产生十四个 PR，全部经 SGLang-Omni 维护者审阅并合并。

这里的 +7.6% 至 +326.5% 对应表 1 中的 **H100 非流式测量结果**。流式结果及收益归因的限制在下文单独列出。

- [OpenRSI-SGLang-Omni 任务](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI)
- [RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness)
- [RSI-Anything 数据流水线](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md)

## 引言

递归自我改进，也就是让 AI 改进自身，是人工智能领域最重要的研究问题之一。然而，多数演示仍停留在基准测试和玩具问题上。OpenRSI 向真实场景中的 RSI 迈出了第一步：智能体改进为 AI 模型提供服务的基础设施，每项经过验证并合并的改动都会成为下一轮的基线。具体而言，给定目标后，智能体提出假设、设计实验，并依据证据调整方案，持续迭代；独立验证器则确认每项收益。

这次我们与 SGLang-Omni 团队合作，共同设定目标：在不修改模型权重、也不拖慢其他模型的前提下，让 omni 模型在 SGLang-Omni 中运行得更快。我们通过 [RSI-Anything](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md) 将目标转化为任务，再由智能体在 [RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness) 上执行。智能体承担大量实验工作，以人类难以逐轮匹配的速度开展搜索，并产出能够通过上游审阅的优化，与人类专家形成互补。成果最终成为用户可以实际运行的代码：SGLang-Omni 维护者已合并十四个 PR，覆盖八个 omni 模型（表 1）。智能体负责的是性能优化；任务定义、Ming3-TTS 流式输出等系统设计，以及代码审阅，均由人类完成。

### 表 1：已合并到 SGLang-Omni 的 OpenRSI 改动

每行比较该模型首个 OpenRSI PR 合并前的 main，与最后一个 OpenRSI PR 合并后的 main。每轮使用 **128 个请求**。收益按「非流式 / 流式」列出。

| 模型 | 已合并 PR | H100 吞吐提升：非流式 / 流式 | H200 吞吐提升：非流式 / 流式 |
| --- | --- | --- | --- |
| CosyVoice3 | [#2524](https://github.com/sgl-project/sglang-omni/pull/2524)、[#2555](https://github.com/sgl-project/sglang-omni/pull/2555) | +44.4% / +46.2% | +48.1% / +56.3% |
| MOSS-TTS [1] | [#2525](https://github.com/sgl-project/sglang-omni/pull/2525)、[#2859](https://github.com/sgl-project/sglang-omni/pull/2859) | +48.5% / +76.3% | +65.2% / +149.5% |
| Fish S2-Pro | [#2778](https://github.com/sgl-project/sglang-omni/pull/2778) | +9.6% / +0.3% | +13.4% / +2.1% |
| Qwen3-TTS | [#2779](https://github.com/sgl-project/sglang-omni/pull/2779) | +25.2% / +4.7% | +44.1% / +12.0% |
| Qwen3-ASR [2] | [#2880](https://github.com/sgl-project/sglang-omni/pull/2880)、[#2881](https://github.com/sgl-project/sglang-omni/pull/2881)、[#2882](https://github.com/sgl-project/sglang-omni/pull/2882) | +14.2% / +5.0% | +15.4% / +8.4% |
| Whisper | [#2901](https://github.com/sgl-project/sglang-omni/pull/2901) | +7.6% / +12.2% | +14.0% / +17.6% |
| MOSS-TD | [#3071](https://github.com/sgl-project/sglang-omni/pull/3071) | +18.8% / +30.0% | +19.9% / +32.1% |
| Ming3-TTS [3] | [#3136](https://github.com/sgl-project/sglang-omni/pull/3136)、[#3189](https://github.com/sgl-project/sglang-omni/pull/3189)、[#3190](https://github.com/sgl-project/sglang-omni/pull/3190) | +326.5% / +93.9% | +344.3% / +114.5% |

**收益归因与测量限制**

1. **MOSS-TTS：收益并非全部来自 OpenRSI。** 对比区间还包括流式 codec 重写（[#2805](https://github.com/sgl-project/sglang-omni/pull/2805)）、[#2662](https://github.com/sgl-project/sglang-omni/pull/2662)、[#2770](https://github.com/sgl-project/sglang-omni/pull/2770)、[#2772](https://github.com/sgl-project/sglang-omni/pull/2772)，以及 SGLang 0.5.22 升级（[#2964](https://github.com/sgl-project/sglang-omni/pull/2964)）；前后使用了不同的镜像。[#2859](https://github.com/sgl-project/sglang-omni/pull/2859) 增加了约 **41 秒启动时间和 3.7 GiB 峰值显存**。H200 的流式基线较低，为 3.90 req/s，而 H100 为 5.32 req/s，原因尚不明确，因此需谨慎解读 +149.5%。
2. **Qwen3-ASR：收益并非全部来自 OpenRSI。** 对比区间还包括 SGLang 0.5.22 升级（[#2964](https://github.com/sgl-project/sglang-omni/pull/2964)），前后使用了不同的镜像。
3. **Ming3-TTS：收益并非全部来自 OpenRSI。** 对比区间包含 **28 个其他 PR**。[#3136](https://github.com/sgl-project/sglang-omni/pull/3136) 还修复了基线中的采样错误，基准测试会重复使用参考录音。[#3189](https://github.com/sgl-project/sglang-omni/pull/3189) 和 [#3190](https://github.com/sgl-project/sglang-omni/pull/3190) 中需要显式开启的流式输出由人类设计。

### 改动、基线与默认设置

#### CosyVoice3

- **改动：** 让空闲的编码器线程进入休眠，替代忙等待；参考特征以张量形式跨阶段传递。
- **默认行为：** **默认生效。** 仅修改代码，不改变默认配置。
- **main 分支改动前 → 改动后：** [f29a119 → fe4b23f](https://github.com/sgl-project/sglang-omni/compare/f29a1195d12826bcedfda78f4e58429745eda5b8...fe4b23f06b27f7b2492703891c8036a919d2041e)。
- **OpenRSI 任务：** [cosyvoice3](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/cosyvoice3/sglang-omni-cosyvoice3-dual-mode-runtime/)。

#### MOSS-TTS

- **改动：** 原地累加嵌入、融合通道嵌入计算，并让通过 CUDA Graph 执行的解码与其他工作重叠。
- **默认行为：** **默认生效。** #2859 开启异步 decode，并将自回归模型的显存占比从 0.72 降至 0.60。
- **main 分支改动前 → 改动后：** [a65abc0 → 53ea267](https://github.com/sgl-project/sglang-omni/compare/a65abc07e535a57589aebc7ebbf92498e2170761...53ea2678733ac7b4c4744895e8cf2632117c2dcd)。
- **OpenRSI 任务：** [moss-tts-v1.5](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/moss-tts-v1.5/sglang-omni-moss-v1.5-dual-mode-runtime/)。

#### Fish S2-Pro

- **改动：** 跳过未被使用的量化器重建计算，并将波形打包。
- **默认行为：** **默认生效。** 仅修改代码，不改变默认配置。
- **main 分支改动前 → 改动后：** [08182f2 → 28c3e35](https://github.com/sgl-project/sglang-omni/compare/08182f2bc44dbf951e086927d6eb657f3a419171...28c3e35a33bef2f45b3315431f4a512d6ed463cf)。
- **OpenRSI 任务：** [fish-s2-pro](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/fish-s2-pro/sglang-omni-fish-s2-pro-dual-mode-runtime/)。

#### Qwen3-TTS

- **改动：** 为 Base 模型复用 prefill 和声码器的 CUDA Graph。
- **默认行为：** **默认生效。** 收益包含新的 0.6B 声码器批处理默认配置：每批两个请求，不等待。
- **main 分支改动前 → 改动后：** [8220d22 → 08182f2](https://github.com/sgl-project/sglang-omni/compare/8220d220703cf8d8f5c5d9a2cde00b5ed13717b8...08182f2bc44dbf951e086927d6eb657f3a419171)。
- **OpenRSI 任务：** [qwen3-tts-0.6b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-tts-0.6b/sglang-omni-qwen3-tts-base-0.6b-dual-mode-runtime/)、[qwen3-tts-1.7b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-tts-1.7b/sglang-omni-qwen3-tts-base-1.7b-dual-mode-runtime/)。

#### Qwen3-ASR

- **改动：** 让 prefill 与 decode 重叠，捕获 prefill 和 decode 的 CUDA Graph，并预先规划编码器分块。
- **默认行为：** **在 CUDA 上默认生效。** #2880 和 #2881 开启完整 prefill CUDA Graph 和异步 prefill。#2881 使部分流式尾延迟上升。
- **main 分支改动前 → 改动后：** [e43663e → cca9cf5](https://github.com/sgl-project/sglang-omni/compare/e43663e908bf1c3aee15abfd3a19d44373459108...cca9cf580b87b0c039e8da001c415e5c4046bfb2)。
- **OpenRSI 任务：** [qwen3-asr-1.7b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/qwen3-asr-1.7b/qwen3-asr-streaming-throughput/)。

#### Whisper

- **改动：** 在同一个 PR 中加入增量文本流式输出、FlashAttention-4 编码器注意力，以及能够实际触发的 prefill CUDA Graph；另提供可选的编码器批次流水线。
- **默认行为：** **按测量时的默认配置生效。** 编码器流水线、dense prefill 和线程数上限仍保持关闭。
- **main 分支改动前 → 改动后：** [4809648 → ff302a0](https://github.com/sgl-project/sglang-omni/compare/4809648d486bdff88dee5199b3e448af3c250f00...ff302a0c1ee9c28bce8604c14e374a02d3ec5ade)。
- **OpenRSI 任务：** [whisper-v3](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/whisper-large-v3/whisper-asr-streaming-throughput/)。

#### MOSS-TD

- **改动：** 完整 prefill CUDA Graph、打包的编码器注意力、裁剪 fbank 特征提取，以及异步 prefill。
- **默认行为：** **在 CUDA 上默认生效。** 完整 prefill CUDA Graph 和裁剪后的 fbank 提取成为默认设置。在一项 64 并发客户端的流式测试中，首段文本的 p95 延迟上升。
- **main 分支改动前 → 改动后：** [6e1a217 → 39113da](https://github.com/sgl-project/sglang-omni/compare/6e1a217974743f7f858537169d835c42f9f0d5b9...39113da3ec2ed39d4bfa370e35b06ea3edd96757)。
- **OpenRSI 任务：** [moss-td](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/moss-transcribe-diarize/moss-transcribe-diarize-streaming-throughput/)。

#### Ming3-TTS

- **改动：** 针对 0.5B 模型，缓存 GPU 参考音频预处理结果，使用 prefill 和声码器 CUDA Graph、异步 decode，以及融合的 flow 算术计算。
- **默认行为：** **仅适用于 0.5B。** GPU 预处理、异步 decode 和分块 prefill 成为默认设置；流式输出需要显式开启。
- **main 分支改动前 → 改动后：** [e727710 → 069cfe4](https://github.com/sgl-project/sglang-omni/compare/e727710aa6a0b29cef7dc362155c350dae313f21...069cfe406c07ff57d7647d6e19e36de1aeda3c1e)。
- **OpenRSI 任务：** [ming3-0.5b](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/rsi-tasks/SGNOMI/ming3-0.5b/)。

## 方法：Harnessed RSI

目前，使用 AI 优化推理服务栈的常见方式，是由工程师驱动 Codex 或 Claude Code 这样的编码智能体。智能体编写并运行代码，人类选择每个实验、阅读每次结果，再决定下一步。**人类本身就是循环**（图 1 左侧），这对系统优化而言代价很高：

- **轮次很多，大量时间却在等待。** 每轮都需要人类介入，等待人读完结果、写出下一条提示词。大部分实际耗时花在等待人类上，因此循环缓慢且低效。
- **人类限制了 AI 能探索的范围。** 智能体只会尝试人类想到、且有时间检查的方案。服务栈中有无数细小的调节项、设置与代码路径，远超任何人逐项尝试的能力，而判断哪些真正重要需要测量。一行让空闲线程停止忙等待的设置，最初包含在较大的改动 #2443 中；拆出并单独测量后，它带来了 +32.5% 的流式吞吐提升（#2524）。

**Harnessed RSI**（图 1 右侧）将人类从性能优化的内部循环中移出，但人类仍然参与整个工作。把问题定义清楚，包括任务、基准和约束门槛，需要人类投入；系统设计也仍由人类负责。完成这些后，智能体逐轮提出、运行并测量服务运行时的改动，人类再回来审阅发现。

1. **两个持续运行的嵌套循环。** 智能体在内层探索；harness 管理外层循环，决定何时评估工作，并把每轮经验带入下一轮。各轮连续运行，无须等待人类。
2. **每一步都经过验证。** 只有智能体无法查看的独立验证器确认结果后，收益才被计入。一次搜索中，每项确认的收益都成为下一轮必须超越的标准。不同 PR 之间，后续工作建立在已合并改动之上：#2555 的测量以 #2524 已生效为前提，#3071 复用了 #2881 引入的异步 prefill。这就是当前的递归部分：AI 改进承载 AI 运行的基础设施。

**图 1：人类位于何处（文字版）。**

| 人类 + 编码智能体 | Harnessed RSI |
| --- | --- |
| 人类选择下一个实验。 | 人类定义任务：模型、问题、基线和验证器。 |
| 智能体编辑并运行代码。 | 智能体在持久工作区中探索，构成内层循环。 |
| 人类阅读输出，判断是否有效。 | RSI-Harness 将候选提交给隔离验证器，使用全新运行和隐藏测试，构成外层循环。 |
| 每轮都等待人类的新提示词。 | 反馈启动下一轮，直至达到提交次数或时间上限；最佳已验证结果成为新基线。 |
| 轮次数受人类工作时间限制，证据取决于人类检查了什么。 | 轮次数随计算资源扩展，人类负责审阅结果。 |

## RSI-Anything：面向 SGLang-Omni 的可扩展 RSI 流水线

我们在 harness 之上构建了 RSI-Anything。这是一套轻量流水线，用于把 RSI 快速扩展到 SGLang-Omni：将研究提案转化为最终合并的 SGLang-Omni 代码。智能体负责实验与实现迭代，包括从提案构建可执行基准、搜索改进、复现自身收益，以及提交附带证据的 PR。人类撰写提案，并负责合并决策。审阅过程中，SGLang-Omni 维护者提出要求，多轮参与设计，有时也贡献代码或独立复现结果。

**图 2：SGLang-Omni 的 RSI-Anything 流水线（文字版）。**

| 步骤 | 负责人 | 工作与产物 |
| --- | --- | --- |
| 01 — 定义 | 人类 | 在 `proposal.md` 中写出研究约定。 |
| 02 — 构建 | 智能体 | 将提案转化为 Harbor 任务，包含可执行基准和评估器。 |
| 03 — 迭代 | 智能体 + RSI-Harness | 编辑、运行、评估，保留候选与日志。 |
| 04 — 验证 | 智能体 | 回顾轨迹，复现性能收益。 |
| 05 — 贡献 | 智能体 | 准备附有代码与证据的上游 PR。 |
| 06 — 合并 | SGLang-Omni 维护者 | 多轮审阅，必要时补充代码或独立复现，最后合并。 |

若收益无法复现，步骤 04 返回步骤 03；若审阅要求修改，步骤 06 返回步骤 05。可复现且已合并的收益成为下一份提案的基线。

## 已合并的 PR

这十四个 PR 涉及语音服务的各个阶段，从音频编码器到解码器和声码器，可归为五类模式（图 3）。它们几乎都在消除模型外围的运行时开销；此外，#2901 为 Whisper 增加了增量文本流式输出，#3189 和 #3190 则按人类设计为 Ming3-TTS 增加了流式音频输出。

这些改动针对运行时开销，不修改模型权重或采样设置。输出正确性和质量已经在所报告的测试覆盖范围内检查；**这并不意味着已经证实波形完全不变，或感知质量完全不变**。

### 1. 空闲线程争用 CPU 核心

等待时持续忙转的线程会占住流水线其他部分需要的 CPU 核心。让这些线程休眠，就能释放核心，使排队的工作及时开始。

相关 PR：[#2524 — CosyVoice3](https://github.com/sgl-project/sglang-omni/pull/2524)。

### 2. 数据每经过一站都要转换

过去，张量在跨越阶段边界前被转成 Python 列表，到达另一侧后再重建。现在，数据以张量形式传递，只有最后的消息携带具有明确数据类型的字节表示。

相关 PR：[#2555 — CosyVoice3](https://github.com/sgl-project/sglang-omni/pull/2555)；[#2778 — Fish S2-Pro](https://github.com/sgl-project/sglang-omni/pull/2778)。

### 3. 计算了没人使用的结果

某些结果算完就被丢弃：没有调用者需要的量化器重建结果、每个嵌入通道各自新建的张量、回退路径中运行两次的前端、超出所需范围的音频特征，以及每个请求都重新编码的参考音频。智能体跳过了这些工作。

相关 PR：[#2525 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2525)；[#2778 — Fish S2-Pro](https://github.com/sgl-project/sglang-omni/pull/2778)；[#2882 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2882)；[#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071)；[#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136)。

### 4. 太多细碎的 GPU 启动操作

逐个启动小 kernel 会让 GPU 等待 CPU。将完整步骤捕获为 CUDA Graph，或融合 kernel，便能一起重放这些操作。[#2901](https://github.com/sgl-project/sglang-omni/pull/2901) 还将编码器注意力迁移到了 FlashAttention-4。

相关 PR：[#2779 — Qwen3-TTS](https://github.com/sgl-project/sglang-omni/pull/2779)；[#2859 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2859)；[#2880 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2880)；[#2901 — Whisper](https://github.com/sgl-project/sglang-omni/pull/2901)；[#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071)；[#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136)。

### 5. 两台机器互相等待

Prefill 和 decode 运行在**两台不同的机器**上。过去两者轮流工作，一台运行时，另一台处于空闲。现在，prefill 机器完成前一个请求后便立即开始下一个；decode 机器一旦完成前一个请求，就接着处理已经准备好的请求，减少两台机器的空转。

相关 PR：[#2779 — Qwen3-TTS](https://github.com/sgl-project/sglang-omni/pull/2779)；[#2859 — MOSS-TTS](https://github.com/sgl-project/sglang-omni/pull/2859)；[#2881 — Qwen3-ASR](https://github.com/sgl-project/sglang-omni/pull/2881)；[#3071 — MOSS-TD](https://github.com/sgl-project/sglang-omni/pull/3071)；[#3136 — Ming3-TTS](https://github.com/sgl-project/sglang-omni/pull/3136)。

**图 3：十四个 PR，五类模式。** 同时包含多种模式的 PR 会出现在多个类别中。[#3189](https://github.com/sgl-project/sglang-omni/pull/3189) 和 [#3190](https://github.com/sgl-project/sglang-omni/pull/3190) 增加的是流式输出新功能，因此未列入这些模式。原网页中的动画只是示意，并非实测时间线；每组上下两行动画使用同一时钟。

## 为什么能这么快取得进展

图 4 根据任务日志，展示前六个模型各自的最佳搜索运行。其中五个模型，在这次最佳运行开始后的八小时内就产生了首个通过所有门槛的候选。

**图 4：前六个模型各自的最佳搜索运行。** 时间从该次运行开始计算，单位为小时。

| 模型 | 纳入比较的运行次数 | 最佳运行中首个通过全部门槛的候选出现时间（h） | 最佳奖励（相对任务基线） | 运行时长（h） |
| --- | --- | --- | --- | --- |
| CosyVoice3 | 6 | 46.383 | 1.5389× | 58.2 |
| MOSS-TTS | 17 | 7.255 | 2.1955× | 24.99 |
| Fish S2-Pro | 4 | 5.03 | 1.8033× | 25.7 |
| Qwen3-TTS | 10 | 4.627 | 1.4436× | 22.94 |
| Qwen3-ASR | 5 | 7.364 | 1.6587× | 24.02 |
| Whisper | 2 | 4.191 | 1.9790× | 24.04 |

奖励是吞吐量与该任务固定基线（1.0×）的比值。门槛还检查延迟和词错误率（WER），因此更快的候选也可能不通过。每个任务使用自己的基准，**不同模型之间的奖励不能直接比较，也不能与表 1 的结果直接比较**。附录 B 保留了原交互图展示的成功评测、未通过门槛的测量，以及未完成完整测量的时间点。

1. **推理服务有明确的评分标准。** 吞吐和延迟可以自动测量，为循环提供密集且可靠的信号。质量更难评估：WER 衡量转写准确性，并不能说明音频听起来如何。
2. **一套 harness，承载多个任务。** 所有搜索都运行在同一套 harness 上，一份提案就产生了面向四个模型的 PR。只要任务和评估器已经存在，再开展一轮智能体搜索消耗的是计算资源，而不是某个人的一下午。
3. **约束门槛让结果可信。** 每次提交都在干净环境中评分。候选即使更快，只要延迟或 WER 回退，也得不到奖励。
4. **证据随代码差异一同提交。** 每个 PR 都附带服务性能研究与明确的限制说明，多数还审计了原始基准记录。这让审阅有了具体起点，但审阅时间的中位数仍约为三天半，单个 PR 最多经历了 23 次提交。

## 这对推理优化意味着什么

当问题被清楚定义后，推理优化就从受专家注意力限制的工作，转变为受计算资源、评估器质量和审阅能力限制的搜索。

**图 5：问题定义清楚之后，瓶颈如何转移（文字版）。**

| 阶段 | OpenRSI 之前 | 使用 Harnessed RSI 之后 |
| --- | --- | --- |
| 定义问题 | 工程师负责系统设计与初始实现。 | 人类仍负责设计、初始实现、任务、基准与约束门槛。 |
| 寻找思路 | 由工程师完成，与其他工作争夺时间。 | 多个智能体从书面提案出发搜索。 |
| 实现 | 工程师逐个实现改动。 | 多个智能体在并行工作区中实现。 |
| 测量 | 工程师手动运行基准。 | 评估器质量决定能够发现什么。 |
| 审阅与合并 | 维护者从头核查结论。 | 维护者审阅证据，审阅时间成为限制。 |

1. **长尾优化也能被逐项搜索。** 人类无法尝遍服务栈中的每个线程设置、数据转换和启动模式。智能体可以逐项尝试并单独测量。#2524 就表明，一个设置便可能带来约三分之一的吞吐提升。
2. **调优变成持续过程。** 只要任务和评估器存在，新模型、新运行时或新机器配置就能启动下一轮搜索，无须重新发起一个项目。
3. **结果取决于部署环境。** #2524 在 8 核配置下带来 +82.9%，在 16 核配置下为 +33.6%。智能体有能力分别测量每个目标配置，而不是假设一个答案适用于所有环境。
4. **评估器本身成为核心产品。** 智能体优化被测量的指标，因此基准、质量检查以及防止奖励投机的门槛，成为主要工程工作。对语音而言，仅有 WER 并不够。

## 下一步

这是 OpenRSI 与 SGLang-Omni 团队一系列合作中的第一次。接下来，我们希望把更多目前仍由人类执行的环节交给智能体，逐步迈向 AI 基础设施的全自主 RSI。敬请关注。

[RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness) 与 [RSI-Anything](https://github.com/OpenRSI-Foundation/OpenRSI-Index/blob/main/CONTRIBUTING.md) 均已开源。欢迎[贡献新任务](https://github.com/OpenRSI-Foundation/OpenRSI-Index#-call-for-contributors)，任务被接纳的贡献者将受邀成为共同作者。

[在 GitHub 查看 RSI-Harness](https://github.com/OpenRSI-Foundation/OpenRSI-Index/tree/main/RSI-Harness)

## 致谢

本项目由 Zhuofeng Li、Aaron Tian 和 Chenyang Zhao 牵头，Yichen Feng、Wenhao Chai、Xinyang Han、Cara Li、Shujia Liang 和 Yuetai Li 参与。感谢 SGLang-Omni 团队进行了多轮审阅，提供设计建议、代码与独立复现；也感谢同期将其他优化合并到项目中的 SGLang-Omni 贡献者。

## 附录 A：表 1 对应的吞吐量原始数值

以下数值来自原文表格的悬浮提示，单位为请求/秒（req/s）。每格均为**改动前 → 改动后**。前文百分比沿用原文报告的精度，没有根据这些经过舍入的速率重新计算。

| 模型 | H100 非流式 | H100 流式 | H200 非流式 | H200 流式 |
| --- | --- | --- | --- | --- |
| CosyVoice3 | 10.49 → 15.15 | 9.58 → 14.00 | 7.96 → 11.78 | 6.63 → 10.36 |
| MOSS-TTS | 10.30 → 15.30 | 5.32 → 9.37 | 9.98 → 16.49 | 3.90 → 9.73 |
| Fish S2-Pro | 7.92 → 8.69 | 7.93 → 7.95 | 7.10 → 8.05 | 7.00 → 7.15 |
| Qwen3-TTS | 22.79 → 28.53 | 34.68 → 36.32 | 19.85 → 28.61 | 31.23 → 34.97 |
| Qwen3-ASR | 130.49 → 149.07 | 132.62 → 139.23 | 105.16 → 121.38 | 110.15 → 119.40 |
| Whisper | 65.45 → 70.43 | 67.97 → 76.25 | 55.72 → 63.54 | 59.22 → 69.63 |
| MOSS-TD | 101.89 → 121.05 | 101.24 → 131.62 | 87.67 → 105.15 | 94.71 → 125.13 |
| Ming3-TTS | 8.30 → 35.39 | 8.59 → 16.66 | 7.15 → 31.78 | 7.42 → 15.92 |

## 附录 B：图 4 的搜索轨迹数据

这里保留的是每个模型**最佳运行**中在图上展示的数据点，不包含其他运行的全部数据。原图中，实线阶梯表示已验证的最佳奖励，空心点表示已测量但未通过门槛的候选，短刻度表示未完成完整测量，虚线表示固定的 1.0× 基线。

### CosyVoice3

**通过全部门槛**，格式为「小时 → 奖励」：

46.383 → 1.5389×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 1.589 | 1.3990× | CosyVoice3 词错误率（WER）; Qwen3-TTS CustomVoice 延迟, 词错误率（WER）; MOSS-TTS 吞吐量, 延迟 |
| 3.166 | 1.3627× | Qwen3-TTS Base 吞吐量, 延迟 |
| 10.906 | 1.4345× | CosyVoice3 词错误率（WER）; Qwen3-TTS Base 延迟; Qwen3-TTS CustomVoice 延迟, 词错误率（WER） |
| 12.415 | 0.9947× | CosyVoice3 延迟, 吞吐量; Qwen3-TTS CustomVoice 词错误率（WER） |
| 14.148 | 1.4497× | Qwen3-TTS Base 延迟; Qwen3-TTS CustomVoice 词错误率（WER） |
| 14.916 | 1.4268× | Qwen3-TTS CustomVoice 词错误率（WER） |
| 28.706 | 1.2895× | Qwen3-TTS Base 吞吐量, 延迟 |
| 30.127 | 1.4313× | Qwen3-TTS CustomVoice 词错误率（WER） |
| 35.48 | 1.3325× | Qwen3-TTS Base 吞吐量, 延迟 |
| 44.216 | 1.5239× | Qwen3-TTS Base 延迟 |

**未完成完整测量的时间点（h）：** 37.958、40.027、51.087。

### MOSS-TTS

**通过全部门槛**，格式为「小时 → 奖励」：

7.255 → 2.0102×；11.738 → 2.1117×；17.917 → 2.1217×；19.925 → 2.1561×；21.614 → 2.1675×；24.928 → 2.1955×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 14.719 | 2.1153× | 流式吞吐量 |
| 23.06 | 2.1742× | 吞吐量 |

**未完成完整测量的时间点（h）：** 无。

### Fish S2-Pro

**通过全部门槛**，格式为「小时 → 奖励」：

5.03 → 1.1062×；7.923 → 1.2075×；10.981 → 1.4999×；13.181 → 1.5748×；15.313 → 1.6169×；20.823 → 1.7164×；22.996 → 1.7392×；25.647 → 1.8033×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 2.363 | 0.9899× | 吞吐量, 延迟, 流式延迟 |
| 18.018 | 1.6239× | 延迟, 吞吐量, 流式延迟 |

**未完成完整测量的时间点（h）：** 无。

### Qwen3-TTS

**通过全部门槛**，格式为「小时 → 奖励」：

4.627 → 1.2687×；12.399 → 1.4436×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 6.907 | 1.2725× | 延迟, 流式延迟 |
| 10.009 | 1.2837× | 延迟 |
| 15.207 | 1.3504× | 吞吐量, 延迟, 流式吞吐量 |
| 18.459 | 1.4383× | 吞吐量 |
| 20.872 | 1.4755× | 延迟, 流式延迟 |
| 22.748 | 1.4521× | 流式吞吐量 |

**未完成完整测量的时间点（h）：** 1.702、2.293、7.35、7.542、8.553。

### Qwen3-ASR

**通过全部门槛**，格式为「小时 → 奖励」：

7.364 → 1.2108×；8.818 → 1.3121×；10.005 → 1.5306×；14.074 → 1.6175×；21.428 → 1.6587×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 4.356 | 1.1355× | 延迟, 流式延迟 |
| 6.491 | 1.2185× | 流式延迟 |
| 16.012 | 1.6302× | 延迟 |
| 18.095 | 1.6286× | 延迟 |
| 18.833 | 1.6589× | 流式延迟 |
| 20.443 | 1.6450× | 延迟, 流式延迟 |
| 22.723 | 1.6411× | 延迟, 流式延迟, 未超过当前最佳结果 |

**未完成完整测量的时间点（h）：** 3.896。

### Whisper

**通过全部门槛**，格式为「小时 → 奖励」：

4.191 → 1.3478×；5.421 → 1.6218×；6.394 → 1.7370×；8.547 → 1.7587×；11.173 → 1.9449×；23.087 → 1.9790×。

| 时间（h） | 测得的相对基线比值（未通过） | 未通过的门槛 |
| --- | --- | --- |
| 9.969 | 1.7868× | 流式延迟 |
| 14.699 | 1.9895× | 流式延迟 |
| 17.334 | 1.9889× | 流式延迟 |
| 19.451 | 1.9831× | 流式延迟 |

**未完成完整测量的时间点（h）：** 2.74、2.933。

---

来源：[原始文章](https://zhuofeng-li.github.io/blog/2026/openrsi-sglang-omni/)；[文章源码快照](https://github.com/Zhuofeng-Li/Zhuofeng-Li.github.io/blob/1f53aa4cd699fdffb84f60393564b161c97a4cf7/_posts/2026-11-09-openrsi-sglang-omni.html)。Markdown 版本整理于 2026 年 11 月 10 日。
