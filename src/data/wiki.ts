import { comparisonTables } from "./comparisons";
import { allContent, type Block, type ContentEntry, type Step } from "./content";
import { glossaryTerms } from "./glossary";
import { plainText } from "./richtext";
import { categoryLabel, levelLabel, type Lang } from "./site";

type EntryType = "articulos" | "deducciones" | "ejercicios";
type LocalizedText = Record<Lang, string>;

export type ContentNode = ContentEntry & { type: EntryType };

export type LinkItem = {
  slug: string;
  title: string;
  href: string;
  kind: string;
  category: string;
};

export type SearchRecord = {
  title: string;
  description: string;
  richDescription: string;
  href: string;
  kindKey: "articulos" | "deducciones" | "ejercicios" | "glossary" | "comparison";
  kind: string;
  category: string;
  searchText: string;
};

const typeLabels: Record<EntryType, Record<Lang, string>> = {
  articulos: { es: "Guía", eu: "Gida", en: "Guide" },
  deducciones: { es: "Deducción", eu: "Frogapena", en: "Derivation" },
  ejercicios: { es: "Ejercicio", eu: "Ariketa", en: "Exercise" }
};

const extraLabels = {
  glossary: { es: "Glosario", eu: "Glosarioa", en: "Glossary" },
  comparison: { es: "Comparativa", eu: "Konparatiba", en: "Comparison" }
};

const wikiLinkPattern = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;

export function contentNodes(): ContentNode[] {
  return allContent() as ContentNode[];
}

export function contentHref(lang: Lang, entry: ContentNode): string {
  return `/${lang}/${entry.type}/${entry.slug}/`;
}

export function linkItem(lang: Lang, entry: ContentNode): LinkItem {
  return {
    slug: entry.slug,
    title: entry.title[lang],
    href: contentHref(lang, entry),
    kind: typeLabels[entry.type][lang],
    category: categoryLabel(entry.category, lang)
  };
}

export function findContent(slug: string): ContentNode | undefined {
  return contentNodes().find((entry) => entry.slug === slug);
}

function linksFromText(text: string): string[] {
  return Array.from(text.matchAll(wikiLinkPattern), (match) => match[1].trim());
}

function localizedValues(text: LocalizedText | undefined): string[] {
  return text ? Object.values(text) : [];
}

function linksFromStep(step: Step): string[] {
  return localizedValues(step.text).flatMap(linksFromText);
}

function linksFromBlock(block: Block): string[] {
  if (block.kind === "paragraph") return localizedValues(block.text).flatMap(linksFromText);
  if (block.kind === "formula") {
    return localizedValues(block.caption).flatMap(linksFromText);
  }
  if (block.kind === "diagram") {
    return localizedValues(block.caption).flatMap(linksFromText);
  }
  if (block.kind === "steps") {
    return [
      ...localizedValues(block.title).flatMap(linksFromText),
      ...block.steps.flatMap(linksFromStep)
    ];
  }
  if (block.kind === "example") {
    return [
      ...localizedValues(block.title).flatMap(linksFromText),
      ...localizedValues(block.statement).flatMap(linksFromText),
      ...block.steps.flatMap(linksFromStep),
      ...(block.result ? linksFromStep(block.result) : [])
    ];
  }
  if (block.kind === "callout") {
    return [
      ...localizedValues(block.title).flatMap(linksFromText),
      ...localizedValues(block.text).flatMap(linksFromText)
    ];
  }
  if (block.kind === "list") {
    return Object.values(block.items).flatMap((items) => items.flatMap(linksFromText));
  }
  if (block.kind === "table") {
    return [
      ...Object.values(block.head).flatMap((items) => items.flatMap(linksFromText)),
      ...block.rows.flatMap((row) => row.flatMap(linksFromText)),
      ...localizedValues(block.caption).flatMap(linksFromText)
    ];
  }
  return [block.slug];
}

export function entryReferences(entry: ContentEntry): string[] {
  const refs = new Set<string>();
  for (const slug of entry.prerequisites ?? []) refs.add(slug);
  for (const slug of entry.related ?? []) refs.add(slug);
  for (const section of entry.sections) {
    for (const block of section.blocks ?? []) {
      for (const slug of linksFromBlock(block)) refs.add(slug);
    }
  }
  refs.delete(entry.slug);
  return Array.from(refs);
}

export function getBacklinks(slug: string, lang: Lang): LinkItem[] {
  return contentNodes()
    .filter((entry) => entry.slug !== slug)
    .filter((entry) => entryReferences(entry).includes(slug))
    .map((entry) => linkItem(lang, entry));
}

export function getTopicGraph(lang: Lang) {
  const bySlug = new Map(contentNodes().map((entry) => [entry.slug, entry]));
  return contentNodes().map((entry) => {
    const references = entryReferences(entry)
      .map((slug) => bySlug.get(slug))
      .filter((target): target is ContentNode => Boolean(target))
      .map((target) => linkItem(lang, target));

    return {
      ...linkItem(lang, entry),
      references,
      backlinkCount: getBacklinks(entry.slug, lang).length
    };
  });
}

export function getSearchRecords(lang: Lang): SearchRecord[] {
  const contentRecords = contentNodes().map((entry) => {
    const description = plainText(entry.description[lang], lang);
    const searchText = [
      entry.title[lang],
      description,
      entry.category,
      categoryLabel(entry.category, lang),
      entry.level,
      levelLabel(entry.level, lang),
      entry.searchIntent,
      ...entry.keywords
    ].join(" ");

    return {
      title: entry.title[lang],
      description,
      richDescription: entry.description[lang],
      href: contentHref(lang, entry),
      kindKey: entry.type,
      kind: typeLabels[entry.type][lang],
      category: categoryLabel(entry.category, lang),
      searchText
    };
  });

  const glossaryRecords = glossaryTerms.map((term) => ({
    title: term.term[lang],
    description: plainText(term.shortDefinition[lang], lang),
    richDescription: term.shortDefinition[lang],
    href: `/${lang}/glosario/${term.slug}/`,
    kindKey: "glossary" as const,
    kind: extraLabels.glossary[lang],
    category: extraLabels.glossary[lang],
    searchText: [
      term.term[lang],
      term.shortDefinition[lang],
      term.definition[lang],
      term.usage[lang],
      ...term.related
    ].join(" ")
  }));

  const comparisonRecords = comparisonTables.map((table) => ({
    title: table.title[lang],
    description: plainText(table.description[lang], lang),
    richDescription: table.description[lang],
    href: `/${lang}/comparativas/#${table.slug}`,
    kindKey: "comparison" as const,
    kind: extraLabels.comparison[lang],
    category: extraLabels.comparison[lang],
    searchText: [
      table.title[lang],
      table.description[lang],
      ...table.head[lang],
      ...table.rows[lang].flat(),
      ...table.related
    ].join(" ")
  }));

  return [...contentRecords, ...glossaryRecords, ...comparisonRecords];
}
