import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChartLineUp,
  Cpu,
  GlobeHemisphereWest,
  List,
  MagnifyingGlass,
  MoonStars,
  Sparkle,
  Sun,
  X,
} from "@phosphor-icons/react";

const topics = [
  {
    id: "ai",
    icon: Cpu,
    label: "AI 实战",
    description: "从工具到工作流，把 AI 用在学习、创作与工作中。",
  },
  {
    id: "frontier",
    icon: GlobeHemisphereWest,
    label: "科技前沿",
    description: "追踪关键技术突破，看懂技术如何重塑未来。",
  },
  {
    id: "investing",
    icon: ChartLineUp,
    label: "美股研究",
    description: "研究优质公司与投资方法，用理性与长期视角参与市场。",
  },
];

const articles = [
  {
    id: "article-ai-agent",
    topic: "ai",
    category: "AI 实战",
    date: "2026-07-31",
    title: "AI Agent 时代来了：从工具到自主工作流的关键跃迁",
    excerpt:
      "拆解 AI Agent 的核心能力与应用落地路径，掌握构建属于你自己的智能助手的第一步。",
    image: "/assets/article-ai-agent.avif",
    imageFallback: "/assets/article-ai-agent.jpg",
    lead: true,
  },
  {
    id: "article-quantum",
    topic: "frontier",
    category: "科技前沿",
    date: "2026-07-29",
    title: "量子计算的实用化进程：我们现在处于哪个阶段？",
    excerpt: "从技术路线、产业格局到潜在应用，理性看待量子计算的进展与挑战。",
    image: "/assets/article-quantum.avif",
    imageFallback: "/assets/article-quantum.jpg",
  },
  {
    id: "article-value",
    topic: "investing",
    category: "美股研究",
    date: "2026-07-27",
    title: "如何评估一家公司的长期投资价值？",
    excerpt: "结合商业模式、护城河与管理层，建立系统化的投资分析框架。",
    image: "/assets/article-wall-street.avif",
    imageFallback: "/assets/article-wall-street.jpg",
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function getInitialTheme() {
  if (typeof document !== "undefined") {
    const preset = document.documentElement.dataset.theme;
    if (preset === "light" || preset === "dark") return preset;
  }
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: light)").matches
  ) {
    return "light";
  }
  return "dark";
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("all");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("gaoxtech-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#020811" : "#f2f6fb");
  }, [theme]);

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return articles.filter((article) => {
      const topicMatch =
        activeTopic === "all" || article.topic === activeTopic;
      const textMatch =
        !normalizedQuery ||
        `${article.title}${article.excerpt}${article.category}`
          .toLowerCase()
          .includes(normalizedQuery);
      return topicMatch && textMatch;
    });
  }, [activeTopic, query]);

  const navigate = (id) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <div className="site-shell" id="top">
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label="高手科技首页，高老师手把手带你探索科技"
        >
          <picture>
            <source
              type="image/avif"
              srcSet="/assets/gaoxtech-logo-128.avif"
            />
            <img
              src="/assets/gaoxtech-logo-128.jpg"
              width="128"
              height="128"
              alt=""
              decoding="async"
            />
          </picture>
          <span className="brand-copy">
            <span className="brand-title">
              <strong>高手科技</strong>
              <small>GaoXTech</small>
            </span>
            <span className="brand-tagline">高老师手把手带你探索科技</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          <a className="is-active" href="#top">
            首页
          </a>
          <a href="#paths">出海指南</a>
          <a href="#paths">美股研究</a>
          <a href="#toolbox">实用工具</a>
          <a href="#about">关于</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            type="button"
            aria-label={theme === "dark" ? "切换到日间模式" : "切换到暗黑模式"}
            title={theme === "dark" ? "切换到日间模式" : "切换到暗黑模式"}
            aria-pressed={theme === "light"}
            onClick={() =>
              setTheme((currentTheme) =>
                currentTheme === "dark" ? "light" : "dark",
              )
            }
          >
            {theme === "dark" ? (
              <Sun weight="bold" aria-hidden="true" />
            ) : (
              <MoonStars weight="bold" aria-hidden="true" />
            )}
          </button>
          <button
            className="icon-button"
            type="button"
            aria-label={searchOpen ? "关闭搜索" : "搜索文章"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            {searchOpen ? <X weight="bold" /> : <MagnifyingGlass weight="bold" />}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
          </button>
        </div>

        {searchOpen && (
          <div className="search-panel">
            <MagnifyingGlass aria-hidden="true" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索 AI、科技或美股文章"
              aria-label="搜索文章"
            />
            <button
              type="button"
              onClick={() => scrollToSection("articles")}
            >
              查看结果
            </button>
          </div>
        )}

        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
            <button type="button" onClick={() => navigate("top")}>
              首页
            </button>
            <button type="button" onClick={() => navigate("paths")}>
              出海指南
            </button>
            <button type="button" onClick={() => navigate("articles")}>
              美股研究
            </button>
            <button type="button" onClick={() => navigate("toolbox")}>
              实用工具
            </button>
            <button type="button" onClick={() => navigate("about")}>
              关于
            </button>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <Sparkle weight="fill" aria-hidden="true" />
                深海信号
              </p>
              <h1 id="hero-title">
                把复杂科技，
                <br />
                讲成你能用的下一步
              </h1>
              <p className="hero-intro">
                AI 实战指南、科技前沿解读、美股研究方法。
                <br />
                帮助你在技术与市场的变化中，做出更清晰的判断与行动。
              </p>
              <div className="hero-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => scrollToSection("paths")}
                >
                  开始探索 <ArrowRight weight="bold" />
                </button>
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() => scrollToSection("articles")}
                >
                  查看最新文章 <ArrowRight weight="bold" />
                </button>
              </div>
            </div>

            <div
              className="hero-portrait"
              aria-label="高手科技，高老师手把手带你探索科技"
            >
              <picture>
                <source
                  type="image/avif"
                  srcSet="/assets/gaoxtech-logo-640.avif 640w, /assets/gaoxtech-logo-1080.avif 1080w"
                  sizes="(max-width: 720px) 82vw, (max-width: 1400px) 42vw, 560px"
                />
                <img
                  src="/assets/gaoxtech-logo-640.jpg"
                  srcSet="/assets/gaoxtech-logo-640.jpg 640w, /assets/gaoxtech-logo-1080.jpg 1080w"
                  sizes="(max-width: 720px) 82vw, (max-width: 1400px) 42vw, 560px"
                  width="1080"
                  height="1080"
                  alt="高手科技，高老师手把手带你探索科技"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </section>

        <section className="paths section" id="paths" aria-labelledby="paths-title">
          <div className="section-heading centered-heading">
            <p className="section-kicker">选择你的探索路径</p>
            <h2 id="paths-title">从一个真实问题开始</h2>
          </div>
          <div className="path-list">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <button
                  className={`path-item path-${topic.id}`}
                  type="button"
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic.id);
                    scrollToSection("articles");
                  }}
                >
                  <Icon weight="duotone" aria-hidden="true" />
                  <span>
                    <strong>{topic.label}</strong>
                    <small>{topic.description}</small>
                    <em>
                      进入频道 <ArrowRight weight="bold" />
                    </em>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="articles section" id="articles" aria-labelledby="articles-title">
          <div className="articles-header">
            <div className="section-heading">
              <p className="section-kicker">持续更新</p>
              <h2 id="articles-title">最新文章</h2>
            </div>
            <div className="topic-filter" aria-label="文章主题筛选">
              {[
                ["all", "全部"],
                ["ai", "AI 实战"],
                ["frontier", "科技前沿"],
                ["investing", "美股研究"],
              ].map(([id, label]) => (
                <button
                  type="button"
                  key={id}
                  className={activeTopic === id ? "is-active" : ""}
                  aria-pressed={activeTopic === id}
                  onClick={() => setActiveTopic(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {filteredArticles.length ? (
            <div className="article-list">
              {filteredArticles.map((article, index) => (
                <article
                  className={index === 0 ? "article article-lead" : "article"}
                  id={article.id}
                  key={article.id}
                >
                  <picture>
                    <source type="image/avif" srcSet={article.image} />
                    <img
                      src={article.imageFallback}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="article-copy">
                    <div className="article-meta">
                      <span className={`category category-${article.topic}`}>
                        {article.category}
                      </span>
                      <time dateTime={article.date}>{article.date}</time>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <a href={`#${article.id}`} aria-label={`阅读全文：${article.title}`}>
                      阅读全文 <ArrowRight weight="bold" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <MagnifyingGlass weight="duotone" aria-hidden="true" />
              <h3>暂时没有匹配的文章</h3>
              <p>换一个关键词，或查看全部内容。</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveTopic("all");
                }}
              >
                清除筛选
              </button>
            </div>
          )}
        </section>

        <section className="toolbox section" id="toolbox" aria-labelledby="toolbox-title">
          <div className="toolbox-copy">
            <p className="section-kicker">GaoXTech Lab</p>
            <h2 id="toolbox-title">工具箱，让知识真正落地</h2>
            <p>
              后续将在这里持续加入 AI 提示词工作台、DCA 定投估算器、
              科技公司研究模板和个人自动化工具。
            </p>
          </div>
          <button
            className="button button-primary"
            type="button"
            onClick={() => window.alert("工具实验室正在建设中，首批工具即将上线。")}
          >
            关注工具实验室 <ArrowRight weight="bold" />
          </button>
        </section>
      </main>

      <footer className="site-footer" id="about">
        <div className="footer-brand">
          <picture>
            <source
              type="image/avif"
              srcSet="/assets/gaoxtech-logo-128.avif"
            />
            <img
              src="/assets/gaoxtech-logo-128.jpg"
              width="128"
              height="128"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div>
            <strong>高手科技 · GaoXTech</strong>
            <p>高老师手把手带你探索科技。</p>
          </div>
        </div>
        <div className="footer-note">
          <MoonStars weight="duotone" aria-hidden="true" />
          <p>内容仅供学习参考，涉及投资的部分不构成投资建议。</p>
        </div>
        <small>© 2026 GaoXTech. All rights reserved.</small>
      </footer>
    </div>
  );
}
