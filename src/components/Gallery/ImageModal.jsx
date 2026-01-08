import { useEffect, useState } from "react";
import {
  getImageData,
  addReaction,
  addComment,
} from "../../utils/store";

const PRIMARY_EMOJIS = ["❤️", "😂", "😮"];
const MORE_EMOJIS = ["🔥", "😍", "👏", "😢", "😡", "🤯"];

export default function ImageModal({ image, onClose }) {
  if (!image) return null;

  const imageId = image.id;

  const [reactions, setReactions] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showMore, setShowMore] = useState(false);

  const load = () => {
    const data = getImageData(imageId);
    setReactions(data?.reactions || {});
    setComments(data?.comments || []);
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
  }, [imageId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={() => onClose && onClose()}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm
                   animate-fadeIn"
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-4 rounded w-[600px]
                   max-h-[90vh] overflow-auto
                   animate-scaleIn"
      >
        {/* Close button */}
        <button
          onClick={() => onClose && onClose()}
          className="absolute top-2 right-3 text-xl"
        >
          ✖
        </button>

        {/* Image */}
        <img
          src={image.urls?.regular || image.urls?.small}
          alt={image.alt_description || "image"}
          className="w-full rounded mb-4"
        />

        {/* Emoji reactions */}
        <div className="flex gap-3 mb-4 items-center flex-wrap">
          {PRIMARY_EMOJIS.map((e) => (
            <button
              key={e}
              className="text-lg"
              onClick={() => {
                addReaction(imageId, e);
                load();
              }}
            >
              {e} {reactions[e] || 0}
            </button>
          ))}

          <button
            onClick={() => setShowMore(!showMore)}
            className="text-lg px-2"
          >
            ➕
          </button>

          {showMore &&
            MORE_EMOJIS.map((e) => (
              <button
                key={e}
                className="text-lg"
                onClick={() => {
                  addReaction(imageId, e);
                  load();
                  setShowMore(false);
                }}
              >
                {e} {reactions[e] || 0}
              </button>
            ))}
        </div>

        {/* Comments */}
        <div className="space-y-2 mb-3">
          {comments.length === 0 && (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first.
            </p>
          )}

          {comments.map((c, i) => (
            <div key={i} className="text-sm border-b pb-1">
              <span
                style={{ color: c.user?.color || "#555" }}
                className="font-semibold mr-1"
              >
                {c.user?.name || "User"}
              </span>
              {c.text}
            </div>
          ))}
        </div>

        {/* Add comment */}
        <div className="flex gap-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border flex-1 px-2 py-1 rounded"
            placeholder="Add comment..."
          />
          <button
            onClick={() => {
              if (!comment.trim()) return;
              addComment(imageId, comment);
              setComment("");
              load();
            }}
            className="px-3 py-1 border rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
