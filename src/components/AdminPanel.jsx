"use client";

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const emptyForm = {
  title: '',
  image: '',
  imagePublicId: '',
  liveLink: '',
  githubLink: '',
  technologies: '',
  description: '',
  rank: 1,
  disabled: false,
};

export default function AdminPanel({ open, onClose }) {
  const [isAuthed, setIsAuthed] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [projects, setProjects] = useState([]);
  const [mediaSettings, setMediaSettings] = useState({});
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [activeView, setActiveView] = useState('projects');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadingKey, setUploadingKey] = useState('');

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.rank - b.rank),
    [projects]
  );

  useEffect(() => {
    if (open && isAuthed) {
      loadProjects();
      loadMediaSettings();
    }
  }, [open, isAuthed]);

  useEffect(() => {
    if (!open) {
      setError('');
      setStatus('');
      setFieldErrors({});
    }
  }, [open]);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Login failed.');

      setIsAuthed(true);
      setCredentials({ username: '', password: '' });
      setStatus('Admin access granted.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthed(false);
    setProjects([]);
    setMediaSettings({});
    resetForm();
  }

  async function loadProjects() {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/projects');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to load projects.');
      setProjects(data.projects || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadMediaSettings() {
    setError('');

    try {
      const response = await fetch('/api/admin/media');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to load media settings.');
      setMediaSettings(data.settings || {});
    } catch (err) {
      setError(err.message);
    }
  }

  async function uploadImage(file, type, key = '') {
    setUploadingKey(key || type);
    setError('');

    try {
      const preparedFile = await prepareImageFile(file);
      const formData = new FormData();
      formData.append('file', preparedFile);
      formData.append('type', type);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to upload image.');
      return data.image;
    } finally {
      setUploadingKey('');
    }
  }

  async function saveMediaImage(key, file) {
    setStatus('');
    setError('');

    try {
      const type = key === 'profileImage' ? 'profile' : key === 'heroBackgroundImage' ? 'hero' : 'education';
      const image = await uploadImage(file, type, key);
      const response = await fetch('/api/admin/media', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          key,
          image: {
            url: image.url,
            publicId: image.publicId,
            alt: getMediaLabel(key),
          },
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to save media image.');
      setMediaSettings(data.settings || {});
      setStatus(`${getMediaLabel(key)} updated.`);
      notifySettingsChanged();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteMediaImage(key) {
    if (!window.confirm(`Remove ${getMediaLabel(key)}?`)) return;
    setStatus('');
    setError('');
    setUploadingKey(key);

    try {
      const response = await fetch('/api/admin/media', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to delete media image.');
      setMediaSettings(data.settings || {});
      setStatus(`${getMediaLabel(key)} removed.`);
      notifySettingsChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploadingKey('');
    }
  }

  async function saveProject(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setStatus('');
    setFieldErrors({});

    const payload = {
      ...form,
      rank: Number(form.rank),
      technologies: form.technologies,
      disabled: Boolean(form.disabled),
    };

    try {
      const response = await fetch(editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        setFieldErrors(data.errors || {});
        throw new Error(data.error || 'Unable to save project.');
      }

      setStatus(editingId ? 'Project updated.' : 'Project added.');
      resetForm();
      await loadProjects();
      notifyProjectsChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(project) {
    if (!window.confirm(`Delete "${project.title}" permanently?`)) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to delete project.');

      setStatus('Project deleted.');
      await loadProjects();
      notifyProjectsChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleProject(project) {
    setLoading(true);
    setError('');
    setStatus('');

    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...project,
          technologies: project.technologies,
          disabled: !project.disabled,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to update project status.');

      setStatus(project.disabled ? 'Project enabled.' : 'Project disabled.');
      await loadProjects();
      notifyProjectsChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function reorderProject(project, direction) {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, direction }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Unable to reorder project.');

      setProjects(data.projects || []);
      setStatus('Project rank updated.');
      notifyProjectsChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function editProject(project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      image: project.image,
      imagePublicId: project.imagePublicId || '',
      liveLink: project.liveLink,
      githubLink: project.githubLink,
      technologies: project.technologies.join(', '),
      description: project.description,
      rank: project.rank,
      disabled: project.disabled,
    });
    setActiveView('form');
    setError('');
    setStatus('');
    setFieldErrors({});
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setActiveView('projects');
    setFieldErrors({});
  }

  function notifyProjectsChanged() {
    window.dispatchEvent(new Event('portfolio-projects-updated'));
  }

  function notifySettingsChanged() {
    window.dispatchEvent(new Event('portfolio-settings-updated'));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-sm px-4 py-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="mx-auto flex h-full max-h-[900px] max-w-7xl flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-950/95 text-white shadow-2xl md:flex-row"
          >
            <aside className="border-b border-white/10 bg-white/5 p-5 md:w-72 md:border-b-0 md:border-r">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Private</p>
                  <h2 className="mt-2 text-2xl font-bold">Admin Panel</h2>
                </div>
                <button onClick={onClose} className="rounded-md border border-white/10 px-3 py-1 text-sm text-slate-300 hover:bg-white/10">
                  Close
                </button>
              </div>

              <nav className="space-y-2">
                <SidebarButton active={activeView === 'projects'} onClick={() => setActiveView('projects')}>Projects</SidebarButton>
                <SidebarButton active={activeView === 'form'} onClick={() => { resetForm(); setActiveView('form'); }}>Add Project</SidebarButton>
                <SidebarButton active={activeView === 'media'} onClick={() => setActiveView('media')}>Media Manager</SidebarButton>
              </nav>

              {isAuthed && (
                <button onClick={logout} className="mt-8 w-full rounded-md border border-red-400/30 px-4 py-3 text-sm font-semibold text-red-200 hover:bg-red-500/10">
                  Logout
                </button>
              )}
            </aside>

            <section className="min-h-0 flex-1 overflow-y-auto p-5 md:p-8">
              {!isAuthed ? (
                <LoginForm
                  credentials={credentials}
                  setCredentials={setCredentials}
                  loading={loading}
                  error={error}
                  onSubmit={login}
                />
              ) : (
                <div className="space-y-6">
                  <HeaderStatus status={status} error={error} loading={loading} />

                  {activeView === 'projects' ? (
                    <ProjectTable
                      projects={sortedProjects}
                      onEdit={editProject}
                      onDelete={deleteProject}
                      onToggle={toggleProject}
                      onReorder={reorderProject}
                      onAdd={() => setActiveView('form')}
                    />
                  ) : activeView === 'media' ? (
                    <MediaManager
                      settings={mediaSettings}
                      uploadingKey={uploadingKey}
                      onUpload={saveMediaImage}
                      onDelete={deleteMediaImage}
                    />
                  ) : (
                    <ProjectForm
                      form={form}
                      setForm={setForm}
                      editing={Boolean(editingId)}
                      loading={loading}
                      uploadingKey={uploadingKey}
                      errors={fieldErrors}
                      onUploadImage={async (file) => {
                        const image = await uploadImage(file, 'project', 'projectImage');
                        setForm((current) => ({
                          ...current,
                          image: image.url,
                          imagePublicId: image.publicId,
                        }));
                      }}
                      onSubmit={saveProject}
                      onCancel={resetForm}
                    />
                  )}
                </div>
              )}
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoginForm({ credentials, setCredentials, loading, error, onSubmit }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-xl border border-white/10 bg-white/10 p-8 shadow-xl backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Secure Admin Access</p>
      <h3 className="mt-3 text-3xl font-bold">Portfolio Control</h3>
      <p className="mt-3 text-sm text-slate-300">Enter owner credentials to manage projects.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <AdminInput label="Username" value={credentials.username} onChange={(value) => setCredentials((current) => ({ ...current, username: value }))} />
        <AdminInput label="Password" type="password" value={credentials.password} onChange={(value) => setCredentials((current) => ({ ...current, password: value }))} />
        {error && <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}
        <button disabled={loading} className="w-full rounded-md bg-[#0530ad] px-4 py-3 font-bold text-white transition hover:bg-[#03227a] disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Checking...' : 'Unlock Dashboard'}
        </button>
      </form>
    </div>
  );
}

function ProjectTable({ projects, onEdit, onDelete, onToggle, onReorder, onAdd }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold">Project Management</h3>
          <p className="text-sm text-slate-300">Enabled projects appear publicly in rank order.</p>
        </div>
        <button onClick={onAdd} className="rounded-md bg-[#0530ad] px-4 py-2 text-sm font-bold text-white hover:bg-[#03227a]">
          Add Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-400">
            <tr className="border-b border-white/10">
              <th className="py-3 pr-4">Rank</th>
              <th className="py-3 pr-4">Project</th>
              <th className="py-3 pr-4">Status</th>
              <th className="py-3 pr-4">Tech</th>
              <th className="py-3 pr-4">Reorder</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-white/10 align-top">
                <td className="py-4 pr-4 font-bold text-blue-200">#{project.rank}</td>
                <td className="py-4 pr-4">
                  <div className="flex min-w-64 gap-3">
                    <img src={project.image} alt={project.title} className="h-14 w-20 rounded-md object-cover" />
                    <div>
                      <p className="font-semibold text-white">{project.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">{project.description}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${project.disabled ? 'bg-slate-700 text-slate-200' : 'bg-emerald-500/15 text-emerald-200'}`}>
                    {project.disabled ? 'Disabled' : 'Enabled'}
                  </span>
                </td>
                <td className="max-w-56 py-4 pr-4 text-slate-300">{project.technologies.join(', ')}</td>
                <td className="py-4 pr-4">
                  <div className="flex gap-2">
                    <button onClick={() => onReorder(project, 'up')} className="rounded border border-white/10 px-2 py-1 text-xs hover:bg-white/10">Up</button>
                    <button onClick={() => onReorder(project, 'down')} className="rounded border border-white/10 px-2 py-1 text-xs hover:bg-white/10">Down</button>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(project)} className="rounded bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20">Edit</button>
                    <button onClick={() => onToggle(project)} className="rounded bg-blue-500/15 px-3 py-1.5 text-xs font-semibold text-blue-100 hover:bg-blue-500/25">
                      {project.disabled ? 'Enable' : 'Disable'}
                    </button>
                    <button onClick={() => onDelete(project)} className="rounded bg-red-500/15 px-3 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-500/25">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {!projects.length && (
        <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-slate-300">
          No projects yet. Add your first project to populate the portfolio.
        </div>
      )}
    </div>
  );
}

function ProjectForm({ form, setForm, editing, loading, uploadingKey, errors, onUploadImage, onSubmit, onCancel }) {
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  return (
    <form onSubmit={onSubmit} className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">{editing ? 'Edit Project' : 'Add Project'}</h3>
        <p className="text-sm text-slate-300">Ranks must be unique. Disabled projects stay hidden from the public section.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <AdminInput label="Project Title" value={form.title} error={errors.title} onChange={(value) => update('title', value)} />
        <ImageDropzone
          label="Project Image"
          imageUrl={form.image}
          uploading={uploadingKey === 'projectImage'}
          error={errors.image}
          onUpload={onUploadImage}
          onClear={() => {
            update('image', '');
            update('imagePublicId', '');
          }}
        />
        <AdminInput label="Live Project URL" value={form.liveLink} error={errors.liveLink} onChange={(value) => update('liveLink', value)} />
        <AdminInput label="GitHub/Code URL" value={form.githubLink} error={errors.githubLink} onChange={(value) => update('githubLink', value)} />
        <AdminInput label="Tools & Technologies Used" value={form.technologies} error={errors.technologies} placeholder="React, Next.js, MongoDB" onChange={(value) => update('technologies', value)} />
        <AdminInput label="Rank Position" type="number" min="1" value={form.rank} error={errors.rank} onChange={(value) => update('rank', value)} />
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-slate-200">Short Project Description</label>
        <textarea
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
          rows={4}
          className="w-full rounded-md border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-300"
        />
        {errors.description && <p className="mt-2 text-sm text-red-200">{errors.description}</p>}
      </div>

      <label className="mt-5 flex w-fit items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3">
        <input
          type="checkbox"
          checked={!form.disabled}
          onChange={(event) => update('disabled', !event.target.checked)}
          className="h-4 w-4 accent-[#0530ad]"
        />
        <span className="text-sm font-semibold">Enabled on public portfolio</span>
      </label>

      <div className="mt-7 flex flex-wrap gap-3">
        <button disabled={loading} className="rounded-md bg-[#0530ad] px-5 py-3 font-bold text-white hover:bg-[#03227a] disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? 'Saving...' : editing ? 'Save Changes' : 'Add Project'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-md border border-white/10 px-5 py-3 font-semibold text-slate-200 hover:bg-white/10">
          Cancel
        </button>
      </div>
    </form>
  );
}

function MediaManager({ settings, uploadingKey, onUpload, onDelete }) {
  const cards = [
    { key: 'profileImage', label: 'Profile Photo', type: 'profile' },
    { key: 'heroBackgroundImage', label: 'Hero Background', type: 'hero' },
    { key: 'schoolImage', label: 'School Background Image', type: 'education' },
    { key: 'bcaImage', label: 'BCA Image', type: 'education' },
    { key: 'mcaImage', label: 'MCA Image', type: 'education' },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
      <div className="mb-6">
        <h3 className="text-2xl font-bold">Media Manager</h3>
        <p className="text-sm text-slate-300">Upload Cloudinary images for profile, education, and page backgrounds.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <MediaUploadCard
            key={card.key}
            label={card.label}
            imageUrl={settings?.[card.key]?.url}
            uploading={uploadingKey === card.key}
            onUpload={(file) => onUpload(card.key, file)}
            onDelete={() => onDelete(card.key)}
          />
        ))}
      </div>
    </div>
  );
}

function MediaUploadCard({ label, imageUrl, uploading, onUpload, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-xl border border-white/10 bg-slate-950/50 p-4"
    >
      <ImageDropzone
        label={label}
        imageUrl={imageUrl}
        uploading={uploading}
        onUpload={onUpload}
        onClear={imageUrl ? onDelete : undefined}
      />
    </motion.div>
  );
}

function ImageDropzone({ label, imageUrl, uploading, error, onUpload, onClear }) {
  const [localPreview, setLocalPreview] = useState('');
  const [localError, setLocalError] = useState('');
  const preview = localPreview || imageUrl;

  async function handleFile(file) {
    if (!file) return;
    setLocalError('');

    if (!file.type.startsWith('image/')) {
      setLocalError('Choose an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setLocalError('Image must be 5MB or smaller.');
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);

    try {
      await onUpload(file);
    } catch (err) {
      setLocalError(err.message || 'Upload failed.');
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  }

  return (
    <div className="md:col-span-1">
      <label className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className="relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/20 bg-slate-950/70 p-4 text-center transition hover:border-blue-300"
      >
        {preview ? (
          <img src={preview} alt={label} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="space-y-2 text-slate-300">
            <p className="font-semibold">Drag & drop image</p>
            <p className="text-xs text-slate-400">JPEG, PNG, WebP, GIF up to 5MB</p>
          </div>
        )}

        <div className="relative z-10 mt-auto flex w-full flex-wrap justify-center gap-2 rounded-md bg-slate-950/75 p-3 backdrop-blur">
          <label className="cursor-pointer rounded-md bg-[#0530ad] px-3 py-2 text-xs font-bold text-white hover:bg-[#03227a]">
            {uploading ? 'Uploading...' : preview ? 'Replace' : 'Upload'}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              disabled={uploading}
              onChange={(event) => handleFile(event.target.files?.[0])}
            />
          </label>
          {preview && onClear && (
            <button type="button" onClick={onClear} className="rounded-md border border-white/10 px-3 py-2 text-xs font-bold text-slate-200 hover:bg-white/10">
              Remove
            </button>
          )}
        </div>
      </div>
      {(error || localError) && <p className="mt-2 text-sm text-red-200">{error || localError}</p>}
    </div>
  );
}

function HeaderStatus({ status, error, loading }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">Dashboard</p>
        <h2 className="text-3xl font-bold">Portfolio Projects</h2>
      </div>
      <div className="min-h-10">
        {loading && <p className="rounded-md border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-200">Working...</p>}
        {!loading && status && <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">{status}</p>}
        {!loading && error && <p className="rounded-md border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">{error}</p>}
      </div>
    </div>
  );
}

function SidebarButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-md px-4 py-3 text-left text-sm font-semibold transition ${active ? 'bg-[#0530ad] text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
    >
      {children}
    </button>
  );
}

function AdminInput({ label, value, onChange, error, type = 'text', placeholder = '', min }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-200">{label}</label>
      <input
        type={type}
        min={min}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-md border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-blue-300"
      />
      {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
    </div>
  );
}

function getMediaLabel(key) {
  const labels = {
    profileImage: 'Profile photo',
    heroBackgroundImage: 'Hero background',
    schoolImage: 'School background image',
    bcaImage: 'BCA image',
    mcaImage: 'MCA image',
  };

  return labels[key] || 'Media image';
}

async function prepareImageFile(file) {
  if (!file || file.type === 'image/gif' || file.size < 900 * 1024) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const maxSize = 1600;
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  context.drawImage(bitmap, 0, 0, width, height);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.82));
  if (!blob) return file;

  return new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
}
