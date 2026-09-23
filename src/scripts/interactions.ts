const boundCopyButtons = new WeakSet<HTMLButtonElement>();
let initialized = false;

function bindCopyButtons() {
  document.querySelectorAll<HTMLButtonElement>('.copy, [data-slot="copy-button"]').forEach((button) => {
    if (boundCopyButtons.has(button)) return;
    boundCopyButtons.add(button);
    button.addEventListener("click", async () => {
      const command =
        button.dataset.cmd ??
        button.dataset.copy ??
        button.closest("[data-slot='code-block'], .code-frame")?.querySelector("pre")?.textContent ??
        "";
      const status = document.querySelector<HTMLElement>("[data-copy-status]");
      if (status) status.textContent = "Copying command.";
      try {
        await navigator.clipboard.writeText(command);
      } catch {
        if (status) status.textContent = "Clipboard unavailable. Select the command to copy it.";
        return;
      }

      const previous = button.textContent;
      button.textContent = "copied ✓";
      button.dataset.copied = "true";
      if (status) status.textContent = "Code copied to clipboard.";
      globalThis.setTimeout(() => {
        if (!button.isConnected) return;
        button.textContent = previous;
        button.removeAttribute("data-copied");
        if (status) status.textContent = "";
      }, 1600);
    });
  });
}

export function initInteractionLifecycle() {
  if (initialized) return;
  initialized = true;
  document.addEventListener("koi:page-ready", bindCopyButtons);
  bindCopyButtons();
}
