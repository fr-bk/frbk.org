(function () {
  "use strict";

  var API_URL = "/api/chat";
  var WELCOME =
    "Hei! Eg er FRBK-assistenten 🔵🟠 Spør meg om kampar, klubbhistoria, kontaktinfo – eller kva som helst anna du lurer på!";

  var isOpen = false;
  var isLoading = false;
  var messages = [];

  function init() {
    var container = document.createElement("div");
    container.className = "frbk-chat";

    var btn = document.createElement("button");
    btn.className = "frbk-chat__toggle";
    btn.setAttribute("aria-label", "Opne FRBK-assistent");
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.371 2.343-.261 3.944-.823 4.793-1.354C7.556 14.985 7.778 15 8 15z"/></svg>';

    var win = document.createElement("div");
    win.className = "frbk-chat__window";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", "FRBK-assistent chat");
    win.setAttribute("aria-hidden", "true");
    win.innerHTML =
      '<div class="frbk-chat__header">' +
      '<span class="frbk-chat__title">FRBK-assistenten</span>' +
      '<button class="frbk-chat__close" aria-label="Lukk chat">✕</button>' +
      "</div>" +
      '<div class="frbk-chat__messages" id="frbk-messages"></div>' +
      '<div class="frbk-chat__footer">' +
      '<input class="frbk-chat__input" type="text" placeholder="Skriv ein melding…" aria-label="Melding til FRBK-assistenten" maxlength="300">' +
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

    appendMsg("assistant", WELCOME, msgsEl);

    btn.addEventListener("click", function () {
      toggleOpen(win, btn, input);
    });
    closeBtn.addEventListener("click", function () {
      setOpen(false, win, btn);
    });
    sendBtn.addEventListener("click", function () {
      send(input, msgsEl);
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
    btn.setAttribute("aria-label", open ? "Lukk FRBK-assistent" : "Opne FRBK-assistent");
  }

  function appendMsg(role, text, container) {
    var el = document.createElement("div");
    el.className = "frbk-chat__msg frbk-chat__msg--" + role;
    el.textContent = text;
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
    appendMsg("user", text, msgsEl);
    setLoading(msgsEl, true);

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setLoading(msgsEl, false);
        var reply = data.response || data.error || "Noko gjekk gale. Prøv igjen.";
        messages.push({ role: "assistant", content: reply });
        appendMsg("assistant", reply, msgsEl);
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
