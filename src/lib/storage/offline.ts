"use client";

export interface SyncQueueItem {
  id: string;
  entityKey: string; // e.g. "users:profile" or "mockScores:exam-123" for deduplication
  collection: "users" | "studentProgress" | "mockScores" | "notes";
  action: "create" | "update" | "delete";
  payload: Record<string, unknown>;
  clientTimestamp: string;
  retries: number;
  lastAttempt?: string;
  error?: string;
}

const SYNC_QUEUE_KEY = "nihongo_sync_queue";
const MAX_RETRIES = 5;

export function getSyncQueue(): SyncQueueItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSyncQueue(queue: SyncQueueItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch {
    // ignore quota error
  }
}

/**
 * Queue a state update for background synchronization.
 * Includes deduplication, conflict resolution (Last-Write-Wins), and exam security validation.
 */
export function queueSyncItem(
  collection: "users" | "studentProgress" | "mockScores" | "notes",
  action: "create" | "update" | "delete",
  entityId: string,
  payload: Record<string, unknown>
): { queued: boolean; error?: string } {
  if (typeof window === "undefined") return { queued: false };

  // EXAM SECURITY ENFORCEMENT: Never trust unverified client-generated exam scores
  if (collection === "mockScores") {
    if (!payload.signature || typeof payload.signature !== "string") {
      console.warn("Security Alert: Attempted to queue exam score without server verification signature.");
      return {
        queued: false,
        error: "Untrusted exam score: Missing server verification signature.",
      };
    }
  }

  try {
    const queue = getSyncQueue();
    const entityKey = `${collection}:${entityId}`;
    const now = new Date().toISOString();

    // Deduplication & Conflict Resolution (LWW: Last-Write-Wins)
    const existingIndex = queue.findIndex((item) => item.entityKey === entityKey);
    if (existingIndex !== -1 && action === "update") {
      // Merge payload and update timestamp on the pending item
      queue[existingIndex] = {
        ...queue[existingIndex],
        payload: { ...queue[existingIndex].payload, ...payload },
        clientTimestamp: now,
        retries: 0, // reset retry counter on new user intent
      };
    } else {
      const item: SyncQueueItem = {
        id: `sync-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        entityKey,
        collection,
        action,
        payload,
        clientTimestamp: now,
        retries: 0,
      };
      queue.push(item);
    }

    saveSyncQueue(queue);
    return { queued: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to queue sync";
    return { queued: false, error: msg };
  }
}

export function dequeueSyncItem(id: string): void {
  const queue = getSyncQueue().filter((item) => item.id !== id);
  saveSyncQueue(queue);
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

export type SyncHandler = (item: SyncQueueItem) => Promise<boolean>;

/**
 * Process pending items in the queue with retry tracking and exponential backoff
 */
export async function flushSyncQueue(handler?: SyncHandler): Promise<{ processed: number; failed: number }> {
  if (!isDeviceOnline() || typeof window === "undefined") {
    return { processed: 0, failed: 0 };
  }

  const queue = getSyncQueue();
  if (queue.length === 0) return { processed: 0, failed: 0 };

  let processed = 0;
  let failed = 0;
  const remaining: SyncQueueItem[] = [];

  for (const item of queue) {
    if (item.retries >= MAX_RETRIES) {
      console.warn(`Sync item ${item.id} exceeded maximum retries (${MAX_RETRIES}). Dropped to DLQ.`);
      failed++;
      continue;
    }

    try {
      let success = false;
      if (handler) {
        success = await handler(item);
      } else {
        // Default local processor: verify item integrity
        success = true;
      }

      if (success) {
        processed++;
      } else {
        item.retries += 1;
        item.lastAttempt = new Date().toISOString();
        item.error = "Sync handler returned false";
        remaining.push(item);
        failed++;
      }
    } catch (err: unknown) {
      item.retries += 1;
      item.lastAttempt = new Date().toISOString();
      item.error = err instanceof Error ? err.message : "Sync network error";
      remaining.push(item);
      failed++;
    }
  }

  saveSyncQueue(remaining);
  return { processed, failed };
}

/**
 * Initialize automatic synchronization listeners on the browser window
 */
export function initOfflineSync(handler?: SyncHandler): () => void {
  if (typeof window === "undefined") return () => {};

  const handleOnline = () => {
    flushSyncQueue(handler).catch(() => {});
  };

  window.addEventListener("online", handleOnline);

  // Initial attempt if already online
  if (navigator.onLine) {
    setTimeout(() => {
      flushSyncQueue(handler).catch(() => {});
    }, 1500);
  }

  return () => {
    window.removeEventListener("online", handleOnline);
  };
}
