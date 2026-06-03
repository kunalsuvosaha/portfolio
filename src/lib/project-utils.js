export function normalizeProjectPayload(payload) {
  return {
    title: String(payload.title || '').trim(),
    image: String(payload.image || '').trim(),
    imagePublicId: String(payload.imagePublicId || '').trim(),
    liveLink: String(payload.liveLink || '').trim(),
    githubLink: String(payload.githubLink || '').trim(),
    technologies: normalizeTechnologies(payload.technologies),
    description: String(payload.description || '').trim(),
    rank: Number(payload.rank),
    disabled: Boolean(payload.disabled),
  };
}

export function validateProjectPayload(project) {
  const errors = {};

  if (!project.title) errors.title = 'Project title is required.';
  if (!project.image) errors.image = 'Project image URL is required.';
  if (!isUrl(project.image)) errors.image = 'Project image must be a valid URL.';
  if (!project.liveLink) errors.liveLink = 'Live project URL is required.';
  if (!isUrl(project.liveLink)) errors.liveLink = 'Live project URL must be valid.';
  if (!project.githubLink) errors.githubLink = 'GitHub/code URL is required.';
  if (!isUrl(project.githubLink)) errors.githubLink = 'GitHub/code URL must be valid.';
  if (!project.description) errors.description = 'Short description is required.';
  if (!project.technologies.length) errors.technologies = 'Add at least one tool or technology.';
  if (!Number.isInteger(project.rank) || project.rank < 1) errors.rank = 'Rank must be a whole number greater than 0.';

  return errors;
}

export function serializeProject(project) {
  return {
    id: project._id.toString(),
    title: project.title,
    image: project.image,
    imagePublicId: project.imagePublicId || '',
    liveLink: project.liveLink,
    githubLink: project.githubLink,
    technologies: project.technologies,
    description: project.description,
    rank: project.rank,
    disabled: project.disabled,
    createdAt: project.createdAt,
  };
}

function normalizeTechnologies(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function isUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
