import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { contactConfig, profile } from '@/data/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Magnetic } from '@/components/ui/Magnetic';
import { MailIcon, SendIcon, SocialIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const errors: Errors = {};
  if (f.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(f.email.trim())) errors.email = 'Please enter a valid email address.';
  if (f.message.trim().length < 10) errors.message = 'Please write at least 10 characters.';
  return errors;
}

export function Contact() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const found = validate(fields);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    // Honeypot: bots fill hidden fields, humans don't.
    if ((form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value) return;

    // No Formspree endpoint configured → open the visitor's mail app instead.
    if (!contactConfig.formspreeEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`);
      const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(contactConfig.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, _subject: `Portfolio enquiry from ${fields.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('sent');
      setFields({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="section outline-none">
      <div className="glow-blob -left-40 top-1/3 h-96 w-96" aria-hidden />
      <div className="container">
        <SectionHeading id="contact-title" eyebrow="06 · Contact" title={contactConfig.heading} intro={contactConfig.blurb} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <Reveal>
            <div className="space-y-6">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-5 transition-colors hover:border-accent/60"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                  <MailIcon size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-muted">Email me</span>
                  <span className="block truncate font-medium group-hover:text-accent">{profile.email}</span>
                </span>
              </a>

              <ul className="flex gap-3" aria-label="Social links">
                {profile.socials
                  .filter((s) => s.kind !== 'email')
                  .map((s) => (
                    <li key={s.kind}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
                      >
                        <SocialIcon kind={s.kind} size={16} /> {s.label}
                      </a>
                    </li>
                  ))}
              </ul>
              <p className="text-sm text-muted">Based in {profile.location} · Open to on-site, hybrid and remote roles.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              noValidate
              onSubmit={onSubmit}
              className="glass space-y-5 rounded-3xl p-6 sm:p-8"
              aria-describedby="form-status"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" autoComplete="name" value={fields.name} onChange={update('name')} error={errors.name} />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={update('email')}
                  error={errors.email}
                />
              </div>
              <Field label="Message" name="message" multiline value={fields.message} onChange={update('message')} error={errors.message} />

              {/* Honeypot (hidden from people and assistive tech) */}
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

              <div className="flex flex-wrap items-center gap-4">
                <Magnetic>
                  <button type="submit" className="btn-primary disabled:opacity-60" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send message'} <SendIcon size={16} />
                  </button>
                </Magnetic>
                <div id="form-status" role="status" aria-live="polite" className="text-sm">
                  <AnimatePresence mode="wait">
                    {status === 'sent' && (
                      <motion.p key="sent" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-accent">
                        Thanks! Your message is on its way.
                      </motion.p>
                    )}
                    {status === 'error' && (
                      <motion.p key="error" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500">
                        Something went wrong — please email me directly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: keyof Fields;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
}

function Field({ label, name, value, onChange, error, type = 'text', autoComplete, multiline }: FieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const classes = cn(
    'w-full rounded-xl border bg-bg/60 px-4 py-3 text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/30',
    error ? 'border-red-500' : 'border-border',
  );
  const shared = {
    id,
    name,
    value,
    onChange,
    required: true,
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    className: classes,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
