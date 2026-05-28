import FingerprintJS from "@fingerprintjs/fingerprintjs";

// ========================================
// PERSISTENT DEVICE ID
// ========================================

export function getDeviceId() {
  let deviceId =
    localStorage.getItem("vote_device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID();

    localStorage.setItem(
      "vote_device_id",
      deviceId
    );
  }

  return deviceId;
}

// ========================================
// FINGERPRINT ID
// ========================================

export async function getFingerprint() {
  const fp = await FingerprintJS.load();

  const result = await fp.get();

  return result.visitorId;
}