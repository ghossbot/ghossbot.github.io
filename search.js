document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("q");
  const results = document.getElementById("results");

  if (!input || !results || !Array.isArray(COMMANDS)) return;

  const normalize = (value) => value.trim().toLowerCase();

  const render = (list) => {
    if (!list.length) {
      results.innerHTML = '<div class="cmd empty"><strong>No se encontró ningún comando.</strong><small>Probá con otro nombre, por ejemplo: ban, mute, skinmc o dinero.</small></div>';
      return;
    }

    results.innerHTML = list.map(({ command, description, category }) => `
      <div class="cmd">
        <code>${command}</code>
        <small>${description} · ${category}</small>
      </div>
    `).join("");
  };

  const filterCommands = () => {
    const query = normalize(input.value);
    if (!query) {
      render(COMMANDS);
      return;
    }

    const list = COMMANDS.filter(({ command }) => {
      const name = normalize(command);
      const withoutPrefix = name.startsWith("g=") ? name.slice(2) : name;
      const search = query.startsWith("g=") ? query.slice(2) : query;
      return name.includes(query) || withoutPrefix.includes(search);
    });

    render(list);
  };

  input.addEventListener("input", filterCommands);
  render(COMMANDS);
});
