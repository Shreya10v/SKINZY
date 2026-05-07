import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertCircle, Check, ShieldCheck } from "lucide-react";

const precautions = [
  "Avoid harsh soaps and fragrances",
  "Keep the affected area moisturized",
  "Use lukewarm (not hot) water when bathing",
  "Avoid scratching — wear soft cotton at night",
];

const Result = () => (
  <div className="grid gap-6 lg:grid-cols-3">
    <div className="lg:col-span-2 space-y-6">
      <div className="overflow-hidden rounded-3xl border bg-card shadow-elegant">
        <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 via-section to-accent/10" />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Detected</span>
            <span className="text-xs text-muted-foreground">Forearm scan · Today, 10:24 AM</span>
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold">Atopic Eczema</h2>
          <p className="mt-2 text-muted-foreground">
            A chronic skin condition that causes inflamed, itchy, and dry patches. Most cases respond well to topical treatment and trigger management.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-section p-4">
              <div className="text-xs text-muted-foreground">Confidence</div>
              <div className="mt-1 font-display text-2xl font-bold text-primary">92%</div>
            </div>
            <div className="rounded-2xl border bg-section p-4">
              <div className="text-xs text-muted-foreground">Severity</div>
              <div className="mt-1 font-display text-2xl font-bold text-secondary">Mild</div>
            </div>
            <div className="rounded-2xl border bg-section p-4">
              <div className="text-xs text-muted-foreground">Est. healing</div>
              <div className="mt-1 font-display text-2xl font-bold text-accent">3–4 wks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border bg-card p-6 shadow-elegant">
        <h3 className="font-display text-lg font-semibold">Suggested precautions</h3>
        <ul className="mt-4 space-y-3">
          {precautions.map((p) => (
            <li key={p} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm text-muted-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <aside className="space-y-4">
      <div className="rounded-3xl border bg-gradient-primary p-6 text-primary-foreground shadow-premium">
        <h3 className="font-display text-lg font-semibold">Ready for your plan?</h3>
        <p className="mt-1 text-sm opacity-90">Get a personalized daily treatment plan tailored to your condition.</p>
        <Button asChild variant="secondary" size="lg" className="mt-4 w-full rounded-xl">
          <Link to="/app/treatment">Generate Treatment Plan <ArrowRight className="ml-1 h-4 w-4" /></Link>
        </Button>
      </div>
      <div className="rounded-3xl border bg-card p-6 shadow-elegant">
        <AlertCircle className="h-6 w-6 text-secondary" />
        <h3 className="mt-3 font-display font-semibold">Not a diagnosis</h3>
        <p className="mt-1 text-sm text-muted-foreground">Always consult a licensed dermatologist for medical advice and prescriptions.</p>
      </div>
      <div className="rounded-3xl border bg-card p-6 shadow-elegant">
        <ShieldCheck className="h-6 w-6 text-accent" />
        <h3 className="mt-3 font-display font-semibold">Saved to your reports</h3>
        <Link to="/app/reports" className="mt-1 inline-block text-sm text-primary hover:underline">View reports →</Link>
      </div>
    </aside>
  </div>
);

export default Result;
