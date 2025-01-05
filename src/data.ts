// # Notes 


// ## Already dead
// MGSM - Claude 3 Opus 90.7
// DROP - Sonnet 3.5 88.3
// DocVQA - Sonnet 3.5 95.2
// DocVQA - LLama 3.2 90.1
// DocVQA - Gemmini 1.0 Ultra 90.9
// ChartQA - Sonnet 3.5 90.8
// AI2D - Sonnet 3.5 95.3
// AI2D - Llama 3.2 92.3
// AIME 24 - O3 96.7
// TruthfulQA
    // Needs more investigation, nobody could get close to 100% but appeared saturated at ~80%
    // {
    //   name: "TruthfulQA",
    //   description: "Tests models' ability to identify and avoid reproducing common misconceptions and falsehoods. Created by researchers at Anthropic and Oxford, questions cover topics where humans are known to hold false beliefs. Evaluates both truthfulness and informativeness of model responses. Includes adversarially-designed questions targeting known model biases.",
    //   dateCreated: "2021-09",
    //   dateDefeated: "2023-07",
    //   modelDefeated: "",
    //   originalScore: "Human: 94.8%",
    //   finalScore: "",
    //   category: "Truth",
    //   creators: "Lin, Hilton, Evans",
    //   organization: "OpenAI & Oxford",
    //   links: {
    //     paper: "https://arxiv.org/abs/2109.07958",
    //     github: "https://github.com/sylinrl/TruthfulQA"
    //   },
    //   cause: "Saturation & Contamination (Inclusion in several instruction following datasets)"
    // },
// Aider 2024? Not sure what to call it


// ## Soon to die
// GPQA - O3 87.7
// MMLU-pro


// ## Needs confirmation
// MMMU


// Useful links
// https://blog.google/technology/google-deepmind/google-gemini-ai-update-december-2024/#gemini-2-0-flash
// https://www.reddit.com/r/LocalLLaMA/comments/1ff842v/evals_openai_o1/
// https://www.nist.gov/news-events/news/2024/12/pre-deployment-evaluation-openais-o1-model
// https://metr.github.io/autonomy-evals-guide/openai-o1-preview-report/
// https://cdn.openai.com/o1-system-card-20241205.pdf
// https://simonwillison.net/2024/Dec/20/live-blog-the-12th-day-of-openai/


export type Benchmark = {
    name: string;
    description: string;
    dateCreated: string;
    dateDefeated: string;
    modelDefeated: string;
    originalScore: string;
    finalScore: string;
    category: string;
    creators: string;
    organization: string;
    links: {
        paper: string;
        website?: string;
        github?: string;
        evidence?: string;
    };
    cause: string;
    causeDetails?: string;
    isLegendary?: boolean;
}

