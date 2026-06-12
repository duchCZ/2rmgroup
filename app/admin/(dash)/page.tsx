import { getAllSectionLinks } from "@/lib/sections";
import { ICON_KEYS } from "@/components/section-icon";
import { createLink, updateLink } from "../actions";
import { DeleteButton } from "./delete-button";

export const dynamic = "force-dynamic";

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";
const labelClass = "text-xs font-medium text-muted-foreground mb-1 block";

function IconSelect({ value }: { value?: string }) {
  return (
    <select name="icon" defaultValue={value ?? "link"} className={inputClass}>
      {ICON_KEYS.map((k) => (
        <option key={k} value={k}>
          {k}
        </option>
      ))}
    </select>
  );
}

export default async function AdminDashboard() {
  const links = await getAllSectionLinks();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Odkazy sekcí</h1>
        <p className="text-sm text-muted-foreground">
          Spravujte karty zobrazené na hlavní stránce.
        </p>
      </div>

      {/* Existing links */}
      <div className="space-y-4">
        {links.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Zatím žádné odkazy. Přidejte první níže.
          </p>
        )}

        {links.map((link) => (
          <form
            key={link.id}
            action={updateLink.bind(null, link.id)}
            className="rounded-xl border border-border bg-card p-5 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Název</label>
                <input
                  name="title"
                  defaultValue={link.title}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Odkaz (URL)</label>
                <input
                  name="href"
                  defaultValue={link.href}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Popis</label>
              <input
                name="description"
                defaultValue={link.description}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Ikona</label>
                <IconSelect value={link.icon} />
              </div>
              <div>
                <label className={labelClass}>Barva (hex)</label>
                <input
                  name="accent"
                  defaultValue={link.accent}
                  className={inputClass}
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    name="enabled"
                    defaultChecked={link.enabled}
                    className="h-4 w-4 rounded border-border"
                  />
                  Zobrazit na webu
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <DeleteButton id={link.id} title={link.title} />
              <button
                type="submit"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Uložit
              </button>
            </div>
          </form>
        ))}
      </div>

      {/* Create new */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Přidat odkaz</h2>
        <form
          action={createLink}
          className="rounded-xl border border-dashed border-border bg-card/50 p-5 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Název</label>
              <input
                name="title"
                placeholder="např. Půjčovna"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Odkaz (URL)</label>
              <input
                name="href"
                placeholder="https://…"
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Popis</label>
            <input
              name="description"
              placeholder="Krátký popis sekce"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Ikona</label>
              <IconSelect />
            </div>
            <div>
              <label className={labelClass}>Barva (hex)</label>
              <input
                name="accent"
                defaultValue="#F5C200"
                className={inputClass}
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  name="enabled"
                  defaultChecked
                  className="h-4 w-4 rounded border-border"
                />
                Zobrazit na webu
              </label>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Přidat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
