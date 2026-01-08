import { useEffect, useState } from "react";
import { getFeed } from "../utils/store";

/* ---------- Time helper ---------- */
function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Feed() {
  const [feed, setFeed] = useState([]);

  const load = () => {
    setFeed(getFeed());
  };

  useEffect(() => {
    load();

    const onStorage = (e) => {
      if (e.key === "foto-owl-data") {
        load();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div className="w-80 border-l p-4 overflow-y-auto">
      <h2 className="font-semibold mb-3">Live Feed</h2>

      <div className="space-y-2">
        {feed.length === 0 && (
          <p className="text-sm text-gray-400">
            No activity yet
          </p>
        )}

        {feed.map((f, i) => (
          <div
            key={i}
            className="border-b pb-1 text-sm flex justify-between gap-2"
          >
            <div>
              <span
                style={{ color: f.user.color }}
                className="font-semibold mr-1"
              >
                {f.user.name}
              </span>

              {f.type === "reaction" && (
                <span>reacted {f.emoji} on an image</span>
              )}

              {f.type === "comment" && (
                <span>commented: “{f.text}”</span>
              )}
            </div>

            <span className="text-gray-400 text-xs whitespace-nowrap">
              {timeAgo(f.time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
