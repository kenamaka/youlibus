import FingerprintJS from "@fingerprintjs/fingerprintjs";

export async function getFingerprint() {
  // =====================================
  // 1. CHECK EXISTING DEVICE ID
  // =====================================

  const existingDeviceId =
    localStorage.getItem("vote_device_id");

  if (existingDeviceId) {
    return existingDeviceId;
  }

  // =====================================
  // 2. GENERATE FINGERPRINT
  // =====================================

  const fp = await FingerprintJS.load();

  const result = await fp.get();

  // =====================================
  // 3. CREATE STRONGER PERSISTENT ID
  // =====================================

  const deviceId = `${result.visitorId}-${crypto.randomUUID()}`;

  // =====================================
  // 4. SAVE FOREVER
  // =====================================

  localStorage.setItem(
    "vote_device_id",
    deviceId
  );

  return deviceId;
}