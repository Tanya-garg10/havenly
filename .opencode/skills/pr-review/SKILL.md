---
name: pr-review
description: >
  Reviews pull requests for the Havenly rental marketplace (ELUSOC 2026).
  Performs a contributor-friendly code review that celebrates good work and
  flags only genuine blockers (bugs, broken UI, data loss). Does NOT nitpick
  style, minor patterns, or optional polish. Drafts a review comment for
  maintainer approval before posting.
  Use when user says "review pr", "review pull request", "check pr",
  "pr feedback", "check this PR", "is my PR ready", "feedback on PR",
  "review #N", "look at this contribution", or provides a PR number or
  GitHub PR URL for the Havenly repository.
---

## Philosophy

These are student contributors — many making their first open source
contribution. The goal is to **approve good work confidently** and help
contributors fix only real problems. Do not flag nits, style preferences,
or minor inconsistencies unless they break something.

**Approve liberally. Block sparingly.**

A PR should be approved if:
- It does what it claims to do
- It doesn't break existing functionality
- It doesn't introduce obvious bugs or security issues

Everything else is optional feedback, not a reason to request changes.

---

## Core Rules

1. **Draft before posting.** Never post a review directly.
   Always show the full review and wait for explicit confirmation.
2. **Read the full file, not just the diff.** Diffs are misleading
   without surrounding context.
3. **Lead with praise.** Every review must start with genuine, specific
   positive observations.
4. **Only BLOCKER = REQUEST_CHANGES.** If there are no blockers, approve.

---

## Workflow

### Step 1 — Gather PR context

```bash
# PR metadata
gh pr view <PR_NUMBER> \
  --repo akshay0611/havenly \
  --json title,body,state,additions,deletions,changedFiles,\
baseRefName,headRefName,url,author,labels,reviewDecision

# Full diff
gh pr diff <PR_NUMBER> --repo akshay0611/havenly

# CI status
gh pr checks <PR_NUMBER> --repo akshay0611/havenly

# Existing reviews (avoid duplicate feedback)
gh api repos/akshay0611/havenly/pulls/<PR_NUMBER>/reviews
```

### Step 2 — Read changed files in full

```bash
gh pr view <PR_NUMBER> --repo akshay0611/havenly \
  --json files --jq '.files[].path'
```

Read every changed file completely — not just the diff lines.

---

### Step 3 — Check for actual blockers only

Only flag issues in these categories. Everything else → skip it.

#### 🔴 BLOCKER — Must fix before merge
Flag **only** if the issue causes one of:
- Visible UI is broken or unusable
- Data loss or corruption
- JavaScript runtime error / crash
- Async operations with no error handling that could silently fail
- Missing `'use client'` directive causing a build error
- `<img>` used instead of `next/image` (causes layout shift + Lighthouse failure)
- `Array.map()` using index as key when list items can be reordered/deleted

#### ✅ Everything else — Do not block
The following are **not** blockers and should not cause REQUEST_CHANGES:
- Raw hex colors vs CSS variables (minor)
- Missing `sizes` prop on images (minor performance)
- Missing loading/empty states (nice to have)
- Missing hover/transition animations (polish)
- Tailwind class ordering or formatting
- Minor accessibility nits (unless completely inaccessible)
- Commit message style
- Branch naming conventions
- PR description quality
- Missing screenshots for small UI changes

---

### Step 4 — Draft the review

```markdown
## Review: <PR Title>

<1–2 honest sentences on what this PR does and your overall impression.>

### What looks great ✨
<Genuine, specific observations. Call out good patterns, clean code,
thoughtful structure. Be specific — not "great job!" but
"the way you extracted X into its own component is clean and reusable.">

### Blockers (if any)
<Only include this section if there are actual blockers.
If none, omit this section entirely.>

- **`file.tsx:line`** — <What's broken and why it matters.
  Include a suggested fix or point them to the right pattern.>

### Optional suggestions (feel free to ignore)
<Only include if you have 1–2 genuinely helpful tips.
Frame as "you might consider" not "you should".
Skip this section if nothing stands out.>

### Verdict
<APPROVE | REQUEST_CHANGES>

<If APPROVE: end with a warm, specific note about the contribution.>
<If REQUEST_CHANGES: end with encouragement — "you're close, these
are small fixes and the overall direction is solid.">
```

---

### Step 5 — Pause — Confirm before posting

**Do NOT run `gh pr review` yet.**

Show the full drafted review and ask:
> "Here's the draft review for PR #N. Reply 'approve', 'request-changes',
> or 'comment-only' to post it, or tell me what to adjust."

Wait for explicit instruction.

---

### Step 6 — Post the review (only after confirmation)

```bash
cat > /tmp/havenly-review.md << 'EOF'
<confirmed review body>
EOF

# Based on maintainer instruction:
gh pr review <PR_NUMBER> --repo akshay0611/havenly \
  --approve --body-file /tmp/havenly-review.md

# or
gh pr review <PR_NUMBER> --repo akshay0611/havenly \
  --request-changes --body-file /tmp/havenly-review.md

# or
gh pr review <PR_NUMBER> --repo akshay0611/havenly \
  --comment --body-file /tmp/havenly-review.md
```

---

## Havenly-Specific Patterns (reference only)

Use these to understand intent, not as a checklist to enforce.

| Pattern | File |
|---------|------|
| Navigation | `components/Navbar.tsx` |
| Property card | `components/PropertyCard.tsx` |
| Booking sidebar | `components/BookingSidebar.tsx` |
| UI primitives | `components/ui/*` — shadcn/ui |
| Data types | `lib/dummy-data.ts` |
| Utilities | `lib/utils.ts` — `cn()` for class merging |
| Icons | `lucide-react` only |
| Color tokens | CSS variables in `app/globals.css` |
| Toasts | `useToast` from `@/hooks/use-toast` |

## ELUSOC Tone Guidelines

- Lead every review with what they did well — be specific
- Frame issues as opportunities, not failures
- For blockers, explain *why* it matters and show the fix
- End every review with a human, encouraging closing line
- If approving: say so clearly and warmly
- If requesting changes: be explicit that it's close and the changes are small