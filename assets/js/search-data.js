// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "* equal contribution. Also on Google Scholar.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-openrsi-sglang-omni-scaling-rsi-for-ai-infra",
        
          title: "OpenRSI × SGLang-Omni: Scaling RSI for AI Infra",
        
        description: "Agents ran a continuous, verifier-checked performance-optimization loop on SGLang-Omni: fourteen merged PRs across eight omni models.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/openrsi-sglang-omni/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-️-i-start-my-exciting-journey-as-a-research-intern-at-stanford-university-working-with-prof-james-zou-prof-yejin-choi",
          title: '🏛️ I start my exciting journey as a research intern at Stanford University,...',
          description: "",
          section: "News",},{id: "news-our-paper-gref-co-first-author-has-been-accepted-to-cikm-2025-this-recommendation-reranking-llm-project-was-conducted-during-my-internship-at-kuaishou",
          title: '🤝 Our paper GReF (co-first author) has been accepted to CIKM 2025. This...',
          description: "",
          section: "News",},{id: "news-starting-my-cs-phd-journey-at-texas-a-amp-amp-m-university",
          title: '🚀 Starting my CS PhD Journey at Texas A&amp;amp;amp;M University!',
          description: "",
          section: "News",},{id: "news-verltool-s-tech-report-co-first-author-is-out-please-see-on-hugging-face-daily-paper",
          title: 'VerlTool’s tech report (co-first author) is out! Please see on Hugging Face Daily...',
          description: "",
          section: "News",},{id: "news-verltool-is-approaching-550-stars-on-github-it-s-becoming-a-key-framework-for-tool-agent-rl-training",
          title: '🎉 VerlTool is approaching 550+ stars on GitHub! It’s becoming a key framework...',
          description: "",
          section: "News",},{id: "news-excited-to-share-videoscore2-bringing-rl-to-generative-video-evaluation-with-scoring-and-rich-reasoning-traces",
          title: 'Excited to share VideoScore2 — bringing RL to generative video evaluation with scoring...',
          description: "",
          section: "News",},{id: "news-thrilled-to-introduce-agentflow-a-trainable-tool-integrated-agentic-framework-that-directly-optimizes-agents-within-the-system-in-an-online-fashion-using-flow-grpo-achieving-superior-tool-use-and-long-horizon-reasoning-across-diverse-domains",
          title: 'Thrilled to introduce AgentFlow — a trainable, tool-integrated agentic framework that directly optimizes...',
          description: "",
          section: "News",},{id: "news-thrilled-to-announce-that-agentflow-has-been-accepted-to-neurips-2025-workshop-oral-top-3-and-ranked-2-paper-of-the-day-on-hugging-face",
          title: 'Thrilled to announce that AgentFlow has been accepted to NeurIPS 2025 Workshop Oral...',
          description: "",
          section: "News",},{id: "news-thrilled-to-share-that-structeval-has-been-accepted-to-tmlr",
          title: 'Thrilled to share that StructEval has been accepted to TMLR!',
          description: "",
          section: "News",},{id: "news-excited-that-agentflow-won-best-paper-runner-up-at-the-effective-reasoning-workshop",
          title: 'Excited that AgentFlow won Best Paper Runner-up at the Effective Reasoning Workshop!',
          description: "",
          section: "News",},{id: "news-two-papers-accepted-at-iclr-2026-agentflow-oral-on-in-the-flow-agentic-system-optimization-and-imagenworld-on-stress-testing-image-generation-models",
          title: 'Two papers accepted at ICLR 2026: AgentFlow (Oral) on in-the-flow agentic system optimization,...',
          description: "",
          section: "News",},{id: "news-we-ve-released-openresearcher-a-fully-open-state-of-the-art-deep-research-agent-30b-a3b-model-data-code-everything-is-open-try-demo-now",
          title: 'We’ve released OpenResearcher — a fully open, state-of-the-art deep research agent (30B-A3B). Model,...',
          description: "",
          section: "News",},{id: "news-openresearcher-paper-is-now-available-highlighting-practical-insights-into-deep-research-pipeline-design-already-adopted-by-nvidia-s-nemotron-family-of-models",
          title: 'OpenResearcher paper is now available, highlighting practical insights into deep research pipeline design....',
          description: "",
          section: "News",},{id: "news-released-dci-rethinking-retrieval-for-agentic-search-via-direct-corpus-interaction-1-paper-of-the-day-on-hugging-face",
          title: 'Released DCI: rethinking retrieval for agentic search via direct corpus interaction. #1 Paper...',
          description: "",
          section: "News",},{id: "news-two-papers-accepted-at-emnlp-2026-openresearcher-and-masking-stale-observations",
          title: 'Two papers accepted at EMNLP 2026: OpenResearcher and Masking Stale Observations!',
          description: "",
          section: "News",},{id: "news-dci-is-accepted-to-neurips-2026-as-a-spotlight",
          title: 'DCI is accepted to NeurIPS 2026 as a Spotlight 🎉!',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%75%6F%66%65%6E%67%6C%69%31%32%33%34%35@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Zhuofeng-Li", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/zhuofeng-li-6a528626a", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=V3ZBIT4AAAAJ", "_blank");
        },
      },{
        id: 'social-wechat_qr',
        title: 'Wechat_qr',
        section: 'Socials',
        handler: () => {
          window.open("", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/zhuofengli96475", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
