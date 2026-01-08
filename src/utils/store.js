import { getUser } from "./user";

const KEY = "foto-owl-data";

function getData() {
  const raw = localStorage.getItem(KEY);
  return raw
    ? JSON.parse(raw)
    : { reactions: {}, comments: {}, feed: [] };
}

function setData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

/* ---------- READ IMAGE DATA ---------- */
export function getImageData(imageId) {
  const data = getData();

  return {
    reactions: data.reactions[imageId] || {},
    comments: data.comments[imageId] || [],
  };
}

/* ---------- ADD REACTION ---------- */
export function addReaction(imageId, emoji) {
  const data = getData();
  const user = getUser();

  if (!data.reactions[imageId]) {
    data.reactions[imageId] = {};
  }

  data.reactions[imageId][emoji] =
    (data.reactions[imageId][emoji] || 0) + 1;

  data.feed.unshift({
    type: "reaction",
    imageId,
    emoji,
    user,
    time: Date.now(),
  });

  setData(data);
}

/* ---------- ADD COMMENT ---------- */
export function addComment(imageId, text) {
  const data = getData();
  const user = getUser();

  if (!data.comments[imageId]) {
    data.comments[imageId] = [];
  }

  data.comments[imageId].push({
    text,
    user,
    time: Date.now(),
  });

  data.feed.unshift({
    type: "comment",
    imageId,
    text,
    user,
    time: Date.now(),
  });

  setData(data);
}

/* ---------- GLOBAL FEED ---------- */
export function getFeed() {
  return getData().feed || [];
}