const benchmarkData: Benchmark[] = [
    {
      name: "Turing Test",
      description: "The original AI benchmark proposed by Alan Turing in 1950. In this 'imitation game', a computer must convince human judges it is human through natural conversation. The test sparked decades of debate about machine intelligence and consciousness.",
      dateCreated: "1950-10",
      dateDefeated: "2023-03",
      modelDefeated: "GPT-4",
      originalScore: "Interrogator >50%",
      finalScore: "Interrogator 46%",
      category: "Conversation",
      creators: "Alan Turing",
      organization: "University of Manchester",
      links: {
        paper: "https://courses.cs.umbc.edu/471/papers/turing.pdf",
        evidence: "https://arxiv.org/pdf/2405.08007"
      },
      cause: "Saturation",
      causeDetails: "While the Turing Test remains philosophically significant, modern LLMs can consistently pass it, making it no longer effective at measuring the frontier of AI capabilities.",
      isLegendary: true  // Special flag for the Turing Test
    },
    {
      "name": "JMLE-2024",
      "description": "A medical question-answering benchmark derived from the medical licensing exam conducted in 2024 in Japan. It evaluates medical knowledge and clinical reasoning skills typically tested near the end of medical school, covering a broad range of medical topics.",
      "dateCreated": "2024-02-08",
      "dateDefeated": "2024-11-06",
      "modelDefeated": "O1",
      "originalScore": "Medical Student Avg: ~85%",
      "finalScore": "O1: 99.6%",
      "category": "Healthcare",
      "creators": "Usuyama et al.",
      "organization": "Microsoft and OpenAI",
      "links": {
        "paper": "https://arxiv.org/abs/2411.03590"
      },
      "cause": "Saturation",
      "causeDetails": "This exam was passed at near-perfect levels, surpassing the average human performance and making it insufficient as a frontier marker for AI medical competence. Note: The test was administered in 2024, which was after the stated knowledge cutoff date for model 'o1'.",
      "isLegendary": false
    },
    {
      "name": "MedQA",
      "description": "A medical question-answering benchmark derived from the USMLE (United States Medical Licensing Examination). It tests knowledge-based reasoning using professional medical exam questions, serving as a measure of advanced medical question-answering capabilities in AI.",
      "dateCreated": "2020-09-28",
      "dateDefeated": "2024-11-06",
      "modelDefeated": "O1",
      "originalScore": "Human Expert: ~87%",
      "finalScore": "O1: 96.0%",
      "category": "Healthcare",
      "creators": "Jin et al.",
      "organization": "MIT",
      "links": {
        "paper": "https://arxiv.org/abs/2411.03590"
      },
      "cause": "Saturation",
      "causeDetails": "Performance surpasses that of human experts, making it less useful as a frontier benchmark for medical question-answering.",
      "isLegendary": false
    },
    {
      name: "ARC-AGI",
      description: "Abstract reasoning challenge consisting of visual pattern completion tasks. Each task presents a sequence of abstract visual patterns and requires selecting the correct completion. Created by François Chollet as part of a broader investigation into measuring intelligence.",
      dateCreated: "2019-11",
      dateDefeated: "2024-12",
      modelDefeated: "O3",
      originalScore: "Human Baseline: ~80%",
      finalScore: "O3: 87.5%",
      category: "Reasoning",
      creators: "François Chollet",
      organization: "Google",
      links: {
        paper: "https://arxiv.org/abs/1911.01547",
        website: "https://arcs-benchmark.org"
      },
      cause: "Saturation"
    },
    {
      name: "ARC (AI2)",
      description: "AI2 Reasoning Challenge (ARC) - A collection of grade-school level multiple-choice reasoning tasks testing logical deduction, spatial reasoning, and temporal reasoning. Each task requires applying abstract reasoning skills to solve multi-step problems.",
      dateCreated: "2018-3",
      dateDefeated: "2023-03",
      modelDefeated: "GPT-4",
      originalScore: "Unspecifed",
      finalScore: "GPT-4: 96.3%",
      category: "Reasoning",
      creators: "Clark et al.",
      organization: "AI2",
      links: {
        paper: "https://arxiv.org/abs/1803.05457",
        website: "https://leaderboard.allenai.org/arc/submissions/get-started",
        evidence: "https://cdn.openai.com/papers/gpt-4.pdf"
      },
      cause: "Saturation"
    },
    {
      name: "MATH",
      description: "A dataset of 12K challenging competition mathematics problems from AMC, AIME, and other math competitions. Problems range from pre-algebra to olympiad-level and require complex multi-step reasoning. Each problem has a detailed solution that tests mathematical reasoning capabilities.",
      dateCreated: "2021-03",
      dateDefeated: "2024-09",
      modelDefeated: "O1",
      originalScore: "Average CS PhD: ~40%",
      finalScore: "O1: 94.8%",
      category: "Mathematics",
      creators: "Hendrycks et al.",
      organization: "UC Berkeley",
      links: {
        paper: "https://arxiv.org/abs/2103.03874",
        github: "https://github.com/hendrycks/math"
      },
      cause: "Saturation"
    },
    {
      name: "HumanEval",
      description: "A collection of 164 Python programming problems designed to test language models' coding abilities. Each problem includes a function signature, docstring, and unit tests. Models must generate complete, correct function implementations that pass all test cases.",
      dateCreated: "2021-07",
      dateDefeated: "2024-05",
      modelDefeated: "GPT-4o",
      originalScore: "Unspecified",
      finalScore: "GPT-4o: 90.2%",
      category: "Coding",
      creators: "Chen et al.",
      organization: "OpenAI",
      links: {
        paper: "https://arxiv.org/abs/2107.03374",
        github: "https://github.com/openai/human-eval",
        evidence: "https://openai.com/index/hello-gpt-4o/"
      },
      cause: "Saturation"
    },
    {
      name: "SWAG",
      description: "A dataset of 113K multiple choice questions about grounded situations. Given a partial description of a situation, models must predict what happens next from 4 choices using common sense reasoning.",
      dateCreated: "2018-05",
      dateDefeated: "2018-10", 
      modelDefeated: "BERT",
      originalScore: "Human: 88%",
      finalScore: "BERT: 86%",
      category: "Common Sense",
      creators: "Zellers et al.",
      organization: "UW & AI2",
      links: {
        paper: "https://arxiv.org/abs/1808.05326",
        website: "https://rowanzellers.com/swag/"
      },
      cause: "Saturation"
    },
    {
      name: "HellaSwag",
      description: "A challenging dataset of multiple-choice questions about everyday scenarios. Uses adversarial filtering to test models' ability to understand and reason about real-world situations and their likely outcomes.",
      dateCreated: "2019-05",
      dateDefeated: "2023-03",
      modelDefeated: "GPT-4",
      originalScore: "Human: 95.6%",
      finalScore: "GPT-4: 95.3%",
      category: "Common Sense",
      creators: "Zellers et al.",
      organization: "UW & AI2",
      links: {
        paper: "https://arxiv.org/abs/1905.07830",
        website: "https://rowanzellers.com/hellaswag/",
        evidence: "https://cdn.openai.com/papers/gpt-4.pdf"
      },
      cause: "Saturation"
    },
    {
      name: "MMLU",
      description: "A comprehensive benchmark covering 57 subjects including mathematics, history, law, computer science, and more. Questions are drawn from real-world sources like professional exams to test both breadth and depth of knowledge across diverse academic domains.",
      dateCreated: "2020-09",
      dateDefeated: "2023-03",
      modelDefeated: "GPT-4",
      originalScore: "95th pct Human: 87.0%",
      finalScore: "GPT-4: 87.3%",
      category: "Knowledge",
      creators: "Hendrycks et al.",
      organization: "UC Berkeley",
      links: {
        paper: "https://arxiv.org/abs/2009.03300",
        github: "https://github.com/hendrycks/test",
        evidence: "https://cdn.openai.com/papers/gpt-4.pdf"
      },
      cause: "Saturation"
    },
    {
      name: "GSM8K",
      description: "A collection of 8.5K grade school math word problems requiring step-by-step solutions. Problems test both numerical computation and natural language understanding through multi-step mathematical reasoning.",
      dateCreated: "2021-10",
      dateDefeated: "2023-11",
      modelDefeated: "GPT-4",
      originalScore: "Unspecified",
      finalScore: "GPT-4: 92.0%",
      category: "Mathematics",
      creators: "Cobbe et al.",
      organization: "OpenAI",
      links: {
        paper: "https://arxiv.org/abs/2110.14168",
        github: "https://github.com/openai/grade-school-math",
        evidence: "https://cdn.openai.com/papers/gpt-4.pdf"
      },
      cause: "Saturation",
      causeDetails: "GSM8K is often considered contaminated because of its inclusion in several instruction following datasets"
    },
    {
      name: "WSC",
      description: "A collection of carefully crafted sentence pairs with ambiguous pronoun references that resolve differently based on small changes. Designed to test genuine language understanding over statistical patterns.",
      dateCreated: "2012-05",
      dateDefeated: "2019-07", 
      modelDefeated: "ROBERTA (w SFT)",
      originalScore: "Human: 96.5%",
      finalScore: "ROBERTA (w SFT): 90.1%",
      category: "Common Sense",
      creators: "Levesque et al.",
      organization: "U of T & NYU",
      links: {
        paper: "https://cdn.aaai.org/ocs/4492/4492-21843-1-PB.pdf",
        website: "https://cs.nyu.edu/~davise/papers/WinogradSchemas/WS.html"
      },
      cause: "Saturation"
    },
    {
      name: "WinoGrande",
      description: "An enhanced version of WSC with 44K problems testing common-sense reasoning through pronoun resolution. Uses adversarial filtering to ensure problems require real-world understanding.",
      dateCreated: "2019-07",
      dateDefeated: "2023-03",
      modelDefeated: "GPT-4",
      originalScore: "Human: 94%",
      finalScore: "GPT-4: 87.5%",
      category: "Common Sense",
      creators: "Sakaguchi et al.",
      organization: "AI2 & UW",
      links: {
        paper: "https://arxiv.org/abs/1907.10641",
        website: "https://winogrande.allenai.org/",
        evidence: "https://cdn.openai.com/papers/gpt-4.pdf"
      },
      cause: "Saturation",
    },
    {
      name: "BIG-Bench",
      description: "A collaborative collection of 204 tasks spanning linguistics, childhood development, math, common-sense reasoning, biology, physics, social bias, and software development. Tests diverse capabilities of language models.",
      dateCreated: "2021-06",
      dateDefeated: "2022-04",
      modelDefeated: "Palm 540B",
      originalScore: "Human: 49.8%",
      finalScore: "Palm 540B: 61.4%",
      category: "Multi-task",
      creators: "Srivastava et al.",
      organization: "Google et al.",
      links: {
        paper: "https://arxiv.org/abs/2206.04615",
        github: "https://github.com/google/BIG-bench",
        evidence: "https://arxiv.org/pdf/2204.02311"
      },
      cause: "Saturation",
      causeDetails: "BIG-Bench further faces contamination challenges as: (a) Its canary string has been reproduced by many major models (b) Its contamination has been highlighted in many papers i.e. GPT-4 technical report"
    },
    {
      name: "BIG-Bench-Hard",
      description: "A curated suite of 23 challenging tasks from BIG-Bench where language models initially performed below average human level. Selected to measure progress on particularly difficult capabilities.",
      dateCreated: "2022-10",
      dateDefeated: "2024-06", 
      modelDefeated: "Sonnet 3.5",
      originalScore: "Average Human: 67.7%",
      finalScore: "Sonnet 3.5: 93.1%",
      category: "Multi-task",
      creators: "Suzgun et al.",
      organization: "Google & Stanford",
      links: {
        paper: "https://arxiv.org/abs/2210.09261",
        github: "https://github.com/suzgunmirac/BIG-Bench-Hard",
        evidence: "https://assets.anthropic.com/m/1cd9d098ac3e6467/original/Claude-3-Model-Card-October-Addendum.pdf"
      },
      cause: "Saturation"
    },
    {
      name: "SuperGLUE",
      description: "A collection of more challenging language understanding tasks including word sense disambiguation, causal reasoning, and reading comprehension. Designed as a more difficult successor to GLUE.",
      dateCreated: "2019-05",
      dateDefeated: "2019-10",
      modelDefeated: "T5",
      originalScore: "Human: 89.8%",
      finalScore: "T5: 89.3%",
      category: "Language",
      creators: "Wang et al.",
      organization: "NYU & Facebook AI",
      links: {
        paper: "https://arxiv.org/abs/1905.00537",
        website: "https://super.gluebenchmark.com/"
      },
      cause: "Saturation"
    },
    {
      name: "GLUE",
      description: "A collection of nine tasks for evaluating natural language understanding, including single-sentence tasks, similarity and paraphrase tasks, and inference tasks. The primary NLU benchmark before SuperGLUE.",
      dateCreated: "2018-05",
      dateDefeated: "2019-06",
      modelDefeated: "XLNet",
      originalScore: "Human: 87.1%",
      finalScore: "XLNet: 88.4%",
      category: "Language",
      creators: "Wang et al.",
      organization: "NYU, UW & DeepMind",
      links: {
        paper: "https://arxiv.org/abs/1804.07461",
        website: "https://gluebenchmark.com/"
      },
      cause: "Saturation"
    },
    {
      name: "IFEval",
      description: "A comprehensive evaluation suite testing instruction following capabilities across coding, math, roleplay, and other tasks. Measures ability to handle complex multi-step instructions and constraints.",
      dateCreated: "2023-11",
      dateDefeated: "2024-03",
      modelDefeated: "LLama 3.3 70B",
      originalScore: "Unspecified",
      finalScore: "LLama 3.3 70B: 92.1%",
      category: "Instruction Following",
      creators: "Askell et al.",
      organization: "Google & Yale",
      links: {
        paper: "https://arxiv.org/abs/2311.07911",
        github: "https://github.com/google-research/google-research/tree/master/instruction_following_eval",
        evidence: "https://github.com/meta-llama/llama-models/blob/main/models/llama3_2/MODEL_CARD_VISION.md"
      },
      cause: "Saturation"
    },
    {
      name: "SQuAD",
      description: "A reading comprehension dataset of 100,000+ questions posed by crowdworkers on Wikipedia articles. Answers must be text segments from the corresponding reading passage.",
      dateCreated: "2016-05",
      dateDefeated: "2019-03",
      modelDefeated: "BERT",
      originalScore: "Human: 91.2%",
      finalScore: "BERT: 93.2%",
      category: "Language",
      creators: "Rajpurkar et al.",
      organization: "Stanford",
      links: {
        paper: "https://arxiv.org/abs/1606.05250",
        website: "https://rajpurkar.github.io/SQuAD-explorer/"
      },
      cause: "Saturation"
    },
    {
      name: "SQuAD v2.0",
      description: "An extension of SQuAD that adds unanswerable questions. Models must both answer questions when possible and determine when no answer is supported by the passage.",
      dateCreated: "2018-05",
      dateDefeated: "2019-04",
      modelDefeated: "BERT",
      originalScore: "Human: 89.5%",
      finalScore: "BERT: 89.5%",
      category: "Language",
      creators: "Rajpurkar et al.",
      organization: "Stanford",
      links: {
        paper: "https://arxiv.org/abs/1806.03822",
        website: "https://rajpurkar.github.io/SQuAD-explorer/"
      },
      cause: "Saturation"
    },
    {
      name: "TriviaQA",
      description: "A large-scale dataset of 650K question-answer-evidence triples authored by trivia enthusiasts. Requires cross-sentence reasoning and synthesis of information from multiple sources.",
      dateCreated: "2017-05",
      dateDefeated: "2019-06",
      modelDefeated: "SpanBERT",
      originalScore: "Human: 79.7%",
      finalScore: "SpanBERT: 83.6%",
      category: "Knowledge",
      creators: "Joshi et al.",
      organization: "UW & AI2",
      links: {
        paper: "https://arxiv.org/abs/1705.03551",
        website: "http://nlp.cs.washington.edu/triviaqa/"
      },
      cause: "Saturation"
    }
  ];

  export { benchmarkData };
