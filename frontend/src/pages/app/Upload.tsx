import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Image as ImageIcon, X, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleFile = (f: File) => {
    setSelectedFile(f);
    const url = URL.createObjectURL(f);
    setFile(url);
  };

  const startScan = async () => {
    console.log("Button clicked");
    if (!selectedFile) return;
    setScanning(true);
    setProgress(0);
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile!);
      const response = await axios.post(
        "http://127.0.0.1:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setResult(response.data);
      const t = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(t);
            return 100;
          }
          return p + 5;
        });
      }, 120);
    } catch (error) {
      console.error(error);
    }
};

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-3xl border bg-card p-8 shadow-elegant">
        <h2 className="font-display text-2xl font-bold">Upload a scan</h2>
        <p className="mt-1 text-muted-foreground">High-resolution images give the best results.</p>

        {!file ? (
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (f) handleFile(f);
            }}
            className="mt-6 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-section p-12 text-center transition hover:border-primary hover:bg-primary/5"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow animate-float">
              <UploadCloud className="h-7 w-7" />
            </div>
            <div className="font-display text-lg font-semibold">Drop image here, or click to upload</div>
            <div className="text-sm text-muted-foreground">PNG, JPG or HEIC · up to 20MB</div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          </label>
        ) : (
          <div className="mt-6 space-y-4">
            <div className="relative overflow-hidden rounded-3xl border">
              <img src={file} alt="Uploaded scan" className="w-full max-h-[420px] object-contain bg-section" />
              <button
                onClick={() => {
                  setFile(null);
                  setScanning(false);
                  setProgress(0);
                }}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-background/90 backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              {scanning && (
                <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-primary/30 to-transparent">
                  <div className="h-1 w-full animate-pulse bg-gradient-primary" />
                </div>
              )}
            </div>
            {scanning ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Analyzing image...</span>
                  <span className="font-semibold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                {progress === 100 && (
                  <div className="space-y-4">

    <div className="rounded-2xl border bg-section p-6">

      <h3 className="text-xl font-bold">
        Prediction Result
      </h3>

      <p className="mt-3 text-lg">
        Disease:
        <span className="font-semibold text-primary ml-2">
          {result.prediction.disease}
        </span>
      </p>

      <p className="mt-2 text-lg">
        Confidence:
        <span className="font-semibold text-green-500 ml-2">
          {result.prediction.confidence}%
        </span>
      </p>

    </div>

  </div>
                )}
              </div>
            ) : (
              <Button onClick={startScan} variant="gradient" size="lg" className="w-full">
                <Sparkles className="mr-1 h-4 w-4" /> Analyze with AI
              </Button>
            )}
          </div>
        )}
      </div>

      <aside className="space-y-4">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <ShieldCheck className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-display font-semibold">Privacy-first</h3>
          <p className="mt-1 text-sm text-muted-foreground">Your images are encrypted and never shared. Delete anytime.</p>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <ImageIcon className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-display font-semibold">Tips for best results</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Good natural lighting</li>
            <li>• Steady camera, no blur</li>
            <li>• Affected area centered</li>
            <li>• Multiple angles help accuracy</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Upload;
