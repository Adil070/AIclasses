/**
 * Ambient drifting gradient blobs. Renders in dark mode only (via CSS) and is
 * purely decorative, so it is safe to drop into any section wrapper.
 */
export default function BlobField() {
  return (
    <div className="blob-field" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  );
}
