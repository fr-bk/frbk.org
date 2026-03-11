(function () {
  "use strict";

  var API_URL = "/api/chat";
  var WELCOME =
    "Hei! Eg heiter Raymond 🟠🔴🔵 Spør meg om kampar, klubbhistoria, kontaktinfo – eller kva som helst anna du lurer på!";

  var STORAGE_KEY = "frbk-chat-history";
  var isOpen = false;
  var isLoading = false;
  var messages = [];

  function saveHistory() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (_) {}
  }

  function loadHistory() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  function init() {
    var container = document.createElement("div");
    container.className = "frbk-chat";

    var btn = document.createElement("button");
    btn.className = "frbk-chat__toggle";
    btn.setAttribute("aria-label", "Opne Raymond");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.371 2.343-.261 3.944-.823 4.793-1.354C7.556 14.985 7.778 15 8 15z"/></svg>';

    var win = document.createElement("div");
    win.className = "frbk-chat__window";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", "Raymond chat");
    win.setAttribute("aria-hidden", "true");
    win.innerHTML =
      '<div class="frbk-chat__header">' +
      '<span class="frbk-chat__title">Raymond</span>' +
      '<div class="frbk-chat__header-actions">' +
      '<button class="frbk-chat__new" aria-label="Start ny samtale" title="Ny samtale">↺</button>' +
      '<button class="frbk-chat__close" aria-label="Lukk chat">✕</button>' +
      "</div>" +
      "</div>" +
      '<div class="frbk-chat__messages" id="frbk-messages" aria-live="polite" aria-relevant="additions" aria-label="Chat-meldingar"></div>' +
      '<div class="frbk-chat__footer">' +
      '<div class="frbk-chat__input-wrap">' +
      '<input class="frbk-chat__input" type="text" placeholder="Skriv ein melding…" aria-label="Melding til Raymond" maxlength="300">' +
      '<span class="frbk-chat__counter" aria-live="polite" aria-atomic="true">0/300</span>' +
      "</div>" +
      '<button class="frbk-chat__send" aria-label="Send melding">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/></svg>' +
      "</button>" +
      "</div>";

    container.appendChild(win);
    container.appendChild(btn);
    document.body.appendChild(container);

    var msgsEl = document.getElementById("frbk-messages");
    var input = win.querySelector(".frbk-chat__input");
    var sendBtn = win.querySelector(".frbk-chat__send");
    var closeBtn = win.querySelector(".frbk-chat__close");
    var newBtn = win.querySelector(".frbk-chat__new");
    var counter = win.querySelector(".frbk-chat__counter");

    messages = loadHistory();
    if (messages.length === 0) {
      appendMsg("assistant", WELCOME, msgsEl);
    } else {
      appendMsg("assistant", WELCOME, msgsEl);
      for (var i = 0; i < messages.length; i++) {
        appendMsg(messages[i].role, messages[i].content, msgsEl);
      }
    }

    btn.addEventListener("click", function () {
      toggleOpen(win, btn, input);
    });
    closeBtn.addEventListener("click", function () {
      setOpen(false, win, btn);
    });
    newBtn.addEventListener("click", function () {
      messages = [];
      saveHistory();
      msgsEl.innerHTML = "";
      appendMsg("assistant", WELCOME, msgsEl);
    });
    sendBtn.addEventListener("click", function () {
      send(input, msgsEl);
    });
    input.addEventListener("input", function () {
      var len = input.value.length;
      counter.textContent = len + "/300";
      counter.style.color = len >= 270 ? "#c0392b" : "";
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send(input, msgsEl);
      }
    });
  }

  function toggleOpen(win, btn, input) {
    setOpen(!isOpen, win, btn);
    if (isOpen) input.focus();
  }

  function setOpen(open, win, btn) {
    isOpen = open;
    win.classList.toggle("frbk-chat__window--open", open);
    btn.classList.toggle("frbk-chat__toggle--open", open);
    win.setAttribute("aria-hidden", open ? "false" : "true");
    btn.setAttribute("aria-label", open ? "Lukk Raymond" : "Opne Raymond");
  }

  function renderMarkdown(text) {
    // Escape HTML first to prevent XSS
    var s = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    // Bold
    s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    // Italic
    s = s.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
    // Headers (## or #) → bold line
    s = s.replace(/^#{1,3}\s+(.+)$/gm, "<strong>$1</strong>");
    // Links [text](url) — berre http/https
    s = s.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    // Newlines → <br>
    s = s.replace(/\n/g, "<br>");
    return s;
  }

  function appendMsg(role, text, container) {
    var el = document.createElement("div");
    el.className = "frbk-chat__msg frbk-chat__msg--" + role;
    if (role === "assistant") {
      el.innerHTML = renderMarkdown(text);
    } else {
      el.textContent = text;
    }
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return el;
  }

  function setLoading(container, loading) {
    isLoading = loading;
    var existing = document.getElementById("frbk-loading");
    if (loading && !existing) {
      var el = document.createElement("div");
      el.id = "frbk-loading";
      el.className = "frbk-chat__msg frbk-chat__msg--assistant frbk-chat__msg--loading";
      el.innerHTML = "<span></span><span></span><span></span>";
      container.appendChild(el);
      container.scrollTop = container.scrollHeight;
    } else if (!loading && existing) {
      existing.remove();
    }
  }

  function send(input, msgsEl) {
    var text = input.value.trim();
    if (!text || isLoading) return;
    input.value = "";

    messages.push({ role: "user", content: text });
    saveHistory();
    appendMsg("user", text, msgsEl);
    setLoading(msgsEl, true);

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    })
      .then(function (res) {
        if (!res.ok || !res.body) throw new Error("server error");

        var reader = res.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";
        var replyText = "";
        var msgEl = null;

        function read() {
          reader.read().then(function (result) {
            if (result.done) {
              setLoading(msgsEl, false);
              if (replyText) {
                messages.push({ role: "assistant", content: replyText });
                saveHistory();
              }
              return;
            }

            buffer += decoder.decode(result.value, { stream: true });
            var lines = buffer.split("\n");
            buffer = lines.pop();

            for (var i = 0; i < lines.length; i++) {
              var line = lines[i];
              if (!line.startsWith("data: ")) continue;
              var data = line.slice(6);
              if (data === "[DONE]") continue;
              try {
                var parsed = JSON.parse(data);
                if (parsed.error) {
                  setLoading(msgsEl, false);
                  appendMsg("assistant", parsed.error, msgsEl);
                  return;
                }
                if (parsed.text) {
                  if (!msgEl) {
                    msgEl = appendMsg("assistant", "", msgsEl);
                    var loadEl = document.getElementById("frbk-loading");
                    if (loadEl) msgsEl.appendChild(loadEl);
                  }
                  replyText += parsed.text;
                  msgEl.innerHTML = renderMarkdown(replyText);
                  msgsEl.scrollTop = msgsEl.scrollHeight;
                }
              } catch (_) {}
            }

            read();
          });
        }

        read();
      })
      .catch(function () {
        setLoading(msgsEl, false);
        appendMsg("assistant", "Kunne ikkje nå serveren. Sjekk internettilkoplinga.", msgsEl);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
