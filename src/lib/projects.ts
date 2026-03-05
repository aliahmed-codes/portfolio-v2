import type { Project, ProjectFrontmatter } from '@/types/project';

// List of all project IDs - add new projects here
const PROJECT_IDS = [
  'ai-equestrian',
  'atelier',
  'dr-hafiz-haroon',
  'appetite-creative',
  'finca-valhalla',
  'hkr-architects',
  'mni-dossier',
  'rideblack-uk',
  'tailor-signboard',
  'talc-scandal',
  'influent-media',
  'orby-kiosk',
  // 'shopmaster-pro',
  // 'dr-portfolio',
  // 'algolia-search',
  // 'keep-clone',
  // 'spotify-profile',
];




// Simple browser-safe frontmatter parser
function parseFrontmatter(markdown: string): { data: Record<string, unknown>; content: string } {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = markdown.match(fmRegex);

  if (!match) return { data: {}, content: markdown };

  const yamlBlock = match[1];
  const content = match[2];

  const data: Record<string, unknown> = {};
  const lines = yamlBlock.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const colonIndex = line.indexOf(':');

    if (colonIndex === -1) { i++; continue; }

    const key = line.slice(0, colonIndex).trim();
    const raw = line.slice(colonIndex + 1).trim();

    // Check if next lines are list items (multi-line array)
    if (raw === '' && lines[i + 1]?.match(/^\s+-\s/)) {
      const items: string[] = [];
      i++;
      while (i < lines.length && lines[i].match(/^\s+-\s/)) {
        items.push(lines[i].replace(/^\s+-\s*/, '').trim().replace(/^['"]|['"]$/g, ''));
        i++;
      }
      data[key] = items;
      continue;
    }

    // Inline array: [a, b, c]
    if (raw.startsWith('[') && raw.endsWith(']')) {
      data[key] = raw.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    } else if (raw === 'true') {
      data[key] = true;
    } else if (raw === 'false') {
      data[key] = false;
    } else if (raw === 'null') {
      data[key] = null;
    } else if (!isNaN(Number(raw)) && raw !== '') {
      data[key] = Number(raw);
    } else {
      data[key] = raw.replace(/^['"]|['"]$/g, '');
    }

    i++;
  }

  return { data, content };
}


/**
 * Load a single project by ID
 * This function reads the project.md file from the project's folder
 */
export async function loadProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch(`/projects/${id}/project.md`);
    if (!response.ok) {
      console.error(`Failed to load project ${id}:`, response.statusText);
      return null;
    }

    const markdown = await response.text();
    const { data, content } = parseFrontmatter(markdown);

    const frontmatter = data as ProjectFrontmatter;

    return {
      ...frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error loading project ${id}:`, error);
    return null;
  }
}

/**
 * Load all projects
 * This function reads all project.md files from their respective folders
 */
export async function loadAllProjects(): Promise<Project[]> {
  const projects: Project[] = [];

  for (const id of PROJECT_IDS) {
    const project = await loadProject(id);
    if (project) {
      projects.push(project);
    }
  }

  // Sort by featured first, then by year (descending)
  return projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.year - a.year;
  });
}

/**
 * Load featured projects only
 */
export async function loadFeaturedProjects(): Promise<Project[]> {
  const allProjects = await loadAllProjects();
  return allProjects.filter(p => p.featured);
}

/**
 * Get all project IDs
 * Useful for generating static paths
 */
export function getAllProjectIds(): string[] {
  return PROJECT_IDS;
}

/**
 * Check if a project exists
 */
export function projectExists(id: string): boolean {
  return PROJECT_IDS.includes(id);
}
