---
name: ai-pm-prd
description: Guide AI product managers through creating a one-page PRD for vibe coding projects (Claude Code / Cursor). Use when users say "I want to build XX", "help me write a PRD", "I need to clarify my product idea", "what should I tell Claude to build", or mention vibe coding / AI-assisted prototyping. This skill helps transform vague ideas into actionable PRDs by guiding through user persona, core features, non-functional requirements, and tech stack suggestions.
---

# AI PM PRD Skill

A guided skill for AI Product Managers to create clear, actionable one-page PRDs for vibe coding projects.

## What This Skill Does

Transforms vague ideas ("I want to build XX") into a structured, one-page PRD that can be directly fed to AI coding assistants like Claude Code or Cursor.

## What This Skill Does NOT Do

- **Does not** decide whether a product should be built (strategy decisions)
- **Does not** do market analysis or competitive research
- **Does not** create full commercial PRDs (this is for AI execution, not stakeholder presentation)
- **Does not** write code

---

## Guided Conversation Flow

Follow this exact sequence to guide the user through PRD creation.

### Step 1: Capture the Core Idea

Start by asking:
> "Tell me about your product idea in your own words. What sparked this idea? What problem do you want to solve?"

Let the user speak freely. Do NOT interrupt or ask structured questions yet. Listen for:
- The "why" behind the idea
- Pain points or frustration they've experienced
- The mental image of what this thing does

After they finish, briefly summarize back what you heard:
> "So the core idea is [summary]. Did I capture that correctly?"

---

### Step 2: Define the User Persona

Ask these questions one at a time, building on their previous answers:

1. **Who is this for?**
   > "Who will actually use this product? Be specific — are they developers, designers, students, business users? What's their job title or situation?"

2. **What's their context?**
   > "In what situation will they use it? At work, at home, on the go? What tools are they already using that this connects to?"

3. **What's their skill level?**
   > "What's the technical sophistication of your target users? Are they technical, non-technical, or a mix?"

4. **What's the pain point?**
   > "What's frustrating them right now that this product will solve? Walk me through a 'before and after' scenario."

---

### Step 3: Clarify Core Features (MVP)

Ask:
> "Let's think about the minimum viable product. If you had to ship just the core features that make this valuable, what would they be?"

Then:
1. List the features they mention
2. Ask them to prioritize:
   > "Can you rank these by priority? Which is #1 (absolutely essential), which is nice-to-have?"

3. For the top 2-3 features, dig deeper:
   > "Tell me more about [feature name]. What does the user actually DO? What's the input and output?"

4. Ask what's NOT included:
   > "What's explicitly out of scope for the MVP? What will you definitely NOT build in v1?"

---

### Step 4: Non-Functional Requirements

Ask these targeted questions:

1. **Performance**
   > "Does this need to be fast? How fast? (e.g., 'under 100ms response', 'near real-time', 'offline capable')"

2. **Data & Privacy**
   > "Does this handle any sensitive data? Do you need to worry about GDPR, PII, or data retention?"

3. **Platforms**
   > "Where should this run? (Web, desktop app, mobile, CLI tool, browser extension?)"

4. **Scalability**
   > "Do you expect 10 users or 10,000? Does this need to handle concurrent access?"

---

### Step 5: Tech Stack Suggestions

Ask:
> "Do you have any tech preferences or constraints? (e.g., 'I want to use Python', 'I prefer Tailwind', 'I need it to work offline')"

Then suggest a sensible default stack based on:
- The user's answers above
- Best practices for vibe coding (choose tools that work well with Claude Code / Cursor)

Present suggestions as **suggestions**, not mandates:
> "Based on what you've described, here's what I'd recommend. Feel free to push back if you have different preferences."

---

### Step 6: Generate the PRD

Generate the PRD using the template below. Fill in all sections based on the conversation.

---

## PRD Template

```markdown
# [Product Name] PRD

## 📋 Overview

**Goal:** [One-sentence description of what this product achieves]

**Why now:** [Brief context on timing/motivation]

---

## 👥 Target User

| Aspect | Description |
|--------|-------------|
| **Who** | [User type / persona] |
| **Context** | [When and where they use it] |
| **Skill Level** | [Technical sophistication] |
| **Current Pain** | [What frustrates them now] |

**Before & After Scenario:**

> Before: [Describe the painful current state]
> After: [Describe the improved state with this product]

---

## 🚀 Core Features (MVP)

| Priority | Feature | Description | User Action |
|----------|---------|-------------|-------------|
| P0 | [Feature name] | [Brief description] | [Input → Output] |
| P0 | [Feature name] | [Brief description] | [Input → Output] |
| P1 | [Feature name] | [Brief description] | [Input → Output] |

**Out of Scope (v1):**
- [Not doing X]
- [Not doing Y]

---

## ⚙️ Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| **Performance** | [e.g., < 100ms response time] |
| **Data/Privacy** | [e.g., No PII stored, GDPR compliant] |
| **Platform** | [e.g., Web app, Chrome extension] |
| **Scale** | [e.g., Single-user, no backend needed] |

---

## 🛠️ Tech Stack Suggestions

| Layer | Recommendation | Rationale |
|-------|---------------|-----------|
| **Frontend** | [e.g., React + Tailwind] | [Why this choice] |
| **Backend** | [e.g., Python/FastAPI or none] | [Why this choice] |
| **Database** | [e.g., SQLite or Postgres] | [Why this choice] |
| **Hosting** | [e.g., Vercel, Docker, local-only] | [Why this choice] |

---

## 🎯 Success Criteria

- [ ] [Specific, measurable outcome for v1]
- [ ] [Another success metric]
- [ ] [One more metric]

---

## 📝 Notes for AI

[Any specific instructions or context to give the AI coding assistant]

---

*Generated with AI PM PRD Skill*
```

---

## Guidelines

### Tone and Style

- **Curious and exploratory**: Ask questions to uncover what the user hasn't articulated
- **Collaborative**: Build on their ideas, don't replace them with your own
- **Practical**: Focus on what can be built quickly with vibe coding tools
- **Concise**: Keep questions short; let the user do the talking

### When to Diverge

If the user says "I don't know" or gives a vague answer:
- Don't push too hard
- Offer a reasonable default based on similar products
- Say "Let's assume [reasonable default] — we can adjust later if needed"

### Completion

After generating the PRD, ask:
> "Does this PRD capture what you had in mind? Feel free to tell me what to add, remove, or change."

Incorporate their feedback and regenerate if needed.
