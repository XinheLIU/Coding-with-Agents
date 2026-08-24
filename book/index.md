---
title: Coding with Agents
description: Stanford CS146S — software engineering in the age of AI coding agents.
layout: page
---

<div class="book-langs-index">
  <div class="inner">
    <a class="lang-card" href="/Coding-with-Agents/en/">
      <span class="lang-name">English</span>
      <span class="lang-desc">Coding with Agents — a course on working effectively with AI coding agents.</span>
    </a>
    <a class="lang-card" href="/Coding-with-Agents/zh-cn/">
      <span class="lang-name">简体中文</span>
      <span class="lang-desc">编程智能体实践指南 — 在 AI 编程智能体时代高效工作的软件工程课程。</span>
    </a>
  </div>
</div>

<style>
.book-langs-index {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}
.book-langs-index .inner {
  max-width: 520px;
  width: calc(100% - 32px);
  padding: 2.75rem 2.5rem 2.25rem;
  background: rgba(255, 255, 255, 0.78);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow:
    0 4px 6px -1px rgba(15, 23, 42, 0.06),
    0 24px 48px -12px rgba(15, 23, 42, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.book-langs-index .inner::before {
  content: "Coding with Agents";
  font-family: "Instrument Serif", Georgia, serif;
  font-size: 1.85rem;
  line-height: 1.2;
  color: #0f172a;
  letter-spacing: -0.02em;
}
.book-langs-index .inner::after {
  content: "Stanford CS146S — software engineering in the age of AI coding agents.";
  font-size: 0.9rem;
  line-height: 1.45;
  color: #64748b;
  margin-bottom: 0.5rem;
}
.book-langs-index .lang-card {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(99, 102, 241, 0.25);
  background: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.book-langs-index .lang-card:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px -8px rgba(15, 23, 42, 0.18);
}
.book-langs-index .lang-name {
  font-weight: 600;
  color: #0f172a;
}
.book-langs-index .lang-desc {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
