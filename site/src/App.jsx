import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChartLineUp,
  Cpu,
  GlobeHemisphereWest,
  List,
  MoonStars,
  Sparkle,
  Sun,
  X,
} from "@phosphor-icons/react";

const topics = [
  {
    id: "overseas",
    icon: GlobeHemisphereWest,
    label: "出海指南",
    description: "分享从零开始使用海外平台、工具与服务的实用经验。",
  },
  {
    id: "investing",
    icon: ChartLineUp,
    label: "美股研究",
    description: "研究优质公司与投资方法，用理性与长期视角参与市场。",
  },
  {
    id: "tools",
    icon: Cpu,
    label: "实用工具",
    description: "整理适合新手使用的软件、在线工具、模板与下载资源。",
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
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
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
          <a href="#path-overseas">出海指南</a>
          <a href="#path-investing">美股研究</a>
          <a href="#toolbox">实用工具</a>
          <a href="#about">关于高老师</a>
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
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="移动端导航">
            <button type="button" onClick={() => navigate("top")}>
              首页
            </button>
            <button type="button" onClick={() => navigate("path-overseas")}>
              出海指南
            </button>
            <button type="button" onClick={() => navigate("path-investing")}>
              美股研究
            </button>
            <button type="button" onClick={() => navigate("toolbox")}>
              实用工具
            </button>
            <button type="button" onClick={() => navigate("about")}>
              关于高老师
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
                分享出海实践、美股研究与实用工具。
                <br />
                高老师手把手带你探索科技。
              </p>
              <div className="hero-actions">
                <button
                  className="button button-primary"
                  type="button"
                  onClick={() => scrollToSection("paths")}
                >
                  开始探索 <ArrowRight weight="bold" />
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
            <p className="section-kicker">内容方向</p>
            <h2 id="paths-title">从你关心的主题开始</h2>
          </div>
          <div className="path-list">
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <article
                  id={`path-${topic.id}`}
                  className={`path-item path-${topic.id}`}
                  key={topic.id}
                >
                  <Icon weight="duotone" aria-hidden="true" />
                  <span>
                    <strong>{topic.label}</strong>
                    <small>{topic.description}</small>
                  </span>
                </article>
              );
            })}
          </div>
        </section>

        <section className="toolbox section" id="toolbox" aria-labelledby="toolbox-title">
          <div className="toolbox-copy">
            <p className="section-kicker">实用工具</p>
            <h2 id="toolbox-title">适合新手的工具与资源</h2>
            <p>
              后续会把实用的软件、在线工具、模板和下载资源整理在这里。
            </p>
          </div>
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
            <strong>关于高老师</strong>
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
