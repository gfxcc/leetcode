const payload = window.LEETCODE_NOTES || { notes: [] };
const notes = payload.notes;

const state = {
  topic: "All",
  section: "All",
  query: "",
  selectedId: null,
};

const topicNav = document.querySelector("#topicNav");
const stats = document.querySelector("#stats");
const searchInput = document.querySelector("#searchInput");
const sectionSelect = document.querySelector("#sectionSelect");
const noteList = document.querySelector("#noteList");
const reader = document.querySelector("#reader");
const listTitle = document.querySelector("#listTitle");
const resultCount = document.querySelector("#resultCount");
const generatedMeta = document.querySelector("#generatedMeta");

const byId = new Map(notes.map((note) => [note.id, note]));

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function linkify(text) {
  const links = [];
  let escaped = escapeHtml(text).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_match, label, url) => {
    const token = `__LINK_${links.length}__`;
    links.push(`<a href="${url}" target="_blank" rel="noreferrer">${label}</a>`);
    return token;
  });
  escaped = escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>');
  for (const [index, link] of links.entries()) {
    escaped = escaped.replace(`__LINK_${index}__`, link);
  }
  return escaped.replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderInline(text) {
  return linkify(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function renderMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCode = false;
  let code = [];
  let inList = false;

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/g, "");
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        inCode = false;
      } else {
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (!trimmed) {
      closeList();
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = heading[1].length + 1;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith(">")) {
      closeList();
      html.push(`<blockquote>${renderInline(trimmed.replace(/^>+\s*/, ""))}</blockquote>`);
      continue;
    }

    const listItem = trimmed.match(/^[-*]\s+(.+)$/) || trimmed.match(/^\d+\.\s+(.+)$/);
    if (listItem) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${renderInline(listItem[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${renderInline(trimmed)}</p>`);
  }

  closeList();
  if (inCode) {
    html.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
  }
  return html.join("\n");
}

function readerMarkdown(note) {
  const lines = note.markdown.replace(/\r\n/g, "\n").split("\n");
  const firstContent = lines.findIndex((line) => line.trim());
  if (firstContent === -1) return "";

  const normalized = lines[firstContent].trim().replace(/^#+\s*/, "");
  const sourceTitles = new Set([note.title, note.displayTitle, "README.md"]);
  if (sourceTitles.has(normalized)) {
    return lines.slice(firstContent + 1).join("\n");
  }
  return note.markdown;
}

function topicCounts() {
  const counts = new Map([["All", notes.length]]);
  for (const note of notes) {
    counts.set(note.topic, (counts.get(note.topic) || 0) + 1);
  }
  return counts;
}

function renderStats() {
  const solutionCount = notes.filter((note) => note.hasCode).length;
  const overviewCount = notes.filter((note) => note.isOverview).length;
  const topicCount = unique(notes.map((note) => note.topic)).length;
  stats.innerHTML = [
    ["Notes", notes.length],
    ["With code", solutionCount],
    ["Topics", topicCount],
  ]
    .map(([label, value]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`)
    .join("");
  generatedMeta.textContent = `${overviewCount} overview pages`;
}

function countFor(topic, section = "All") {
  return notes.filter((note) => {
    const topicMatches = topic === "All" || note.topic === topic;
    const sectionMatches = section === "All" || note.section === section;
    return topicMatches && sectionMatches;
  }).length;
}

function renderTopics() {
  const topics = unique(notes.map((note) => note.topic));
  const allActive = state.topic === "All";
  topicNav.innerHTML = `
    <button type="button" class="topic-button ${allActive ? "active" : ""}" data-topic="All">
      <span>All</span>
      <span class="count">${notes.length}</span>
    </button>
    ${topics
      .map((topic) => {
        const sections = unique(notes.filter((note) => note.topic === topic && note.section !== "Overview").map((note) => note.section));
        const topicActive = state.topic === topic;
        return `
          <div class="topic-group ${topicActive ? "open" : ""}">
            <button type="button" class="topic-button ${topicActive && state.section === "All" ? "active" : ""}" data-topic="${escapeHtml(topic)}">
              <span>${escapeHtml(topic)}</span>
              <span class="count">${countFor(topic)}</span>
            </button>
            <div class="section-tree">
              ${sections
                .map(
                  (section) => `
                    <button type="button" class="section-button ${
                      topicActive && state.section === section ? "active" : ""
                    }" data-topic="${escapeHtml(topic)}" data-section="${escapeHtml(section)}">
                      <span>${escapeHtml(section)}</span>
                      <span class="count">${countFor(topic, section)}</span>
                    </button>
                  `
                )
                .join("")}
            </div>
          </div>
        `;
      })
      .join("")}
  `;
}

function updateSections() {
  const scoped = state.topic === "All" ? notes : notes.filter((note) => note.topic === state.topic);
  const sections = ["All", ...unique(scoped.map((note) => note.section))];
  if (!sections.includes(state.section)) {
    state.section = "All";
  }
  sectionSelect.innerHTML = sections
    .map((section) => `<option value="${escapeHtml(section)}" ${section === state.section ? "selected" : ""}>${escapeHtml(section)}</option>`)
    .join("");
}

function matchesQuery(note) {
  if (!state.query) return true;
  const haystack = [note.displayTitle, note.title, note.topic, note.section, note.path, note.markdown]
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.query.toLowerCase());
}

function filteredNotes() {
  return notes
    .filter((note) => state.topic === "All" || note.topic === state.topic)
    .filter((note) => state.section === "All" || note.section === state.section)
    .filter(matchesQuery)
    .sort((a, b) => {
      if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
      if (a.section === "Overview" && b.section !== "Overview") return -1;
      if (a.section !== "Overview" && b.section === "Overview") return 1;
      if (a.section !== b.section) return a.section.localeCompare(b.section);
      if (a.isOverview !== b.isOverview) return a.isOverview ? -1 : 1;
      return (a.problemNumber || 99999) - (b.problemNumber || 99999) || a.displayTitle.localeCompare(b.displayTitle);
    });
}

function renderNoteList(items) {
  listTitle.textContent =
    state.topic === "All" ? "All Notes" : state.section === "All" ? state.topic : `${state.topic} / ${state.section}`;
  resultCount.textContent = `${items.length} result${items.length === 1 ? "" : "s"}`;

  if (!items.length) {
    noteList.innerHTML = '<p class="empty">No notes match the current filters.</p>';
    reader.innerHTML = '<p class="empty">Adjust the search or filters to select a note.</p>';
    state.selectedId = null;
    return;
  }

  if (!state.selectedId || !items.some((note) => note.id === state.selectedId)) {
    state.selectedId = items[0].id;
  }

  noteList.innerHTML = shouldShowTopicLanding() ? renderTopicLanding(items) : items.map((note) => renderNoteButton(note)).join("");
}

function shouldShowTopicLanding() {
  return state.topic !== "All" && state.section === "All" && !state.query;
}

function renderBadges(note) {
  return `
    <span class="badges">
      ${note.isOverview ? '<span class="badge">Overview</span>' : ""}
      ${note.hasCode ? `<span class="badge">${note.codeBlocks} code</span>` : ""}
      ${note.links.length ? `<span class="badge">${note.links.length} link${note.links.length === 1 ? "" : "s"}</span>` : ""}
    </span>
  `;
}

function renderNoteButton(note, variant = "") {
  return `
    <button type="button" class="note-item ${variant} ${note.id === state.selectedId ? "active" : ""}" data-id="${escapeHtml(note.id)}">
      <strong>${escapeHtml(note.displayTitle)}</strong>
      <span class="meta">${escapeHtml(note.topic)} / ${escapeHtml(note.section)}</span>
      ${renderBadges(note)}
    </button>
  `;
}

function renderTopicLanding(items) {
  const html = [];
  const overview = items.find((note) => note.section === "Overview");
  if (overview) {
    html.push(renderNoteButton(overview, "topic-overview"));
  }

  const sections = unique(items.filter((note) => note.section !== "Overview").map((note) => note.section));
  html.push(`
    <div class="subtopic-grid">
      ${sections
        .map((section) => {
          const sectionItems = items.filter((note) => note.section === section);
          const overviewNote = sectionItems.find((note) => note.isOverview);
          const solutionCount = sectionItems.filter((note) => !note.isOverview).length;
          const codeCount = sectionItems.filter((note) => note.hasCode).length;
          return `
            <button type="button" class="subtopic-card" data-topic="${escapeHtml(state.topic)}" data-section="${escapeHtml(section)}">
              <strong>${escapeHtml(section)}</strong>
              <span>${overviewNote ? "Overview available" : "Problem set"}</span>
              <span class="badges">
                <span class="badge">${solutionCount} problem${solutionCount === 1 ? "" : "s"}</span>
                <span class="badge">${codeCount} code</span>
              </span>
            </button>
          `;
        })
        .join("")}
    </div>
  `);
  return html.join("");
}

function renderReader() {
  const note = byId.get(state.selectedId);
  if (!note) return;
  reader.innerHTML = `
    <header class="reader-header">
      <p class="eyebrow">${escapeHtml(note.topic)} / ${escapeHtml(note.section)}</p>
      <h2>${escapeHtml(note.displayTitle)}</h2>
      <p class="meta">${escapeHtml(note.path)}</p>
    </header>
    ${renderMarkdown(readerMarkdown(note))}
  `;
}

function render() {
  renderTopics();
  updateSections();
  const items = filteredNotes();
  renderNoteList(items);
  renderReader();
}

topicNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-topic]");
  if (!button) return;
  state.topic = button.dataset.topic;
  state.section = button.dataset.section || "All";
  state.selectedId = null;
  render();
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  state.selectedId = null;
  render();
});

sectionSelect.addEventListener("change", (event) => {
  state.section = event.target.value;
  state.selectedId = null;
  render();
});

noteList.addEventListener("click", (event) => {
  const sectionCard = event.target.closest("[data-section][data-topic]");
  if (sectionCard && sectionCard.classList.contains("subtopic-card")) {
    state.topic = sectionCard.dataset.topic;
    state.section = sectionCard.dataset.section;
    state.selectedId = null;
    render();
    return;
  }

  const button = event.target.closest("[data-id]");
  if (!button) return;
  state.selectedId = button.dataset.id;
  render();
});

renderStats();
render();
