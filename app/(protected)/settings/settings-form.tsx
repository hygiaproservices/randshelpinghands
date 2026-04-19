"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateSettings } from "@/actions/settings.actions";

type Setting = {
  key: string;
  label: string;
  description: string;
  value: string;
};

type FormState = { success: true } | null;

export function SettingsForm({ settings }: { settings: Setting[] }) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    async (_prev, formData) => {
      const result = await updateSettings(formData);
      return result ?? null;
    },
    null,
  );

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {settings.map((setting) => (
            <div key={setting.key} className="space-y-2">
              <Label htmlFor={setting.key}>{setting.label}</Label>
              <Input
                id={setting.key}
                name={`setting_${setting.key}`}
                defaultValue={setting.value}
                placeholder={setting.description}
              />
              <p className="text-xs text-muted-foreground">
                {setting.description}
              </p>
            </div>
          ))}

          <div className="flex items-center gap-3 pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Settings"}
            </Button>
            {state?.success && (
              <p className="text-sm text-secondary">Settings saved.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
