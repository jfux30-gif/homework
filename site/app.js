const updated = document.querySelector("#updated");

if (updated) {
  updated.textContent = `Loaded ${new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date())}`;
}
