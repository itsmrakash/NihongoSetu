"use client";

export interface SyncQueueItem {
  id: string;
  collection: string;
  action: "create" | "update" | "delete";
  payload: Record<string, unknown>;
  timestamp: string;
}

const SYNC_QUEUE_KEY = "nihongo_sync_queue";

export function getSyncQueue(): SyncQueueItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function queueSyncItem(collection: string, action: "create" | "update" | "delete", payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    const queue = getSyncQueue();
    const item: SyncQueueItem = {
      id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      collection,
      action,
      payload,
      timestamp: new Date().toISOString(),
    };
    queue.push(item);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore
  }
}

export function clearSyncQueue(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(SYNC_QUEUE_KEY);
  } catch {
    // ignore
  }
}

export function isDeviceOnline(): boolean {
  if (typeof window === "undefined") return true;
  return navigator.onLine;
}
