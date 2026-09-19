"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { Loader2, Save } from "lucide-react";
import { db } from "@/lib/firebase/client";
import { DEFAULT_SETTINGS } from "@/lib/data/defaults";
import type { SiteSettings } from "@/lib/data/types";
import { revalidateTagClient } from "@/lib/admin/revalidate";
import { Button, Card, Field, Input, PageHeader, Textarea } from "@/components/admin/ui";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    return onSnapshot(doc(db, "settings", "main"), (snap) => {
      if (snap.exists()) {
        setSettings({ ...DEFAULT_SETTINGS, ...(snap.data() as Partial<SiteSettings>) });
      }
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "settings", "main"), settings);
      await revalidateTagClient("settings");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-neutral-400">Loading…</p>;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        description="Institute name, hero copy, address, timings, socials and headline stats."
        action={
          <Button onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {saved ? "Saved" : "Save changes"}
          </Button>
        }
      />

      <div className="space-y-6">
        <Card className="space-y-4">
          <h3 className="font-medium text-neutral-900">Brand & hero</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Institute name">
              <Input
                value={settings.instituteName}
                onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              />
            </Field>
            <Field label="Tagline">
              <Input
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Hero headline">
            <Input
              value={settings.heroHeadline}
              onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
            />
          </Field>
          <Field label="Hero subheadline">
            <Textarea
              rows={2}
              value={settings.heroSubheadline}
              onChange={(e) => setSettings({ ...settings, heroSubheadline: e.target.value })}
            />
          </Field>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-medium text-neutral-900">Contact & address</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Phone">
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              />
            </Field>
            <Field label="Public email">
              <Input
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </Field>
          </div>
          <Field label="Address (one line per row)">
            <Textarea
              rows={3}
              value={settings.addressLines.join("\n")}
              onChange={(e) =>
                setSettings({ ...settings, addressLines: e.target.value.split("\n") })
              }
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Timings — Mon to Sat">
              <Input
                value={settings.timingsWeekday}
                onChange={(e) => setSettings({ ...settings, timingsWeekday: e.target.value })}
              />
            </Field>
            <Field label="Timings — Sunday">
              <Input
                value={settings.timingsSunday}
                onChange={(e) => setSettings({ ...settings, timingsSunday: e.target.value })}
              />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Google Maps embed URL">
              <Input
                value={settings.mapEmbedUrl}
                onChange={(e) => setSettings({ ...settings, mapEmbedUrl: e.target.value })}
              />
            </Field>
            <Field label="Google Maps link (Get Directions)">
              <Input
                value={settings.mapLinkUrl}
                onChange={(e) => setSettings({ ...settings, mapLinkUrl: e.target.value })}
              />
            </Field>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-medium text-neutral-900">Social links</h3>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Instagram">
              <Input
                value={settings.socials.instagram ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, socials: { ...settings.socials, instagram: e.target.value } })
                }
              />
            </Field>
            <Field label="Facebook">
              <Input
                value={settings.socials.facebook ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, socials: { ...settings.socials, facebook: e.target.value } })
                }
              />
            </Field>
            <Field label="YouTube">
              <Input
                value={settings.socials.youtube ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, socials: { ...settings.socials, youtube: e.target.value } })
                }
              />
            </Field>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-medium text-neutral-900">Headline stats</h3>
          <div className="grid grid-cols-4 gap-4">
            <Field label="Students trained">
              <Input
                value={settings.stats.studentsTrained}
                onChange={(e) =>
                  setSettings({ ...settings, stats: { ...settings.stats, studentsTrained: e.target.value } })
                }
              />
            </Field>
            <Field label="Courses offered">
              <Input
                value={settings.stats.coursesOffered}
                onChange={(e) =>
                  setSettings({ ...settings, stats: { ...settings.stats, coursesOffered: e.target.value } })
                }
              />
            </Field>
            <Field label="Years experience">
              <Input
                value={settings.stats.yearsExperience}
                onChange={(e) =>
                  setSettings({ ...settings, stats: { ...settings.stats, yearsExperience: e.target.value } })
                }
              />
            </Field>
            <Field label="Placement rate">
              <Input
                value={settings.stats.placementRate}
                onChange={(e) =>
                  setSettings({ ...settings, stats: { ...settings.stats, placementRate: e.target.value } })
                }
              />
            </Field>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-medium text-neutral-900">Footer</h3>
          <Field label="Footer blurb">
            <Textarea
              rows={2}
              value={settings.footerBlurb}
              onChange={(e) => setSettings({ ...settings, footerBlurb: e.target.value })}
            />
          </Field>
        </Card>
      </div>
    </div>
  );
}
