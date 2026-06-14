import { fetchAllLabels, normalizeDrug } from "./openfda";
import { setCached } from "./cache";

// Optional cache pre-warm (spec §5.3): seed the common OTC path so it's instant.
// Disabled unless PREWARM=1, because each warm hits openFDA. Runs in the
// background after the server starts; failures are swallowed (best-effort).
const TOP_DRUGS = [
  "acetaminophen",
  "ibuprofen",
  "naproxen",
  "aspirin",
  "loratadine",
  "cetirizine",
  "fexofenadine",
  "diphenhydramine",
  "famotidine",
  "omeprazole",
  "loperamide",
  "polyethylene glycol 3350",
  "guaifenesin",
  "dextromethorphan",
  "calcium carbonate",
  "melatonin",
  "docusate",
  "bisacodyl",
  "simethicone",
  "hydrocortisone",
];

export function maybePrewarm(): void {
  if (process.env.PREWARM !== "1") return;
  void (async () => {
    for (const drug of TOP_DRUGS) {
      try {
        const r = await fetchAllLabels(drug);
        setCached("labels:" + normalizeDrug(drug), r);
        // small pause to stay polite to openFDA
        await new Promise((res) => setTimeout(res, 500));
      } catch {
        /* best-effort */
      }
    }
    console.log(`[freeofcheck] prewarm complete (${TOP_DRUGS.length} drugs)`);
  })();
}
