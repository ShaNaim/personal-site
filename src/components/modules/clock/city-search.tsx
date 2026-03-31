import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import { CITIES, MAX_CLOCKS, SEARCH_MAX_LENNGTH } from "@/data/clock";
import { useClockStore } from "@/stores/clock-store";

export function CitySearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { clocks, addClock } = useClockStore();

  const filtered = useMemo(() => {
    if (!query.trim()) return CITIES.slice(0, SEARCH_MAX_LENNGTH);
    const q = query.toLowerCase();
    return CITIES.filter((c) => c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q)).slice(0, SEARCH_MAX_LENNGTH);
  }, [query]);

  const isFull = clocks.length >= MAX_CLOCKS;
  const addedTimezones = new Set(clocks.map((c) => c.timezone));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isFull}
        className={`flex items-center gap-2 px-4 py-2 border text-[11px] tracking-[0.15em] uppercase transition-all duration-200
          ${isFull ? "border-stroke text-text-faint cursor-not-allowed opacity-40" : "border-stroke-mid text-text hover:border-brand hover:text-brand"}`}
      >
        <Plus size={12} />
        {isFull ? "Max clocks reached" : "Add City"}
      </button>

      {open && !isFull && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-80 border border-stroke bg-bg-card z-50 shadow-2xl">
            {/* Search input */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-stroke">
              <Search size={12} className="text-text-faint shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search city or country..."
                className="flex-1 bg-transparent text-[12px] text-text placeholder:text-text-faint outline-none tracking-wide"
              />
            </div>

            {/* Results */}
            <div className="max-h-100 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-[11px] text-text-faint text-center tracking-wider">No cities found</div>
              ) : (
                filtered.map((city) => {
                  const added = addedTimezones.has(city.timezone);
                  return (
                    <button
                      key={city.timezone}
                      disabled={added}
                      onClick={() => {
                        addClock(city);
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`w-full flex justify-between items-center px-3 py-2.5 text-left transition-colors duration-150
                        ${added ? "opacity-30 cursor-not-allowed" : "hover:bg-stroke-subtle hover:text-brand"}`}
                    >
                      <div>
                        <div className="text-[12px] text-text tracking-wide">{city.city}</div>
                        <div className="text-[10px] text-text-faint tracking-wider">{city.country}</div>
                      </div>
                      <div className="text-[10px] text-text-faint font-mono">{city.timezone.split("/")[1]?.replace("_", " ")}</div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-3 py-2 border-t border-stroke flex justify-between items-center">
              <span className="text-[9px] text-text-faint tracking-widest uppercase">
                {clocks.length}/{MAX_CLOCKS} clocks
              </span>
              <button onClick={() => setOpen(false)} className="text-[9px] text-text-faint tracking-widest uppercase hover:text-text transition-colors">
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
